# Wang Lab

> AI for Physics · 中国科学院物理研究所

组内成员及产出统一入口页，托管于 GitHub Pages。

**线上地址**：[liuzy613.github.io/wanglab-website](https://liuzy613.github.io/wanglab-website/)

---

## 如何更新自己的信息

编辑 `_data/people.yml`，添加或修改自己的条目：

```yaml
- name: 你的名字
  role: 博士生 (2026级)
  bio: 研究方向关键词
  github: 你的GitHub用户名
  homepage: https://你的个人主页（可选）
```

提交 PR 或直接推送到 `master`，网站自动更新。

---

## 本地预览

需要 Ruby。安装后：

```
bundle install
bundle exec jekyll serve
```

打开 `http://localhost:4000/wanglab-website/`。
