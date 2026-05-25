import { SITE } from 'astrowind:config';
export const getHeaderData = (lang: string = 'zh') => ({
  links: [
    {
      text: lang === 'zh' ? '代理产品' : 'Products',
      // href: `/${lang}/detail`,
      links: [
        {
          text: lang === 'zh' ? '静态住宅代理' : 'Static Residential Proxy',
          href: `/${lang}/static-residential-proxy`,
          icon: 'tabler:home',
          description: lang === 'zh' ? '高质量静态住宅代理IP，稳定可靠，适合跨境电商代理长期使用' : 'High-quality static residential proxy IPs, stable and reliable for long-term cross-border e-commerce use',
          badge: lang === 'zh' ? '推荐' : 'Recommended'
        },
        {
          text: lang === 'zh' ? '动态住宅代理' : 'Dynamic Residential Proxy',
          href: `/${lang}/dynamic-residential-proxy`,
          icon: 'tabler:refresh',
          description: lang === 'zh' ? '动态轮换住宅代理IP，适合网页抓取代理和大规模数据采集' : 'Dynamic rotating residential proxy IPs, perfect for web scraping proxy and large-scale data collection'
        },
        {
          text: lang === 'zh' ? '数据中心代理' : 'Data Center Proxy',
          href: `/${lang}/static-datacenter-proxy`,
          icon: 'tabler:server',
          description: lang === 'zh' ? '高速数据中心代理IP，HTTP/SOCKS5协议支持，性价比高' : 'High-speed datacenter proxy IPs with HTTP/SOCKS5 protocol support, great value'
        },
        {
          text: lang === 'zh' ? 'AI加速器' : 'AI Accelerator',
          href: `/${lang}/ai-accelerator`,
          icon: 'tabler:sparkles',
          description: lang === 'zh'
            ? '面向 ChatGPT、Claude 等 AI 工具的静态住宅网络加速与账号安全防护'
            : 'Static residential network acceleration and account protection for ChatGPT, Claude, and other AI tools',
          badge: lang === 'zh' ? '新品' : 'New'
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
          text: lang === 'zh' ? '广告验证代理' : 'Ad Verification Proxy',
          href: `/${lang}/use-case/static-residential-proxy-ad-verification`,
          icon: 'tabler:shield-check',
          description: lang === 'zh' ? '真实访问还原，精准阻击广告欺诈' : 'Real user simulation, precise ad fraud prevention'
        },
        {
          text: lang === 'zh' ? '市场研究与数据采集' : 'Market Research & Data Collection',
          href: `/${lang}/use-case/static-residential-proxy-scraping`,
          icon: 'tabler:database',
          description: lang === 'zh' ? '突破反爬虫，低风险批量采集' : 'Bypass anti-bot, low-risk bulk data collection'
        },
        {
          text: lang === 'zh' ? '跨境电商代理' : 'E-commerce Proxy',
          href: `/${lang}/use-case/static-residential-proxy-ecommerce`,
          icon: 'tabler:shopping-cart',
          description: lang === 'zh' ? '防止封号，多平台批量运营' : 'Prevent bans, manage multiple accounts across platforms'
        },
        {
          text: lang === 'zh' ? '网络安全与风控' : 'Network Security & Risk Control',
          href: `/${lang}/use-case/static-residential-proxy-security`,
          icon: 'tabler:shield',
          description: lang === 'zh' ? '渗透测试、品牌保护与风控巡检' : 'Penetration testing, brand protection, risk inspection'
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
        href: 'https://docs.ipflex.ink/'
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
      title: lang === 'zh' ? '代理产品' : 'Proxy Products',
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
        { 
          text: lang === 'zh' ? 'AI加速器' : 'AI Accelerator', 
          href: `/${lang}/ai-accelerator` 
        },
      ],
    },
    {
      title: lang === 'zh' ? '解决方案' : 'Solutions',
      links: [
        { text: lang === 'zh' ? '跨境电商' : 'Cross-border E-commerce', href: `/${lang}/use-case/static-residential-proxy-ecommerce` },
        { text: lang === 'zh' ? '品牌保护' : 'Brand Protection', href: `/${lang}/use-case/static-residential-proxy-security` },
        { text: lang === 'zh' ? '市场调研' : 'Market Research', href: `/${lang}/use-case/static-residential-proxy-scraping` },
        { text: lang === 'zh' ? '广告验证' : 'Ad Verification', href: `/${lang}/use-case/static-residential-proxy-ad-verification` },
      ],
    },
    {
      title: lang === 'zh' ? '支持' : 'Support',
      links: [
        { text: lang === 'zh' ? '帮助中心' : 'Help Center', href: 'https://docs.ipflex.ink/' },
        { text: lang === 'zh' ? '联系我们: support@ipflex.ink' : 'Contact Us: support@ipflex.ink', href: 'mailto:support@ipflex.ink' },
        { text: lang === 'zh' ? '商务合作: business@ipflex.ink' : 'Business Cooperation: business@ipflex.ink', href: 'mailto:business@ipflex.ink' },
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
    { ariaLabel: 'Telegram', icon: 'tabler:brand-telegram', href: 'https://t.me/IPFlexProxy' },
    // { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: '#' },
  ],
  footNote: `
    ${new Date().getFullYear()} ${SITE.name}. ${lang === 'zh' ? '版权所有' : 'All rights reserved'}.
  `,
});
