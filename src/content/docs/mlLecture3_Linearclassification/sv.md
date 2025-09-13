---
title: "Maskininlärning 3: Linjär klassificering"
subtitle: "DATA.ML.100 · Joni Kämäräinen · mån 1.9.2025 · K1704"
date: 2025-09-02
lang: sv
excerpt: "Vi repeterar linjär regression → enkel baslinje → klassificering. k-NN (avstånd/k/komplexitet), perspektivet av linjär anpassning, stegregel, logistisk (sigmoid) utgång, MSE-gradienter och varför det inte finns en sluten formell lösning — förberedelse för neurala nätverk."
tags: ["Joni Kämäräinen","machine-learning","linear-classification","step-function", "sigmoid-function", "logistic"]
draft: false
---
<details>
<summary><strong>Innehållsförteckning (klicka ▶️ vid behov)</strong></summary>

- [Del 1 : Repetition från förra veckans kurs](#del-1--repetition-från-förra-veckans-kurs)
  - [1.1 Modell och träningsdata](#11-modell-och-träningsdata)
  - [1.2 Fel och hur vi löste det](#12-fel-och-hur-vi-löste-det)
  - [1.3 Varför den analytiska lösningen är viktig](#13-varför-den-analytiska-lösningen-är-viktig)
  - [1.4 Vilken typ av problem detta är](#14-vilken-typ-av-problem-detta-är)
- [Del 2 : Baslinje och klassificering](#del-2--baslinje-och-klassificering)
  - [2.1 En enkel baslinje](#21-en-enkel-baslinje)
  - [2.2 Övergång till klassificering](#22-övergång-till-klassificering)
  - [2.3 Utdata ändras](#23-utdata-ändras)
  - [2.4 Vad observationen är](#24-vad-observationen-är)
- [Del 3 : Exempel: Hobbits vs. alver](#del-3--exempel-hobbits-vs-alver)
  - [3.1 Att lära från träningsdata](#31-att-lära-från-träningsdata)
  - [3.2 Orchernas fälla](#32-orchernas-fälla)
  - [3.3 Generera data](#33-generera-data)
  - [3.4 Acceptera överlappning](#34-acceptera-överlappning)
  - [3.5 Tvådimensionell data](#35-tvådimensionell-data)
  - [3.6 Träning vs. inferens](#36-träning-vs-inferens)
  - [3.7 Första klassificeringsidén](#37-första-klassificeringsidén)
- [Del 4 : Närmaste granne-klassificerare](#del-4--närmaste-granne-klassificerare)
  - [4.1 Namn och idé](#41-namn-och-idé)
  - [4.2 Träning (spara allt)](#42-träning-spara-allt)
  - [4.3 Inferens (hitta den närmaste och kopiera dess etikett)](#43-inferens-hitta-den-närmaste-och-kopiera-dess-etikett)
  - [4.4 Enkla baslinjer för klassificering](#44-enkla-baslinjer-för-klassificering)
  - [4.5 Slutsatser](#45-slutsatser)
- [Del 5 : k-NN överväganden → linjeanpassning](#del-5--k-nn-överväganden--linjeanpassning)
  - [5.1 Vad vi kan justera i k-NN](#51-vad-vi-kan-justera-i-k-nn)
  - [5.2 Kan vi klassificera genom att anpassa en linje?](#52-kan-vi-klassificera-genom-att-anpassa-en-linje)
  - [5.3 Hur mäter vi fel i klassificering?](#53-hur-mäter-vi-fel-i-klassificering)
- [Del 6 : Från linjeanpassning till steg, sedan till sigmoid](#del-6--från-linjeanpassning-till-steg-sedan-till-sigmoid)
  - [6.1 Stegregel och diskriminator](#61-stegregel-och-diskriminator)
  - [6.2 Approximation av steg med logistisk (sigmoid)](#62-approximation-av-steg-med-logistisk-sigmoid)
  - [6.3 Träningssignal (för nu)](#63-träningssignal-för-nu)
- [Del 7 : MSE med sigmoidutgång, gradienter (steg-för-steg, tydligt)](#del-7--mse-med-sigmoidutgång-gradienter-steg-för-steg-tydligt)
  - [7.1 Modell, mål, förlust](#71-modell-mål-förlust)
  - [7.2 Varför ∂zᵢ/∂b = 1 och ∂zᵢ/∂a = xᵢ?](#72-varför-∂zᵢ∂b--1-och-∂zᵢ∂a--xᵢ)
  - [7.3 Derivatan av sigmoid](#73-derivatan-av-sigmoid)
  - [7.4 Derivera MSE (kedjeregel)](#74-derivera-mse-kedjeregel)
  - [7.5 Vad varje faktor betyder](#75-vad-varje-faktor-betyder)
  - [7.6 Varför vi inte har en sluten lösning](#76-varför-vi-inte-har-en-sluten-lösning)

</details>

## Del 1 : Repetition från förra veckans kurs

![Board notes](/images/docs/Lecture3_Linearclassification/1.png)

Vi började med idén att en observation kan skrivas som en funktion $y = f(x)$. Detta gör det till ett maskininlärningsproblem: modellen ger en prediktion $\hat{y}$ och vi jämför den med det sanna värdet $y$.

<br />

### 1.1 Modell och träningsdata

Vi använde en mycket enkel linjär modell,
$$
\hat{y} = a x + b ,
$$
där $a$ och $b$ är parametrar som ska läras. Med $N$ exempel är träningsdatan
$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

<br />

### 1.2 Fel och hur vi löste det

För att välja $a$ och $b$ minimerade vi felet mellan de sanna värdena och våra prediktioner:
$$
\mathcal{L} = \sum_{i=1}^{N} (y_i - \hat{y}_i)^2 .
$$
Sedan satte vi gradienterna lika med noll för att få det optimala:
$$
\frac{\partial \mathcal{L}}{\partial a} = 0, \qquad
\frac{\partial \mathcal{L}}{\partial b} = 0 .
$$
Detta ger en analytisk lösning (samma som vi använde i hemläxan).

<br />

### 1.3 Varför den analytiska lösningen är viktig

Den är mycket snabb att beräkna: vi stoppar in punkterna, använder summorna och får resultatet på millisekunder. Denna hastighet är avgörande i realtidssituationer (exemplet i föreläsningen var ett flygplanssystem som fattar rotationsbeslut ungefär tusen gånger per sekund).

<br />

### 1.4 Vilken typ av problem detta är

Vår output är ett reellt värde, $y \in \mathbb{R}$, så detta är ett **regressionsproblem**. Regression förekommer hela tiden, och vad vi än gör senare jämför vi det först med linjär regression.

---
## Del 2 : Baslinje och klassificering

![Board notes](/images/docs/Lecture3_Linearclassification/2.png)

<br />

### 2.1 En enkel baslinje

För att avgöra om vår linjära regression är “tillräckligt bra” lade vi först till en mycket enkel baslinje: **lär dig ingenting** — förutsäg helt enkelt medelvärdet av alla träningsmål. På tavlan skrevs detta som “$\hat{y}$ = average of all training data $y_i$”, dvs.
$$
\hat{y}=\frac{1}{N}\sum_{i=1}^{N} y_i .
$$
Detta är trivialt att beräkna, och man bör alltid implementera en sådan baslinje. Vår linjära regression bör vara tydligt bättre än detta; om inte, är det något konstigt med datan och vi behöver kontrollera den.

<br />

### 2.2 Övergång till klassificering

Därefter gick vi över till ett annat viktigt ML-problem: **klassificering**. Huvudbudskapet i denna föreläsning är att samma linjära linjeanpassning också kan fungera för klassificering, men vi behöver några små trick.

<br />

### 2.3 Utdata ändras

Här är utdata **inte ett reellt värde**. Istället är det ett av **diskreta värden** (etiketter). På tavlan:
$$
y \in \{1,2,3\}.
$$
Uppgiften är alltså att bestämma vilken klass indata tillhör.

<br />

### 2.4 Vad observationen är

$x$ är observationen. Det kan vara många saker:
- bild (exemplen i klassen använde ofta bilder),
- temperatur,
- ljud,
- eller en kombination av dessa.

Ett typiskt exempel är självkörande bilar: systemet tar bilder många gånger per sekund och måste upptäcka fotgängare, fordon och cyklister, och sedan vidarebefordra informationen till körsystemet. Detta blir ett klassificeringsproblem med diskreta etiketter.

---

## Del 3 : Exempel: Hobbits vs. alver

![Board notes](/images/docs/Lecture3_Linearclassification/3.png)

<br />

### 3.1 Att lära från träningsdata

Vi har fortfarande modellen $y = f(x)$, och parametrarna för $f$ lärs från träningsdata. Denna del fungerar på samma sätt som regression: samla data och anpassa funktionen.  

<br />

### 3.2 Orchernas fälla

Föreläsningen introducerade en berättelse. Vi är orcher och vi har en fälla. Om fällan fångar hobbits är det bra, vi äter dem. Om fällan fångar alver är det farligt, vi får problem. Observationen $x$ kan alltså vara varelsens **längd**.  

Vi antar att hobbits är kortare och alver är längre. Detta är den egenskap vi använder för att skilja dem åt.  

<br />

### 3.3 Generera data

För att simulera antar vi att längdfördelningen i Midgård är normalfördelad, precis som djuregenskaper i vår värld. Vi genererar fem slumpmässiga prover för hobbits och fem för alver. Hobbits visas i en färg, alver i en annan.  

I urvalet ser vi en mycket lång hobbit och en ganska kort alv. Detta betyder att klasserna inte är helt separata, de överlappar. I verkligheten är detta typiskt, och det betyder att vi inte kan förvänta oss 100 % klassificeringsnoggrannhet.  

<br />

### 3.4 Acceptera överlappning

På grund av överlappning måste vi acceptera fel. Oavsett vilket system vi bygger kommer några misstag att inträffa.  
- Exempel: vid cancerdetektion kan inte alla cancerfall upptäckas, och ibland klassificeras friska prover felaktigt som cancer.  

Alltså måste vi räkna med en viss felfrekvens i klassificering.  

<br />

### 3.5 Tvådimensionell data

Hittills har vi bara använt en egenskap: längd. Men vi kan lägga till en annan, som vikt. Antagandet: hobbits kan vara kortare och tyngre, medan alver är längre och smalare.  

Detta ger oss **tvådimensionell data**:  
- $x_1 =$ längd  
- $x_2 =$ vikt  

Nu är varje träningspunkt ett par $(x_1, x_2)$, och $y$ är klassetiketten. För träningsdatan kan vi tilldela numeriska etiketter, t.ex. $y=0$ för hobbit och $y=1$ för alv.  

<br />

### 3.6 Träning vs. inferens

Inom maskininlärning skiljer vi ofta två steg:  
1. **Träning** — vi lär modellens parametrar från märkta exempel.  
2. **Inferens** — vi testar modellen på ett nytt prov för att avgöra dess klass.  

Så om en ny punkt kommer in är uppgiften att avgöra om det är en hobbit eller en alv.  

<br />

### 3.7 Första klassificeringsidén

I föreläsningen visades ett nytt prov på tavlan. Studenterna funderade på hur man skulle klassificera det. Den intuitiva lösningen var: klassificera det som hobbit, eftersom det ligger mycket nära andra hobbitpunkter.  

Detta leder naturligt till en av de första klassificeringsmetoderna: att använda närhet till träningsprover.

---

## Del 4 : Närmaste granne-klassificerare

![Board notes](/images/docs/Lecture3_Linearclassification/4.png)

<br />

### 4.1 Namn och idé
Vi gick från “närhets”-intuitionen till en konkret metod: **närmsta granne-klassificeraren** (1-NN och senare $k$-NN). Idén är enkel: ett nytt prov ska få samma klass som det närmaste träningsprovet.

<br />

### 4.2 Träning (spara allt)
Träningen är trivial här: **vi sparar bara alla träningsprover** (egenskaper och deras klassetiketter). Inga parametrar anpassas i detta steg.

<br />

### 4.3 Inferens (hitta den närmaste och kopiera dess etikett)
När ett nytt prov kommer gör vi följande beräkningar:  
1. För **alla** träningsprover, beräkna avståndet till det nya provet.  
   (Vilket rimligt avstånd som helst går bra; vi behöver bara kunna jämföra vem som är närmare.)  
2. Om avståndet är **mindre än det bästa hittills**, uppdatera det bästa och **välj** det provet.  
3. **Returnera klassetiketten** för det prov som har **kortast avstånd**.  

Detta är hela algoritmen. Vi implementerar den i Python i övningarna.

<br />

### 4.4 Enkla baslinjer för klassificering
Vi satte också baslinjer för att avgöra om vår klassificerare är bra:  
- **Slumpklass** — returnera en slumpmässig etikett från klassmängden.  
- **Vanligaste etiketten** — returnera alltid den etikett som förekommer mest i träningsdatan.  

Den andra baslinjen är vanligtvis bättre än slump, särskilt när en klass **dominerar** (t.ex. 99 % av proverna är från en klass). Om “vanligaste etiketten” redan ger 99 % noggrannhet måste vår metod slå **det** talet för att vara meningsfull.

<br />

### 4.5 Slutsatser
- Närmaste granne är en **mycket enkel** algoritm, men ändå **förvånansvärt kraftfull**.  
- Jämför alltid mot **enkel baslinje** för din data; det visar hur svårt problemet är och vilken prestanda vi måste slå.

---
## Del 5 : k-NN överväganden → linjeanpassning

![Board notes](/images/docs/Lecture3_Linearclassification/5.png)

<br />

### 5.1 Vad vi kan justera i k-NN
När vi börjar studera vad vi kan ändra i närmaste granne, öppnar sig en helt ny värld:

- **Avstånd.** Vi kan välja avståndsmått.  
  Euklidiskt i 1D är  
  $$
  d(x,x_i)=\sqrt{(x-x_i)^2},
  $$
  och ett **city-block (L1)**-avstånd är  
  $$
  d(x,x_i)=|x-x_i|.
  $$
  Det finns många andra avstånd; vi bör välja det som passar datan.

- **Antal grannar.** $k$ kan vara $1,3,\dots$  
  För två klasser kan $k=2$ bli oavgjort (en hobbit, en alv), så $k=3$ undviker detta.

- **Beräkningstid.** En grundläggande 1-NN innebär en loop över alla träningspunkter och kan vara långsam för enorma dataset, men det finns **snabba NN-metoder** (ofta approximativa) som delar upp rummet och snabbar upp sökningen.

- **1D vs 2D-avstånd i k-NN:**  
  I **1D** sammanfaller Euklidiskt (L2) och City-block (L1):  
  $$
  |x-x_i|.
  $$  
  I **2D och högre dimensioner** skiljer de sig:  
  - Euklidiskt (L2) i 2D:  
    $$
    d(\mathbf{x},\mathbf{x_i})=\sqrt{(x_1-x_{i1})^2+(x_2-x_{i2})^2},
    $$
    vilket ger cirkulära grannskap.  
  - City-block (L1) i 2D:  
    $$
    d(\mathbf{x},\mathbf{x_i})=|x_1-x_{i1}|+|x_2-x_{i2}|,
    $$
    vilket ger diamantformade grannskap.  

  Denna skillnad ändrar **k-NN:s beslutsgränser**: med L2 blir de jämnare och rundare; med L1 följer de koordinataxlarna. Valet beror på datans geometri.

**🤔 Hemläxa:** Ge 2D-punkter där **1-NN** och **3-NN** ger **olika** klassificeringar.

<br />

### 5.2 Kan vi klassificera genom att anpassa en linje?
![Board notes](/images/docs/Lecture3_Linearclassification/6.png)

Vi försöker uttrycka klassificering som **linjeanpassning**. Vi tilldelar klasstargets
$$
y=-1 \;\text{för hobbit}, \qquad y=+1 \;\text{för alv}.
$$
Sedan anpassar vi en linje
$$
\hat y = a x + b
$$
till dessa $(x,y)$-par (precis som i regression).  
När linjen är anpassad använder vi den enkla **klassificeringsregeln**:
$$
\hat y < 0 \Rightarrow \text{hobbit}, \qquad
\hat y > 0 \Rightarrow \text{alv}.
$$
Punkten där $\hat y=0$ är **diskriminatorn** (beslutsgränsen).

I övningen på föreläsningen anpassade vi linjen och utvärderade några nya prover; med denna data klassificerade regeln dem alla korrekt.

![Board notes](/images/docs/Lecture3_Linearclassification/7.png)

<br />

### 5.3 Hur mäter vi fel i klassificering?
För klassificering är felet **binärt**:  
- om $\hat y$ ger **rätt** klass ⇒ $\text{err}=0$,  
- om $\hat y$ ger **fel** klass ⇒ $\text{err}=1$.  

Vi tillåter inga “kanske”-utdata.  
Observera skillnaden: linjeanpassning minimerar **kvadratfel**, inte detta 0/1-fel. Den skillnaden kan orsaka problem senare — vi fixar det i nästa steg.

---
## Del 6 : Från linjeanpassning till steg, sedan till sigmoid

![Board notes](/images/docs/Lecture3_Linearclassification/8.png)

<br />

### 6.1 Stegregel och diskriminator

Vi behåller den anpassade linjen $\hat y = a x + b$ och definierar **diskriminatorn** vid $\hat y=0$.  
Stegregeln på tavlan använder **$\pm1$** etiketter:

$$
y =
\begin{cases}
+1, & x > x_d,\\[4pt]
-1, & x < x_d .
\end{cases}
$$

Ekvivalent med linjens tecken:

$$
\hat y < 0 \Rightarrow \text{hobbit}, \qquad
\hat y > 0 \Rightarrow \text{alv}.
$$

![Board notes](/images/docs/Lecture3_Linearclassification/9.png)

<br />

### 6.2 Approximation av steg med logistisk (sigmoid)

Eftersom ett hårt steg är diskontinuerligt använder vi dess mjuka approximation, den logistiska (“logsig”):

$$
\operatorname{logsig}(x)=\frac{1}{1+e^{-x}} .
$$

Kombinera den med linjen:

$$
\hat y \;=\; \operatorname{logsig}(a x + b)
=\frac{1}{1+e^{-(a x + b)}} .
$$

Här styr $a$ hur skarp övergången är, och $b$ flyttar tröskeln.  
Vi märker om klasserna till intervallet $[0,1]$ (hobbit $=0$, alv $=1$).

<br />

### 6.3 Träningssignal (för nu)

Med denna mjuka utgång kan vi fortfarande minimera **medelkvadratfelet** mellan målen i $\{0,1\}$ och $\hat y$ för att anpassa $a$ och $b$.

---

## Del 7 : MSE med sigmoidutgång, gradienter (steg-för-steg, tydligt)

![Board notes](/images/docs/Lecture3_Linearclassification/10.png)

<br />

### 7.1 Modell, mål, förlust

Modell (1D-funktion \(x\)):

$$
z_i = a x_i + b
$$

$$
\hat y_i = \sigma(z_i) = \frac{1}{1+e^{-z_i}}
$$

Mål:

$$
y_i \in \{0,1\}
$$

Medelkvadratfel (MSE):

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-\hat y_i\bigr)^2
$$

<br />

### 7.2 Varför $ \frac{\partial z_i}{\partial b} = 1 $ och $ \frac{\partial z_i}{\partial a} = x_i $?

Vi har en rak linje:

$$
z_i = a x_i + b
$$

Derivera m.a.p. \(b\):

$$
\frac{\partial z_i}{\partial b} = 1
$$

Derivera m.a.p. \(a\):

$$
\frac{\partial z_i}{\partial a} = x_i
$$

Alltså, ändring av \(b\) flyttar linjen upp/ner, ändring av \(a\) lutar den beroende av \(x_i\).

<br />

### 7.3 Derivatan av sigmoid

Definition:

$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

Derivata:

$$
\frac{d\sigma}{dz}=\sigma(z)\bigl(1-\sigma(z)\bigr)
$$

<br />

### 7.4 Derivera MSE (kedjeregel)

Residual:

$$
e_i = y_i - \hat y_i
$$

Förlust i residualform:

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N} e_i^{\,2}
$$

Derivata av yttre kvadrat:

$$
\frac{\partial}{\partial e_i}\bigl(e_i^{\,2}\bigr)=2e_i
$$

Residual vs. output:

$$
\frac{\partial e_i}{\partial \hat y_i} = -1
$$

Sigmoidkedja:

$$
\frac{\partial \hat y_i}{\partial a} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot x_i
$$

$$
\frac{\partial \hat y_i}{\partial b} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot 1
$$

Kedjan ihop:  

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\,x_i
$$

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

<br />

### 7.5 Vad varje faktor betyder

- Residual:
$$
\hat y_i - y_i
$$

- Sigmoidens lutning:
$$
\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

- Inmatningsskala (endast för \(a\)):
$$
x_i
$$

Runt 0.5 är sigmoidens lutning stor → stark signal. Nära 0 eller 1 är den liten → mättnad.

<br />

### 7.6 Varför vi inte har en sluten lösning

Parametrarna \(a,b\) finns **inne i** sigmoid i summorna. Att sätta gradienterna till noll förenklas inte till slutna ekvationer (som i linjär regression).  
Därför måste vi **iterera**:

Inlärningsuppdatering:

$$
a \leftarrow a - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
$$

$$
b \leftarrow b - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
$$

Upprepa tills förlusten slutar minska.







