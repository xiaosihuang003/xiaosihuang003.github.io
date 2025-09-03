---
title: "Lecture 2: Lineaarinen regressio_(2. muistiinpano FI)"
subtitle: "Lineaarinen malli → residuaali → neliöity virhe → MSE → ∂L/∂a=0, ∂L/∂b=0 → normaaliehdot → suljettu muoto a, b"
date: 2025-09-01
lang: fi
excerpt: "Kahdesta pisteestä normaaliehtoihin; ratkaise a,b; laajenna useaan syötteeseen (ŷ=A w)."
tags: [Joni Kämäräinen, machine-learning, linear-regression, calculus, least-squares]
draft: false
---

## Johdetaan a & b lineaarimallille pienimmän neliösumman menetelmällä alusta alkaen

## 1) Mikä on tehtävä?

Annettuna **N** opetusnäytettä $(x_1,y_1), (x_2,y_2), \ldots, (x_N,y_N)$, johda **suljetun muodon** ratkaisut $a$:lle ja $b$:lle lineaarimallissa
$$
\hat y \;=\; a x + b
$$
minimoimalla keskineliövirhe
$$
L_{\text{MSE}}(a,b)
=\frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2.
$$
---

## 2) Mitä opettaja opetti?

### 2.1 Residuaali  
Yhdelle näytteelle **residuaali** on erotus totuusarvon ja ennusteen välillä:  
$$
e_i = y_i - \hat{y}_i, \qquad \hat{y}_i = a x_i + b .
$$
<br />

### 2.2 Neliövirhe (per näyte)  
Neliövirhe on kunkin datapisteen havaitun (todellisen) arvon ja ennusteen erotuksen neliö. Se lasketaan kaavalla (Todellinen − Ennuste)²:
$$
e_i^{2} = \big(y_i - \hat{y}_i\big)^2 .
$$
<br />

### 2.3 Keskineliövirhe (MSE)  
Keskineliövirhe (MSE) mittaa mallin keskivertovirhettä: ennusteen ja totuusarvon neliöityjen erojen keskiarvo.
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2 .
$$
<br />

### 2.4 Pienimmän neliösumman (Least Squares) menetelmä

Pienimmän neliösumman menetelmä etsii parhaan suoran/ käyrän dataan **minimoimalla neliöityjen residuaalien summan**.

$$
\min_{a,b}\; \frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2
$$

- $\boldsymbol{N}$: näytteiden lukumäärä  
- $\boldsymbol{y}_i$: havaittu arvo (data)  
- $\hat{\boldsymbol{y}}_i = a x_i + b$: ennuste (mallin ulostulo)  
- $\boldsymbol{y}_i - \hat{\boldsymbol{y}}_i$: residuaali (näytteen $i$ virhe)  
- $\boldsymbol{\sum}$: summa kaikista näytteistä ($i=1\ldots \boldsymbol{N}$)  
- $\tfrac{1}{\boldsymbol{N}}$: keskiarvo

Koneoppimisen tavoite tässä on <span class="hl-marker">löytää pari (a, b), joka minimoi MSE:n</span>.

<br />

### 2.5 Miten löydämme MSE:tä minimoivat (a, b)?

**Ratkaisu:** raa'an voiman haku (brute force).

Kokeillaan monia $(a,b)$-pareja rajatulla ruudukolla, lasketaan tappio
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2,
$$
ja pidetään paras.

- **a** arvoilla **-100 : 1 : +100**  
- **b** arvoilla **-100 : 1 : +100**  
- Laske $L_{\text{MSE}}(a,b)$  
- Jos pienempi kuin paras tähän asti → päivitä $(a,b)$

Taulun merkintä “-100 : 1 : +100” tarkoittaa **aloita -100:sta, askel 1, lopeta +100:aan**.

Tämä yksinkertainen haku havainnollistaa idean: **haemme parametriparin $(a,b)$, joka minimoi MSE:n** (myöhemmin korvaamme tämän suljetulla kaavalla tai gradienttimenetelmillä).

<br />

### 2.6 Etsi $L_{\text{MSE}}$:n minimi

Haluamme minimoida $L_{\text{MSE}}(a,b)$.

Minimissä derivaatta (kaltevuus) on nolla; siis

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0.
$$

$L_{\text{MSE}}$:llä on kaksi syötettä: $a$ (kulmakerroin) ja $b$ (vakiotermi).

Sama vektorimuodossa: gradientti on nolla,

