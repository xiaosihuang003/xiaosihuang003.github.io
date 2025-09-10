---
title: "Machine Learning 3: Lineaarinen luokittelu"
subtitle: "DATA.ML.100 · Joni Kämäräinen · ma 1.9.2025 · K1704"
date: 2025-09-02
lang: fi
excerpt: "Kertaamme lineaarisen regression → yksinkertainen vertailutaso → luokittelu. k-NN (etäisyys/k/monimutkaisuus), suoran sovituksen näkökulma, askelsääntö, logistinen (sigmoidinen) ulostulo, MSE-gradientit sekä miksi ei ole analyyttista ratkaisua — pohjustus neuroverkoille."
tags: ["Joni Kämäräinen","machine-learning","linear-classification","step-function", "sigmoid-function", "logistic"]
draft: false
---
<details>
<summary><strong>Sisällysluettelo (avaa ▶️ tarvittaessa)</strong></summary>

- [Osa 1 : Viime viikon kurssin kertaus](#osa-1--viime-viikon-kurssin-kertaus)
  - [1.1 Malli ja opetusaineisto](#11-malli-ja-opetusaineisto)
  - [1.2 Virhe ja miten se ratkaistiin](#12-virhe-ja-miten-se-ratkaistiin)
  - [1.3 Miksi analyyttinen ratkaisu on tärkeä](#13-miksi-analyyttinen-ratkaisu-on-tärkeä)
  - [1.4 Minkälainen ongelma tämä on](#14-minkälainen-ongelma-tämä-on)
- [Osa 2 : Vertailutaso ja luokittelu](#osa-2--vertailutaso-ja-luokittelu)
  - [2.1 Yksinkertainen vertailutaso](#21-yksinkertainen-vertailutaso)
  - [2.2 Siirtyminen luokitteluun](#22-siirtyminen-luokitteluun)
  - [2.3 Ulostulon tyypin muutos](#23-ulostulon-tyypin-muutos)
  - [2.4 Mitä havainto on](#24-mitä-havainto-on)
- [Osa 3 : Esimerkki: Hobitit vs. haltiat](#osa-3--esimerkki-hobitit-vs-haltiat)
  - [3.1 Oppiminen opetusesimerkeistä](#31-oppiminen-opetusesimerkeistä)
  - [3.2 Örkkien ansatarina](#32-örkkien-ansatarina)
  - [3.3 Datan generointi](#33-datan-generointi)
  - [3.4 Päällekkäisyyden hyväksyminen](#34-päällekkäisyyden-hyväksyminen)
  - [3.5 Siirtyminen kaksiulotteiseen dataan](#35-siirtyminen-kaksiulotteiseen-dataan)
  - [3.6 Koulutus vs. päättely](#36-koulutus-vs-päättely)
  - [3.7 Ensimmäinen luokitteluidea](#37-ensimmäinen-luokitteluidea)
- [Osa 4 : Lähimmän naapurin luokitin](#osa-4--lähimmän-naapurin-luokitin)
  - [4.1 Nimi ja idea](#41-nimi-ja-idea)
  - [4.2 Koulutus (talleta kaikki)](#42-koulutus-talleta-kaikki)
  - [4.3 Päättely (etsi-lähin-ja-kopioi-sen-luokka)](#43-päättely-etsi-lähin-ja-kopioi-sen-luokka)
  - [4.4 Luokittelun vertailutasot](#44-luokittelun-vertailutasot)
  - [4.5 Yhteenveto](#45-yhteenveto)
- [Osa 5 : k-NN huomioita → suoran sovitus](#osa-5--k-nn-huomioita--suoran-sovitus)
  - [5.1 Mitä voimme säätää k-NN:ssä](#51-mitä-voimme-säätää-k-nnssä)
  - [5.2 Voimmeko luokitella sovittamalla suoran?](#52-voimmeko-luokitella-sovittamalla-suoran)
  - [5.3 Miten mittaamme virheen luokittelussa?](#53-miten-mittaamme-virheen-luokittelussa)
- [Osa 6 : Suoran sovituksesta askel- ja sigmoidifunktioon](#osa-6--suoran-sovituksesta-askel--ja-sigmoidifunktioon)
  - [6.1 Askel-sääntö ja erotin](#61-askel-sääntö-ja-erotin)
  - [6.2 Lähentäminen logistisella (sigmoidilla)](#62-lähentäminen-logistisella-sigmoidilla)
  - [6.3 Opetussignaali (toistaiseksi)](#63-opetussignaali-toistaiseksi)
- [Osa 7 : MSE sigmoid-ulostulolla, gradientit (askel askeleelta, selkeästi)](#osa-7--mse-sigmoid-ulostulolla-gradientit-askel-askeleelta-selkeästi)
  - [7.1 Malli, tavoitteet, häviö](#71-malli-tavoitteet-häviö)
  - [7.2 Miksi ∂zᵢ/∂b = 1 ja ∂zᵢ/∂a = xᵢ?](#72-miksi-∂zᵢ∂b--1-ja-∂zᵢ∂a--xᵢ)
  - [7.3 Sigmoidin derivaatta](#73-sigmoidin-derivaatta)
  - [7.4 Derivoi MSE (ketjusääntö)](#74-derivoi-mse-ketjusääntö)
  - [7.5 Mitä kukin tekijä tarkoittaa](#75-mitä-kukin-tekijä-tarkoittaa)
  - [7.6 Miksi ei ole suljettua ratkaisua](#76-miksi-ei-ole-suljettua-ratkaisua)

</details>

## Osa 1 : Viime viikon kurssin kertaus

![Board notes](/images/docs/Lecture3_Linearclassification/1.png)

Lähdimme liikkeelle ajatuksesta, että yksi havainto voidaan kirjoittaa funktiona $y = f(x)$. Tämä tekee siitä meille koneoppimisongelman: malli antaa ennusteen $\hat{y}$ ja vertaamme sitä todelliseen arvoon $y$.

<br />

### 1.1 Malli ja opetusaineisto

Käytimme hyvin yksinkertaista lineaarista mallia,
$$
\hat{y} = a x + b ,
$$
missä $a$ ja $b$ ovat opittavia parametreja. Kun meillä on $N$ esimerkkiä, opetusaineisto on
$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

<br />

### 1.2 Virhe ja miten se ratkaistiin

Valitaksemme $a$:n ja $b$:n minimoimme virheen todellisten arvojen ja ennusteiden välillä:
$$
\mathcal{L} = \sum_{i=1}^{N} (y_i - \hat{y}_i)^2 .
$$
Sitten asetimme gradientit nollaksi saadaksemme optimaalisen ratkaisun:
$$
\frac{\partial \mathcal{L}}{\partial a} = 0, \qquad
\frac{\partial \mathcal{L}}{\partial b} = 0 .
$$
Tämä antaa analyyttisen ratkaisun (samaa käytimme myös kotitehtävässä).

<br />

### 1.3 Miksi analyyttinen ratkaisu on tärkeä

Se on erittäin nopea laskea: sijoitamme pisteet, käytämme summia ja saamme arvion millisekunneissa. Nopeus on järkevää reaaliaikaisissa tilanteissa (luentoesimerkkinä oli lentokonejärjestelmä, joka tekee päätöksiä noin tuhat kertaa sekunnissa).

<br />

### 1.4 Minkälainen ongelma tämä on

Tuloksemme on reaaliarvo, $y \in \mathbb{R}$, joten kyseessä on **regressio-ongelma**. Regressio ilmenee jatkuvasti, ja mitä tahansa myöhemmin teemmekin, vertaamme sitä ensin lineaariseen regressioon.

---

## Osa 2 : Vertailutaso ja luokittelu

![Board notes](/images/docs/Lecture3_Linearclassification/2.png)

<br />

### 2.1 Yksinkertainen vertailutaso

Arvioidaksemme, onko lineaarinen regressiomme “riittävän hyvä”, lisäsimme ensin hyvin yksinkertaisen vertailutason: **ei opita mitään** — ennustetaan vain kaikkien opetustavoitteiden keskiarvo. Taululla tämä kirjoitettiin muodossa “$\hat{y}$ = average of all training data $y_i$”, eli
$$
\hat{y}=\frac{1}{N}\sum_{i=1}^{N} y_i .
$$
Tämän laskeminen on triviaalia, ja tällainen baseline kannattaa aina toteuttaa. Lineaarisen regression pitäisi olla selvästi parempi kuin tämä; jos ei ole, niin datassa tai prosessissa on jotain pielessä.

<br />

### 2.2 Siirtyminen luokitteluun

Tästä siirryimme toiseen tärkeään koneoppimisongelmaan: **luokittelu**. Tämän luennon pääviesti on, että sama lineaarinen sovitus voi toimia myös luokittelussa, mutta tarvitsemme muutamia pieniä temppuja.

<br />

### 2.3 Ulostulon tyypin muutos

Täällä ulostulo **ei ole reaaliluku**. Sen sijaan se on jokin **diskreeteistä arvoista** (luokista). Taululla:
$$
y \in \{1,2,3\}.
$$
Tehtävänä on siis päättää, mihin luokkaan syöte kuuluu.

<br />

### 2.4 Mitä havainto on

$x$ on havainto. Se voi olla monenlaista:
- kuva (luokan esimerkeissä käytettiin usein kuvia),
- lämpötila,
- ääni,
- tai näiden yhdistelmä.

Tyypillinen esimerkki on autonominen ajaminen: järjestelmä ottaa kuvia monta kertaa sekunnissa ja sen täytyy tunnistaa jalankulkijat, ajoneuvot ja pyöräilijät ja siirtää tiedot ajoneuvojärjestelmälle. Tämä tekee siitä luokitteluongelman, jossa käytetään diskreettejä luokkia.

---

## Osa 3 : Esimerkki: Hobitit vs. haltiat

![Board notes](/images/docs/Lecture3_Linearclassification/3.png)

<br />

### 3.1 Oppiminen opetusesimerkeistä

Meillä on edelleen malli $y = f(x)$, ja funktion $f$ parametrit opitaan opetusesimerkeistä. Tämä osa toimii samalla tavalla kuin regressio: kerää dataa ja sovi funktio.  

<br />

### 3.2 Örkkien ansatarina

Luento esitteli tarinan. Me olemme örkkejä ja meillä on ansa. Jos ansa nappaa hobitin, se on hyvä juttu, koska syömme niitä. Jos se nappaa haltian, se on vaarallista, ja olemme pulassa. Havainto $x$ voisi siis olla olennon **pituus**.  

Oletamme, että hobitit ovat lyhyempiä ja haltiat pidempiä. Tätä ominaisuutta käytämme erottelemaan heidät.  

<br />

### 3.3 Datan generointi

Simuloidaksemme oletamme, että Keski-Maassa pituuden jakauma on normaalijakauma, kuten eläinten piirteet meidän maailmassa. Generoimme viisi satunnaisotosta hobiteille ja viisi haltioille. Hobitit merkitään yhdellä värillä, haltiat toisella.  

Näytteissä huomaamme yhden hyvin pitkän hobitin ja yhden melko lyhyen haltian. Tämä tarkoittaa, että luokat eivät ole täysin erillisiä, vaan menevät päällekkäin. Todellisessa elämässä tämä on tyypillistä, ja se tarkoittaa, että emme voi odottaa 100 % luokittelutarkkuutta.  

<br />

### 3.4 Päällekkäisyyden hyväksyminen

Koska luokat menevät päällekkäin, meidän täytyy sallia virheitä. Riippumatta järjestelmästä, joitakin virheitä tapahtuu.  
- Esimerkki: syövän havaitsemisessa kaikkia syöpiä ei voida havaita, ja joskus terveet näytteet luokitellaan väärin syöpäisiksi.  

Siksi luokittelussa on hyväksyttävä tietty virheaste.  

<br />

### 3.5 Siirtyminen kaksiulotteiseen dataan

Tähän asti olemme käyttäneet vain yhtä ominaisuutta: pituutta. Mutta voisimme lisätä toisen, kuten painon. Oletus: hobitit voivat olla lyhyempiä ja painavampia, kun taas haltiat pidempiä ja hoikempia.  

Se antaa meille **kaksiulotteisen datan**:  
- $x_1 =$ pituus  
- $x_2 =$ paino  

Nyt jokainen opetuspiste on pari $(x_1, x_2)$, ja $y$ on luokittelutunnus. Opetusaineistossa voimme antaa numeeriset tunnukset, esim. $y=0$ hobitille ja $y=1$ haltiolle.  

<br />

### 3.6 Koulutus vs. päättely

Koneoppimisessa erotamme yleensä kaksi vaihetta:  
1. **Koulutus** — opitaan mallin parametrit merkityistä esimerkeistä.  
2. **Päättely** — testataan mallia uudella näytteellä luokan päättämiseksi.  

Jos siis uusi piste tulee sisään, tehtävä on päättää, onko se hobitti vai haltia.  

<br />

### 3.7 Ensimmäinen luokitteluidea

Luento näytti taululla uuden näytteen. Opiskelijat miettivät, miten se luokiteltaisiin. Intuitiivinen vastaus oli: luokittele hobitiksi, koska se on hyvin lähellä muita hobittipisteitä.  

Tämä johtaa luonnollisesti yhteen ensimmäisistä luokittelumenetelmistä: käytetään läheisyyttä opetusesimerkkeihin.

---

## Osa 4 : Lähimmän naapurin luokitin

![Board notes](/images/docs/Lecture3_Linearclassification/4.png)

<br />

### 4.1 Nimi ja idea
Siirryimme “läheisyys”-intuition kautta konkreettiseen menetelmään: **lähimmän naapurin luokitin** (1-NN ja myöhemmin $k$-NN). Idea on yksinkertainen: uuden näytteen tulisi saada sama luokka kuin lähimmän opetusesimerkin.

<br />

### 4.2 Koulutus (talleta kaikki)
Koulutus on tässä triviaalia: **talletamme vain kaikki opetusesimerkit** (piirteet ja niiden luokkatunnukset). Tässä vaiheessa ei soviteta parametreja.

<br />

### 4.3 Päättely (etsi lähin ja kopioi sen luokka)
Kun uusi näyte saapuu, teemme seuraavat laskut:  
1. Laske etäisyys uuden näytteen ja **kaikkien** opetusesimerkkien välillä.  
   (Mikä tahansa järkevä etäisyys käy; tarvitsemme vain tavan verrata, kuka on lähin.)  
2. Jos etäisyys on **pienempi kuin paras tähän mennessä**, päivitä paras ja **valitse** kyseinen esimerkki.  
3. **Palauta luokkatunnus** siltä esimerkiltä, jolla on **lyhin etäisyys**.  

Siinä koko algoritmi. Toteutamme tämän Pythonilla harjoituksissa.

<br />

### 4.4 Luokittelun vertailutasot
Asetimme myös vertailutasot arvioidaksemme, onko luokitin hyvä:  
- **Satunnainen luokka** — tulosta satunnainen tunnus luokkasetistä.  
- **Yleisin luokka** — tulosta aina se tunnus, joka esiintyy useimmin opetusaineistossa.  

Toinen baseline on yleensä parempi kuin satunnainen, erityisesti kun yksi luokka **hallitsee** (esim. 99 % näytteistä on yhtä luokkaa). Jos “yleisin luokka” antaa jo 99 % tarkkuuden, menetelmämme täytyy ylittää **sen** luvun ollakseen merkityksellinen.

<br />

### 4.5 Yhteenveto
- Lähimmän naapurin algoritmi on **hyvin yksinkertainen**, mutta **yllättävän tehokas**.  
- Vertaa aina **yksinkertaiseen vertailutasoon** datallesi; se kertoo, kuinka vaikea ongelma on ja minkä suorituskyvyn meidän täytyy ylittää.

---
## Osa 5 : k-NN huomioita → suoran sovitus

![Board notes](/images/docs/Lecture3_Linearclassification/5.png)

<br />

### 5.1 Mitä voimme säätää k-NN:ssä
Kun alamme tutkia, mitä voimme muuttaa lähimmän naapurin menetelmässä, avautuu kokonaan uusi maailma:

- **Etäisyys.** Voimme valita etäisyysmitan.  
  1D:ssä euklidinen on  
  $$
  d(x,x_i)=\sqrt{(x-x_i)^2},
  $$
  ja **kaupunkilohko (L1)** -etäisyys on  
  $$
  d(x,x_i)=|x-x_i|.
  $$
  On monia muitakin etäisyyksiä; valitaan se, joka sopii datalle.

- **Naapurien määrä.** $k$ voi olla $1,3,\dots$  
  Kahdessa luokassa $k=2$ voi tasoittua (yksi hobitti, yksi haltia), joten $k=3$ välttää tasapelin.

- **Laskenta-aika.** Perus 1-NN käy läpi kaikki opetuspisteet, ja suurilla dataseteilla se voi olla hidasta. On kuitenkin olemassa **nopeita NN-menetelmiä** (usein likimääräisiä), jotka jakavat avaruuden ja nopeuttavat hakua.

- **1D vs. 2D etäisyydet k-NN:ssä:**  
  **1D:ssä** euklidinen (L2) ja kaupunkilohko (L1) yhtyvät:  
  $$
  |x-x_i|.
  $$  
  **2D:ssä ja korkeammissa ulottuvuuksissa** ne eroavat:  
  - 2D euklidinen (L2):  
    $$
    d(\mathbf{x},\mathbf{x_i})=\sqrt{(x_1-x_{i1})^2+(x_2-x_{i2})^2},
    $$
    joka tuottaa ympyränmuotoisia naapuruuksia.  
  - 2D kaupunkilohko (L1):  
    $$
    d(\mathbf{x},\mathbf{x_i})=|x_1-x_{i1}|+|x_2-x_{i2}|,
    $$
    joka tuottaa timantinmuotoisia naapuruuksia.  

  Tämä ero muuttaa **k-NN:n päätösrajat**: L2 antaa pehmeämmät, pyöreämmät rajat; L1 seuraa koordinaattiakseleita. Oikea valinta riippuu datan geometriasta.

**🤔 Kotitehtävä:** Anna 2D-pisteet, joissa **1-NN** ja **3-NN** antavat **eri** luokitukset.

<br />

### 5.2 Voimmeko luokitella sovittamalla suoran?
![Board notes](/images/docs/Lecture3_Linearclassification/6.png)

Kokeillaan esittää luokittelu **suoran sovituksena**. Annamme luokkatavoitteet
$$
y=-1 \;\text{hobitille}, \qquad y=+1 \;\text{haltialle}.
$$
Sitten sovitamme suoran
$$
\hat y = a x + b
$$
näille $(x,y)$-pareille (ihan kuten regressiossa).  
Kun suora on sovitettu, käytämme yksinkertaista **luokittelusääntöä**:
$$
\hat y < 0 \Rightarrow \text{hobitti}, \qquad
\hat y > 0 \Rightarrow \text{haltia}.
$$
Piste, jossa $\hat y=0$, on **erotin** (päätösraja).

Luokan esimerkissä sovitimme suoran ja testasimme muutamia uusia näytteitä; tällä datalla yllä oleva sääntö luokitteli ne kaikki oikein.

![Board notes](/images/docs/Lecture3_Linearclassification/7.png)

<br />

### 5.3 Miten mittaamme virheen luokittelussa?
Luokittelussa virhe on **binäärinen**:  
- jos $\hat y$ antaa **oikean** luokan ⇒ $\text{err}=0$,  
- jos $\hat y$ antaa **väärän** luokan ⇒ $\text{err}=1$.  

“Ehkä”-tuloksia ei sallita.  
Huomaa ristiriita: suoran sovitus minimoi **neliövirheen**, ei tätä 0/1-virhettä. Tämä ristiriita voi aiheuttaa ongelmia myöhemmin — korjaamme sen seuraavaksi.

---
## Osa 6 : Suoran sovituksesta askel- ja sigmoidifunktioon

![Board notes](/images/docs/Lecture3_Linearclassification/8.png)

<br />

### 6.1 Askel-sääntö ja erotin

Pidämme sovitetun suoran $\hat y = a x + b$ ja määrittelemme **erottimen** kohdassa $\hat y=0$.  
Taululla askelsääntö käytti **$\pm1$** -luokkia:

$$
y =
\begin{cases}
+1, & x > x_d,\\[4pt]
-1, & x < x_d .
\end{cases}
$$

Sama suoran etumerkillä:

$$
\hat y < 0 \Rightarrow \text{hobitti}, \qquad
\hat y > 0 \Rightarrow \text{haltia}.
$$

![Board notes](/images/docs/Lecture3_Linearclassification/9.png)

<br />

### 6.2 Lähentäminen logistisella (sigmoidilla)

Koska kova askel on epäjatkuva, käytämme sen pehmeää approksimaatiota, logistista (“logsig”):

$$
\operatorname{logsig}(x)=\frac{1}{1+e^{-x}} .
$$

Yhdistetään se suoran kanssa:

$$
\hat y \;=\; \operatorname{logsig}(a x + b)
=\frac{1}{1+e^{-(a x + b)}} .
$$

Tässä $a$ hallitsee, kuinka jyrkkä siirtymä on, ja $b$ siirtää kynnystä.  
Luokat nimetään uudelleen $[0,1]$ -alueelle (hobitti $=0$, haltia $=1$).

<br />

### 6.3 Opetussignaali (toistaiseksi)

Tällä pehmeällä ulostulolla voimme yhä minimoida **keskineliövirheen** tavoitteiden $\{0,1\}$ ja $\hat y$:n välillä sovittaaksemme $a$:n ja $b$:n.


---
## Osa 7 : MSE sigmoid-ulostulolla, gradientit (askel askeleelta, selkeästi)

![Board notes](/images/docs/Lecture3_Linearclassification/10.png)

<br />

### 7.1 Malli, tavoitteet, häviö

Malli (1D-piirre \(x\)):

$$
z_i = a x_i + b
$$

$$
\hat y_i = \sigma(z_i) = \frac{1}{1+e^{-z_i}}
$$

Tavoitteet:

$$
y_i \in \{0,1\}
$$

Keskineliövirhe (MSE):

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-\hat y_i\bigr)^2
$$

<br />

### 7.2 Miksi $ \frac{\partial z_i}{\partial b} = 1 $ ja $ \frac{\partial z_i}{\partial a} = x_i $?

Suora:

$$
z_i = a x_i + b
$$

Derivointi \(b\):n suhteen:

$$
\frac{\partial z_i}{\partial b} = 1
$$

Derivointi \(a\):n suhteen:

$$
\frac{\partial z_i}{\partial a} = x_i
$$

Eli \(b\):n muutos siirtää suoraa ylös/alas, \(a\):n muutos kallistaa sitä mittakaavalla \(x_i\).

<br />

### 7.3 Sigmoidin derivaatta

Määritelmä:

$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

Derivaatta:

$$
\frac{d\sigma}{dz}=\sigma(z)\bigl(1-\sigma(z)\bigr)
$$

<br />

### 7.4 Derivoi MSE (ketjusääntö)

Jäännös:

$$
e_i = y_i - \hat y_i
$$

Häviö jäännöksenä:

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N} e_i^{\,2}
$$

Ulkokerroksen neliön derivaatta:

$$
\frac{\partial}{\partial e_i}\bigl(e_i^{\,2}\bigr)=2e_i
$$

Jäännös vs. ulostulo:

$$
\frac{\partial e_i}{\partial \hat y_i} = -1
$$

Sigmoidiketju:

$$
\frac{\partial \hat y_i}{\partial a} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot x_i
$$

$$
\frac{\partial \hat y_i}{\partial b} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot 1
$$

Koko ketju:  

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\,x_i
$$

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

<br />

### 7.5 Mitä kukin tekijä tarkoittaa

- Jäännös:
$$
\hat y_i - y_i
$$

- Sigmoidin jyrkkyys:
$$
\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

- Syötemittakaava (vain \(a\):lle):
$$
x_i
$$

Sigmoidin keskellä (0.5) jyrkkyys on suuri → vahva oppimissignaali. Lähellä 0 tai 1 se on pieni → saturaatiota.

<br />

### 7.6 Miksi ei ole suljettua ratkaisua

Parametrit \(a,b\) ovat **sigmoidin sisällä** summassa. Nollaan asettaminen ei yksinkertaistu suljetuksi muodoksi (toisin kuin lineaarisessa regressiossa).  
Siksi meidän täytyy **iteroida**:

Oppimisnopeuspäivitys:

$$
a \leftarrow a - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
$$

$$
b \leftarrow b - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
$$

Toista kunnes häviö ei enää pienene.
