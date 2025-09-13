---
title: "機器學習 5：概率同貝葉斯思維"
subtitle: "DATA.ML.100 · Joni Kämäräinen · 2025年9月8號 星期一 K1704 😊"
date: "2025-09-11"
lang: "yue"
excerpt: "由頻率派直覺去到貝葉斯公式：條件概率、先驗同似然、ML 同 MAP 決策、蒙提霍爾問題、非傳遞骰仔、小樣本陷阱，仲有點解醫生都係天生貝葉斯派。"
tags: ["Joni Kämäräinen", "機器學習", "概率", "貝葉斯"]
draft: false
---
## 第1部分 — 貝葉斯概率同推理 

## 1.1 引言
今日我哋由確定性模型（例如擬合條直線、最小化誤差函數）轉去 **概率推理**。呢堂介紹 **貝葉斯概率**，一個可以根據新證據更新信念嘅框架。

兩條經典解題經驗：
1. 如果唔知點做，試下先擬合條直線——簡單起步；  
2. 定義一個誤差度量——搵個方法將佢最小化。  

而家我哋引入 **貝葉斯方法**：由先驗信念開始，結合觀測去更新，得出後驗信念。

---

## 1.2 骰仔概率複習

![板書](/images/docs/mlLecture5_Bayesianlearning/1.png)

考慮一個公平嘅六面骰仔：

- 擲出 `1` 嘅概率：  
  $$P(X=1)=\frac{1}{6}$$  

- 連續兩次都擲出 `1` 嘅概率：  
  $$P(\text{兩次都係1})=P(1)\cdot P(1)=\frac{1}{6}\cdot\frac{1}{6}=\frac{1}{36}$$  

- 無擲出 `1` 嘅概率：  
  $$P(X\neq 1)=1-P(X=1)=1-\frac{1}{6}=\frac{5}{6}$$  

以上就係**經典概率**。

---

## 1.3 頻率派 vs 貝葉斯派解釋

- **頻率派解釋**：  
  概率係事件喺無限次重複實驗入面嘅極限頻率。  
  例如：擲骰仔 1000 次，大約 1/6 嘅結果係 `1`。

- **貝葉斯解釋**：  
  概率表示一種**信念程度**，可以用新證據更新。  
  即使冇好多實驗次數，都可以用先驗知識分配同更新概率。

---

## 1.4 例子：蒙提霍爾問題

![板書](/images/docs/mlLecture5_Bayesianlearning/2.png)

遊戲規則：  
- 有三道門；  
- 一道門後面係車，其餘兩道門後面係山羊；  
- 你先揀一道門；  
- 主持人再打開另一道有山羊嘅門；  
- 佢問你：**換唔換門？**

分析：  
- 最初揀啱嘅概率：  
  $$P(\text{車喺揀中嘅門後面})=\frac{1}{3}$$  

- 車喺另外兩道門後面嘅概率：  
  $$P(\text{車喺其他門後面})=\frac{2}{3}$$  

主持人開咗一扇山羊門之後，**呢 $2/3$ 嘅概率集中喺剩低嗰道門**。

所以：  
- 唔換 = 贏嘅概率 $1/3$  
- 換 = 贏嘅概率 $2/3$  

**結論：** 換門好過唔換，贏面大一倍。

---

## 1.5 條件概率

![板書](/images/docs/mlLecture5_Bayesianlearning/3.png)

條件概率定義：

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}
$$

解釋：已知 $B$ 發生，$A$ 發生嘅概率。

**例子1：**  
- $A$：係哈比人  
- $B$：觀察到身高 = 120 cm  

咁：  
$$P(\text{hobbit}\mid \text{height}=120)$$ 會幾高，  
而 $$P(\text{elf}\mid \text{height}=120)$$ 就好低。

---

### 例子2：骰仔觀察更新信念

擲骰仔嘅時候，**就喺最後停低之前**，你見到頂面係 `5`，問最終頂面係 `1` 或 `2` 嘅概率？

- 標準骰仔相對面總和係 7，`1` 嘅對面係 `6`；  
- 如果頂面係 `5`，再滾一次後四個相鄰面等可能翻上去。

因此：

$$
P(\text{頂面=1}\mid \text{觀察=5})=\frac{1}{4}
$$

如果頂面係 `6`：

$$
P(\text{頂面=1}\mid \text{觀察=6})=0
$$

呢個例子顯示 **觀察會改變先驗**。  
原本嘅先驗可能係 $P(\text{頂面=1})=\frac{1}{6}$，但觀察之後要更新，呢個就係貝葉斯推理嘅精髓：

> **觀測會調整最初嘅信念（先驗）。**

---

## 1.6 貝葉斯定理

![板書](/images/docs/mlLecture5_Bayesianlearning/4.png)

貝葉斯學習嘅核心：

$$
P(A\mid B)=\frac{P(B\mid A)\cdot P(A)}{P(B)}
$$

其中：
- $P(A)$ = 先驗概率  
- $P(B\mid A)$ = 似然  
- $P(B)$ = 邊際概率  
- $P(A\mid B)$ = 後驗概率  

---

### 哈比人 vs 精靈例子
- $A$：係哈比人或精靈  
- $B$：觀察到嘅身高  

