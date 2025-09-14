---
title: "(Databricks) Fashion-MNIST k-NN-perusmalli"
date: 2025-09-13
tags: ["machine-learning","databricks","knn","pca"]
excerpt: "Yksinkertainen, läpinäkyvä kuvien luokittelun perusmalli ja käytännöllinen nopeus–tarkkuus -tarkastelu."
---

<style>
/* Scoped to this page */
.proj { line-height: 1.65; }
.proj h2, .proj h3 { margin-top: 2rem; }
.proj .spacer { height: 10px; }
.proj .table-wrap { overflow-x: auto; }
.proj .table-wrap table { min-width: 520px; border-collapse: collapse; }
.proj table th, .proj table td { padding: 6px 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
.proj .btn { display:inline-block; padding:6px 10px; border:1px solid currentColor; border-radius:8px; text-decoration:none; }
.proj .btn:hover { background: rgba(0,0,0,0.05); }
</style>

<div class="proj">

### Mitä rakensin?
Yksinkertainen kuvaluokitin, joka tunnistaa vaatekappaleet etsimällä kaikkein samankaltaisimmat opetuskuvat (k-Nearest Neighbors, k-NN), sekä nopeutusvaihe (PCA), joka säilyttää tarkkuuden ja lyhentää suoritusaikaa noin 2,3-kertaisesti.

---

## Miksi tämä on tärkeää?
- Ennen monimutkaisia malleja tarvitaan **luotettava peruslinja (baseline)**.  
- k-NN on **läpinäkyvä** (ei koulutusta): “etsi lähimmät kuvat ja kopioi niiden luokka”.  
- PCA **pakkaa** kuvat harvempiin mutta informatiivisiin lukuihin, jolloin haku nopeutuu.

---

## Data ja asetukset
- Aineisto: Fashion-MNIST (60k opetus / 10k testi, 28×28 harmaasävy, 10 luokkaa)  
- Tavoite: ennustaa kunkin testikuvan vaateluokka  
- Mittari: tarkkuus (accuracy)  
- Alusta: Databricks Community Edition (Python, NumPy, scikit-learn, MLflow)

<div class="spacer"></div>
<a class="btn" href="https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/1262134940925609/2502558802654417/3858847372272760/latest.html" target="_blank" rel="noreferrer">Avaa notebook</a>

> Huom.: Databricksin “Publish”-linkit vanhenevat 6 kuukaudessa. Säilytä repossa staattinen HTML pitkäaikaista käyttöä varten.

---

## Miten se toimii?
1) Litistä jokainen 28×28 kuva 784 luvuksi ja skaalaa välille [0,1].  
2) k-NN (L2-etäisyys): uudelle kuvalle etsitään **k samankaltaisinta** opetuskuvaa; niiden luokista äänestetään.  
3) PCA (valinnainen): vähennä 784 → 50/100/200 nopeuttaaksesi hakua pienellä tarkkuusmuutoksella.  
4) Erissä laskeminen (Batching): laske etäisyydet paloissa muistin säästämiseksi.  
5) Seuranta: käytä MLflow’ta parametrien (k, PCA-d), tarkkuuden ja artefaktien kirjaamiseen.

---
<br />

## Tulokset yhdellä silmäyksellä
- Kuinka hyvä ~85 % on? Satunnaisarvaus on 10 % (10 luokkaa). Pieni CNN yltää 90 %+:iin.  
  Tämä perusmalli on yksinkertainen ja läpinäkyvä, ja antaa vankan lähtötason.

<br />

### k-NN (ilman PCA:ta, 784D)

| k | Tarkkuus |
|:-:|:--------:|
| 1 | 0.8497   |
| 3 | 0.8541   |
| 5 | 0.8554   |

<br />

### PCA + 1-NN (päästä päähän -aika)  
*Kokonaisaika = PCA (sovitus + muunnos) + 1-NN-haku.*

<div class="table-wrap">

| Menetelmä           | Tarkkuus | Kokonaisaika |
|---------------------|:--------:|:------------:|
| RAW 1-NN (784D)     | 0.8497   | 22.11s       |
| PCA-50 + 1-NN       | 0.8423   | 8.46s        |
| PCA-100 + 1-NN      | 0.8491   | 9.52s        |
| PCA-200 + 1-NN      | 0.8522   | 14.86s       |

</div>

<br />

**Keskeiset havainnot**
- PCA-100 antaa lähes saman tarkkuuden kuin raakadata 784D, mutta on ~2,3× nopeampi (22.1s → 9.5s).  
- PCA-200 tuo pienen tarkkuusparannuksen lisäajalla.  
- k=3/5 (enemmistö-äänestys) parantaa vakautta ja tarkkuutta.

<br />

---

## Databricks-demo
Sekoitusmatriisi (k=5) — tummempi diagonaali on parempi; diagonaalin ulkopuoliset solut näyttävät yleiset sekaannukset (T-shirt/top vs Shirt, Coat vs Pullover).

![Confusion matrix for Fashion-MNIST, k=5](/images/projects/project3/1.png)

---

## Yhteenveto
- Muistiystävällinen parittais-etäisyyksien erälaskenta (vältetään 10k×60k -kokoinen täydellinen matriisi).  
- PCA-putki satunnaistetulla SVD:llä; päästä päähän -ajastus.  
- MLflow-kokeenseuranta (k, PCA-d, mittarit ja artefaktit).

## Rajoitukset ja seuraavat askeleet
- k-NN skaalautuu heikosti erittäin suuriin aineistoihin → kokeile FAISSia (ANN) tai kompaktia CNN:ää.  
- Tutki L1-etäisyyttä, PCA-whiteningia tai opittuja upotuksia (embeddings).

</div>
