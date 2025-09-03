---
title: "Föreläsning 2: Linjär regression"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 28.8.2025 TB104"
date: 2025-09-01
lang: "sv"
excerpt: "Steg-för-steg-härledning av enkel linjär regression ($y = a x + b$): definiera residualer och MSE, använd kedjeregeln, sätt de partiella derivatorna till noll, lös normalekvationerna för $a$ och $b$, och verifiera med ett litet exempel."
tags: ["Joni Kämäräinen", "maskininlärning", "linjär regression", "analys", "minsta kvadrat"]
draft: false
---
## Härledning av a och b för en linjär modell från grunden med minsta kvadratmetoden

## Del 1 : Introduktion

![Tavlanteckningar](/images/docs/Lecture%202_Linearregression/1.png)

Vi började med det mest grundläggande problemet i maskininlärning. Läraren förklarade att samma idé finns inne i neurala nätverk och till och med i moderna språkmodeller. Den matematik du lärde dig på gymnasiet räcker för att följa dagens föreläsning.

<br />

### 1.1 Den linjära modellen

Vi återkallar den välkända linjens ekvation:

$$
y = a x + b .
$$

Detta kallas en linjär modell. För tillfället har vi en ingång och en utgång, men samma idé kan utökas till flera ingångar och flera utgångar.

Här är $x$ en ingång (en observation vi kan mäta) och $y$ är målvariabeln.

<br />

### 1.2 Modellens parametrar

De två parametrarna är lutning och intercept:

* $a$ är lutningen. Den styr hur brant linjen är. Om $a = 0$ är linjen parallell med $x$-axeln. Större värden gör att linjen växer snabbare.  
* $b$ är interceptet (bias). Utan $b$ passerar linjen alltid genom origo; med $b$ kan vi flytta linjen uppåt eller nedåt längs $y$-axeln.

<br />

### 1.3 Träningsdata

För att lära behövs träningsdata, alltså parade observationer:

$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

Med noll observationer är alla linjer lika rimliga och vi kan inte välja bra värden på $a$ och $b$ utan förkunskap.

Med en enda observation, till exempel

$$
(x_1, y_1) = (1.11, 85) ,
$$

blir modellen

$$
y_1 = a x_1 + b .
$$

Härifrån kan vi lösa ut $b$:

$$
b = y_1 - a x_1 = 85 - a \cdot 1.11 .
$$

Nu kan $a$ väljas fritt och $b$ bestäms därefter. Vilken linje som helst som går genom denna punkt ger noll fel.

<br />

### 1.4 Mot fler observationer

En observation räcker inte för att entydigt bestämma en linje. Med två observationer finns exakt en linje som går genom båda punkterna. Där fortsätter vi härnäst.

<br />

---

## Del 2: Från två prover till många

![Board notes](/images/docs/Lecture%202_Linearregression/2.png)

Vi lägger nu till ännu ett prov. Anta att det andra provet är

$$
(x_2, y_2) = (1.52, 110) .
$$

<br />

### 2.1 Lösning med två prover

Modellekvationerna är

$$
y_1 = a x_1 + b, \qquad y_2 = a x_2 + b .
$$

Sätter in talen

$$
110 = a \cdot 1.52 + b, \qquad 85 = a \cdot 1.11 + b .
$$

Subtrahera den andra ekvationen från den första,

$$
a = \frac{110 - 85}{1.52 - 1.11} = 60.98 .
$$

Sätt sedan tillbaka för att få \(b\),

$$
b = 110 - a \cdot 1.52 = 17.32 .
$$

Detta är precis som på gymnasiet: genom två punkter går en unik linje.

<br />

### 2.2 Visuell kontroll

Vi kan alltid verifiera genom att rita. Placera de två punkterna i planet och rita linjen med lutning \(a = 60.98\) och skärning \(b = 17.32\). Linjen går genom båda punkterna. Därmed har vi vår första fungerande maskininlärningsmodell: givet längd kan vi uppskatta vikt.

<br />

### 2.3 Övergång till \(N\) prover

Med fler än två prover får vi ett ekvationssystem:

$$
\begin{aligned}
y_1 &= a x_1 + b , \\
y_2 &= a x_2 + b , \\
&\;\;\vdots \\
y_N &= a x_N + b .
\end{aligned}
$$

I praktiken ligger punkterna inte exakt på en och samma linje, eftersom verkliga mätningar innehåller brus. I stället söker vi en linje som är “så nära som möjligt” alla punkter.

<br />

### 2.4 Residualer och fel

