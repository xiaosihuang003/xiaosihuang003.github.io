---
title: "机器学习 5：概率与贝叶斯思维"
subtitle: "DATA.ML.100 · Joni Kämäräinen · 2025年9月8日 周一 K1704"
date: "2025-09-11"
lang: "zh"
excerpt: "从频率派直觉到贝叶斯公式：条件概率、先验与似然、ML 与 MAP 决策、蒙提霍尔问题、非传递骰子、小样本陷阱，以及为什么医生天生是贝叶斯派。"
tags: ["Joni Kämäräinen", "机器学习", "概率", "贝叶斯"]
draft: false
---

## 第1部分 — 贝叶斯概率与推理 

## 1.1 引言
今天我们从确定性模型（例如拟合一条直线、最小化误差函数）转向 **概率推理**。本节课介绍 **贝叶斯概率**，一种可以在得到新证据后更新信念的框架。

解决问题的两条经典经验：
1. 如果不确定，先试着拟合一条直线 —— 简单的起点；  
2. 定义一个误差度量 —— 找到最小化它的解。  

现在我们引入 **贝叶斯方法**：从先验信念出发，结合观测更新，得到后验信念。

---

## 1.2 骰子概率复习

![板书](/images/docs/mlLecture5_Bayesianlearning/1.png)

考虑一个公平的六面骰：

- 掷出 `1` 的概率：  
  $$P(X=1)=\frac{1}{6}$$  

- 连续两次都掷出 `1` 的概率：  
  $$P(\text{两次都是1})=P(1)\cdot P(1)=\frac{1}{6}\cdot\frac{1}{6}=\frac{1}{36}$$  

- 没掷出 `1` 的概率：  
  $$P(X\neq 1)=1-P(X=1)=1-\frac{1}{6}=\frac{5}{6}$$  

以上是**经典概率**。

---

## 1.3 频率派 vs 贝叶斯派解释

- **频率派解释**：  
  概率是事件在无限次重复试验中的极限频率。  
  例如：掷骰 1000 次，大约 1/6 的结果是 `1`。

- **贝叶斯解释**：  
  概率表示一种**信念程度**，可以用新的证据进行更新。  
  即便没有大量试验，也可以用先验知识分配并更新概率。

---

## 1.4 例子：蒙提霍尔问题

![板书](/images/docs/mlLecture5_Bayesianlearning/2.png)

游戏规则：  
- 三扇门；  
- 一扇门后是汽车，另外两扇是山羊；  
- 你先选一扇门；  
- 主持人再打开另一扇有山羊的门；  
- 你被问：**换不换门？**

分析：  
- 最初选对的概率：  
  $$P(\text{车在选中的门后})=\frac{1}{3}$$  

- 车在另外两扇门后的概率：  
  $$P(\text{车在其他门后})=\frac{2}{3}$$  

主持人开走一扇山羊门后，**这 $2/3$ 的概率集中到剩下没开的那扇门上**。

因此：  
- 不换 = 赢的概率 $1/3$  
- 换门 = 赢的概率 $2/3$  

**结论：** 换门更好，胜率翻倍。

---

## 1.5 条件概率

![板书](/images/docs/mlLecture5_Bayesianlearning/3.png)

条件概率的定义：

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}
$$

解释：已知 $B$ 发生的情况下，$A$ 发生的概率。

**例子1：**  
- $A$：是霍比特人  
- $B$：观察到身高 = 120 cm  

则：  
$$P(\text{hobbit}\mid \text{height}=120)$$ 很高，  
而 $$P(\text{elf}\mid \text{height}=120)$$ 很低。

---

### 例子2：骰子观察更新信念

掷骰时，**就在最后一次停止前**，你观察到顶面是 `5`，问最终顶面为 `1` 或 `2` 的概率？

- 标准骰相对面和为 7，`1` 的对面是 `6`；  
- 若顶面是 `5`，翻滚一次后四个相邻面等可能朝上。

因此：

$$
P(\text{顶面=1}\mid \text{观察=5})=\frac{1}{4}
$$

若观察到顶面是 `6`：

$$
P(\text{顶面=1}\mid \text{观察=6})=0
$$

这表明 **观测会改变先验概率**。  
原先的先验可能是 $P(\text{顶面=1})=\frac{1}{6}$，但在观察后要更新，这就是贝叶斯推理的本质：

> **观测调整了初始信念（先验）。**

---

## 1.6 贝叶斯公式

![板书](/images/docs/mlLecture5_Bayesianlearning/4.png)

贝叶斯学习的核心：

$$
P(A\mid B)=\frac{P(B\mid A)\cdot P(A)}{P(B)}
$$

其中：
- $P(A)$ = 先验概率  
- $P(B\mid A)$ = 似然  
- $P(B)$ = 边际概率  
- $P(A\mid B)$ = 后验概率

---

### 霍比特人 vs 精灵例子
- $A$：是霍比特人或精灵  
- $B$：观察到的身高  

