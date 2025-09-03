---
title: "第 2 課：線性迴歸"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 28.8.2025 TB104"
date: 2025-09-01
lang: "yue"
excerpt: "由零開始推導簡單線性迴歸（$y = a x + b$）：定義殘差同 MSE，用鏈式法則，將 $a$、$b$ 嘅偏導設為 0，解正規方程得到 $a$、$b$ 嘅封閉解，再用細例子驗證。"
tags: ["Joni Kämäräinen", "機器學習", "線性迴歸", "微積分", "最小二乘"]
draft: false
---
## 由零開始用最小二乘法推導線性模型入面嘅 a 同 b

## 第 1 部分：導言

![板書](/images/docs/Lecture%202_Linearregression/1.png)

我哋由機器學習最基本嘅問題開始。老師講到呢個概念同樣喺神經網絡、甚至現代語言模型入面都有。中學學過嗰啲數學已經夠應付今日內容。

<br />

### 1.1 線性模型

回顧熟悉嘅直線方程：

$$
y = a x + b .
$$

呢個就係線性模型。暫時只有一個輸入同一個輸出，但同一套諗法可以擴展到多個輸入、多個輸出。

呢度 $x$ 係輸入（我哋量度到嘅觀測），$y$ 係目標變量。

<br />

### 1.2 模型參數

兩個參數分別係斜率同截距：

* $a$ 係斜率，控制條直線幾“斜”。如果 $a = 0$，直線同 $x$ 軸平行；$a$ 愈大，上升愈快。  
* $b$ 係截距（偏置）。冇 $b$ 嘅話直線一定經原點；有 $b$ 就可以喺 $y$ 軸方向上下移。

<br />

### 1.3 訓練數據

要「學習」，需要訓練數據，即係一對對樣本：

$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

如果樣本數係零，任何一條直線都一樣合理；冇先驗就決定唔到好嘅 $a$ 同 $b$。

得一個樣本嘅時候，例如

$$
(x_1, y_1) = (1.11, 85) ,
$$

模型就變成

$$
y_1 = a x_1 + b .
$$

由呢度可以解出 $b$：

$$
b = y_1 - a x_1 = 85 - a \cdot 1.11 .
$$

呢陣 $a$ 可以自由揀，跟住 $b$ 就固定。任何經過呢一點嘅直線，誤差都等於零。

<br />

### 1.4 走向更多樣本

得一個樣本唔夠去唯一決定一條直線。有兩個樣本，就可以搵到唯一一條同時經過兩點嘅直線。落嚟我哋就由呢度繼續。

<br />

---

## 第 2 部分：由兩個樣本去到多個樣本

![Board notes](/images/docs/Lecture%202_Linearregression/2.png)

而家加多一個樣本。假設第二個樣本係

$$
(x_2, y_2) = (1.52, 110) .
$$

<br />

### 2.1 用兩個樣本求解

模型方程係

$$
y_1 = a x_1 + b, \qquad y_2 = a x_2 + b .
$$

代入數值得到

$$
110 = a \cdot 1.52 + b, \qquad 85 = a \cdot 1.11 + b .
$$

用第一條方程減第二條，

$$
a = \frac{110 - 85}{1.52 - 1.11} = 60.98 .
$$

之後代返去求 \(b\)，

$$
b = 110 - a \cdot 1.52 = 17.32 .
$$

呢個就係高中嘅做法：兩點只會有一條獨一無二嘅直線經過。

<br />

### 2.2 視覺檢查

我哋可以用畫圖驗證。將兩個點畫喺平面上，再畫一條斜率 \(a = 60.98\)、截距 \(b = 17.32\) 嘅直線。條直線會穿過兩點。咁我哋就有第一個可用嘅機器學習模型：畀出身高，就可以估體重。

<br />

### 2.3 推廣到 \(N\) 個樣本

當樣本多過兩個，就會有一組方程：

$$
\begin{aligned}
y_1 &= a x_1 + b , \\
y_2 &= a x_2 + b , \\
&\;\;\vdots \\
y_N &= a x_N + b .
\end{aligned}
$$

現實入面，啲點唔會完全喺同一條直線上，因為真實量度會有噪聲。與其搵精確解，我哋想搵一條對全部點都「盡量接近」嘅直線。

<br />

### 2.4 殘差同誤差

對每個點定義殘差

