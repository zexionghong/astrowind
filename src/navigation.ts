import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { SITE } from 'astrowind:config';
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
      href: `/${lang}/pricing`
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
      title: "产品",
      links: [
        { text: '静态住宅代理', href: '/detail' },
        { text: '动态住宅代理', href: '/detail' },
        { text: '数据中心代理', href: '/detail' },
      ],
    },
    {
      title: "解决方案",
      links: [
        { text: '跨境电商', href: '#' },
        { text: '品牌保护', href: '#' },
        { text: '市场调研', href: '#' },
        { text: '广告验证', href: '#' },
      ],
    },
    {
      title: "支持",
      links: [
        { text: '帮助中心', href: '/help' },
        { text: '开发文档', href: '#' },
        { text: '联系我们', href: '#' },
      ],
    },
    {
      title: "公司",
      links: [
        { text: '关于我们', href: '#' },
        { text: '使用条款', href: '#' },
        { text: '隐私政策', href: '#' },
      ],
    },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Telegram', icon: 'tabler:brand-telegram', href: '#' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: '#' },
  ],
  footNote: `
    © ${new Date().getFullYear()} ${SITE.name}. All rights reserved.
  `,
};
