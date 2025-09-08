---
title: "Statistiska metoder för textdataanalys_1"
subtitle: "Lecture 1 (September 2, 2025): Introduction and preliminaries"
date: 2025-09-04
lang: sv
excerpt: "Kursöversikt, praktiska saker, varför textanalys är viktigt, sannolikhets- och ML-grunder samt Python/NLP-verktygslådan."
tags: ["Jaakko Peltonen","Statistical Methods for Text Data Analysis","Chain rule"]
draft: false 
---

##  Introduktion & grunder

**Kursmål:** Lära oss representera, modellera och analysera text med statistiska metoder. Först bygga en solid grund, senare koppla till modern deep NLP (embeddingar, transformer).  
**Varför det är viktigt:** Text finns överallt (nyheter, recensioner, sociala medier, lagar, vetenskap, transkript…). Statistiska metoder hjälper hantera brus, skala bortom manuell läsning och stödja evidensbaserade slutsatser.  
**Lärandemål:** Bekanta oss med viktiga representationer (vektorrumsmodeller, neurala embeddingar), pipelines (tokenisering → lemmatisering → features), och modeller (n-gram, topic models, HMM, PCFG). Kunna själv tillämpa kärntekniker.  
<br />

---

## 1. Praktiskt & deltagande

### 1.1 Föreläsningar
**Denna vecka:** på plats.  
**Kommande veckor:** via Zoom (p.g.a. resa). Länkar på Moodle.  
**Inspelningar:** laddas upp efter varje föreläsning (lätt editerade). Bra för repetition, men live är bäst.

### 1.2 Interaktivitet
Fråga under föreläsning när nåt är oklart. Använd Moodle-diskussion så alla får nytta av svaren (men uppgifterna ska du göra själv).

### 1.3 Material & övningar
Slides finns på Moodle. Övningar publicerade (PDF + inlämning).  
Deadline ≈ 2 veckor. Sena inlämningar kan ge minuspoäng eller nekas.  
**Tips:** Jupyter Notebooks går bra men kan bli röriga. Lämna också en ren PDF och gärna en separat `.py`.

### 1.4 Bedömning & betyg
**Tentamen:** efter sista föreläsningen, troligen i slutet av december. Omtentor på våren och sommaren.  
**Viktning:** slutbetyg = $0.65 \times$ tentamen $+ 0.35 \times$ övningar.  
**Gränser:** godkänt runt 40 poäng, toppbetyg nära 57 i övningar. Tentamen: 5 problem × 10 poäng.

### 1.5 Relaterade kurser
Rule-based NLP, Deep NLP, Deep Learning.  
Informationssökning och taligenkänning är relaterade men inte i fokus.  
<br />

---

## 2. Text & AI

- Tolkning beror på kontext, saknade ord och bias (Carson, Orwell, Richelieu).  
- Människa–maskin-kommunikation förenklas ofta (korta queries, SEO-taggar).  
- Skala hjälper men long-tail-problem kvarstår. Ansvar och noggrannhet är viktiga.

### 2.1 Klassiska tankeexperiment
**Turing-testet:** om domare inte kan skilja människa från maskin i samtal, maskinen “klarar testet”.  
**Kinesiska rummet (Searle):** klara samtal ≠ förståelse.

### 2.2 Moderna chatbots och LLM
Många modeller (OpenAI, Google, Meta, Anthropic). Kursen fokuserar på gemensamma grunder.

### 2.3 Kompression & “förståelse”
**Hutter Prize:** bättre kompression = bättre modellering = framsteg i förståelse.  
<br />

---

## 3. Engelska & språklig variation

Ordklasser, morfologi, syntax, semantik, pragmatik.  
Språk förändras: stavning, grammatik, betydelser (t.ex. *nice*, *fantastic*, *meat*, *guy*).  
Fokus på engelska, men tekniker generaliseras.  
<br />

---

## 4. Sannolikhetsgrunder

Slumpvariabler med versaler ($X,Y$), värden med gemener.

