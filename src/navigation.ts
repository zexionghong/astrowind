import { SITE } from 'astrowind:config';
export const getHeaderData = (lang: string = 'zh') => ({
  links: [
    {
      text: lang === 'zh' ? '产品' : 'Products',
      // href: `/${lang}/detail`,
      links: [
        {
          text: lang === 'zh' ? '静态住宅代理' : 'Static Residential Proxy',
          href: `/${lang}/static-residential-proxy`,
          icon: 'tabler:home',
          description: lang === 'zh' ? '高质量住宅IP，稳定可靠，适合长期使用' : 'High-quality residential IPs, stable and reliable for long-term use',
          badge: lang === 'zh' ? '推荐' : 'Recommended'
        },
        {
          text: lang === 'zh' ? '动态住宅代理' : 'Dynamic Residential Proxy',
          href: `/${lang}/dynamic-residential-proxy`,
          icon: 'tabler:refresh',
          description: lang === 'zh' ? '动态轮换IP，适合大规模数据采集' : 'Dynamic rotating IPs, perfect for large-scale data collection'
        },
        {
          text: lang === 'zh' ? '数据中心代理' : 'Data Center Proxy',
          href: `/${lang}/static-datacenter-proxy`,
          icon: 'tabler:server',
          description: lang === 'zh' ? '高速数据中心IP，性价比高' : 'High-speed datacenter IPs with great value'
        },
      ]

    },
    {
      text: lang === 'zh' ? '定价' : 'Pricing',
      href: `/${lang}/pricing`
    },
    {
      text: lang === 'zh' ? '应用场景' : 'Use Cases',
      links: [
        {
          text: lang === 'zh' ? '跨境电商' : 'Cross-border E-commerce',
          href: `/${lang}/use-case/ecommerce`,
          icon: 'tabler:shopping-cart',
          description: lang === 'zh' ? '电商平台账号管理，防关联批量操作' : 'E-commerce account management and anti-detection operations'
        },
        {
          text: lang === 'zh' ? '数据采集' : 'Web Scraping',
          href: `/${lang}/use-case/scraping`,
          icon: 'tabler:database',
          description: lang === 'zh' ? '大规模数据采集，突破反爬虫限制' : 'Large-scale data collection, bypass anti-bot protection'
        },
        {
          text: lang === 'zh' ? '广告验证' : 'Ad Verification',
          href: `/${lang}/use-case/ad-verification`,
          icon: 'tabler:shield-check',
          description: lang === 'zh' ? '广告投放验证，防止广告欺诈' : 'Ad placement verification and fraud prevention'
        },
        {
          text: lang === 'zh' ? '品牌保护' : 'Brand Protection',
          href: `/${lang}/use-case/brand-protection`,
          icon: 'tabler:shield',
          description: lang === 'zh' ? '品牌监控保护，知识产权维护' : 'Brand monitoring and intellectual property protection'
        },
        {
          text: lang === 'zh' ? '市场调研' : 'Market Research',
          href: `/${lang}/use-case/market-research`,
          icon: 'tabler:chart-line',
          description: lang === 'zh' ? '竞品分析，市场情报收集' : 'Competitor analysis and market intelligence gathering'
        },
        {
          text: lang === 'zh' ? '查看所有场景' : 'View All Cases',
          href: `/${lang}/scenarios`,
          icon: 'tabler:arrow-right',
          description: lang === 'zh' ? '探索更多应用场景和解决方案' : 'Explore more use cases and solutions',
          badge: lang === 'zh' ? '更多' : 'More'
        }
      ]
    },
    {
      text: lang == 'zh'?"博客":"Blog",
      href:`/${lang}/blog`
    },
    ...(lang === 'zh' ? [
      {
        text: '帮助中心',
        href: `https://helpcenter.ipflex.ink/`
      },
      {
        text: '资讯中心',
        href: 'https://news.ipflex.ink/',
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
          href: `/${lang}/static-residential-proxy` 
        },
        { 
          text: lang === 'zh' ? '动态住宅代理' : 'Dynamic Residential Proxy', 
          href: `/${lang}/dynamic-residential-proxy` 
        },
        { 
          text: lang === 'zh' ? '数据中心代理' : 'Data Center Proxy', 
          href: `/${lang}/static-datacenter-proxy` 
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
        { text: lang === 'zh' ? '帮助中心' : 'Help Center', href: 'https://helpcenter.ipflex.ink/' },
        { text: lang === 'zh' ? '开发文档' : 'Documentation', href: '#' },
        { text: lang === 'zh' ? '联系我们' : 'Contact Us', href: '#' },
      ],
    },
    {
      title: lang === 'zh' ? '公司' : 'Company',
      links: [
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
    },
    {
      name: 'FastTK',
      nameCn: 'FastTK',
      nameEn: 'FastTK',
      logo: 'fasttk.png',
      description: lang === 'zh' ? '提供TikTok/YouTube/Instagram等海外社媒涨粉、点赞、曝光等服务' : 'Provide TikTok/YouTube/Instagram and other overseas social media to increase followers, likes, exposure and other services',
      href: 'https://www.fasttk.com/?affId=iqdrYBs9zo'
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
