---
title: "Machine Learning 2: Lineær regresjon"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 28.8.2025 TB104"
date: 2025-09-01
lang: "no"
excerpt: "Trinn-for-trinn-utledning av enkel lineær regresjon ($y = a x + b$): vi definerer residualer og MSE, bruker kjederegelen, setter de partielle deriverte lik null, løser de normale ligningene for $a$ og $b$, og verifiserer med et lite numerisk eksempel."
tags: ["Joni Kämäräinen", machine-learning, linear-regression, calculus, least-squares]
draft: false
---
## Utlede a og b for en lineær modell fra bunnen av med minste kvadraters metode

## Del 1 : Introduksjon

![Tavlenotater](/images/docs/Lecture%202_Linearregression/1.png)

Vi startet med det mest grunnleggende problemet i maskinlæring. Læreren forklarte at den samme ideen også ligger inne i nevrale nettverk og moderne språkmodeller. Matematikken du lærte på videregående, er nok til å følge dagens forelesning.

<br />

### 1.1 Den lineære modellen

Vi minner om den kjente linjeligningen:

$$
y = a x + b .
$$

Dette kalles en lineær modell. Foreløpig har vi én inngang og én utgang, men den samme ideen kan utvides til mange innganger og mange utganger.

Her er $x$ inngangen (en observasjon vi kan måle), og $y$ er målvariabelen.

<br />

### 1.2 Modellparametere

De to parameterne er stigning og konstantledd:

* $a$ er stigningen. Den bestemmer hvor bratt linjen er. Hvis $a = 0$, er linjen parallell med $x$-aksen. Større verdier gjør at linjen øker raskere.  
* $b$ er konstantleddet (bias). Uten $b$ går linjen alltid gjennom origo; med $b$ kan vi flytte linjen opp eller ned langs $y$-aksen.

<br />

### 1.3 Treningsdata

For å lære trenger vi treningsdata, altså par av observasjoner:

$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

Med null observasjoner er alle linjer like “fornuftige”. Uten forkunnskap kan vi ikke velge gode verdier for $a$ og $b$.

Med én observasjon, for eksempel

$$
(x_1, y_1) = (1.11, 85) ,
$$

blir modellen

$$
y_1 = a x_1 + b .
$$

Dermed kan vi løse ut $b$:

$$
b = y_1 - a x_1 = 85 - a \cdot 1.11 .
$$

Her kan $a$ velges fritt, og $b$ bestemmes deretter. Enhver linje som går gjennom dette punktet har null feil.

<br />

### 1.4 Mot flere observasjoner

Én observasjon er ikke nok til å bestemme én unik linje. Med to observasjoner finnes det nøyaktig én linje som går gjennom begge punktene. Der fortsetter vi neste.

<br />

---

## Del 2: Fra to prøver til mange

![Board notes](/images/docs/Lecture%202_Linearregression/2.png)

Vi legger nå til én prøve til. Anta at den andre prøven er

$$
(x_2, y_2) = (1.52, 110) .
$$

<br />

### 2.1 Løsning med to prøver

Modellelikningene er

$$
y_1 = a x_1 + b, \qquad y_2 = a x_2 + b .
$$

Sett inn tallene

$$
110 = a \cdot 1.52 + b, \qquad 85 = a \cdot 1.11 + b .
$$

Trekk den andre likningen fra den første,

$$
a = \frac{110 - 85}{1.52 - 1.11} = 60.98 .
$$

Sett så tilbake for å finne \(b\),

$$
b = 110 - a \cdot 1.52 = 17.32 .
$$

Dette er akkurat som på videregående: det finnes én unik linje gjennom to punkter.

<br />

### 2.2 Visuell sjekk

Vi kan alltid verifisere ved å tegne. Plasser de to punktene i planet og tegn linjen med stigning \(a = 60.98\) og skjæringspunkt \(b = 17.32\). Linjen går gjennom begge punktene. Dermed har vi vår første fungerende maskinlæringsmodell: gitt høyde kan vi anslå vekt.

