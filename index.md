---
title: Wang Lab
layout: default
---

# {{ site.title }}

<p class="tagline">{{ site.description }}</p>

## About

我们是中国科学院物理研究所凝聚态理论与计算重点实验室下属课题组，由王磊研究员领导。课题组聚焦于深度学习、量子算法与量子多体计算的交叉前沿，致力于发展新一代科学计算方法，推动人工智能驱动的科学发现。

我们的工作横跨算法开发、数值模拟与理论分析，研究方向包括：量子多体计算、AI for Quantum Science、统计物理与深度学习、高性能计算等。

---

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
  <p>Fermionic and quantum many-body computation tools and libraries.</p>
</div>

<div class="link-card">
  <h3><a href="https://github.com/QuantumBFS" target="_blank">QuantumBFS</a></h3>
  <p>Quantum-inspired algorithms, tensor networks, and scientific machine learning.</p>
</div>

<div class="link-card">
  <h3><a href="https://github.com/TensorBFS" target="_blank">TensorBFS</a></h3>
  <p>Tensor network methods and numerical simulation frameworks.</p>
</div>
</div>

### Courses

<div class="link-grid">
<div class="link-card">
  <h3><a href="https://github.com/QuantumBFS/SSSS" target="_blank">SSSS</a></h3>
  <p>Summer School on Scientific Software and Skills — 科学计算与软件暑期学校。</p>
</div>

<div class="link-card">
  <h3><a href="https://github.com/wangleiphy/ml4p" target="_blank">ml4p</a></h3>
  <p>Machine Learning for Physics — 面向物理研究的机器学习课程。</p>
</div>
</div>
