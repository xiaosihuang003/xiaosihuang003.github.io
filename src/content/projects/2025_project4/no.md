---
title: "(Databricks) Fashion-MNIST: To-lags MLP-baseline med MLflow"
date: 2025-09-14
tags: ["machine-learning","tensorflow","keras","mlflow","classification","mnist"]
excerpt: "En kompakt og reproduserbar MLP-baseline for Fashion-MNIST: data, modell, treningsprotokoll, metrikk, feilanalyse og leveranser."
---

## Sammendrag
En to-lags multilayer perceptron (MLP) baseline er implementert for Fashion-MNIST-bildeklassifiseringsoppgaven. Rørledningen inkluderer forhåndsprosessering (normalisering, 28×28→784 flating, stratifisert 90/10 trenings/validerings-split), modellarkitektur (Dense-256 og Dense-128 med BatchNorm og Dropout), treningskonfigurasjon (Adam-optimalisator, ReduceLROnPlateau, EarlyStopping) og evaluering. Parametere, metrikk og artefakter (trenings/valideringskurver, forvekslingsmatrise og testprediksjoner) logges med MLflow. Modellen oppnår 0.846 nøyaktighet på testsettet og fungerer som en referansebaseline for senere CNN- eller embedding-baserte modeller.

---

## Databricks-demo

![Notebook snapshot & curves](/images/projects/project4/1.png)

---

## 1. Datasett og mål
- **Datasett**: Fashion-MNIST, 60 000 treningsbilder og 10 000 testbilder, **28×28** gråskala, **10** klasser.  
- **Oppgave**: Flerklasses bildeklassifisering.  
- **Primær metrikk**: Nøyaktighet på holdt testsett.

---

## 2. Metodikk

### 2.1 Forhåndsprosessering
- Konverter pikselverdier til **float32** og skaler til **[0, 1]**.  
- Flat ut 28×28-bilder til **784-dimensjonale** vektorer.  
- Lag en **stratifisert** 90/10 trenings/validerings-split fra det originale treningssettet.

### 2.2 Modellarkitektur
En kompakt MLP med batchnormalisering og dropout:
```bash   
    Input(784)
     → Dense(256) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(128) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(10, softmax)
```

### 2.3 Treningsprotokoll
- **Optimalisator**: Adam (initial læringsrate = 1e-3).  
- **Tap**: Spars kategorisk kryssentropi.  
- **Batch-størrelse**: 256; **epoker**: opptil 20.  
- **Callbacks**:  
    - `ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, min_lr=1e-6)`  
    - `EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)`

### 2.4 Eksperimentsporing (MLflow)
Loggede parametere: skjulte lagstørrelser, dropout-rate, optimalisator, epoker, batch-størrelse.  
Loggede metrikk: trenings/validerings/test-nøyaktighet.  
Artefakter: treningskurver (tap & nøyaktighet), forvekslingsmatrise og `PRED_mlp.dat`.

---

## 3. Resultater

### 3.1 Nøyaktighet
| Split | Nøyaktighet |
|:--|:--:|
| Trening | **0.864** |
| Validering | **0.859** |
| Test | **0.846** |

Observasjon: Læringskurver viser stabil konvergens med mild regularisering; validerings- og testresultater stemmer godt, noe som tyder på begrenset overtilpasning ved denne kapasiteten.

### 3.2 Feilanalyse
Forvekslingsmatrisen fremhever de forventede tvetydighetene:
- **T-shirt/top ↔ Shirt**
- **Coat ↔ Pullover**  
Disse kategoriene er visuelt like i lavoppløselig gråskala; en CNN- eller embedding-basert modell bør redusere disse forvekslingene.

---

## 4. Leveranser (Artefakter)
- **`PRED_mlp.dat`** — 10 000 heltalls-etiketter (modellprediksjoner for testsettet)。  
- **`mlp_training_curve.png`** — trening vs. validering **tap**.  
- **`mlp_training_curve_acc.png`** — trening vs. validering **nøyaktighet**.  
- **`mlp_confusion_matrix.png`** — forvekslingsmatrise。  

> For offentlig hosting er disse artefaktene speilet i nettstedets repo for å unngå utløpte lenker。

---

## 5. Reproduserbarhetsnotater
- Datalasteren støtter begge vanlige pickle-formater：  
  1) `((x_train, y_train), (x_test, y_test))` **eller**  
  2) fire sekvensielle dump `x_train, y_train, x_test, y_test` (les til `EOFError`)。  
- Når du leser fra DBFS med standard Python I/O, bruk **`/dbfs/...`** prefiks (ikke `dbfs:/...`)。  
- Alle tilfeldige frø er fiksert (`numpy`, `tensorflow`) for å forbedre konsistens fra kjøring til kjøring。

---

## 6. Begrensninger og utvidelser
- **Kapasitet**: Fullt tilkoblede lag på rå piksler utnytter ikke romlig struktur; ytelse mettes rundt 85%。  
- **Neste steg**:  
  - Erstatt MLP med en **liten CNN** (2–3 konvolusjonsblokker) for å nå **90%+** mens MLflow-kontrakten beholdes。  
  - Prøv **whitening / PCA** forhåndsprosessering eller **lærte embeddings**; evaluer søkebaserte baselines。  
  - Legg til **kalibrering** og **klassevise metrikk** for et mer komplett kvalitetsbilde。

---

## 7. Valgte hyperparametere
```bash    
    hidden1=256, hidden2=128, dropout=0.2
    optimizer=Adam(lr=1e-3), batch_size=256, epochs=20
    callbacks = ReduceLROnPlateau, EarlyStopping
```

---

## 8. Oppsummering
En kompakt, godt instrumentert baseline for Fashion-MNIST er etablert med **0.846 testnøyaktighet** og komplett eksperimentsporbarhet via **MLflow**。Denne rapporten, sammen med eksporterte artefakter, definerer en klar referanse for senere modelliterasjoner (CNN, embeddings eller søke-tilnærminger) mens sammenlignbarhet og reviderbarhet bevares。
