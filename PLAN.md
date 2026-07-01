# 课题组网站建设规划

## 基本信息

- **课题组名称**：（待王磊老师确认）
- **PI**: 王磊 (Lei Wang)，中国科学院物理研究所
- **域名**：待定（所里可能有，先以 GitHub Pages 开发）
- **技术栈**：VitePress + GitHub Pages
- **语言**：主站中文，部分页面（Talks、Publications）可纯英文

---

## 站点结构

```
/
├── index.md                  # 首页
├── people/                   # 团队成员
│   ├── index.md              #   成员总览（卡片墙）
│   ├── wanglei.md            #   王磊老师（PI）
│   ├── member-a.md           #   成员A个人页
│   ├── member-b.md           #   成员B个人页
│   └── ...
├── research/                 # 研究方向
│   └── index.md
├── publications/             # 论文发表
│   └── index.md
├── groupmeetings/            # 组会记录
│   ├── index.md              #   组会列表（按年份折叠）
│   ├── 2026/
│   │   ├── 2026-06-30.md
│   │   └── ...
│   └── 2025/
│       └── ...
├── talks/                    # 学术报告/Talks
│   └── index.md              #   纯英文
├── codes/                    # 软件/代码
│   └── index.md
├── news/                     # 新闻动态
│   ├── index.md
│   └── 2026-xx-xx-xxx.md
├── teaching/                 # 教学
│   └── index.md
└── joinus.md                 # 招生/招聘
```

---

## 各页面内容规划

### 1. 首页 (`index.md`)

- 课题组名称 + Logo（如有）
- 一句话介绍研究方向（如"计算量子物理 / AI for Quantum Science"）
- 最新动态（最近 3 条 News）
- 快速导航入口（Research / People / Publications / Join Us）
- 页脚：单位信息、联系方式、GitHub 链接

### 2. 团队成员 (`people/`)

**总览页** (`people/index.md`)：
- PI 卡片（照片、姓名、职称、邮箱、个人页链接）
- 学生/博士后/助理卡片墙（头像、姓名、年级/身份、研究方向关键词）

**个人分页** (`people/<name>.md`)：
- 照片
- 基本信息（姓名、身份、入学年份/入职时间）
- 研究方向（一段文字）
- 已发表论文列表（可引用 publications 目录）
- 个人链接（GitHub、Google Scholar、个人主页、邮箱）
- **高可交互性**：成员通过 GitHub 直接编辑自己的 Markdown 文件，PR 合入即更新

### 3. 研究方向 (`research/index.md`)

- 每个方向一小节：标题 + 简介 + 代表性论文/图片
- 建议方向（待王磊老师确认）：
  - 量子多体计算
  - 机器学习与计算物理
  - 统计物理
  - 量子计算

### 4. 论文发表 (`publications/index.md`)

- 按年份倒序列出
- 每条论文：标题、作者、期刊/会议、年份、链接（DOI / arXiv）
- 可选：BibTeX 一键复制
- 纯英文

### 5. 组会记录 (`groupmeetings/`)

**列表页** (`groupmeetings/index.md`)：
- 按年份分组折叠
- 每条：日期 + 报告人 + 主题

**单次记录** (`groupmeetings/<year>/<date>.md`)：
- 会议信息（日期、时间、地点）
- 报告人、主题
- 摘要/笔记
- 附件链接（PPT、PDF、论文链接）
- 参考格式：ITP 组会 GitLab 仓库 (https://code.itp.ac.cn/codes/groupmeeting)

### 6. 学术报告 (`talks/index.md`)

- 王磊老师的邀请报告列表
- 纯英文
- 从现有 `wangleiphy.github.io/talks.html` 迁移

### 7. 软件/代码 (`codes/index.md`)

- 课题组开源项目列表
- 每个项目：名称、简介、GitHub 链接、论文引用

### 8. 新闻动态 (`news/`)

- 列表页 + 详情页
- 内容：论文接收、会议报告、获奖、新生加入等
- 支持 RSS（VitePress 可生成）

### 9. 教学 (`teaching/index.md`)

- 从现有 `wangleiphy.github.io/teaching.html` 迁移

### 10. 招生招聘 (`joinus.md`)

- 研究生招生信息
- 博士后/助理招聘
- 联系方式

---

## 技术方案

| 项目 | 选型 |
|------|------|
| 静态站点生成 | VitePress |
| 托管 | GitHub Pages |
| 域名 | 待定（先 `wangleiphy.github.io` 或新 repo） |
| CI/CD | GitHub Actions 自动构建部署 |
| 内容管理 | Markdown + Git，成员 PR 协作 |
| 样式 | VitePress 默认主题 + 少量自定义 |

---

## Repo 目录结构

```
wanglab-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── docs/                       # VitePress 内容根目录
│   ├── index.md
│   ├── people/
│   ├── research/
│   ├── publications/
│   ├── groupmeetings/
│   ├── talks/
│   ├── codes/
│   ├── news/
│   ├── teaching/
│   ├── joinus.md
│   └── public/                 # 静态资源（图片、PDF 等）
│       ├── photos/
│       └── files/
├── .vitepress/
│   └── config.js              # VitePress 配置（导航、侧边栏）
├── package.json
└── README.md
```

---

## 分工与协作方式

- Repo 共享给全组成员
- 每人维护自己的个人分页（`people/<name>.md`）
- 组会记录由每次报告人或指定记录人提交
- News 由知道消息的人随手更新
- 重大结构调整通过 PR + Review

---

## 待确认事项

- [ ] 课题组正式名称
- [ ] 域名
- [ ] 成员名单及个人信息
- [ ] 研究方向定稿
- [ ] 是否需要暗色模式
- [ ] Logo / 视觉风格偏好
