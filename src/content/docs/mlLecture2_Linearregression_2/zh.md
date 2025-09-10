---
title: "Machine Learning 2: 线性回归_(2nd note）"
subtitle: "线性模型 → 残差 → 平方误差 → MSE → ∂L/∂a=0, ∂L/∂b=0 → 正规方程 → a,b 的闭式解"
date: 2025-09-01
lang: zh
excerpt: "从两点到正规方程；解出 a、b；扩展到多输入（ŷ = A w）。"
tags: [Joni Kämäräinen, machine-learning, linear-regression, calculus, least-squares]
draft: false
---

## 从零开始用最小二乘法推导线性模型的 a 与 b

## 1) 任务是什么？

给定 **N** 个训练样本 $(x_1,y_1), (x_2,y_2), \ldots, (x_N,y_N)$，在线性模型
$$
\hat y \;=\; a x + b
$$
中推导 $a$ 与 $b$ 的**闭式**解，通过最小化均方误差
$$
L_{\text{MSE}}(a,b)
=\frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2.
$$
---

## 2) 老师讲了什么？

### 2.1 残差（Residual）  
对单个样本，**残差**是“真实值减去预测值”：  
$$
e_i = y_i - \hat{y}_i, \qquad \hat{y}_i = a x_i + b .
$$
<br />

### 2.2 平方误差（每个样本）  
平方误差是每个点“真实值与预测值之差”的平方。计算为（真实 − 预测）²：
$$
e_i^{2} = \big(y_i - \hat{y}_i\big)^2 .
$$
<br />

### 2.3 均方误差（MSE）  
均方误差（MSE）度量模型的平均误差：预测与真实之差的平方的平均值。
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2 .
$$
<br />

### 2.4 最小二乘（Least Squares）方法

最小二乘通过**最小化残差平方和**来为数据找到“最佳”直线/曲线。

$$
\min_{a,b}\; \frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2
$$

- $\boldsymbol{N}$：样本个数  
- $\boldsymbol{y}_i$：观测值（数据）  
- $\hat{\boldsymbol{y}}_i = a x_i + b$：预测值（模型输出）  
- $\boldsymbol{y}_i - \hat{\boldsymbol{y}}_i$：残差（第 $i$ 个样本的误差）  
- $\boldsymbol{\sum}$：对全部样本求和（$i=1\ldots \boldsymbol{N}$）  
- $\tfrac{1}{\boldsymbol{N}}$：取平均

此处机器学习的目标是：<span class="hl-marker">找到使 MSE 最小的参数对 (a, b)</span>。

<br />

### 2.5 如何找到使 MSE 最小的 (a, b)？

**方案：** 暴力搜索（brute force）。

在一个有界网格上尝试许多 $(a,b)$ 组合、计算损失
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2,
$$
并保留最优者。

- **a** 取 **-100 : 1 : +100**  
- **b** 取 **-100 : 1 : +100**  
- 计算 $L_{\text{MSE}}(a,b)$  
- 如果更小 → 更新当前最佳 $(a,b)$

黑板上的 “-100 : 1 : +100” 表示**从 -100 开始、步长 1、到 +100 结束**。

这个简单搜索清楚传达了思想：**我们在参数空间中寻找让 MSE 最小的 $(a,b)$**（之后会用闭式解或梯度法替代）。

<br />

### 2.6 寻找 $L_{\text{MSE}}$ 的极小值

我们要最小化 $L_{\text{MSE}}(a,b)$。

在极小值处，导数（斜率）为 0；因此

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0.
$$

$L_{\text{MSE}}$ 有两个自变量：$a$（斜率）与 $b$（截距）。

等价地，用向量形式表示为梯度为零：

$$
\nabla L_{\text{MSE}}(a,b)
=\left(\frac{\partial L_{\text{MSE}}}{\partial a},\ \frac{\partial L_{\text{MSE}}}{\partial b}\right)
=(0,0).
$$

