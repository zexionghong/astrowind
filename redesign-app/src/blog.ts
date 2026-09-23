/** 博客正文来自仓库根目录 src/content/post，列表用预生成的元数据，正文按需加载。 */

import indexData from './blog-index.json';

export interface BlogMeta {
  slug: string;
  lang: 'zh' | 'en';
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

export interface BlogPost extends BlogMeta {
  body: string;
}

const bodies = import.meta.glob('../../src/content/post/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

export const POSTS: BlogMeta[] = indexData as BlogMeta[];

export function postsFor(lang: string): BlogMeta[] {
  return POSTS.filter((post) => post.lang === (lang === 'en' ? 'en' : 'zh'));
}

export async function loadPost(slug: string): Promise<BlogPost | null> {
  const meta = POSTS.find((post) => post.slug === slug);
  const path = Object.keys(bodies).find((key) => key.endsWith(`/${slug}.md`));
  if (!meta || !path) return null;
  const raw = await bodies[path]();
  return { ...meta, body: raw.replace(/^---\n[\s\S]*?\n---\n?/, '').trim() };
}
