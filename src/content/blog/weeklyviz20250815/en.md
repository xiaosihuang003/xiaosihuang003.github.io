---
title: "A Decade Ago, The World’s Happiest Countries in 2015"
subtitle: "A Tableau look at the happiest countries ten years ago"
date: "2025-08-15"
lang: "en"
excerpt: "What did happiness look like ten years ago? I built an interactive Tableau view to revisit 2015 and reflect on what drives life satisfaction."
tags:
  - Tableau
  - Happiness Index
  - Data Visualization
  - "2015"
draft: false
---

In the 2025 World Happiness Report, the top of the chart looks familiar: Finland, Denmark and Iceland again. That stability raises a useful question for analysts: **were the same structural forces already visible ten years ago?**  This post revisits **2015** as a clean snapshot before recent shocks (pandemic, war-driven energy inflation, AI adoption). The goal is not only to show the ranks but to reason about **why** countries diverge—and whether those reasons were already in place.

---

## Interactive demo (Tableau)

> **How to use.** Select a country in the map or ranking to cross-highlight the scatter and the composition chart. In the scatter, drag to lasso a region and compare a cohort. In the stacked chart, switch between totals and shares to see whether a country’s **level** or **mix** drives its score.

<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figure 1. World Happiness Map (2015)</figcaption>
</figure>

### What the map shows (and why it matters)

The geography is not random. **Northern & Western Europe and Oceania** form a dark belt on the map, these are long-standing social democracies with high institutional trust, predictable public services, and relatively low corruption. The pattern is consistent with how life satisfaction is measured: a **global “life ladder”** evaluation that captures *how life feels* given one’s material and social environment.

In **Latin America**, several countries appear darker than their GDP would predict. This is a recurring over-performance often attributed to strong family and community ties and frequent social contact—factors that affect *daily experience* even without very high incomes.

Conversely, parts of the **Middle East and Sub-Saharan Africa** appear lighter, consistent with political instability, conflict exposure, or weak administrative capacity in the period.

> **Analyst’s note.** The spatial pattern implies that improvements are sticky: countries rarely jump categories in a few years unless a macro shock or institutional reform changes the lived context. 2015 already “looked like” 2025 in broad strokes.

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figure 2. Top 10 happiest countries</figcaption>
</figure>

### Reading the Top-10 as a stability test

The top group Switzerland, Iceland, Denmark, Norway, Canada clusters tightly. The small gaps mean the **ordering is less important than the shared architecture**: broad coverage of public goods, high social support, and freedom to make life choices. In interview terms: if your model predicts big rank flips year to year, it is probably overfitting noise rather than structure. 2015 already featured the Nordic block on top; 2025 largely preserves it.

A practical takeaway for policy analysis: **raising an already high score is hard** because the headroom is small. Most movement at the top tends to come from *non-income levers* trust, governance quality, and perceived freedom, rather than marginal income gains.

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figure 3. Happiness Index × GDP (scatter)</figcaption>
</figure>

### Income matters, until it doesn’t (diminishing returns)

The scatter makes two things clear: 
1) **Strong positive relation**: richer countries tend to report higher life satisfaction.  
2) **Diminishing returns**: gains flatten as income rises; *how* resources are converted into lived experience starts to dominate.


What I look for in this view are **residuals** countries far above or below the trend.  **Above-trend examples** (e.g., Costa Rica) suggest that social capital, community life, or governance convert limited income into a good lived experience.   **Below-trend cases** hint at bottlenecks: insecurity, weak institutions, or low trust that prevent income from translating into well-being.

This is the most actionable chart for policy diagnostics: pick a cohort with similar GDP, then ask why some members **over-convert** income into satisfaction while others **under-convert**.

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figure 4. What builds happiness (stacked composition)</figcaption>
</figure>

### Level vs mix: what actually drives the score

The composition view separates **level effects** (overall high/low) from **mix effects** (what a country leans on).

- **Balanced high performers** (typical Nordics) show no single pillar doing all the work; social support, healthy life expectancy, perceived freedom, and low corruption all contribute. That balance reduces fragility if one pillar dips, others cushion the impact.  
- **Single-pillar profiles** are fragile. Some countries lean heavily on *income* or *health* while scoring weakly on *trust/corruption* or *freedom*. A shock to the dominant pillar (e.g., recession) translates quickly into lower well-being because there is little redundancy.  
- **Generosity** is often small in absolute terms but acts as a **social lubricant**where interpersonal help is common, it amplifies the effect of other components.

Use the toggle (totals vs shares) to check whether a country’s problem is simply a **low total** (everything is small) or a **distorted mix** (one pillar is holding things back). The policy prescription differs.

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figure 5. Dashboard: map + ranking + scatter + composition</figcaption>
</figure>

### Putting it together: three archetypes you’ll find

1) **High-high-balanced,** Dark on the map, above the scatter trend, and no weak component. These are systems with consistency and redundancy, hard to move but also resilient.  
2) **High-GDP, mid happiness,** Right side of the scatter but near/under the trend line, often with weak *trust/corruption* or *freedom*. The policy story is institutional, not economic.  
3) **Low-GDP, over-performers,** Left side but above the trend. Community life and safety compensate for limited income; protecting those assets matters as much as chasing growth.

For interviews, I usually walk through one example of each archetype and outline **what levers plausibly move the needle** in each case.

---

## Methods & definitions

- **Metric,** The “happiness score” is the **life ladder**, a self-reported evaluation of one’s life.  
- **Components,** The stacked chart uses standard WHR proxies (e.g., log GDP per capita, healthy life expectancy, social support, freedom to make life choices, perceptions of corruption, generosity). They are **explanatory correlates**, not mechanical add-ups; the total is not a strict sum of parts.  
- **Why 2015,** Pre-pandemic baseline with fewer confounders; useful for asking whether 2025 patterns were already visible i.e., whether the “Nordic advantage” is structural rather than cyclical.  
- **Interactivity,** The point of Tableau here is not decoration; it enables cohort selection (lasso), cross-filters, and quick **residual thinking** (who sits above/below peers).

> Data source: [World Happiness Report (2015, Kaggle dataset)](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)

---

## Wrap up

By stepping back to 2015 we see that today’s leaders already shared the same **institutional architecture**: trust, functioning public services, and freedom that converts income into lived well-being. The scatter’s residuals and the composition mix tell the practical story: **it’s not only how much you have, but how predictably your system turns it into a good life**.  
Ten years on, the map looks similar for a reason.
