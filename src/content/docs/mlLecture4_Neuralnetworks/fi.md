---
title: "ML_4: Neuroverkot"
subtitle: "DATA.ML.100 · Joni Kämäräinen · To 4.9.2025 TB104 😊"
date: "2025-09-08"
lang: "fi"
excerpt: "Neuroverkkojen perusteet: biologisesta inspiraatiosta LTU:ihin, Hebbin oppimiseen, XOR-rajoituksiin, epälineaarisiin aktivointeihin, takaisinlevitykseen ja nykyaikaisiin kehyksiin (TensorFlow & PyTorch)."
tags: ["Joni Kämäräinen", "koneoppiminen", "neuroverkot", "TensorFlow", "PyTorch"]
draft: false
---

## Osa 1 : Aivoista neuroverkkoihin

![Board notes](/images/docs/mlLecture4_Neuralnetworks/1.png)

### 1.1 Miksi tutkia neuroverkkoja?
- Kun insinöörit kohtaavat pullonkauloja, he lainaavat usein ideoita muista tieteistä (biologia, ihmistieteet jne.).  
- Ihmisen aivot ovat älykkäin "tietokone", jonka tunnemme, ja ne toimivat koneoppimisen inspiraationa.  

### 1.2 Aivot ja evoluutio
- Aivojen koko on rajoitettu **kallon / synnytyskanavan** vuoksi – ne eivät voi kasvaa loputtomiin.  
- Myös ravinnon saatavuus vaikuttaa evoluutioon (esim. saarten populaatiot pienenevät).  
- Hermosolujen määrä eri lajeissa:
  - Meritähdellä: ~500  
  - Iilimadolla: ~10,000  
  - Banaanikärpäsellä: ~100,000  
  - Torakalla: ~1,000,000  
  - Kilpikonnalla: ~10,000,000  
  - Hamsterilla: ~100,000,000  
  - Pöllöllä: ~1,000,000,000  
  - Gorillalla: ~30,000,000,000  
  - Ihmisellä: ~100,000,000,000  
- Tärkeintä ei ole vain hermosolujen määrä, vaan **yhteyksien määrä** (~$10^{13}$ synapsia ihmisaivoissa).  

### 1.3 Biologisen hermosolun rakenne
- **Dendriitit** = syötteet ($x_1, x_2, …$)  
- **Synapsit** = painot (voivat kiihdyttää tai estää)  
- **Solukeskus (soma)** = laskentayksikkö (kuten lineaarinen malli + aktivointifunktio)  
- **Aksoni** = lähtö ($y$)  

➡️ **Keinotekoinen neuroni = Syötteet × Painot → Summataan → Aktivointifunktio → Ulostulo**

### 1.4 Huomioita
- Biologiset neuronit välittävät signaaleja **piikkeinä**, kun taas keinotekoiset neuronit käyttävät jatkuvia arvoja.  
- Tämä johtaa uusiin tutkimusalueisiin kuten:  
  - **Spiking Neural Networks (SNNs)**  
  - **Neuromorfiset sirut**

### 1.5 Keinotekoinen neuroni lineaarisena mallina
- Keinotekoinen neuroni voidaan kuvata **lineaariseksi malliksi**: painotettujen syötteiden summa + bias.  
- Tämä liittyy suoraan siihen, mitä olemme opiskelleet **lineaarisessa regressiossa** ja **luokittelussa**.  
- Nämä aiheet toimivat perustana neuroverkkojen ymmärtämiselle.  

---

## Osa 2 : Lineaarinen malli ja ensimmäinen neuroverkkoaalto (1943)

![Board notes](/images/docs/mlLecture4_Neuralnetworks/2.png)

### 2.1 Neuroni lineaarisena mallina
- Neuroni voidaan mallintaa **syötteiden lineaarisena yhdistelmänä** + bias:  
  $$
  y = \sum_i w_i x_i + w_0
  $$
- Tämä järjestelmä voi jo suorittaa **lineaarisen regression**.  
- Luokitteluun tämä ei kuitenkaan riitä → tarvitaan kynnysfunktio tai epälineaarinen aktivointi.  

### 2.2 Kohti luokittelua
- Binääriluokittelu: vain kaksi luokkaa (0/1).  
- Ratkaisu: käytä **kynnysfunktiota** (tai myöhemmin sigmoid/logistista funktiota).  
- Koodissa:  
  - Lasketaan ensin painotettu summa.  
  - Sitten sovelletaan kynnystä (tai sigmoidia) päätöksen tekemiseksi.  

### 2.3 Historiallinen huomio — Aalto 1 (1943)
- **McCulloch & Pitts (1943): Lineaarinen kynnysyksikkö (LTU)**  
- Määritelmä:  
  $$
  y = 
    \begin{cases}
      1 & \text{jos } w_1x_1 + w_2x_2 + w_0 \geq \theta \\
      0 & \text{jos } w_1x_1 + w_2x_2 + w_0 < \theta
    \end{cases}
  $$
