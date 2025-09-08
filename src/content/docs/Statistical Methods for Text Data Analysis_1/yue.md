---
title: "統計方法分析文字數據_1"
subtitle: "(2025年9月2號): 介紹同初步"
date: 2025-09-04
lang: yue
excerpt: "課程簡介、安排、點解要做文本分析、概率同機器學習基礎、同埋 Python/NLP 工具箱。"
tags: ["Jaakko Peltonen","Statistical Methods for Text Data Analysis","Chain rule"]
draft: false 
---

##  介紹同初步

**課程目標：** 學識點樣用統計方法去表示、建模同分析文字。先打好基本，再連去現代深度 NLP（embeddings、transformers）。  
**點解重要：** 文字周圍都係（新聞、評論、社交媒體、法律、科學、對話稿…）。統計方法可以應付噪音、應付規模遠超人手閱讀，幫手做到有根據嘅結論。  
**學習成果：** 熟識幾種主要表示方法（向量空間模型、神經 embedding）、處理流程（tokenization → lemmatization → 特徵）、同模型（n-gram、主題模型、HMM、PCFG）。識得自己動手應用核心技術。  
<br />

---

## 1. 課程安排同參與

### 1.1 上課時間
**今個星期：** 面授。  
**之後幾個星期：** Zoom 網上（因為老師出差）。連結會出喺 Moodle。  
**錄影：** 課後會上載（簡單剪輯）。適合溫習，但建議 live 出席。

### 1.2 互動
上堂唔明要問。Moodle 討論區問，咁樣大家都見到答案（但功課要自己做）。

### 1.3 教材同練習
Slides 喺 Moodle。練習題已經有（PDF + 提交區）。  
一般截止 ≈ 2 星期。遲交可能會扣分或者唔收。  
**提交提示：** Jupyter Notebook 可以，但可能亂。記得交乾淨嘅 PDF 答案，最好另交埋 `.py`。

### 1.4 評核同分數
**考試：** 最后一堂之後，大概 12 月尾。重考喺春天同暑假。  
**比重：** 總成績 = $0.65 \times$ 考試 $+ 0.35 \times$ 練習，最後先四捨五入。  
**大概界線：** 40 分合格，練習滿分 57 左右。考試 5 條大題，每條 10 分。

### 1.5 相關課程
Rule-based NLP、Deep NLP、Deep Learning。  
Information Retrieval 同 Speech Recognition 相關但唔係重點。  
<br />

---

## 2. 文字同 AI 嘅角度

- 解釋要睇 context，缺詞同偏見都會影響（Carson, Orwell, Richelieu）。  
- 人機溝通成日為機器簡化（短 query、SEO tag）。  
- 數據規模幫到手，但長尾問題仍然存在。責任心同嚴謹好重要。

### 2.1 經典思想實驗
**圖靈測試：** 如果評審分唔清人定機器，就算 pass。  
**中文房間（Searle）：** 對話 pass 唔代表機器真係「理解」。

### 2.2 現代 chatbot 同 LLM
好多競爭模型（OpenAI、Google、Meta、Anthropic）。課程講共同嘅基礎，唔會偏重某個廠。

### 2.3 壓縮同「理解」
**Hutter Prize：** 壓縮得好往往代表模型更識文字結構，咁就似乎更接近「理解」。  
<br />

---

## 3. 英文同語言變化

詞性、形態、句法、語義、語用。  
語言會變：拼寫、語法、意思都轉（例如 *nice*、*fantastic*、*meat*、*guy*）。  
重點放喺英文，但好多技術可以通用。  
<br />

---

## 4. 概率基礎

隨機變量大寫 ($X, Y$)，取值細寫。

- 概率（離散）：$0 \leq P(x) \leq 1$, $\sum_x P(x) = 1$  
- 密度（連續）：$p(x) \geq 0$, $\int p(x) dx = 1$  
- 聯合：$P(x, y)$  
- 邊緣：$P(y) = \sum_x P(x, y)$ 或 $P(y) = \int p(x, y) dx$  
- 條件：$P(y \mid x) = \dfrac{P(x, y)}{P(x)}$  
- 鏈式法則：  
  $$P(a,\dots,z) = P(a\mid\dots,z) \cdot P(b\mid\dots,z) \cdots P(y \mid z)\cdot P(z)$$  
- Bayes 法則：  
  $$P(y \mid x) = \dfrac{P(x \mid y) P(y)}{P(x)}$$  