$$
\nabla L_{\text{MSE}}(a,b)
=\left(\frac{\partial L_{\text{MSE}}}{\partial a},\ \frac{\partial L_{\text{MSE}}}{\partial b}\right)
=(0,0).
$$

**Osittaisderivaattojen merkitys**
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial a}$: tappion muutos kulmakertoimen $a$ suhteen  
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial b}$: tappion muutos vakiotermin $b$ suhteen

Ajattele $L_{\text{MSE}}(a,b)$ “kulhona”: pohjalla kaltevuudet kaikkiin suuntiin ovat nollia — siinä pisteessä saamme parhaat $(a,b)$.

Optimi saadaan asettamalla gradientti nollaksi; silloin $L_{\text{MSE}}$ on minimissä.

<br />

### 2.7 Ketjusääntö (jota käytämme derivoinnissa)
Jos funktio on kooste $f(g(x))$, sen derivaatta noudattaa **ketjusääntöä**:
$$
\frac{d}{dx} \, f\!\big(g(x)\big) \;=\; f'\!\big(g(x)\big)\cdot g'(x).
$$
Sovellamme tätä neliöidyn residuaalin derivointiin MSE:n sisällä suhteessa \(a\):han ja \(b\):hen seuraavassa osassa.

<br />

---
## 3) MSE:n gradientti — johdanto askel askeleelta

Data: $N$ näytettä $(x_i,y_i)$.

- Lineaarimalli  
  $$
  \hat y_i = a\,x_i + b
  $$

- Residuaali  
  $$
  r_i = y_i - \hat y_i = y_i - (a x_i + b)
  $$

- Neliövirhe (per näyte)  
  $$
  r_i^2
  $$

- Keskineliövirhe (MSE)  
  $$
  L(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2
  $$

Tavoite (pienimmän neliösumman periaate): valitse $(a,b)$ niin, että $L(a,b)$ **minimoituu**.

---

## 2) Minimiperiaate

Minimissä pätee
$$
\frac{\partial L}{\partial a}=0,
\qquad
\frac{\partial L}{\partial b}=0 .
$$

Käytämme ketjusääntöä:
$$
\frac{d}{dz}f(g(z)) = f'(g(z))\,g'(z).
$$

---

## 3) Ota osittaisderivaatta \(a\):n suhteen — yhtään askelta väliin jättämättä

Aloita
$$
\frac{\partial L}{\partial a}
= \frac{1}{N}\sum_{i=1}^{N}\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2 .
$$

Ketjusääntö joka termille:
- ulompi $f(u)=u^2 \Rightarrow f'(u)=2u$
- sisempi $g(a)=y_i-(a x_i+b) \Rightarrow g'(a)=-x_i$

Siten
$$
\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2
=2\big(y_i-(a x_i+b)\big)(-x_i),
$$
ja
$$
\frac{\partial L}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-x_i).
$$

Aseta $0$:ksi ja supista vakio $2/N$:
$$
\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)(-x_i)=0 .
$$

Jaa $-x_i$ sisään:
$$
\sum_{i=1}^{N}\big(-x_i y_i + a x_i^2 + b x_i\big)=0 .
$$

Ryhmittele samanlaiset termit (tuo summa-symbolin sisään):
$$
a\sum_{i=1}^{N}x_i^2 + b\sum_{i=1}^{N}x_i - \sum_{i=1}^{N}x_i y_i = 0 .
$$

Järjestele (ensimmäinen normaaliehto):
$$
\boxed{\,a\sum x_i^2 + b\sum x_i = \sum x_i y_i \,}\tag{A}
$$

Eristä myös $a$ (myöhempää sijoitusta varten):
$$
a=\frac{\sum x_i y_i - b\sum x_i}{\sum x_i^2}. \tag{A1}
$$

---

## 4) Ota osittaisderivaatta \(b\):n suhteen

Vastaavasti,
$$
\frac{\partial}{\partial b}\Big(y_i-(a x_i+b)\Big)=-1,
$$
siis
$$
\frac{\partial L}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-1).
$$

Aseta $0$:ksi ja poista $2/N$:
$$
\sum_{i=1}^{N}(-y_i + a x_i + b)=0 .
$$

Kokoa termit (toinen normaaliehto):
$$
\boxed{\,a\sum x_i + bN = \sum y_i \,}\tag{B}
$$

Eristä lisäksi $b$:
$$
b=\frac{\sum y_i - a\sum x_i}{N}. \tag{B1}
$$

