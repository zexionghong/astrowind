#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data', 'geo-tracker');
const KEYWORDS_FILE = path.join(DATA_DIR, 'keywords.txt');
const CHANNELS_FILE = path.join(DATA_DIR, 'channels.txt');

const HEADER = [
  'date',
  'channel',
  'query',
  'is_cited',
  'source_url',
  'landing_page_type',
  'position_note',
  'notes',
].join(',');

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function ensureSeedFile(file, values) {
  if (fs.existsSync(file)) return;
  fs.writeFileSync(file, `${values.join('\n')}\n`, 'utf8');
}

function readLines(file) {
  if (!fs.existsSync(file)) return [];
  return fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => v && !v.startsWith('#'));
}

function csvEscape(v) {
  const s = String(v ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const cur = argv[i];
    if (cur.startsWith('--')) {
      const key = cur.slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
      out[key] = val;
    } else {
      out._.push(cur);
    }
  }
  return out;
}

function getWeekDate(input) {
  if (!input) return new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    throw new Error(`Invalid --week format: ${input}. Use YYYY-MM-DD.`);
  }
  return input;
}

function init() {
  ensureDir();
  ensureSeedFile(KEYWORDS_FILE, [
    'ipflex',
    'ipflex proxy',
    'static residential proxy',
    'dynamic residential proxy',
    'datacenter proxy',
    'proxy session stability',
    'proxy for ad verification',
    '住宅代理',
    '动态住宅代理',
    '数据中心代理',
  ]);
  ensureSeedFile(CHANNELS_FILE, ['ChatGPT', 'Perplexity', 'Gemini', 'Bing Copilot']);
  console.log('Initialized:');
  console.log(`- ${KEYWORDS_FILE}`);
  console.log(`- ${CHANNELS_FILE}`);
}

function plan(week) {
  ensureDir();
  const keywords = readLines(KEYWORDS_FILE);
  const channels = readLines(CHANNELS_FILE);
  if (!keywords.length || !channels.length) {
    throw new Error('keywords/channels is empty. Run `npm run geo:track -- init` first.');
  }
  const file = path.join(DATA_DIR, `${week}.csv`);
  if (fs.existsSync(file)) {
    console.log(`Plan already exists: ${file}`);
    return;
  }
  const rows = [HEADER];
  for (const channel of channels) {
    for (const query of keywords) {
      rows.push(
        [
          week,
          channel,
          query,
          '',
          '',
          '',
          '',
          '',
        ]
          .map(csvEscape)
          .join(',')
      );
    }
  }
  fs.writeFileSync(file, `${rows.join('\n')}\n`, 'utf8');
  console.log(`Created weekly plan: ${file}`);
  console.log(`Rows: ${rows.length - 1}`);
}

function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i];
    const n = line[i + 1];
    if (c === '"' && inQuotes && n === '"') {
      cur += '"';
      i += 1;
      continue;
    }
    if (c === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (c === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  out.push(cur);
  return out;
}

function summary() {
  ensureDir();
  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.csv'))
    .sort();
  if (!files.length) {
    console.log('No weekly CSV files found.');
    return;
  }
  let total = 0;
  let cited = 0;
  const byChannel = new Map();
  for (const f of files) {
    const lines = fs
      .readFileSync(path.join(DATA_DIR, f), 'utf8')
      .split('\n')
      .map((v) => v.trim())
      .filter(Boolean);
    for (let i = 1; i < lines.length; i += 1) {
      const row = parseCsvLine(lines[i]);
      if (row.length < 4) continue;
      const channel = row[1];
      const isCited = String(row[3]).toLowerCase();
      total += 1;
      if (isCited === '1' || isCited === 'yes' || isCited === 'true' || isCited === 'y') {
        cited += 1;
        byChannel.set(channel, (byChannel.get(channel) ?? 0) + 1);
      }
    }
  }
  const ratio = total ? ((cited / total) * 100).toFixed(2) : '0.00';
  console.log(`Files: ${files.length}`);
  console.log(`Rows: ${total}`);
  console.log(`Cited: ${cited}`);
  console.log(`Citation rate: ${ratio}%`);
  if (byChannel.size) {
    console.log('By channel:');
    for (const [k, v] of byChannel.entries()) {
      console.log(`- ${k}: ${v}`);
    }
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] || 'help';
  try {
    if (cmd === 'init') {
      init();
      return;
    }
    if (cmd === 'plan') {
      plan(getWeekDate(args.week));
      return;
    }
    if (cmd === 'summary') {
      summary();
      return;
    }
    console.log('Usage:');
    console.log('  npm run geo:track -- init');
    console.log('  npm run geo:track -- plan --week 2026-03-05');
    console.log('  npm run geo:track -- summary');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();

