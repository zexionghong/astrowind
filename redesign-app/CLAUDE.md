# IPFlex Redesign App — 开发规则

本目录是 `docs/redesign/preview.html` 预览稿的工程化实现（Vite + React 18 + TypeScript），
本质上是重构根目录的 Astro 版 IPFlex 网站。技术栈、页面结构、文案均以预览稿为准。

## 技术栈（不要随意引入新依赖）

- **构建**: Vite 5 + TypeScript (strict)
- **UI**: React 18 + react-router-dom 6（BrowserRouter）
- **样式**: 单一全局 CSS（`src/styles/global.css`，设计 token + 语义类名，与预览稿一一对应），不使用 CSS-in-JS / CSS Modules / Tailwind
- **国际化**: 自研轻量 i18n（`src/i18n/`），zh / en / ja 三语，JSON 文件按页面分命名空间

## 规则 1：组件必须抽象、优先复用

- **写任何页面前，先检索 `src/components/` 是否已有能完成该职责的组件；有就复用，没有才新建。**
- 相似 UI 出现第二次时，必须抽成共享组件（如 FeatureCard、StatGrid、FaqGrid、PageHero），
  通过 props / i18n key 前缀驱动差异，而不是复制粘贴 JSX。
- 同构页面共用一个组件：三个产品页（静态住宅 / 动态住宅 / 数据中心）共用 `ProductPage`，
  仅靠 `prefix: 'srp' | 'drp' | 'dc'` 切换文案与可选区块（如 dc 无 FAQ、srp 有计费对比）。
- 页面文件只负责「组装区块 + 提供 i18n key」，不写业务结构和样式；行数应保持在几十行级别。
- 新建组件前先确认：是否只是换个数据的重复？能否用现有组件加 prop 解决？

## 规则 2：项目结构清晰

```
redesign-app/src/
├── main.tsx              # 入口
├── App.tsx               # 路由表（唯一路由定义处）
├── routes.ts             # 路由 path 常量 + i18n key → path 映射
├── styles/global.css     # 全部样式：token 定义 → 基础 → 组件类（按区块注释分段）
├── i18n/
│   ├── index.tsx         # I18nProvider / useI18n（t 取字符串、ta 取数组）
│   └── locales/{zh,en,ja}.json   # 三语必须 key 完全对齐，按页面命名空间组织
├── components/
│   ├── Icon.tsx          # 全站唯一图标组件（内联 SVG path）
│   ├── ui/               # 跨页面复用的展示组件（Section、PageHero、FeatureCard、FaqGrid…）
│   └── layout/           # Header（含 PromoBar、语言切换、移动端菜单）、Footer、Layout
└── pages/                # 每个路由一个文件，只做区块组装
```

- 组件命名 PascalCase，一文件一组件；i18n key 用语义化点路径（`home.hero.title`）。
- 三语 JSON 的 key 结构必须一致（用 `npm run check:i18n` 思路保持对齐），新增文案三语同一次提交内补齐。
- 样式只写进 global.css 对应分段，沿用设计 token（`var(--primary)` 等），不写死颜色。

## 规则 3：完成一个功能就提交 git

- **每完成一个可独立描述的功能/页面，立即 `git commit`**，例如：
  - `feat: add ja locale`
  - `feat: shared layout (header/footer/i18n switcher)`
  - `feat: home page`
- 提交信息用 conventional commits（`feat:` / `fix:` / `refactor:` / `docs:`），一句中文或英文说清做了什么。
- 禁止把多个页面/功能混在一个提交里；禁止提交 `node_modules`、`dist`。
- 提交前确保 `npm run build` 通过（tsc --noEmit + vite build）。

## 常用命令

| 命令 | 用途 |
|------|------|
| `npm run dev` | 开发服务器 (localhost:5173) |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览构建产物 |