**两个偏导的含义**
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial a}$：损失对斜率 $a$ 的变化率  
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial b}$：损失对截距 $b$ 的变化率

把 $L_{\text{MSE}}(a,b)$ 想象成一个“碗”：碗底各个方向的斜率都是零——那一点就是最优 $(a,b)$。

通过令梯度为零得到最优；此时 $L_{\text{MSE}}$ 达到极小。

<br />

### 2.7 链式法则（我们将用它来求导）
若函数是复合 $f(g(x))$，其导数满足**链式法则**：
$$
\frac{d}{dx} \, f\!\big(g(x)\big) \;=\; f'\!\big(g(x)\big)\cdot g'(x).
$$
接下来我们将把它用于对 MSE 中的“残差平方”分别对 \(a\)、\(b\) 求偏导。

<br />

---
## 3) MSE 的梯度——逐步推导

数据：$N$ 个样本 $(x_i,y_i)$。

- 线性模型  
  $$
  \hat y_i = a\,x_i + b
  $$

- 残差  
  $$
  r_i = y_i - \hat y_i = y_i - (a x_i + b)
  $$

- 平方误差（每样本）  
  $$
  r_i^2
  $$

- 均方误差（MSE）  
  $$
  L(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2
  $$

目标（最小二乘）：选择 $(a,b)$ 使 $L(a,b)$ **最小**。

---

## 4) 极小化原理

在 $L$ 的极小值处，
$$
\frac{\partial L}{\partial a}=0,
\qquad
\frac{\partial L}{\partial b}=0 .
$$

我们将使用链式法则：
$$
\frac{d}{dz}f(g(z)) = f'(g(z))\,g'(z).
$$

---

## 5) 对 \(a\) 求偏导——一个步骤也不省略

从
$$
\frac{\partial L}{\partial a}
= \frac{1}{N}\sum_{i=1}^{N}\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2 .
$$
开始。

对每一项用链式法则：
- 外层 $f(u)=u^2 \Rightarrow f'(u)=2u$
- 内层 $g(a)=y_i-(a x_i+b) \Rightarrow g'(a)=-x_i$

因此
$$
\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2
=2\big(y_i-(a x_i+b)\big)(-x_i),
$$
于是
$$
\frac{\partial L}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-x_i).
$$

令其等于 $0$ 并约去常数 $2/N$：
$$
\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)(-x_i)=0 .
$$

把 $-x_i$ 分配进去：
$$
\sum_{i=1}^{N}\big(-x_i y_i + a x_i^2 + b x_i\big)=0 .
$$

把同类项合并（把求和放进符号中）：
$$
a\sum_{i=1}^{N}x_i^2 + b\sum_{i=1}^{N}x_i - \sum_{i=1}^{N}x_i y_i = 0 .
$$

整理（第一条正规方程）：
$$
\boxed{\,a\sum x_i^2 + b\sum x_i = \sum x_i y_i \,}\tag{A}
$$

顺便把 $a$ 解出来（后面要代入）：
$$
a=\frac{\sum x_i y_i - b\sum x_i}{\sum x_i^2}. \tag{A1}
$$

---

## 6) 对 \(b\) 求偏导

同理，
$$
\frac{\partial}{\partial b}\Big(y_i-(a x_i+b)\Big)=-1,
$$
因此
$$
\frac{\partial L}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-1).
$$

令其等于 $0$ 并去掉 $2/N$：
$$
\sum_{i=1}^{N}(-y_i + a x_i + b)=0 .
$$

合并得到（第二条正规方程）：
$$
\boxed{\,a\sum x_i + bN = \sum y_i \,}\tag{B}
$$

再把 $b$ 解出：
$$
b=\frac{\sum y_i - a\sum x_i}{N}. \tag{B1}
$$

---

## 7) 代入法求解——每一步代数都写出来

### 7.1 用共同分母求 \(a\)

