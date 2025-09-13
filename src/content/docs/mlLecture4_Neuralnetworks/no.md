---
title: "Maskinlæring 4: Nevrale nettverk"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Tor 4.9.2025 TB104 😊"
date: "2025-09-08"
lang: "no"
excerpt: "Grunnlaget for nevrale nettverk: fra biologisk inspirasjon til LTU-er, Hebbiansk læring, XOR-begrensninger, ikke-lineære aktiveringer, backpropagation og moderne rammeverk (TensorFlow & PyTorch)."
tags: ["Joni Kämäräinen", "machine-learning", "neural-networks", "TensorFlow", "PyTorch"]
draft: false
---

## Del 1 : Fra hjerner til nevrale nettverk

![Board notes](/images/docs/mlLecture4_Neuralnetworks/1.png)

### 1.1 Hvorfor studere nevrale nettverk?
- Når ingeniører møter flaskehalser, låner de ofte ideer fra andre fag (biologi, humaniora, osv.).  
- Den menneskelige hjernen er den mest intelligente “datamaskinen” vi kjenner, og inspirerer maskinlæring.  

### 1.2 Hjerne og evolusjon
- Hjernestørrelse begrenses av **skalle/fødselskanal** — den kan ikke vokse uendelig.  
- Mattilgang påvirker også evolusjon (f.eks. øybefolkninger som blir mindre).  
- Antall nevroner hos ulike arter:
  - Sjøstjerne: ~500  
  - Iglen: ~10 000  
  - Bananflue: ~100 000  
  - Kakerlakk: ~1 000 000  
  - Skilpadde: ~10 000 000  
  - Hamster: ~100 000 000  
  - Ugle: ~1 000 000 000  
  - Gorilla: ~30 000 000 000  
  - Menneske: ~100 000 000 000  
- Nøkkelen er ikke bare antall nevroner, men **antall forbindelser** (~$10^{13}$ synapser i menneskehjernen).  

### 1.3 Biologisk nevronstruktur
- **Dendritter** = inndata ($x_1, x_2, …$)  
- **Synapser** = vekter (kan eksitere eller hemme)  
- **Soma (cellekropp)** = beregningsenhet (som lineær modell + aktivering)  
- **Akson** = utdata ($y$)  

➡️ **Kunstig nevron = Inndata × Vekter → Summering → Aktiveringsfunksjon → Utdata**

### 1.4 Notater
- Biologiske nevroner sender **spiker** (spikes), mens kunstige bruker kontinuerlige verdier.  
- Dette gir felt som:  
  - **Spiking Neural Networks (SNNs)**  
  - **Nevromorfe brikker**

### 1.5 Kunstig nevron som lineær modell
- Et kunstig nevron kan beskrives som en **lineær modell**: vektet sum av inndata + bias.  
- Dette kobler direkte til **lineær regresjon** og **klassifisering**.  
- Disse emnene er grunnmuren for å forstå nevrale nettverk.

---

## Del 2 : Lineær modell og den første bølgen (1943)

![Board notes](/images/docs/mlLecture4_Neuralnetworks/2.png)

### 2.1 Lineær modell som nevron
- Nevronet kan modelleres som en **lineær kombinasjon** av inndata + bias:  
  $$
  y = \sum_i w_i x_i + w_0
  $$
- Dette kan allerede gjøre **lineær regresjon**.  
- For klassifisering er ikke ren regresjon nok → vi trenger terskel eller ikke-lineær aktivering.  

### 2.2 Mot klassifisering
- Binær klassifisering: to klasser (0/1).  
- Løsning: bruk en **terskelfunksjon** (senere sigmoid/logistisk).  
- I kode:  
  - Først vektet sum.  
  - Så terskel (eller sigmoid) for å avgjøre utdata.  

### 2.3 Historisk — Bølge 1 (1943)
- **McCulloch & Pitts (1943): Linear Threshold Unit (LTU)**  
- Definisjon:  
  $$
  y = 
    \begin{cases}
      1 & \text{hvis } w_1x_1 + w_2x_2 + w_0 \geq \theta \\
      0 & \text{hvis } w_1x_1 + w_2x_2 + w_0 < \theta
    \end{cases}
  $$
- Ofte velger man $\theta = 0$.  
- Motivasjon: simulere logiske porter (grunnlaget for digitale datamaskiner).  

### 2.4 Eksempel: AND-port
- Inndata: $x_1, x_2 \in \{0,1\}$  
- Ønsket utdata: $y=1$ bare når begge er 1.  
- Velg vekter: $w_1 = w_2 = \tfrac{2}{3},\ w_0 = -1$  

Sjekk:  
$$
\begin{aligned}
(0,0):\ & -1<0 \ \Rightarrow y=0 \\
(1,0)\ \text{eller}\ (0,1):\ & \tfrac{2}{3}-1=-\tfrac{1}{3}<0 \ \Rightarrow y=0 \\
(1,1):\ & \tfrac{4}{3}-1=\tfrac{1}{3}>0 \ \Rightarrow y=1
\end{aligned}
$$  

