---
title: "统计方法在文本数据分析中的应用_1"
subtitle: "(2025年9月2日): 导论与预备知识"
date: 2025-09-04
lang: zh
excerpt: "课程概览、课程安排、文本分析的重要性、关键的概率与机器学习基础，以及本课程所需的Python/NLP工具。"
tags: ["Jaakko Peltonen","Statistical Methods for Text Data Analysis","Chain rule"]
draft: false 
---

## 导论与预备知识

**课程目标：** 学习如何用统计方法来表示、建模与分析文本。先打好基础，再逐渐过渡到现代深度NLP方法（如词嵌入、Transformer）。  
**为什么重要：** 文本无处不在（新闻、评论、社交媒体、法律、科学、转录……）。统计方法能够帮助我们处理噪声，扩展到人工难以处理的大规模数据，并支持基于证据的结论。  
**学习成果：** 熟悉文本表示方法（向量空间模型、神经嵌入）、文本处理流程（分词 → 词形还原 → 特征）、以及模型（n-gram、主题模型、HMM、PCFG）。能够亲自实现并应用核心技术。
<br />

---

## 1. 课程安排与参与

### 1.1 上课方式
**本周：** 线下授课。  
**接下来的几周：** 线上 Zoom 授课（因出差）。链接会提前发布在 Moodle。  
**录像：** 每次课后会上传（会做少量剪辑）。可用于复习，但更推荐现场参与。

### 1.2 互动方式
鼓励同学在课上随时提问。  
课后讨论可在 **Moodle** 上进行，以便所有人受益（作业需独立完成）。

### 1.3 课件与作业
课件在 Moodle 上提供下载。作业已发布（PDF 说明 + 提交入口）。  
通常截止日期约 2 周，个别较重的作业会有 3 周。迟交可能扣分或不接受。  
**提交建议：** 可以提交 Jupyter Notebook，但建议额外提供：
- 一个简洁的 **PDF** 答案  
- 一个整理好的 **.py** 代码文件  

### 1.4 考核与评分
**考试：** 期末最后一次课后，预计 12 月底，笔试。补考在春季和暑假。  
**比例：** 总成绩 = $0.65 \times$ 考试 + $0.35 \times$ 作业，最终才取整。  
**分数线参考：** 作业 40 分左右及格，满分约 57 分。考试 5 道大题，每题 10 分。

### 1.5 相关课程
规则驱动的 NLP、深度 NLP、通用深度学习。  
信息检索、语音识别与本课相关但不在重点范围内。
<br />

---

## 2. 文本与 AI 的视角

- 解释依赖于上下文、缺失词语、偏见（Carson、Orwell、Richelieu 的经典引言）。  
- 人机交流往往为了机器而简化（短查询、SEO 标签）。  
- 大数据能提升性能，但长尾问题仍然存在。严谨性和责任心很重要。

### 2.1 思想实验
**图灵测试：** 如果人类无法稳定分辨机器与人类的对话，则机器“通过”测试。  
**中文房间（Searle）：** 会对话并不意味着理解。

### 2.2 现代聊天机器人与 LLM
目前存在多种竞争模型（OpenAI、Google、Meta、Anthropic）。本课程关注共有的基础，而非特定厂商。

### 2.3 压缩与“理解”
**Hutter 奖：** 更好的压缩意味着更好的结构建模，因此某种意义上等同于更好的“理解”。
<br />

---

## 3. 英语与语言多样性

涉及词性、词法、句法、语义、语用。  
语言会随着时间变化：拼写、语法、词义会演变（如 *nice*, *fantastic*, *meat*, *guy*）。  
本课程主要聚焦英语，但方法大多可推广。
<br />

---

## 4. 概率基础

设随机变量用大写 ($X, Y$)，取值小写。

- 离散概率：$0 \leq P(x) \leq 1$, $\sum_x P(x)=1$  
- 连续密度：$p(x) \geq 0$, $\int p(x)\,dx = 1$  
- 联合概率：$P(x,y)$  
- 边际概率：$P(y)=\sum_x P(x,y)$ 或 $P(y)=\int p(x,y)\,dx$  
- 条件概率：$P(y\mid x)=\dfrac{P(x,y)}{P(x)}$  
- 链式法则：  
  $$
  P(a,\dots,z)=P(a\mid\dots,z)\cdot P(b\mid\dots,z)\cdots P(y\mid z)\cdot P(z)
  $$