$$
r_i = y_i - \hat{y}_i , \qquad i = 1, \ldots, N .
$$

當中 \(\hat{y}_i = a x_i + b\) 係模型預測。任何 \(a\)、\(b\) 嘅選擇都會產生殘差。問題係點樣搵到一條可以整體最細化殘差嘅直線。

<br />

![Board notes](/images/docs/Lecture%202_Linearregression/3.png)

### 2.5 定義誤差

一個自然嘅諗法係將殘差相加：

$$
\text{err}_1 = \sum_{i=1}^N (y_i - \hat{y}_i) .
$$

初時睇落去好似合理。但如果有啲點喺直線上面、有啲喺下面，誤差會互相抵銷。即使唔太貼合，總和都可能係零。

<br />

較好嘅做法係取絕對值：

$$
\text{err}_2 = \sum_{i=1}^N \lvert y_i - \hat{y}_i \rvert .
$$

咁就唔會互相抵銷，不過喺零附近斜率唔好定義，令到優化變得困難。

<br />

所以最常用嘅係將誤差平方：

$$
\text{err}_3 = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 .
$$

呢個就係**均方誤差（MSE）**。平方令誤差全部為正，優化較平滑，而用 \(N\) 正規化可以消除樣本數目嘅影響。

<br />

### 2.6 工程規則

老師強調咗佢叫做「工程第一法則」嘅觀點：

如果你要量度誤差，但唔知用邊一種，咁就用**均方誤差**。一般都會帶你去到正確方向。

<br />

---

## 第 3 部分：將誤差最小化

![Board notes](/images/docs/Lecture%202_Linearregression/4.png)

而家我哋已經有咗均方誤差（MSE）：

$$
L_{\text{MSE}} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 = \frac{1}{N} \sum_{i=1}^N (y_i - (a x_i + b))^2 .
$$

對任何 \(a\)、\(b\) 都可以計呢個誤差。目標係搵到令佢最細嘅取值：

$$
a, b = \arg \min_{a, b} L_{\text{MSE}} .
$$

<br />

### 3.1 暴力法（Brute force）解決

第一個方法就係暴力法。就算其他方法唔得，暴力法都一定做到。

我哋可以喺 \(a\) 同 \(b\) 嘅可能取值上面迴圈，計誤差，保留最好嗰對參數：

- For \(a = -100 : 1 : +100\)  
  - For \(b = -100 : 1 : +100\)  
    - calculate \(L_{\text{MSE}}(a, b)\)  
    - if smaller than best so far → update \(a, b\)  

就算有幾千個樣本，電腦都可以好快跑完。暴力法易寫、一定有結果，仲可以做之後高級方法嘅基線（baseline）。

<br />

### 3.2 誤差曲面視覺化

將 \(L_{\text{MSE}}\) 當成 \(a\) 同 \(b\) 嘅函數。呢個喺三維空間係一個曲面。  
每組 \((a, b)\) 我哋都可以計出誤差。將呢啲數畫成圖，就好似地形圖，最低嘅位就係最優解；越暗代表誤差越細。  
由圖上，我哋可以作個粗略估計：例如 \(a \approx 50\)、\(b \approx 20\)。

<br />

### 3.3 點解暴力法有用

暴力法永遠係一個選擇。佢易實現、喺細範圍好快，而且一定有解。  
更重要嘅係，暴力法提供咗基線。之後如果設計咗更醒嘅方法，都可以攞嚟同暴力法比較；如果所謂「更好」嘅方法反而更差，就要檢查下邏輯。  
不過暴力法唔係唯一。仲有更好嘅方法，而且只需要高中數學。

<br />

### 3.4 用導數搵最小值

![Board notes](/images/docs/Lecture%202_Linearregression/5.png)

誤差函數係

$$
L_{\text{MSE}}(a, b) = \frac{1}{N} \sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)^2 .
$$

佢係關於參數 \(a\)、\(b\) 嘅函數。  
數據 \((x_i, y_i)\) 係固定，淨係 \(a\) 同 \(b\) 會影響輸出。

我哋想搵到呢個函數嘅最小值。高中數學話我哋：

- 喺極小值，導數等於零。  
- 二元函數要令兩個偏導都等於零：  

$$
\frac{\partial L_{\text{MSE}}}{\partial a} = 0, 
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b} = 0 .
$$