先验：$P(\text{hobbit}),P(\text{elf})$  
似然：$P(\text{height}\mid\text{hobbit}),P(\text{height}\mid\text{elf})$  
证据：  
$$
P(\text{height})=P(\text{height}\mid\text{hobbit})P(\text{hobbit})+P(\text{height}\mid\text{elf})P(\text{elf})
$$

后验：  
$$
P(\text{hobbit}\mid\text{height})=\frac{P(\text{height}\mid\text{hobbit})P(\text{hobbit})}{P(\text{height})}
$$

---

## 1.7 先验的作用

![板书](/images/docs/mlLecture5_Bayesianlearning/5.png)

贝叶斯公式告诉我们：**先验很重要**

- **先验 ($P(A)$)：** 观测前的信念  
- **似然 ($P(B\mid A)$)：** 每个假设下观测到数据的可能性  
- **证据 ($P(B)$)：** 保证归一化  

$$
P(B)=\sum_A P(B\mid A)P(A)
$$

使得  

$$
\sum_A P(A\mid B)=1
$$

- **后验 ($P(A\mid B)$)：** 融合证据后的更新信念  

例：火星车着陆  
- 先验可由卫星图像估计某区域是岩石的概率（例如 10%）  
- 该先验会直接影响最终决策

---

## 第2部分 — 从数据估计似然 ($P(B\mid A)$ 的含义)

![板书](/images/docs/mlLecture5_Bayesianlearning/6.png)

在贝叶斯推断中，**似然** $P(B\mid A)$ 通常是一个 **概率密度函数 (PDF)**，而不是单个数字。  
例如：给定类别 (Hobbit/Elf)，身高 $h$ 的条件分布为

- $P(h\mid\text{hobbit})$ 和 $P(h\mid\text{elf})$  
- 它们是连续分布，满足
  $$
  \int_{-\infty}^{+\infty}p(h\mid\text{hobbit})\,\mathrm dh=1,\qquad
  \int_{-\infty}^{+\infty}p(h\mid\text{elf})\,\mathrm dh=1
  $$

### 2.1 用直方图近似
把样本 $h_1,\dots,h_N$ 分到区间 $I_j$，计数
$$
c_j=\#\{h_i\in I_j\},\qquad \hat P(h\in I_j)=\frac{c_j}{N}
$$
- 区间太少 → 太粗糙  
- 区间太多 → 过于稀疏甚至为 0

### 2.2 拟合连续分布（高斯分布例子）
若近似高斯：
$$
h\mid\text{hobbit}\sim\mathcal N(\mu_H,\sigma_H^2),\quad
h\mid\text{elf}\sim\mathcal N(\mu_E,\sigma_E^2)
$$

PDF：
$$
p(h\mid\mu,\sigma^2)=\frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-\frac{(h-\mu)^2}{2\sigma^2}\right)
$$

> **重要：** PDF 值不是概率，只有对区间积分才是概率：
> $$
> P(a\le h\le b\mid \text{hobbit})=\int_a^b p(h\mid\text{hobbit})\,\mathrm dh
> $$

### 2.3 参数估计（高斯情况）
i.i.d. 情况下最大似然估计：
$$
\hat\mu_{\text{ML}}=\frac{1}{N}\sum h_i,\qquad
\hat\sigma^2_{\text{ML}}=\frac{1}{N}\sum (h_i-\hat\mu_{\text{ML}})^2
$$
（无偏方差使用 $N-1$ 分母）

### 2.4 为什么先估 $P(B\mid A)$
直接估 $P(A\mid B)$ 很难，通常先估每类的分布（似然），再用贝叶斯公式倒推后验。

---

## 第3部分 — 决策：ML vs MAP（先验的重要性）

设 $x$ 为观测，$y\in\mathcal A$ 为类别。

### 3.1 最大似然 (ML)
选择似然最大的类别：
$$
\hat y_{\text{ML}}=\arg\max_{y\in\mathcal A}P(x\mid y)
$$
> **忽略先验。** 类别均衡时有效，但稀有类别时表现差。

### 3.2 最大后验 (MAP)
把先验考虑进去：
$$
\hat y_{\text{MAP}}
=\arg\max_{y\in\mathcal A}P(y\mid x)
=\arg\max_{y\in\mathcal A}\frac{P(x\mid y)P(y)}{P(x)}
\propto\arg\max_{y\in\mathcal A}P(x\mid y)P(y)
$$

![板书](/images/docs/mlLecture5_Bayesianlearning/7.png)

> **注意：** $P(x)$ 对所有 $y$ 相同，在 $\arg\max$ 中可约掉。

### 3.3 归一化（两类情况）
$$
P(x)=P(x\mid H)P(H)+P(x\mid E)P(E)
$$
保证
$$
P(H\mid x)+P(E\mid x)=1
$$

### 3.4 为什么医生“天生是贝叶斯派”
症状 $x=$ “头痛”：  
- **ML 思维：** 容易跳到罕见但似然高的病因（脑瘤）  
- **MAP 思维：** 考虑极小的先验 $P(\text{tumor})$，先考虑常见原因，直到被排除  

---
