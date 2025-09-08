---
title: "Statistiske metoder for tekstanalyse_1"
subtitle: "(2. september 2025): Introduksjon og grunnleggende 😊"
date: 2025-09-04
lang: no
excerpt: "Kursoverblikk, praktisk info, hvorfor tekstanalyse er viktig, nøkkelbegreper i sannsynlighet og maskinlæring, samt Python/NLP-verktøykassen."
tags: ["Jaakko Peltonen","Statistical Methods for Text Data Analysis","Chain rule"]
draft: false 
---

##  Introduksjon & grunnleggende

**Mål med kurset:** Lære å representere, modellere og analysere tekst med statistiske metoder. Først bygge et solid fundament, senere koble til moderne deep NLP (embeddingar, transformer).  
**Hvorfor det er viktig:** Tekst er overalt (nyheter, anmeldelser, sosiale medier, jus, vitenskap, transkripter…). Statistiske metoder hjelper oss å håndtere støy, skalere utover manuell lesing, og trekke evidensbaserte konklusjoner.  
**Læringsutbytte:** Kjennskap til representasjoner (vektorrommodeller, nevrale embeddingar), pipelines (tokenisering → lemmatisering → features), og modeller (n-grammer, topic models, HMM, PCFG). Evne til å anvende kjerneteknikkene selv.  
<br />

---

## 1. Praktisk info & deltakelse

### 1.1 Forelesninger
**Denne uka:** på campus.  
**Neste uker:** online via Zoom (på grunn av reise). Lenker legges i Moodle.  
**Opptak:** lastes opp kort tid etter hver forelesning (litt redigert). Bra til repetisjon, men anbefalt å være med live.

### 1.2 Interaktivitet
Still spørsmål underveis. Bruk Moodle-diskusjon slik at alle får glede av svarene (men gjør oppgavene selv).

### 1.3 Materialer & øvinger
Slides i Moodle. Øvinger allerede publisert (PDF + innlevering).  
Vanlig deadline ≈ 2 uker. Sen innlevering kan gi trekk eller avvises.  
**Tips:** Jupyter Notebooks er greit, men kan bli rotete. Legg også ved en ren PDF og helst en `.py`-fil.

### 1.4 Vurdering & karakter
**Eksamen:** etter siste forelesning, trolig i slutten av desember. Kontinuasjon på våren og sommeren.  
**Vekting:** sluttkarakter = $0.65 \times$ eksamen $+ 0.35 \times$ øvinger.  
**Grenser:** bestått rundt 40 poeng, toppkarakter nær 57 i øvingene. Eksamen: 5 oppgaver × 10 poeng.

### 1.5 Relaterte kurs
Rule-based NLP, Deep NLP, Deep Learning.  
Informasjonsgjenfinning og talegjenkjenning er relevante men ikke fokus her.  
<br />

---

## 2. Tekst & kunstig intelligens

- Tolkning avhenger av kontekst, manglende ord og bias (Carson, Orwell, Richelieu).  
- Menneske–maskin-kommunikasjon ofte forenklet (korte søk, SEO-tagger).  
- Skala hjelper, men long-tail-problemer vedvarer. Ansvar og nøyaktighet er essensielt.

### 2.1 Klassiske tankeeksperimenter
**Turing-testen:** hvis dommere ikke kan skille menneske fra maskin i samtale, har maskinen “klart det”.  
**Det kinesiske rom (Searle):** å klare samtale betyr ikke forståelse.

### 2.2 Moderne chatboter og LLM
Mange modeller (OpenAI, Google, Meta, Anthropic). Kurset vektlegger felles grunnlag.

### 2.3 Komprimering & “forståelse”
**Hutter Prize:** bedre komprimering → bedre modellering → framgang i forståelse.  
<br />

---

## 3. Engelsk & språklig variasjon

Ordklasser, morfologi, syntaks, semantikk, pragmatikk.  
Språk endrer seg: stavemåte, grammatikk, betydninger (f.eks. *nice*, *fantastic*, *meat*, *guy*).  
Fokus er på engelsk, men teknikkene generaliseres.  
<br />

---

## 4. Grunnleggende sannsynlighet

Tilfeldige variabler: store bokstaver ($X,Y$), verdier små bokstaver.