呢兩個條件加埋，即係**梯度為零**。

呢個就係關鍵。之後我哋會展開 \(L_{\text{MSE}}\) 定義，求偏導，再解出 \(a\)、\(b\)。咁就得到解析解，直接連到功課同下星期嘅練習。

<br />

---
## 第 4 部分：用導數求出 $a$ 同 $b$

![Board notes](/images/docs/Lecture%202_Linearregression/6.png)

我哋只用高中數學。數據集 $\{(x_i,y_i)\}_{i=1}^N$ 係固定；淨係當 $a$ 或 $b$ 改變，誤差先至會變。

均方誤差（MSE）係

$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-(a x_i+b)\bigr)^2 .
$$

喺極小值度，導數等於零：

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0 .
$$

<br />

### 4.1 對 $a$ 求偏導

由定義開始，將導數搬入求和號（微分線性性）。對每個平方項用鏈式法則。

$$
\begin{aligned}
\frac{\partial L_{\text{MSE}}}{\partial a}
&= \frac{1}{N}\sum_{i=1}^{N}
\frac{\partial}{\partial a}\Bigl(y_i-(a x_i+b)\Bigr)^2 \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot
\frac{\partial}{\partial a}\Bigl(y_i-(a x_i+b)\Bigr) \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot(-x_i) .
\end{aligned}
$$

令其等於零，並約去非常數 $-2/N$：

$$
\sum_{i=1}^{N} x_i\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

展開同埋合併同類項：

$$
\sum_{i=1}^{N} x_i y_i
- a\sum_{i=1}^{N} x_i^2
- b\sum_{i=1}^{N} x_i
=0
\;\;\Longleftrightarrow\;\;
a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i .
$$

將 $a$ 用 $b$ 表示：

$$
a
=
\frac{\sum_{i=1}^{N} x_i y_i - b\sum_{i=1}^{N} x_i}
{\sum_{i=1}^{N} x_i^{2}} .
$$

<br />

### 4.2 對 $b$ 求偏導

同一思路：

$$
\begin{aligned}
\frac{\partial L_{\text{MSE}}}{\partial b}
&= \frac{1}{N}\sum_{i=1}^{N}
\frac{\partial}{\partial b}\Bigl(y_i-(a x_i+b)\Bigr)^2 \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot
\frac{\partial}{\partial b}\Bigl(y_i-(a x_i+b)\Bigr) \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot(-1).
\end{aligned}
$$

令其等於零並約去 $-2/N$：

$$
\sum_{i=1}^{N}\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

展開並將 $b$ 用 $a$ 表示：

$$
\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i - N b = 0
\quad\Longrightarrow\quad
b
=
\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

<br />

### 4.3 聯立求解（每一步代數都有）

而家有

$$
\text{(A)}\;\; a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i,
\qquad
\text{(B)}\;\; a\sum_{i=1}^{N} x_i + N b = \sum_{i=1}^{N} y_i .
$$

由 (B) 得

$$
b=\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

將呢個 $b$ 代入 (A)：

$$
a\sum_{i=1}^{N} x_i^2
+ \left(\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}\right)\!\left(\sum_{i=1}^{N} x_i\right)
= \sum_{i=1}^{N} x_i y_i .
$$

展開中間項：

$$
a\sum_{i=1}^{N} x_i^2
+ \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}
- a\,\frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}
= \sum_{i=1}^{N} x_i y_i .
$$

將唔含 $a$ 嘅項搬去右邊並抽出 $a$：

$$
a\left(\sum_{i=1}^{N} x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}\right)
=
\sum_{i=1}^{N} x_i y_i
- \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}.
$$

兩邊一齊乘 $N$ 清分母：

$$
a\Bigl(N\sum_{i=1}^{N} x_i^2 - \bigl(\sum_{i=1}^{N} x_i\bigr)^2\Bigr)
=
N\sum_{i=1}^{N} x_i y_i
- \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr).
$$

所以

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2}.
$$

**最後用之前個公式計 $b$（清楚咁示範「將 $a$ 代入」）**

而家有兩條式：

- 由 $\dfrac{\partial L}{\partial b}=0$：
  $$
  (B1)\qquad b=\frac{\sum_{i=1}^{N} y_i}{N}\;-\;a\,\frac{\sum_{i=1}^{N} x_i}{N}.
  $$

