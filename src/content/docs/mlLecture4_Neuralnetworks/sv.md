---
title: "Maskininlärning 4: Neurala nätverk"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Tors 4.9.2025 TB104 😊"
date: "2025-09-08"
lang: "sv"
excerpt: "Grunderna i neurala nätverk: från biologisk inspiration till LTU, Hebbiansk inlärning, XOR-begränsningar, icke-linjära aktiveringsfunktioner, backpropagation och moderna ramverk (TensorFlow & PyTorch)."
tags: ["Joni Kämäräinen", "maskininlärning", "neurala-nätverk", "TensorFlow", "PyTorch"]
draft: false
---

## Del 1 : Från hjärnor till neurala nätverk

![Board notes](/images/docs/mlLecture4_Neuralnetworks/1.png)

### 1.1 Varför studera neurala nätverk?
- När ingenjörer stöter på flaskhalsar lånar de ofta idéer från andra vetenskaper (biologi, humaniora, etc.).  
- Den mänskliga hjärnan är den mest intelligenta ”datorn” vi känner till och fungerar därför som inspiration för maskininlärning.  

### 1.2 Hjärnan och evolutionen
- Hjärnans storlek är begränsad av **skalle/födelsekanal** — den kan inte växa obegränsat.  
- Tillgång till mat påverkar också evolutionen (t.ex. öpopulationer som blir mindre).  
- Antal neuroner i olika arter:
  - Sjöstjärna: ~500  
  - Iglar: ~10,000  
  - Bananfluga: ~100,000  
  - Kackerlacka: ~1,000,000  
  - Sköldpadda: ~10,000,000  
  - Hamster: ~100,000,000  
  - Uggla: ~1,000,000,000  
  - Gorilla: ~30,000,000,000  
  - Människa: ~100,000,000,000  
- Viktig faktor är inte bara antalet neuroner, utan **antalet kopplingar** (~$10^{13}$ synapser i den mänskliga hjärnan).  

### 1.3 Biologisk neurons struktur
- **Dendriter** = indata ($x_1, x_2, …$)  
- **Synapser** = vikter (kan excitera eller hämma)  
- **Cellkropp (soma)** = beräkningsenhet (som en linjär modell + aktiveringsfunktion)  
- **Axon** = utdata ($y$)  

➡️ **Artificiell neuronmodell = Indata × Vikter → Summering → Aktiveringsfunktion → Utdata**

### 1.4 Anteckningar
- Biologiska neuroner skickar signaler som **spikar**, medan artificiella neuroner använder kontinuerliga värden.  
- Detta leder till framväxande områden som:  
  - **Spikande neurala nätverk (SNNs)**  
  - **Neuromorfa chip**

### 1.5 Artificiell neuron som linjär modell
- I grunden kan en artificiell neuron beskrivas som en **linjär modell**: en viktad summa av indata plus en bias.  
- Detta kopplar direkt till vad vi studerade i **linjär regression** och **klassificering**.  
- Dessa tidigare ämnen är grunden för att förstå neurala nätverk.  

---

## Del 2 : Linjär modell och den första vågen av neurala nätverk (1943)

![Board notes](/images/docs/mlLecture4_Neuralnetworks/2.png)

### 2.1 Linjär modell som en neuron
- Neuronen kan modelleras som en **linjär kombination av indata** plus en bias:  
  $$
  y = \sum_i w_i x_i + w_0
  $$
- Detta system kan redan utföra **linjär regression**.  
- För klassificering är dock linjär regression inte tillräcklig → vi behöver tröskel eller en icke-linjär aktivering.  

### 2.2 Mot klassificering
- Binär klassificering: endast två klasser (0/1).  
- Lösning: applicera en **tröskelfunktion** (eller senare sigmoid/logistisk).  
- I kod:  
  - Först beräkna den viktade summan.  
  - Sedan applicera tröskel (eller sigmoid) för att bestämma utdata.  

### 2.3 Historisk not — Vågen 1 (1943)
- **McCulloch & Pitts (1943): Linjär tröskelenhet (LTU)**  
- Definition:  
  $$
  y = 
    \begin{cases}
      1 & \text{om } w_1x_1 + w_2x_2 + w_0 \geq \theta \\
      0 & \text{om } w_1x_1 + w_2x_2 + w_0 < \theta
    \end{cases}
  $$
- Typiskt tröskelvärde $\theta = 0$.  
- Motivation: simulera logiska grindar (grunden för digitala datorer).  

### 2.4 Exempel: OCH-grind
- Indata: $x_1, x_2 \in \{0,1\}$  
- Önskad utdata: $y=1$ endast när båda indata är 1.  
- Välj vikter: $w_1 = w_2 = \tfrac{2}{3},\ w_0 = -1$  

---

## Del 3 : Vågen 2 (1949) — Hebbiansk inlärning

![Board notes](/images/docs/mlLecture4_Neuralnetworks/4.png)

### 3.1 Hebbiansk inlärningsregel
- Föreslogs som en uppdateringsmekanism för vikter i LTU.  
- Uppdateringsregel:  
  $$
  w_i^{t+1} = w_i^t + \eta (y - \hat{y}) x
  $$
