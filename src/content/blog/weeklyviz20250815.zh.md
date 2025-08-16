---
title: "Weekly Visualization 1：回看十年前：2015 年全球幸福指数"
subtitle: "用 Tableau 重温 2015 年的幸福地图"
date: 2025-08-15
lang: "zh"
excerpt: "十年前的幸福长啥样？我做了一个 Tableau 时光机，带你回到 2015 年看看。"
tags:
  - Tableau
  - 幸福指数
  - 数据可视化
  - "2015"
draft: false
---

在2025 年的《世界幸福报告》，芬兰、丹麦、冰岛又稳坐前三。它们的幸福分数十年如一日，简直像没换过卷子直接交。于是我突然想起，十年前的世界，到底有哪些幸福国家？  

回到 2015 年，那时候“幸福指数”这个词还算新鲜。智能手机刚刚普及到人手一台，人工智能还没出现在日常聊天里，世界很多地方也还没完全走出 2008 年金融危机的余波。  

在 2015 年的榜单里，前五名是瑞士、冰岛、丹麦、挪威和加拿大。北欧国家的分数一直靠前，不只是因为收入水平，还和社会支持、公共服务、个人自由以及廉洁程度等方面有关。与此同时，一些经济发展不算突出的国家，也能在紧密的家庭关系和乐观的文化氛围支撑下，交出一份亮眼的幸福答卷。

---

## 交互演示（Tableau）

> 小提示：你可以点击地图或排行榜里的国家名字，其他图表会自动跟着更新。在散点图上框选一片区域，可以直接对比一组国家。堆叠图还能切换显示方式，不同角度看幸福配方。

### 图 1：世界幸福地图（2015）
<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights（地图）**  
- 北欧、西欧和大洋洲的整体颜色都比较深，说明这些地方在幸福感上表现突出。  

- 中东和非洲部分地区颜色较浅，和当时的政治局势、经济环境有关。  

- 拉丁美洲呈现零散的亮点，有些国家的幸福分数意外地高，背后往往和社会关系紧密、社区氛围积极有关。  

- 单看地图就能发现，高分国家通常同时具备更长的预期寿命、更强的社会支持和较高的自由度。

---

### 图 2：Top 10 最幸福国家
<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights（Top 10）**  
- 前十名里几乎被北欧国家包围，还夹杂着加拿大、澳大利亚这样体量不小的英语国家。  

- 排行内部的差距并不大，前十名的分数差在一个可控范围内，可以说是你追我赶。  

- 把鼠标移到柱子上会发现，高分国家在健康、社会支持和自由度上表现都很稳定，没有明显短板。  

- 如果把 2015 和 2025 的榜单对照，会发现一些国家几乎没掉过队，这说明幸福感背后靠的是真正扎实的社会结构。

---

### 图 3：幸福指数 × GDP（散点图）
<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights（散点图）**  
- 整体趋势是往右上走的，也就是经济越强，幸福分数大体上也越高。  

- 但这并不是绝对的直线，有些国家在同样的经济水平下幸福分数却更高，比如哥斯达黎加。  

- 拉丁美洲有不少“高于趋势”的国家，这和当地的文化氛围、社会联结很有关系。  

- 最右上角的北欧国家并不是因为经济指标极端高，而是在社会信任、制度质量等方面叠加起来的优势。

---

### 图 4：幸福感成分占比（堆叠图）
<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights（成分占比）**  
- 北欧国家的幸福来源比较均衡，社会支持、自由度和廉洁度都有不小的份额，像一张三角形的结构，稳固不容易倒。  

- 一些国家则更多依赖单一因素，比如健康水平或者家庭支持，一旦遇到冲击，这种幸福感就更容易波动。  

- “慷慨”在很多国家的占比不算大，但在部分文化里却发挥了重要作用，尤其是和社区互助结合时。  

- 如果把图表切回“总量”模式，可以看出一些国家虽然结构平衡，但整体水平不高，而另一些国家虽然总量高，却偏科明显。

---

### 图 5：综合 Dashboard
<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
</figure>

**Insights（综合）**  
- 如果一个国家在地图上颜色深，在散点图里也高于趋势线，在成分图里结构还挺均衡，那基本可以说 2015 年它过得很稳。  

- 反过来看，有些国家虽然 GDP 不差，但在成分图里缺少自由度或者社会信任，幸福感就明显低于预期。  

- 综合图的好处就是能让你形成一个“故事线”：从地图选国家 → 看它在 Top10 有没有出现 → 再看散点图位置 → 最后用成分解释差距。

---

## 小结：十年前的那张“幸福合影”
2015 年的世界给我们留下几条启发：  
第一，稳定的公共服务和社会支持，是幸福感的长久支撑。  
第二，制度质量和信任感，能让同样的物质条件产生完全不同的体验。  
第三，幸福的来源最好是均衡的结构，而不是依赖单一维度。  

十年后的今天再看，这些规律依旧成立。幸福不是一时的分数，而是被慢慢经营的生活秩序和社会关系。  

> 数据来源：[World Happiness Report（2015，Kaggle 数据集）](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)

 
