/** 站点根地址来自环境变量，构建和浏览器共用。 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://ipflex.ink').replace(/\/+$/, '');

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}