- Där:  
  - $y$ = sant utdata (ground truth)  
  - $\hat{y}$ = uppskattat utdata  
  - fel = $y - \hat{y}$  
  - $\eta$ = inlärningshastighet (t.ex. 0.1)  

### 3.2 Inlärningsdynamik
- Om uppskattningen är för hög → vikterna minskar.  
- Om uppskattningen är för låg → vikterna ökar.  
- Med tiden konvergerar vikterna till en punkt där $y \approx \hat{y}$.  

### 3.3 Justering av inlärningshastighet
- Stor $\eta$ kan orsaka oscillation (felet stabiliseras inte).  
- Lösning: **minska inlärningshastigheten gradvis** för att säkerställa konvergens.  

---

## Del 4 : Begränsningar hos en enda neuron — XOR och den andra vintern

![Board notes](/images/docs/mlLecture4_Neuralnetworks/5.png)

### 4.1 Linjär separabilitet
- En perceptron kan bara lösa problem där data är **linjärt separerbar** (en linje/hyperplan delar klasserna).  
- Exempel: OCH, ELLER fungerar.  

### 4.2 XOR-problemet
- XOR sannolikhetstabell:  
  - (0,0) → 0  
  - (1,0) → 1  
  - (0,1) → 1  
  - (1,1) → 0  
- Ej linjärt separerbar — kan inte lösas med en enda perceptron.  

### 4.3 Den andra AI-vintern
- 1969: Minsky & Papert visade begränsningarna hos perceptrons (speciellt XOR).  
- Ledde till skepsis och minskad finansiering → ”andra vintern.”  

### 4.4 Idén om flerskikt
- Biologiska hjärnor har **många neuroner som arbetar tillsammans**.  
- Om vi kombinerar flera neuroner (ett dolt skikt) kan XOR representeras.  
- Backpropagation-algoritmen (1970–80-tal) möjliggjorde effektiv träning av sådana nätverk.  

---

## Del 5 : Från linjär till icke-linjär — Logistisk funktion, förlust & gradientnedstigning

![Board notes](/images/docs/mlLecture4_Neuralnetworks/6.png)

### 5.1 Aktiveringsfunktioner
- För att gå bortom linjär regression använder vi icke-linjära aktiveringar:  
  - **Sigmoid (logistisk):**  
    $$\sigma(z) = \frac{1}{1+e^{-z}} \quad \in (0,1)$$  
  - **Tanh:**  
    $$\tanh(z) \in (-1,1)$$  
  - Linjär (identitet), ReLU, etc. (senare utvecklingar).  

### 5.2 Förlustfunktioner
- Regression: Medelkvadratfel (MSE)  
  $$L = \frac{1}{N} \sum (y - \hat{y})^2$$  
- Klassificering: Korsentropi (infördes senare).  

### 5.3 Gradientnedstigning
- Beräkna gradienten av förlusten med avseende på vikterna:  
  $$\nabla_w L = \left( \frac{\partial L}{\partial w_1}, \frac{\partial L}{\partial w_2}, … \right)$$  
- Uppdateringsregel:  
  $$
  w^{(t+1)} = w^{(t)} - \eta \, \nabla_w L
  $$
- $\eta$: inlärningshastighet — för stor → divergens, för liten → långsam träning.  
- **Schemaläggning av inlärningshastighet** hjälper konvergens.  

### 5.4 Universella approximationsteoremet
- Med minst **ett dolt skikt** och icke-linjär aktivering kan ett neuralt nätverk approximera *vilken funktion som helst* (Cybenko 1989).  

### 5.5 Flerskiktsperceptron & backpropagation
![Board notes](/images/docs/mlLecture4_Neuralnetworks/7.png)

- En **enda LTU** kan inte lösa problem som XOR.  
- Lösning: kombinera flera neuroner till en **flerskiktsperceptron (MLP)**.  
  - Exempel: två dolda neuroner ($y_1, y_2$) som matar in i en utdata-neuron.  
  - Denna struktur möjliggör icke-linjära beslutsgränser.  

➡️ **Backpropagation-algoritmen**  
- Beräkna utdata-felet (skillnaden mellan prediktion och mål).  
- Propagera felet bakåt genom nätverket med hjälp av **kedjeregeln**.  
- Uppdatera alla vikter (indata → dolt, dolt → utdata) via gradientnedstigning.  

### 5.6 Flerklassklassificering

![Board notes](/images/docs/mlLecture4_Neuralnetworks/8.png)

- Hittills har vi bara beaktat **binär klassificering** (0/1).  
- För **flerklassproblem (N klasser)**:  
  - Utdatalagret har **N neuroner**, en för varje klass.  
  - Exempel: 3 klasser → utdata = $(y_1, y_2, y_3)$.  
- **Ground truth-etiketter** använder **one-hot-kodning**:  
  - Klass 1 → (1, 0, 0)  
  - Klass 2 → (0, 1, 0)  
  - Klass 3 → (0, 0, 1)  
