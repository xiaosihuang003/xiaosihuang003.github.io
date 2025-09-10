---
title: "Machine Learning 4: Neuroverkot"
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

## Osa 5 : Lineaarisesta epälineaariseen — Logistiikka, häviö & Gradienttilasku

![Board notes](/images/docs/mlLecture4_Neuralnetworks/6.png)

### 5.1 Aktivointifunktiot
- Siirtyäksemme lineaarisesta regressiosta eteenpäin käytämme epälineaarisia aktivointeja:  
  - **Sigmoid (logistinen):**  
    $$\sigma(z) = \frac{1}{1+e^{-z}} \quad \in (0,1)$$  
  - **Tanh:**  
    $$\tanh(z) \in (-1,1)$$  
  - Lineaarinen (identiteetti), ReLU jne. (myöhemmät kehitykset).  

### 5.2 Häviöfunktiot
- Regressio: Keskivirhe (MSE)  
  $$L = \frac{1}{N} \sum (y - \hat{y})^2$$  
- Luokittelu: Ristiinentropia (esitellään myöhemmin).  

### 5.3 Gradienttilasku
- Laske häviön gradientti painojen suhteen:  
  $$\nabla_w L = \left( \frac{\partial L}{\partial w_1}, \frac{\partial L}{\partial w_2}, … \right)$$  
- Päivityssääntö:  
  $$
  w^{(t+1)} = w^{(t)} - \eta \, \nabla_w L
  $$
- $\eta$: oppimisnopeus — liian suuri → divergenssi, liian pieni → hidas oppiminen.  
- **Oppimisnopeuden säätö** auttaa konvergenssia.  

### 5.4 Universaalin approksimaation teoreema
- Kunhan on vähintään **yksi piilokerros** ja epälineaarinen aktivointi, neuroverkko voi approksimoida *minkä tahansa* funktion (Cybenko 1989).  

### 5.5 Monikerroksiset perceptronit & Takaisinlevitys
![Board notes](/images/docs/mlLecture4_Neuralnetworks/7.png)

- **Yksittäinen LTU** ei voi ratkaista ongelmia kuten XOR.  
- Ratkaisu: yhdistetään useita neuroneja **monikerroksiseksi perceptroniksi (MLP)**.  
  - Esim.: kaksi piiloneuronia ($y_1, y_2$), jotka syötetään ulostuloneuroniin.  
  - Tämä rakenne mahdollistaa epälineaariset päätösrajat.  

- **Häviöfunktio**: edelleen MSE.  
- **Koulutushaaste**: kuinka päivittää piilokerrosten painot?  

➡️ **Takaisinlevitysalgoritmi**  
- Lasketaan ulostulovirhe (ennusteen ja tavoitteen ero).  
- Levitetään virhe taaksepäin ketjusäännön avulla.  
- Päivitetään kaikki painot (syöte → piilo, piilo → ulostulo) gradienttilaskulla.  

Tämä läpimurto 1970–80-luvuilla mahdollisti syvien verkkojen käytännön koulutuksen ja voitti XOR-rajoituksen.  

### 5.6 Moniluokkainen luokittelu

![Board notes](/images/docs/mlLecture4_Neuralnetworks/8.png)

- Tähän asti tarkastelimme vain **binääriluokitusta** (0/1).  
- **Moniluokkaongelmissa (N luokkaa)**:  
  - Ulostulokerroksessa on **N neuronia**, yksi jokaista luokkaa varten.  
  - Esim.: 3 luokkaa → ulostulo = $(y_1, y_2, y_3)$.  
- **Opetustiedot** esitetään **one-hot-koodauksella**:  
  - Luokka 1 → (1, 0, 0)  
  - Luokka 2 → (0, 1, 0)  
  - Luokka 3 → (0, 0, 1)  
- Koulutuksessa:  
  - Forward pass: lasketaan kaikkien luokkien ulostulot.  
  - Häviö: usein **ristiinentropia** softmax-aktivoinnilla.  
  - Backward pass: levitetään virhe taaksepäin kaikkien painojen läpi takaisinlevityksellä.  

➡️ Tämä yleistys mahdollistaa sen, että neuroverkot voivat käsitellä **mitä tahansa määrää luokkia**.  

---

## Osa 6 : Harjoitusta kehyksillä — TensorFlow & PyTorch

![Board notes](/images/docs/mlLecture4_Neuralnetworks/9.png)

### 6.1 TensorFlow vs. PyTorch
- Molemmat ovat **nykyaikaisia syväoppimiskehyksiä**.  

- **TensorFlow (Google)**  
  - Valittu tälle kurssille *“monimuotoisuuden vuoksi.”*  
  - `Sequential` API on hyvin yksinkertainen: voit lisätä kerroksia yksi kerrallaan.  
  - Hyvä **ensimmäiseksi neuroverkko-demoksi** (esim. lineaarinen regressio).  
  - Asennus voi antaa *“pieniä virheitä”*, mutta se toimii silti.  