För varje punkt definierar vi residualen

$$
r_i = y_i - \hat{y}_i , \qquad i = 1, \ldots, N .
$$

Här är \(\hat{y}_i = a x_i + b\) modellens prediktion. Vilka \(a\) och \(b\) vi än väljer uppstår residualer. Frågan är hur vi hittar den linje som minimerar dem totalt.

<br />

![Board notes](/images/docs/Lecture%202_Linearregression/3.png)

### 2.5 Att definiera felet

En naturlig idé är att summera residualerna:

$$
\text{err}_1 = \sum_{i=1}^N (y_i - \hat{y}_i) .
$$

Det verkar rimligt vid första anblick. Men om vissa punkter ligger över linjen och andra under kan felen ta ut varandra. Summan kan bli noll trots dålig passning.

<br />

En bättre idé är att ta absolutbeloppet:

$$
\text{err}_2 = \sum_{i=1}^N \lvert y_i - \hat{y}_i \rvert .
$$

Det undviker borttagning men lutningen är inte väl definierad vid noll, vilket gör optimeringen svårare.

<br />

Därför väljer man oftast att kvadrera felen:

$$
\text{err}_3 = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 .
$$

Detta är **medelkvadratfel (MSE)**. Kvadrering gör alla fel positiva och ger en mjukare optimering, och normalisering med \(N\) tar bort effekten av antalet prover.

<br />

### 2.6 Ingenjörsregeln

Läraren betonade det han kallade “ingenjörens första regel”:

Om du behöver mäta fel men inte vet vilket mått du ska använda, använd **MSE**. Det leder dig oftast åt rätt håll.

<br />

---

## Del 3: Minimera felet

![Board notes](/images/docs/Lecture%202_Linearregression/4.png)

Vi har nu medelkvadratfelet (MSE):

$$
L_{\text{MSE}} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 = \frac{1}{N} \sum_{i=1}^N (y_i - (a x_i + b))^2 .
$$

För vilka \(a\) och \(b\) som helst kan vi beräkna detta fel. Uppgiften är att hitta de värden som minimerar det:

$$
a, b = \arg \min_{a, b} L_{\text{MSE}} .
$$

<br />

### 3.1 Brute force-lösning

Det första angreppssättet är brute force. Om inget annat fungerar, fungerar brute force.

Vi kan loopa över möjliga värden på \(a\) och \(b\), beräkna felet och behålla det bästa paret:

- For \(a = -100 : 1 : +100\)  
  - For \(b = -100 : 1 : +100\)  
    - calculate \(L_{\text{MSE}}(a, b)\)  
    - if smaller than best so far → update \(a, b\)  

Även med tusentals punkter går detta snabbt på en dator. Brute force är enkelt att implementera, garanterar en lösning och ger en baslinje för mer avancerade metoder.

<br />

### 3.2 Visualisera felplanet

Tänk på \(L_{\text{MSE}}\) som en funktion av \(a\) och \(b\). Detta är en yta i tre dimensioner.  
För varje par \((a, b)\) kan vi beräkna felet. Genom att plotta värdena får vi ett landskap där den lägsta punkten är den optimala lösningen. Mörkare områden motsvarar lägre fel.  
Från en sådan figur kan vi göra en grov gissning: till exempel \(a \approx 50\), \(b \approx 20\).

<br />

### 3.3 Varför brute force är användbart

Brute force är alltid ett alternativ. Det är lätt att implementera, tillräckligt snabbt för små intervall och garanterar en lösning.  
Ännu viktigare är att brute force ger en baslinje. Om vi senare tar fram en smartare metod kan vi alltid jämföra med brute force; om den “bättre” metoden är sämre, är något fel.  
Men brute force är inte det enda sättet. Vi har också något bättre – och det kräver bara gymnasiematematik.

<br />

### 3.4 Använd derivator för att hitta minimum

![Board notes](/images/docs/Lecture%202_Linearregression/5.png)

Felfunktionen är

$$
L_{\text{MSE}}(a, b) = \frac{1}{N} \sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)^2 .
$$

Detta är en funktion av parametrarna \(a\) och \(b\).  
Datasettet \((x_i, y_i)\) är fast; endast \(a\) och \(b\) påverkar utfallet.

Vi vill hitta funktionens minimum. Från gymnasiematematiken:

- I ett minimum är derivatan noll.  
- För en tvåvariabelfunktion sätter man båda partialderivatorna till noll:  

$$
\frac{\partial L_{\text{MSE}}}{\partial a} = 0, 
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b} = 0 .
$$

