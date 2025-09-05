[根目录](../../CLAUDE.md) > **utils**

# 工具函数模块文档

## 模块职责

工具函数模块提供IPFlex网站的核心工具库，包括国际化处理、图片优化、前端元数据处理、目录管理等功能。为整个应用提供可复用的底层工具函数。

## 入口与启动

- **国际化工具**: `i18n.ts` - 多语言翻译系统
- **图片处理**: `images.ts`, `images-optimization.ts` - 图片优化和处理
- **前端元数据**: `frontmatter.ts` - Markdown内容处理  
- **通用工具**: `utils.ts` - 通用助手函数
- **目录管理**: `directories.ts` - 文件路径处理

## 对外接口

### 国际化工具 (i18n.ts)
```typescript
// 核心API
export function useTranslations(lang: string): (key: string) => string
export function initializeTranslations(): void  
export function getLanguageFromURL(pathname: string): Promise<string>

// 使用示例
const t = useTranslations('zh');
const title = t('hero.title');
```

### 图片处理工具 (images.ts)
```typescript
// 图片优化API
export function getImage(src: string, options?: ImageOptions): Promise<ImageResult>
export function getOptimizedImageSrc(src: string): string
export function generateImageSizes(width: number): string[]

// 响应式图片处理
export function createResponsiveImage(src: string): ResponsiveImageData
```

### 前端元数据工具 (frontmatter.ts)
```typescript
// Remark/Rehype插件
export const readingTimeRemarkPlugin: RemarkPlugin
export const responsiveTablesRehypePlugin: RehypePlugin  
export const lazyImagesRehypePlugin: RehypePlugin

// 元数据处理
export function processFrontmatter(content: string): FrontmatterResult
```

### 通用工具 (utils.ts)
```typescript
// 通用助手函数
export function formatDate(date: Date, locale?: string): string
export function slugify(text: string): string
export function truncateText(text: string, length: number): string
export function generateReadingTime(content: string): ReadingTime
```

## 关键依赖与配置

### 核心依赖
- **Node.js fs**: 文件系统操作
- **Sharp**: 图片处理和优化
- **Astro Image**: 图片集成和优化
- **MDX Plugins**: Markdown处理插件
- **Limax**: 文本转换和slug生成

### 配置集成
```typescript
// astro.config.ts 中的插件配置
markdown: {
  remarkPlugins: [readingTimeRemarkPlugin],
  rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
}

// 图片优化配置
image: {
  domains: ['cdn.pixabay.com'],
  formats: ['webp', 'avif'],
  quality: 80,
}
```

## 数据模型

### 国际化数据结构
```typescript
interface Translations {
  [key: string]: string | Translations;
}

interface TranslationCache {
  [lang: string]: Translations;
}

interface I18nConfig {
  languages: string[];
  defaultLanguage: string;
  textDirection: 'ltr' | 'rtl';
}
```

### 图片处理数据结构
```typescript
interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

interface ImageResult {
  src: string;
  width: number;
  height: number;
  format: string;
}

interface ResponsiveImageData {
  src: string;
  srcset: string;
  sizes: string;
}
```

### 前端元数据结构
```typescript
interface FrontmatterResult {
  data: {
    title: string;
    description?: string;
    tags?: string[];
    publishDate?: Date;
    [key: string]: any;
  };
  content: string;
  readingTime: ReadingTime;
}

interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}
```

## 测试与质量

### 当前状态
- ✅ 国际化功能正常工作
- ✅ 图片优化正常运行
- ✅ Markdown处理插件生效
- ✅ 通用工具函数可用
- ❌ 无单元测试覆盖
- ❌ 无性能基准测试

### 质量保证
- **TypeScript检查**: 提供类型安全保障
- **ESLint检查**: 代码质量和规范检查
- **构建验证**: Astro构建过程中的验证

