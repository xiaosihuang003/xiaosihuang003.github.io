---
title: "Koneoppiminen 5: Todennäköisyydet ja Bayesilainen ajattelu"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Ma 8.9.2025 K1704"
date: "2025-09-11"
lang: "fi"
excerpt: "Frekventistisestä intuitiosta Bayesin sääntöön: ehdolliset todennäköisyydet, priorien ja likelihoodien ero, ML- ja MAP-päätökset, Monty Hall, ei-transitiiviset nopat, pienten otosten sudenkuopat ja miksi lääkärit ajattelevat kuin bayesilaiset."
tags: ["Joni Kämäräinen", "koneoppiminen", "todennäköisyys", "Bayes"]
draft: false
---

## Osa 1 — Bayesilainen todennäköisyys ja päättely 

## 1.1 Johdanto
Tänään siirrymme deterministisistä malleista (kuten suoran sovittaminen ja virhefunktion minimointi) **todennäköisyysperustaiseen päättelyyn**. Tämä luento esittelee **Bayesilaisen todennäköisyyden** – kehikon, joka mahdollistaa uskomusten päivittämisen uuden todistusaineiston perusteella.

Kaksi klassista nyrkkisääntöä ongelmanratkaisussa:
1. Jos et ole varma, yritä sovittaa suora → yksinkertainen aloitusmalli  
2. Määritä virhemittari → etsi ratkaisu, joka minimoi sen  

Nyt otamme käyttöön **Bayesilaisen lähestymistavan**: aloitetaan prioriuskomuksista, päivitetään ne havainnoilla ja saadaan posterioriuskomukset.

---

## 1.2 Todennäköisyyskertaus nopilla

![Taulumuistiinpanot](/images/docs/mlLecture5_Bayesianlearning/1.png)

Otetaan reilu kuusisivuinen noppa:

- Todennäköisyys saada `1`:  
  $$P(X=1)=\frac{1}{6}$$  

- Todennäköisyys saada kaksi peräkkäistä `1`:  
  $$P(\text{kaksi ykköstä})=P(1)\cdot P(1)=\frac{1}{36}$$  

- Todennäköisyys **ei** saada `1`:  
  $$P(X\neq 1)=1-\frac{1}{6}=\frac{5}{6}$$  

Tämä on **klassista todennäköisyyttä**.

---

## 1.3 Frekventistinen vs Bayesilainen tulkinta

- **Frekventistinen tulkinta:**  
  Todennäköisyys = tapahtuman suhteellinen osuus äärettömässä määrässä toistoja.  
  Esim. heittämällä noppaa 1000 kertaa saat noin 1/6 ykkösiä.

- **Bayesilainen tulkinta:**  
  Todennäköisyys = *uskomuksen aste*, joka voidaan päivittää uudella tiedolla.  
  Voimme antaa todennäköisyyksiä ja päivittää niitä, vaikka meillä ei olisi paljon havaintoja.

---

## 1.4 Esimerkki: Monty Hall -ongelma

![Taulumuistiinpanot](/images/docs/mlLecture5_Bayesianlearning/2.png)

Peli:
- 3 ovea  
- Yhden takana auto, kahden takana vuohi  
- Valitset yhden oven  
- Juontaja avaa toisen oven (aina vuohen)  
- Sinulta kysytään: **vaihdatko vai jäätkö?**

Analyysi:
- Todennäköisyys että alkuperäinen valinta on oikea:  
  $$P(\text{auto valitun oven takana})=\frac{1}{3}$$  

- Todennäköisyys että auto on muiden ovien takana:  
  $$P(\text{auto muiden ovien takana})=\frac{2}{3}$$  

Kun juontaja avaa yhden vuohen oven, **koko $2/3$ todennäköisyys siirtyy viimeiselle suljetulle ovelle**.

Siis:
- Jääminen = voittotodennäköisyys $1/3$  
- Vaihtaminen = voittotodennäköisyys $2/3$  

**Johtopäätös:** Kannattaa aina vaihtaa – voittotodennäköisyys kaksinkertaistuu.

---

## 1.5 Ehdollinen todennäköisyys

![Taulumuistiinpanot](/images/docs/mlLecture5_Bayesianlearning/3.png)

Määritelmä:

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}
$$

Tulkinta: todennäköisyys että $A$ tapahtuu, kun tiedetään että $B$ on totta.

**Esimerkki 1:**  
- $A$: hahmo on hobitti  
- $B$: havaittu pituus = 120 cm  

Silloin:  
$$P(\text{hobitti}\mid \text{pituus}=120)$$ on suuri,  
kun taas $$P(\text{haltia}\mid \text{pituus}=120)$$ on pieni.

---

### Esimerkki 2: Nopan havainnointi päivittää uskomusta