Tillsammans betyder dessa att **gradienten är noll** i den optimala punkten.

Detta är huvudidén. Nästa steg är att expandera definitionen av \(L_{\text{MSE}}\), ta derivator och lösa ut \(a\) och \(b\). Det leder till en analytisk lösning som kopplar direkt till hemuppgifter och nästa veckas övning.

<br />

---
## Del 4 : Lös $a$ och $b$ med derivator

![Board notes](/images/docs/Lecture%202_Linearregression/6.png)

Vi använder bara gymnasiematematik. Datamängden $\{(x_i,y_i)\}_{i=1}^N$ är fix; felet ändras bara när $a$ eller $b$ ändras.

Medelkvadratfelet är

$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-(a x_i+b)\bigr)^2 .
$$

I ett minimum är derivatorna noll:

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0 .
$$

<br />

### 4.1 Derivera med avseende på $a$

Börja från definitionen och flytta in derivatan i summan (deriveringens linearitet). Använd kedjeregeln på varje kvadratterm.

$$
\begin{aligned}
\frac{\partial L_{\text{MSE}}}{\partial a}
&= \frac{1}{N}\sum_{i=1}^{N}
\frac{\partial}{\partial a}\Bigl(y_i-(a x_i+b)\Bigr)^2 \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot
\frac{\partial}{\partial a}\Bigl(y_i-(a x_i+b)\Bigr) \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot(-x_i) .
\end{aligned}
$$

Sätt detta lika med noll och förkorta bort den icke-nolliga konstanten $-2/N$:

$$
\sum_{i=1}^{N} x_i\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Expandera och gruppera lika termer:

$$
\sum_{i=1}^{N} x_i y_i
- a\sum_{i=1}^{N} x_i^2
- b\sum_{i=1}^{N} x_i
=0
\;\;\Longleftrightarrow\;\;
a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i .
$$

Isolera $a$ som funktion av $b$:

$$
a
=
\frac{\sum_{i=1}^{N} x_i y_i - b\sum_{i=1}^{N} x_i}
{\sum_{i=1}^{N} x_i^{2}} .
$$

<br />

### 4.2 Derivera med avseende på $b$

Samma idé:

$$
\begin{aligned}
\frac{\partial L_{\text{MSE}}}{\partial b}
&= \frac{1}{N}\sum_{i=1}^{N}
\frac{\partial}{\partial b}\Bigl(y_i-(a x_i+b)\Bigr)^2 \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot
\frac{\partial}{\partial b}\Bigl(y_i-(a x_i+b)\Bigr) \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot(-1).
\end{aligned}
$$

Sätt lika med noll och förkorta bort $-2/N$:

$$
\sum_{i=1}^{N}\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Expandera och lös $b$ som funktion av $a$:

$$
\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i - N b = 0
\quad\Longrightarrow\quad
b
=
\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

<br />

### 4.3 Lös ekvationsparet (alla algebra-steg visas)

Vi har nu paret

$$
\text{(A)}\;\; a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i,
\qquad
\text{(B)}\;\; a\sum_{i=1}^{N} x_i + N b = \sum_{i=1}^{N} y_i .
$$

Från (B),

$$
b=\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

Sätt in detta $b$ i (A):

$$
a\sum_{i=1}^{N} x_i^2
+ \left(\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}\right)\!\left(\sum_{i=1}^{N} x_i\right)
= \sum_{i=1}^{N} x_i y_i .
$$

Multiplicera ut mittentermen:

$$
a\sum_{i=1}^{N} x_i^2
+ \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}
- a\,\frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}
= \sum_{i=1}^{N} x_i y_i .
$$

Flytta termer utan $a$ till höger och faktorisera ut $a$:

$$
a\left(\sum_{i=1}^{N} x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}\right)
=
\sum_{i=1}^{N} x_i y_i
- \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}.
$$

Multiplicera båda sidor med $N$ för att ta bort nämnaren:

$$
a\Bigl(N\sum_{i=1}^{N} x_i^2 - \bigl(\sum_{i=1}^{N} x_i\bigr)^2\Bigr)
=
N\sum_{i=1}^{N} x_i y_i
- \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr).
$$

Alltså

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2}.
$$

**Beräkna till sist $b$ från den tidigare formeln (visa insättningen tydligt)**

Vi har två formler:

- Från $\dfrac{\partial L}{\partial b}=0$:
  $$
  (B1)\qquad b=\frac{\sum_{i=1}^{N} y_i}{N}\;-\;a\,\frac{\sum_{i=1}^{N} x_i}{N}.
  $$