- 由上面搵到嘅 $a$：
  $$
  (\star)\qquad
  a=\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
         {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 }.
  $$

**Step 1.** 由 (B1) 開始（呢度仲「見到」 $a$）：
$$
b=\frac{\sum_{i=1}^{N} y_i}{N} \;-\; a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

**Step 2.** 用 $(\star)$ 入面成個分式嚟代 $a$（即係「將 \(a\) 代入」）：
$$
b=\frac{\sum_{i=1}^{N} y_i}{N}
-\frac{\sum_{i=1}^{N} x_i}{N}\;
\underbrace{\frac{N\sum_{i=1}^{N} x_i y_i - (\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)}
{N\sum_{i=1}^{N} x_i^{2} - (\sum_{i=1}^{N} x_i)^2}}_{\text{呢個就係 }(\star)\text{ 入面嘅 }a}.
$$

**Step 3.** 通分到共同分母 \(N\bigl(N\sum x_i^2-(\sum x_i)^2\bigr)\)：
$$
b=
\frac{
\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i y_i-(\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)\Bigr)
}{
N\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
}.
$$

**Step 4.** 分子逐項展開：

$$
\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(N\sum_{i=1}^N x_i^2 - \Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigr)
-\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(N\sum_{i=1}^N x_i y_i - \Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigr)
$$

用分配律：

$$
N\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i^2\Bigr)
-\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i\Bigr)^2
-N\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N x_i y_i\Bigr)
+\Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigl(\sum_{i=1}^N y_i\Bigr).
$$

第 2 同第 4 項一樣大、符號相反，互相抵消。  
分子分母一齊除以 $N$：

$$
b=
\frac{\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i y_i\Bigr)}
{\,N\sum_{i=1}^{N} x_i^2 - \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2\,}.
$$


**Step 5.** 均值形式（同樣結果、計算更快）：  
定義 $\displaystyle \bar x=\frac{1}{N}\sum_{i=1}^{N}x_i$ 同
$\displaystyle \bar y=\frac{1}{N}\sum_{i=1}^{N}y_i$，咁
$$
\boxed{\,b=\bar y - a\,\bar x\,}.
$$


<br />

### 4.4 作業要計乜

你只需要四個總和同兩條式：

$$
\sum_{i=1}^{N} x_i,\qquad
\sum_{i=1}^{N} y_i,\qquad
\sum_{i=1}^{N} x_i^2,\qquad
\sum_{i=1}^{N} x_i y_i .
$$

跟住

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2},
\qquad
b
=
\frac{\sum_{i=1}^{N} y_i}{N}
- a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

之後你可以畫條直線 $\hat{y} = a x + b$，同數據點做可視化檢查。

### 4.5 最終顯式解

畀定 $N$ 個樣本 $(x_1,y_1),(x_2,y_2),\ldots,(x_N,y_N)$ 同線性模型 $y=ax+b$，令 $L_{\text{MSE}}$ 最細嘅解為

$$
a \;=\;
\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
     {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2},
$$

$$
b \;=\; \frac{\sum_{i=1}^{N} y_i \;-\; a\sum_{i=1}^{N} x_i}{N}
\;=\; \bar{y} \;-\; a\,\bar{x},
\qquad
\bar{x}=\frac{1}{N}\sum_{i=1}^{N}x_i,\;\;
\bar{y}=\frac{1}{N}\sum_{i=1}^{N}y_i .
$$

呢啲公式成立嘅條件係
$$
N\sum_{i=1}^{N} x_i^2 \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 \neq 0,
$$
即係話 $x_i$ 唔可以全部一樣。完整推導喺 4.1–4.3 節。

### 4.6 快速檢查

代數檢查（無數字）：上面個解滿足
$$
\sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)=0,
\qquad
\sum_{i=1}^N x_i \bigl(y_i - (a x_i + b)\bigr)=0,
$$
正正就係我哋推導嘅兩條法方程；即係殘差平均值為零，亦同 $x$ 無相關。

細粒數值校驗（可選）：攞 $(0,1),(1,3),(2,5),(3,7)$。咁
$$
\sum x_i=6,\ \sum y_i=16,\ \sum x_i^2=14,\ \sum x_i y_i=34,\ N=4.
$$
代入公式
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}=2,\qquad
b=\frac{16-2\cdot6}{4}=1,
$$
所以 $\hat y=2x+1$，全部殘差都係 $0$。

