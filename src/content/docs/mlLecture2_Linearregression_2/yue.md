---
title: "機器學習 2: 線性回歸_(2nd note）"
subtitle: "線性模型 → 殘差 → 平方誤差 → MSE → ∂L/∂a=0, ∂L/∂b=0 → 正規方程 → a,b 的閉式解"
date: 2025-09-01
lang: yue
excerpt: "由兩個樣本到正規方程；解出 a、b；擴展到多輸入（ŷ = A w）。"
tags: [Joni Kämäräinen, machine-learning, linear-regression, calculus, least-squares]
draft: false
---

## 由零開始用最小二乘法推導線性模型嘅 a 同 b

## 1) 任務係咩？

畀定 **N** 個訓練樣本 $(x_1,y_1), (x_2,y_2), \ldots, (x_N,y_N)$，喺線性模型
$$
\hat y \;=\; a x + b
$$
入面，透過最小化均方誤差搵出 $a$ 同 $b$ 嘅**閉式**解：
$$
L_{\text{MSE}}(a,b)
=\frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2.
$$
---

## 2) 老師講乜？

### 2.1 殘差（Residual）  
對單個樣本，**殘差**就係「真值減預測值」：  
$$
e_i = y_i - \hat{y}_i, \qquad \hat{y}_i = a x_i + b .
$$
<br />

### 2.2 平方誤差（每個樣本）  
平方誤差就係每點「真值－預測值」嘅平方（Actual − Predicted）²：
$$
e_i^{2} = \big(y_i - \hat{y}_i\big)^2 .
$$
<br />

### 2.3 均方誤差（MSE）  
均方誤差（MSE）量度模型平均誤差：預測同真值之差嘅平方嘅平均。
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2 .
$$
<br />

### 2.4 最小二乘（Least Squares）方法

最小二乘透過**最小化殘差平方和**，為數據搵到「最佳」直線/曲線：

$$
\min_{a,b}\; \frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2
$$

- $\boldsymbol{N}$：樣本總數  
- $\boldsymbol{y}_i$：觀測值（數據）  
- $\hat{\boldsymbol{y}}_i = a x_i + b$：預測值（模型輸出）  
- $\boldsymbol{y}_i - \hat{\boldsymbol{y}}_i$：殘差（第 $i$ 個樣本嘅誤差）  
- $\boldsymbol{\sum}$：對全部樣本求和（$i=1\ldots \boldsymbol{N}$）  
- $\tfrac{1}{\boldsymbol{N}}$：取平均

呢度機器學習嘅目標係：<span class="hl-marker">搵一對 (a, b) 令 MSE 最細</span>。

<br />


### 2.5 點樣搵到令 MSE 最細嘅 (a, b)？

**方案：** brute force（窮舉/暴力搜尋）。

喺有界網格試好多 $(a,b)$，計個 loss  
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2,
$$
揀最細嗰個。

- **a** 取 **-100 : 1 : +100**  
- **b** 取 **-100 : 1 : +100**  
- 計 $L_{\text{MSE}}(a,b)$  
- 如果更細 → 更新最佳 $(a,b)$

黑板上嘅 “-100 : 1 : +100” 即係**由 -100 開始、步長 1、到 +100 停**。

呢個簡單搜尋令概念好清楚：**我哋喺參數空間度搵令 MSE 最細嘅 $(a,b)$**（之後會用閉式解或梯度法取代）。

<br />

### 2.6 尋找 $L_{\text{MSE}}$ 嘅極小值

我哋要最小化 $L_{\text{MSE}}(a,b)$。

喺極小點，導數（斜率）等於 0；所以

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0.
$$

$L_{\text{MSE}}$ 有兩個自變量：$a$（斜率）同 $b$（截距）。

等價咁講，梯度為零：

$$
\nabla L_{\text{MSE}}(a,b)
=\left(\frac{\partial L_{\text{MSE}}}{\partial a},\ \frac{\partial L_{\text{MSE}}}{\partial b}\right)
=(0,0).
$$

