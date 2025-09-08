---
title: "Tilastolliset menetelmät tekstidatan analysointiin_1"
subtitle: "Lecture 1 (September 2, 2025): Introduction and preliminaries"
date: 2025-09-04
lang: fi
excerpt: "Kurssin yleiskatsaus, käytännön asiat, miksi tekstianalyysi on tärkeää, todennäköisyyden ja koneoppimisen perusteet sekä Python/NLP-työkalupakki."
tags: ["Jaakko Peltonen","Statistical Methods for Text Data Analysis","Chain rule"]
draft: false 
---

##  Johdanto & perusteet

**Kurssin tavoite:** Oppia esittämään, mallintamaan ja analysoimaan tekstiä tilastollisin menetelmin. Ensin rakennetaan vahva pohja, myöhemmin linkitetään moderniin deep NLP:hen (embeddingit, transformerit).  
**Miksi tämä on tärkeää:** Teksti on kaikkialla (uutiset, arviot, some, laki, tiede, litteraatit…). Tilastolliset menetelmät auttavat käsittelemään kohinaa, skaalaamaan manuaaliluvun yli ja tekemään päätelmiä datan pohjalta.  
**Oppimistulokset:** Tutuiksi tulevat esitykset (vektorimallit, neuroembeddingit), prosessit (tokenisointi → lemmatisointi → piirteet), mallit (n-grammit, aihe­mallit, HMM:t, PCFG:t). Osaat itse soveltaa ydintekniikoita.  
<br />

---

## 1. Käytännön asiat & osallistuminen

### 1.1 Tapaamiset
**Tällä viikolla:** kampuksella.  
**Seuraavat pari viikkoa:** Zoom (matkan takia). Linkit Moodlessa.  
**Tallenteet:** julkaistaan luennon jälkeen (pientä editointia). Hyviä kertaamiseen, mutta suositellaan live-osallistumista.

### 1.2 Vuorovaikutus
Kysy luennolla heti jos jokin epäselvää. Moodle-keskustelut hyödyttävät kaikkia (mutta tee tehtävät itse).

### 1.3 Materiaalit & harjoitukset
Diat Moodlessa. Harjoitukset julkaistu (PDF + palautus).  
Deadline yleensä ≈ 2 viikkoa. Myöhästymiset voi hylätä tai vähentää pisteitä.  
**Vinkki:** Jupyter Notebook käy, mutta voi olla sotkuinen. Palauta myös siisti PDF ja mielellään erillinen `.py`.

### 1.4 Arviointi
**Tentti:** viimeisen luennon jälkeen, todennäköisesti joulukuussa. Uusinnat keväällä ja kesällä.  
**Painotus:** lopullinen arvosana = $0.65 \times$ tentti $+ 0.35 \times$ harjoitukset.  
**Rajapisteet:** läpi n. 40 pistettä, ylin arvosana lähellä 57:ää harjoituksissa. Tentissä 5 tehtävää × 10 pistettä.

### 1.5 Sukulaiskurssit
Rule-based NLP, Deep NLP, Deep Learning.  
Tietohaku ja puheentunnistus sukua mutta eivät fokuksessa.  
<br />

---

## 2. Teksti & tekoäly

- Tulkinta riippuu kontekstista, puuttuvista sanoista ja biasista (Carson, Orwell, Richelieu).  
- Ihmisen–koneen viestintä usein yksinkertaistetaan (lyhyet haut, SEO-tagit).  
- Skaala auttaa mutta long-tail-ongelmat säilyvät. Vastuu ja tarkkuus välttämättömiä.

### 2.1 Klassiset ajatuskokeet
**Turingin testi:** jos tuomari ei erota ihmistä koneesta, kone läpäisee.  
**Kiinalainen huone:** keskustelun läpäisy ≠ ymmärtäminen.

### 2.2 Modernit chatbotit ja LLM:t
Useita malleja (OpenAI, Google, Meta, Anthropic). Kurssilla keskitytään yhteisiin perusteisiin.

### 2.3 Pakkaus ja “ymmärrys”
**Hutter Prize:** parempi pakkaus → parempi mallinnus → enemmän ymmärrystä.  
<br />

---

## 3. Englanti & kielen vaihtelu

Sanaluokat, morfologia, syntaksi, semantiikka, pragmatiikka.  
Kieli muuttuu: kirjoitusasu, kielioppi, merkitys (esim. *nice*, *fantastic*, *meat*, *guy*).  
Fokus englannissa, tekniikat yleistyvät muihin kieliin.  
<br />

