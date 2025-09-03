--- 
title: "第 2 讲：线性回归"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 28.8.2025 TB104"
date: 2025-09-01
lang: "zh"
excerpt: "从零推导简单线性回归（$y = a x + b$）。定义残差与 MSE，应用链式法则，对 $a$ 与 $b$ 的偏导设为 0，解出正规方程得到 $a$、$b$ 的闭式解，并用一个小例子验证。"
tags: ["Joni Kämäräinen", machine-learning, linear-regression, calculus, least-squares]
draft: false
---
## 从零推导最小二乘法求线性模型中的 a 与 b

## 第 1 部分：引言

![板书](/images/docs/Lecture%202_Linearregression/1.png)

我们从机器学习里最基础的问题出发。老师说明这个思想也在神经网络、甚至现代语言模型里面。用你在高中学过的数学就足以跟上今天的内容。

<br />

### 1.1 线性模型

回顾熟悉的直线方程：

$$
y = a x + b .
$$

这就是线性模型。现在先只有一个输入和一个输出，但相同的想法可以推广到多输入、多输出。

这里 $x$ 是输入（我们能测量的观测量），$y$ 是目标变量。

<br />

### 1.2 模型参数

两个参数分别是斜率和截距：

* $a$ 是斜率，控制直线的陡峭程度。如果 $a = 0$，直线与 $x$ 轴平行；$a$ 越大，上升越快。  
* $b$ 是截距（偏置）。没有 $b$ 时直线必过原点；有了 $b$ 可以把直线在 $y$ 轴方向上上移或下移。

<br />

### 1.3 训练数据

要“学习”，需要训练数据，也就是成对的样本：

$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

当样本为零时，每一条直线都一样“合理”，没有先验信息就无法确定好的 $a$ 和 $b$。

只有一个样本时，例如

$$
(x_1, y_1) = (1.11, 85) ,
$$

模型变成

$$
y_1 = a x_1 + b .
$$

由此可以解出 $b$：

$$
b = y_1 - a x_1 = 85 - a \cdot 1.11 .
$$

这时 $a$ 可以自由选择，然后 $b$ 被固定。任何通过这个点的直线误差都为零。

<br />

### 1.4 走向更多样本

只有一个样本不足以唯一确定一条直线。用上两个样本，就能找到唯一一条同时通过两点的直线。下面就从这里继续。

<br />

---

## 第 2 部分：从两个样本到多个样本

![Board notes](/images/docs/Lecture%202_Linearregression/2.png)

现在再增加一个样本。假设第二个样本是

$$
(x_2, y_2) = (1.52, 110) .
$$

<br />

### 2.1 用两个样本求解

模型方程为

$$
y_1 = a x_1 + b, \qquad y_2 = a x_2 + b .
$$

代入数值得到

$$
110 = a \cdot 1.52 + b, \qquad 85 = a \cdot 1.11 + b .
$$

用第一式减去第二式，

$$
a = \frac{110 - 85}{1.52 - 1.11} = 60.98 .
$$

然后代回去求 \(b\)，

$$
b = 110 - a \cdot 1.52 = 17.32 .
$$

这正是我们在高中的做法：通过两点只有一条唯一的直线。

<br />

### 2.2 可视化检查

我们总可以用作图来验证。把两点画在平面上，并绘制斜率 \(a = 60.98\)、截距 \(b = 17.32\) 的直线。该直线通过两点。这样我们就得到第一个可用的机器学习模型：给定身高，就能估计体重。

<br />

### 2.3 推广到 \(N\) 个样本

当样本多于两个时，我们有一个方程组：

$$
\begin{aligned}
y_1 &= a x_1 + b , \\
y_2 &= a x_2 + b , \\
&\;\;\vdots \\
y_N &= a x_N + b .
\end{aligned}
$$

在实际中，点不会完全落在一条直线上，因为真实测量包含噪声。与其寻找精确解，我们更希望找到一条对所有点都“尽量接近”的直线。

<br />

### 2.4 残差与误差

对每个点定义残差

$$
r_i = y_i - \hat{y}_i , \qquad i = 1, \ldots, N .
$$

其中 \(\hat{y}_i = a x_i + b\) 是模型的预测。任何 \(a\) 与 \(b\) 的选择都会产生残差。问题是如何找到能总体最小化这些残差的直线。

<br />

![Board notes](/images/docs/Lecture%202_Linearregression/3.png)

### 2.5 定义误差

一个自然想法是把残差相加：

