---
title: "Anomaly Detection with Multivariate Gaussian Distributions: A Case Study on Bike Sharing Data"
date: 2025-09-01
excerpt: "A Gaussian-based anomaly detection case study on Databricks bike sharing data."
tags: ["machine-learning", "databricks", "anomaly-detection", "gaussian"]
draft: false
---

<div class="proj-hero">
  <div class="left">
    <h3>Bike Sharing Demand Anomaly Detection (Gaussian Model)</h3>
    <p>I modeled normal demand with a <b>Multivariate Gaussian</b> on <b>temp</b>, <b>hum</b>, and <b>cnt</b>, then flagged hours with unusually low probability. Built and visualized in <b>Databricks</b>.</p>
    <div class="badges">
      <span>Python</span><span>Spark</span><span>Databricks</span><span>Gaussian</span><span>Anomaly Detection</span>
    </div>
    <div class="cta">
      <a class="btn" href="https://github.com/yourname/yourrepo" target="_blank">View Code on GitHub</a>
      <a class="btn ghost" href="/images/projects/bike-anomaly/report.pdf" target="_blank">One-page PDF</a>
    </div>
  </div>
  <div class="right">
    <ul class="kpis">
      <li><b>17,379</b><span>hours modeled</span></li>
      <li><b>5.0%</b><span>flagged anomalies</span></li>
      <li><b>3</b><span>key features</span></li>
    </ul>
  </div>
</div>

---

## Why this project?

- Ops teams need an early signal when demand spikes/drops against the weather.
- A light-weight Gaussian baseline is easy to explain and fast to ship.
- It’s a clean demo of using Databricks samples + Spark for an end-to-end workflow.

## What I built (story in 30 seconds)

<div class="grid-2">
  <div>
    <h4>1) Load & explore in Databricks</h4>
    <p>Browsed <code>dbfs:/databricks-datasets/bikeSharing/data-001/</code>. Picked <code>hour.csv</code> for hourly granularity.</p>
    <img src="/images/projects/bike-anomaly/step1-dataset.png" alt="DBFS exploration screenshot">
  </div>
  <div>
    <h4>2) Model normal demand</h4>
    <p>Features: <code>temp</code>, <code>hum</code>, <code>cnt</code>. Fitted μ and Σ, scored each hour with the multivariate Gaussian PDF.</p>
    <img src="/images/projects/bike-anomaly/step3-features.png" alt="Feature table">
  </div>
</div>

<div class="grid-2">
  <div>
    <h4>3) Threshold & flag</h4>
    <p>Used the 5th-percentile probability as a simple, explainable cutoff.</p>
    <ul class="bullets-tight">
      <li>Low prob ⇒ demand doesn’t match the weather.</li>
      <li>Top cases: cold/rainy hours with high rentals; sunny hours with low rentals.</li>
    </ul>
  </div>
  <div>
    <h4>4) Visualize</h4>
    <p>Quick sanity-check plot (temp vs. cnt). Orange “x” marks anomalies.</p>
    <img src="/images/projects/bike-anomaly/step6-results.png" alt="Scatter with anomalies">
  </div>
</div>

## Takeaways

- A Gaussian baseline already spots useful outliers without heavy models.
- Easy to productionize: daily job computes μ/Σ per season or per station.
- Clear hand-offs: ops for rebalancing, data team for sensor QA, product for UX experiments.

<details class="accordion">
  <summary>Show technical notes (μ/Σ, scoring, stability)</summary>

- **Params**: μ from column means; Σ from sample covariance (<code>rowvar=False</code>).  
- **Scoring**: PDF <code>p(x)</code> with Σ⁻¹ and |Σ|; anomalies = <code>p(x) &lt; quantile<sub>5%</sub></code>.  
- **Stability**: add small ridge <code>(Σ + λI)</code> if near-singular; recompute by season/hour-of-day.  
- **Next**: per-weather-cluster Gaussians; add <code>windspeed</code> and <code>weathersit</code>; drift checks.
</details>

## Links

- Source code: <a href="https://github.com/yourname/yourrepo" target="_blank">GitHub repo</a>  
- Notebook screenshots: <a href="/images/projects/bike-anomaly/" target="_blank">gallery</a>  
- One-pager PDF: <a href="/images/projects/bike-anomaly/report.pdf" target="_blank">download</a>

<style>
  .proj-hero{display:flex;gap:1.25rem;align-items:stretch;flex-wrap:wrap}
  .proj-hero .left{flex:1 1 520px}
  .proj-hero .right{flex:0 0 260px}
  .badges span{display:inline-block;background:#f2f4f7;border:1px solid #e6e8ec;
    padding:.25rem .5rem;border-radius:.5rem;margin:.15rem;font-size:.85rem}
  .cta{margin-top:.5rem}
  .btn{display:inline-block;background:#111;color:#fff;padding:.5rem .9rem;border-radius:.6rem;
    text-decoration:none;margin-right:.5rem}
  .btn.ghost{background:#fff;color:#111;border:1px solid #ddd}
  .kpis{list-style:none;padding:0;margin:0;border:1px solid #eee;border-radius:.75rem}
  .kpis li{padding:.8rem 1rem;border-bottom:1px solid #eee}
  .kpis li:last-child{border-bottom:0}
  .kpis b{display:block;font-size:1.3rem}
  .kpis span{font-size:.85rem;color:#667085}
  .grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;align-items:start;margin:.5rem 0}
  @media (max-width:900px){.grid-2{grid-template-columns:1fr}}
  .grid-2 img{width:100%;height:auto;border:1px solid #eee;border-radius:.6rem}
  .bullets-tight{margin:.25rem 0 0 1rem}
  .bullets-tight li{margin:.15rem 0}
  .accordion summary{cursor:pointer;font-weight:600;margin:.5rem 0}
  .accordion{border:1px solid #eee;border-radius:.6rem;padding:.6rem .8rem;background:#fafafa}
</style>
