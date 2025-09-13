---
title: "Maskininlärning 5: Sannolikheter och Bayesianskt tänkande"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Mån 8.9.2025 K1704"
date: "2025-09-11"
lang: "sv"
excerpt: "Från frekventistisk intuition till Bayes regel: villkorliga sannolikheter, priorer kontra likelihoods, ML kontra MAP-beslut, Monty Hall, icke-transitiva tärningar, småstickprovsfällor och varför läkare tänker som bayesianer."
tags: ["Joni Kämäräinen", "maskininlärning", "sannolikhet", "Bayes"]
draft: false
---

## Del 1 — Bayesiansk sannolikhet & inferens 

## 1.1 Introduktion
Idag går vi från deterministiska modeller (t.ex. linjeanpassning, felminimering) till **sannolikhetsbaserat resonemang**. Den här föreläsningen introducerar **Bayesiansk sannolikhet**, ett ramverk som låter oss uppdatera våra övertygelser utifrån ny evidens.

Två klassiska tumregler vid problemlösning:
1. Om du är osäker, försök passa en linje → en enkel startmodell.  
2. Definiera ett felmått → hitta en lösning som minimerar det.  

Nu introducerar vi **Bayesianska angreppssättet**: börja från priorövertygelser, uppdatera dem med observationer och härled posteriorsannolikheter.

---

## 1.2 Sannolikhetsuppfräschning med tärningar

![Tavlanteckningar](/images/docs/mlLecture5_Bayesianlearning/1.png)

Betrakta en rättvis sexsidig tärning.

- Sannolikheten att slå en `1`:  
  $$P(X=1) = \frac{1}{6}$$  

- Sannolikheten att slå två `1`:or i rad:  
  $$P(\text{två ettor}) = P(1) \cdot P(1) = \frac{1}{36}$$  

- Sannolikheten att **inte** slå en `1`:  
  $$P(X \neq 1) = 1 - \frac{1}{6} = \frac{5}{6}$$  

Detta är **klassisk sannolikhet**.

---

## 1.3 Frekventistisk vs Bayesiansk tolkning

- **Frekventistisk tolkning:**  
  Sannolikhet = den långsiktiga frekvensen av en händelse efter oändligt många försök.  
  Exempel: kasta tärningen 1000 gånger → ungefär en sjättedel blir `1`.

- **Bayesiansk tolkning:**  
  Sannolikhet = *grad av tro*, som kan uppdateras med ny evidens.  
  Vi kan tilldela och uppdatera sannolikheter även utan många försök.

---

## 1.4 Exempel: Monty Hall-problemet

![Tavlanteckningar](/images/docs/mlLecture5_Bayesianlearning/2.png)

Spelet:  
- 3 dörrar.  
- Bakom en dörr: en bil. Bakom två dörrar: getter.  
- Du väljer en dörr.  
- Värden öppnar en annan dörr (alltid en get).  
- Du får frågan: **byta eller stanna?**

Analys:  
- Sannolikheten att ditt första val är rätt:  
  $$P(\text{bil bakom vald dörr}) = \frac{1}{3}$$  

- Sannolikheten att bilen är bakom någon av de andra dörrarna:  
  $$P(\text{bil bakom andra dörrar}) = \frac{2}{3}$$  

När värden öppnar en get-dörr flyttas **hela $2/3$ sannolikheten till den återstående stängda dörren**.

Alltså:  
- Stanna = vinstchans $1/3$.  
- Byt = vinstchans $2/3$.  

**Slutsats:** Byt alltid – du fördubblar din chans att vinna.

---

## 1.5 Villkorlig sannolikhet

![Tavlanteckningar](/images/docs/mlLecture5_Bayesianlearning/3.png)

Definition:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Tolkning: sannolikheten att $A$ inträffar givet att $B$ är sant.

**Exempel 1:**  
- $A$: att vara en hobbit.  
- $B$: observerad längd = 120 cm.  

