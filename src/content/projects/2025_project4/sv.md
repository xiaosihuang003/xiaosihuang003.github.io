---
title: "(Databricks) Fashion-MNIST: Tvålagers MLP-baslinje med MLflow"
date: 2025-09-14
tags: ["machine-learning","tensorflow","keras","mlflow","classification","mnist"]
excerpt: "MLP-baslinje för Fashion-MNIST: data, modell, träningsprotokoll, mätvärden, felanalys och leverabler."
---

## Sammanfattning
En tvålagers multilagerperceptron (MLP) har implementerats som baslinje för Fashion-MNIST-bildklassificeringsuppgiften. Pipelinjen inkluderar förbehandling (normalisering, 28×28→784 plattning, stratifierad 90/10 träning/valideringssplit), modellarkitektur (Dense-256 och Dense-128 med BatchNorm och Dropout), träningskonfiguration (Adam-optimerare, ReduceLROnPlateau, EarlyStopping) och utvärdering. Parametrar, mätvärden och artefakter (tränings/valideringskurvor, förväxlingsmatris och testförutsägelser) loggas med MLflow. Modellen uppnår 0.846 i testnoggrannhet och fungerar som en referensbaslinje för efterföljande CNN- eller inbäddningsmodeller.

---

## Databricks-demo

![Notebook snapshot & curves](/images/projects/project4/1.png)

---

## 1. Dataset och mål
- **Dataset**: Fashion-MNIST, 60 000 träningsbilder och 10 000 testbilder, **28×28** gråskala, **10** klasser.  
- **Uppgift**: Flervalsbildklassificering.  
- **Primärt mått**: Noggrannhet på det hållna testsetet.

---

## 2. Metodik

### 2.1 Förbehandling
- Konvertera pixelvärden till **float32** och skala till **[0, 1]**.  
- Platta ut 28×28-bilder till **784-dimensionella** vektorer.  
- Skapa en **stratifierad** 90/10 träning/valideringssplit från det ursprungliga träningssetet.

### 2.2 Modellarkitektur
En kompakt MLP med batchnormalisering och dropout:
```bash    
    Input(784)
     → Dense(256) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(128) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(10, softmax)
```

### 2.3 Träningsprotokoll
- **Optimerare**: Adam (initialt lärandehastighet 1e-3).  
- **Förlust**: Gles kategorisk korsentropi.  
- **Batchstorlek**: 256; **epoker**: upp till 20.  
- **Callbacks**:  
    - `ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, min_lr=1e-6)`  
    - `EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)`

### 2.4 Experimentspårning (MLflow)
Loggade parametrar: dolda lagrens storlek, dropoutgrad, optimerare, epoker, batchstorlek.  
Loggade mätvärden: tränings/validerings/testnoggrannhet.  
Artefakter: träningskurvor (förlust & noggrannhet), förväxlingsmatris och `PRED_mlp.dat`.

---

## 3. Resultat

### 3.1 Noggrannhet
| Dataset | Noggrannhet |
|:--|:--:|
| Träning | **0.864** |
| Validering | **0.859** |
| Test | **0.846** |

Observation: Inlärningskurvorna visar stabil konvergens med mild regularisering; validerings- och testresultat matchar nära, vilket tyder på begränsad överanpassning vid denna kapacitet.

### 3.2 Felanalys
Förväxlingsmatrisen belyser de förväntade tvetydigheterna:
- **T-shirt/top ↔ Shirt**
- **Coat ↔ Pullover**  
Dessa kategorier är visuellt lika i lågupplöst gråskala; en CNN- eller inbäddningsbaserad modell bör minska dessa förväxlingar.

---

## 4. Leverabler (Artefakter)
- **`PRED_mlp.dat`** — 10 000 heltals-etiketter (modellens förutsägelser för testsetet)。  
- **`mlp_training_curve.png`** — träning vs. validering **förlust**.  
- **`mlp_training_curve_acc.png`** — träning vs. validering **noggrannhet**.  
- **`mlp_confusion_matrix.png`** — förväxlingsmatris。  

> För offentlig hosting är dessa artefakter speglade i webbplatsens repo för att undvika länkförfall。

---

## 5. Reproducerbarhetsanteckningar
- Dataladdaren stöder båda vanliga pickle-format：  
  1) `((x_train, y_train), (x_test, y_test))` **eller**  
  2) fyra sekventiella dumpningar `x_train, y_train, x_test, y_test` (läs tills `EOFError`)。  
- När du läser från DBFS med standard Python I/O, använd **`/dbfs/...`** prefix (inte `dbfs:/...`)。  
- Alla slumpfrön är fixerade (`numpy`, `tensorflow`) för att förbättra kör-till-kör-konsistens。

---

## 6. Begränsningar och förlängningar
- **Kapacitet**: Fullt anslutna lager på råa pixlar utnyttjar inte rumslig struktur; prestanda mättas vid ca 85%。  
- **Nästa steg**:  
  - Byt ut MLP mot en **liten CNN** (2–3 konvolutionsblock) för att nå **90%+** medan samma MLflow-kontrakt bibehålls。  
  - Prova **whitening / PCA**-förbehandling eller **inlärda inbäddningar**; utvärdera sökbaserade baslinjer。  
  - Lägg till **kalibrering** och **klasspecifika mätvärden** för en fullständigare kvalitetsbild。

---

## 7. Valda hyperparametrar
```bash
    hidden1=256, hidden2=128, dropout=0.2
    optimizer=Adam(lr=1e-3), batch_size=256, epochs=20
    callbacks = ReduceLROnPlateau, EarlyStopping
```

---

## 8. Sammanfattning
En kompakt och väl-instrumenterad baslinje för Fashion-MNIST har etablerats med **0.846 testnoggrannhet** och komplett experimentspårbarhet via **MLflow**。Denna rapport tillsammans med exporterade artefakter definierar en tydlig referens för efterföljande modelliterationer (CNN, inbäddningar eller sökmetoder) och bevarar jämförbarhet och spårbarhet。