- Från lösningen för $a$:
  $$
  (\star)\qquad
  a=\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
         {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 }.
  $$

**Steg 1.** Börja från (B1) där $a$ fortfarande “syns”:
$$
b=\frac{\sum_{i=1}^{N} y_i}{N} \;-\; a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

**Steg 2.** Ersätt $a$ med hela bråket i $(\star)$ (detta är “sätt in \(a\)”):
$$
b=\frac{\sum_{i=1}^{N} y_i}{N}
-\frac{\sum_{i=1}^{N} x_i}{N}\;
\underbrace{\frac{N\sum_{i=1}^{N} x_i y_i - (\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)}
{N\sum_{i=1}^{N} x_i^{2} - (\sum_{i=1}^{N} x_i)^2}}_{\text{detta är }a\text{ från }(\star)}.
$$

**Steg 3.** Sätt allt över en gemensam nämnare \(N\bigl(N\sum x_i^2-(\sum x_i)^2\bigr)\):
$$
b=
\frac{
\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i y_i-(\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)\Bigr)
}{
N\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
}.
$$

**Steg 4.** Expandera täljaren term för term:

$$
\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(N\sum_{i=1}^N x_i^2 - \Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigr)
-\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(N\sum_{i=1}^N x_i y_i - \Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigr)
$$

Fördela:

$$
N\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i^2\Bigr)
-\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i\Bigr)^2
-N\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N x_i y_i\Bigr)
+\Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigl(\sum_{i=1}^N y_i\Bigr).
$$

Den andra och fjärde termen är lika stora med motsatta tecken, så de tar ut varandra.  
Dividera täljare och nämnare med $N$:

$$
b=
\frac{\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i y_i\Bigr)}
{\,N\sum_{i=1}^{N} x_i^2 - \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2\,}.
$$


**Steg 5.** Medelvärdesform (samma resultat, enklare att räkna):
definiera $\displaystyle \bar x=\frac{1}{N}\sum_{i=1}^{N}x_i$ och
$\displaystyle \bar y=\frac{1}{N}\sum_{i=1}^{N}y_i$, då
$$
\boxed{\,b=\bar y - a\,\bar x\,}.
$$


<br />

### 4.4 Vad som ska beräknas till övningen

Du behöver bara fyra summor och två formler:

$$
\sum_{i=1}^{N} x_i,\qquad
\sum_{i=1}^{N} y_i,\qquad
\sum_{i=1}^{N} x_i^2,\qquad
\sum_{i=1}^{N} x_i y_i .
$$

Sedan

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2},
\qquad
b
=
\frac{\sum_{i=1}^{N} y_i}{N}
- a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

Efter det kan du rita linjen $\hat{y} = a x + b$ och visuellt jämföra med punkterna.

### 4.5 Slutliga explicita lösningar

Givet $N$ prov $(x_1,y_1),(x_2,y_2),\ldots,(x_N,y_N)$ och den linjära modellen $y=ax+b$, så minimerar

$$
a \;=\;
\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
     {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2},
$$

$$
b \;=\; \frac{\sum_{i=1}^{N} y_i \;-\; a\sum_{i=1}^{N} x_i}{N}
\;=\; \bar{y} \;-\; a\,\bar{x},
\qquad
\bar{x}=\frac{1}{N}\sum_{i=1}^{N}x_i,\;\;
\bar{y}=\frac{1}{N}\sum_{i=1}^{N}y_i .
$$

Dessa formler gäller när
$$
N\sum_{i=1}^{N} x_i^2 \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 \neq 0,
$$
vilket betyder att $x_i$ inte alla är lika. Den fullständiga härledningen finns i avsnitt 4.1–4.3.

### 4.6 Snabbkontroll

Algebraisk kontroll (utan siffror): ovanstående lösningar uppfyller
$$
\sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)=0,
\qquad
\sum_{i=1}^N x_i \bigl(y_i - (a x_i + b)\bigr)=0,
$$
vilket är precis de två normalekvationerna vi härledde. Alltså är residualernas medelvärde noll och de korrelerar inte med $x$.

Liten numerisk kontroll (valfri): ta $(0,1),(1,3),(2,5),(3,7)$. Då
$$
\sum x_i=6,\ \sum y_i=16,\ \sum x_i^2=14,\ \sum x_i y_i=34,\ N=4.
$$
Insatt i formlerna fås
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}=2,\qquad
b=\frac{16-2\cdot6}{4}=1,
$$
så $\hat y=2x+1$ och alla residualer är $0$.