- Diskret: $0 \leq P(x)\leq1$, $\sum_x P(x)=1$  
- Kontinuerlig: $p(x)\geq0$, $\int p(x)\,dx=1$  
- Felles: $P(x,y)$  
- Marginal: $P(y)=\sum_x P(x,y)$ eller $P(y)=\int p(x,y)\,dx$  
- Betinget: $P(y\mid x)=\dfrac{P(x,y)}{P(x)}$  
- Kjederegel:  
  $$P(a,\dots,z)=P(a\mid\dots,z)\cdot P(b\mid\dots,z)\cdots P(y\mid z)\cdot P(z)$$  
- Bayes’ regel:  
  $$P(y\mid x)=\dfrac{P(x\mid y)P(y)}{P(x)}$$  

**Eksempel:** hvis $X=$ morgensvær, $Y=$ kveldsvær,  
$$P(Y=\text{rain}\mid X=\text{sun})=\dfrac{P(X=\text{sun},Y=\text{rain})}{P(X=\text{sun})}$$  
<br />

---

## 5. Grunnleggende maskinlæring

### 5.1 Data
Observasjoner + features (bag-of-words, embeddingar). Train/test-splitt, kryssvalidering.  
Struktur: sekvenser, hierarkier, flere korpus.

### 5.2 Oppgaver
**Supervised:** klassifisering, regresjon.  
**Unsupervised:** klustring, topic modeling, visualisering.

### 5.3 Evaluering
- Regresjon: $$MSE=\frac{1}{N}\sum_i(y_i-\hat y_i)^2$$  
- Klassifisering: $$\text{Feilrate}=\frac{1}{N}\sum_i1(\hat y_i\neq y_i)$$  

### 5.4 Optimalisering
Gradient opp/ned:  
$$u \leftarrow u \pm \eta \nabla_u L$$  
Algoritmer: SGD, momentum, Adam, LBFGS.

### 5.5 Probabilistisk modellering
- Maximum likelihood: $$\hat\theta=\arg\max_\theta P(D\mid\theta)$$  
- MAP: $$\hat\theta=\arg\max_\theta P(D\mid\theta)P(\theta)$$  
- Posterior sampling: $\theta^{(s)}\sim P(\theta\mid D)$ med MCMC (MH, Gibbs).  
<br />

---

## 6. Fra tekst til tall

Prosess: normalisering → tokenisering → lemmatisering/stemming → kollokasjoner → features.  
Representasjoner: bag-of-words, TF-IDF, embeddingar.  
Modeller: n-gram, topic models, HMM, PCFG, klustring, visualisering. Senere nevrale embeddingar og transformer.  
<br />

---

## 7. Verktøykasse

### 7.1 Miljø
Python ≥ 3.9 anbefales. Anaconda for pakker. Spyder ligner Matlab. Hvilken IDE som helst fungerer.

### 7.2 Installere pakker
**pip:**  
```bash
    python -m pip install nltk numpy pandas matplotlib scikit-learn beautifulsoup4 scrapy
```
**conda:**  
```bash
    conda install nltk numpy pandas matplotlib scikit-learn
    conda install -c conda-forge beautifulsoup4 scrapy
```
### 7.3 Bruke NLTK-ressurser  

    import nltk
    nltk.download("punkt")
    nltk.download("wordnet")
    nltk.download("averaged_perceptron_tagger")
    nltk.download("stopwords")

### 7.4 Vanlige biblioteker
Kjerne: os, pickle, math, statistics, random, datetime, gzip  
Numerisk: numpy, scipy  
Data: pandas, csv  
Plott: matplotlib  
Web: scrapy, beautifulsoup4  
NLP: nltk  
Deep learning senere: torch, tensorflow, keras  
<br />
---

