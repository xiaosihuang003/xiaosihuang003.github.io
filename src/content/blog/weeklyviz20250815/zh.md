---
title: "每周可视化 1：十年前, 2015 年全球最幸福的国家"
subtitle: "用 Tableau 回看十年前的幸福国家排名报告"
date: "2025-08-15"
lang: "zh"
excerpt: "十年前的幸福是什么样？我做了一个可交互的 Tableau 视图，带我们回到 2015 年，看看是什么在驱动生活满意度。"
tags:
  - Tableau
  - 幸福指数
  - 数据可视化
  - "2015"
draft: false
---

在 2025 年《世界幸福报告》中，榜首很熟悉：芬兰、丹麦、冰岛再次夺冠。这种稳定性提出了一个值得分析的问题：**十年前相同的结构性力量是否已经能看见？** 这篇文章把 **2015 年** 当作在近期冲击（疫情、能源价格、AI 普及）之前的一个干净切面。目标不只是展示名次，更是解释**为什么**各国会分化，以及这些原因是否早已存在。

---

## 交互演示（Tableau）

> **使用方法。** 在地图或排名里选择一个国家，散点图和构成图会被联动高亮。在散点图中可以框选一个区域来比较同一组。在堆叠图中切换总量和占比，看看一个国家主要是**水平**问题还是**结构**问题。

<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">图 1. 2015 年世界幸福地图</figcaption>
</figure>

### 地图说明（以及为什么重要）

地理分布并非随机。**北欧与西欧以及大洋洲**在地图上形成一条深色带。这些国家长期拥有较高的制度信任、可预期的公共服务和较低的腐败感知。这个格局与幸福度的测量方式一致：它是一种全球性的主观生活评估，试图反映在特定物质和社会环境下人们的日常感受。

在 **拉丁美洲**，有些国家看起来比人均 GDP 所能解释的更“深”。这种超出预期的表现常被归因于强烈的家庭和社区联系以及频繁的社会互动，这些都会影响**日常体验**，即使收入并不很高。

相反，**中东与撒哈拉以南非洲**的一些地区更“浅”，这与当时的政治不稳定、冲突暴露或行政能力偏弱相符合。

> **分析说明。** 这种空间格局具有粘性。除非出现宏观冲击或制度改革，否则一个国家很少在几年内就“跨档”。从大的轮廓看，2015 年已经很像 2025 年。

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">图 2. 幸福度前十国家</figcaption>
</figure>

### 把前十当作稳定性测试来读

前十（瑞士、冰岛、丹麦、挪威、加拿大）聚得很紧。差距很小，说明**排序本身不如“共同架构”重要**：公共品覆盖广、社会支持强、生活选择自由度高。放到面试语境里：如果你的模型年年都预测大幅换位，大概率是在拟合噪声而不是结构。2015 年已经是北欧方阵在前，2025 年基本延续。

对政策分析的实用启示是：**把已经很高的分数再抬升很难**，因为“抬头空间”有限。顶端的变化更多来自**非收入杠杆**，如信任、治理质量和自由感，而不是边际收入增长。

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">图 3. 幸福指数 × 人均 GDP（散点）</figcaption>
</figure>

### 收入重要，但会出现边际递减

散点图说明两点：
1) **明显的正相关**：更富裕的国家往往报告更高的生活满意度。  
2) **边际递减**：收入越高，进一步提升越难；此时更重要的是资源**如何**被转化为好的日常体验。

在这个视图里我主要看**偏离趋势的国家**。**高于趋势线**（例如哥斯达黎加）通常意味着社会资本、社区生活或治理把有限的收入更有效地转化为良好体验。**低于趋势线**提示可能存在瓶颈：安全不足、制度薄弱或信任偏低，使收入难以转化为幸福。

这是最有操作性的图：先挑一组**收入相近**的国家，再分析为什么有的能**高效转化**，有的却**低效转化**。

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">图 4. 幸福的构成（堆叠组成）</figcaption>
</figure>

### 水平与结构：到底是什么在驱动分数

这个视图把**水平效应**（总体高低）和**结构效应**（一个国家更依赖哪些要素）分开来看。

- **均衡的高表现者**（典型北欧）没有单一支柱在“扛”。社会支持、健康预期寿命、自由选择、低腐败共同作用。均衡能降低脆弱性，如果某一项走弱，其他项能缓冲。  
- **单支柱画像**更脆弱。有些国家过度依赖**收入**或**健康**，但在**信任/腐败**或**自由**上偏弱。一旦主支柱遭遇冲击（例如衰退），幸福度会下行得更快。  
- **慷慨**在绝对量上常常不大，但能起到**社会润滑**的作用。在互助常见的地方，它会放大其他要素的效果。

用“总量/占比”切换来判断，一个国家的问题到底是**总量低**（各项都小），还是**结构失衡**（某个短板拖后腿）。两种情况下的政策处方不同。

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">图 5. 看板：地图 + 排名 + 散点 + 构成</figcaption>
</figure>

### 综合起来：三种常见原型

1) **高且均衡,** 地图颜色深、散点高于趋势、构成无明显短板。系统一致且有冗余，难以被大幅拉动，但更有韧性。  
2) **高收入，中等幸福,** 散点在右侧但接近或低于趋势线，常见弱项在**信任/腐败**或**自由**。这个问题更多是制度性的，而不是纯经济性的。  
3) **低收入，超额表现,** 散点在左侧但高于趋势线。社区生活和安全感在一定程度上弥补了收入不足，保护这些资产与追求增长同样重要。

面试展示时，我通常各选一个国家举例，并说明**哪些杠杆更可能有效**。

---

## 方法与定义

- **指标,** 幸福分数采用 life ladder，自我报告的整体生活评价。  
- **构成,** 堆叠图使用报告里的常见解释变量（对数人均 GDP、健康预期寿命、社会支持、生活选择自由、腐败感知、慷慨等）。它们是**解释相关项**，不是机械相加；总分不等于部分之和。  
- **为什么选 2015,** 作为疫情前的基线，混杂因素更少，便于判断 2025 年的格局是否已经显现，也就是所谓“北欧优势”到底是不是结构性的。  
- **交互价值,** Tableau 的作用不在装饰，而在于支持同侪选择（框选）、交叉联动，以及快速做**残差思维**（谁高于或低于同侪）。

> 数据来源: [World Happiness Report (2015, Kaggle 数据集)](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)

---

## 总结

回到 2015 年，我们可以看到今天的领先者早已拥有相似的**制度架构**：信任、可靠的公共服务、真实可感的自由，这些能把收入稳定地转化为好的日常生活。散点的偏离和构成的搭配讲的是同一个实践结论：**关键不只是有多少，而是系统能否可预期地把它转成幸福感。** 十年之后版图相似，自有其因。
