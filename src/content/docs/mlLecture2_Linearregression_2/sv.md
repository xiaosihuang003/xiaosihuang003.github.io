---
title: "ML_2: Linjär regression_(2nd note）"
subtitle: "Linjär modell → residual → kvadratfel → MSE → ∂L/∂a=0, ∂L/∂b=0 → normalekvationer → sluten form för a, b"
date: 2025-09-01
lang: sv
excerpt: "Från två provpunkter till normalekvationer; lös ut a och b; utöka till fler indata (ŷ = A w)."
tags: [Joni Kämäräinen, machine-learning, linear-regression, calculus, least-squares]
draft: false
---

## Härledning av a & b för en linjär modell med minsta-kvadrat, från grunden

## 1) Vad är uppgiften?

Givet **N** träningsprov $(x_1,y_1), (x_2,y_2), \ldots, (x_N,y_N)$: härled **slutna** lösningar för $a$ och $b$ i den linjära modellen
$$
\hat y \;=\; a x + b
$$
genom att minimera medelkvadratfelet
$$
L_{\text{MSE}}(a,b)
=\frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2.
$$
---

## 2) Vad gick läraren igenom?

### 2.1 Residual  
För ett enskilt prov är **residualen** skillnaden mellan sanna värdet och prediktionen:  
$$
e_i = y_i - \hat{y}_i, \qquad \hat{y}_i = a x_i + b .
$$
<br />

### 2.2 Kvadratfel (per prov)  
Kvadratfelet är kvadraten av (Observerat − Predikterat) för varje datapunkt:
$$
e_i^{2} = \big(y_i - \hat{y}_i\big)^2 .
$$
<br />

### 2.3 Medelkvadratfel (MSE)  
MSE mäter modellens genomsnittliga kvadrerade fel mellan prediktion och sanning:
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2 .
$$
<br />

### 2.4 Metoden minsta kvadrat (Least Squares)

Minsta kvadrat finner den bäst anpassade linjen/kurvan genom att **minimera summan av residualernas kvadrater**:

$$
\min_{a,b}\; \frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2
$$

- $\boldsymbol{N}$: antal prov  
- $\boldsymbol{y}_i$: observerat värde (data)  
- $\hat{\boldsymbol{y}}_i = a x_i + b$: predikterat värde (modellens utdata)  
- $\boldsymbol{y}_i - \hat{\boldsymbol{y}}_i$: residual (felet för prov $i$)  
- $\boldsymbol{\sum}$: summan över alla prov ($i=1\ldots \boldsymbol{N}$)  
- $\tfrac{1}{\boldsymbol{N}}$: medelvärde över prov

Målet i maskininlärning här är att <span class="hl-marker">hitta paret (a, b) som minimerar MSE</span>.

<br />


### 2.5 Hur hittar vi (a, b) som minimerar MSE?

**Lösning:** brute force (utmattningssökning).

Vi provar många par $(a,b)$ på ett rutnät, beräknar förlusten  
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2,
$$
och behåller det bästa paret.

- **a** från **-100 : 1 : +100**  
- **b** från **-100 : 1 : +100**  
- Beräkna $L_{\text{MSE}}(a,b)$  
- Om lägre → uppdatera bästa $(a,b)$

På tavlan betydde “-100 : 1 : +100” **starta vid -100, steg 1, sluta vid +100**.

Detta enkla sök visar idén: **vi söker i parameterutrymmet efter $(a,b)$ som ger minsta MSE** (senare ersätter vi detta med sluten form eller gradientmetoder).

<br />

### 2.6 Hitta minimipunkten för $L_{\text{MSE}}$

Vi vill minimera $L_{\text{MSE}}(a,b)$.

I en minimipunkt är derivatan (lutningen) noll; alltså

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0.
$$

$L_{\text{MSE}}$ beror på två inparametrar: $a$ (lutning) och $b$ (skärning).

Ekvivalent: gradienten är noll:

$$
\nabla L_{\text{MSE}}(a,b)
=\left(\frac{\partial L_{\text{MSE}}}{\partial a},\ \frac{\partial L_{\text{MSE}}}{\partial b}\right)
=(0,0).
$$

