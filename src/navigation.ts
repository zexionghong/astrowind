import { SITE } from 'astrowind:config';
export const getHeaderData = (lang: string = 'zh') => ({
  links: [
    {
      text: lang === 'zh' ? '产品' : 'Products',
      href: `/${lang}/detail`,
      
    },
    {
      text: lang === 'zh' ? '定价' : 'Pricing',
      href: `/${lang}/pricing`
    },
    {
      text: lang === 'zh' ? '应用场景' : 'Cases',
      href: `/${lang}/scenarios`
    },
    ...(lang === 'zh' ? [
      {
        text: '帮助中心',
        href: `https://ipflex-helpcenter.helplook.net/`
      },
      {
        text: '资讯中心',
        href: 'https://ipflex-news.helplook.com/',
      }
    ] : [])
  ],
  actions: [
    { text: lang === 'zh' ? '注册' : 'Sign Up', href: `/${lang}/register`, color: 'blue' },
    { text: lang === 'zh' ? '登录' : 'Login', href: 'https://dashboard.ipflex.ink/login', target: '_blank' },
  ],
});

export const getFooterData = (lang: string = 'zh') => ({
  links: [
    {
      title: lang === 'zh' ? '产品' : 'Products',
      links: [
        { 
          text: lang === 'zh' ? '静态住宅代理' : 'Static Residential Proxy', 
          href: `/${lang}/detail#static-residential` 
        },
        { 
          text: lang === 'zh' ? '动态住宅代理' : 'Dynamic Residential Proxy', 
          href: `/${lang}/detail#dynamic-residential` 
        },
        { 
          text: lang === 'zh' ? '数据中心代理' : 'Data Center Proxy', 
          href: `/${lang}/detail#datacenter` 
        },
      ],
    },
    {
      title: lang === 'zh' ? '解决方案' : 'Solutions',
      links: [
        { text: lang === 'zh' ? '跨境电商' : 'Cross-border E-commerce', href: '#' },
        { text: lang === 'zh' ? '品牌保护' : 'Brand Protection', href: '#' },
        { text: lang === 'zh' ? '市场调研' : 'Market Research', href: '#' },
        { text: lang === 'zh' ? '广告验证' : 'Ad Verification', href: '#' },
      ],
    },
    {
      title: lang === 'zh' ? '支持' : 'Support',
      links: [
        { text: lang === 'zh' ? '帮助中心' : 'Help Center', href: 'https://ipflex-helpcenter.helplook.net/' },
        { text: lang === 'zh' ? '开发文档' : 'Documentation', href: '#' },
        { text: lang === 'zh' ? '联系我们' : 'Contact Us', href: '#' },
      ],
    },
    {
      title: lang === 'zh' ? '公司' : 'Company',
      links: [
        { text: lang === 'zh' ? '关于我们' : 'About Us', href: '#' },
        { text: lang === 'zh' ? '使用条款' : 'Terms of Service', href: `/${lang}/terms` },
        { text: lang === 'zh' ? '隐私政策' : 'Privacy Policy', href: `/${lang}/privacy` },
      ],
    },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/IPFlexSupport' },
    { ariaLabel: 'Telegram', icon: 'tabler:brand-telegram', href: '#' },
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: '#' },
  ],
  footNote: `
    ${new Date().getFullYear()} ${SITE.name}. ${lang === 'zh' ? '版权所有' : 'All rights reserved'}.
  `,
});
