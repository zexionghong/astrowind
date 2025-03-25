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
      name: 'AdsPower',
      nameCn: 'AdsPower',
      nameEn: 'AdsPower', 
      logo: 'adspower-logo.png',
      description: lang === 'zh' ? 'AdsPower是一款专注出海多账号安全管理工具' : 'AdsPower is a multi-account secure management tool for overseas business',
      href: 'https://www.adspower.com/' 
    },
    { 
      name: 'IXBrowser',
      nameCn: 'IXBrowser',
      nameEn: 'IXBrowser', 
      logo: 'ixbrowser-logo.png',
      description: lang === 'zh' ? 'IXBrowser是一款专为互联网研究和数据收集而设计的浏览器' : 'IXBrowser is a browser designed for internet research and data collection',
      href: 'https://www.ixbrowser.com/' 
    },
    { 
      name: 'BrowserScan',
      nameCn: 'BrowserScan',
      nameEn: 'BrowserScan', 
      logo: 'browserscan-logo.png',
      description: lang === 'zh' ? 'BrowserScan是一个提供网站安全性检测服务的工具' : 'BrowserScan is a tool providing website security detection services',
      href: 'https://browserscan.com/' 
    },
    { 
      name: '宝塔云',
      nameCn: '宝塔云',
      nameEn: 'BaoTa Cloud', 
      logo: 'baotayun-logo.png',
      description: lang === 'zh' ? '宝塔云是一家提供全方位云计算服务的公司' : 'BaoTa Cloud is a company providing comprehensive cloud computing services',
      href: 'https://www.bt.cn/' 
    },
    { 
      name: '候鸟',
      nameCn: '候鸟',
      nameEn: 'HouNiao', 
      logo: 'houniao-logo.png',
      description: lang === 'zh' ? '候鸟是一款专注于隐私保护的网络浏览器' : 'HouNiao is a browser focused on privacy protection',
      href: '#' 
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
