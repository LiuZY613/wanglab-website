---
title: Wang Lab
layout: default
---

# {{ site.title }}

<p class="tagline">{{ site.description }}</p>

## About

<div class="intro-section" markdown="1">

我们隶属于中国科学院物理研究所凝聚态理论与计算重点实验室 **T03 组**，由**王磊**研究员领导。课题组聚焦于深度学习、量子算法与量子多体计算的交叉前沿，致力于发展新一代科学计算方法，推动人工智能驱动的科学发现。

我们的工作横跨算法开发、数值模拟与理论分析，研究方向包括：量子多体计算、AI for Quantum Science、统计物理与深度学习、高性能计算等。

</div>

{% assign categories = "pi:指导教师,postdoc:博士后,phd:在读博士生,alumni_phd:已毕业博士,alumni_postdoc:已出站博士后" | split: "," %}

{% for cat in categories %}
{% assign pair = cat | split: ":" %}
{% assign cat_key = pair[0] %}
{% assign cat_label = pair[1] %}
{% assign members = site.data.people | where: "category", cat_key %}
{% if members.size > 0 %}
<h2 class="section-title">{{ cat_label }}</h2>
<div class="people-grid">
{% for p in members %}
<div class="people-card">
  {% if p.github %}<img class="avatar" src="https://github.com/{{ p.github }}.png" alt="{{ p.name }}">{% endif %}
  <h3>{{ p.name }}</h3>
  <div class="role">{{ p.role }}</div>
  {% if p.bio %}<div class="bio">{{ p.bio }}</div>{% endif %}
  <div class="links">
    {% if p.github %}<a href="https://github.com/{{ p.github }}" target="_blank">GitHub</a>{% endif %}
    {% if p.homepage %}<a href="{{ p.homepage }}" target="_blank">Homepage</a>{% endif %}
  </div>
</div>
{% endfor %}
</div>
{% endif %}
{% endfor %}

## Links

### GitHub Organizations

<div class="link-grid">
<div class="link-card">
  <h3><a href="https://github.com/fermiflow" target="_blank">fermiflow</a></h3>
  <p><em>ab-initio study of fermions at finite temperature</em> — 课题组在有限温度费米子体系从头计算方向的核心开源组织。深度变分自由能方法、神经网络正则变换等关键算法均沉淀于此。课题组 Hao Xie、Zihang Li 等人的高温高压氢相图、氢 Hugoniot 曲线等工作均依赖该框架。</p>
</div>

<div class="link-card">
  <h3><a href="https://github.com/QuantumBFS" target="_blank">QuantumBFS</a></h3>
  <p><em>A group of quantum developers around Bao Fu Si (Temple)</em> — 量子计算与科学计算开源社区。课题组前博士后 Jin-Guo Liu 是核心成员，他与王磊老师合作开发了量子变分本征值求解器、量子电路 Born 机、可微张量网络等系列工作，代码均落地于此。SSSS 暑期学校也由该组织托管。</p>
</div>

<div class="link-card">
  <h3><a href="https://github.com/TensorBFS" target="_blank">TensorBFS</a></h3>
  <p><em>Tensorize Everything!</em> — 张量网络方法开源组织。课题组在可微编程张量网络（PRX 2019）、热带张量网络（PRL 2021）等方向有重要贡献。前博士后 Jin-Guo Liu 为该组织公开成员，组内多项张量网络相关工作均与此社区紧密关联。</p>
</div>
</div>

### Courses

<div class="link-grid">
<div class="link-card">
  <h3><a href="https://github.com/QuantumBFS/SSSS" target="_blank">SSSS</a></h3>
  <p>Summer School on Scientific Software and Skills — 科学计算与软件暑期学校。由课题组与 QuantumBFS 社区共同组织，面向计算物理方向的研究生与青年科研人员，教授现代科学计算工具、高效编程技巧与可重复研究方法。课程内容涵盖 GPU 编程、自动微分、高性能计算等课题组的日常技术栈。</p>
</div>

<div class="link-card">
  <h3><a href="https://github.com/wangleiphy/ml4p" target="_blank">ml4p</a></h3>
  <p>Machine Learning for Physics — 王磊老师主讲的面向物理研究的机器学习课程。系统介绍生成模型、变分自回归网络、神经网络量子态等课题组核心方法，将深度学习与量子多体物理两大领域有机结合，是进入 AI for Physics 方向的重要入门资源。</p>
</div>
</div>