先驗：$P(\text{hobbit}),P(\text{elf})$  
似然：$P(\text{height}\mid\text{hobbit}),P(\text{height}\mid\text{elf})$  
證據：  
$$
P(\text{height})=P(\text{height}\mid\text{hobbit})P(\text{hobbit})+P(\text{height}\mid\text{elf})P(\text{elf})
$$

後驗：  
$$
P(\text{hobbit}\mid\text{height})=\frac{P(\text{height}\mid\text{hobbit})P(\text{hobbit})}{P(\text{height})}
$$

---

## 1.7 先驗嘅作用

![板書](/images/docs/mlLecture5_Bayesianlearning/5.png)

貝葉斯公式提醒我哋：**先驗好緊要**

- **先驗 ($P(A)$)：** 観測前嘅信念  
- **似然 ($P(B\mid A)$)：** 喺每個假設下觀測到數據嘅可能性  
- **證據 ($P(B)$)：** 保證歸一化  

$$
P(B)=\sum_A P(B\mid A)P(A)
$$

咁就有  

$$
\sum_A P(A\mid B)=1
$$

- **後驗 ($P(A\mid B)$)：** 加入證據後更新嘅信念  

例：火星車登陸  
- 先驗可以用衛星圖像估計某區域係岩石嘅概率（例如 10%）  
- 呢個先驗會直接影響最後嘅決策

---

## 第2部分 — 從數據估似然 ($P(B\mid A)$ 嘅真意)

![板書](/images/docs/mlLecture5_Bayesianlearning/6.png)

喺貝葉斯推斷入面，**似然** $P(B\mid A)$ 通常係一個 **概率密度函數 (PDF)**，唔係一個數字。  
例如：俾定類別 (Hobbit/Elf)，身高 $h$ 嘅條件分佈：

- $P(h\mid\text{hobbit})$ 同 $P(h\mid\text{elf})$  
- 佢哋係連續分佈，滿足
  $$
  \int_{-\infty}^{+\infty}p(h\mid\text{hobbit})\,\mathrm dh=1,\qquad
  \int_{-\infty}^{+\infty}p(h\mid\text{elf})\,\mathrm dh=1
  $$

### 2.1 用直方圖離散近似
將樣本 $h_1,\dots,h_N$ 分成區間 $I_j$，數：
$$
c_j=\#\{h_i\in I_j\},\qquad \hat P(h\in I_j)=\frac{c_j}{N}
$$
- 區間太少 → 太粗  
- 區間太多 → 太尖甚至零

### 2.2 擬合連續分佈（高斯例子）
若近似高斯：
$$
h\mid\text{hobbit}\sim\mathcal N(\mu_H,\sigma_H^2),\quad
h\mid\text{elf}\sim\mathcal N(\mu_E,\sigma_E^2)
$$

PDF：
$$
p(h\mid\mu,\sigma^2)=\frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-\frac{(h-\mu)^2}{2\sigma^2}\right)
$$

> **重點：** PDF 值唔係概率，淨係區間積分先係概率：
> $$
> P(a\le h\le b\mid \text{hobbit})=\int_a^b p(h\mid\text{hobbit})\,\mathrm dh
> $$

### 2.3 參數估計（高斯情況）
i.i.d. 情況下最大似然估計：
$$
\hat\mu_{\text{ML}}=\frac{1}{N}\sum h_i,\qquad
\hat\sigma^2_{\text{ML}}=\frac{1}{N}\sum (h_i-\hat\mu_{\text{ML}})^2
$$
（無偏方差用 $N-1$ 分母）

### 2.4 點解先估 $P(B\mid A)$
直接估 $P(A\mid B)$ 好難，通常先估每類分佈，再用貝葉斯公式倒轉去計後驗。

---

## 第3部分 — 決策：ML vs MAP（先驗嘅重要性）

設 $x$ 係觀測，$y\in\mathcal A$ 係類別。

### 3.1 最大似然 (ML)
揀最大似然嘅類：
$$
\hat y_{\text{ML}}=\arg\max_{y\in\mathcal A}P(x\mid y)
$$
> **唔理先驗。** 類別均衡時冇問題，但稀有類別就好差。

### 3.2 最大後驗 (MAP)
考慮埋先驗：
$$
\hat y_{\text{MAP}}
=\arg\max_{y\in\mathcal A}P(y\mid x)
=\arg\max_{y\in\mathcal A}\frac{P(x\mid y)P(y)}{P(x)}
\propto\arg\max_{y\in\mathcal A}P(x\mid y)P(y)
$$

![板書](/images/docs/mlLecture5_Bayesianlearning/7.png)

> **注意：** $P(x)$ 對所有 $y$ 一樣，可以喺 $\arg\max$ 直接約掉。

### 3.3 歸一化（兩類情況）
$$
P(x)=P(x\mid H)P(H)+P(x\mid E)P(E)
$$
保證
$$
P(H\mid x)+P(E\mid x)=1
$$

### 3.4 點解醫生「天生係貝葉斯派」
症狀 $x=$ “頭痛”：  
- **ML 思維：** 會諗到罕見但似然好高嘅病因（腦瘤）  
- **MAP 思維：** 考慮極細嘅先驗 $P(\text{tumor})$，先當係常見病，除非排除  

---
