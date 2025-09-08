---
title: "ML_2: Lineær regresjon_(2nd note）"
subtitle: "Lineær modell → residual → kvadratfeil → MSE → ∂L/∂a=0, ∂L/∂b=0 → normallikninger → lukket form for a, b"
date: 2025-09-01
lang: no
excerpt: "Fra to datapunkter til normallikninger; løs ut a og b; utvid til flere innganger (ŷ = A w)."
tags: [Joni Kämäräinen, machine-learning, linear-regression, calculus, least-squares]
draft: false
---

## Utledning av a & b for en lineær modell med minste kvadraters metode, fra grunnen av

## 1) Hva er oppgaven?

Gitt **N** treningsprøver $(x_1,y_1), (x_2,y_2), \ldots, (x_N,y_N)$: deriver **lukket-form**-løsninger for $a$ og $b$ i den lineære modellen
$$
\hat y \;=\; a x + b
$$
ved å minimere middelkvadratfeilen
$$
L_{\text{MSE}}(a,b)
=\frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2.
$$
---

## 2) Hva gikk foreleseren gjennom?

### 2.1 Residual  
For en enkelt prøve er **residualen** gapet mellom sann verdi og prediksjon:  
$$
e_i = y_i - \hat{y}_i, \qquad \hat{y}_i = a x_i + b .
$$
<br />

### 2.2 Kvadratfeil (per observasjon)  
Kvadratfeilet er kvadratet av (Observert − Predikert) for hvert datapunkt:
$$
e_i^{2} = \big(y_i - \hat{y}_i\big)^2 .
$$
<br />

### 2.3 Middelkvadratfeil (MSE)  
MSE måler modellens gjennomsnittlige kvadrerte avvik mellom prediksjon og sannhet:
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2 .
$$
<br />

### 2.4 Metoden minste kvadrater (Least Squares)

Minste kvadrater finner den best tilpassede linjen/kurven ved å **minimere summen av residualenes kvadrater**:

$$
\min_{a,b}\; \frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2
$$

- $\boldsymbol{N}$: totalt antall prøver  
- $\boldsymbol{y}_i$: observert verdi (data)  
- $\hat{\boldsymbol{y}}_i = a x_i + b$: predikert verdi (modellutdata)  
- $\boldsymbol{y}_i - \hat{\boldsymbol{y}}_i$: residual (feil for prøve $i$)  
- $\boldsymbol{\sum}$: sum over alle prøver ($i=1\ldots \boldsymbol{N}$)  
- $\tfrac{1}{\boldsymbol{N}}$: gjennomsnitt over prøvene

Målet i maskinlæring her er å <span class="hl-marker">finne paret (a, b) som minimerer MSE</span>.

<br />


### 2.5 Hvordan finner vi (a, b) som minimerer MSE?

**Løsning:** brute force (rutenettsøk).

Vi prøver mange $(a,b)$-par på et rutegitter, beregner tapet  
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2,
$$
og beholder det beste paret.

- **a** fra **-100 : 1 : +100**  
- **b** fra **-100 : 1 : +100**  
- Beregn $L_{\text{MSE}}(a,b)$  
- Om lavere → oppdater beste $(a,b)$

På tavlen betydde “-100 : 1 : +100” **start ved -100, steg 1, slutt ved +100**.

Dette enkle søket viser idéen: **vi søker i parameterrommet etter $(a,b)$ som gir minst MSE** (senere erstatter vi dette med lukket form eller gradientmetoder).

<br />

### 2.6 Finn minimum av $L_{\text{MSE}}$

Vi vil minimere $L_{\text{MSE}}(a,b)$.

I et minimum er den deriverte (hellingen) null; altså

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0.
$$

$L_{\text{MSE}}$ har to inndata: $a$ (helning) og $b$ (skjæring).

Ekvivalent er gradienten null:

$$
\nabla L_{\text{MSE}}(a,b)
=\left(\frac{\partial L_{\text{MSE}}}{\partial a},\ \frac{\partial L_{\text{MSE}}}{\partial b}\right)
=(0,0).
$$

