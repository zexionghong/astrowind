import fs from 'fs';
import path from 'path';

interface Translations {
  [key: string]: any;
}

const translationsCache: { [lang: string]: Translations } = {};

function loadTranslations(dir: string): Translations {
  let translations: Translations = {};
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonContent = JSON.parse(fileContent);
      translations = { ...translations, ...jsonContent };
    }
  });

  return translations;
}

export function initializeTranslations() {
  const languages = ['en', 'zh'];
  languages.forEach((lang) => {
    const dir = path.resolve(`./src/i18n/${lang}`);
    translationsCache[lang] = loadTranslations(dir);
    console.log(translationsCache[lang]);
  });
}

export function useTranslations(lang: string) {
  return function t(key: string) {
    const parts = key.split('.');
    let value = translationsCache[lang];
    for (const part of parts) {
      value = value?.[part];
    }

    return value || key;
  };
}

export async function getLanguageFromURL(pathname: string) {
  const [, lang] = pathname.split('/');
  return lang in ['en', 'zh'] ? lang : 'en';
} 