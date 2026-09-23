import { POSTS } from './blog';
import { PATHS } from './routes';
import { getUseCase } from './use-cases';
import type { Lang } from './i18n';

export const SITE = 'https://ipflex.ink';

export interface SeoMeta {
  title: string;
  description: string;
  /** 未知路由不收录 */
  noindex?: boolean;
  type?: 'website' | 'article';
}

type Translator = (path: string) => string;

const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  [PATHS.home]: { title: 'home.hero.title', description: 'home.hero.sub' },
  [PATHS.pricing]: { title: 'pricing.heroTitle', description: 'pricing.heroSub' },
  [PATHS.prodSrp]: { title: 'srp.heroTitle', description: 'srp.heroSub' },
  [PATHS.prodDrp]: { title: 'drp.heroTitle', description: 'drp.heroSub' },
  [PATHS.prodDc]: { title: 'dc.heroTitle', description: 'dc.heroSub' },
  [PATHS.prodAi]: { title: 'ai.heroTitle', description: 'ai.heroSub' },
  [PATHS.scenarios]: { title: 'scenarios.heroTitle', description: 'scenarios.heroSub' },
  [PATHS.resources]: { title: 'resources.heroTitle', description: 'resources.heroSub' },
  [PATHS.blog]: { title: 'blog.heroTitle', description: 'blog.heroSub' },
  [PATHS.about]: { title: 'about.heroTitle', description: 'about.heroSub' },
  [PATHS.register]: { title: 'register.sideTitle', description: 'register.description' },
};

function pageMeta(keys: { title: string; description: string }, t: Translator): SeoMeta {
  return { title: clean(t(keys.title)), description: clean(t(keys.description)) };
}

/** 按当前路径和语言生成标题与描述。文案不存在时回退到页面主标题。 */
export function metaFor(pathname: string, lang: Lang, t: Translator): SeoMeta {
  const path = pathname.replace(/\/+$/, '') || '/';
  const page = STATIC_PAGES[path];
  if (page) return pageMeta(page, t);

  const blog = path.match(/^\/blog\/([^/]+)$/);
  if (blog) {
    const post = POSTS.find((item) => item.slug === decodeURIComponent(blog[1]));
    if (post) return { title: post.title, description: clean(post.excerpt), type: 'article' };
  }

  const useCase = path.match(/^\/use-case\/([^/]+)$/);
  if (useCase) {
    const page = getUseCase(decodeURIComponent(useCase[1]), lang);
    if (page) return { title: page.title, description: clean(page.subtitle) };
  }

  return { ...pageMeta(STATIC_PAGES[PATHS.home], t), noindex: true };
}

export function canonicalFor(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path === '/' ? `${SITE}/` : `${SITE}${path}`;
}

function clean(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}
