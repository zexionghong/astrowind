# GEO 半自动监测说明

## 目标
把 GEO（AI 引用）监测标准化，避免只靠感觉判断效果。

## 一次性初始化
```bash
npm run geo:track -- init
```

会创建：
- `data/geo-tracker/keywords.txt`：监测关键词（可自行编辑）
- `data/geo-tracker/channels.txt`：监测渠道（可自行编辑）

## 每周流程
1. 生成本周模板
```bash
npm run geo:track -- plan --week 2026-03-05
```
会生成：`data/geo-tracker/2026-03-05.csv`

2. 打开 CSV 手动填写结果  
核心字段：
- `is_cited`：`yes/no`（建议统一写法）
- `source_url`：AI 回答引用到的 URL
- `landing_page_type`：`home/product/pricing/blog/docs` 等
- `position_note`：位置备注（例如 first citation）
- `notes`：补充说明

3. 生成汇总
```bash
npm run geo:track -- summary
```
输出：
- 总采样条数
- 被引用条数
- 引用率
- 按渠道统计

## 建议填写规范
- 每周固定时间、同一设备和网络环境
- 每个关键词只记录第一次结果
- 只统计“明确引用 ipflex.ink 页面”的回答

## 常见问题
- `plan already exists`：说明这周模板已生成，直接填写即可。
- 关键词不够：直接编辑 `data/geo-tracker/keywords.txt`。
- 渠道要调整：直接编辑 `data/geo-tracker/channels.txt`。