$$
\text{err}_1 = \sum_{i=1}^N (y_i - \hat{y}_i) .
$$

乍看合理。但如果有的点在直线上方，有的在下方，误差会相互抵消。即使拟合不好，总和也可能为零。

<br />

更好的想法是取绝对值：

$$
\text{err}_2 = \sum_{i=1}^N \lvert y_i - \hat{y}_i \rvert .
$$

这样不会相互抵消，但在零点处斜率不好定义，使优化更困难。

<br />

因此最常见的选择是把误差平方：

$$
\text{err}_3 = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 .
$$

这就是**均方误差（MSE）**。平方让误差全为正，优化更平滑，而用 \(N\) 归一化消除了样本数量的影响。

<br />

### 2.6 工程规则

老师强调了他称作“工程第一法则”的观点：

当你需要度量误差又不确定用哪种时，就用**均方误差**。它通常能把你带到正确的方向。

<br />

---

## 第 3 部分：最小化误差

![Board notes](/images/docs/Lecture%202_Linearregression/4.png)

我们已经得到均方误差（MSE）：

$$
L_{\text{MSE}} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 = \frac{1}{N} \sum_{i=1}^N (y_i - (a x_i + b))^2 .
$$

对于任意的 \(a\) 和 \(b\) 我们都能计算这个误差。我们的任务是找到使其最小的取值：

$$
a, b = \arg \min_{a, b} L_{\text{MSE}} .
$$

<br />

### 3.1 暴力搜索解法

第一种思路是暴力搜索。如果其他方法都不奏效，暴力法总是可行的。

我们可以在可能的 \(a\) 与 \(b\) 取值上循环，计算误差，并保留当前最优的一对参数：

- For \(a = -100 : 1 : +100\)  
  - For \(b = -100 : 1 : +100\)  
    - calculate \(L_{\text{MSE}}(a, b)\)  
    - if smaller than best so far → update \(a, b\)  

即使样本有上千个，计算机也能很快跑完。暴力法实现简单、一定给出一个解，并且可作为后续更高级方法的基线。

<br />

### 3.2 将误差面可视化

把 \(L_{\text{MSE}}\) 看作 \(a\) 与 \(b\) 的函数。这是在三维空间中的一个曲面。  
对每一组 \((a, b)\) 我们都能算出误差。把这些值画出来，就得到一片“地形”，最低点就是最优解。越暗的区域表示误差越小。  
从这样的图上，我们可以做一个粗略猜测：例如 \(a \approx 50\)、\(b \approx 20\)。

<br />

### 3.3 为什么暴力法有用

暴力法始终是一个选项。它易于实现、在小范围内足够快，而且一定会给出一个解。  
更重要的是，暴力法给我们提供了一个基线。以后如果我们设计了更聪明的方法，总能把结果和暴力法对比；若“更好”的方法反而更差，就需要重新检查。  
但暴力法并不是唯一选择。我们还有更好的办法，而且只需要高中数学。

<br />

### 3.4 用导数寻找最小值

![Board notes](/images/docs/Lecture%202_Linearregression/5.png)

误差函数为

$$
L_{\text{MSE}}(a, b) = \frac{1}{N} \sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)^2 .
$$

它是关于参数 \(a\) 与 \(b\) 的函数。  
数据集 \((x_i, y_i)\) 是固定的，所以只有 \(a\) 与 \(b\) 会改变输出。

我们希望找到该函数的最小值。回忆高中数学：

- 在极小值处，导数为零。  
- 对于二元函数，需要令两个偏导都为零：  

$$
\frac{\partial L_{\text{MSE}}}{\partial a} = 0, 
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b} = 0 .
$$

这两个条件合在一起，意味着在最优点**梯度为零**。

这就是关键思想。接下来我们展开 \(L_{\text{MSE}}\) 的定义，求偏导，并解出 \(a\) 与 \(b\)。这将得到解析解，并直接关联到作业与下周的练习。

<br />

---
## 第 4 部分：通过求导求解 $a$ 和 $b$

![Board notes](/images/docs/Lecture%202_Linearregression/6.png)

我们只用高中数学。数据集 $\{(x_i,y_i)\}_{i=1}^N$ 是固定的；只有当 $a$ 或 $b$ 改变时，误差才会变化。

均方误差为

$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-(a x_i+b)\bigr)^2 .
$$

在极小值处，导数为零：

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0 .
$$

<br />

### 4.1 对 $a$ 求偏导

从定义出发，把导数移入求和号（微分的线性性）。对每一项的平方使用链式法则。

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

