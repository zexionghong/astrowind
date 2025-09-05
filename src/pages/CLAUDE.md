[根目录](../../CLAUDE.md) > **pages**

# 页面路由模块文档

## 模块职责

页面路由模块负责IPFlex网站的URL路由和页面渲染，实现国际化动态路由系统，支持中英双语访问。采用Astro的基于文件系统路由，提供静态站点生成和SEO优化。

## 入口与启动

- **根入口**: `index.astro` (重定向到默认语言)
- **语言入口**: `[lang]/index.astro` (多语言首页)
- **博客入口**: `[lang]/blog/[...page].astro` (博客列表)
- **产品页面**: `[lang]/static-residential-proxy.astro` 等

## 对外接口

### 路由结构

#### 核心页面路由
```
/                           # 根页面 (重定向)
/{lang}/                    # 多语言首页
/{lang}/pricing             # 价格页面
/{lang}/register            # 注册页面
/{lang}/scenarios           # 应用场景
/{lang}/privacy             # 隐私政策
/{lang}/terms               # 使用条款
```

#### 产品页面路由
```
/{lang}/static-residential-proxy     # 静态住宅代理
/{lang}/dynamic-residential-proxy    # 动态住宅代理  
/{lang}/static-datacenter-proxy      # 数据中心代理
/{lang}/detail                       # 产品详情
```

#### 博客系统路由
```
/{lang}/blog                         # 博客首页
/{lang}/blog/{slug}                  # 博客文章详情
/{lang}/blog/page/{page}             # 博客分页
/{lang}/blog/tag/{tag}/{page}        # 标签分页
/{lang}/tag/{tag}/{page}             # 全局标签页面
```

#### 用例页面路由
```
/{lang}/use-case/static-residential-proxy-scraping      # 数据抓取用例
/{lang}/use-case/static-residential-proxy-ecommerce     # 电商用例
/{lang}/use-case/dynamic-residential-proxy-crawling     # 爬虫用例
... (其他11个用例页面)
```

### API接口
- `rss.xml.ts` - RSS订阅feed生成
- 动态sitemap生成 (通过Astro配置)

## 关键依赖与配置

### 路由依赖
- **Astro Router**: 基于文件系统的路由
- **国际化系统**: `src/utils/i18n.ts`
- **内容集合**: `src/content/config.ts`
- **导航配置**: `src/navigation.ts`

### 页面类型配置
- **静态页面**: 直接渲染的.astro文件
- **动态页面**: 使用`[...slug]`的参数化页面
- **集合页面**: 基于content collections的页面

### SEO配置
- 每个页面都包含完整的meta标签
- 支持结构化数据 (JSON-LD)
- 多语言hreflang标签
- 自动生成sitemap

## 数据模型

### 页面参数接口
```typescript
interface PageParams {
  lang: 'zh' | 'en';
  slug?: string;
  page?: string;
  tag?: string;
}

interface BlogPageData {
  posts: CollectionEntry<'post'>[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}
```

### 多语言路由逻辑
- 默认语言: `zh` (中文)
- 支持语言: `['zh', 'en']`
- URL结构: `/{lang}/{page}`
- 语言检测: 基于URL路径第一段

## 测试与质量

### 当前状态
- ✅ 页面渲染正常 
- ✅ 国际化路由工作正常
- ✅ SEO元数据完整
- ✅ 静态生成成功
- ❌ 无自动化测试

### 质量保证
- **ESLint**: TypeScript和Astro代码检查
- **Prettier**: 代码格式化
- **Astro Check**: 类型检查和构建验证

### 建议测试
- **路由测试**: 确保所有路由正确响应
- **国际化测试**: 验证多语言内容正确加载  
- **SEO测试**: 检查meta标签和结构化数据
- **性能测试**: 页面加载时间和Core Web Vitals

## 常见问题 (FAQ)

**Q: 如何添加新页面？**
A: 在`[lang]/`目录创建`.astro`文件，添加相应的翻译文件，如需要更新导航配置。

**Q: 博客文章如何管理？**
A: 在`src/content/post/`添加.md文件，使用frontmatter配置元数据，系统自动生成路由。

**Q: 如何自定义404页面？**
A: 修改`404.astro`文件，确保包含多语言支持和正确的SEO设置。

**Q: 用例页面模板如何复用？**
A: 用例页面使用相同的布局，通过不同的i18n文件提供内容，保持结构一致性。

## 相关文件清单

```
src/pages/
├── 404.astro                        # 404错误页面
├── index.astro                      # 根页面重定向
├── rss.xml.ts                      # RSS feed生成
├── baidu_verify_*.html              # 百度站长验证文件
└── [lang]/                          # 多语言页面目录
    ├── index.astro                  # 首页
    ├── pricing.astro                # 价格页面
    ├── register.astro               # 注册页面  
    ├── scenarios.astro              # 应用场景
    ├── privacy.astro                # 隐私政策
    ├── terms.astro                  # 使用条款
    ├── detail.astro                 # 产品详情
    ├── static-residential-proxy.astro       # 静态住宅代理
    ├── dynamic-residential-proxy.astro      # 动态住宅代理
    ├── static-datacenter-proxy.astro        # 数据中心代理
    ├── blog/                        # 博客系统
    │   ├── [...slug].astro          # 博客文章详情
    │   ├── [...page].astro          # 博客分页列表
    │   └── tag/
    │       └── [tag]/
    │           └── [...page].astro  # 标签分页
    ├── tag/
    │   └── [tag]/
    │       └── [...page].astro      # 全局标签页面
    └── use-case/                    # 用例页面 (11个文件)
        ├── static-residential-proxy-*.astro    # 静态住宅代理用例
        ├── dynamic-residential-proxy-*.astro   # 动态住宅代理用例
        └── static-datacenter-proxy-*.astro     # 数据中心代理用例
```

### 文件统计
- **核心页面**: 8个
- **产品页面**: 4个  
- **博客系统**: 4个路由文件
- **用例页面**: 11个
- **验证文件**: 2个
- **总计**: 29个页面文件

## 变更记录 (Changelog)

### 2025-09-05 文档创建
- ✅ 分析页面路由架构和国际化实现
- ✅ 整理29个页面文件的功能分类
- ✅ 记录博客系统和用例页面的路由策略
- ✅ 识别SEO优化和静态生成配置
- 🔄 建议：添加路由测试和性能监控