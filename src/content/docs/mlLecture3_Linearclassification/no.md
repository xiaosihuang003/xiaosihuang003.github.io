---
title: "ML_3: Lineær klassifisering"
subtitle: "DATA.ML.100 · Joni Kämäräinen · man 1.9.2025 · K1704"
date: 2025-09-02
lang: no
excerpt: "Vi går gjennom lineær regresjon → enkel baseline → klassifisering. k-NN (avstand/k/kompleksitet), perspektivet med linjetilpasning, trinnregel, logistisk (sigmoid) utgang, MSE-gradienter og hvorfor det ikke finnes en analytisk løsning — innledning til nevrale nettverk."
tags: ["Joni Kämäräinen","machine-learning","linear-classification","step-function", "sigmoid-function", "logistic"]
draft: false
---
<details>
<summary><strong>Innholdsfortegnelse (klikk ▶️ ved behov)</strong></summary>

- [Del 1 : Oppsummering fra forrige ukes kurs](#del-1--oppsummering-fra-forrige-ukes-kurs)
  - [1.1 Modell og treningsdata](#11-modell-og-treningsdata)
  - [1.2 Feil og hvordan vi løste det](#12-feil-og-hvordan-vi-løste-det)
  - [1.3 Hvorfor den analytiske løsningen er viktig](#13-hvorfor-den-analytiske-løsningen-er-viktig)
  - [1.4 Hva slags problem dette er](#14-hva-slags-problem-dette-er)
- [Del 2 : Baseline og klassifisering](#del-2--baseline-og-klassifisering)
  - [2.1 En enkel baseline](#21-en-enkel-baseline)
  - [2.2 Overgang til klassifisering](#22-overgang-til-klassifisering)
  - [2.3 Endring av output-type](#23-endring-av-output-type)
  - [2.4 Hva observasjonen er](#24-hva-observasjonen-er)
- [Del 3 : Eksempel: Hobbits vs. alver](#del-3--eksempel-hobbits-vs-alver)
  - [3.1 Læring fra treningsdata](#31-læring-fra-treningsdata)
  - [3.2 Orkenes felle](#32-orkenes-felle)
  - [3.3 Generering av data](#33-generering-av-data)
  - [3.4 Akseptere overlapp](#34-akseptere-overlapp)
  - [3.5 Overgang til to dimensjoner](#35-overgang-til-to-dimensjoner)
  - [3.6 Trening vs. inferens](#36-trening-vs-inferens)
  - [3.7 Første klassifiseringsidé](#37-første-klassifiseringsidé)
- [Del 4 : Nærmeste nabo-klassifiserer](#del-4--nærmeste-nabo-klassifiserer)
  - [4.1 Navn og idé](#41-navn-og-idé)
  - [4.2 Trening (lagre alt)](#42-trening-lagre-alt)
  - [4.3 Inferens (finn den nærmeste og kopier etiketten)](#43-inferens-finn-den-nærmeste-og-kopier-etiketten)
  - [4.4 Enkle baselines for klassifisering](#44-enkle-baselines-for-klassifisering)
  - [4.5 Viktige poeng](#45-viktige-poeng)
- [Del 5 : k-NN betraktninger → linjetilpasning](#del-5--k-nn-betraktninger--linjetilpasning)
  - [5.1 Hva vi kan justere i k-NN](#51-hva-vi-kan-justere-i-k-nn)
  - [5.2 Kan vi klassifisere ved å tilpasse en linje?](#52-kan-vi-klassifisere-ved-å-tilpasse-en-linje)
  - [5.3 Hvordan måler vi feil i klassifisering?](#53-hvordan-måler-vi-feil-i-klassifisering)
- [Del 6 : Fra linjetilpasning til steg, deretter til sigmoid](#del-6--fra-linjetilpasning-til-steg-deretter-til-sigmoid)
  - [6.1 Stegregel og diskriminator](#61-stegregel-og-diskriminator)
  - [6.2 Tilnærme steget med logistisk (sigmoid)](#62-tilnærme-steget-med-logistisk-sigmoid)
  - [6.3 Treningssignal (foreløpig)](#63-treningssignal-foreløpig)
- [Del 7 : MSE med sigmoid-utgang, gradienter (steg-for-steg, ryddig)](#del-7--mse-med-sigmoid-utgang-gradienter-steg-for-steg-ryddig)
  - [7.1 Modell, mål, tap](#71-modell-mål-tap)
  - [7.2 Hvorfor ∂zᵢ/∂b = 1 og ∂zᵢ/∂a = xᵢ?](#72-hvorfor-∂zᵢ∂b--1-og-∂zᵢ∂a--xᵢ)
  - [7.3 Derivert av sigmoid](#73-derivert-av-sigmoid)
  - [7.4 Deriver MSE (kjerneregel)](#74-deriver-mse-kjerneregel)
  - [7.5 Hva hver faktor betyr](#75-hva-hver-faktor-betyr)
  - [7.6 Hvorfor vi ikke har en lukket form](#76-hvorfor-vi-ikke-har-en-lukket-form)

</details>

## Del 1 : Oppsummering fra forrige ukes kurs

![Board notes](/images/docs/Lecture3_Linearclassification/1.png)

Vi startet med ideen om at én observasjon kan skrives som en funksjon $y = f(x)$. Dette gjør det til et maskinlæringsproblem for oss: modellen gir en prediksjon $\hat{y}$, og vi sammenligner den med den sanne verdien $y$.

<br />

### 1.1 Modell og treningsdata

Vi brukte en veldig enkel lineær modell,
$$
\hat{y} = a x + b ,
$$
hvor $a$ og $b$ er parametere som skal læres. Med $N$ eksempler er treningsdataen
$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

<br />

### 1.2 Feil og hvordan vi løste det

For å velge $a$ og $b$ minimerte vi feilen mellom de sanne verdiene og våre prediksjoner:
$$
\mathcal{L} = \sum_{i=1}^{N} (y_i - \hat{y}_i)^2 .
$$
Deretter satte vi gradientene lik null for å finne optimum:
$$
\frac{\partial \mathcal{L}}{\partial a} = 0, \qquad
\frac{\partial \mathcal{L}}{\partial b} = 0 .
$$
Dette gir en analytisk løsning (den samme vi brukte i hjemmeleksen).

<br />

### 1.3 Hvorfor den analytiske løsningen er viktig

Den er svært rask å beregne: vi setter inn punktene, bruker summene, og får resultatet på millisekunder. Denne hastigheten er fornuftig i sanntidssituasjoner (eksemplet i forelesningen var et flysystem som tar rotasjonsbeslutninger omtrent tusen ganger i sekundet).

<br />

### 1.4 Hva slags problem dette er

Outputen vår er en reell verdi, $y \in \mathbb{R}$, så dette er et **regresjonsproblem**. Regresjon dukker opp hele tiden, og uansett hva vi gjør senere, sammenligner vi det først med lineær regresjon.


---
## Del 2 : Baseline og klassifisering

![Board notes](/images/docs/Lecture3_Linearclassification/2.png)

<br />

### 2.1 En enkel baseline

For å vurdere om lineær regresjon er “god nok”, la vi først til en veldig enkel baseline: **ikke lær noe som helst** — bare predikér gjennomsnittet av alle treningsmål. På tavlen ble dette skrevet som “$\hat{y}$ = average of all training data $y_i$”, altså
$$
\hat{y}=\frac{1}{N}\sum_{i=1}^{N} y_i .
$$
Dette er trivielt å beregne, og man bør alltid implementere en slik baseline. Lineær regresjon bør være klart bedre enn dette; hvis ikke, er det noe rart med dataene og vi må sjekke det.

<br />

### 2.2 Overgang til klassifisering

Deretter gikk vi over til et annet viktig ML-problem: **klassifisering**. Hovedpoenget i denne forelesningen er at den samme lineære tilpasningen også kan brukes til klassifisering, men vi trenger noen små triks.

<br />

### 2.3 Endring av output-type

Her er output **ikke et reelt tall**. I stedet er det en av **diskrete verdier** (etiketter). På tavlen:
$$
y \in \{1,2,3\}.
$$
Oppgaven er altså å avgjøre hvilken klasse input tilhører.

<br />

### 2.4 Hva observasjonen er

$x$ er observasjonen. Det kan være mange ting:
- bilde (eksemplene i timen brukte ofte bilder),
- temperatur,
- lyd,
- eller en kombinasjon av disse.

Et typisk eksempel er autonom kjøring: systemet tar bilder mange ganger i sekundet og må oppdage fotgjengere, kjøretøy og syklister, og deretter sende informasjonen videre til kjøresystemet. Dette gjør det til et klassifiseringsproblem med diskrete etiketter.

---

## Del 3 : Eksempel: Hobbits vs. alver

![Board notes](/images/docs/Lecture3_Linearclassification/3.png)

<br />

### 3.1 Læring fra treningsdata

Vi har fortsatt modellen $y = f(x)$, og parameterne til $f$ blir lært fra treningsdata. Denne delen fungerer på samme måte som regresjon: samle data og tilpass funksjonen.  

<br />

### 3.2 Orkenes felle

Forelesningen introduserte en historie. Vi er orker og vi har en felle. Hvis fellen fanger hobbits er det bra, vi spiser dem. Hvis den fanger alver er det farlig, da får vi problemer. Observasjonen $x$ kan altså være skapningens **høyde**.  

Vi antar at hobbits er lavere, og alver høyere. Dette er egenskapen vi bruker for å skille dem.  

<br />

### 3.3 Generering av data

For å simulere antar vi at høydefordelingen i Midgard er normalfordelt, akkurat som dyretrekk i vår verden. Vi genererer fem tilfeldige prøver for hobbits og fem for alver. Hobbits vises i én farge, alver i en annen.  

I utvalget ser vi en veldig høy hobbit og en ganske lav alv. Dette betyr at klassene ikke er helt adskilte, men overlapper. I virkeligheten er dette typisk, og det betyr at vi ikke kan forvente 100 % klassifiseringsnøyaktighet.  

<br />

### 3.4 Akseptere overlapp

På grunn av overlapp må vi tillate feil. Uansett hvilket system vi bygger, vil noen feil skje.  
- Eksempel: i kreftdeteksjon kan ikke all kreft oppdages, og noen ganger blir friske prøver feilaktig klassifisert som kreft.  

Derfor må vi forvente en viss feilrate i klassifisering.  

<br />

### 3.5 Overgang til to dimensjoner

Så langt har vi bare brukt én egenskap: høyde. Men vi kan legge til en annen, som vekt. Antakelsen: hobbits kan være lavere og tyngre, mens alver er høyere og slankere.  

Det gir oss **todimensjonal data**:  
- $x_1 =$ høyde  
- $x_2 =$ vekt  

Nå er hvert treningspunkt et par $(x_1, x_2)$, og $y$ er klasselabelen. For treningsdata kan vi tildele numeriske etiketter, f.eks. $y=0$ for hobbit og $y=1$ for alv.  

<br />

### 3.6 Trening vs. inferens

I maskinlæring skiller vi vanligvis to trinn:  
1. **Trening** — vi lærer modellparametrene fra merkede eksempler.  
2. **Inferens** — vi tester modellen på en ny prøve for å bestemme klassen.  

Så hvis et nytt punkt kommer inn, er oppgaven å avgjøre om det er en hobbit eller en alv.  

<br />

### 3.7 Første klassifiseringsidé

I forelesningen ble et nytt punkt vist på tavlen. Studentene tenkte på hvordan det skulle klassifiseres. Den intuitive løsningen var: klassifiser det som hobbit, fordi det ligger veldig nær andre hobbitpunkter.  

Dette leder naturlig til en av de første klassifiseringsmetodene: å bruke nærhet til treningsprøver.

---

## Del 4 : Nærmeste nabo-klassifiserer

![Board notes](/images/docs/Lecture3_Linearclassification/4.png)

<br />

### 4.1 Navn og idé
Vi gikk fra “nærhet”-intuisjonen til en konkret metode: **nærmeste nabo-klassifisereren** (1-NN og senere $k$-NN). Ideen er enkel: et nytt eksempel skal få samme klasse som det nærmeste trenings-eksemplet.

<br />

### 4.2 Trening (lagre alt)
Treningen er trivielt her: **vi lagrer bare alle trenings-eksemplene** (funksjoner og deres klassetiketter). Ingen parameter-tilpasning skjer i dette trinnet.

<br />

### 4.3 Inferens (finn den nærmeste og kopier etiketten)
Når et nytt eksempel kommer inn, gjør vi beregningene:  
1. For **alle** trenings-eksempler, beregn avstanden til det nye eksemplet.  
   (Enhver fornuftig avstand er grei; vi trenger bare en måte å sammenligne hvem som er nærmest.)  
2. Hvis avstanden er **mindre enn det beste så langt**, oppdater den beste og **velg** det eksemplet.  
3. **Returner klassetiketten** til eksemplet med **kortest avstand**.  

Det er hele algoritmen. Vi implementerer dette i Python i øvingene.

<br />

### 4.4 Enkle baselines for klassifisering
Vi satte også baselines for å vurdere om klassifisereren vår er bra:  
- **Tilfeldig klasse** — returner en tilfeldig etikett fra klassemengden.  
- **Mest vanlige etikett** — returner alltid etiketten som forekommer mest i treningsdataen.  

Den andre baselinen er vanligvis bedre enn tilfeldig, spesielt når én klasse **dominerer** (f.eks. 99 % av prøvene er fra én klasse). Hvis “mest vanlige etikett” allerede gir 99 % nøyaktighet, må metoden vår slå **det** tallet for å være meningsfull.

<br />

### 4.5 Viktige poeng
- Nærmeste nabo er en **veldig enkel** algoritme, men **overraskende kraftig**.  
- Sammenlign alltid mot en **enkel baseline** for dataen din; den viser hvor vanskelig problemet er og hvilken ytelse vi må overgå.

---

## Del 5 : k-NN betraktninger → linjetilpasning

![Board notes](/images/docs/Lecture3_Linearclassification/5.png)

<br />

### 5.1 Hva vi kan justere i k-NN
Når vi begynner å studere hva vi kan endre i nærmeste nabo, åpner det seg en hel verden:

- **Avstand.** Vi kan velge avstandsmål.  
  Euklidsk i 1D er  
  $$
  d(x,x_i)=\sqrt{(x-x_i)^2},
  $$
  og en **city-block (L1)**-avstand er  
  $$
  d(x,x_i)=|x-x_i|.
  $$
  Det finnes mange andre avstander; vi bør velge den som passer dataen.

- **Antall naboer.** $k$ kan være $1,3,\dots$  
  For to klasser kan $k=2$ bli uavgjort (en hobbit, en alv), så $k=3$ unngår dette.

- **Beregningstid.** En grunnleggende 1-NN er en løkke over alle treningspunkter og kan være treg for enorme datasett, men det finnes **raske NN-metoder** (ofte tilnærmede) som deler opp rommet og gjør søket raskere.

- **1D vs 2D-avstander i k-NN:**  
  I **1D** faller Euklidsk (L2) og City-block (L1) sammen:  
  $$
  |x-x_i|.
  $$  
  I **2D og høyere dimensjoner** er de forskjellige:  
  - Euklidsk (L2) i 2D:  
    $$
    d(\mathbf{x},\mathbf{x_i})=\sqrt{(x_1-x_{i1})^2+(x_2-x_{i2})^2},
    $$
    som gir sirkulære nabolag.  
  - City-block (L1) i 2D:  
    $$
    d(\mathbf{x},\mathbf{x_i})=|x_1-x_{i1}|+|x_2-x_{i2}|,
    $$
    som gir diamantformede nabolag.  

  Denne forskjellen endrer **beslutningsgrensene til k-NN**: med L2 blir de glattere og rundere; med L1 følger de koordinataksene. Valget avhenger av datageometrien.

**🤔 Hjemmelekse:** Gi 2D-punkter der **1-NN** og **3-NN** gir **forskjellig** klassifisering.

<br />

### 5.2 Kan vi klassifisere ved å tilpasse en linje?
![Board notes](/images/docs/Lecture3_Linearclassification/6.png)

La oss prøve å formulere klassifisering som **linjetilpasning**. Vi setter klassmålene til
$$
y=-1 \;\text{for hobbit}, \qquad y=+1 \;\text{for alv}.
$$
Deretter tilpasser vi en linje
$$
\hat y = a x + b
$$
til disse $(x,y)$-parene (akkurat som i regresjon).  
Når linjen er tilpasset, bruker vi en enkel **klassifiseringsregel**:
$$
\hat y < 0 \Rightarrow \text{hobbit}, \qquad
\hat y > 0 \Rightarrow \text{alv}.
$$
Punktet der $\hat y=0$ er **skillet** (beslutningsgrensen).

I klasseeksemplet tilpasset vi linjen og testet noen nye eksempler; med disse dataene klassifiserte regelen alle riktig.

![Board notes](/images/docs/Lecture3_Linearclassification/7.png)

<br />

### 5.3 Hvordan måler vi feil i klassifisering?
For klassifisering er feilen **binær**:  
- hvis $\hat y$ gir **riktig** klasse ⇒ $\text{err}=0$,  
- hvis $\hat y$ gir **feil** klasse ⇒ $\text{err}=1$.  

Vi tillater ikke “kanskje”-utdata.  
Merk avviket: linjetilpasning minimerer **kvadratfeil**, ikke denne 0/1


---
## Del 6 : Fra linjetilpasning til steg, deretter til sigmoid

![Board notes](/images/docs/Lecture3_Linearclassification/8.png)

<br />

### 6.1 Stegregel og diskriminator

Vi beholder den tilpassede linjen $\hat y = a x + b$ og definerer **diskriminatoren** ved $\hat y=0$.  
Stegregelen på tavlen bruker **$\pm1$** etiketter:

$$
y =
\begin{cases}
+1, & x > x_d,\\[4pt]
-1, & x < x_d .
\end{cases}
$$

Tilsvarende med linjens fortegn:

$$
\hat y < 0 \Rightarrow \text{hobbit}, \qquad
\hat y > 0 \Rightarrow \text{alv}.
$$

![Board notes](/images/docs/Lecture3_Linearclassification/9.png)

<br />

### 6.2 Tilnærme steget med logistisk (sigmoid)

Fordi et hardt steg er diskontinuerlig, bruker vi en jevn tilnærming, den logistiske (“logsig”):

$$
\operatorname{logsig}(x)=\frac{1}{1+e^{-x}} .
$$

Kombiner den med linjen:

$$
\hat y \;=\; \operatorname{logsig}(a x + b)
=\frac{1}{1+e^{-(a x + b)}} .
$$

Her styrer $a$ hvor bratt overgangen er, og $b$ flytter terskelen.  
Klassene relabeles til intervallet $[0,1]$ (hobbit $=0$, alv $=1$).

<br />

### 6.3 Treningssignal (foreløpig)

Med dette jevne outputet kan vi fortsatt minimere **middelkvadratfeilen** mellom målene i $\{0,1\}$ og $\hat y$ for å tilpasse $a$ og $b$.

---
## Del 7 : MSE med sigmoid-utgang, gradienter (steg-for-steg, ryddig)

![Board notes](/images/docs/Lecture3_Linearclassification/10.png)

<br />

### 7.1 Modell, mål, tap

Modell (1D-funksjon \(x\)):

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

Middelkvadratfeil (MSE):

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-\hat y_i\bigr)^2
$$

<br />

### 7.2 Hvorfor $ \frac{\partial z_i}{\partial b} = 1 $ og $ \frac{\partial z_i}{\partial a} = x_i $?

Vi har en rett linje:

$$
z_i = a x_i + b
$$

Deriver mht. \(b\):

$$
\frac{\partial z_i}{\partial b} = 1
$$

Deriver mht. \(a\):

$$
\frac{\partial z_i}{\partial a} = x_i
$$

Altså: endring i \(b\) flytter linjen opp/ned, endring i \(a\) tiler den, skalert av \(x_i\).

<br />

### 7.3 Derivert av sigmoid

Definisjon:

$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

Derivert:

$$
\frac{d\sigma}{dz}=\sigma(z)\bigl(1-\sigma(z)\bigr)
$$

<br />

### 7.4 Deriver MSE (kjerneregel)

Residual:

$$
e_i = y_i - \hat y_i
$$

Tap i residualform:

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N} e_i^{\,2}
$$

Derivert av ytre kvadrat:

$$
\frac{\partial}{\partial e_i}\bigl(e_i^{\,2}\bigr)=2e_i
$$

Residual vs. utgang:

$$
\frac{\partial e_i}{\partial \hat y_i} = -1
$$

Sigmoid-kjede:

$$
\frac{\partial \hat y_i}{\partial a} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot x_i
$$

$$
\frac{\partial \hat y_i}{\partial b} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot 1
$$

Sett kjeden sammen:

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\,x_i
$$

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

<br />

### 7.5 Hva hver faktor betyr

- Residual:
$$
\hat y_i - y_i
$$

- Sigmoidens helling:
$$
\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

- Input-skala (kun for \(a\)):
$$
x_i
$$

Rundt 0.5 er sigmoidens helling stor (sterkt læringssignal). Nær 0 eller 1 er den liten (metning).

<br />

### 7.6 Hvorfor vi ikke har en lukket form

Parameterne \(a,b\) ligger **inne i** den ikke-lineære sigmoid i summene. Å sette gradientene lik null gir ikke lukkede ligninger (i motsetning til lineær regresjon). Derfor **itererer** vi:

Oppdatering med læringsrate:

$$
a \leftarrow a - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
$$

$$
b \leftarrow b - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
$$

Gjenta til tapet slutter å minke.