### 建议测试策略
- **单元测试**: 每个工具函数的功能测试
- **集成测试**: 与Astro系统的集成测试
- **性能测试**: 图片处理和国际化性能测试
- **Edge Cases**: 边界情况和错误处理测试

## 常见问题 (FAQ)

**Q: 如何添加新的翻译语言？**
A: 在`src/i18n/`创建新语言目录，更新`initializeTranslations`函数中的语言列表。

**Q: 图片优化如何配置？**
A: 在`astro.config.ts`的image配置中设置域名、格式、质量等参数。

**Q: 如何自定义Markdown处理插件？**
A: 在`frontmatter.ts`中添加新的remark或rehype插件，并在Astro配置中注册。

**Q: 通用工具函数如何扩展？**
A: 在`utils.ts`中添加新函数，确保提供完整的TypeScript类型定义。

## 相关文件清单

### 工具函数文件
```
src/utils/
├── i18n.ts                    # 国际化工具函数
│   ├── useTranslations()      # 翻译函数生成器  
│   ├── initializeTranslations() # 翻译初始化
│   ├── getLanguageFromURL()   # URL语言检测
│   └── translationsCache      # 翻译缓存管理
├── images.ts                  # 图片处理工具
│   ├── getImage()            # 图片优化获取
│   ├── getOptimizedImageSrc() # 优化图片源
│   ├── generateImageSizes()   # 响应式尺寸
│   └── createResponsiveImage() # 响应式图片
├── images-optimization.ts     # 高级图片优化
│   ├── compressImage()       # 图片压缩
│   ├── convertFormat()       # 格式转换
│   ├── generateWebP()        # WebP生成
│   └── batchProcess()        # 批量处理
├── frontmatter.ts            # 前端元数据处理
│   ├── readingTimeRemarkPlugin # 阅读时间插件
│   ├── responsiveTablesRehypePlugin # 响应式表格
│   ├── lazyImagesRehypePlugin # 图片懒加载
│   └── processFrontmatter()   # 元数据处理
├── utils.ts                  # 通用工具函数
│   ├── formatDate()          # 日期格式化
│   ├── slugify()             # 文本转slug
│   ├── truncateText()        # 文本截断
│   ├── generateReadingTime()  # 阅读时间计算
│   └── sanitizeHTML()        # HTML清理
└── directories.ts            # 目录管理工具
    ├── getContentPaths()     # 获取内容路径
    ├── ensureDirectory()     # 确保目录存在
    ├── copyFiles()           # 文件复制
    └── cleanupTemp()         # 临时文件清理
```

### 功能模块统计

#### 国际化工具 (i18n.ts)
- ✅ 多语言翻译系统
- ✅ 翻译缓存机制
- ✅ URL语言检测
- ✅ 动态翻译加载

#### 图片处理工具 (images.ts + images-optimization.ts)
- ✅ 自动图片优化
- ✅ 格式转换 (WebP/AVIF)
- ✅ 响应式图片生成
- ✅ 批量处理支持
- ✅ 质量和尺寸控制

#### 前端元数据工具 (frontmatter.ts)
- ✅ 阅读时间计算
- ✅ 响应式表格处理
- ✅ 图片懒加载
- ✅ Markdown扩展功能

#### 通用工具 (utils.ts + directories.ts)
- ✅ 日期格式化
- ✅ 文本处理和转换
- ✅ 文件系统操作
- ✅ 路径管理

### 文件统计
- **工具函数文件**: 5个核心文件
- **主要功能**: 20+个工具函数
- **支持特性**: 多语言、图片优化、内容处理

## 变更记录 (Changelog)

### 2025-09-05 文档创建
- ✅ 分析工具函数模块架构和功能分类
- ✅ 整理5个核心工具文件的API接口
- ✅ 记录20+个主要工具函数的用途
- ✅ 识别国际化、图片处理、内容处理等关键功能
- 🔄 建议：添加工具函数单元测试和性能基准