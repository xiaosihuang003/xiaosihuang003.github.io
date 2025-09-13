---
title: "Maskinlæring 5: Sannsynligheter og Bayesiansk tenkning"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Man 8.9.2025 K1704"
date: "2025-09-11"
lang: "no"
excerpt: "Fra frekventistisk intuisjon til Bayes’ regel: betinget sannsynlighet, priorer vs. likelihoods, ML vs. MAP-beslutninger, Monty Hall, ikke-transitive terninger, små utvalgsfeller og hvorfor leger tenker som bayesianere."
tags: ["Joni Kämäräinen", "maskinlæring", "sannsynlighet", "Bayes"]
draft: false
---

## Del 1 — Bayesiansk sannsynlighet og inferens 

## 1.1 Introduksjon
I dag går vi fra deterministiske modeller (som å tilpasse en linje, minimere en feilkost) til **sannsynlighetsresonnement**. Denne forelesningen introduserer **Bayesiansk sannsynlighet**, et rammeverk som lar oss oppdatere tro basert på ny evidens.

To klassiske tommelfingerregler for problemløsning:
1. Hvis du er usikker, prøv å tilpasse en linje → en enkel startmodell.  
2. Definer et feilmål → finn en løsning som minimerer det.  

Nå introduserer vi den **Bayesianske tilnærmingen**: start fra priorer, oppdater dem med observasjoner, og avled posteriorsannsynligheter.

---

## 1.2 Sannsynlighetsoppfriskning med terninger

![Tavlenotater](/images/docs/mlLecture5_Bayesianlearning/1.png)

Tenk på en rettferdig seks-sidet terning.

- Sannsynligheten for å få en `1`:  
  $$P(X=1) = \frac{1}{6}$$  

- Sannsynligheten for to `1` på rad:  
  $$P(\text{to enere}) = \frac{1}{36}$$  

- Sannsynligheten for å **ikke** få en `1`:  
  $$P(X \neq 1) = 1 - \frac{1}{6} = \frac{5}{6}$$  

Dette er **klassisk sannsynlighet**.

---

## 1.3 Frekventistisk vs Bayesiansk tolkning

- **Frekventistisk:**  
  Sannsynlighet = den langsiktige frekvensen etter uendelig mange forsøk.  
  Eks.: kast terningen 1000 ganger → omtrent 1/6 blir `1`.

- **Bayesiansk:**  
  Sannsynlighet = en *grad av tro* som kan oppdateres når vi får ny evidens.  
  Selv uten mange forsøk kan vi tildele og oppdatere sannsynligheter.

---

## 1.4 Eksempel: Monty Hall-problemet

![Tavlenotater](/images/docs/mlLecture5_Bayesianlearning/2.png)

Spillet:  
- 3 dører.  
- Bak én: en bil. Bak to: geiter.  
- Du velger én dør.  
- Programlederen åpner en annen (alltid en geit).  
- Du får valget: **bytte eller bli?**

Analyse:  
- Sannsynlighet for at du valgte riktig først:  
  $$P(\text{bil bak valgt dør}) = \frac{1}{3}$$  

- Sannsynlighet for at bilen er bak de andre dørene:  
  $$P(\text{bil bak andre dører}) = \frac{2}{3}$$  

Når en geit-dør åpnes, flyttes **hele $2/3$ sannsynligheten til den gjenværende lukkede døren**.

Altså:  
- Bli = 1/3 vinnersjanse.  
- Bytt = 2/3 vinnersjanse.  

**Konklusjon:** Bytt alltid – du dobler sjansen for å vinne.

---

## 1.5 Betinget sannsynlighet

![Tavlenotater](/images/docs/mlLecture5_Bayesianlearning/3.png)

Definisjon:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Tolkning: sannsynligheten for $A$ gitt at $B$ er kjent.

**Eksempel 1:**  
- $A$: være en hobbit.  
- $B$: observert høyde = 120 cm.  

Da:  
$$P(\text{hobbit} \mid \text{høyde}=120)$$ er høy,  
mens $$P(\text{alv} \mid \text{høyde}=120)$$ er lav.