<br />

---

## Del 5 : Från en insignal till många

![Board notes](/images/docs/Lecture%202_Linearregression/7.png)

Vi går från en enda insignal till flera. Idén är densamma; endast notationerna växer.

<br />

### 5.1 Modell med två insignaler

För två insignaler och en bias:
$$
y \;=\; w_1 x_1 \;+\; w_2 x_2 \;+\; w_0 .
$$

För prov $i$:
$$
\hat y^{(i)} \;=\; w_1 x_1^{(i)} \;+\; w_2 x_2^{(i)} \;+\; w_0 .
$$

Geometriskt är detta ett plan i rymden $(x_1,x_2,y)$.

<br />

### 5.2 Vektor- och matrisform (precis som på tavlan)

Samla prediktioner, parametrar och insignaler:

$$
\hat{\mathbf y} \;=\;
\begin{pmatrix}
\hat y^{(1)}\\[2pt]\hat y^{(2)}\\[2pt]\vdots\\[2pt]\hat y^{(N)}
\end{pmatrix},
\qquad
\mathbf w \;=\;
\begin{pmatrix}
w_1\\[2pt] w_2\\[2pt] w_0
\end{pmatrix},
\qquad
A \;=\;
\begin{pmatrix}
x_1^{(1)} & x_2^{(1)} & 1\\
x_1^{(2)} & x_2^{(2)} & 1\\
\vdots    & \vdots    & \vdots\\
x_1^{(N)} & x_2^{(N)} & 1
\end{pmatrix}.
$$

Dimensioner: $A\in\mathbb R^{N\times 3}$, $\mathbf w\in\mathbb R^{3\times 1}$, $\hat{\mathbf y}\in\mathbb R^{N\times 1}$.

Kompakt form (lärarens rad):
$$
\hat{\mathbf y} \;=\; A\,\mathbf w .
$$

Med MSE,
$$
L_{\text{MSE}}(\mathbf w)=\tfrac1N\|\mathbf y-A\mathbf w\|_2^2,
$$
är normalekvationerna
$$
A^\top A\,\mathbf w \;=\; A^\top \mathbf y,
$$
och om $A^\top A$ är inverterbar,
$$
\boxed{\;\mathbf w=(A^\top A)^{-1}A^\top \mathbf y\;}
$$
(”lös ut $\mathbf w$”).

Detta utökas till godtyckligt antal insignaler genom att lägga till kolumner i $A$ och komponenter i $\mathbf w$.

<br />

### 5.3 ”Icke-linjärt” via feature-expansion (endast kvadrattermer, som på tavlan)

Behåll en **linjär modell i dragen (features)**, men ändra kolumnerna i $A$ så att de inkluderar kvadrattermer:

$$
\hat y \;=\; w_3\,x_1^2 \;+\; w_4\,x_2^2 \;+\; w_1\,x_1 \;+\; w_2\,x_2 \;+\; w_0 .
$$

Bygg
$$
A \;=\;
\begin{pmatrix}
x_1^{(1)2} & x_2^{(1)2} & x_1^{(1)} & x_2^{(1)} & 1\\
\vdots     & \vdots      & \vdots    & \vdots    & \vdots\\
x_1^{(N)2} & x_2^{(N)2} & x_1^{(N)} & x_2^{(N)} & 1
\end{pmatrix},
\qquad
\mathbf w =
\begin{pmatrix}
w_3\\ w_4\\ w_1\\ w_2\\ w_0
\end{pmatrix}.
$$

Återigen $\hat{\mathbf y}=A\mathbf w$ och lösningen är **densamma**
$$
\mathbf w=(A^\top A)^{-1}A^\top\mathbf y.
$$

<br />

### 5.4 En snabb not om robust anpassning (RANSAC-idé)

Uteliggare förekommer. Skissen: välj två punkter slumpmässigt, anpassa linje/plan, sätt ett avståndströskelvärde, räkna inliers, repetera, behåll modellen med flest inliers, och anpassa om på dessa inliers. Fungerar väl, men du måste välja tröskeln själv (no free lunch).

<br />

### 5.5 Vad som ska implementeras

Förbered $A$ med en rad per prov och en kolumn per drag samt en kolumn med ettor. Bygg $\mathbf y$. Beräkna sedan
$$
\mathbf w=(A^\top A)^{-1}A^\top \mathbf y,
$$
plotta $\hat{\mathbf y}=A\mathbf w$ och jämför med data.
