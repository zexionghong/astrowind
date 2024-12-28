import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const getHeaderData = (lang: string = 'zh') => ({
  links: [
    {
      text: lang === 'zh' ? '产品' : 'Products',
      links: [
        {
          text: lang === 'zh' ? '静态住宅代理' : 'Static Residential Proxy',
          href: `/${lang}/detail`,
        },
        {
          text: lang === 'zh' ? '动态住宅代理' : 'Dynamic Residential Proxy',
          href: `/${lang}/detail`,
        },
        {
          text: lang === 'zh' ? '数据中心代理' : 'Data Center Proxy',
          href: `/${lang}/detail`,
        },
      ],
    },
    {
      text: lang === 'zh' ? '定价' : 'Pricing',
      href: 'https://baidu.com'
    },
    {
      text: lang === 'zh' ? '应用场景' : 'Cases',
      href: `/${lang}/services`
    },
    {
      text: lang === 'zh' ? '帮助中心' : 'Help',
      href: `/${lang}/help`
    },
    {
      text: lang === 'zh' ? '资讯中心' : 'News',
      href: '#',
    },
  ],
  actions: [
    { text: lang === 'zh' ? '注册' : 'Sign Up', href: 'https://dashboard.ipflex.ink', target: '_blank', color: 'blue' },
    { text: lang === 'zh' ? '登录' : 'Login', href: 'https://dashboard.ipflex.ink/login', target: '_blank' },
  ],
});

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Security', href: '#' },
        { text: 'Team', href: '#' },
        { text: 'Enterprise', href: '#' },
        { text: 'Customer stories', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { text: 'Developer API', href: '#' },
        { text: 'Partners', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Docs', href: '#' },
        { text: 'Community Forum', href: '#' },
        { text: 'Professional Services', href: '#' },
        { text: 'Skills', href: '#' },
        { text: 'Status', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