- Diskret: $0 \leq P(x)\leq 1$, $\sum_x P(x)=1$  
- Kontinuerlig: $p(x)\geq0$, $\int p(x)\,dx=1$  
- Gemensam: $P(x,y)$  
- Marginal: $P(y)=\sum_x P(x,y)$ eller $P(y)=\int p(x,y)\,dx$  
- Villkorlig: $P(y\mid x)=\dfrac{P(x,y)}{P(x)}$  
- Kedjeregeln:  
  $$P(a,\dots,z)=P(a\mid\dots,z)\cdot P(b\mid\dots,z)\cdots P(y\mid z)\cdot P(z)$$  
- Bayes:  
  $$P(y\mid x)=\dfrac{P(x\mid y)P(y)}{P(x)}$$  

**Exempel:** om $X=$ morgonväder, $Y=$ kvällsväder,  
$$P(Y=\text{rain}\mid X=\text{sun})=\dfrac{P(X=\text{sun},Y=\text{rain})}{P(X=\text{sun})}$$  
<br />

---

## 5. Maskininlärningens grunder

### 5.1 Data
Observationer + features (bag-of-words, embeddingar). Train/test-split, cross-validation.  
Struktur: sekvenser, hierarkier, flera korpusar.

### 5.2 Uppgifter
**Supervised:** klassificering, regression.  
**Unsupervised:** klustring, topic modeling, visualisering.

### 5.3 Utvärdering
- Regression: $$MSE=\frac{1}{N}\sum_i(y_i-\hat y_i)^2$$  
- Klassificering: $$\text{Error rate}=\frac{1}{N}\sum_i1(\hat y_i\neq y_i)$$  

### 5.4 Optimering
Gradient upp/ner:  
$$u \leftarrow u \pm \eta \nabla_u L$$  
Algoritmer: SGD, momentum, Adam, LBFGS.

### 5.5 Probabilistisk modellering
- Maximum likelihood: $$\hat\theta=\arg\max_\theta P(D\mid\theta)$$  
- MAP: $$\hat\theta=\arg\max_\theta P(D\mid\theta)P(\theta)$$  
- Posterior sampling: $\theta^{(s)}\sim P(\theta\mid D)$ via MCMC (MH, Gibbs).  
<br />

---

## 6. Från text till siffror

Process: normalisering → tokenisering → lemmatisering/stemming → kollokationer → features.  
Representationer: bag-of-words, TF-IDF, embeddingar.  
Modeller: n-gram, topic models, HMM, PCFG, klustring, visualisering. Senare neurala embeddingar och transformer.  
<br />

---

## 7. Verktygslåda

### 7.1 Miljö
Python ≥ 3.9 rekommenderas. Anaconda för paket. Spyder liknar Matlab. Vilken IDE som helst funkar.

### 7.2 Installera paket
**pip:**  
```bash
    python -m pip install nltk numpy pandas matplotlib scikit-learn beautifulsoup4 scrapy
```
**conda:**  
```bash
    conda install nltk numpy pandas matplotlib scikit-learn
    conda install -c conda-forge beautifulsoup4 scrapy
```
### 7.3 Använda NLTK-resurser  
```bash
    import nltk
    nltk.download("punkt")
    nltk.download("wordnet")
    nltk.download("averaged_perceptron_tagger")
    nltk.download("stopwords")
```
### 7.4 Vanliga bibliotek
Kärna: os, pickle, math, statistics, random, datetime, gzip  
Numeriskt: numpy, scipy  
Data: pandas, csv  
Plot: matplotlib  
Webb: scrapy, beautifulsoup4  
NLP: nltk  
Deep learning senare: torch, tensorflow, keras  
<br />
---