✅ Fungerer som AND.  

### 2.5 Eksempel: OR-port
![Board notes](/images/docs/mlLecture4_Neuralnetworks/3.png)

- Inndata: $x_1, x_2 \in \{0,1\}$  
- Ønsket: $y=1$ hvis minst én er 1.  
- Enkelt valg: $w_1 = w_2 = 1,\ w_0 = -1$  
  - (0,0): $-1<0 \Rightarrow y=0$  
  - (1,0) eller (0,1): $1-1=0 \Rightarrow y=1$  
  - (1,1): $2-1=1>0 \Rightarrow y=1$  

✅ Fungerer, men marginen er tynn.  

Bedre margin: $w_1 = w_2 = \tfrac{3}{2},\ w_0 = -1$.  

### 2.6 Hjemmeoppgave: NAND
> Design en **NAND-port** med LTU.  
> - Hint: NAND = NOT(AND).  
> - Start fra AND-vektene og justér.  

### 2.7 Takeaway
- En enkel LTU med riktige vekter kan implementere logikk.  
- Dette viste at nevroner prinsipielt kan utgjøre grunnlag for beregning.

---

## Del 3 : Bølge 2 (1949) — Hebbiansk læring

![Board notes](/images/docs/mlLecture4_Neuralnetworks/4.png)

### 3.1 Hebbiansk læringsregel
- Foreslått som oppdateringsmekanisme for LTU-vekter.  
- Regel:  
  $$
  w_i^{t+1} = w_i^t + \eta (y - \hat{y}) x
  $$
- Der:  
  - $y$ = sann utdata (fasit)  
  - $\hat{y}$ = estimert utdata  
  - feil = $y - \hat{y}$  
  - $\eta$ = læringsrate (f.eks. 0,1)  

### 3.2 Læringsdynamikk
- Estimat for høyt → vekter ned.  
- Estimat for lavt → vekter opp.  
- Over tid nærmer $y \approx \hat{y}$.  

### 3.3 Plan for læringsrate
- Stor $\eta$ kan gi oscillasjoner.  
- **Reduser gradvis** for bedre konvergens.  

---

## Del 4 : Begrensninger for ett nevron — XOR og den andre vinteren

![Board notes](/images/docs/mlLecture4_Neuralnetworks/5.png)

### 4.1 Lineær separabilitet
- En perceptron løser bare **lineært separerbare** problemer.  
- AND, OR fungerer.  

### 4.2 XOR-problemet
- XOR:  
  - (0,0) → 0  
  - (1,0) → 1  
  - (0,1) → 1  
  - (1,1) → 0  
- Ikke lineært separerbar → kan ikke løses av én perceptron.  

### 4.3 Den andre AI-vinteren
- 1969: Minsky & Papert viste perceptron-begrensninger (særlig XOR).  
- Skapte skepsis og kutt i finansiering → “andre vinteren”.  

### 4.4 Idéen om flere lag
- Hjerner har **mange nevroner som jobber sammen**.  
- Med skjult lag kan XOR representeres.  
- **Backpropagation** (1970–80-tallet) gjorde treningen effektiv.  

---

## Del 5 : Fra lineær til ikke-lineær — Logistikk, tap & gradientnedstigning

![Board notes](/images/docs/mlLecture4_Neuralnetworks/6.png)

### 5.1 Aktiveringsfunksjoner
- For å komme forbi lineær regresjon bruker vi ikke-lineære aktiveringer:  
  - **Sigmoid (logistisk):**  
    $$\sigma(z) = \frac{1}{1+e^{-z}} \quad \in (0,1)$$  
  - **Tanh:**  
    $$\tanh(z) \in (-1,1)$$  
  - Lineær (identitet), ReLU, osv.  

### 5.2 Tapsfunksjoner
- Regresjon: MSE  
  $$L = \frac{1}{N} \sum (y - \hat{y})^2$$  
- Klassifisering: Kryssentropi (oftest sammen med softmax).  

### 5.3 Gradientnedstigning
- Gradient av tapet mht. vekter:  
  $$\nabla_w L = \left( \frac{\partial L}{\partial w_1}, \frac{\partial L}{\partial w_2}, … \right)$$  
- Oppdatering:  
  $$
  w^{(t+1)} = w^{(t)} - \eta \, \nabla_w L
  $$
- $\eta$ for stor → divergens, for liten → tregt.  
- **Planlagt læringsrate** hjelper.  

### 5.4 Universell approksimasjon
- Med minst **ett skjult lag** og ikke-lineær aktivering kan et nettverk approksimere *enhver* funksjon (Cybenko 1989).  

### 5.5 Flerlagede perceptron & backpropagation
![Board notes](/images/docs/mlLecture4_Neuralnetworks/7.png)

- Én LTU klarer ikke XOR.  
- Løsning: **MLP** (flere nevroner/lag).  
  - Eks.: to skjulte nevroner ($y_1, y_2$) inn i én utgangsnevron.  
  - Gir ikke-lineære beslutningsgrenser.  