---

## 5) Ratkaise sijoittamalla — jokainen algebran siirto kirjoitettu

### 5.1 Ratkaise \(a\) yhteisellä nimittäjällä

Lähde (A1):stä ja sijoita $b$ muodosta (B1):
$$
a=\frac{\sum x_i y_i - \Big(\frac{\sum y_i - a\sum x_i}{N}\Big)\sum x_i}{\sum x_i^2}.
$$

Laajenna osoittaja:
$$
\sum x_i y_i \;-\; \frac{(\sum x_i)(\sum y_i)}{N} \;+\; a\,\frac{(\sum x_i)^2}{N}.
$$

Jaa $\sum x_i^2$:lla:
$$
a=\frac{\sum x_i y_i}{\sum x_i^2}
\;-\;\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}
\;+\;a\,\frac{(\sum x_i)^2}{N\,\sum x_i^2}. \tag{★}
$$

Siirrä oikean puolen $a$-termi vasemmalle:
$$
a\Bigg(1-\frac{(\sum x_i)^2}{N\,\sum x_i^2}\Bigg)
=\frac{\sum x_i y_i}{\sum x_i^2}
-\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Kirjoita vasen puoli yhteiseen nimittäjään:
$$
a\,\frac{N\sum x_i^2-(\sum x_i)^2}{N\,\sum x_i^2}
=\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Supista samat nimittäjät:
$$
a\big(N\sum x_i^2-(\sum x_i)^2\big)
= N\sum x_i y_i-(\sum x_i)(\sum y_i).
$$

Siten
$$
\boxed{\,a=\dfrac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}\,}. \tag{C}
$$

### 5.2 Ratkaise \(b\) samalla nimittäjällä (ei oikoteitä)

Lähde (B1):stä:
$$
b=\frac{\sum y_i}{N} - a\,\frac{\sum x_i}{N}.
$$

Sijoita $a$ muodosta (C):
$$
b=\frac{\sum y_i}{N}
-\frac{\sum x_i}{N}\cdot
\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\sum x_i^2-(\sum x_i)^2}.
$$

Muodosta yhteinen nimittäjä $N\big(N\sum x_i^2-(\sum x_i)^2\big)$:
$$
b=\frac{(\sum y_i)\big(N\sum x_i^2-(\sum x_i)^2\big)
-(\sum x_i)\big(N\sum x_i y_i-(\sum x_i)(\sum y_i)\big)}
{\,N\big(N\sum x_i^2-(\sum x_i)^2\big)} .
$$

Laajenna osoittaja kokonaan:
$$
\underbrace{N(\sum y_i)(\sum x_i^2)}_{\text{termi 1}}
-\underbrace{(\sum y_i)(\sum x_i)^2}_{\text{termi 2}}
-\underbrace{N(\sum x_i)(\sum x_i y_i)}_{\text{termi 3}}
+\underbrace{(\sum x_i)^2(\sum y_i)}_{\text{termi 4}} .
$$

Huomaa: **termi 2** ja **termi 4** kumoavat toisensa. Jaa osoittaja ja nimittäjä $N$:llä:
$$
b=\frac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}.
$$

Siis
$$
\boxed{\,b=\dfrac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}
\;=\; \bar y - a\,\bar x\,}, \qquad
\bar x=\frac{1}{N}\sum x_i,\ \bar y=\frac{1}{N}\sum y_i .
$$

> Jos kaikki $x_i$:t ovat samat, niin $N\sum x_i^2-(\sum x_i)^2=0$: kulmakerrointa ei voida identifioida (ei $x$:n vaihtelua).

---

## 6) (Valinnainen) kovarianssiesitys

$$
a=\frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2}
=\frac{\mathrm{Cov}(x,y)}{\mathrm{Var}(x)},
\qquad
b=\bar y - a\,\bar x .
$$

---

## 7) Pieni numeerinen tarkistus

Data: $(0,1),(1,3),(2,5),(3,7)$ (todellinen suora $y=2x+1$).  
Summat: $\sum x=6,\ \sum y=16,\ \sum x^2=14,\ \sum xy=34,\ N=4$.

Laske
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}
=\frac{136-96}{56-36}=\frac{40}{20}=2,
\qquad
b=\frac{16-2\cdot6}{4}=1.
$$

Residuaalit ovat nollia $\Rightarrow$ $\text{MSE}=0$.
