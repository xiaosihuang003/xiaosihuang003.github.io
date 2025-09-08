---
title: "Statistical Methods for Text Data Analysis_1"
subtitle: "(September 2, 2025): Introduction and preliminaries 😊"
date: 2025-09-04
lang: en
excerpt: "Course overview, logistics, why text analysis matters, key probability & ML preliminaries, and the practical Python/NLP toolkit you’ll use."
tags: ["Jaakko Peltonen","Statistical Methods for Text Data Analysis","Chain rule"]
draft: false 
---

##  Introduction & Preliminaries

**Goal of the course:** Learn to represent, model, and analyze text with statistical methods. Build strong fundamentals first, later connect them to modern deep NLP (embeddings, transformers).  
**Why it matters:** Text is ubiquitous (news, reviews, social media, law, science, transcripts…). Statistical methods help handle noise, scale beyond manual reading, and support evidence-based conclusions.  
**Learning outcomes:** Familiarity with key representations (vector space models, neural embeddings), pipelines (tokenization → lemmatization → features), and models (n-grams, topic models, HMMs, PCFGs). Ability to apply several core techniques yourself.
<br />

---

## 1. Logistics & participation

### 1.1 Meetings
**This week:** on-site.  
**Next couple of weeks:** online via Zoom (due to travel). Links will appear in Moodle.  
**Recordings:** uploaded soon after each lecture (minor editing first). Good for review, but live attendance is preferred.

### 1.2 Interactivity
Ask questions during lectures whenever something is unclear. Use Moodle discussion so answers benefit the whole class (but do your own assignments).

### 1.3 Materials & exercises
Slides available in Moodle. Exercises already published (PDF + submission area).  
Usual deadline ≈ 2 weeks. Late returns may be penalized or rejected.  
**Submission tip:** Jupyter Notebooks are welcome but can be messy. Also provide a clean PDF of answers and, if possible, a separate `.py` file.

### 1.4 Assessment & grading
**Exam:** after final lecture, most likely late December. Retakes in spring and late summer.  
**Weights:** final grade = $0.65 \times$ exam $+ 0.35 \times$ exercises, rounded only at the end.  
**Indicative boundaries:** pass around 40 points, top grade near 57 for exercises. Exam: 5 problems $\times$ 10 pts each.

### 1.5 Related courses
Rule-based NLP, Deep NLP, Deep Learning (general).  
Information Retrieval and Speech Recognition are related but not the focus here.
<br />

---

## 2. Perspectives on text & AI
- Interpretation depends on context, missing words, and bias (Carson, Orwell, Richelieu).  
- Human–machine communication often simplified for machines (short queries, SEO tags).  
- Scale helps but long-tail failures persist. Responsibility and rigor are essential.

### 2.1 Classic thought experiments
**Turing Test:** if judges cannot reliably tell human from machine in conversation, the machine passes.  
**Chinese Room (Searle):** passing conversation does not imply understanding.

### 2.2 Modern chatbots and LLMs
Many competing models exist (OpenAI, Google, Meta, Anthropic). This course emphasizes shared foundations, not any one vendor.

### 2.3 Compression and “understanding”
**Hutter Prize:** better text compression often implies better modeling of structure, hence progress in understanding.
<br />

---

## 3. English & linguistic variability
Parts of speech, morphology, syntax, semantics, pragmatics.  
Language evolves: spelling, grammar, meanings shift (e.g., *nice*, *fantastic*, *meat*, *guy*).  
Focus is on English, but many techniques generalize.
<br />

---

## 4. Probability essentials

Let random variables be uppercase ($X, Y$), values lowercase.

- Probability (discrete): $0 \leq P(x) \leq 1$, $\sum_x P(x) = 1$  
- Density (continuous): $p(x) \geq 0$, $\int p(x) dx = 1$  
- Joint: $P(x, y)$  
- Marginal: $P(y) = \sum_x P(x, y)$ or $P(y) = \int p(x, y) dx$  
- Conditional: $P(y \mid x) = \dfrac{P(x, y)}{P(x)}$  
- Chain rule:  
  $$P(a,\dots,z) = P(a\mid\dots,z) \cdot P(b\mid\dots,z) \cdots P(y \mid z)\cdot P(z)$$  
