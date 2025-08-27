# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an IPFlex proxy service website built with **Astro 4.16** and **Tailwind CSS**. It's a multilingual (Chinese/English) business website offering IP proxy services including residential proxies, datacenter proxies, and various proxy solutions.

## Key Technologies

- **Framework**: Astro 4.16 (static site generation)
- **Styling**: Tailwind CSS with custom theme
- **Language**: TypeScript
- **Content**: MDX for blog posts
- **Internationalization**: Custom i18n system supporting Chinese (zh) and English (en)
- **SEO**: Comprehensive SEO optimization with structured data

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview build locally |
| `npm run check` | Run Astro, ESLint, and Prettier checks |
| `npm run fix` | Fix ESLint and Prettier issues |
| `npm run check:astro` | Astro-specific type checking |
| `npm run check:eslint` | ESLint validation |
| `npm run check:prettier` | Prettier format check |

## Architecture & Key Directories

### Core Structure
```
src/
├── components/           # Astro components
│   ├── common/          # Shared components (Metadata, Analytics, etc.)
│   ├── ui/             # UI components (Button, Form, etc.)
│   ├── widgets/        # Business-specific widgets
│   └── blog/           # Blog-related components
├── content/            # Content collections (posts, privacy, terms)
├── pages/              # Route pages with [lang] dynamic routing
├── layouts/            # Page layouts
├── i18n/              # Translation files (en/, zh/)
├── utils/             # Utility functions
└── config.yaml        # Site configuration
```

### Important Architectural Decisions

1. **Multilingual Routing**: Uses `[lang]` dynamic routes with Chinese as default (`defaultLanguage: zh`)
2. **Content Management**: Uses Astro content collections for blog posts and static pages
3. **SEO-First**: Heavily optimized for search engines with structured data, meta tags, and sitemaps
4. **Component Architecture**: Separates UI, widgets, and common components for maintainability

### Key Files to Understand

- `src/config.yaml` - Central configuration for site settings, metadata, and i18n
- `src/navigation.ts` - Navigation structure and header/footer data by language
- `src/utils/i18n.ts` - Internationalization utilities and translation loading
- `astro.config.ts` - Astro configuration with integrations and build settings

## Content & SEO

### Blog System
- Content in `src/content/post/` as MDX files
- Supports tags, categories, and reading time
- Automatic RSS feed generation
- SEO-optimized with structured data

### SEO Features
- Comprehensive SEO audit completed (see `docs/SEO_AUDIT_REPORT.md`)
- Structured data for Organization, Product, and FAQ schemas
- Multilingual sitemaps and hreflang tags
- Performance optimized with image optimization and compression
- Security headers in `public/_headers`

### Translation System
- JSON-based translations in `src/i18n/{lang}/`
- Dynamic content loading with caching
- Navigation and content automatically localized

## Business Context

This is a commercial website for IPFlex, an IP proxy service provider. Key business areas:
- **Products**: Static/dynamic residential proxies, datacenter proxies
- **Target Markets**: Data scraping, e-commerce, ad verification, market research
- **Languages**: Primary Chinese market with English support
- **Competitive Industry**: Requires strong SEO performance

## Development Guidelines

### Adding New Pages
1. Create page in `src/pages/[lang]/` for multilingual support
2. Add translations in `src/i18n/{lang}/` JSON files
3. Update navigation in `src/navigation.ts` if needed
4. Ensure SEO metadata is properly configured

### Content Updates
- Blog posts go in `src/content/post/`
- Use frontmatter for metadata (title, description, tags, etc.)
- Images should be optimized (WebP preferred)
- Always include proper alt text for SEO

### SEO Considerations
- All pages should have unique titles and descriptions
- Use structured data where appropriate
- Follow the keyword strategy in `docs/SEO_KEYWORDS.md`
- Maintain fast loading times (images, compression)

### Styling
- Uses Tailwind CSS with custom theme in `tailwind.config.js`
- Custom CSS properties defined in `src/components/CustomStyles.astro`
- Dark mode support configured
- Mobile-first responsive design

## Deployment

- Configured for static deployment (Vercel, Netlify)
- Build artifacts go to `./dist/`
- Uses compression and optimization for production
- Analytics integrated (Google Analytics, Google Ads)

## Cursor Rules Integration

The project includes Cursor-specific rules in `.cursor/rules/markdown.mdc` defining SEO expert persona for content optimization. This should be considered when making content-related changes.