**兩個偏導數係咩意思？**
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial a}$：損失對斜率 $a$ 嘅變化率  
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial b}$：損失對截距 $b$ 嘅變化率

將 $L_{\text{MSE}}(a,b)$ 畫成一個「碗」：碗底四面八方嘅斜率都係 0——嗰點就係最優 $(a,b)$。

令梯度變零就攞到最優；嗰陣 $L_{\text{MSE}}$ 係最細。

<br />



### 2.7 鏈式法則（我哋會用嚟做微分）
如果函數係 $f(g(x))$ 呢種複合，導數滿足**鏈式法則**：
$$
\frac{d}{dx} \, f\!\big(g(x)\big) \;=\; f'\!\big(g(x)\big)\cdot g'(x).
$$
下一節我哋會用呢個法則，對 MSE 入面嘅「殘差平方」分別對 \(a\) 同 \(b\) 做偏導。

<br />

---
## 3) MSE 嘅梯度——逐步推導

數據：$N$ 個樣本 $(x_i,y_i)$。

- 線性模型  
  $$
  \hat y_i = a\,x_i + b
  $$

- 殘差  
  $$
  r_i = y_i - \hat y_i = y_i - (a x_i + b)
  $$

- 平方誤差（每樣本）  
  $$
  r_i^2
  $$

- 均方誤差（MSE）  
  $$
  L(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2
  $$

目標（最小二乘）：揀 $(a,b)$ 令 $L(a,b)$ **最細**。

---

## 4) 極小化原理

喺 $L$ 嘅極小點，
$$
\frac{\partial L}{\partial a}=0,
\qquad
\frac{\partial L}{\partial b}=0 .
$$

我哋會用鏈式法則：
$$
\frac{d}{dz}f(g(z)) = f'(g(z))\,g'(z).
$$

---

## 5) 對 \(a\) 做偏導——一步都唔慳

開始：
$$
\frac{\partial L}{\partial a}
= \frac{1}{N}\sum_{i=1}^{N}\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2 .
$$

每項用鏈式法則：
- 外層 $f(u)=u^2 \Rightarrow f'(u)=2u$
- 內層 $g(a)=y_i-(a x_i+b) \Rightarrow g'(a)=-x_i$

所以
$$
\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2
=2\big(y_i-(a x_i+b)\big)(-x_i),
$$
而
$$
\frac{\partial L}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-x_i).
$$

設為 $0$ 並約去常數 $2/N$：
$$
\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)(-x_i)=0 .
$$

將 $-x_i$ 分配入去：
$$
\sum_{i=1}^{N}\big(-x_i y_i + a x_i^2 + b x_i\big)=0 .
$$

合併同類項（將求和放到符號入面）：
$$
a\sum_{i=1}^{N}x_i^2 + b\sum_{i=1}^{N}x_i - \sum_{i=1}^{N}x_i y_i = 0 .
$$

整理（第一條正規方程）：
$$
\boxed{\,a\sum x_i^2 + b\sum x_i = \sum x_i y_i \,}\tag{A}
$$

順手將 $a$ 解出（等陣要代返入去）：
$$
a=\frac{\sum x_i y_i - b\sum x_i}{\sum x_i^2}. \tag{A1}
$$

---

## 6) 對 \(b\) 做偏導

同樣：
$$
\frac{\partial}{\partial b}\Big(y_i-(a x_i+b)\Big)=-1,
$$
於是
$$
\frac{\partial L}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-1).
$$

設為 $0$ 並除去 $2/N$：
$$
\sum_{i=1}^{N}(-y_i + a x_i + b)=0 .
$$

合併得到（第二條正規方程）：
$$
\boxed{\,a\sum x_i + bN = \sum y_i \,}\tag{B}
$$

再將 $b$ 解出：
$$
b=\frac{\sum y_i - a\sum x_i}{N}. \tag{B1}
$$

---

## 7) 代入法求解——每步代數都寫晒

