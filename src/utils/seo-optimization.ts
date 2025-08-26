// SEO优化工具函数
export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// 为不同类型的页面设置SEO优先级和更新频率
export function getSEOPriority(pathname: string): { priority: number; changefreq: SitemapEntry['changefreq'] } {
  // 首页
  if (pathname === '/' || pathname === '/zh' || pathname === '/en') {
    return { priority: 1.0, changefreq: 'daily' };
  }
  
  // 产品页面
  if (pathname.includes('/static-residential-proxy') || 
      pathname.includes('/dynamic-residential-proxy') || 
      pathname.includes('/static-datacenter-proxy')) {
    return { priority: 0.9, changefreq: 'weekly' };
  }
  
  // 定价页面
  if (pathname.includes('/pricing')) {
    return { priority: 0.8, changefreq: 'weekly' };
  }
  
  // 博客文章
  if (pathname.includes('/blog/') && !pathname.endsWith('/blog')) {
    return { priority: 0.7, changefreq: 'monthly' };
  }
  
  // 博客列表页
  if (pathname.includes('/blog')) {
    return { priority: 0.8, changefreq: 'daily' };
  }
  
  // 应用场景页面
  if (pathname.includes('/use-case/') || pathname.includes('/scenarios')) {
    return { priority: 0.7, changefreq: 'monthly' };
  }
  
  // 其他页面
  return { priority: 0.5, changefreq: 'monthly' };
}

// 生成面包屑结构化数据
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// 生成文章结构化数据
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishDate: Date;
  modifiedDate?: Date;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'IPFlex',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ipflex.ink/logo.png'
      }
    },
    datePublished: article.publishDate.toISOString(),
    dateModified: (article.modifiedDate || article.publishDate).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    image: article.image ? {
      '@type': 'ImageObject',
      url: article.image
    } : undefined
  };
}

// 生成产品结构化数据
export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  price?: { min: number; max: number; currency: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'IPFlex'
    },
    image: product.image,
    offers: product.price ? {
      '@type': 'AggregateOffer',
      lowPrice: product.price.min,
      highPrice: product.price.max,
      priceCurrency: product.price.currency,
      availability: 'https://schema.org/InStock'
    } : undefined
  };
}

// 优化图片alt文本
export function generateOptimizedAlt(context: {
  imageName?: string;
  pageName?: string;
  productName?: string;
  lang: string;
}): string {
  const { imageName, pageName, productName, lang } = context;
  
  if (productName) {
    return lang === 'zh' 
      ? `${productName} - IPFlex专业IP代理服务`
      : `${productName} - IPFlex Professional IP Proxy Service`;
  }
  
  if (pageName) {
    return lang === 'zh'
      ? `${pageName} - IPFlex全球IP代理解决方案`
      : `${pageName} - IPFlex Global IP Proxy Solutions`;
  }
  
  if (imageName) {
    return lang === 'zh'
      ? `${imageName} - IPFlex高质量代理IP服务`
      : `${imageName} - IPFlex High-Quality Proxy IP Service`;
  }
  
  return lang === 'zh'
    ? 'IPFlex - 全球领先的IP代理服务提供商'
    : 'IPFlex - Leading Global IP Proxy Service Provider';
}

// 检查页面SEO健康度
export function checkSEOHealth(page: {
  title?: string;
  description?: string;
  h1?: string;
  images?: Array<{ alt?: string; src: string }>;
}): Array<{ type: 'error' | 'warning' | 'info'; message: string }> {
  const issues = [];
  
  // 检查标题
  if (!page.title) {
    issues.push({ type: 'error', message: 'Missing page title' });
  } else if (page.title.length < 30) {
    issues.push({ type: 'warning', message: 'Title too short (< 30 characters)' });
  } else if (page.title.length > 60) {
    issues.push({ type: 'warning', message: 'Title too long (> 60 characters)' });
  }
  
  // 检查描述
  if (!page.description) {
    issues.push({ type: 'error', message: 'Missing meta description' });
  } else if (page.description.length < 120) {
    issues.push({ type: 'warning', message: 'Meta description too short (< 120 characters)' });
  } else if (page.description.length > 160) {
    issues.push({ type: 'warning', message: 'Meta description too long (> 160 characters)' });
  }
  
  // 检查H1标签
  if (!page.h1) {
    issues.push({ type: 'error', message: 'Missing H1 tag' });
  }
  
  // 检查图片alt属性
  const imagesWithoutAlt = page.images?.filter(img => !img.alt) || [];
  if (imagesWithoutAlt.length > 0) {
    issues.push({ 
      type: 'warning', 
      message: `${imagesWithoutAlt.length} images missing alt attributes` 
    });
  }
  
  return issues;
}