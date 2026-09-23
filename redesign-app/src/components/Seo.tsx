import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import { canonicalFor, metaFor } from '../seo';
import { SITE_URL } from '../site';

const MANAGED = 'data-seo';

/** 按路由更新标题、描述、canonical 和社交标签。 */
export function Seo() {
  const { pathname } = useLocation();
  const { lang, t } = useI18n();
  const meta = metaFor(pathname, lang, t);
  const canonical = canonicalFor(pathname);
  const title = meta.title.includes('IPFlex') ? meta.title : `${meta.title} | IPFlex`;
  const locale = lang === 'zh' ? 'zh_CN' : lang === 'ja' ? 'ja_JP' : 'en_US';

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', meta.type ?? 'website');
    setMeta('property', 'og:site_name', 'IPFlex');
    setMeta('property', 'og:locale', locale);
    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', meta.description);
    setLink('canonical', canonical);

    const schema = {
      '@context': 'https://schema.org',
      '@type': meta.type === 'article' ? 'Article' : 'WebPage',
      name: title,
      description: meta.description,
      url: canonical,
      inLanguage: document.documentElement.lang,
      isPartOf: { '@type': 'WebSite', name: 'IPFlex', url: SITE_URL },
    };
    let script = document.head.querySelector<HTMLScriptElement>(`script[${MANAGED}]`);
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(MANAGED, '');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [canonical, locale, lang, meta.description, meta.noindex, meta.type, title]);

  return null;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"][${MANAGED}]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][${MANAGED}]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    el.setAttribute(MANAGED, '');
    document.head.appendChild(el);
  }
  el.href = href;
}