<br />

### 2.3 Videre til \(N\) prøver

Med flere enn to prøver får vi et ligningssystem:

$$
\begin{aligned}
y_1 &= a x_1 + b , \\
y_2 &= a x_2 + b , \\
&\;\;\vdots \\
y_N &= a x_N + b .
\end{aligned}
$$

I praksis ligger punktene ikke nøyaktig på én linje, fordi virkelige målinger inneholder støy. I stedet søker vi en linje som er “så nær som mulig” alle punktene.

<br />

### 2.4 Residualer og feil

Definer residualen for hvert punkt

$$
r_i = y_i - \hat{y}_i , \qquad i = 1, \ldots, N .
$$

Her er \(\hat{y}_i = a x_i + b\) modellens prediksjon. Uansett hvilke \(a\) og \(b\) vi velger, oppstår residualer. Spørsmålet er hvordan vi finner linjen som minimerer dem totalt.

<br />

![Board notes](/images/docs/Lecture%202_Linearregression/3.png)

### 2.5 Å definere feilen

En naturlig idé er å summere residualene:

$$
\text{err}_1 = \sum_{i=1}^N (y_i - \hat{y}_i) .
$$

Dette ser fornuftig ut ved første øyekast. Men hvis noen punkter ligger over linjen og andre under, kan feilene oppheve hverandre. Summen kan bli null selv om tilpasningen er dårlig.

<br />

En bedre idé er å bruke absoluttverdi:

$$
\text{err}_2 = \sum_{i=1}^N \lvert y_i - \hat{y}_i \rvert .
$$

Da opphever de ikke hverandre, men ved null er stigningen ikke godt definert, noe som gjør optimalisering vanskeligere.

<br />

Derfor velger man ofte å kvadrere feilene:

$$
\text{err}_3 = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 .
$$

Dette er **middelkvadratfeil (MSE)**. Kvadrering gjør alle feil positive og gir en glattere optimalisering, og normalisering med \(N\) fjerner effekten av antall prøver.

<br />

### 2.6 Ingeniørregelen

Læreren understreket det han kalte “ingeniørens første regel”:

Når du må måle feil og ikke vet hva du skal bruke, bruk **MSE**. Det leder deg som regel i riktig retning.

<br />

---

## Del 3: Minimere feilen

![Board notes](/images/docs/Lecture%202_Linearregression/4.png)

Vi har nå middelkvadratfeilen (MSE):

$$
L_{\text{MSE}} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 = \frac{1}{N} \sum_{i=1}^N (y_i - (a x_i + b))^2 .
$$

For vilkårlige \(a\) og \(b\) kan vi beregne denne feilen. Oppgaven er å finne verdiene som minimerer den:

$$
a, b = \arg \min_{a, b} L_{\text{MSE}} .
$$

<br />

### 3.1 Brute force-løsning

Den første tilnærmingen er brute force. Hvis ingenting annet virker, virker brute force.

Vi kan loope over mulige verdier av \(a\) og \(b\), beregne feilen og beholde det beste paret:

- For \(a = -100 : 1 : +100\)  
  - For \(b = -100 : 1 : +100\)  
    - calculate \(L_{\text{MSE}}(a, b)\)  
    - if smaller than best so far → update \(a, b\)  

Selv med tusenvis av punkter går dette raskt på en datamaskin. Brute force er enkelt å implementere, garanterer en løsning og gir en referanse for mer avanserte metoder.

<br />

### 3.2 Visualisere feilflaten

Tenk på \(L_{\text{MSE}}\) som en funksjon av \(a\) og \(b\). Dette er en flate i tre dimensjoner.  
For hvert par \((a, b)\) kan vi beregne feilen. Ved å plotte verdiene får vi et landskap der det laveste punktet er den optimale løsningen. Mørkere områder tilsvarer lavere feil.  
Fra en slik figur kan vi gjøre et grovt anslag: for eksempel \(a \approx 50\), \(b \approx 20\).