- 贝叶斯公式：  
  $$
  P(y\mid x)=\dfrac{P(x\mid y)P(y)}{P(x)}
  $$

**例子：** 如果 $X=$ 早晨天气, $Y=$ 晚上天气：
$$
P(Y=\text{rain}\mid X=\text{sun})=\dfrac{P(X=\text{sun},Y=\text{rain})}{P(X=\text{sun})}
$$
<br />

---

## 5. 机器学习基础

### 5.1 数据
观测由特征组成（词袋、嵌入）。需划分训练/测试集，用交叉验证评估。  
数据可能具有序列、层次、多语料结构。

### 5.2 任务
**监督学习：** 分类（垃圾邮件、情感）、回归（可读性评分）。  
**无监督学习：** 聚类、降维、主题建模、可视化。

### 5.3 评价
回归：
$$
MSE=\frac{1}{N}\sum_i(y_i-\hat y_i)^2
$$
分类：
$$
\text{Error rate}=\frac{1}{N}\sum_i 1(\hat y_i\neq y_i)
$$

### 5.4 优化
梯度上升/下降：
$$
u\leftarrow u\pm \eta\nabla_u L
$$
优化方法：SGD、动量法、Adam、LBFGS。

### 5.5 概率建模
极大似然估计：
$$
\hat\theta=\arg\max_\theta P(D\mid \theta)
$$
MAP 估计：
$$
\hat\theta=\arg\max_\theta P(D\mid \theta)P(\theta)
$$
贝叶斯采样：$\theta^{(s)}\sim P(\theta\mid D)$，常用 MCMC（Metropolis–Hastings、Gibbs）。
<br />

---

## 6. 从文本到数值表示

处理流程：标准化 → 分词 → 词形还原/词干提取 → 短语/搭配 → 特征表示。  
表示方法：词袋、TF-IDF、嵌入。  
模型：n-gram、主题模型、HMM、PCFG、聚类、可视化。后续引入嵌入与 Transformer。
<br />

---

## 7. 实用工具包

### 7.1 环境
推荐 Python $\geq 3.9$。建议使用 Anaconda，附带多数包，Spyder IDE 类似 Matlab。其他 IDE 也可。

### 7.2 安装依赖
**pip：**
```bash
    python -m pip install nltk numpy pandas matplotlib scikit-learn beautifulsoup4 scrapy
``` 
**conda：**
```bash
    conda install nltk numpy pandas matplotlib scikit-learn
    conda install -c conda-forge beautifulsoup4 scrapy
```

### 7.3 使用 NLTK 资源
```python
    import nltk
    nltk.download("punkt")
    nltk.download("wordnet")
    nltk.download("averaged_perceptron_tagger")
    nltk.download("stopwords")
```

### 7.4 常用库
核心：`os`, `pickle`, `math`, `statistics`, `random`, `datetime`, `gzip`  
数值：`numpy`, `scipy`  
数据：`pandas`, `csv`  
绘图：`matplotlib`  
网络/爬虫：`scrapy`, `beautifulsoup4`  
NLP：`nltk`  
深度学习（后续）：`torch`, `tensorflow`, `keras`
<br />

---

## 8. Python 快速参考

**运算符：** `+ - * / % **`  
**类型：** 整型、浮点、字符串、布尔值  
**环境检查：** `dir()`, `type(x)`, `help(obj)`  

**流程控制：**
```bash
    if cond:
        ...
    elif cond2:
        ...
    else:
        ...

    for i in range(n):
        ...
    while cond:
        ...
```

**数据结构：**  
元组 `(1,2,"apple")`（不可变）  
列表 `[1,2,3]`（可变）  
字典 `{"name":"A Beautiful Mind","year":2001}`  
NumPy 数组 `np.array([[1,2,3],[4,5,6]])`
<br />

---

## 9. 学习建议

按时完成作业，作业是考试准备的重要环节。  
在 Moodle 上进行概念讨论（但不要共享答案）。  
保持整洁的代码/数据结构（区分原始数据、笔记本、最终代码和报告）。
<br />