**例子：** 如果 $X =$ 朝早天氣，$Y =$ 夜晚天氣，  
$$P(Y=\text{rain} \mid X=\text{sun}) = \dfrac{P(X=\text{sun}, Y=\text{rain})}{P(X=\text{sun})}$$  
<br />

---

## 5. 機器學習基礎

### 5.1 數據
觀測 + 特徵（bag-of-words、embedding）。要做 train/test split，cross-validation。  
結構：序列、層次、多語料。

### 5.2 任務
**有監督：** 分類、回歸。  
**無監督：** 聚類、主題模型、可視化。

### 5.3 評估
- 回歸: $$MSE = \frac{1}{N} \sum_i (y_i - \hat y_i)^2$$  
- 分類: $$\text{Error rate} = \frac{1}{N} \sum_i 1(\hat y_i \neq y_i)$$  

### 5.4 優化
梯度上升/下降：  
$$u \leftarrow u \pm \eta \nabla_u L$$  
算法：SGD、momentum、Adam、LBFGS。

### 5.5 概率建模
- 最大似然：$$\hat \theta = \arg\max_\theta P(D \mid \theta)$$  
- MAP：$$\hat \theta = \arg\max_\theta P(D \mid \theta) P(\theta)$$  
- 後驗抽樣：$\theta^{(s)} \sim P(\theta \mid D)$ via MCMC（Metropolis–Hastings、Gibbs）。  
<br />

---

## 6. 由文字變數字

流程：normalize → tokenize → lemma/stemming → collocation → feature。  
表示：bag-of-words、TF-IDF、embedding。  
模型：n-gram、topic model、HMM、PCFG、聚類、可視化。後面有 neural embedding 同 transformer。  
<br />

---

## 7. 工具箱

### 7.1 環境
建議 Python $\geq$ 3.9。推薦 Anaconda。Spyder IDE 似 Matlab。其他 IDE 都得。

### 7.2 安裝套件
**pip:**  
```bash
    python -m pip install nltk numpy pandas matplotlib scikit-learn beautifulsoup4 scrapy
```
**conda:**  
```bash
    conda install nltk numpy pandas matplotlib scikit-learn
    conda install -c conda-forge beautifulsoup4 scrapy
```
### 7.3 用 NLTK 資源  
```bash
    import nltk
    nltk.download("punkt")
    nltk.download("wordnet")
    nltk.download("averaged_perceptron_tagger")
    nltk.download("stopwords")
```
### 7.4 常用 library
核心: `os`, `pickle`, `math`, `statistics`, `random`, `datetime`, `gzip`  
數值: `numpy`, `scipy`  
數據: `pandas`, `csv`  
畫圖: `matplotlib`  
網頁: `scrapy`, `beautifulsoup4`  
NLP: `nltk`  
深度學習（後面）：`torch`, `tensorflow`, `keras`  
<br />

---

## 8. Python 快速參考

**算術:** `+ - * / % **`  
**變量:** int, float, string, bool  
**檢查:** `dir()`, `type(x)`, `help(obj)`  
**控制流程:**  
```bash
    if cond: ...
    elif cond2: ...
    else: ...

    for i in range(n): ...
    while cond: ...
```
**數據結構:**  
Tuple `(1,2,"apple")` immutable  
List `[1,2,3]` mutable  
Dict `{"name":"A Beautiful Mind","year":2001}`  
NumPy array `np.array([[1,2,3],[4,5,6]])`  
<br />

---

## 9. 學習指引

要準時交練習。Moodle 討論區有用。保持乾淨 repo：raw data、notebook、code、report。練習就係考試準備。  
<br />

---

## 10. 下次內容

下節：動手做文本預處理、分布、collocation、向量空間、聚類、n-gram，之後主題模型同序列模型。  
<br />

---

## 11. 練習 1.3 — 概率鏈式法則完整推導

隨機變量 $w_1,\dots,w_N$。定義 $Left_i=[w_1,\dots,w_{i-1}]$，  
$Right_i=[w_{i+1},\dots,w_N]$。  
空 context 時條件變邊緣。設 $p(\emptyset)=1$。

要證：

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}=1.
$$

---

### 證明 A: 兩個乘積都等於 joint

1. 前向鏈式：

$$
p(w_1,\dots,w_N)
= p(w_1)\,p(w_2\mid w_1)\cdots p(w_N\mid w_1,\dots,w_{N-1})
= \prod_{i=1}^{N} p\!\left(w_i\mid Left_i\right).
$$

