export function getStaticPathsForLang() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'zh' } },
  ];
}

export function generateBreadcrumbSchema(lang: string, pageName: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'IPFlex',
        item: `https://ipflex.ink/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: `https://ipflex.ink/${lang}/${pageUrl}`,
      },
    ],
  };
}

export function generateFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