**Tolkning av de partielle derivertene**
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial a}$: hvordan tapet endres med helningen $a$  
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial b}$: hvordan tapet endres med skjæringen $b$

Tenk på $L_{\text{MSE}}(a,b)$ som en “bolle”: i bunnen er hellingen i alle retninger 0 — der ligger beste $(a,b)$.

Sett gradienten lik null for den optimale løsningen; der er $L_{\text{MSE}}$ minst.

<br />



### 2.7 Kjederegelen (som vi bruker ved derivasjon)
Hvis en funksjon er sammensatt $f(g(x))$, gjelder **kjederegelen**:
$$
\frac{d}{dx} \, f\!\big(g(x)\big) \;=\; f'\!\big(g(x)\big)\cdot g'(x).
$$
Vi bruker denne regelen når vi deriverer det kvadrerte residualet inne i MSE mht. \(a\) og \(b\) i neste avsnitt.

<br />

---
## 3) Gradient av MSE — steg-for-steg-herledning

Data: $N$ prøver $(x_i,y_i)$.

- Lineær modell  
  $$
  \hat y_i = a\,x_i + b
  $$

- Residual  
  $$
  r_i = y_i - \hat y_i = y_i - (a x_i + b)
  $$

- Kvadratfeil (per observasjon)  
  $$
  r_i^2
  $$

- Middelkvadratfeil (MSE)  
  $$
  L(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2
  $$

Mål (minste kvadrater): velg $(a,b)$ som **minimerer** $L(a,b)$.

---

## 4) Minimumsprinsipp

I et minimum av $L$,
$$
\frac{\partial L}{\partial a}=0,
\qquad
\frac{\partial L}{\partial b}=0 .
$$

Vi bruker kjederegelen:
$$
\frac{d}{dz}f(g(z)) = f'(g(z))\,g'(z).
$$

---

## 5) Ta den partielle mht. \(a\) — ingen steg hoppet over

Start:
$$
\frac{\partial L}{\partial a}
= \frac{1}{N}\sum_{i=1}^{N}\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2 .
$$

Kjederegel ledd-for-ledd:
- ytre $f(u)=u^2 \Rightarrow f'(u)=2u$
- indre $g(a)=y_i-(a x_i+b) \Rightarrow g'(a)=-x_i$

Dermed
$$
\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2
=2\big(y_i-(a x_i+b)\big)(-x_i),
$$
og
$$
\frac{\partial L}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-x_i).
$$

Sett lik $0$ og fjern konstanten $2/N$:
$$
\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)(-x_i)=0 .
$$

Distribuer $-x_i$:
$$
\sum_{i=1}^{N}\big(-x_i y_i + a x_i^2 + b x_i\big)=0 .
$$

Grupper like ledd (før summen inn i symbolene):
$$
a\sum_{i=1}^{N}x_i^2 + b\sum_{i=1}^{N}x_i - \sum_{i=1}^{N}x_i y_i = 0 .
$$

Omarranger (dette er første normallikning):
$$
\boxed{\,a\sum x_i^2 + b\sum x_i = \sum x_i y_i \,}\tag{A}
$$

Isoler også $a$ (for senere innsetting):
$$
a=\frac{\sum x_i y_i - b\sum x_i}{\sum x_i^2}. \tag{A1}
$$

---

## 6) Ta den partielle mht. \(b\)

Tilsvarende:
$$
\frac{\partial}{\partial b}\Big(y_i-(a x_i+b)\Big)=-1,
$$
så
$$
\frac{\partial L}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-1).
$$

Sett lik $0$ og ta bort $2/N$:
$$
\sum_{i=1}^{N}(-y_i + a x_i + b)=0 .
$$

Samle ledd (andre normallikning):
$$
\boxed{\,a\sum x_i + bN = \sum y_i \,}\tag{B}
$$

Isoler også $b$:
$$
b=\frac{\sum y_i - a\sum x_i}{N}. \tag{B1}
$$

---

## 7) Løs ved innsetting — hvert algebratrinn skrevet ut

