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
  friendLinks: [
    { 
      name: '拉力猫指纹浏览器',
      nameCn: '拉力猫指纹浏览器',
      nameEn: '拉力猫指纹浏览器', 
      logo: 'lalimao.png',
      description: lang === 'zh' ? '拉力猫指纹浏览器，为您的电商平台、独立站、社媒营销提供安全保障。每个账号独立浏览器指纹、独立IP登录环境，实现防关联批量管理、注册和养号，确保账号安全隔离。' : '拉力猫指纹浏览器，为您的电商平台、独立站、社媒营销提供安全保障。每个账号独立浏览器指纹、独立IP登录环境，实现防关联批量管理、注册和养号，确保账号安全隔离。',
      href: 'https://www.lalimao.com/' 
    },
    { 
      name: 'DuoPlus云手机',
      nameCn: 'DuoPlus云手机',
      nameEn: 'DuoPlus云手机', 
      logo: 'duplus.png',
      description: lang === 'zh' ? '专注打造全球社媒营销、Tiktok、WhatsApp专用云手机，不需要下载客户端，流畅运用实体手机所有的功能。' : '专注打造全球社媒营销、Tiktok、WhatsApp专用云手机，不需要下载客户端，流畅运用实体手机所有的功能。',
      href: 'https://www.duoplus.cn/?r=IPFlex' 
    }
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
