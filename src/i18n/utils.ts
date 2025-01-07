import { en } from './translations/en';
import { zh } from './translations/zh';

export type SupportedLanguage = 'zh' | 'en';

const LANGUAGES = {
  en,
  zh,
} as const;

export function getI18N(lang: SupportedLanguage) {
  const translations = LANGUAGES[lang] || LANGUAGES.en;
  
  return function t(key: string): string {
    return key.split('.').reduce((obj, k) => obj?.[k], translations as any) || key;
  }
} 