- **PyTorch (Meta/Facebook)**  
  - *“PyTorch on minusta tulossa paljon suositummaksi kuin TensorFlow.”*  
  - Joustavampi ja lähempänä raakaa Pythonia, parempi monimutkaisille malleille.  
  - *“PyTorch on opettavaisempi, mutta myös vaikeampi.”*  
  - Käytetään myöhemmin **Deep Learning -kurssilla**.  

- **Yhteenveto**  
  - **TensorFlow** → helpompi, aloittelijaystävällinen, hyvä demoihin.  
  - **PyTorch** → suositumpi tutkimuksessa, joustava, opettavampi mutta vaikeampi.  

- Lainaus luennolta:  
  > *“Kukaan ei tee takaisinlevitystä käsin, paitsi jos haluat oppia. Oikeassa työssä käytämme TensorFlow’ta tai PyTorchia.”*  

---

### 6.2 Yksinkertainen regressio yhdellä neuronilla
- Malli: `Dense(units=1, activation="linear")`  
- Optimointimenetelmä: SGD (stokastinen gradienttilasku).  
- Häviö: MSE.  
- Koulutus (`fit`) näyttää virheen vähenevän epookkien aikana.  
- ✅ Oppii regressiosuoran (kuten lineaarinen regressio).  

---

### 6.3 Monikerroksinen perceptron (MLP) regressio
- Tehtävä: approksimoida **sinimuotoinen aalto**.  
- Syöte: $t$ (aika).  
- Piilokerros: 50 neuronia, **sigmoid-aktivointi**.  
- Ulostulo: $y \approx \sin(t)$.  
- Demonstroi **Universaalin approksimaation teoreeman**:  
  - Riittävällä määrällä neuroneja, jo yksi piilokerros voi approksimoida minkä tahansa funktion.  
- Koulutus vaatii **oppimisnopeuden** ja **epookkien** säätämistä virheen ja oskillaatioiden vähentämiseksi.  

---

### 6.4 Luokittelu-esimerkki
- Tehtävä: luokitella “**Hobitit vs. Haltijat**.”  
- Ulostulokerros: 2 neuronia (binääriluokittelu).  
- Tunnisteet koodataan **one-hot-koodauksella**:  
  - Hobitti → (1,0)  
  - Haltija → (0,1)  
- Häviö: ristiinentropia.  
- Tarkkuus paranee koulutuksen aikana (esim. 86% → 92%).  

---

### 6.5 Kotitehtävä
- Kokeile kouluttaa omia neuroverkkojasi **TensorFlow’ssa**.  
- Kokeile:  
  - Eri oppimisnopeuksia.  
  - Useampia epookkeja.  
  - Lisää piiloneuroneja/kerroksia.  
- Haaste: päihitä **Hebbin oppimisen** ja opettajan demojen tarkkuus.  

---

## Yhteenveto

1. **Aivoista neuroverkkoihin**  
   - Neuroverkot on inspiroitu biologisista neuroneista: syötteet, painot (synapsit), summaus ja aktivoinnit.  
   - Aivot osoittavat yhteyksien voiman (~$10^{13}$ synapsia).  

2. **Aalto 1 (1943): Lineaariset kynnysyksiköt**  
   - McCulloch & Pitts osoittivat, että yksittäiset neuronit voivat toteuttaa logiikkafunktioita (AND, OR, NAND).  
   - Mutta niillä ei ollut oppimismekanismia.  

3. **Aalto 2 (1949): Hebbin oppiminen**  
   - Toi ajatuksen painojen säätämisestä virheen perusteella.  
   - Varhainen oppimismuoto, mutta herkkä oppimisnopeudelle ja konvergenssille.  

4. **Yhden neuronin rajat (XOR)**  
   - Perceptron voi ratkaista vain lineaarisesti erotettavia ongelmia.  
   - XOR paljasti tämän rajoituksen → johti skeptisyyteen ja toiseen AI-talveen.  

5. **Epälineaariset aktivoinnit & Takaisinlevitys**  
   - Logistinen/sigmoid, tanh ja muut aktivoinnit mahdollistavat epälineaariset päätösrajat.  
   - Takaisinlevitys (1970–80-luvuilla) mahdollisti monikerroksisten perceptronien kouluttamisen.  
   - Universaalin approksimaation teoreema (1989): yksi piilokerros riittää minkä tahansa funktion approksimointiin.  

6. **Nykyaikainen käytäntö: TensorFlow & PyTorch**  
   - TensorFlow: helppo käyttää, hyvä demoihin, käytetään tällä kurssilla.  
   - PyTorch: joustava, suositumpi tutkimuksessa, käytetään syväoppimiskurssilla.  
   - Kehykset tekevät regressioiden, luokitusten ja monikerrosverkkojen kouluttamisesta käytännöllistä ja skaalautuvaa.  

