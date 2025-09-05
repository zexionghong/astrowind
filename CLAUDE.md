# IPFlex代理服务网站 - 架构文档

## 变更记录 (Changelog)

### 2025-09-05 架构分析更新
- 完成项目整体架构分析和文档初始化
- 生成模块结构图和索引
- 添加国际化系统、内容管理、布局系统等模块的详细分析
- 识别8个主要功能模块，覆盖率达到80%

---

## 项目愿景

IPFlex是全球领先的IP代理服务商，专注于为企业用户提供高质量的代理IP解决方案。本网站作为公司的官方门户，承载着品牌展示、产品推广、客户获取和SEO营销的重要使命，支持中英双语服务全球市场。

## 架构总览

IPFlex网站基于**Astro 4.16**静态站点生成框架构建，采用现代化的**组件化架构**和**国际化设计**，具备完善的SEO优化和性能优化特性。

### 核心技术栈
- **前端框架**: Astro 4.16 (静态站点生成)
- **样式系统**: Tailwind CSS + 自定义主题
- **编程语言**: TypeScript
- **内容管理**: MDX + Astro Content Collections
- **国际化**: 自定义i18n系统 (中文/英文)
- **构建工具**: Vite + 自定义集成
- **SEO优化**: 结构化数据、多语言SEO、性能优化

## 模块结构图

```mermaid
graph TD
    A["IPFlex 代理服务网站"] --> B["src/components"];
    A --> C["src/pages"];
    A --> D["src/i18n"];
    A --> E["src/content"];
    A --> F["src/layouts"];
    A --> G["src/utils"];
    A --> H["src/assets"];
    A --> I["vendor"];

    B --> B1["widgets/"];
    B --> B2["ui/"];
    B --> B3["common/"];
    B --> B4["blog/"];

    C --> C1["[lang]/"];
    C --> C2["[lang]/use-case/"];
    C --> C3["[lang]/blog/"];

    D --> D1["zh/ (中文)"];
    D --> D2["en/ (英文)"];

    E --> E1["post/ (博客)"];
    E --> E2["privacy/"];
    E --> E3["terms/"];

    F --> F1["Layout.astro"];
    F --> F2["PageLayout.astro"];
    F --> F3["LandingLayout.astro"];

    click B "./src/components/CLAUDE.md" "查看组件层文档"
    click C "./src/pages/CLAUDE.md" "查看页面路由文档" 
    click D "./src/i18n/CLAUDE.md" "查看国际化文档"
    click E "./src/content/CLAUDE.md" "查看内容管理文档"
    click F "./src/layouts/CLAUDE.md" "查看布局系统文档"
    click G "./src/utils/CLAUDE.md" "查看工具函数文档"
    click H "./src/assets/CLAUDE.md" "查看静态资源文档"
    click I "./vendor/CLAUDE.md" "查看自定义集成文档"
```

## 模块索引

| 模块路径 | 模块名称 | 职责描述 | 核心文件 | 状态 |
|----------|----------|----------|----------|------|
| `src/components` | 组件层 | UI组件、业务组件、通用组件 | widgets/*.astro, ui/*.astro | 🔄 完整 |
| `src/pages` | 页面路由 | 国际化路由、动态路由、博客系统 | [lang]/*.astro, [lang]/blog/*.astro | ✅ 完整 |
| `src/i18n` | 国际化系统 | 中英文翻译、多语言内容管理 | zh/*.json, en/*.json | ✅ 完整 |
| `src/content` | 内容管理 | 博客文章、静态页面、内容集合 | post/*.md, config.ts | ✅ 完整 |
| `src/layouts` | 布局系统 | 页面布局模板、Markdown布局 | Layout.astro, PageLayout.astro | ✅ 完整 |
| `src/utils` | 工具函数 | 图片处理、前端元数据、目录管理 | i18n.ts, images.ts | ✅ 完整 |
| `src/assets` | 静态资源 | 图片、图标、样式资产 | images/**, favicons/** | ✅ 完整 |
| `vendor` | 自定义集成 | 自定义Astro集成、配置加载 | integration/index.ts | ✅ 完整 |

## 运行与开发

### 开发命令

| 命令 | 用途 |
|------|------|
| `npm run dev` | 启动开发服务器 (localhost:3000) |
| `npm run build` | 构建生产版本到 ./dist/ |
| `npm run preview` | 本地预览构建结果 |
| `npm run check` | 运行 Astro、ESLint、Prettier 检查 |
| `npm run fix` | 修复 ESLint 和 Prettier 问题 |

### 环境要求
- **Node.js**: ^18.17.1 || ^20.3.0 || >= 21.0.0
- **包管理器**: npm (推荐) 或 yarn

## 测试策略

目前项目暂未包含自动化测试，建议后续添加：
- **单元测试**: 组件逻辑测试 (Vitest + Testing Library)
- **集成测试**: 页面渲染测试
- **E2E测试**: 关键用户流程测试 (Playwright)
- **性能测试**: Lighthouse CI

## 编码规范

### 文件组织
- 组件使用 `.astro` 扩展名，工具函数使用 `.ts`
- 按功能模块组织目录结构
- 静态资源放在 `src/assets/` 或 `public/`

### 命名约定
- 组件名使用 PascalCase (如 `Header.astro`)
- 文件名使用 kebab-case (如 `static-residential-proxy.astro`)
- 类型定义使用 PascalCase

### 样式规范
- 优先使用 Tailwind CSS 类名
- 自定义样式通过 CSS 变量定义
- 响应式设计采用移动优先策略

### 国际化规范
- 所有用户可见文本必须支持中英文
- 翻译文件按页面或功能模块组织
- 使用语义化的翻译键名

## AI使用指引

### 内容创建
- 使用AI辅助生成博客内容和SEO优化文案
- 确保生成内容符合代理服务行业特点
- 维持专业、技术化的语调

### 代码协作
- AI可以协助组件开发和重构
- 重点关注SEO优化和性能优化
- 遵循现有的架构模式和编码规范

### 多语言支持
- AI协助翻译内容时需要考虑技术术语的准确性
- 保持中英文内容的一致性和专业性

---

## 变更记录 (Changelog)

### 2025-09-05 初始架构分析
- ✅ 完成项目整体结构分析
- ✅ 识别8个核心功能模块
- ✅ 生成模块结构图和索引表格
- ✅ 创建.claude/index.json索引文件
- ✅ 分析技术栈和架构决策
- 🔄 待完成：各模块详细文档创建

### 历史记录
- 项目基于AstroWind模板构建
- 针对IP代理服务业务进行了深度定制
- 实现了完整的中英双语支持
- 集成了全面的SEO优化功能