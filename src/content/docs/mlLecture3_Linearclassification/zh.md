---
title: "ML_第 3 讲：线性分类"
subtitle: "DATA.ML.100 · Joni Kämäräinen · 2025-09-01（周一）· K1704"
date: 2025-09-02
lang: zh
excerpt: "回顾线性回归 → 简单基线 → 分类。k-NN（距离/k/复杂度）、直线拟合视角、阶跃规则、逻辑（sigmoid）输出、MSE 梯度，以及为什么没有解析解——为神经网络铺垫。"
tags: ["Joni Kämäräinen","machine-learning","linear-classification","step-function", "sigmoid-function", "logistic"]
draft: false
---
<details>
<summary><strong>目录（需要时点击 ▶️）</strong></summary>

- [Part 1 : 上周课程回顾](#part-1--上周课程回顾)
  - [1.1 模型与训练数据](#11-模型与训练数据)
  - [1.2 误差与求解方法](#12-误差与求解方法)
  - [1.3 为什么解析解重要](#13-为什么解析解重要)
  - [1.4 这属于什么任务](#14-这属于什么任务)
- [Part 2 : 基线与分类](#part-2--基线与分类)
  - [2.1 一个简单的基线](#21-一个简单的基线)
  - [2.2 进入分类](#22-进入分类)
  - [2.3 输出类型的改变](#23-输出类型的改变)
  - [2.4 观测是什么](#24-观测是什么)
- [Part 3 : 例子——霍比特人与精灵](#part-3--例子霍比特人与精灵)
  - [3.1 从训练样本中学习](#31-从训练样本中学习)
  - [3.2 兽人的陷阱](#32-兽人的陷阱)
  - [3.3 生成数据](#33-生成数据)
  - [3.4 接受重叠与错误](#34-接受重叠与错误)
  - [3.5 扩展到二维](#35-扩展到二维)
  - [3.6 训练与推理](#36-训练与推理)
  - [3.7 第一种分类直觉](#37-第一种分类直觉)
- [Part 4 : 最近邻分类器](#part-4--最近邻分类器)
  - [4.1 名称与核心思想](#41-名称与核心思想)
  - [4.2 训练（存储全部样本）](#42-训练存储全部样本)
  - [4.3 推理（找最近者并拷贝标签）](#43-推理找最近者并拷贝标签)
  - [4.4 分类的简单基线](#44-分类的简单基线)
  - [4.5 小结](#45-小结)
- [Part 5 : 从 k-NN 的考量到直线拟合](#part-5--从-k-nn-的考量到直线拟合)
  - [5.1 k-NN 可调的要素](#51-k-nn-可调的要素)
  - [5.2 我们能靠“拟合一条线”来分类吗](#52-我们能靠拟合一条线来分类吗)
  - [5.3 分类该如何度量误差](#53-分类该如何度量误差)
- [Part 6 : 从直线到阶跃，再到 sigmoid](#part-6--从直线到阶跃再到-sigmoid)
  - [6.1 阶跃规则与判别点](#61-阶跃规则与判别点)
  - [6.2 用 logistic（sigmoid）平滑近似阶跃](#62-用-logisticsigmoid平滑近似阶跃)
  - [6.3 训练信号（暂且）](#63-训练信号暂且)
- [Part 7 : Sigmoid 输出 + MSE 的梯度](#part-7--sigmoid-输出--mse-的梯度)
  - [7.1 模型、目标与损失](#71-模型目标与损失)
  - [7.2 为什么--1-与--x-i](#72-为什么--1-与--x-i)
  - [7.3 Sigmoid 的导数](#73-sigmoid-的导数)
  - [7.4 用链式法则对-mse-求导](#74-用链式法则对-mse-求导)
  - [7.5 各因子的含义](#75-各因子的含义)
  - [7.6 为什么没有解析解](#76-为什么没有解析解)

</details>

## Part 1 : 上周课程回顾

![Board notes](/images/docs/Lecture3_Linearclassification/1.png)

我们从一个基本想法出发：一次观测可以写成函数关系 $y = f(x)$。这就把问题变成了机器学习问题：模型给出预测 $\hat{y}$，然后与真实值 $y$ 做比较。

<br />

### 1.1 模型与训练数据

本讲使用的线性模型为
$$
\hat{y} = a x + b ,
$$
其中 $a$ 和 $b$ 是需要学习的参数。若有 $N$ 个样本，训练数据可写为
$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

<br />

### 1.2 误差与求解方法

为了选出 $a$ 和 $b$，我们最小化预测与真实值之间的误差：
$$
\mathcal{L} = \sum_{i=1}^{N} (y_i - \hat{y}_i)^2 .
$$
然后令梯度为零以得到最优解：
$$
\frac{\partial \mathcal{L}}{\partial a} = 0, \qquad
\frac{\partial \mathcal{L}}{\partial b} = 0 .
$$
这样可以得到解析解（作业里我们也用过）。

<br />

### 1.3 为什么解析解重要

解析解（**closed-form/闭式解**）指的是：通过代数推导能写成**显式公式**的解，不需要数值迭代。它计算极快：把数据代入、做求和，毫秒级即可得到结果。对实时系统（课上举的航空器每秒上千次决策）尤为重要。

<br />

### 1.4 这属于什么任务

输出是实数 $y \in \mathbb{R}$，所以这是一个**回归问题**。回归非常常见，后续做其他任务时，我们通常先与线性回归作对比。

<br />

---

## Part 2 : 基线与分类

![Board notes](/images/docs/Lecture3_Linearclassification/2.png)

<br />

### 2.1 一个简单的基线

为了判断线性回归是否“够好”，我们先加一个非常简单的基线：**不学习任何东西**——直接预测所有训练目标的平均值。黑板上写作 “$\hat{y}$ = average of all training data $y_i$”，即
$$
\hat{y}=\frac{1}{N}\sum_{i=1}^{N} y_i .
$$
实现很简单，而且建议总是先做这个基线。如果线性回归没有明显优于它，就需要检查数据或流程。

<br />

### 2.2 进入分类

接着我们讨论另一类重要问题：**分类**。关键信息是：直线拟合也能用于分类，但需要一些小改动。

<br />

### 2.3 输出类型的改变

此处输出**不是实数**，而是**离散标签**。黑板上写为
$$
y \in \{1,2,3\}.
$$
任务是判断输入属于哪个类别。

<br />

### 2.4 观测是什么

$x$ 是观测，可以是：
- 图像（课堂示例常用图像）；
- 温度；
- 声音；
- 或这些的组合。

典型场景是自动驾驶：系统每秒多次采集图像，需要检测行人、车辆、骑行者，并把信息交给驾驶系统。这就是一个使用离散标签的分类问题。

<br />

---

## Part 3 : 例子——霍比特人与精灵

![Board notes](/images/docs/Lecture3_Linearclassification/3.png)

<br />

### 3.1 从训练样本中学习

我们仍有模型 $y = f(x)$，参数从训练样本中学习。这一部分与回归相同：收集数据，然后拟合函数。

<br />

### 3.2 兽人的陷阱

故事设定：我们是兽人，有一个陷阱。抓到霍比特人对我们有利；抓到精灵就危险。观测 $x$ 可以取**身高**。假设霍比特人较矮、精灵较高，用这个特征来区分。

<br />

### 3.3 生成数据

为模拟数据，我们假设中土世界的身高近似正态分布（类似现实生物特征）。各生成 5 个霍比特人与 5 个精灵样本，用不同颜色标记。

样本显示：有一个很高的霍比特人和一个较矮的精灵，说明两类**存在重叠**，并非完全可分。现实中很常见，因此不能指望 100% 准确率。

<br />

### 3.4 接受重叠与错误

由于重叠，必须允许一定错误率——任何系统都会犯错。
- 例如肿瘤检测：不可能检出所有癌症，也可能把健康样本误判为癌症。

<br />

### 3.5 扩展到二维

目前只用一个特征（身高）。可以再加一个，如体重。假设：霍比特人更矮更重，精灵更高更瘦。

于是得到**二维数据**：
- $x_1 =$ 身高  
- $x_2 =$ 体重

每个样本为 $(x_1, x_2)$，$y$ 为类别标签。训练时可设 $y=0$（霍比特人）、$y=1$（精灵）。

<br />

### 3.6 训练与推理

机器学习通常分两阶段：  
1. **训练**——用带标签样本学习参数；  
2. **推理**——对新样本给出类别判断。

<br />

### 3.7 第一种分类直觉

黑板上给出一个新点，直觉是判为霍比特人，因为它更靠近霍比特人样本。这引出基于“接近度”的分类方法。

<br />

---

## Part 4 : 最近邻分类器

![Board notes](/images/docs/Lecture3_Linearclassification/4.png)

<br />

### 4.1 名称与核心思想
把“接近度”落地，就是**最近邻（Nearest Neighbour）分类器**：1-NN（以及后面的 $k$-NN）。思想很简单：新样本取**最近**训练样本的类别。

<br />

### 4.2 训练（存储全部样本）
训练阶段几乎没有计算：**把所有训练样本及其标签存起来**，不拟合参数。

<br />

### 4.3 推理（找最近者并拷贝标签）
新样本到来时：
1. 对**每个**训练样本，计算与新样本的距离；  
2. 若该距离**小于**当前最优，更新最优并**选择**该样本；  
3. **返回**距离最短样本的**类别标签**。

<br />

### 4.4 分类的简单基线
评估分类器是否“够好”的两种基线：
- **随机类别**：从类别集合中随机输出一个；  
- **最常见标签**：总是输出训练集中出现**最多**的标签。

当某类占比很高（如 99%）时，“最常见标签”的准确率就很高。我们的模型必须**超越它**才有意义。

<br />

### 4.5 小结
- 最近邻**很简单**，但常常**有效**；  
- 一定要与**简单基线**比较，了解任务难度与目标水平。

<br />

---

## Part 5 : 从 k-NN 的考量到直线拟合

![Board notes](/images/docs/Lecture3_Linearclassification/5.png)

<br />

### 5.1 k-NN 可调的要素

当我们研究最近邻能调什么时，会发现可选项很多：

- **距离度量**  
  一维欧氏距离（L2）：
  $$
  d(x,x_i)=\sqrt{(x-x_i)^2},
  $$
  **城市街区距离**（L1）：
  $$
  d(x,x_i)=|x-x_i|.
  $$
  还有许多其它距离，应结合数据选择。

- **邻居个数 $k$**  
  二分类下 $k=2$ 易平票，$k=3$ 可避免平票。

- **计算复杂度**  
  朴素 1-NN 要全表扫描，大数据时会慢；但有**快速最近邻**（多为近似法）通过空间划分加速。

- **一维 vs 二维的距离差异（影响决策边界）**  
  在 **1D** 中，L2 与 L1 **等价**，都退化为
  $$
  |x-x_i|.
  $$
  在 **2D 及更高维**，二者不同：  
  - 二维 **欧氏距离（L2）**：
    $$
    d(\mathbf{x},\mathbf{x_i})=\sqrt{(x_1-x_{i1})^2+(x_2-x_{i2})^2},
    $$
    其等距轮廓是**圆形**，决策边界更**圆滑**；  
  - 二维 **城市街区距离（L1）**：
    $$
    d(\mathbf{x},\mathbf{x_i})=|x_1-x_{i1}|+|x_2-x_{i2}|,
    $$
    等距轮廓是**菱形**，决策边界更**贴齐坐标轴**。  
  选择哪一种取决于数据的几何结构。

**🤔 作业**：构造二维点，使 **1-NN** 与 **3-NN** 的分类**不同**。

<br />

### 5.2 我们能靠“拟合一条线”来分类吗？
![Board notes](/images/docs/Lecture3_Linearclassification/6.png)

试把分类写成**直线拟合**。给类别赋值
$$
y=-1 \;\text{（霍比特人）}, \qquad y=+1 \;\text{（精灵）}.
$$
拟合直线
$$
\hat y = a x + b
$$
到这些 $(x,y)$ 对（与回归完全一致）。  
拟合好后，用简单的**分类规则**
$$
\hat y < 0 \Rightarrow \text{霍比特人}, \qquad
\hat y > 0 \Rightarrow \text{精灵}.
$$
$\hat y=0$ 的点就是**判别点**（决策边界）。

课上的玩具例子中，这条规则把几个新样本都判对了。

![Board notes](/images/docs/Lecture3_Linearclassification/7.png)

<br />

### 5.3 分类该如何度量误差？
分类误差是**二元**的：
- 若 $\hat y$ 给出**正确**类别 ⇒ $\text{err}=0$；  
- 若 $\hat y$ 给出**错误**类别 ⇒ $\text{err}=1$。  

注意与直线拟合的**平方误差**不匹配，这会带来问题——下一节修正。

<br />

---

## Part 6 : 从直线到阶跃，再到 sigmoid

![Board notes](/images/docs/Lecture3_Linearclassification/8.png)

<br />

### 6.1 阶跃规则与判别点

保留 $\hat y = a x + b$，把 $\hat y=0$ 作为**判别点**。黑板上的阶跃规则用的是 **$\pm1$** 标签：
$$
y =
\begin{cases}
+1, & x > x_d,\\[4pt]
-1, & x < x_d .
\end{cases}
$$

等价写法（看直线符号）：
$$
\hat y < 0 \Rightarrow \text{霍比特人}, \qquad
\hat y > 0 \Rightarrow \text{精灵}.
$$

![Board notes](/images/docs/Lecture3_Linearclassification/9.png)

<br />

### 6.2 用 logistic（sigmoid）平滑近似阶跃

硬阶跃不连续，不易求导。用光滑近似——logistic（“logsig”）：
$$
\operatorname{logsig}(x)=\frac{1}{1+e^{-x}} .
$$

与直线复合：
$$
\hat y \;=\; \operatorname{logsig}(a x + b)
=\frac{1}{1+e^{-(a x + b)}} .
$$

$a$ 控制过渡陡峭程度，$b$ 控制阈值位置。为匹配 $[0,1]$，把类别重标为（霍比特人 $=0$、精灵 $=1$）。

<br />

### 6.3 训练信号（暂且）
有了平滑输出，就可以用**均方误差**最小化 $\{0,1\}$ 目标与 $\hat y$ 的差异，从而拟合 $a,b$。

<br />

---

## Part 7 : Sigmoid 输出 + MSE 的梯度（逐步推导）

![Board notes](/images/docs/Lecture3_Linearclassification/10.png)

<br />

### 7.1 模型、目标与损失

模型（1D 特征 \(x\)）：
$$
z_i = a x_i + b
$$

$$
\hat y_i = \sigma(z_i) = \frac{1}{1+e^{-z_i}}
$$

目标：
$$
y_i \in \{0,1\}
$$

均方误差（MSE）：
$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-\hat y_i\bigr)^2
$$

<br />

### 7.2 为什么 $ \frac{\partial z_i}{\partial b} = 1 $ 与 $ \frac{\partial z_i}{\partial a} = x_i $ ？

因为
$$
z_i = a x_i + b
$$

对 \(b\) 求偏导：
$$
\frac{\partial z_i}{\partial b} = 1
$$

对 \(a\) 求偏导：
$$
\frac{\partial z_i}{\partial a} = x_i
$$

含义：$b$ 变化使直线整体上/下平移；$a$ 变化改变斜率，幅度由 $x_i$ 决定。

<br />

### 7.3 Sigmoid 的导数

定义：
$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

导数：
$$
\frac{d\sigma}{dz}=\sigma(z)\bigl(1-\sigma(z)\bigr)
$$

<br />

### 7.4 用链式法则对 MSE 求导

残差：
$$
e_i = y_i - \hat y_i
$$

把损失写成残差形式：
$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N} e_i^{\,2}
$$

外层平方的导数：
$$
\frac{\partial}{\partial e_i}\bigl(e_i^{\,2}\bigr)=2e_i
$$

残差相对输出的导数：
$$
\frac{\partial e_i}{\partial \hat y_i} = -1
$$

Sigmoid 与直线的链式求导（对 \(a\)）：
$$
\frac{\partial \hat y_i}{\partial a} = \frac{d\sigma}{dz}\Big|_{z=z_i}\cdot \frac{\partial z_i}{\partial a}
$$

$$
\frac{\partial \hat y_i}{\partial a} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot x_i
$$

对 \(b\)：
$$
\frac{\partial \hat y_i}{\partial b} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot 1
$$

把链式法则串起来（对 \(a\)）：
$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N} 2e_i \cdot \frac{\partial e_i}{\partial \hat y_i}\cdot \frac{\partial \hat y_i}{\partial a}
$$

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N} 2e_i \cdot (-1)\cdot \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\,x_i
$$

对 \(b\) 类似：
$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N} 2e_i \cdot (-1)\cdot \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot 1
$$

把 \(e_i=y_i-\hat y_i\) 代回，并把负号吸收入残差（等价、更整洁）：
$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\,x_i
$$

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

<br />

### 7.5 各因子的含义

- 残差：
$$
\hat y_i - y_i
$$

- Sigmoid 的斜率（学习信号强弱）：
$$
\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

- 输入尺度（只影响 \(a\) 的梯度）：
$$
x_i
$$

当输出在 0.5 附近时斜率大（学习信号强）；接近 0 或 1 时斜率小（饱和）。

<br />

### 7.6 为什么没有解析解

参数 \(a,b\) 位于非线性的 Sigmoid **内部**，又在求和号**里面**。把两条梯度设为零，并不能像线性回归那样化简出**闭式公式**。因此需要**迭代优化**：

学习率更新：
$$
a \leftarrow a - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
$$

$$
b \leftarrow b - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
$$

重复以上更新，直到损失不再下降。