<br />

---

## 第 5 部分：由單一輸入去到多個輸入

![Board notes](/images/docs/Lecture%202_Linearregression/7.png)

我哋由一個輸入擴展到多個輸入。概念一樣，只係記號多咗。

<br />

### 5.1 兩個輸入嘅模型

對於兩個輸入加一個偏置（bias）：
$$
y \;=\; w_1 x_1 \;+\; w_2 x_2 \;+\; w_0 .
$$

對第 $i$ 個樣本：
$$
\hat y^{(i)} \;=\; w_1 x_1^{(i)} \;+\; w_2 x_2^{(i)} \;+\; w_0 .
$$

幾何上，呢條式喺 $(x_1,x_2,y)$ 空間入面代表一個平面。

<br />

### 5.2 向量同矩陣形態（同黑板一樣）

收集預測、參數同輸入：

$$
\hat{\mathbf y} \;=\;
\begin{pmatrix}
\hat y^{(1)}\\[2pt]\hat y^{(2)}\\[2pt]\vdots\\[2pt]\hat y^{(N)}
\end{pmatrix},
\qquad
\mathbf w \;=\;
\begin{pmatrix}
w_1\\[2pt] w_2\\[2pt] w_0
\end{pmatrix},
\qquad
A \;=\;
\begin{pmatrix}
x_1^{(1)} & x_2^{(1)} & 1\\
x_1^{(2)} & x_2^{(2)} & 1\\
\vdots    & \vdots    & \vdots\\
x_1^{(N)} & x_2^{(N)} & 1
\end{pmatrix}.
$$

形狀：$A\in\mathbb R^{N\times 3}$，$\mathbf w\in\mathbb R^{3\times 1}$，$\hat{\mathbf y}\in\mathbb R^{N\times 1}$。

簡寫（老師寫嗰行）：
$$
\hat{\mathbf y} \;=\; A\,\mathbf w .
$$

用 MSE，
$$
L_{\text{MSE}}(\mathbf w)=\tfrac1N\|\mathbf y-A\mathbf w\|_2^2,
$$
正規方程係
$$
A^\top A\,\mathbf w \;=\; A^\top \mathbf y,
$$
如果 $A^\top A$ 可逆，
$$
\boxed{\;\mathbf w=(A^\top A)^{-1}A^\top \mathbf y\;}
$$
（「求 $\mathbf w$」）。

加多啲輸入就係喺 $A$ 加列、喺 $\mathbf w$ 加分量，方法一樣。

<br />

### 5.3 透過特徵擴展做到「非線性」（淨係加平方項，跟黑板一樣）

保持**對特徵嘅線性模型**，但將 $A$ 嘅各列改到包含平方項：

$$
\hat y \;=\; w_3\,x_1^2 \;+\; w_4\,x_2^2 \;+\; w_1\,x_1 \;+\; w_2\,x_2 \;+\; w_0 .
$$

建立
$$
A \;=\;
\begin{pmatrix}
x_1^{(1)2} & x_2^{(1)2} & x_1^{(1)} & x_2^{(1)} & 1\\
\vdots     & \vdots      & \vdots    & \vdots    & \vdots\\
x_1^{(N)2} & x_2^{(N)2} & x_1^{(N)} & x_2^{(N)} & 1
\end{pmatrix},
\qquad
\mathbf w =
\begin{pmatrix}
w_3\\ w_4\\ w_1\\ w_2\\ w_0
\end{pmatrix}.
$$

同樣有 $\hat{\mathbf y}=A\mathbf w$，解法**完全一樣**
$$
\mathbf w=(A^\top A)^{-1}A^\top\mathbf y.
$$

<br />

### 5.4 關於穩健擬合（RANSAC）嘅一句提示

離群點好常見。套路：隨機揀兩點，擬合直線／平面，定距離閾值，數內點，重複，揀內點最多嗰個模型，再用嗰啲內點重新擬合。幾實用，不過內點閾值要你自己定（世上無免費午餐）。

<br />

### 5.5 要實作乜

整 $A$（每個樣本一行、每個特徵一列，再加一列全 1），整 $\mathbf y$。然後計
$$
\mathbf w=(A^\top A)^{-1}A^\top \mathbf y,
$$
畫出 $\hat{\mathbf y}=A\mathbf w$，同數據對比。
