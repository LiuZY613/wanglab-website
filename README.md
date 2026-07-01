# Wang Lab Website

中国科学院物理研究所王磊课题组网站。基于 VitePress 构建，内容由 Markdown 编写，Git 协作维护。

---

## 如何打开网站

```bash
# 1. 安装依赖（仅首次）
npm install

# 2. 启动本地服务器
npm run dev
```

浏览器打开 `http://localhost:5173` 即可查看完整网站。

---

## 项目目的

为课题组提供统一的对外窗口，包含：

- 课题组介绍与研究方向
- 成员信息展示
- 论文发表列表（自动从 CV 提取）
- 组会记录（自动从 GitLab 同步）
- AI 日报（每日自动生成）
- 小组成员技术分享（开发中）

---

## 技术栈

- VitePress — 静态站点生成
- GitLab — 代码托管与协作
- Markdown — 内容编写

---

## 目录结构

```
docs/
├── index.md              # 首页
├── about.md              # 课题组介绍
├── people/               # 成员信息
├── research/             # 研究方向 + 组会记录
├── publications/         # 论文列表
├── daily/                # AI 日报
└── notes/                # 技术分享（开发中）
```
