---
title: "Avviksdeteksjon med multivariat Gauss-fordeling: En case-studie på etterspørsel etter bysykler"
date: "2025-09-01"
excerpt: "Utforsker hvordan Gauss-modellering kan hjelpe til med å oppdage uvanlige mønstre i etterspørselen etter bysykler."
tags: ["maskinlæring", "databricks", "avviksdeteksjon", "gauss"]
draft: false
---

## 1️⃣ Introduksjon

I dette prosjektet ville jeg teste om en **enkel statistisk modell** allerede kunne oppdage interessante mønstre i ekte data. Jeg valgte **bysykkel-datasettet** fra Databricks, fordi det både har **værinformasjon** og **timevise utleietall**, noe som gjør det perfekt for å stille spørsmålet:

👉 *“Matcher etterspørselen etter sykler egentlig værforholdene?”*  

I stedet for å hoppe rett til kompleks maskinlæring bestemte jeg meg for å starte med en **multivariat Gauss-fordeling**. Det er en ren og forklarbar måte å modellere hva som er “normalt”.

---

## 2️⃣ Teknisk oppsett

Datasettet jeg brukte lå lagret på: dbfs:/databricks-datasets/bikeSharing/data-001/hour.csv  

Det inneholder **17 379 timebaserte observasjoner**, inkludert variabler som temperatur (`temp`), luftfuktighet (`hum`) og antall utleide sykler (`cnt`). Jeg valgte disse tre fordi de er **kontinuerlige** og **intuitivt henger sammen**: hvis været er dårlig, burde utleietallene også reflektere det.  

Modellen er enkel:
- 1. Beregn **middelverdivektoren μ** og **kovariansmatrisen Σ** fra variablene.  
- 2. Skår hver rad ved hjelp av **multivariat Gaussisk tetthetsfunksjon (PDF)**.  
- 3. Marker rader som avvik dersom sannsynligheten er **under den 5. persentilen**.  

På denne måten defineres “normal etterspørsel” av den felles fordelingen av vær + utleie, og alt som er for usannsynlig blir markert.

---

## 3️⃣ Arbeidsflyt

1. **Utforskning**  
   Jeg sjekket først mappen for å bekrefte at jeg hadde riktig fil. Deretter plottet jeg raskt fordelinger for temperatur, fuktighet og utleie for å få en følelse av variasjonene.  

2. **Modelltilpasning**  
   Da jeg beregnet μ og Σ, la jeg merke til at noen variabler var sterkt korrelert (f.eks. fuktighet og etterspørsel). Kovariansmatrisen hjelper til med å ta hensyn til dette.  

3. **Terskelverdi**  
   Jeg satte terskelen ved **den 5. persentilen**. Det er enkelt å forklare: “hvis noe skjer mindre enn 5 % av tiden under normale forhold, regner vi det som uvanlig.”  

4. **Visualisering**  
   For å sjekke om de flaggede punktene ga mening, tegnet jeg et scatter-plot av `temp` mot `cnt`. Jeg markerte avvikene med oransje “x”.  
   Det som skilte seg mest ut var:  
   - **Kal­de, regnfulle timer med uventet høy etterspørsel.**  
   - **Solrike, fine timer med overraskende lav etterspørsel.**  

Disse stemte med magefølelsen min og bekreftet at metoden faktisk fanget riktige typer avvik.

---

## 4️⃣ Databricks-arbeidsområde

<div class="screenshot-large">
  <img src="/images/projects/project2/1.png" alt="Databricks notebook fullskjerm-skjermdump">
</div>

---

## 5️⃣ Refleksjoner

Å jobbe med dette prosjektet ga meg en tydeligere forståelse av hvor mye man kan få til med ganske enkle statistiske verktøy. Den multivariate Gauss-fordelingen, selv om den er teoretisk enkel, viste seg å være overraskende effektiv for å finne mønstre i etterspørsel som “ikke passer med været”.  

En av de første tingene jeg la merke til var hvordan **korrelerte variabler** som temperatur, fuktighet og etterspørsel påvirket hverandre. Ved å modellere den felles fordelingen fanget Gauss ikke bare hver variabel for seg — den lærte seg faktisk “formen” av normale forhold. For eksempel ble timer med høy luftfuktighet men likevel høye utleietall markert umiddelbart, siden slike kombinasjoner er sjeldne i dataene. Dette fikk meg til å forstå hvorfor **kovariansstrukturen** er så viktig i avviksdeteksjon, og hvorfor en envariabel-metode ikke ville oppdaget dette.  

Valget av terskel var også lærerikt. Jeg satte det ved **5 %**, som fungerte bra her: det balanserte sensitivitet (å fange uvanlige timer) og spesifisitet (ikke å flagge for mye normal variasjon). Men i en produksjonssetting må dette avgjøres sammen med interessenter. Driftsteamet vil kanskje ha færre falske alarmer, mens produktteamet heller vil fange flere avvik. Dette gjorde meg mer bevisst på **balansen mellom statistisk nøyaktighet og forretningsverdi**.  

Fra et data engineering-perspektiv skjønte jeg også hvor viktig **forklarbarhet og reproduserbarhet** er. En Gauss-baseline er ikke bare enkel å implementere i Databricks, men gir også resultater som kan forklares til ikke-tekniske personer med bare én figur. Sammenlignet med dyp læring er dette mye lettere å kommunisere og vedlikeholde, spesielt hvis målet er en daglig jobb som automatisk flagger avvik.  

Kort oppsummert viste dette prosjektet meg at avviksdeteksjon ikke alltid krever komplekse modeller for å skape verdi. Noen ganger er **en enkel, tolkbar statistisk metode den beste startpunktet**, både for raske innsikter og som en stabil baseline før man går videre til mer avanserte teknikker.
