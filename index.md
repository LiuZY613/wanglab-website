---
title: Wang Lab
layout: default
---

# {{ site.title }}

<p class="tagline">{{ site.description }}</p>

## <a id="people"></a>People

<div class="people-grid">
{% for p in site.data.people %}
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

## Links

- **GitHub Orgs** — [fermiflow](https://github.com/fermiflow) · [QuantumBFS](https://github.com/QuantumBFS) · [TensorBFS](https://github.com/TensorBFS)
- **Courses** — [SSSS](https://github.com/QuantumBFS/SSSS) · [ml4p](https://github.com/wangleiphy/ml4p)
- **PI Homepage** — [wangleiphy.github.io](https://wangleiphy.github.io/)