Då:  
$$P(\text{hobbit} \mid \text{längd}=120)$$ är sannolikt hög,  
medan $$P(\text{alv} \mid \text{längd}=120)$$ är låg.

---

### Exempel 2: Tärningsobservation uppdaterar tro

Antag att du slår en tärning och **precis innan sista rullningen stannar** ser du att ovansidan är `5`.  
Vad är sannolikheten att slutresultatet blir `1`?

- Motsatta sidor summerar till 7 → motsatt sida till `1` är `6`.  
- Om ovansidan är `5` är alla fyra sidoytor lika sannolika att hamna uppåt.

$$
P(\text{topp}=1 \mid \text{observation}=5) = \frac{1}{4}
$$

Men om vi hade observerat `6`:

$$
P(\text{topp}=1 \mid \text{observation}=6) = 0
$$

Detta visar att **observationer modifierar priorn**.  
Din **a priori-tro** kanske var $P(\text{topp}=1)=\frac{1}{6}$, men efter observationen måste du uppdatera din tro:

> **Observationer justerar den ursprungliga tron (priorn).**

---

## 1.6 Bayes sats

![Tavlanteckningar](/images/docs/mlLecture5_Bayesianlearning/4.png)

Grunden för bayesianskt lärande:

$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$

Där:
- $P(A)$ = prior (tro innan evidens).  
- $P(B \mid A)$ = likelihood (sannolikhet för observationen om $A$ är sant).  
- $P(B)$ = marginal sannolikhet.  
- $P(A \mid B)$ = posterior (uppdaterad tro).

---

### Hobbit vs Alv-exempel
Posterior:
$$
P(\text{hobbit} \mid \text{längd}) = \frac{P(\text{längd} \mid \text{hobbit}) P(\text{hobbit})}{P(\text{längd})}
$$

---

## 1.7 Priorns roll

![Tavlanteckningar](/images/docs/mlLecture5_Bayesianlearning/5.png)

Bayes sats visar: **priorn spelar roll**.

$$
P(B) = \sum_A P(B \mid A) P(A)
$$

så att  

$$
\sum_A P(A \mid B) = 1
$$

Exempel: Marslandning → prior för stenig terräng påverkar beslutet.

---

## Del 2 — Skatta likelihood från data

![Tavlanteckningar](/images/docs/mlLecture5_Bayesianlearning/6.png)

I bayesiansk inferens är $P(B\mid A)$ oftast en **täthetsfunktion**.

### 2.1 Histogram
$$
\hat P(h\in I_j)=\frac{c_j}{N}
$$

### 2.2 Anpassa kontinuerlig fördelning
Om höjder $\sim \mathcal N(\mu,\sigma^2)$:
$$
p(h\mid \mu,\sigma^2)=\frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-\frac{(h-\mu)^2}{2\sigma^2}\right)
$$

### 2.3 Parameterestimat
$$
\hat\mu_{\text{ML}}=\frac{1}{N}\sum h_i,\quad
\hat\sigma^2_{\text{ML}}=\frac{1}{N}\sum (h_i-\hat\mu_{\text{ML}})^2
$$

### 2.4 Varför $P(B\mid A)$ är lättare att mäta
Mät klassfördelningar först, använd Bayes sats för att invertera.

---

## Del 3 — Beslut: ML vs MAP

### 3.1 ML-beslut
$$
\hat y_{\text{ML}} = \arg\max_{y \in \mathcal A} P(x \mid y)
$$

### 3.2 MAP-beslut
$$
\hat y_{\text{MAP}} = \arg\max_{y \in \mathcal A} P(x \mid y)P(y)
$$

![Tavlanteckningar](/images/docs/mlLecture5_Bayesianlearning/7.png)

### 3.3 Normalisering (tvåklasstillfället)
$$
P(x)=P(x\mid H)P(H)+P(x\mid E)P(E)
$$

### 3.4 Varför läkare är “bayesianska av naturen”
MAP väger in priorn, ML gör det inte → därför misstänker läkare vanliga orsaker först.

---
