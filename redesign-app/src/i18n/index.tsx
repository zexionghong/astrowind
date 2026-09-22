import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import zh from './locales/zh.json';
import en from './locales/en.json';
import ja from './locales/ja.json';

export type Lang = 'zh' | 'en' | 'ja';

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
];

const messages: Record<Lang, Record<string, unknown>> = { zh, en, ja };

export const DEFAULT_LANG: Lang = 'zh';
const STORAGE_KEY = 'ipflex-lang';

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && saved in messages) return saved;
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('en')) return 'en';
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

/** 点路径取值：t('home.hero.title') */
function lookup(obj: Record<string, unknown>, path: string): string {
  let cur: unknown = obj;
  for (const key of path.split('.')) {
    if (cur && typeof cur === 'object' && key in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof cur === 'string' ? cur : path;
}

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** 翻译函数 */
  t: (path: string) => string;
  /** 数组取值（如 FAQ 列表） */
  ta: <T,>(path: string) => T[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh' : lang;
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (path) => lookup(messages[lang], path),
      ta: <T,>(path: string) => {
        let cur: unknown = messages[lang];
        for (const key of path.split('.')) {
          if (cur && typeof cur === 'object' && key in (cur as Record<string, unknown>)) {
            cur = (cur as Record<string, unknown>)[key];
          } else {
            return [];
          }
        }
        return Array.isArray(cur) ? (cur as T[]) : [];
      },
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