---

## 4. Todennäköisyyden perusteet

Satunnaismuuttujat isoilla ($X, Y$), arvot pienillä.

- Diskreetti: $0 \leq P(x) \leq 1$, $\sum_x P(x) = 1$  
- Jatkuva: $p(x)\geq0$, $\int p(x)\,dx=1$  
- Yhteinen: $P(x,y)$  
- Marginaali: $P(y)=\sum_x P(x,y)$ tai $P(y)=\int p(x,y)\,dx$  
- Ehto: $P(y\mid x)=\dfrac{P(x,y)}{P(x)}$  
- Ketjusääntö:  
  $$P(a,\dots,z)=P(a\mid\dots,z)\cdot P(b\mid\dots,z)\cdots P(y\mid z)\cdot P(z)$$  
- Bayes:  
  $$P(y\mid x)=\dfrac{P(x\mid y)P(y)}{P(x)}$$  

**Esim:** jos $X=$ aamun sää, $Y=$ illan sää,  
$$P(Y=\text{rain}\mid X=\text{sun})=\dfrac{P(X=\text{sun},Y=\text{rain})}{P(X=\text{sun})}$$  
<br />

---

## 5. Koneoppimisen perusteet

### 5.1 Data
Havainnot + piirteet (bag-of-words, embeddingit). Train/test-jako, cross-validation.  
Rakenne: sekvenssit, hierarkiat, korpukset.

### 5.2 Tehtävät
**Supervised:** luokittelu, regressio.  
**Unsupervised:** klusterointi, aihemallit, visualisointi.

### 5.3 Arviointi
- Regressio: $$MSE=\frac{1}{N}\sum_i(y_i-\hat y_i)^2$$  
- Luokittelu: $$\text{Error rate}=\frac{1}{N}\sum_i 1(\hat y_i\neq y_i)$$  

### 5.4 Optimointi
Gradientti ylös/alas:  
$$u \leftarrow u \pm \eta \nabla_u L$$  
Algoritmit: SGD, momentum, Adam, LBFGS.

### 5.5 Probabilistinen mallinnus
- Maksimitodennäköisyys: $$\hat\theta=\arg\max_\theta P(D\mid\theta)$$  
- MAP: $$\hat\theta=\arg\max_\theta P(D\mid\theta)P(\theta)$$  
- Posteriorinäytteet: $\theta^{(s)}\sim P(\theta\mid D)$ MCMC:llä (MH, Gibbs).  
<br />

---

## 6. Tekstistä numeroiksi

Prosessi: normalisointi → tokenisointi → lemmatisointi/stemmäys → kollokaatiot → piirteet.  
Esitykset: bag-of-words, TF-IDF, embeddingit.  
Mallit: n-grammit, aihemallit, HMM, PCFG, klusterointi, visualisointi. Myöhemmin neuroembeddingit ja transformerit.  
<br />

---

## 7. Työkalupakki

### 7.1 Ympäristö
Python ≥ 3.9 suositus. Anaconda helpottaa paketteja. Spyder muistuttaa Matlabiä. Mikä tahansa IDE käy.

### 7.2 Pakettien asennus
**pip:**  
```bash
    python -m pip install nltk numpy pandas matplotlib scikit-learn beautifulsoup4 scrapy
```
**conda:**  
```bash
    conda install nltk numpy pandas matplotlib scikit-learn
    conda install -c conda-forge beautifulsoup4 scrapy
```
### 7.3 NLTK-resurssit  
```bash
    import nltk
    nltk.download("punkt")
    nltk.download("wordnet")
    nltk.download("averaged_perceptron_tagger")
    nltk.download("stopwords")
```
### 7.4 Kirjastot
Perus: os, pickle, math, statistics, random, datetime, gzip  
Num: numpy, scipy  
Data: pandas, csv  
Plottaus: matplotlib  
Web: scrapy, beautifulsoup4  
NLP: nltk  
Deep learning myöhemmin: torch, tensorflow, keras  
<br />
---