## 8. Python-snabbguide
```bash
**Aritmetik:** `+ - * / % **`  
**Variabler:** int, float, string, bool  
**Inspektera:** `dir()`, `type(x)`, `help(obj)`  
**Styrflöde:**  

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
**Datastrukturer:**  
Tuple `(1,2,"äpple")` (oföränderlig)  
List `[1,2,3]` (föränderlig)  
Dict `{"namn":"A Beautiful Mind","år":2001}`  
NumPy array `np.array([[1,2,3],[4,5,6]])`  
<br />

---

## 9. Studietips

Gör övningarna i tid. Använd Moodle-diskussionerna. Håll ett rent repo: rådata, notebooks, kod och rapporter separat. Övningarna är bästa förberedelse för tentan.  
<br />

---

## 10. Vad händer nästa gång

Nästa gång: praktisk textförbehandling, distributioner, kollokationer, vektorrum, klustring, n-gram-modeller; senare topic models och sekvensmodeller.  
<br />

---

## 11. Övning 1.3 — Kedjeregeln: fullständig härledning

En sekvens slumpvariabler $w_1,\dots,w_N$. För varje position $i$:  
vänster kontext $Left_i=[w_1,\dots,w_{i-1}]$, höger kontext $Right_i=[w_{i+1},\dots,w_N]$.  
Tom kontext reduceras till marginal. Sätt $p(\emptyset)=1$.

Vi vill visa:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}=1.
$$

---

### Bevis A: båda produkterna = samma joint

1. Framåt:

$$
p(w_1,\dots,w_N)
= p(w_1)\,p(w_2\mid w_1)\cdots p(w_N\mid w_1,\dots,w_{N-1})
= \prod_{i=1}^{N} p(w_i\mid Left_i).
$$

2. Bakåt:

$$
p(w_1,\dots,w_N)
= p(w_N)\,p(w_{N-1}\mid w_N)\cdots p(w_1\mid w_2,\dots,w_N)
= \prod_{i=1}^{N} p(w_i\mid Right_i).
$$

3. Kvoten:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)}=1.
$$

---

### Bevis B: teleskop via Bayes

För vänster kontext:

$$
p(w_i\mid Left_i)=\frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}.
$$

För höger kontext, låt $R_i=(w_i,\dots,w_N)$, och $Right_i=R_{i+1}$:

$$
p(w_i\mid Right_i)=\frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}.
$$

Alltså:

$$
\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_i)\,p(w_{i+1},\dots,w_N)}
{p(w_1,\dots,w_{i-1})\,p(w_i,\dots,w_N)}.
$$

Multiplicera $i=1\dots N$:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{\prod_{i=1}^{N}p(w_1,\dots,w_i)\;\prod_{i=1}^{N}p(w_{i+1},\dots,w_N)}
{\prod_{i=1}^{N}p(w_1,\dots,w_{i-1})\;\prod_{i=1}^{N}p(w_i,\dots,w_N)}.
$$

Produkterna teleskoperar. Eftersom $p(\emptyset)=1$ får vi:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)}=1.
$$

Bevis klart.  
<br />

---

## 12. Slides-recap & koncept

![Board notes](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_1/1.png)

### 12.1 Koncept

Summan eller integralen = 1:

$$
\sum_k p(x=k)=1 \qquad \int p(y)\,dy=1
$$

Marginalisering:

$$
\sum_k p(x=k,y)=p(y)
$$

Villkorlig sannolikhet:

$$
p(y\mid x)=\frac{p(y,x)}{p(x)}
$$

Kedjeregel:

$$
p(a,b,c,\dots,y,z)=p(a\mid b,\dots,y,z)\,p(b\mid c,\dots,y,z)\cdots p(y\mid z)\,p(z)
$$

Bayes:

$$
p(y\mid x)=\frac{p(x\mid y)p(y)}{p(x)}
$$

### 12.2 Kopplingen till övning 1.3

$\prod_{i=1}^{N}p(w_i\mid Left_i)$ = kedjeregel framåt,  
$\prod_{i=1}^{N}p(w_i\mid Right_i)$ = kedjeregel bakåt.  
Kvoten blir 1, precis som vi visade.  
<br />

---

## Appendix A — Viktiga formler

$$P(y)=\sum_x P(x,y)$$  
$$P(y\mid x)=\frac{P(x,y)}{P(x)}$$  
$$P(a,\dots,z)=P(a\mid\dots,z)\cdot\dots\cdot P(y\mid z)\cdot P(z)$$  
$$P(y\mid x)=\frac{P(x\mid y)P(y)}{P(x)}$$  

$$MSE=\frac{1}{N}\sum_i(y_i-\hat y_i)^2$$  
$$\text{Error rate}=\frac{1}{N}\sum_i1(\hat y_i\neq y_i)$$  

$$u\leftarrow u+\eta\nabla_u L\quad(\text{max})$$  
$$u\leftarrow u-\eta\nabla_u L\quad(\text{min})$$  

$$\hat\theta_{MLE}=\arg\max_\theta P(D\mid\theta)$$  
$$\hat\theta_{MAP}=\arg\max_\theta P(D\mid\theta)P(\theta)$$  
