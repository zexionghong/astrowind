import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';

test('keeps existing friend links file when remote fetch fails', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'friend-links-test-'));
  const outputDir = join(tempDir, 'public');
  const outputPath = join(outputDir, 'friend-links.json');
  const existingData = {
    links: [{ name: 'Cached friend' }],
    generatedAt: '2026-01-01T00:00:00.000Z',
  };

  mkdirSync(outputDir);
  writeFileSync(outputPath, JSON.stringify(existingData, null, 2) + '\n');

  const result = spawnSync(process.execPath, ['scripts/build-friend-links.js'], {
    cwd: new URL('..', import.meta.url),
    env: {
      ...process.env,
      FRIEND_LINKS_API_URL: `file://${tempDir}/missing.json`,
      FRIEND_LINKS_OUTPUT_PATH: outputPath,
    },
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(readFileSync(outputPath, 'utf8')), existingData);
});