- Tyypillisesti $\theta = 0$.  
- Motivaatio: simuloida logiikkaporteja (digitaalisten tietokoneiden perusta).  

### 2.4 Esimerkki: AND-portti
- Syötteet: $x_1, x_2 \in \{0,1\}$  
- Haluttu tulos: $y=1$ vain kun molemmat syötteet ovat 1.  
- Painot: $w_1 = w_2 = \tfrac{2}{3},\ w_0 = -1$  

Tarkistus:  
$$
\begin{aligned}
(0,0):\ & -1<0 \ \Rightarrow y=0 \\
(1,0)\ \text{tai}\ (0,1):\ & \tfrac{2}{3}-1=-\tfrac{1}{3}<0 \ \Rightarrow y=0 \\
(1,1):\ & \tfrac{4}{3}-1=\tfrac{1}{3}>0 \ \Rightarrow y=1
\end{aligned}
$$  

✅ Toimii AND-porttina.  

### 2.5 Esimerkki: OR-portti
![Board notes](/images/docs/mlLecture4_Neuralnetworks/3.png)

- Syötteet: $x_1, x_2 \in \{0,1\}$  
- Haluttu tulos: $y=1$, jos jompikumpi syöte on 1.  
- Painot (perusversio): $w_1 = w_2 = 1,\ w_0 = -1$  
  - (0,0): $-1<0 \Rightarrow y=0$  
  - (1,0) tai (0,1): $1-1=0 \Rightarrow y=1$  
  - (1,1): $2-1=1>0 \Rightarrow y=1$  

✅ Toimii OR-porttina, mutta raja on herkkä.  

Parannus: $w_1 = w_2 = \tfrac{3}{2},\ w_0 = -1$ antaa paremman marginaalin.  

### 2.6 Kotitehtävä: NAND-portti
> Suunnittele **NAND-portti** LTU-mallilla.  
> - Vihje: NAND = NOT(AND).  
> - Aloita AND-portin painoista ja säädä niitä.  

### 2.7 Yhteenveto
- Yksinkertainen LTU sopivilla painoilla voi toteuttaa loogisia funktioita.  
- Tämä historiallinen askel osoitti, että hermoyksiköt voisivat teoriassa muodostaa laskennan perustan.  

---

## Osa 3 : Aalto 2 (1949) — Hebbin oppiminen

![Board notes](/images/docs/mlLecture4_Neuralnetworks/4.png)

### 3.1 Hebbin oppimissääntö
- Ehdotettiin painojen päivitysmekanismiksi LTU:ssa.  
- Päivityssääntö:  
  $$
  w_i^{t+1} = w_i^t + \eta (y - \hat{y}) x
  $$
- Missä:  
  - $y$ = todellinen ulostulo (ground truth)  
  - $\hat{y}$ = arvioitu ulostulo  
  - virhe = $y - \hat{y}$  
  - $\eta$ = oppimisnopeus (esim. 0.1)  

### 3.2 Oppimisdynamiikka
- Jos arvio on liian korkea → painot pienenevät.  
- Jos arvio on liian matala → painot kasvavat.  
- Ajan myötä painot konvergoivat pisteeseen, jossa $y \approx \hat{y}$.  

### 3.3 Oppimisnopeuden säätö
- Liian suuri $\eta$ voi aiheuttaa oskillaatiota (virhe ei asetu).  
- Ratkaisu: **pienennä oppimisnopeutta vähitellen** varmistaaksesi konvergenssin.  

---

## Osa 4 : Yhden neuronin rajat — XOR ja toinen talvi

![Board notes](/images/docs/mlLecture4_Neuralnetworks/5.png)

### 4.1 Lineaarinen erotettavuus
- Perceptron voi ratkaista vain ongelmat, joissa data on **lineaarisesti erotettavissa** (yksi viiva/hyper-taso jakaa luokat).  
- Esimerkki: AND, OR ovat ratkaistavissa.  

### 4.2 XOR-ongelma
- XOR-totuustaulu:  
  - (0,0) → 0  
  - (1,0) → 1  
  - (0,1) → 1  
  - (1,1) → 0  
- Ei lineaarisesti erotettavissa — yksittäinen perceptron ei voi ratkaista tätä.  

### 4.3 Toinen AI-talvi
- Vuonna 1969 Minsky & Papert osoittivat perceptronien rajoitukset (erityisesti XOR).  
- Johti skeptisyyteen ja rahoituksen vähenemiseen → “toinen talvi.”  

### 4.4 Monikerrosidea
- Biologisilla aivoilla on **monia neuroneja, jotka toimivat yhdessä**.  
- Jos yhdistämme useita neuroneja (piilokerros), XOR voidaan esittää.  
- Takaisinlevitysalgoritmi (1970–80-luvuilla) mahdollisti tällaisten verkkojen tehokkaan koulutuksen.  

---