## 8. Rask Python-referanse
```bash
**Aritmetikk:** `+ - * / % **`  
**Variabler:** int, float, string, bool  
**Undersøk:** `dir()`, `type(x)`, `help(obj)`  
**Kontrollflyt:**  

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
Tuple `(1,2,"eple")` (immutable)  
Liste `[1,2,3]` (mutable)  
Dict `{"navn":"A Beautiful Mind","år":2001}`  
NumPy array `np.array([[1,2,3],[4,5,6]])`  
<br />

---

## 9. Studietips

Lever øvingene i tide. Bruk Moodle-diskusjonene. Hold et ryddig repo med rådata, notebooks, kode og rapporter. Øvingene er beste trening til eksamen.  
<br />

---

## 10. Hva skjer neste gang

Neste: hands-on tekstforbehandling, fordelinger, kollokasjoner, vektorrom, klustring, n-gram-modeller; senere topic models og sekvensmodeller.  
<br />

---

## 11. Øving 1.3 — Kjederegel: full utledning

En sekvens av tilfeldige variabler $w_1,\dots,w_N$.  
For hver posisjon $i$: venstre kontekst $Left_i=[w_1,\dots,w_{i-1}]$, høyre kontekst $Right_i=[w_{i+1},\dots,w_N]$.  
Tom kontekst = marginal. Sett $p(\emptyset)=1$.

Vi skal vise:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}=1.
$$

---

### Bevis A: begge produkt = samme joint

1. Kjederegel framover:

$$
p(w_1,\dots,w_N)
= p(w_1)\,p(w_2\mid w_1)\cdots p(w_N\mid w_1,\dots,w_{N-1})
= \prod_{i=1}^{N}p(w_i\mid Left_i).
$$

2. Kjederegel bakover:

$$
p(w_1,\dots,w_N)
= p(w_N)\,p(w_{N-1}\mid w_N)\cdots p(w_1\mid w_2,\dots,w_N)
= \prod_{i=1}^{N}p(w_i\mid Right_i).
$$

3. Kvotienten:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)}=1.
$$

---

### Bevis B: teleskop via Bayes

Venstre kontekst:

$$
p(w_i\mid Left_i)=\frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}.
$$

Høyre kontekst, definer $R_i=(w_i,\dots,w_N)$, og $Right_i=R_{i+1}$:

$$
p(w_i\mid Right_i)=\frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}.
$$

Så:

$$
\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_i)\,p(w_{i+1},\dots,w_N)}
{p(w_1,\dots,w_{i-1})\,p(w_i,\dots,w_N)}.
$$

Når vi multipliserer $i=1\dots N$:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{\prod_{i=1}^{N}p(w_1,\dots,w_i)\;\prod_{i=1}^{N}p(w_{i+1},\dots,w_N)}
{\prod_{i=1}^{N}p(w_1,\dots,w_{i-1})\;\prod_{i=1}^{N}p(w_i,\dots,w_N)}.
$$

Telescoping forenkler. Med $p(\emptyset)=1$ får vi:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)}=1.
$$

Q.E.D.  
<br />

---

## 12. Slide-oppsummering & konsepter

![Board notes](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_1/1.png)

### 12.1 Konsepter

Sum eller integral = 1:

$$
\sum_k p(x=k)=1 \qquad \int p(y)\,dy=1
$$

Marginalisering:

$$
\sum_k p(x=k,y)=p(y)
$$

Betinget sannsynlighet:

$$
p(y\mid x)=\frac{p(y,x)}{p(x)}
$$

Kjederegel:

$$
p(a,b,c,\dots,y,z)=p(a\mid b,\dots,y,z)\,p(b\mid c,\dots,y,z)\cdots p(y\mid z)\,p(z)
$$

Bayes:

$$
p(y\mid x)=\frac{p(x\mid y)p(y)}{p(x)}
$$

### 12.2 Kobling til Øving 1.3

$\prod_{i=1}^{N}p(w_i\mid Left_i)$ = framover-faktorisering,  
$\prod_{i=1}^{N}p(w_i\mid Right_i)$ = bakover-faktorisering.  
Kvoten = 1, som vist i kapittel 11.  
<br />

---

## Appendiks A — Viktige formler

$$P(y)=\sum_x P(x,y)$$  
$$P(y\mid x)=\frac{P(x,y)}{P(x)}$$  
$$P(a,\dots,z)=P(a\mid\dots,z)\cdot\dots\cdot P(y\mid z)\cdot P(z)$$  
$$P(y\mid x)=\frac{P(x\mid y)P(y)}{P(x)}$$  

$$MSE=\frac{1}{N}\sum_i(y_i-\hat y_i)^2$$  
$$\text{Feilrate}=\frac{1}{N}\sum_i1(\hat y_i\neq y_i)$$  

$$u\leftarrow u+\eta\nabla_u L\quad(\text{maksimer})$$  
$$u\leftarrow u-\eta\nabla_u L\quad(\text{minimer})$$  

$$\hat\theta_{MLE}=\arg\max_\theta P(D\mid\theta)$$  
$$\hat\theta_{MAP}=\arg\max_\theta P(D\mid\theta)P(\theta)$$  