---

## 10. 下一步

下一讲将进入动手实践：文本预处理、分布、搭配、向量空间、聚类、n-gram 模型，随后是主题模型与序列模型。
<br />

---

## 11. 练习 1.3 —— 概率链式法则：**完整逐步推导**

给定长度为 $N$ 的随机变量序列 $w_1,\dots,w_N$。  
对每个位置 $i$ 定义左右上下文：
- 左上下文 $Left_i=[w_1,\dots,w_{i-1}]$  
- 右上下文 $Right_i=[w_{i+1},\dots,w_N]$

约定：若上下文为空，则记 $p(\emptyset)=1$，并有 $p(w_i\mid \emptyset)=p(w_i)$。目标是证明
$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}=1.
$$

为严谨起见，给出两套等价的完整证明。

### 11.1 证明 A：两端乘积都等于同一个联合概率

**第 1 步（正向链式展开）**  
由链式法则，联合概率可写为
$$
\begin{aligned}
p(w_1,\dots,w_N)
&=p(w_1)\,p(w_2\mid w_1)\,p(w_3\mid w_1,w_2)\cdots p(w_N\mid w_1,\dots,w_{N-1})\\
&=\prod_{i=1}^{N}p\!\left(w_i\mid Left_i\right).
\end{aligned}
$$
其中 $Left_1=\emptyset$，因此首因子 $p(w_1\mid Left_1)=p(w_1)$。

**第 2 步（反向链式展开）**  
同理，按反向顺序展开有
$$
\begin{aligned}
p(w_1,\dots,w_N)
&=p(w_N)\,p(w_{N-1}\mid w_N)\,p(w_{N-2}\mid w_{N-1},w_N)\cdots p(w_1\mid w_2,\dots,w_N)\\
&=\prod_{i=1}^{N}p\!\left(w_i\mid Right_i\right),
\end{aligned}
$$
其中 $Right_N=\emptyset$，因此末因子 $p(w_N\mid Right_N)=p(w_N)$。

**第 3 步（同一量之比）**  
将两种分解相除，得到
$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)}=1.
$$
证毕。
<br />

---

### 11.2 证明 B：Bayes 展开 + 望远镜式消去（逐项不省略）

**第 1 步（左侧条件概率写成前缀比）**  
利用 $p(a\mid b)=\dfrac{p(a,b)}{p(b)}$，有
$$
\begin{aligned}
p(w_i\mid Left_i)
&=\frac{p\big(w_i,\,w_1,\dots,w_{i-1}\big)}{p(w_1,\dots,w_{i-1})}\\
&=\frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}.
\end{aligned}
$$

**第 2 步（右侧条件概率写成后缀比）**  
记后缀 $R_i=(w_i,\dots,w_N)$，则 $Right_i=R_{i+1}$，于是
$$
\begin{aligned}
p(w_i\mid Right_i)
&=\frac{p\big(w_i,\,Right_i\big)}{p(Right_i)}
=\frac{p(R_i)}{p(R_{i+1})}
=\frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}.
\end{aligned}
$$

**第 3 步（构造第 $i$ 项的比值）**  
将上两式相除，得
$$
\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{\dfrac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}}
{\dfrac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}}
=\frac{p(w_1,\dots,w_i)\,p(w_{i+1},\dots,w_N)}
{p(w_1,\dots,w_{i-1})\,p(w_i,\dots,w_N)}.
$$

**第 4 步（写出全积并按因子分组）**  
对 $i=1$ 到 $N$ 连乘：
$$
\begin{aligned}
&\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}\\
&=\prod_{i=1}^{N}\frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}
\;\cdot\;
\prod_{i=1}^{N}\frac{p(w_{i+1},\dots,w_N)}{p(w_i,\dots,w_N)}.
\end{aligned}
$$

**第 5 步（对第一个乘积做望远镜消去）**  
注意分子分母相邻项成对抵消：
$$
\prod_{i=1}^{N}\frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}
=\frac{p(w_1)}{p(\emptyset)}
\cdot\frac{p(w_1,w_2)}{p(w_1)}
\cdots
\frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_{N-1})}
=\frac{p(w_1,\dots,w_N)}{p(\emptyset)}.
$$
由约定 $p(\emptyset)=1$，故该乘积等于 $p(w_1,\dots,w_N)$。

