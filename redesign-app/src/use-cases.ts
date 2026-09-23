import zhAd from './content/use-cases/static-residential-proxy-ad-verification.zh.json';
import enAd from './content/use-cases/static-residential-proxy-ad-verification.en.json';
import zhEc from './content/use-cases/static-residential-proxy-ecommerce.zh.json';
import enEc from './content/use-cases/static-residential-proxy-ecommerce.en.json';
import zhSc from './content/use-cases/static-residential-proxy-scraping.zh.json';
import enSc from './content/use-cases/static-residential-proxy-scraping.en.json';
import zhSe from './content/use-cases/static-residential-proxy-security.zh.json';
import enSe from './content/use-cases/static-residential-proxy-security.en.json';
import zhDc from './content/use-cases/dynamic-residential-proxy-data-collection.zh.json';
import enDc from './content/use-cases/dynamic-residential-proxy-data-collection.en.json';
import zhCr from './content/use-cases/dynamic-residential-proxy-crawling.zh.json';
import enCr from './content/use-cases/dynamic-residential-proxy-crawling.en.json';
import zhPr from './content/use-cases/dynamic-residential-proxy-privacy.zh.json';
import enPr from './content/use-cases/dynamic-residential-proxy-privacy.en.json';
import zhDa from './content/use-cases/dynamic-residential-proxy-ad-verification.zh.json';
import enDa from './content/use-cases/dynamic-residential-proxy-ad-verification.en.json';
import zhApi from './content/use-cases/static-datacenter-proxy-api.zh.json';
import enApi from './content/use-cases/static-datacenter-proxy-api.en.json';
import zhTe from './content/use-cases/static-datacenter-proxy-testing.zh.json';
import enTe from './content/use-cases/static-datacenter-proxy-testing.en.json';
import zhBa from './content/use-cases/static-datacenter-proxy-batch-processing.zh.json';
import enBa from './content/use-cases/static-datacenter-proxy-batch-processing.en.json';
import zhCd from './content/use-cases/static-datacenter-proxy-cdn.zh.json';
import enCd from './content/use-cases/static-datacenter-proxy-cdn.en.json';

export interface UseCase {
  slug: string;
  group: string;
  title: string;
  subtitle: string;
  features: string[];
  cta: string;
  whyTitle: string;
  why: { title: string; desc: string }[];
  scenarioTitle: string;
  steps: string[];
  prosTitle: string;
  pros: string[];
  cons: string[];
  flowTitle: string;
  flow: string[];
  tags: string[];
  tipsTitle: string;
  tips: string[];
  faqTitle: string;
  faqSub: string;
  faqs: { q: string; a: string }[];
  more: { slug: string; title: string; desc: string }[];
}

/** 场景卡片顺序与线上 /scenarios 一致 */
export const USE_CASE_SLUGS = [
  'static-residential-proxy-ad-verification',
  'static-residential-proxy-scraping',
  'static-residential-proxy-ecommerce',
  'static-residential-proxy-security',
  'dynamic-residential-proxy-data-collection',
  'dynamic-residential-proxy-crawling',
  'dynamic-residential-proxy-privacy',
  'dynamic-residential-proxy-ad-verification',
  'static-datacenter-proxy-api',
  'static-datacenter-proxy-testing',
  'static-datacenter-proxy-batch-processing',
  'static-datacenter-proxy-cdn',
] as const;

const pages: Record<string, { zh: UseCase; en: UseCase }> = {
  'static-residential-proxy-ad-verification': { zh: zhAd as UseCase, en: enAd as UseCase },
  'static-residential-proxy-ecommerce': { zh: zhEc as UseCase, en: enEc as UseCase },
  'static-residential-proxy-scraping': { zh: zhSc as UseCase, en: enSc as UseCase },
  'static-residential-proxy-security': { zh: zhSe as UseCase, en: enSe as UseCase },
  'dynamic-residential-proxy-data-collection': { zh: zhDc as UseCase, en: enDc as UseCase },
  'dynamic-residential-proxy-crawling': { zh: zhCr as UseCase, en: enCr as UseCase },
  'dynamic-residential-proxy-privacy': { zh: zhPr as UseCase, en: enPr as UseCase },
  'dynamic-residential-proxy-ad-verification': { zh: zhDa as UseCase, en: enDa as UseCase },
  'static-datacenter-proxy-api': { zh: zhApi as UseCase, en: enApi as UseCase },
  'static-datacenter-proxy-testing': { zh: zhTe as UseCase, en: enTe as UseCase },
  'static-datacenter-proxy-batch-processing': { zh: zhBa as UseCase, en: enBa as UseCase },
  'static-datacenter-proxy-cdn': { zh: zhCd as UseCase, en: enCd as UseCase },
};

export function useCasePath(slug: string): string {
  return `/use-case/${slug}`;
}

/** 日文界面没有独立稿，沿用中文方案页 */
export function getUseCase(slug: string, lang: string): UseCase | null {
  const page = pages[slug];
  if (!page) return null;
  return lang === 'en' ? page.en : page.zh;
}
