# redesign-app 重构任务规划与进度记录

> 本文档是 `docs/redesign/preview.html` → Vite + React 18 工程化实现的任务清单与进度落盘记录。
> 规则依据：`redesign-app/CLAUDE.md`（组件复用、目录结构、conventional commits、三语 i18n 对齐）。

## 一、总体任务规划

| # | 任务 | 状态 | 备注 |
|---|------|------|------|
| 1 | 工程脚手架（Vite5 + React18 + TS strict + react-router 6） | ✅ 完成 | 05d8896 已含 |
| 2 | 全局样式 `src/styles/global.css`（token + 语义类名） | ✅ 完成 | 与预览稿类名一一对应 |
| 3 | 自研 i18n（zh/en/ja 三语，208 keys 全对齐） | ✅ 完成 | `src/i18n/` |
| 4 | 共享布局（Header/PromoBar/语言切换/移动菜单/Footer） | ✅ 完成 | `components/layout/` |
| 5 | 共享 UI 组件（Section/PageHero/SecHead/FeatureGrid/StatGrid/FaqSection/CtaBanner/Icon） | ✅ 完成 | `components/ui/` |
| 6 | 首页 HomePage | ✅ 完成 | 结构与预览稿逐段核对一致 |
| 7 | 产品页 ×3（ProductPage 共用，prefix 驱动） | ✅ 完成 | G1/G2 已修复（71687be），截图复验一致 |
| 8 | 定价页 PricingPage | ✅ 完成 | 结构一致 |
| 9 | 场景页 ScenariosPage | ✅ 完成 | 结构一致（12 卡 + CTA） |
| 10 | 知识中心 ResourcesPage | ✅ 完成 | G2 已修复（FAQ 普通 section） |
| 11 | 博客页 BlogPage | ✅ 完成 | 6 卡 + 分页 |
| 12 | 关于页 AboutPage | ✅ 完成 | G2 已修复（FAQ 普通 section） |
| 13 | 注册页 RegisterPage | ✅ 完成 | 表单 + 引导区 |
| 16 | 视觉方向切换（A/B/C/D，`html[data-dir]`，localStorage 记忆） | ✅ 完成 | 导航栏 + 移动菜单，三语文案 |
| 14 | 构建保绿（`npm run build` 每次提交前通过） | 🔄 持续 | |
| 15 | 截图比对（Playwright 1440×900 fullPage ×10 路由） | ✅ 本轮完成 | G1/G2 修复后 10/10 与基线一致，后续按需复验 |

## 二、预览稿结构基线（docs/redesign/preview.html 逐页提取）

每页 `<section class>` 顺序 + h2 标题（保真比对的唯一依据）：

- **home**：sec-hero | 住宅代理服务 | 数据中心代理服务(sec-alt) | 快速开始 | 为什么选择我们(sec-alt) | 统计(无标题) | 常用场景(sec-alt) | **cta-banner** | 常见问题(sec-alt) | 返现卡
- **pricing**：phero-center | 定价卡 | 选购指南(sec-alt) | 价格相关特性 | 定价 FAQ(sec-alt) — 无 CTA
- **prod-srp**：phero-center | 统计 | 性能split(sec-alt) | 为什么 | 使用场景(sec-alt, grid-2×4) | 计费对比 | **FAQ(sec-alt)** — 无 CTA
- **prod-drp**：phero-center | 统计 | 性能split(sec-alt, mock 在左) | 为什么 | 使用场景(sec-alt) | **FAQ(普通 section)** — 无 CTA
- **prod-dc**：phero-center | 统计 | 性能split(sec-alt) | 为什么 | 使用场景(sec-alt) — 无 FAQ、无 CTA
- **scenarios**：phero-center | 12 场景卡(grid-3, sc-card) | **cta-banner**
- **resources**：phero-center | 栏目卡(grid-2) | 推荐使用顺序(sec-alt, order-steps) | **FAQ(普通 section)**
- **blog**：phero-center | 6 博客卡 + 分页（非 .blog-pager 类，inline flex）
- **about**：phero(左文右侧卡 phero-split) | 适合判断(q-grid) | 交付原则(sec-alt) | **FAQ(普通 section)**
- **register**：section-sm(reg-grid) | section-sm sec-alt(引导)

## 三、待修复差异清单（本轮工作）

| # | 差异 | 位置 | 修复方案 | 状态 |
|---|------|------|----------|------|
| G1 | 产品页结尾多了 CTA banner（预览稿无） | `components/ui/ProductPage.tsx` | 删除末尾 `<Section><CtaBanner/></Section>` | ✅ 71687be |
| G2 | FAQ 区块背景写死 sec-alt；drp/resources/about 应为普通 section | `components/ui/sections.tsx` FaqSection | 增加 `alt` prop，调用处按预览稿传参 | ✅ 71687be |
| G3 | 博客分页用 `.blog-pager` 类，预览稿为 inline flex 容器 | `pages/BlogPage.tsx` / global.css | 视觉等效，低优先级，保持现状可接受 | ⬜（可接受） |

## 四、已确认无差异（本轮核对通过）

- 首页 10 个区块顺序、统计区无标题、CTA 位于 FAQ 之前、返现卡结尾 —— 与预览稿一致
- 三产品页区块顺序 / mock 面板左右 / srp 计费对比 / dc 无 FAQ —— 与预览稿一致
- 定价页 5 区块、场景页 12 卡 + CTA、博客 6 卡 + 分页、关于页 split hero + q-grid、注册页双栏 —— 与预览稿一致

## 五、进度日志

- **2026-09-23**：完成预览稿全页结构基线提取（section 类名 + h2），逐页与 app 比对；确认首页/定价/场景/博客/关于/注册结构一致；登记 G1–G3 差异；落盘本文档。
- **2026-09-23**：建立本地分支 `redesign`（原 detached HEAD @05d8896）；提交 TASKS.md（31a011a）；修复 G1/G2（71687be），build 通过。
- **2026-09-23**：完成 G1/G2 修复后 10/10 路由 Playwright 截图复验（1440×900 fullPage，`/tmp/shots/`）：首页（10 区块顺序、CTA 在 FAQ 前、返现卡结尾）、三产品页（G1 无 CTA / G2 drp 普通 FAQ、srp/dc sec-alt FAQ）、定价页（FAQ sec-alt）、场景页（12 卡 + CTA）、知识中心（FAQ 普通 section）、博客（6 卡 + 分页）、关于页（FAQ 普通 section）、注册页（双栏 + sec-alt 引导）—— 全部与基线一致，无新增差异。G3 维持可接受。任务 15 本轮完成，进入保真持续维护。
- **2026-09-23**：三语 i18n 键数校验（zh/en/ja 各 208，结构完全对齐，无缺/多键）；Playwright 采集 en/ja 首页截图（1440×900 fullPage）—— 三语首页区块顺序与 zh 基线一致，文案均已本地化，无布局漂移。i18n 与截图任务验证通过。
- **2026-09-23**：补齐视觉方向切换。global.css 已含 A/B/C/D 四套 token，但 `index.html` 把 `data-dir` 写死为 `a`，页面上没有切换入口。新增 `DirSwitch`（`components/common.tsx`），写入 `html[data-dir]` 并记忆 `localStorage['ipflex-dir']`；桌面导航放在语言切换左侧，窄屏收进移动菜单顶部横排。三语补 `nav.dir*` 文案。
- （后续每完成一项在此追加，并同步勾选上方状态）