---

### Eksempel 2: Terningobservasjon oppdaterer tro

Anta at du kaster en terning og **akkurat før siste rull stanset**, ser du at toppen viser `5`.  
Hva er sannsynligheten for at sluttresultatet blir `1`?

- Motsatte sider summerer til 7 → motsatt side av `1` er `6`.  
- Når vi ser `5` på toppen, er alle fire sidene like sannsynlige å havne på toppen etter ett tilfeldig rull.

$$
P(\text{topp}=1 \mid \text{observasjon}=5) = \frac{1}{4}
$$

Men hvis vi hadde sett `6`:

$$
P(\text{topp}=1 \mid \text{observasjon}=6) = 0
$$

Dette viser at **observasjon endrer prioren**.  
Din **a priori-tro** var kanskje $P(\text{topp}=1)=\frac{1}{6}$, men etter å ha sett tilstanden må du oppdatere troen:

> **Observasjoner justerer den opprinnelige troen (prioren).**

---

## 1.6 Bayes’ teorem

![Tavlenotater](/images/docs/mlLecture5_Bayesianlearning/4.png)

Grunnpilaren i bayesiansk læring:

$$
P(A \mid B) = \frac{P(B \mid A) P(A)}{P(B)}
$$

Hvor:
- $P(A)$ = prior (tro før data).  
- $P(B \mid A)$ = likelihood (hvor sannsynlig observasjonen er gitt $A$).  
- $P(B)$ = marginal sannsynlighet.  
- $P(A \mid B)$ = posterior (oppdatert tro).

---

### Hobbit vs Alv-eksempel
Posterior:
$$
P(\text{hobbit} \mid \text{høyde}) = \frac{P(\text{høyde} \mid \text{hobbit}) P(\text{hobbit})}{P(\text{høyde})}
$$

---

## 1.7 Priors rolle

![Tavlenotater](/images/docs/mlLecture5_Bayesianlearning/5.png)

Bayes viser: **prioren er viktig**.

$$
P(B) = \sum_A P(B \mid A) P(A)
$$

slik at  

$$
\sum_A P(A \mid B) = 1
$$

Eksempel: Marslanding → prior for steinete område påvirker beslutningen.

---

## Del 2 — Estimering av likelihood fra data

![Tavlenotater](/images/docs/mlLecture5_Bayesianlearning/6.png)

I bayesiansk inferens er $P(B\mid A)$ vanligvis en **sannsynlighetstetthet**.

### 2.1 Histogram
$$
\hat P(h\in I_j)=\frac{c_j}{N}
$$

### 2.2 Tilpasning av kontinuerlig fordeling
Hvis høyder $\sim \mathcal N(\mu,\sigma^2)$:
$$
p(h\mid \mu,\sigma^2)=\frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-\frac{(h-\mu)^2}{2\sigma^2}\right)
$$

### 2.3 Parameterestimat
$$
\hat\mu_{\text{ML}}=\frac{1}{N}\sum h_i,\quad
\hat\sigma^2_{\text{ML}}=\frac{1}{N}\sum (h_i-\hat\mu_{\text{ML}})^2
$$

### 2.4 Hvorfor $P(B\mid A)$ er lettere å måle
Mål klassedata først, bruk deretter Bayes for å regne $P(A\mid B)$.

---

## Del 3 — Beslutninger: ML vs MAP

### 3.1 ML-beslutning
$$
\hat y_{\text{ML}} = \arg\max_{y \in \mathcal A} P(x \mid y)
$$

### 3.2 MAP-beslutning
$$
\hat y_{\text{MAP}} = \arg\max_{y \in \mathcal A} P(x \mid y)P(y)
$$

![Tavlenotater](/images/docs/mlLecture5_Bayesianlearning/7.png)

### 3.3 Normalisering (to klasser)
$$
P(x)=P(x\mid H)P(H)+P(x\mid E)P(E)
$$

### 3.4 Hvorfor leger er “bayesianere i praksis”
MAP tar hensyn til prioren, ML gjør ikke det → derfor mistenker leger vanlige årsaker før sjeldne.

---