令其为零，并约去非零常数 $-2/N$：

$$
\sum_{i=1}^{N} x_i\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

展开并合并同类项：

$$
\sum_{i=1}^{N} x_i y_i
- a\sum_{i=1}^{N} x_i^2
- b\sum_{i=1}^{N} x_i
=0
\;\;\Longleftrightarrow\;\;
a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i .
$$

把 $a$ 表示成 $b$ 的函数：

$$
a
=
\frac{\sum_{i=1}^{N} x_i y_i - b\sum_{i=1}^{N} x_i}
{\sum_{i=1}^{N} x_i^{2}} .
$$

<br />

### 4.2 对 $b$ 求偏导

同样地：

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

令其为零并约去 $-2/N$：

$$
\sum_{i=1}^{N}\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

展开并把 $b$ 表示成 $a$ 的函数：

$$
\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i - N b = 0
\quad\Longrightarrow\quad
b
=
\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

<br />

### 4.3 联立求解（每一步代数都显示）

我们已有

$$
\text{(A)}\;\; a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i,
\qquad
\text{(B)}\;\; a\sum_{i=1}^{N} x_i + N b = \sum_{i=1}^{N} y_i .
$$

由 (B) 得

$$
b=\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

把该 $b$ 代入 (A)：

$$
a\sum_{i=1}^{N} x_i^2
+ \left(\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}\right)\!\left(\sum_{i=1}^{N} x_i\right)
= \sum_{i=1}^{N} x_i y_i .
$$

展开中间项：

$$
a\sum_{i=1}^{N} x_i^2
+ \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}
- a\,\frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}
= \sum_{i=1}^{N} x_i y_i .
$$

把不含 $a$ 的项移到右侧并提取 $a$：

$$
a\left(\sum_{i=1}^{N} x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}\right)
=
\sum_{i=1}^{N} x_i y_i
- \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}.
$$

两边同乘 $N$ 消去分母：

$$
a\Bigl(N\sum_{i=1}^{N} x_i^2 - \bigl(\sum_{i=1}^{N} x_i\bigr)^2\Bigr)
=
N\sum_{i=1}^{N} x_i y_i
- \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr).
$$

因此

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2}.
$$

**最后用先前的公式计算 $b$（清楚展示“把 $a$ 代入”）**

我们已有两条公式：

- 由 $\dfrac{\partial L}{\partial b}=0$ 得：
  $$
  (B1)\qquad b=\frac{\sum_{i=1}^{N} y_i}{N}\;-\;a\,\frac{\sum_{i=1}^{N} x_i}{N}.
  $$

- 由上面的求解得到：
  $$
  (\star)\qquad
  a=\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
         {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 }.
  $$

**Step 1.** 从 (B1) 出发（此处能“看见” $a$）：
$$
b=\frac{\sum_{i=1}^{N} y_i}{N} \;-\; a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

**Step 2.** 用式 $(\star)$ 中的整个分式替换 $a$（这就是“把 \(a\) 带入”）：
$$
b=\frac{\sum_{i=1}^{N} y_i}{N}
-\frac{\sum_{i=1}^{N} x_i}{N}\;
\underbrace{\frac{N\sum_{i=1}^{N} x_i y_i - (\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)}
{N\sum_{i=1}^{N} x_i^{2} - (\sum_{i=1}^{N} x_i)^2}}_{\text{这里的 }a\text{ 就是来自 }(\star)}.
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

**Step 4.** 逐项展开分子：

$$
\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(N\sum_{i=1}^N x_i^2 - \Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigr)
-\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(N\sum_{i=1}^N x_i y_i - \Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigr)
$$

分配律展开得到：

$$
N\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i^2\Bigr)
-\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i\Bigr)^2
-N\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N x_i y_i\Bigr)
+\Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigl(\sum_{i=1}^N y_i\Bigr).
$$

第 2 项与第 4 项相等且符号相反，故相互抵消。  
分子分母同除以 $N$：

$$
b=
\frac{\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i y_i\Bigr)}
{\,N\sum_{i=1}^{N} x_i^2 - \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2\,}.
$$


**Step 5.** 均值形式（同一结果，计算更短）：  
定义 $\displaystyle \bar x=\frac{1}{N}\sum_{i=1}^{N}x_i$ 与
$\displaystyle \bar y=\frac{1}{N}\sum_{i=1}^{N}y_i$，则
$$
\boxed{\,b=\bar y - a\,\bar x\,}.
$$


<br />

### 4.4 作业要计算什么