<br />

### 3.3 Hvorfor brute force er nyttig

Brute force er alltid et alternativ. Det er lett å implementere, raskt nok for små intervaller og garanterer en løsning.  
Enda viktigere: brute force gir en baseline. Hvis vi senere lager en smartere metode, kan vi alltid sammenligne med brute force; hvis den “bedre” metoden er dårligere, er noe galt.  
Men brute force er ikke eneste vei. Vi har også noe bedre, og det krever bare videregående matematikk.

<br />

### 3.4 Bruk derivater for å finne minimum

![Board notes](/images/docs/Lecture%202_Linearregression/5.png)

Feilfunksjonen er

$$
L_{\text{MSE}}(a, b) = \frac{1}{N} \sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)^2 .
$$

Dette er en funksjon av parameterne \(a\) og \(b\).  
Datasettet \((x_i, y_i)\) er fast; det er bare \(a\) og \(b\) som endrer utfallet.

Vi vil finne funksjonens minimum. Fra videregående matematikk:

- I et minimum er derivatet null.  
- For en funksjon i to variabler setter vi begge partisielle deriverte lik null:  

$$
\frac{\partial L_{\text{MSE}}}{\partial a} = 0, 
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b} = 0 .
$$

Til sammen betyr dette at **gradienten er null** i det optimale punktet.

Dette er nøkkelideen. Neste steg er å utvide definisjonen av \(L_{\text{MSE}}\), ta deriverte og løse ut \(a\) og \(b\). Det gir en analytisk løsning som kobler direkte til lekser og neste ukes øving.

<br />

---
## Del 4 : Løs $a$ og $b$ med derivasjon

![Board notes](/images/docs/Lecture%202_Linearregression/6.png)

Vi bruker bare matematikk på videregående nivå. Datasettet $\{(x_i,y_i)\}_{i=1}^N$ er fast; feilen endres bare når $a$ eller $b$ endres.

Gjennomsnittlig kvadratfeil (MSE) er

$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-(a x_i+b)\bigr)^2 .
$$

I et minimum er de deriverte null:

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0 .
$$

<br />

### 4.1 Deriver med hensyn på $a$

Start fra definisjonen og flytt den deriverte inn i summen (linearitet). Bruk kjerneregelen på hver kvadratterm.

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

Sett lik null og stryk den ikke-null konstante $-2/N$:

$$
\sum_{i=1}^{N} x_i\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Utvid og samle like ledd:

$$
\sum_{i=1}^{N} x_i y_i
- a\sum_{i=1}^{N} x_i^2
- b\sum_{i=1}^{N} x_i
=0
\;\;\Longleftrightarrow\;\;
a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i .
$$

Isoler $a$ som en funksjon av $b$:

$$
a
=
\frac{\sum_{i=1}^{N} x_i y_i - b\sum_{i=1}^{N} x_i}
{\sum_{i=1}^{N} x_i^{2}} .
$$

<br />

### 4.2 Deriver med hensyn på $b$

Samme idé:

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

Sett lik null og stryk $-2/N$:

$$
\sum_{i=1}^{N}\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Utvid og løs $b$ som funksjon av $a$:

$$
\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i - N b = 0
\quad\Longrightarrow\quad
b
=
\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

<br />

### 4.3 Løs de to likningene (alle algebra-steg vises)

Vi har nå paret

$$
\text{(A)}\;\; a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i,
\qquad
\text{(B)}\;\; a\sum_{i=1}^{N} x_i + N b = \sum_{i=1}^{N} y_i .
$$

Fra (B),

$$
b=\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

Sett dette $b$ inn i (A):

$$
a\sum_{i=1}^{N} x_i^2
+ \left(\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}\right)\!\left(\sum_{i=1}^{N} x_i\right)
= \sum_{i=1}^{N} x_i y_i .
$$

Multipliser ut midterleddet:

$$
a\sum_{i=1}^{N} x_i^2
+ \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}
- a\,\frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}
= \sum_{i=1}^{N} x_i y_i .
$$

Flytt ledd uten $a$ til høyre og faktoriser ut $a$:

$$
a\left(\sum_{i=1}^{N} x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}\right)
=
\sum_{i=1}^{N} x_i y_i
- \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}.
$$

Gang begge sider med $N$ for å fjerne nevneren:

$$
a\Bigl(N\sum_{i=1}^{N} x_i^2 - \bigl(\sum_{i=1}^{N} x_i\bigr)^2\Bigr)
=
N\sum_{i=1}^{N} x_i y_i
- \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr).
$$

Dermed

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2}.
$$

**Til slutt: beregn $b$ fra den tidligere formelen (vis innsettingen tydelig)**

Vi har to formler:

- Fra $\dfrac{\partial L}{\partial b}=0$:
  $$
  (B1)\qquad b=\frac{\sum_{i=1}^{N} y_i}{N}\;-\;a\,\frac{\sum_{i=1}^{N} x_i}{N}.
  $$

- Fra løsningen for $a$:
  $$
  (\star)\qquad
  a=\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
         {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 }.
  $$

**Trinn 1.** Start fra (B1) der $a$ fortsatt er synlig:
$$
b=\frac{\sum_{i=1}^{N} y_i}{N} \;-\; a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

**Trinn 2.** Erstatt $a$ med hele brøken i $(\star)$ (dette er “sett inn \(a\)”):
$$
b=\frac{\sum_{i=1}^{N} y_i}{N}
-\frac{\sum_{i=1}^{N} x_i}{N}\;
\underbrace{\frac{N\sum_{i=1}^{N} x_i y_i - (\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)}
{N\sum_{i=1}^{N} x_i^{2} - (\sum_{i=1}^{N} x_i)^2}}_{\text{dette er }a\text{ fra }(\star)}.
$$

**Trinn 3.** Skriv alt over en felles nevner \(N\bigl(N\sum x_i^2-(\sum x_i)^2\bigr)\):
$$
b=
\frac{
\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i y_i-(\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)\Bigr)
}{
N\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
}.
$$

**Trinn 4.** Utvid telleren ledd for ledd:

$$
\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(N\sum_{i=1}^N x_i^2 - \Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigr)
-\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(N\sum_{i=1}^N x_i y_i - \Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigr)
$$

Distribuer:

$$
N\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i^2\Bigr)
-\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i\Bigr)^2
-N\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N x_i y_i\Bigr)
+\Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigl(\sum_{i=1}^N y_i\Bigr).
$$

Den andre og fjerde termen er like store med motsatt fortegn og kansellerer.  
Del teller og nevner med $N$:

$$
b=
\frac{\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i y_i\Bigr)}
{\,N\sum_{i=1}^{N} x_i^2 - \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2\,}.
$$


**Trinn 5.** Gjennomsnittsform (samme resultat, enklere å regne):
definer $\displaystyle \bar x=\frac{1}{N}\sum_{i=1}^{N}x_i$ og
$\displaystyle \bar y=\frac{1}{N}\sum_{i=1}^{N}y_i$, da
$$
\boxed{\,b=\bar y - a\,\bar x\,}.
$$


<br />

### 4.4 Hva du skal regne i oppgaven

Du trenger bare fire summer og to formler:

$$
\sum_{i=1}^{N} x_i,\qquad
\sum_{i=1}^{N} y_i,\qquad
\sum_{i=1}^{N} x_i^2,\qquad
\sum_{i=1}^{N} x_i y_i .
$$

Deretter

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

Etterpå kan du tegne linjen $\hat{y} = a x + b$ og sjekke visuelt mot punktene.

### 4.5 Endelige eksplisitte løsninger

Gitt $N$ prøver $(x_1,y_1),(x_2,y_2),\ldots,(x_N,y_N)$ og den lineære modellen $y=ax+b$, er minst-kvadratløsningene

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

