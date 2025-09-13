---
title: "(Databricks) Avvikelsedetektering med multivariat Gaussfördelning: En fallstudie om efterfrågan på hyrcyklar"
date: "2025-09-01"
excerpt: "Utforskar hur Gauss-modellering kan hjälpa till att upptäcka ovanliga mönster i efterfrågan på hyrcyklar."
tags: ["maskininlärning", "databricks", "avvikelsedetektering", "gauss"]
draft: false
---

## 1️⃣ Introduktion

I det här projektet ville jag undersöka om en **enkel statistisk modell** redan kunde avslöja intressanta mönster i verklig data. Jag valde **hyrcykeldatat** från Databricks eftersom det innehåller både **väderinformation** och **timvisa uthyrningsantal**, vilket gör det perfekt för att ställa frågan:

👉 *“Matchar efterfrågan på cyklar verkligen väderförhållandena?”*  

Istället för att hoppa direkt till komplex maskininlärning bestämde jag mig för att börja med en **multivariat Gaussfördelning**. Det är ett rent och förklarbart sätt att beskriva hur “det normala” ser ut.

---

## 2️⃣ Teknisk setup

Datasetet jag använde låg i: dbfs:/databricks-datasets/bikeSharing/data-001/hour.csv  

Det innehåller **17 379 timvisa observationer**, med variabler som temperatur (`temp`), luftfuktighet (`hum`) och antal uthyrda cyklar (`cnt`). Jag valde just dessa tre eftersom de är **kontinuerliga** och **logiskt hänger ihop**: om vädret är dåligt borde uthyrningarna rimligtvis också minska.  

Modellen är enkel:
- 1. Beräkna **medelvektorn μ** och **kovariansmatrisen Σ** från variablerna.  
- 2. Skatta varje rad med hjälp av **den multivariata Gaussiska täthetsfunktionen**.  
- 3. Flagga rader som avvikelser om sannolikheten är **under den 5:e percentilen**.  

På så sätt definieras “normal efterfrågan” av den gemensamma fördelningen av väder + uthyrningar, och allt som är för osannolikt blir markerat som en avvikelse.

---

## 3️⃣ Arbetsflöde

1. **Utforskning**  
   Jag bläddrade först igenom mappen för att vara säker på att jag valt rätt fil. Sedan plottade jag snabbt fördelningarna av temperatur, luftfuktighet och uthyrningar för att få en känsla för intervallen.  

2. **Modellanpassning**  
   När jag beräknade μ och Σ märkte jag att vissa variabler var starkt korrelerade (t.ex. fuktighet och efterfrågan). Kovariansmatrisen hjälper till att ta hänsyn till det här.  

3. **Tröskelvärde**  
   Jag satte gränsen vid **den 5:e percentilen**. Det är lätt att förklara: “om något händer mindre än 5 % av tiden under normala förhållanden, betraktar vi det som ovanligt.”  

4. **Visualisering**  
   För att kontrollera om de flaggade punkterna var rimliga ritade jag ett spridningsdiagram av `temp` mot `cnt`. Jag markerade avvikelserna med orangea “x”.  
   Det som stack ut mest var:  
   - **Kalla, regniga timmar med oväntat höga uthyrningar.**  
   - **Soliga, fina timmar med oväntat låga uthyrningar.**  

De här matchade min intuition och bekräftade att metoden verkligen fångade rätt typ av avvikelser.

---

## 4️⃣ Databricks-miljö

<div class="screenshot-large">
  <img src="/images/projects/project2/1.png" alt="Databricks notebook helsides skärmdump">
</div>

---

## 5️⃣ Reflektioner

Att arbeta med det här projektet gav mig en tydligare bild av hur mycket man faktiskt kan uppnå med ganska enkla statistiska verktyg. Den multivariata Gaussfördelningen, även om den är teoretiskt enkel, visade sig vara överraskande effektiv på att peka ut efterfrågemönster som inte matchade vädret.  

En av de första sakerna jag märkte var hur **korrelerade variabler** som temperatur, luftfuktighet och efterfrågan samspelade. Genom att modellera deras gemensamma fördelning fångade Gauss inte bara varje variabel separat — den lärde sig faktiskt “formen” av det normala. Till exempel stack timmar med hög luftfuktighet men ändå höga uthyrningar direkt ut, eftersom sådana kombinationer var sällsynta i datat. Det fick mig att förstå varför **kovariansstrukturen** spelar en så viktig roll i avvikelsedetektering, och varför en ensvariabel-ansats hade missat de här fallen helt.  

Valet av tröskel var också en intressant insikt. Jag satte den vid **5 %**, vilket fungerade bra här: det balanserade känslighet (att fånga ovanliga timmar) och specificitet (att inte flagga för mycket normal variation). Men i en riktig produktionsmiljö måste det här bestämmas tillsammans med intressenter. Driftteamet vill kanske ha färre falsklarm, medan produktteamet kanske hellre fångar fler avvikelser. Det här fick mig att bli mer medveten om **balansen mellan statistisk noggrannhet och affärsnytta**.  

Ur ett data engineering-perspektiv insåg jag också hur viktigt **förklarbarhet och reproducerbarhet** är. En Gauss-baslinje är inte bara enkel att implementera i Databricks, den ger också resultat som kan visas för icke-tekniska personer i en enda bild. Jämfört med djupinlärning är det här mycket lättare att kommunicera och underhålla, särskilt om målet är ett dagligt jobb som automatiskt flaggar avvikelser.  

Kort sagt visade det här projektet mig att avvikelsedetektering inte alltid kräver komplicerade modeller för att ge värde. Ibland är **en enkel, tolkbar statistisk metod den bästa startpunkten**, både för snabba insikter och som en stabil baslinje innan man går vidare till mer avancerade tekniker.
