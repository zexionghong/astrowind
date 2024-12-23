
export function useTranslations(lang: string) {
  return async function t(key: string) {
    const parts = key.split('.');
    const translations = await import(`../i18n/${lang}/common.json`);
    
    let value = translations;
    for (const part of parts) {
      value = value[part];
    }
    
    return value || key;
  }
}

export async function getLanguageFromURL(pathname: string) {
  const [, lang] = pathname.split('/');
  return lang in ['en', 'zh'] ? lang : 'en';
} 