- Bayes’ rule:  
  $$P(y \mid x) = \dfrac{P(x \mid y) P(y)}{P(x)}$$  

**Example:** if $X =$ morning weather and $Y =$ evening weather,  
$$P(Y=\text{rain} \mid X=\text{sun}) = \dfrac{P(X=\text{sun}, Y=\text{rain})}{P(X=\text{sun})}$$
<br />

---

## 5. Machine learning essentials

### 5.1 Data
Observations with features (bag-of-words, embeddings). Train/test split, cross-validation.  
Structure: sequences, hierarchies, multiple corpora.

### 5.2 Tasks
**Supervised:** classification, regression.  
**Unsupervised:** clustering, topic modeling, visualization.

### 5.3 Evaluation
- Regression: $$MSE = \frac{1}{N} \sum_i (y_i - \hat y_i)^2$$  
- Classification: $$\text{Error rate} = \frac{1}{N} \sum_i 1(\hat y_i \neq y_i)$$  

### 5.4 Optimization
Gradient ascent/descent:  
$$u \leftarrow u \pm \eta \nabla_u L$$  
Algorithms: SGD, momentum, Adam, LBFGS.

### 5.5 Probabilistic modeling
- Maximum likelihood: $$\hat \theta = \arg\max_\theta P(D \mid \theta)$$  
- MAP: $$\hat \theta = \arg\max_\theta P(D \mid \theta) P(\theta)$$  
- Posterior sampling: draw $\theta^{(s)} \sim P(\theta \mid D)$ via MCMC (Metropolis–Hastings, Gibbs).
<br />

---

## 6. From text to numbers
Processing: normalization → tokenization → lemmatization/stemming → collocations → features.  
Representations: bag-of-words, TF-IDF, embeddings.  
Models: n-grams, topic models, HMMs, PCFGs, clustering, visualization. Neural embeddings and transformers later.
<br />

---

## 7. Practical toolkit

### 7.1 Environment
Python $\geq$ 3.9 recommended. Anaconda suggested for packages. Spyder IDE resembles Matlab. Any IDE is fine.

### 7.2 Installing packages
**pip:**  
```bash
python -m pip install nltk numpy pandas matplotlib scikit-learn beautifulsoup4 scrapy
```  
**conda:**  
```bash
conda install nltk numpy pandas matplotlib scikit-learn
conda install -c conda-forge beautifulsoup4 scrapy
```

### 7.3 Using NLTK resources
```python
import nltk
nltk.download("punkt")
nltk.download("wordnet")
nltk.download("averaged_perceptron_tagger")
nltk.download("stopwords")
```

### 7.4 Common libraries
Core: `os`, `pickle`, `math`, `statistics`, `random`, `datetime`, `gzip`  
Numerical: `numpy`, `scipy`  
Data: `pandas`, `csv`  
Plotting: `matplotlib`  
Web: `scrapy`, `beautifulsoup4`  
NLP: `nltk`  
Deep learning (later): `torch`, `tensorflow`, `keras`
<br />

---

## 8. Python quick reference

**Arithmetic:** `+ - * / % **`  
**Variables:** int, float, string, bool  
**Inspect:** `dir()`, `type(x)`, `help(obj)`  
**Control flow:**  
```python
if cond: ...
elif cond2: ...
else: ...

for i in range(n): ...
while cond: ...
```
**Data structures:**  
Tuple `(1,2,"apple")` immutable  
List `[1,2,3]` mutable  
Dict `{"name":"A Beautiful Mind","year":2001}`  
NumPy array `np.array([[1,2,3],[4,5,6]])`
<br />

---

## 9. Study guidance
Do exercises on time. Use Moodle discussions. Keep a clean repo with raw data, notebooks, code, and reports. Exercises are preparation for the exam.
<br />

---

## 10. What’s next
Next: hands-on text preprocessing, distributions, collocations, vector spaces, clustering, n-gram models, later topic and sequence models.
<br />

---

## 11. Exercise 1.3 — Chain rule of probabilities: full derivation

