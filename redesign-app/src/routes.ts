/** 路由 path 常量：全站唯一路由定义处 */
export const PATHS = {
  home: '/',
  pricing: '/pricing',
  prodSrp: '/products/static-residential',
  prodDrp: '/products/dynamic-residential',
  prodDc: '/products/datacenter',
  scenarios: '/scenarios',
  resources: '/resources',
  blog: '/blog',
  about: '/about',
  register: '/register',
} as const;

/** i18n / 文案数据里的 to 值 → 路由 path（footer、资源中心链接等复用） */
export const ROUTES: Record<string, string> = {
  home: PATHS.home,
  pricing: PATHS.pricing,
  'prod-srp': PATHS.prodSrp,
  'prod-drp': PATHS.prodDrp,
  'prod-dc': PATHS.prodDc,
  scenarios: PATHS.scenarios,
  resources: PATHS.resources,
  blog: PATHS.blog,
  about: PATHS.about,
  register: PATHS.register,
};