- **Tap**: fortsatt MSE i eksempelet.  
- **Utfordring**: hvordan trene skjulte lag?  

➡️ **Backpropagation**  
- Regn ut utgangsfeil (prediksjon − mål).  
- Propager bakover med **kjerneregel** (chain rule).  
- Oppdater alle vekter via gradientnedstigning.  

Gjennombruddet på 1970–80-tallet gjorde dype nett praktiske og overvant XOR-floken.

### 5.6 Flerklasse-klassifisering

![Board notes](/images/docs/mlLecture4_Neuralnetworks/8.png)

- Til nå: **binært** (0/1).  
- For **N klasser**:  
  - Utdatalaget har **N nevroner**, ett per klasse.  
  - Eksempel: 3 klasser → utdata $(y_1, y_2, y_3)$.  
- **One-hot-koding** av fasit:  
  - Klasse 1 → (1,0,0), Klasse 2 → (0,1,0), …  
- Trening:  
  - Framoverpass → utdata.  
  - Tap: ofte **kryssentropi** + softmax.  
  - Bakoverpass: backprop gjennom alle vekter.  

➡️ Nett kan håndtere **vilkårlig antall** klasser.

---

## Del 6 : Praktisk arbeid — TensorFlow & PyTorch

![Board notes](/images/docs/mlLecture4_Neuralnetworks/9.png)

### 6.1 TensorFlow vs. PyTorch
- Begge er **mainstream dyp-læringsrammeverk**.  

- **TensorFlow (Google)**  
  - Valgt her *“for mangfoldets skyld.”*  
  - `Sequential`-API er veldig enkelt (legg til lag etter lag).  
  - Flott for **første demo** (f.eks. lineær regresjon).  
  - Installasjon kan gi *“noen små feil”* men funker.  

- **PyTorch (Meta/Facebook)**  
  - *“PyTorch er nok mer populært enn TensorFlow.”*  
  - Mer fleksibelt og Python-nært; bra for komplekse modeller.  
  - *“PyTorch er mer lærerikt, men også vanskeligere.”*  
  - Brukes i **Deep Learning-kurs** senere.  

- **Oppsummert**  
  - **TensorFlow** → enklere, nybegynnervennlig, bra for demo.  
  - **PyTorch** → populært i forskning, fleksibelt, mer lærerikt men vanskeligere.  

- Sitat:  
  > *“Ingen gjør backprop manuelt, bortsett fra for å lære. Til faktisk arbeid bruker vi TensorFlow eller PyTorch.”*  

---

### 6.2 Enkel regresjon med ett nevron
- Modell: `Dense(units=1, activation="linear")`  
- Optimalisering: SGD.  
- Tap: MSE.  
- Trening (`fit`) viser fallende feil pr. epoke.  
- ✅ Lærer en rett linje (som lineær regresjon).  

---

### 6.3 MLP-regresjon (sinus)
- Oppgave: approksimer **sinus**.  
- Inndata: $t$ (tid).  
- Skjult lag: 50 nevroner, **sigmoid**.  
- Utdata: $y \approx \sin(t)$.  
- Viser **universell approksimasjon**.  
- Justér **læringsrate** og **antall epoker** for stabilitet.  

---

### 6.4 Klassifiseringseksempel
- Oppgave: “**Hobbits vs. Alver**”.  
- Utgang: 2 nevroner (binært).  
- **One-hot** etiketter: Hobbit → (1,0), Alv → (0,1).  
- Tap: kryssentropi.  
- Presisjon øker med epoker (f.eks. 86% → 92%).  

---

### 6.5 Hjemmeoppgave
- Tren egne nett i **TensorFlow**.  
- Prøv:  
  - Ulike læringsrater.  
  - Flere epoker.  
  - Flere skjulte nevroner/lag.  
- Utfordring: slå **Hebbiansk læring** og demoene.  

---

## Oppsummering

1. **Fra hjerne til nett**  
   - Nevrale nettverk forenkler nevroner: inndata, vekter, sum, aktivering.  
   - Hjernen viser kraften i ~$10^{13}$ synapser.  

2. **Bølge 1 (1943): LTU**  
   - Logiske porter (AND/OR/NAND) kan lages av én enhet.  
   - Ingen læring ennå.  

3. **Bølge 2 (1949): Hebbiansk læring**  
   - Justér vekter ut fra feil; følsomt for læringsrate.  

4. **XOR-begrensningen**  
   - Én perceptron løser bare lineært separerbare problemer → “andre AI-vinter”.  

5. **Ikke-linearitet & backprop**  
   - Sigmoid/tanh gir ikke-lineære grenser.  
   - Backprop (70–80-tallet) muliggjorde MLP-trening.  
   - 1989: Ett skjult lag kan approksimere enhver funksjon.  

6. **Praksis: TensorFlow & PyTorch**  
   - TF: nybegynnervennlig demo-valg.  
   - PyTorch: fleksibelt, forskningstungt.  
   - Rammeverk gjør skalerbar trening praktisk.