从 (A1) 出发，把 (B1) 中的 $b$ 代入：
$$
a=\frac{\sum x_i y_i - \Big(\frac{\sum y_i - a\sum x_i}{N}\Big)\sum x_i}{\sum x_i^2}.
$$

展开分子：
$$
\sum x_i y_i \;-\; \frac{(\sum x_i)(\sum y_i)}{N} \;+\; a\,\frac{(\sum x_i)^2}{N}.
$$

再分别除以 $\sum x_i^2$：
$$
a=\frac{\sum x_i y_i}{\sum x_i^2}
\;-\;\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}
\;+\;a\,\frac{(\sum x_i)^2}{N\,\sum x_i^2}. \tag{★}
$$

把右侧含 $a$ 的项移到左侧：
$$
a\Bigg(1-\frac{(\sum x_i)^2}{N\,\sum x_i^2}\Bigg)
=\frac{\sum x_i y_i}{\sum x_i^2}
-\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

把左侧写成同一分母：
$$
a\,\frac{N\sum x_i^2-(\sum x_i)^2}{N\,\sum x_i^2}
=\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

约去相同分母：
$$
a\big(N\sum x_i^2-(\sum x_i)^2\big)
= N\sum x_i y_i-(\sum x_i)(\sum y_i).
$$

因此
$$
\boxed{\,a=\dfrac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}\,}. \tag{C}
$$

### 7.2 用相同分母求 \(b\)（不走捷径）

从 (B1) 出发：
$$
b=\frac{\sum y_i}{N} - a\,\frac{\sum x_i}{N}.
$$

把 (C) 中的 $a$ 代入：
$$
b=\frac{\sum y_i}{N}
-\frac{\sum x_i}{N}\cdot
\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\sum x_i^2-(\sum x_i)^2}.
$$

把分母统一为 $N\big(N\sum x_i^2-(\sum x_i)^2\big)$：
$$
b=\frac{(\sum y_i)\big(N\sum x_i^2-(\sum x_i)^2\big)
-(\sum x_i)\big(N\sum x_i y_i-(\sum x_i)(\sum y_i)\big)}
{\,N\big(N\sum x_i^2-(\sum x_i)^2\big)} .
$$

把分子完全展开：
$$
\underbrace{N(\sum y_i)(\sum x_i^2)}_{\text{项 1}}
-\underbrace{(\sum y_i)(\sum x_i)^2}_{\text{项 2}}
-\underbrace{N(\sum x_i)(\sum x_i y_i)}_{\text{项 3}}
+\underbrace{(\sum x_i)^2(\sum y_i)}_{\text{项 4}} .
$$

注意：**项 2** 与 **项 4** 互相抵消。再把分子与分母同除以 $N$：
$$
b=\frac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}.
$$

于是
$$
\boxed{\,b=\dfrac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}
\;=\; \bar y - a\,\bar x\,}, \qquad
\bar x=\frac{1}{N}\sum x_i,\ \bar y=\frac{1}{N}\sum y_i .
$$

> 如果所有 $x_i$ 都相同，则 $N\sum x_i^2-(\sum x_i)^2=0$：斜率不可辨识（$x$ 没有变化）。

---

## 8)（可选）协方差形式

$$
a=\frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2}
=\frac{\mathrm{Cov}(x,y)}{\mathrm{Var}(x)},
\qquad
b=\bar y - a\,\bar x .
$$

---

## 9) 一个很小的数值校验

数据：$(0,1),(1,3),(2,5),(3,7)$（真实直线 $y=2x+1$）。  
求和：$\sum x=6,\ \sum y=16,\ \sum x^2=14,\ \sum xy=34,\ N=4$。

计算
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}
=\frac{136-96}{56-36}=\frac{40}{20}=2,
\qquad
b=\frac{16-2\cdot6}{4}=1.
$$

全部残差为 0 $\Rightarrow$ $\text{MSE}=0$。