### 7.1 用共同分母搵 \(a\)

由 (A1) 出發，將 (B1) 嘅 $b$ 代入：
$$
a=\frac{\sum x_i y_i - \Big(\frac{\sum y_i - a\sum x_i}{N}\Big)\sum x_i}{\sum x_i^2}.
$$

展開分子：
$$
\sum x_i y_i \;-\; \frac{(\sum x_i)(\sum y_i)}{N} \;+\; a\,\frac{(\sum x_i)^2}{N}.
$$

再逐項除以 $\sum x_i^2$：
$$
a=\frac{\sum x_i y_i}{\sum x_i^2}
\;-\;\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}
\;+\;a\,\frac{(\sum x_i)^2}{N\,\sum x_i^2}. \tag{★}
$$

將右邊嗰個含 $a$ 嘅項搬去左邊：
$$
a\Bigg(1-\frac{(\sum x_i)^2}{N\,\sum x_i^2}\Bigg)
=\frac{\sum x_i y_i}{\sum x_i^2}
-\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

左邊整成同一分母：
$$
a\,\frac{N\sum x_i^2-(\sum x_i)^2}{N\,\sum x_i^2}
=\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

約去相同分母：
$$
a\big(N\sum x_i^2-(\sum x_i)^2\big)
= N\sum x_i y_i-(\sum x_i)(\sum y_i).
$$

所以
$$
\boxed{\,a=\dfrac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}\,}. \tag{C}
$$

### 7.2 用相同分母搵 \(b\)（唔走捷徑）

由 (B1) 開始：
$$
b=\frac{\sum y_i}{N} - a\,\frac{\sum x_i}{N}.
$$

代入 (C) 嘅 $a$：
$$
b=\frac{\sum y_i}{N}
-\frac{\sum x_i}{N}\cdot
\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\sum x_i^2-(\sum x_i)^2}.
$$

統一分母係 $N\big(N\sum x_i^2-(\sum x_i)^2\big)$：
$$
b=\frac{(\sum y_i)\big(N\sum x_i^2-(\sum x_i)^2\big)
-(\sum x_i)\big(N\sum x_i y_i-(\sum x_i)(\sum y_i)\big)}
{\,N\big(N\sum x_i^2-(\sum x_i)^2\big)} .
$$

將分子完全展開：
$$
\underbrace{N(\sum y_i)(\sum x_i^2)}_{\text{項 1}}
-\underbrace{(\sum y_i)(\sum x_i)^2}_{\text{項 2}}
-\underbrace{N(\sum x_i)(\sum x_i y_i)}_{\text{項 3}}
+\underbrace{(\sum x_i)^2(\sum y_i)}_{\text{項 4}} .
$$

留意：**項 2** 同 **項 4** 互相抵消。再將分子分母同時除以 $N$：
$$
b=\frac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}.
$$

咁就
$$
\boxed{\,b=\dfrac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}
\;=\; \bar y - a\,\bar x\,}, \qquad
\bar x=\frac{1}{N}\sum x_i,\ \bar y=\frac{1}{N}\sum y_i .
$$

> 如果全部 $x_i$ 都一樣，咁 $N\sum x_i^2-(\sum x_i)^2=0$：斜率唔可識別（$x$ 冇變化）。

---

## 8)（可選）協方差寫法

$$
a=\frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2}
=\frac{\mathrm{Cov}(x,y)}{\mathrm{Var}(x)},
\qquad
b=\bar y - a\,\bar x .
$$

---

## 9) 細細個數值驗證

數據：$(0,1),(1,3),(2,5),(3,7)$（真實直線 $y=2x+1$）。  
求和：$\sum x=6,\ \sum y=16,\ \sum x^2=14,\ \sum xy=34,\ N=4$。

計
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}
=\frac{136-96}{56-36}=\frac{40}{20}=2,
\qquad
b=\frac{16-2\cdot6}{4}=1.
$$

全部殘差都係 0 $\Rightarrow$ $\text{MSE}=0$。