- Under träning:  
  - Framåtpass: beräkna utdata för alla klasser.  
  - Förlust: ofta **korsentropi** med softmax i utdata.  
  - Bakåtpass: propagera felet genom alla vikter med backpropagation.  

➡️ Detta generaliserar neurala nätverk för att hantera **vilket antal klasser som helst**.  

---

## Del 6 : Praktik med ramverk — TensorFlow & PyTorch

![Board notes](/images/docs/mlLecture4_Neuralnetworks/9.png)

### 6.1 TensorFlow vs. PyTorch
- Båda är de **mest använda djupinlärningsramverken**.  

- **TensorFlow (Google)**  
  - Valdes i denna kurs *“för mångfaldens skull.”*  
  - `Sequential` API är mycket enkelt: du kan lägga till lager ett efter ett.  
  - Bra för en **första demo av neuralt nätverk** (t.ex. linjär regression).  
  - Installation kan ge *“några små fel”* men fungerar ändå.  

- **PyTorch (Meta/Facebook)**  
  - *“PyTorch är nog mer populärt än TensorFlow.”*  
  - Mer flexibelt och närmare rå Python, bättre för komplexa modeller.  
  - *“PyTorch är mer lärorikt, men också svårare.”*  
  - Kommer att användas i **Deep Learning-kursen** senare.  

- **Sammanfattning**  
  - **TensorFlow** → enklare, nybörjarvänligt, bra för demos.  
  - **PyTorch** → mer populärt i forskning, flexibelt, mer lärorikt men svårare.  

- Citat från föreläsningen:  
  > *“Ingen gör backpropagation manuellt, utom om du vill lära dig. För riktigt arbete använder vi TensorFlow eller PyTorch.”*  

---

### 6.2 Enkel regression med en neuron
- Modell: `Dense(units=1, activation="linear")`  
- Optimerare: SGD (stokastisk gradientnedstigning).  
- Förlust: MSE (medelkvadratfel).  
- Träning (`fit`) visar att felet minskar över epoker.  
- ✅ Lär sig en regressionslinje (som linjär regression).  

---

### 6.3 Flerskiktsperceptron (MLP) regression
- Uppgift: approximera en **sinusvåg**.  
- Indata: $t$ (tid).  
- Dolt lager: 50 neuroner, **sigmoidaktivering**.  
- Utdata: $y \approx \sin(t)$.  
- Demonstrerar **det universella approximationsteoremet**.  
- Träning kräver justering av **inlärningshastighet** och **epoker** för att minska oscillation och fel.  

---

### 6.4 Klassificeringsexempel
- Uppgift: klassificera “**Hobbits vs. Alver**.”  
- Utdatalager: 2 neuroner (binär klassificering).  
- Etiketter kodas med **one-hot**:  
  - Hobbit → (1,0)  
  - Alv → (0,1)  
- Förlust: korsentropi.  
- Noggrannheten förbättras med fler epoker (t.ex. 86% → 92%).  

---

### 6.5 Hemläxa
- Prova att träna egna neurala nätverk i **TensorFlow**.  
- Experimentera med:  
  - Olika inlärningshastigheter.  
  - Fler epoker.  
  - Fler dolda neuroner/lager.  
- Utmaning: slå noggrannheten från **Hebbiansk inlärning** och lärarens demos.  

---

## Sammanfattning

1. **Från hjärnor till neurala nätverk**  
   - Neurala nätverk är inspirerade av biologiska neuroner: indata, vikter (synapser), summering och aktivering.  
   - Hjärnan visar kraften hos massiva kopplingar (~$10^{13}$ synapser).  

2. **Vågen 1 (1943): Linjära tröskelenheter**  
   - McCulloch & Pitts visade att enkla neuroner kan implementera logiska funktioner (OCH, ELLER, NAND).  
   - Men de hade ingen inlärningsmekanism.  

3. **Vågen 2 (1949): Hebbiansk inlärning**  
   - Introducerade idén om att justera vikter baserat på fel.  
   - Tidig form av inlärning, men känslig för inlärningshastighet och konvergens.  

4. **Begränsningar hos en neuron (XOR)**  
   - En perceptron kan bara lösa linjärt separerbara problem.  
   - XOR avslöjade denna begränsning → ledde till skepsis och andra AI-vintern.  

5. **Icke-linjära aktiveringar & backpropagation**  
   - Sigmoid, tanh och andra aktiveringar möjliggör icke-linjära beslutsgränser.  
   - Backpropagation (1970–80-tal) gjorde det möjligt att träna flerskiktsnät.  
   - Universella approximationsteoremet (1989): ett dolt skikt räcker för att approximera vilken funktion som helst.  

6. **Modern praktik: TensorFlow & PyTorch**  
   - TensorFlow: nybörjarvänligt, bra för demos, används i denna kurs.  
   - PyTorch: flexibelt, mer populärt i forskning, används i deep learning-kursen.  
   - Ramverken gör det praktiskt att träna regression, klassificering och flerskiktsnät i skala.  




