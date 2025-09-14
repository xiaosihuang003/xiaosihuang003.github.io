---
title: "(Databricks) Fashion-MNIST k-NN-baslinje"
date: 2025-09-13
tags: ["machine-learning","databricks","knn","pca"]
excerpt: "En enkel och transparent baslinje för bildklassificering samt en praktisk studie av hastighet kontra noggrannhet."
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

### Vad byggde jag?
En enkel bildklassificerare som känner igen klädesplagg genom att hitta de mest liknande träningsbilderna (k-Nearest Neighbors), plus ett snabbare steg (PCA) som behåller noggrannheten men kortar körtiden med cirka 2,3×.

---

## Varför är detta viktigt?
- Du behöver en **tillförlitlig baslinje** innan du provar mer komplexa modeller.  
- k-NN är **transparent** (ingen träning): ”hitta de närmaste bilderna och kopiera deras etikett”.  
- PCA **komprimerar** bilder till färre, informativa tal så att sökningen går snabbare.

---

## Data & miljö
- Dataset: Fashion-MNIST (60k träning / 10k test, 28×28 gråskala, 10 klasser)  
- Mål: förutsäga klädeskategori för varje testbild  
- Mått: noggrannhet (accuracy)  
- Plattform: Databricks Community Edition (Python, NumPy, scikit-learn, MLflow)

<div class="spacer"></div>
<a class="btn" href="https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/1262134940925609/2502558802654417/3858847372272760/latest.html" target="_blank" rel="noreferrer">Visa notebook</a>

> Obs: Databricks ”Publish”-länkar går ut efter 6 månader. Behåll en statisk HTML-kopia i ditt repo för långsiktig åtkomst.

---

## Hur fungerar det?
1) Platta ut varje 28×28-bild till 784 tal och skala till [0,1].  
2) k-NN (L2-avstånd): för en ny bild, hitta de **k mest liknande** träningsbilderna; rösta på deras etiketter.  
3) PCA (valfritt): reducera 784 → 50/100/200 för att snabba upp sökningen med minimal noggrannhetsförändring.  
4) Batchning: beräkna avstånd i omgångar för att spara minne.  
5) Spårning: använd MLflow för att logga parametrar (k, PCA-d), noggrannhet och artefakter.

---
<br />

## Resultat i korthet
- Hur bra är ~85 %? Slumpgissning är 10 % (10 klasser). Ett litet CNN kan nå 90 %+.
  Denna baslinje är enkel och transparent och ger en stabil utgångspunkt.

<br />

### k-NN (ingen PCA, 784D)

| k | Noggrannhet |
|:-:|:-----------:|
| 1 | 0.8497      |
| 3 | 0.8541      |
| 5 | 0.8554      |

<br />

### PCA + 1-NN (ända-till-ända-tid)  
*Total tid = PCA (anpassning + transformering) + 1-NN-sökning.*

<div class="table-wrap">

| Metod               | Noggrannhet | Total tid |
|---------------------|:-----------:|:---------:|
| RAW 1-NN (784D)     | 0.8497      | 22.11s    |
| PCA-50 + 1-NN       | 0.8423      | 8.46s     |
| PCA-100 + 1-NN      | 0.8491      | 9.52s     |
| PCA-200 + 1-NN      | 0.8522      | 14.86s    |

</div>

<br />

**Viktiga slutsatser**
- PCA-100 ger nästan samma noggrannhet som råa 784D men är ~2,3× snabbare (22.1s → 9.5s).  
- PCA-200 ger en liten noggrannhetsvinst till priset av extra tid.  
- Val av k=3/5 (majoritetsröstning) förbättrar stabilitet och noggrannhet.

<br />

---

## Databricks-demo
Konfusionsmatris (k=5) — mörkare diagonal är bättre; icke-diagonala celler visar vanliga sammanblandningar (T-shirt/top vs skjorta, rock/kappa vs tröja).

![Confusion matrix for Fashion-MNIST, k=5](/images/projects/project3/1.png)

---

## Sammanfattning
- Minnessäker batchning av parvisa avstånd (undvik en fullständig 10k×60k-matris).  
- PCA-pipeline med randomiserad SVD; ända-till-ända-tidtagning.  
- MLflow-spårning av experiment (k, PCA-d, mått och artefakter).

## Begränsningar & nästa steg
- k-NN skalar dåligt på mycket stora datamängder → prova FAISS (ANN) eller en kompakt CNN.  
- Utforska L1-avstånd, PCA-whitening eller inlärda inbäddningar.

</div>