Jos heität noppaa ja **juuri ennen kuin se pysähtyy**, näet että yläpuolella on `5`.  
Mikä on todennäköisyys, että lopullinen yläpuoli on `1`?

- Vastakkaisten sivujen summa on 7 → `1`:n vastakkainen on `6`  
- Jos yläpuoli on `5`, neljä viereistä sivua ovat yhtä todennäköisiä tulla ylös viimeisen kierähdyksen jälkeen  

Siis:

$$
P(\text{ylä=1}\mid \text{havaittu=5})=\frac{1}{4}
$$

Jos havaitsisimme yläpuolen olevan `6`:

$$
P(\text{ylä=1}\mid \text{havaittu=6})=0
$$

**Havainto muuttaa prioria.**  
Alkuperäinen uskomus $P(\text{ylä=1})=\frac{1}{6}$ täytyy päivittää. Tämä on Bayesilaisen päättelyn ydin:

> **Havainnot säätävät alkuperäistä uskomusta (prioria).**

---

## 1.6 Bayesin kaava

![Taulumuistiinpanot](/images/docs/mlLecture5_Bayesianlearning/4.png)

Bayesilaisen oppimisen perusta:

$$
P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}
$$

Missä:
- $P(A)$ = prior (ennen havaintoja)  
- $P(B\mid A)$ = likelihood (todennäköisyys jos $A$ on tosi)  
- $P(B)$ = marginaalinen todennäköisyys  
- $P(A\mid B)$ = posterior (päivitetty uskomus)

---

### Hobitti vs Haltia -esimerkki
- $A$: hahmo on hobitti tai haltia  
- $B$: havaittu pituus  

Posterior:
$$
P(\text{hobitti}\mid\text{pituus})=\frac{P(\text{pituus}\mid\text{hobitti})P(\text{hobitti})}{P(\text{pituus})}
$$

---

## 1.7 Priorin merkitys

![Taulumuistiinpanot](/images/docs/mlLecture5_Bayesianlearning/5.png)

Bayesin kaava muistuttaa: **priorilla on väliä**.

$$
P(B)=\sum_A P(B\mid A)P(A)
$$

Täten  

$$
\sum_A P(A\mid B)=1
$$

Priorit vaikuttavat lopputulokseen.  
Esim. Mars-mönkijän laskeutuminen → prior arviona kivikkoisuuden todennäköisyydelle vaikuttaa lopulliseen päätökseen.

---

## Osa 2 — Likelihoodien estimointi datasta

![Taulumuistiinpanot](/images/docs/mlLecture5_Bayesianlearning/6.png)

Bayesilaisessa päättelyssä $P(B\mid A)$ on yleensä **tiheysfunktio**.  
Esim. pituuden $h$ jakaumat:
$$
\int_{-\infty}^{+\infty}p(h\mid\text{hobitti})\,\mathrm dh=1
$$

### 2.1 Histogrammit
Datan binnaus:
$$
\hat P(h\in I_j)=\frac{c_j}{N}
$$

### 2.2 Jatkuvan jakauman sovitus
Jos pituudet $\sim \mathcal N(\mu,\sigma^2)$:
$$
p(h\mid \mu,\sigma^2)=\frac{1}{\sqrt{2\pi}\sigma}\exp\!\left(-\frac{(h-\mu)^2}{2\sigma^2}\right)
$$

> PDF-arvo ei ole todennäköisyys — vain integraali antaa todennäköisyyden.

### 2.3 Parametrien estimaatti
$$
\hat\mu_{\text{ML}}=\frac{1}{N}\sum h_i,\quad
\hat\sigma^2_{\text{ML}}=\frac{1}{N}\sum (h_i-\hat\mu_{\text{ML}})^2
$$

### 2.4 Miksi $P(B\mid A)$ on helpompi mitata
Mittaa ensin luokkakohtaiset jakaumat, laske posteriorit Bayesin kaavalla.

---

## Osa 3 — Päätökset: ML vs MAP

### 3.1 ML-päätös
$$
\hat y_{\text{ML}}=\arg\max_{y\in\mathcal A}P(x\mid y)
$$

### 3.2 MAP-päätös
$$
\hat y_{\text{MAP}}=\arg\max_{y\in\mathcal A}P(x\mid y)P(y)
$$

![Taulumuistiinpanot](/images/docs/mlLecture5_Bayesianlearning/7.png)

### 3.3 Normalisointi (kahden luokan tapaus)
$$
P(x)=P(x\mid H)P(H)+P(x\mid E)P(E)
$$

### 3.4 Miksi lääkärit ovat “luontaisesti bayesilaisia”
MAP huomioi priorin, ML ei → siksi lääkärit ensin epäilevät yleisiä syitä ennen harvinaisia.

---