**Tolkning av partialderivatorna**
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial a}$: hur förlusten ändras med lutningen $a$  
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial b}$: hur förlusten ändras med interceptet/skärningen $b$

Tänk $L_{\text{MSE}}(a,b)$ som en “skål”: i botten är alla riktningars lutningar 0 — där ligger bästa $(a,b)$.

Sätt gradienten till noll för den optimala lösningen; där är $L_{\text{MSE}}$ som minst.

<br />



### 2.7 Kedjeregeln (som vi använder vid derivering)
Om en funktion är sammansatt $f(g(x))$ gäller **kedjeregeln**:
$$
\frac{d}{dx} \, f\!\big(g(x)\big) \;=\; f'\!\big(g(x)\big)\cdot g'(x).
$$
Vi använder regeln när vi deriverar det kvadrerade residualet inne i MSE m.a.p. \(a\) och \(b\) i nästa avsnitt.

<br />

---
## 3) Gradient av MSE — steg-för-steg-härledning

Data: $N$ prov $(x_i,y_i)$.

- Linjär modell  
  $$
  \hat y_i = a\,x_i + b
  $$

- Residual  
  $$
  r_i = y_i - \hat y_i = y_i - (a x_i + b)
  $$

- Kvadratfel (per prov)  
  $$
  r_i^2
  $$

- Medelkvadratfel (MSE)  
  $$
  L(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2
  $$

Mål (minsta kvadrat): välj $(a,b)$ som **minimerar** $L(a,b)$.

---

## 4) Miniprincip

I en minimipunkt för $L$,
$$
\frac{\partial L}{\partial a}=0,
\qquad
\frac{\partial L}{\partial b}=0 .
$$

Vi använder kedjeregeln:
$$
\frac{d}{dz}f(g(z)) = f'(g(z))\,g'(z).
$$

---

## 5) Tag partialderivatan m.a.p. \(a\) — inga steg hoppas över

Start:
$$
\frac{\partial L}{\partial a}
= \frac{1}{N}\sum_{i=1}^{N}\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2 .
$$

Kedjeregel term-för-term:
- yttre $f(u)=u^2 \Rightarrow f'(u)=2u$
- inre $g(a)=y_i-(a x_i+b) \Rightarrow g'(a)=-x_i$

Alltså
$$
\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2
=2\big(y_i-(a x_i+b)\big)(-x_i),
$$
och
$$
\frac{\partial L}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-x_i).
$$

Sätt lika med $0$ och ta bort konstanten $2/N$:
$$
\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)(-x_i)=0 .
$$

Distribuera $-x_i$:
$$
\sum_{i=1}^{N}\big(-x_i y_i + a x_i^2 + b x_i\big)=0 .
$$

Gruppera termer (för in summan i symbolerna):
$$
a\sum_{i=1}^{N}x_i^2 + b\sum_{i=1}^{N}x_i - \sum_{i=1}^{N}x_i y_i = 0 .
$$

Omarrangera (första normalekvationen):
$$
\boxed{\,a\sum x_i^2 + b\sum x_i = \sum x_i y_i \,}\tag{A}
$$

Isolera också $a$ (för senare insättning):
$$
a=\frac{\sum x_i y_i - b\sum x_i}{\sum x_i^2}. \tag{A1}
$$

---

## 6) Tag partialderivatan m.a.p. \(b\)

På samma sätt:
$$
\frac{\partial}{\partial b}\Big(y_i-(a x_i+b)\Big)=-1,
$$
så
$$
\frac{\partial L}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-1).
$$

Sätt lika med $0$ och ta bort $2/N$:
$$
\sum_{i=1}^{N}(-y_i + a x_i + b)=0 .
$$

Samla termer (andra normalekvationen):
$$
\boxed{\,a\sum x_i + bN = \sum y_i \,}\tag{B}
$$

Isolera också $b$:
$$
b=\frac{\sum y_i - a\sum x_i}{N}. \tag{B1}
$$

---

## 7) Lös med insättning — varje algebrasteg utskrivet