A sequence of random variables $w_1,\dots,w_N$.  For each position $i$ define the left context $Left_i=[w_1,\dots,w_{i-1}]$,
and the right context $Right_i=[w_{i+1},\dots,w_N]$.  
Empty context reduces conditionals to marginals. For convenience set $p(\emptyset)=1$.

We must prove

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}=1.
$$

---

### Proof A: both products equal the same joint probability

1. Chain rule in forward order gives  

$$
p(w_1,\dots,w_N)
= p(w_1)\,p(w_2\mid w_1)\,p(w_3\mid w_1,w_2)\cdots p(w_N\mid w_1,\dots,w_{N-1})
= \prod_{i=1}^{N} p\!\left(w_i\mid Left_i\right).
$$

2. Chain rule in reverse order gives  

$$
p(w_1,\dots,w_N)
= p(w_N)\,p(w_{N-1}\mid w_N)\,p(w_{N-2}\mid w_{N-1},w_N)\cdots p(w_1\mid w_2,\dots,w_N)
= \prod_{i=1}^{N} p\!\left(w_i\mid Right_i\right).
$$

3. Taking the ratio,  

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)} = 1.
$$

---

### Proof B: telescoping via Bayes

For the left context,  

$$
p(w_i\mid Left_i) = \frac{p(w_i,Left_i)}{p(Left_i)}
= \frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}.
$$

For the right context, define $R_i=(w_i,\dots,w_N)$ and note $Right_i=R_{i+1}$. Then  

$$
p(w_i\mid Right_i) = \frac{p(w_i,Right_i)}{p(Right_i)}
= \frac{p(R_i)}{p(R_{i+1})}
= \frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}.
$$

Hence each ratio equals  

$$
\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{\displaystyle \frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}}
{\displaystyle \frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}}
= \frac{p(w_1,\dots,w_i)\,p(w_{i+1},\dots,w_N)}
{p(w_1,\dots,w_{i-1})\,p(w_i,\dots,w_N)}.
$$

Multiply from $i=1$ to $N$:  

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{\displaystyle
\prod_{i=1}^{N} p(w_1,\dots,w_i)\;\prod_{i=1}^{N} p(w_{i+1},\dots,w_N)}
{\displaystyle
\prod_{i=1}^{N} p(w_1,\dots,w_{i-1})\;\prod_{i=1}^{N} p(w_i,\dots,w_N)}.
$$

Both big products telescope. Using $p(w_1,\dots,w_0)=p(\emptyset)=1$ and $p(w_{N+1},\dots,w_N)=p(\emptyset)=1$, we obtain  

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_N)}{1}\cdot\frac{1}{p(w_1,\dots,w_N)}=1.
$$

Both derivations complete the proof.
<br />

---

## 12. Slide recap and concepts

![Board notes](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_1/1.png)

### 12.1 Concepts illustrated on the slide

Sum or integral over the set of possibilities equals one:
$$
\sum_k p(x=k)=1 \qquad \int p(y)\,dy=1
$$

Marginalization removes variables you do not condition on:
$$
\sum_k p(x=k,y) = p(y)
$$

Conditional probability links joint and marginal:
$$
p(y\mid x) = \frac{p(y,x)}{p(x)}
$$

Chain rule expands a joint into a product of conditionals:
$$
p(a,b,c,\dots,y,z)=p(a\mid b,c,\dots,y,z)\,p(b\mid c,\dots,y,z)\cdots p(y\mid z)\,p(z)
$$

Bayes’ rule swaps conditioning:
$$
p(y\mid x)=\frac{p(x\mid y)\,p(y)}{p(x)}
$$

### 12.2 How these concepts drive Exercise 1.3

The product $\prod_{i=1}^{N} p(w_i\mid Left_i)$ is exactly the chain-rule factorization of the joint $p(w_1,\dots,w_N)$ in forward order, while $\prod_{i=1}^{N} p(w_i\mid Right_i)$ is the reverse-order factorization of the same joint. Taking their ratio cancels the joint and yields $1$, which is the statement we proved in Section 11.
<br />

---

## Appendix A — Key formulas

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

