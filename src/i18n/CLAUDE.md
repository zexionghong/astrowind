[根目录](../../CLAUDE.md) > **i18n**

# 国际化系统模块文档

## 模块职责

国际化系统负责IPFlex网站的多语言支持，实现中英双语内容管理和动态翻译加载。通过JSON配置文件和TypeScript工具函数，为全站提供统一的多语言解决方案。

## 入口与启动

- **核心工具**: `../utils/i18n.ts` - 翻译系统主入口
- **配置入口**: `../config.yaml` - 语言配置 
- **默认语言**: `zh` (中文)
- **支持语言**: `['zh', 'en']`

## 对外接口

### 翻译函数API
```typescript
// 主要API接口
useTranslations(lang: string) => t(key: string) => string
getLanguageFromURL(pathname: string) => Promise<string>
initializeTranslations() => void
```

### 翻译文件结构
```
src/i18n/
├── zh/                     # 中文翻译
│   ├── common.json         # 通用翻译
│   ├── blog.json           # 博客翻译
│   ├── footer.json         # 底部翻译
│   ├── index.json          # 首页翻译
│   ├── pricing.json        # 价格页翻译
│   ├── scenarios.json      # 场景页翻译
│   ├── detail.json         # 详情页翻译
│   └── *-proxy.json        # 产品页翻译
└── en/                     # 英文翻译
    ├── common.json         # 通用翻译
    ├── blog.json           # 博客翻译
    └── ... (对应中文结构)
```

### 使用示例
```astro
---
import { useTranslations } from '../utils/i18n';
const t = useTranslations(lang);
---

<h1>{t('hero.title')}</h1>
<p>{t('hero.description')}</p>
```

## 关键依赖与配置

### 核心依赖
- **Node.js fs**: 文件系统读取
- **JSON**: 翻译数据格式
- **Astro**: 构建时翻译加载

### 配置文件
```yaml
# src/config.yaml
i18n:
  languages: ['en', 'zh']
  defaultLanguage: zh
  textDirection: ltr
```

### 翻译键命名规范
- 使用点号分层: `hero.title`, `features.item1.description`
- 语义化命名: 避免使用数字序号，使用描述性名称
- 保持一致性: 相同功能的翻译键在不同页面保持统一

## 数据模型

### 翻译数据结构
```typescript
interface Translations {
  [key: string]: string | Translations;
}

interface TranslationCache {
  [lang: string]: Translations;
}
```

### 翻译文件示例
```json
{
  "hero": {
    "title": "全球领先的IP代理服务商",
    "subtitle": "专业提供高质量代理IP解决方案",
    "description": "支持静态住宅代理、动态住宅代理、数据中心代理",
    "cta": {
      "primary": "立即注册",
      "secondary": "了解更多"
    }
  },
  "features": {
    "reliability": {
      "title": "99.9%可用性保证",
      "description": "企业级服务品质，稳定可靠"
    }
  }
}
```

## 测试与质量

### 当前状态
- ✅ 翻译加载功能正常
- ✅ 缓存机制工作正常
- ✅ 语言检测准确
- ❌ 无翻译完整性检查
- ❌ 无自动化测试

### 质量保证策略
- **翻译一致性**: 确保中英文翻译键结构一致
- **内容完整性**: 避免缺失翻译导致显示翻译键
- **格式验证**: JSON文件格式正确性检查

### 建议改进
- **翻译验证工具**: 检查缺失和多余的翻译键
- **自动化测试**: 翻译加载和缓存机制测试
- **翻译管理**: 使用专业翻译管理工具

## 常见问题 (FAQ)

**Q: 如何添加新的翻译？**
A: 在对应语言目录的JSON文件中添加翻译键值对，确保中英文都有对应翻译。

**Q: 翻译缓存如何工作？**
A: 系统在初始化时加载所有翻译到内存缓存，避免重复文件读取提高性能。

**Q: 如何处理缺失的翻译？**
A: 系统返回原始键名作为fallback，建议在开发时检查控制台警告。

**Q: 如何添加新语言支持？**
A: 创建新语言目录，复制翻译文件结构，更新`config.yaml`中的语言列表。

## 相关文件清单

### 中文翻译文件 (zh/)
```
src/i18n/zh/
├── common.json                           # 通用翻译 (导航、按钮等)
├── blog.json                            # 博客相关翻译
├── footer.json                          # 页脚翻译
├── index.json                           # 首页翻译
├── pricing.json                         # 价格页翻译
├── scenarios.json                       # 场景页翻译
├── detail.json                          # 详情页翻译
├── static-residential-proxy.json        # 静态住宅代理翻译
├── dynamic-residential-proxy.json       # 动态住宅代理翻译
├── static-datacenter-proxy.json         # 数据中心代理翻译
├── static-residential-proxy-use-case.json    # 静态住宅代理用例
├── dynamic-residential-proxy-use-case.json   # 动态住宅代理用例
└── static-datacenter-proxy-use-case.json     # 数据中心代理用例
```

### 英文翻译文件 (en/)
```
src/i18n/en/
├── common.json                           # 对应中文结构
├── blog.json
├── footer.json
├── index.json
├── pricing.json
├── scenarios.json
├── detail.json
├── static-residential-proxy.json
├── dynamic-residential-proxy.json
├── static-datacenter-proxy.json
├── static-residential-proxy-use-case.json
├── dynamic-residential-proxy-use-case.json
└── static-datacenter-proxy-use-case.json
```

### 文件统计
- **中文翻译**: 13个JSON文件
- **英文翻译**: 13个JSON文件  
- **工具函数**: 1个TypeScript文件
- **总计**: 27个国际化相关文件

## 变更记录 (Changelog)

### 2025-09-05 文档创建
- ✅ 分析国际化系统架构和文件组织
- ✅ 整理26个翻译文件的功能分类
- ✅ 记录翻译加载机制和缓存策略
- ✅ 识别多语言路由和内容管理流程
- 🔄 建议：添加翻译完整性检查和管理工具