Disse formlene gjelder når
$$
N\sum_{i=1}^{N} x_i^2 \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 \neq 0,
$$
som betyr at $x_i$ ikke alle er like. Hele utledningen står i seksjon 4.1–4.3.

### 4.6 Rask sjekk

Algebraisk sjekk (uten tall): løsningene over tilfredsstiller
$$
\sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)=0,
\qquad
\sum_{i=1}^N x_i \bigl(y_i - (a x_i + b)\bigr)=0,
$$
som er akkurat de to normallikningene vi utledet. Dermed er gjennomsnittlig residual null og ukorrelert med $x$.

Liten numerisk sjekk (valgfri): ta $(0,1),(1,3),(2,5),(3,7)$. Da
$$
\sum x_i=6,\ \sum y_i=16,\ \sum x_i^2=14,\ \sum x_i y_i=34,\ N=4.
$$
Setter vi inn, får vi
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}=2,\qquad
b=\frac{16-2\cdot6}{4}=1,
$$
altså $\hat y=2x+1$ og alle residualer er $0$.

<br />

---

## Del 5 : Fra én input til mange input

![Board notes](/images/docs/Lecture%202_Linearregression/7.png)

Vi går fra én enkelt input til flere. Ideen er den samme; bare notasjonen vokser.

<br />

### 5.1 Modell med to input

For to input og ett bias-ledd:
$$
y \;=\; w_1 x_1 \;+\; w_2 x_2 \;+\; w_0 .
$$

For prøve $i$:
$$
\hat y^{(i)} \;=\; w_1 x_1^{(i)} \;+\; w_2 x_2^{(i)} \;+\; w_0 .
$$

Geometrisk er dette et plan i $(x_1,x_2,y)$-rommet.

<br />

### 5.2 Vektor- og matriseform (akkurat som på tavla)

Samle prediksjoner, parametre og input:

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

Dimensjoner: $A\in\mathbb R^{N\times 3}$, $\mathbf w\in\mathbb R^{3\times 1}$, $\hat{\mathbf y}\in\mathbb R^{N\times 1}$.

Kompakt form (lærerens linje):
$$
\hat{\mathbf y} \;=\; A\,\mathbf w .
$$

Med MSE,
$$
L_{\text{MSE}}(\mathbf w)=\tfrac1N\|\mathbf y-A\mathbf w\|_2^2,
$$
er normallikningene
$$
A^\top A\,\mathbf w \;=\; A^\top \mathbf y,
$$
og hvis $A^\top A$ er inverterbar,
$$
\boxed{\;\mathbf w=(A^\top A)^{-1}A^\top \mathbf y\;}
$$
(«løs ut $\mathbf w$»).

Dette utvides til vilkårlig mange input ved å legge til kolonner i $A$ og komponenter i $\mathbf w$.

<br />

### 5.3 «Ikke-lineær» via feature-utvidelse (bare kvadratiske ledd, som på tavla)

Behold en **lineær modell i features**, men endre kolonnene i $A$ til å inkludere kvadratiske ledd:

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

Igjen $\hat{\mathbf y}=A\mathbf w$ og løsningen er **den samme**
$$
\mathbf w=(A^\top A)^{-1}A^\top\mathbf y.
$$

<br />

### 5.4 Kort om robust tilpasning (RANSAC-idé)

Uteliggere skjer. Skissen: velg to punkter tilfeldig, tilpass linje/plan, sett en avstandsterskel, tell inliers, repeter, behold modellen med flest inliers, og tilpass på nytt på disse inliers. Fungerer bra, men du må velge terskelen selv (no free lunch).

<br />

### 5.5 Hva du skal implementere

Forbered $A$ med én rad per prøve og én kolonne per feature pluss en kolonne med ett-ere. Bygg $\mathbf y$. Beregn deretter
$$
\mathbf w=(A^\top A)^{-1}A^\top \mathbf y,
$$
plott $\hat{\mathbf y}=A\mathbf w$, og sammenlikn med data.