2. 反向鏈式：

$$
p(w_1,\dots,w_N)
= p(w_N)\,p(w_{N-1}\mid w_N)\cdots p(w_1\mid w_2,\dots,w_N)
= \prod_{i=1}^{N} p\!\left(w_i\mid Right_i\right).
$$

3. 相除：

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)} = 1.
$$

---

### 證明 B: 用 Bayes telescoping

對於左邊 context：  

$$
p(w_i\mid Left_i) = \frac{p(w_i,Left_i)}{p(Left_i)}
= \frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}.
$$

對於右邊 context，定義 $R_i=(w_i,\dots,w_N)$，注意 $Right_i=R_{i+1}$。咁樣：  

$$
p(w_i\mid Right_i) = \frac{p(w_i,Right_i)}{p(Right_i)}
= \frac{p(R_i)}{p(R_{i+1})}
= \frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}.
$$

所以每個 ratio 等於：  

$$
\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{\displaystyle \frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}}
{\displaystyle \frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}}
= \frac{p(w_1,\dots,w_i)\,p(w_{i+1},\dots,w_N)}
{p(w_1,\dots,w_{i-1})\,p(w_i,\dots,w_N)}.
$$

將呢個 ratio 由 $i=1$ 乘到 $N$：  

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{\displaystyle
\prod_{i=1}^{N} p(w_1,\dots,w_i)\;\prod_{i=1}^{N} p(w_{i+1},\dots,w_N)}
{\displaystyle
\prod_{i=1}^{N} p(w_1,\dots,w_{i-1})\;\prod_{i=1}^{N} p(w_i,\dots,w_N)}.
$$

呢啲大乘積會 telescoping（相消）。用 $p(w_1,\dots,w_0)=p(\emptyset)=1$ 同 $p(w_{N+1},\dots,w_N)=p(\emptyset)=1$，最尾得：  

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_N)}{1}\cdot\frac{1}{p(w_1,\dots,w_N)}=1.
$$

咁樣就證明完成。  
<br />

---

## 12. Slide recap 同概念

![Board notes](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_1/1.png)

### 12.1 Slide 上示範嘅概念

總和或者積分等於 1：

$$
\sum_k p(x=k)=1 \qquad \int p(y)\,dy=1
$$

邊緣化即係去掉唔 condition 嘅變量：

$$
\sum_k p(x=k,y) = p(y)
$$

條件概率連結 joint 同 marginal：

$$
p(y\mid x) = \frac{p(y,x)}{p(x)}
$$

鏈式法則將 joint 展開成乘積：

$$
p(a,b,c,\dots,y,z)=p(a\mid b,c,\dots,y,z)\,p(b\mid c,\dots,y,z)\cdots p(y\mid z)\,p(z)
$$

Bayes 法則交換條件：

$$
p(y\mid x)=\frac{p(x\mid y)\,p(y)}{p(x)}
$$

### 12.2 呢啲概念點樣推動練習 1.3

個乘積 $\prod_{i=1}^{N} p(w_i\mid Left_i)$ 就係 forward chain rule 對 joint $p(w_1,\dots,w_N)$ 嘅 factorization，而 $\prod_{i=1}^{N} p(w_i\mid Right_i)$ 就係 reverse order 嘅 factorization。兩個 ratio 相除就 cancel 咗 joint，得返 $1$，正正就係我哋喺第 11 節證明嘅結果。  
<br />

---

## 附錄 A — 主要公式

$$P(y) = \sum_x P(x,y)$$  
$$P(y \mid x) = \frac{P(x,y)}{P(x)}$$  
$$P(a,\dots,z) = P(a\mid\dots,z)\cdot\dots\cdot P(y\mid z)\cdot P(z)$$  
$$P(y \mid x) = \frac{P(x \mid y) P(y)}{P(x)}$$  

$$MSE = \frac{1}{N} \sum_i (y_i - \hat y_i)^2$$  
$$\text{Error rate} = \frac{1}{N} \sum_i 1(\hat y_i \neq y_i)$$  

$$u \leftarrow u + \eta \nabla_u L \quad (\text{maximize})$$  
$$u \leftarrow u - \eta \nabla_u L \quad (\text{minimize})$$  

$$\hat \theta_{MLE} = \arg\max_\theta P(D \mid \theta)$$  
$$\hat \theta_{MAP} = \arg\max_\theta P(D \mid \theta) P(\theta)$$  