**第 6 步（对第二个乘积做望远镜消去）**  
同理有
$$
\prod_{i=1}^{N}\frac{p(w_{i+1},\dots,w_N)}{p(w_i,\dots,w_N)}
=\frac{p(w_2,\dots,w_N)}{p(w_1,\dots,w_N)}
\cdot\frac{p(w_3,\dots,w_N)}{p(w_2,\dots,w_N)}
\cdots
\frac{p(\emptyset)}{p(w_N)}.
$$
逐项抵消后得到
$$
\prod_{i=1}^{N}\frac{p(w_{i+1},\dots,w_N)}{p(w_i,\dots,w_N)}
=\frac{p(\emptyset)}{p(w_1,\dots,w_N)}
=\frac{1}{p(w_1,\dots,w_N)}.
$$

**第 7 步（合并两部分）**  
将第 5 步与第 6 步结果相乘：
$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= p(w_1,\dots,w_N)\cdot \frac{1}{p(w_1,\dots,w_N)}=1.
$$

**第 8 步（边界检查）**  
当 $i=1$ 时 $Left_1=\emptyset$，当 $i=N$ 时 $Right_N=\emptyset$，均已由 $p(\emptyset)=1$ 与 $p(w\mid\emptyset)=p(w)$ 正确处理。  
至此，命题得证。

> 备注：若读者希望“看见”消去过程，可取 $N=3$ 直接展开：
> $$
> \begin{aligned}
> &\frac{p(w_1)}{p(w_1,w_2,w_3\mid w_2,w_3)}\cdot
> \frac{p(w_1,w_2)}{p(w_2,w_3)}\cdot
> \frac{p(w_1,w_2,w_3)}{p(w_3)}\\
> &=\frac{p(w_1)\,p(w_1,w_2)\,p(w_1,w_2,w_3)}
> {p(w_2,w_3)\,p(w_1,w_2,w_3)\,p(w_3)}
> =1.
> \end{aligned}
> $$
> 一般情形即为上述望远镜式约消的推广。
<br />

---

## 12. 课件回顾与概念

![课件笔记](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_1/1.png)

### 12.1 幻灯片中的概念

- 概率和为 1：  
$$
\sum_k p(x=k)=1 \qquad \int p(y)\,dy=1
$$
- 边际概率：  
$$
\sum_k p(x=k,y)=p(y)
$$
- 条件概率：  
$$
p(y\mid x)=\frac{p(y,x)}{p(x)}
$$
- 链式法则：  
$$
p(a,b,c,\dots,y,z)=p(a\mid b,c,\dots,y,z)\cdot\dots\cdot p(y\mid z)\cdot p(z)
$$
- 贝叶斯公式：  
$$
p(y\mid x)=\frac{p(x\mid y)\,p(y)}{p(x)}
$$

### 12.2 与练习 1.3 的联系

$\prod_{i=1}^{N}p(w_i\mid Left_i)$ 是联合分布的正向分解，  
$\prod_{i=1}^{N}p(w_i\mid Right_i)$ 是反向分解。  
二者相除正好抵消，结果为 1，即第 11 节所证结论。

---

## 附录 A —— 关键公式

$$P(y)=\sum_x P(x,y)$$  
$$P(y\mid x)=\frac{P(x,y)}{P(x)}$$  
$$P(a,\dots,z)=P(a\mid\dots,z)\cdot\dots\cdot P(y\mid z)\cdot P(z)$$  
$$P(y\mid x)=\frac{P(x\mid y)P(y)}{P(x)}$$  

$$MSE=\frac{1}{N}\sum_i(y_i-\hat y_i)^2$$  
$$\text{Error rate}=\frac{1}{N}\sum_i 1(\hat y_i\neq y_i)$$  

$$u\leftarrow u+\eta\nabla_u L \quad (\text{最大化})$$  
$$u\leftarrow u-\eta\nabla_u L \quad (\text{最小化})$$  

$$\hat\theta_{MLE}=\arg\max_\theta P(D\mid \theta)$$  
$$\hat\theta_{MAP}=\arg\max_\theta P(D\mid \theta)P(\theta)$$
