---
title: "(Databricks) Fashion-MNIST: k-NN-baseline + PCA-akselerasjoner"
date: 2025-09-13
tags: ["machine-learning","databricks","knn","pca"]
excerpt: "En enkel og transparent baseline for bildeklassifisering, samt en praktisk studie av hastighet vs. nøyaktighet."
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

### Hva bygde jeg ?
En enkel bildeklassifikator som gjenkjenner klesplagg ved å finne de mest like treningsbildene (k-Nearest Neighbors), pluss et hastighetsgrep (PCA) som bevarer nøyaktigheten og kutter kjøretiden med omtrent 2,3×.

---

## Hvorfor er dette viktig ?
- Du trenger en **pålitelig baseline** før du prøver mer komplekse modeller.  
- k-NN er **transparent** (ingen trening): «finn de nærmeste bildene og kopier etiketten deres».  
- PCA **komprimerer** bilder til færre, informative tall slik at søket går raskere.

---

## Data & oppsett
- Datasett: Fashion-MNIST (60k trening / 10k test, 28×28 gråtoner, 10 klasser)  
- Mål: forutsi kleskategorien for hvert testbilde  
- Måltall: nøyaktighet  
- Plattform: Databricks Community Edition (Python, NumPy, scikit-learn, MLflow)

<div class="spacer"></div>
<a class="btn" href="https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/1262134940925609/2502558802654417/3858847372272760/latest.html" target="_blank" rel="noreferrer">Vis notebook</a>

> Merk: Databricks «Publish»-lenker utløper etter 6 måneder. Behold en statisk HTML-kopi i repoet for langsiktig tilgang.

---

## Hvordan fungerer det ?
1) Flat ut hvert 28×28-bilde til 784 tall og skalér til [0,1].  
2) k-NN (L2-avstand): for et nytt bilde, finn de **k mest like** treningsbildene; stem over etikettene deres.  
3) PCA (valgfritt): reduser 784 → 50/100/200 for å akselerere søk med minimal nøyaktighetsendring.  
4) Batch-ing: beregn avstander i puljer for å spare minne.  
5) Sporing: bruk MLflow til å logge parametere (k, PCA-d), nøyaktighet og artefakter.

---
<br />

## Resultater i korte trekk
- Hvor bra er ~85 %? Tilfeldig gjetning er 10 % (10 klasser). Et lite CNN kan nå 90 %+.  
  Denne baselinen er enkel og transparent, og gir et solid utgangspunkt.

<br />

### k-NN (uten PCA, 784D)

| k | Nøyaktighet |
|:-:|:-----------:|
| 1 | 0.8497      |
| 3 | 0.8541      |
| 5 | 0.8554      |

<br />

### PCA + 1-NN (ende-til-ende-tid)  
*Total tid = PCA (fit+transform) + 1-NN-søk.*

<div class="table-wrap">

| Metode             | Nøyaktighet | Total tid |
|--------------------|:-----------:|:---------:|
| RAW 1-NN (784D)    | 0.8497      | 22.11s    |
| PCA-50 + 1-NN      | 0.8423      | 8.46s     |
| PCA-100 + 1-NN     | 0.8491      | 9.52s     |
| PCA-200 + 1-NN     | 0.8522      | 14.86s    |

</div>

<br />

**Viktige poeng**
- PCA-100 gir nesten samme nøyaktighet som rå 784D, men er ~2,3× raskere (22.1s → 9.5s).  
- PCA-200 gir en liten nøyaktighetsgevinst til kostnad av mer tid.  
- Å velge k=3/5 (flertallsavstemming) forbedrer stabilitet og nøyaktighet.

<br />

---

## Databricks-demo
Konfusjonsmatrise (k=5) — mørkere diagonal er bedre; utenom-diagonale ruter viser vanlige forvekslinger (T-shirt/top vs Shirt, Coat vs Pullover).

![Confusion matrix for Fashion-MNIST, k=5](/images/projects/project3/1.png)

---

## Sammendrag
- Minnevennlig batching for parvise avstander (unngå en full 10k×60k-matrise).  
- PCA-pipeline med randomisert SVD; ende-til-ende-tidsmåling.  
- MLflow-logging av eksperimenter (k, PCA-d, metrikker, artefakter).

## Begrensninger & neste steg
- k-NN skalerer dårlig på svært store datasett → prøv FAISS (ANN) eller et kompakt CNN.  
- Utforsk L1-avstand, PCA-whitening eller lærte embeddinger.

</div>