你只需要四个求和与两条公式：

$$
\sum_{i=1}^{N} x_i,\qquad
\sum_{i=1}^{N} y_i,\qquad
\sum_{i=1}^{N} x_i^2,\qquad
\sum_{i=1}^{N} x_i y_i .
$$

然后

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

之后你就可以画出直线 $\hat{y} = a x + b$ 并与数据点做可视检验。

### 4.5 最终的显式解

给定 $N$ 个样本 $(x_1,y_1),(x_2,y_2),\ldots,(x_N,y_N)$ 与线性模型 $y=ax+b$，使 $L_{\text{MSE}}$ 最小的解为

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

这些公式在且仅在
$$
N\sum_{i=1}^{N} x_i^2 \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 \neq 0
$$
时有效，这意味着 $x_i$ 不全相同。完整推导见 4.1–4.3 节。

### 4.6 快速检查

代数检查（无具体数字）：上式满足
$$
\sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)=0,
\qquad
\sum_{i=1}^N x_i \bigl(y_i - (a x_i + b)\bigr)=0,
$$
这正是我们推导的两条法方程（normal equations），说明残差均值为零且与 $x$ 不相关。

小型数值校验（可选）：取 $(0,1),(1,3),(2,5),(3,7)$。则
$$
\sum x_i=6,\ \sum y_i=16,\ \sum x_i^2=14,\ \sum x_i y_i=34,\ N=4.
$$
代入得到
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}=2,\qquad
b=\frac{16-2\cdot6}{4}=1,
$$
因此 $\hat y=2x+1$，所有残差为 $0$。

<br />

---

## 第 5 部分：从单一输入到多输入

![Board notes](/images/docs/Lecture%202_Linearregression/7.png)

我们从单一输入扩展到多个输入。思想相同，只是记号增多。

<br />

### 5.1 两个输入的模型

对于两个输入和一个偏置：
$$
y \;=\; w_1 x_1 \;+\; w_2 x_2 \;+\; w_0 .
$$

对第 $i$ 个样本：
$$
\hat y^{(i)} \;=\; w_1 x_1^{(i)} \;+\; w_2 x_2^{(i)} \;+\; w_0 .
$$

从几何上看，这是 $(x_1,x_2,y)$ 空间中的一个平面。

<br />

### 5.2 向量与矩阵形式（和黑板上一样）

收集预测、参数与输入：

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

形状：$A\in\mathbb R^{N\times 3}$，$\mathbf w\in\mathbb R^{3\times 1}$，$\hat{\mathbf y}\in\mathbb R^{N\times 1}$。

紧凑形式（老师板书的一行）：
$$
\hat{\mathbf y} \;=\; A\,\mathbf w .
$$

采用 MSE，
$$
L_{\text{MSE}}(\mathbf w)=\tfrac1N\|\mathbf y-A\mathbf w\|_2^2,
$$
法方程为
$$
A^\top A\,\mathbf w \;=\; A^\top \mathbf y,
$$
若 $A^\top A$ 可逆，
$$
\boxed{\;\mathbf w=(A^\top A)^{-1}A^\top \mathbf y\;}
$$
（“求 $\mathbf w$”）。

通过给 $A$ 增加列、给 $\mathbf w$ 增加分量，即可推广到任意个输入。

<br />

### 5.3 通过特征扩展实现“非线性”（只加平方项，和黑板一致）

保持**对特征的线性模型**，但把 $A$ 的列改为包含平方项：

$$
\hat y \;=\; w_3\,x_1^2 \;+\; w_4\,x_2^2 \;+\; w_1\,x_1 \;+\; w_2\,x_2 \;+\; w_0 .
$$

构造
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

同样有 $\hat{\mathbf y}=A\mathbf w$，解法**完全相同**
$$
\mathbf w=(A^\top A)^{-1}A^\top\mathbf y.
$$

<br />

### 5.4 稳健拟合的简述（RANSAC 思路）

离群点会出现。简图做法：随机取两点，拟合直线/平面，设定距离阈值，数内点，重复，保留内点最多的模型，然后用这些内点重新拟合。效果不错，但必须自己选内点阈值（没有免费午餐）。

<br />

### 5.5 要实现什么

构造 $A$（每个样本一行、每个特征一列，外加一列全 $1$）。构造 $\mathbf y$。然后计算
$$
\mathbf w=(A^\top A)^{-1}A^\top \mathbf y,
$$
画出 $\hat{\mathbf y}=A\mathbf w$，并与数据对比。
