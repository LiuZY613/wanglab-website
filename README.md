# Wang Lab Website

Wang Lab — AI for Physics @ 中国科学院物理研究所

> 🚀 网站上线后将在此处放置访问链接

---

### 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173` 即可预览完整网站。

### 构建

```bash
npm run build    # 自动拉取组会数据 + 论文 → 生成静态站
npm run preview  # 预览构建结果
```

### 技术栈

- **VitePress** — 静态站点生成
- **GitLab** — 代码托管
- **Markdown** — 内容管理

### 项目结构

```
docs/
├── index.md              # 首页
├── about.md              # 关于我们
├── people/index.md       # 团队成员
├── research/             # 研究方向 + 组会记录
├── publications/         # 论文发表 (自动从 CV 提取)
├── daily/                # AI 日报
└── notes/                # 小组成员技术分享 (开发中)
```

### 自动同步

- **组会记录**: 构建时自动从 `code.itp.ac.cn/codes/groupmeeting` 拉取
- **论文列表**: 构建时自动从王磊老师 CV PDF 提取
