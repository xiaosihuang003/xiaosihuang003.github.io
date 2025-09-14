---
title: "(Databricks) Fashion-MNIST: Kaksikerroksinen MLP-perusmalli + MLflow"
date: 2025-09-14
tags: ["machine-learning","tensorflow","keras","mlflow","classification","mnist"]
excerpt: "MLP-peruslinja Fashion-MNISTille: data, malli, koulutusprotokolla, mittarit, virheanalyysi ja tuotokset."
---

## Tiivistelmä
Toteutettiin kaksikerroksinen monikerrosperceptron (MLP) -perusmalli Fashion-MNIST-kuvaluokittelutehtävään. Putki sisältää esikäsittelyn (normalisointi, 28×28→784 litistys, stratifioitu 90/10 koulutus/validointi-jako), mallin arkkitehtuurin (Dense-256 ja Dense-128, BatchNorm ja Dropout), koulutuskonfiguraation (Adam-optimointialgoritmi, ReduceLROnPlateau, EarlyStopping) sekä arvioinnin. Parametrit, metriikat ja artefaktit (koulutus/validointikäyrät, sekaannusmatriisi ja testiennusteet) kirjataan MLflow:hun. Malli saavuttaa 0.846 tarkkuuden testijoukossa ja toimii vertailukohtana myöhemmille CNN- tai upotusmalleille.

---

## Databricks-demo

![Notebook snapshot & curves](/images/projects/project4/1.png)

---

## 1. Aineisto ja tavoite
- **Aineisto**: Fashion-MNIST, 60 000 koulutuskuvaa ja 10 000 testikuvaa, **28×28** harmaasävyä, **10** luokkaa.  
- **Tehtävä**: Moniluokkainen kuvaluokittelu.  
- **Päätunnusluku**: Tarkkuus erillisessä testijoukossa.

---

## 2. Menetelmä

### 2.1 Esikäsittely
- Muunna pikseliarvot **float32**-muotoon ja skaalaa ne välille **[0, 1]**.  
- Litistä 28×28 kuvat **784-ulotteisiksi** vektoreiksi.  
- Luo **stratifioitu** 90/10 koulutus/validointi-jako alkuperäisestä koulutusdatasta.

### 2.2 Mallin arkkitehtuuri
Kompakti MLP, jossa on batch-normalisointi ja dropout:
```bash
    Input(784)
     → Dense(256) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(128) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(10, softmax)
```

### 2.3 Koulutusprotokolla
- **Optimointialgoritmi**: Adam (alkuoppimisnopeus 1e-3).  
- **Häviöfunktio**: Harva kategorinen ristientropia.  
- **Eräkoko**: 256; **epochit**: enintään 20.  
- **Takaisinkutsut**:  
    - `ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, min_lr=1e-6)`  
    - `EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)`

### 2.4 Kokeiden seuranta (MLflow)
Kirjatut parametrit: piilokerrosten koot, dropout-prosentti, optimointialgoritmi, epochit, eräkoko.  
Kirjatut metriikat: koulutus/validointi/testi-tarkkuus.  
Artefaktit: koulutuskäyrät (häviö ja tarkkuus), sekaannusmatriisi ja `PRED_mlp.dat`.

---

## 3. Tulokset

### 3.1 Tarkkuus
| Joukko | Tarkkuus |
|:--|:--:|
| Koulutus | **0.864** |
| Validointi | **0.859** |
| Testi | **0.846** |

Havainto: oppimiskäyrät osoittavat vakaata konvergenssia ja maltillista säännöllistämistä; validointi- ja testitulokset ovat lähellä toisiaan, mikä viittaa vähäiseen ylioppimiseen.

### 3.2 Virheanalyysi
Sekaannusmatriisi korostaa odotettuja epäselviä pareja:
- **T-shirt/top ↔ Shirt**
- **Coat ↔ Pullover**  
Nämä luokat ovat visuaalisesti samankaltaisia matalalla resoluutiolla; CNN- tai upotusmallit voivat vähentää näitä sekaannuksia.

---

## 4. Tuotokset (Artefaktit)
- **`PRED_mlp.dat`** — 10 000 kokonaislukutunnistetta (mallin ennusteet testijoukossa)。  
- **`mlp_training_curve.png`** — koulutus vs. validointi **häviö**.  
- **`mlp_training_curve_acc.png`** — koulutus vs. validointi **tarkkuus**.  
- **`mlp_confusion_matrix.png`** — sekaannusmatriisi。  

> Julkisessa hostauksessa nämä artefaktit on peilattu verkkosivurepoon linkkien vanhenemisen välttämiseksi。

---

## 5. Toistettavuus
- Dataloader tukee molempia yleisiä pickle-muotoja：  
  1) `((x_train, y_train), (x_test, y_test))` **tai**  
  2) neljä peräkkäistä dumppia `x_train, y_train, x_test, y_test` (luetaan kunnes `EOFError`)。  
- Kun luetaan DBFS:stä tavallisella Python I/O:lla, käytä **`/dbfs/...`** -etuliitettä (ei `dbfs:/...`)。  
- Kiinnitä kaikki satunnaissiement ( `numpy`, `tensorflow` ) parantaaksesi toistettavuutta。

---

## 6. Rajoitukset ja laajennukset
- **Kapasiteetti**: Täysin kytketyt kerrokset raakapikseleillä eivät hyödynnä tilarakennetta; suorituskyky kyllästyy noin 85 %:ssa。  
- **Seuraavat askeleet**:  
  - Korvaa MLP **pienellä CNN:llä** (2–3 konvoluutiolohkoa) saavuttaaksesi **90%+**, säilyttäen saman MLflow-seurannan。  
  - Kokeile **whitening / PCA** -esikäsittelyä tai **opittuja upotuksia**; arvioi hakupohjaiset peruslinjat。  
  - Lisää **kalibrointi** ja **luokkakohtaiset metriikat** täydellisempää laadun kuvausta varten。

---

## 7. Valitut hyperparametrit
```bash
    hidden1=256, hidden2=128, dropout=0.2
    optimizer=Adam(lr=1e-3), batch_size=256, epochs=20
    callbacks = ReduceLROnPlateau, EarlyStopping
```

---

## 8. Yhteenveto
Fashion-MNISTille on luotu kompakti, hyvin instrumentoitua perusmalli, joka saavuttaa **0.846 testitarkkuuden** ja tarjoaa täydellisen kokeiden jäljitettävyyden **MLflow**:n avulla。Tämä raportti ja viedyt artefaktit määrittävät selkeän vertailukohdan myöhemmille malli-iteroinneille (CNN, upotukset, hakupohjaiset menetelmät) säilyttäen vertailtavuuden ja auditoitavuuden。