### 7.1 Løs ut \(a\) med felles nevner

Start fra (A1) og sett inn $b$ fra (B1):
$$
a=\frac{\sum x_i y_i - \Big(\frac{\sum y_i - a\sum x_i}{N}\Big)\sum x_i}{\sum x_i^2}.
$$

Utvid telleren:
$$
\sum x_i y_i \;-\; \frac{(\sum x_i)(\sum y_i)}{N} \;+\; a\,\frac{(\sum x_i)^2}{N}.
$$

Del leddvis på $\sum x_i^2$:
$$
a=\frac{\sum x_i y_i}{\sum x_i^2}
\;-\;\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}
\;+\;a\,\frac{(\sum x_i)^2}{N\,\sum x_i^2}. \tag{★}
$$

Flytt $a$-leddet til venstre:
$$
a\Bigg(1-\frac{(\sum x_i)^2}{N\,\sum x_i^2}\Bigg)
=\frac{\sum x_i y_i}{\sum x_i^2}
-\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Skriv venstresiden over en nevner:
$$
a\,\frac{N\sum x_i^2-(\sum x_i)^2}{N\,\sum x_i^2}
=\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Kanseller like nevnere:
$$
a\big(N\sum x_i^2-(\sum x_i)^2\big)
= N\sum x_i y_i-(\sum x_i)(\sum y_i).
$$

Så
$$
\boxed{\,a=\dfrac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}\,}. \tag{C}
$$

### 7.2 Løs ut \(b\) med samme nevner (ingen snarveier)

Start fra (B1):
$$
b=\frac{\sum y_i}{N} - a\,\frac{\sum x_i}{N}.
$$

Sett inn $a$ fra (C):
$$
b=\frac{\sum y_i}{N}
-\frac{\sum x_i}{N}\cdot
\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\sum x_i^2-(\sum x_i)^2}.
$$

Lag felles nevner $N\big(N\sum x_i^2-(\sum x_i)^2\big)$:
$$
b=\frac{(\sum y_i)\big(N\sum x_i^2-(\sum x_i)^2\big)
-(\sum x_i)\big(N\sum x_i y_i-(\sum x_i)(\sum y_i)\big)}
{\,N\big(N\sum x_i^2-(\sum x_i)^2\big)} .
$$

Utvid telleren helt:
$$
\underbrace{N(\sum y_i)(\sum x_i^2)}_{\text{ledd 1}}
-\underbrace{(\sum y_i)(\sum x_i)^2}_{\text{ledd 2}}
-\underbrace{N(\sum x_i)(\sum x_i y_i)}_{\text{ledd 3}}
+\underbrace{(\sum x_i)^2(\sum y_i)}_{\text{ledd 4}} .
$$

**Ledd 2** og **ledd 4** er like med motsatt fortegn og kansellerer. Del teller og nevner med $N$:
$$
b=\frac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}.
$$

Dermed
$$
\boxed{\,b=\dfrac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}
\;=\; \bar y - a\,\bar x\,}, \qquad
\bar x=\frac{1}{N}\sum x_i,\ \bar y=\frac{1}{N}\sum y_i .
$$

> Hvis alle $x_i$ er like, så er $N\sum x_i^2-(\sum x_i)^2=0$: helningen kan ikke identifiseres (ingen variasjon i $x$).

---

## 8) (Valgfritt) kovariansform

$$
a=\frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2}
=\frac{\mathrm{Cov}(x,y)}{\mathrm{Var}(x)},
\qquad
b=\bar y - a\,\bar x .
$$

---

## 9) Liten numerisk sjekk

Data: $(0,1),(1,3),(2,5),(3,7)$ (sann linje $y=2x+1$).  
Summer: $\sum x=6,\ \sum y=16,\ \sum x^2=14,\ \sum xy=34,\ N=4$.

Beregn
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}
=\frac{136-96}{56-36}=\frac{40}{20}=2,
\qquad
b=\frac{16-2\cdot6}{4}=1.
$$

Residualene er null $\Rightarrow$ $\text{MSE}=0$.
