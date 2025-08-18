---
title: "Weekly Visualization 1: A Decade Ago: The World’s Happiest Countries in 2015"
subtitle: "A Tableau look at the happiest countries ten years ago"
date: 2025-08-15
lang: "en"
excerpt: "What did happiness look like ten years ago? I made a simple Tableau view so we can jump back to 2015."
tags: ["Tableau", "Happiness Index", "Data Visualization", "2015"]
draft: false
---

In the 2025 World Happiness Report, the winners are no surprise: Finland, Denmark, and Iceland take the top spots once again. They’ve been up there for so long it almost feels permanent. That got me wondering, who were the happiest countries ten years ago?

Back in 2015, “happiness rankings” weren’t really something most people paid attention to. Smartphones were just becoming part of everyday life, AI wasn’t around in our routines yet, and the world was still shaking off the effects of the 2008 financial crisis.

The top five countries that year were Switzerland, Iceland, Denmark, Norway, and Canada. The Nordic countries have always scored well, and it’s not just about money. People there can rely on each other, public services actually work, and trust runs pretty high. At the same time, a few countries without huge economies also showed up near the top, often because of strong family ties and close-knit communities.

---

## Interactive demo (Tableau)

> Tip: Click a country in the map or the ranking and the other charts will update. On the scatter plot, drag to select a region and compare a group of countries. In the stacked chart you can switch the view to see totals or shares.

### Figure 1: World Happiness Map (2015)
<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights (map)**

**Europe and Oceania:** Northern and Western Europe, together with Oceania, show darker colors. That means higher happiness.

**Middle East and Africa:** Many places are lighter. This matches the political and economic stress at that time.

**Latin America:** You can see bright spots where scores are high even with lower income. Close communities help a lot.

**Pattern:** High scores often sit together with longer life, strong support from others, and more choice in daily life.

---

### Figure 2: Top 10 happiest countries
<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights (top 10)**

**Who is on the list:** Mostly Nordic countries, plus places like Canada and Australia.

**How close it is:** The gap is small inside the top ten. It feels like a close race.

**What the bars show:** Health, social support, and a sense of choice look steady for the top group. No big weak spots.

**Across time:** If you compare 2015 and 2025, some countries barely move. Stable systems matter.

---

### Figure 3: Happiness Index × GDP (scatter plot)
<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights (scatter)**

**General trend:** Points rise from left to right. Higher GDP usually means higher happiness.

**Not a straight rule:** Some countries sit higher than their income would suggest. Costa Rica is a well known case.

**Regional pattern:** Many Latin American countries sit above the line. Community life helps.

**Top corner:** Nordic countries are not only rich. Trust and solid public systems give extra lift.

---

### Figure 4: What builds happiness (stacked chart)
<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights (components)**

**Balanced mix:** Nordic countries spread their strengths. Social support, choice, and low corruption each play a part.

**Single pillar risk:** Some places lean on one area, like health or family support. If that area gets hit, scores drop fast.

**Giving matters:** Generosity is a smaller share for many places, but where community ties are strong it still matters a lot.

**Totals vs shares:** In total view you will see two types. Some countries are balanced but low overall. Others are high overall but uneven inside.

---

### Figure 5: All charts together (dashboard)
<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights (dashboard)**

**Strong position:** Dark on the map, above the trend line on the scatter plot, and balanced in the stacked chart usually means a very solid year.

**Hidden gaps:** Some countries have good GDP but weak trust or little real choice in daily life. That pulls scores down.

**How to read it:** Start on the map, check the top ten, look at the scatter spot, then use the components to explain the difference.

---

## Wrap up: a snapshot from 2015

Public services and social support are steady pillars of happiness. Trust and working systems change how the same income feels in daily life. A balanced mix is safer than leaning on one thing. Ten years later, these patterns still hold. Happiness is not just a number. It grows over time in daily life and in our relationships.

> Data source: [World Happiness Report (2015, Kaggle dataset)](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)