## 8. Python-pikamuistio
```bash
**Aritmetiikka:** `+ - * / % **`  
**Muuttujat:** int, float, string, bool  
**Tutki:** `dir()`, `type(x)`, `help(obj)`  
**Ohjausrakenne:**  

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
**Tietorakenteet:**  
Tuple `(1,2,"omena")` (ei-muokattava)  
List `[1,2,3]` (muokattava)  
Dict `{"nimi":"A Beautiful Mind","vuosi":2001}`  
NumPy array `np.array([[1,2,3],[4,5,6]])`  
<br />

---

## 9. Opiskeluvinkit

Tee harjoitukset ajoissa. Käytä Moodle-keskusteluja. Pidä siisti repo: raakadata, notebookit, koodi ja raportit erillään. Harjoitukset valmistavat tenttiin.  
<br />

---

## 10. Mitä seuraavaksi

Seuraavaksi: käytännön tekstin esikäsittely, jakaumat, kollokaatiot, vektoriavaruudet, klusterointi, n-gram-mallit; myöhemmin aihemallit ja sekvenssimallit.  
<br />

---

## 11. Harjoitus 1.3 — Ketjusääntö: täydellinen todistus

Jono satunnaismuuttujia $w_1,\dots,w_N$. Jokaiselle $i$:lle vasen konteksti $Left_i=[w_1,\dots,w_{i-1}]$,  
oikea konteksti $Right_i=[w_{i+1},\dots,w_N]$.  
Tyhjä konteksti = marginaali. Olkoon $p(\emptyset)=1$.

Todistettava:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}=1.
$$

---

### Todistus A: molemmat tulot = sama yhteisjakauma

1. Ketjusääntö eteenpäin:

$$
p(w_1,\dots,w_N)
= p(w_1)\,p(w_2\mid w_1)\cdots p(w_N\mid w_1,\dots,w_{N-1})
= \prod_{i=1}^{N} p(w_i\mid Left_i).
$$

2. Ketjusääntö taaksepäin:

$$
p(w_1,\dots,w_N)
= p(w_N)\,p(w_{N-1}\mid w_N)\cdots p(w_1\mid w_2,\dots,w_N)
= \prod_{i=1}^{N} p(w_i\mid Right_i).
$$

3. Suhde:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
= \frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)}=1.
$$

---

### Todistus B: teleskooppi Bayesin avulla

Vasemman kontekstin osalta

$$
p(w_i\mid Left_i)=\frac{p(w_1,\dots,w_i)}{p(w_1,\dots,w_{i-1})}.
$$

Oikean kontekstin osalta, $R_i=(w_i,\dots,w_N)$, $Right_i=R_{i+1}$:

$$
p(w_i\mid Right_i)=\frac{p(w_i,\dots,w_N)}{p(w_{i+1},\dots,w_N)}.
$$

Siten

$$
\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_i)\,p(w_{i+1},\dots,w_N)}
{p(w_1,\dots,w_{i-1})\,p(w_i,\dots,w_N)}.
$$

Kun kerrotaan $i=1\dots N$, saadaan

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{\prod_{i=1}^{N}p(w_1,\dots,w_i)\;\prod_{i=1}^{N}p(w_{i+1},\dots,w_N)}
{\prod_{i=1}^{N}p(w_1,\dots,w_{i-1})\;\prod_{i=1}^{N}p(w_i,\dots,w_N)}.
$$

Telescoping supistaa kaiken pois: $p(\emptyset)=1$. Lopputulos:

$$
\prod_{i=1}^{N}\frac{p(w_i\mid Left_i)}{p(w_i\mid Right_i)}
=\frac{p(w_1,\dots,w_N)}{p(w_1,\dots,w_N)}=1.
$$

Q.E.D.  
<br />

---

## 12. Diakertaus ja käsitteet

![Board notes](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_1/1.png)

### 12.1 Käsitteet

Summa tai integraali = 1:

$$
\sum_k p(x=k)=1 \qquad \int p(y)\,dy=1
$$

Marginalisointi poistaa muuttujia:

$$
\sum_k p(x=k,y)=p(y)
$$

Ehtotodennäköisyys yhdistää yhteis- ja marginaalin:

$$
p(y\mid x)=\frac{p(y,x)}{p(x)}
$$

Ketjusääntö:

$$
p(a,b,c,\dots,y,z)=p(a\mid b,\dots,y,z)\cdot p(b\mid c,\dots,y,z)\cdots p(y\mid z)\,p(z)
$$

Bayes:

$$
p(y\mid x)=\frac{p(x\mid y)p(y)}{p(x)}
$$

### 12.2 Harjoitus 1.3:n yhteys

$\prod_{i=1}^{N}p(w_i\mid Left_i)$ = ketjusäännön hajotelma eteenpäin,  
$\prod_{i=1}^{N}p(w_i\mid Right_i)$ = ketjusäännön hajotelma taaksepäin.  
Suhde = 1, kuten todistettiin.  
<br />

---

## Liite A — Keskeiset kaavat

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