### 7.1 Lös ut \(a\) med gemensam nämnare

Börja från (A1) och sätt in $b$ från (B1):
$$
a=\frac{\sum x_i y_i - \Big(\frac{\sum y_i - a\sum x_i}{N}\Big)\sum x_i}{\sum x_i^2}.
$$

Expandera täljaren:
$$
\sum x_i y_i \;-\; \frac{(\sum x_i)(\sum y_i)}{N} \;+\; a\,\frac{(\sum x_i)^2}{N}.
$$

Dela termvis med $\sum x_i^2$:
$$
a=\frac{\sum x_i y_i}{\sum x_i^2}
\;-\;\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}
\;+\;a\,\frac{(\sum x_i)^2}{N\,\sum x_i^2}. \tag{★}
$$

Flytta $a$-termen till vänster:
$$
a\Bigg(1-\frac{(\sum x_i)^2}{N\,\sum x_i^2}\Bigg)
=\frac{\sum x_i y_i}{\sum x_i^2}
-\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Skriv vänstersidan över en nämnare:
$$
a\,\frac{N\sum x_i^2-(\sum x_i)^2}{N\,\sum x_i^2}
=\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Strunta i lika nämnare:
$$
a\big(N\sum x_i^2-(\sum x_i)^2\big)
= N\sum x_i y_i-(\sum x_i)(\sum y_i).
$$

Alltså
$$
\boxed{\,a=\dfrac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}\,}. \tag{C}
$$

### 7.2 Lös ut \(b\) med samma nämnare (inga genvägar)

Starta från (B1):
$$
b=\frac{\sum y_i}{N} - a\,\frac{\sum x_i}{N}.
$$

Sätt in $a$ från (C):
$$
b=\frac{\sum y_i}{N}
-\frac{\sum x_i}{N}\cdot
\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\sum x_i^2-(\sum x_i)^2}.
$$

Gör gemensam nämnare $N\big(N\sum x_i^2-(\sum x_i)^2\big)$:
$$
b=\frac{(\sum y_i)\big(N\sum x_i^2-(\sum x_i)^2\big)
-(\sum x_i)\big(N\sum x_i y_i-(\sum x_i)(\sum y_i)\big)}
{\,N\big(N\sum x_i^2-((\sum x_i)^2)\big)} .
$$

Expandera täljaren helt:
$$
\underbrace{N(\sum y_i)(\sum x_i^2)}_{\text{term 1}}
-\underbrace{(\sum y_i)(\sum x_i)^2}_{\text{term 2}}
-\underbrace{N(\sum x_i)(\sum x_i y_i)}_{\text{term 3}}
+\underbrace{(\sum x_i)^2(\sum y_i)}_{\text{term 4}} .
$$

**Term 2** och **term 4** är lika men med motsatt tecken och tar ut varann. Dela täljare och nämnare med $N$:
$$
b=\frac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}.
$$

Alltså
$$
\boxed{\,b=\dfrac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}
\;=\; \bar y - a\,\bar x\,}, \qquad
\bar x=\frac{1}{N}\sum x_i,\ \bar y=\frac{1}{N}\sum y_i .
$$

> Om alla $x_i$ är lika gäller $N\sum x_i^2-(\sum x_i)^2=0$: lutningen går inte att identifiera (ingen variation i $x$).

---

## 8) (Valfritt) kovariansform

$$
a=\frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2}
=\frac{\mathrm{Cov}(x,y)}{\mathrm{Var}(x)},
\qquad
b=\bar y - a\,\bar x .
$$

---

## 9) Liten numerisk koll

Data: $(0,1),(1,3),(2,5),(3,7)$ (sann linje $y=2x+1$).  
Summor: $\sum x=6,\ \sum y=16,\ \sum x^2=14,\ \sum xy=34,\ N=4$.

Beräkna
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}
=\frac{136-96}{56-36}=\frac{40}{20}=2,
\qquad
b=\frac{16-2\cdot6}{4}=1.
$$

Residualerna är noll $\Rightarrow$ $\text{MSE}=0$.
