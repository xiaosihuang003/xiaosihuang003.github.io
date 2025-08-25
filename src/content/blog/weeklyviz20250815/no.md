---
title: "Ukentlig visualisering 1: For ti år siden, verdens lykkeligste land i 2015"
subtitle: "Et Tableau-blikk ti år tilbake"
date: "2025-08-15"
lang: "no"
excerpt: "Hvordan så lykke ut for ti år siden? Jeg bygde en interaktiv Tableau-visning for å gå tilbake til 2015 og reflektere over hva som driver livstilfredshet."
tags:
  - Tableau
  - Lykkeindeks
  - Datavisualisering
  - "2015"
draft: false
---

I World Happiness Report 2025 ser toppen kjent ut: Finland, Danmark og Island igjen. Denne stabiliteten reiser et nyttig spørsmål for analytikere: **var de samme strukturelle kreftene synlige allerede for ti år siden?** Dette innlegget går tilbake til **2015** som en ren referanse før nyere sjokk (pandemi, energi-inflasjon, AI-innfasing). Målet er ikke bare å vise rangeringer, men å begrunne **hvorfor** land divergerer – og om årsakene allerede lå der

---

## Interaktiv demo (Tableau)

> **Slik bruker du.** Velg et land i kartet eller lista for å kryssmarkere scatter og sammensetning, tegn et område i scatter for å sammenligne en kohort, bytt mellom totaler og andeler i det stablede diagrammet for å se om **nivå** eller **miks** driver scoren

<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 1. Verdens lykke 2015 (kart)</figcaption>
</figure>

### Hva kartet viser og hvorfor det betyr noe

Geografien er ikke tilfeldig. **Nord- og Vest-Europa samt Oseania** danner et mørkt belte. Det er land med høy institusjonell tillit, forutsigbare offentlige tjenester og relativt lav opplevd korrupsjon. Mønsteret er i tråd med hvordan livstilfredshet måles: en **global egenvurdering** av *hvordan livet oppleves* gitt materiell og sosial kontekst

I **Latin-Amerika** er flere land mørkere enn BNP skulle tilsi, et gjentakende overprestasjonstrekk som ofte knyttes til sterke familie- og fellesskapsbånd og hyppig sosial kontakt, som påvirker *hverdagsopplevelsen* også uten svært høye inntekter

Deler av **Midtøsten og Afrika sør for Sahara** framstår lysere, i tråd med politisk uro, konflikt og svakere administrativ kapasitet i perioden

> **Analytikernote.** Det romlige mønsteret er seigt: land skifter sjelden kategori på få år uten makrosjokk eller institusjonelle reformer. I grove trekk “lignet 2015 på 2025”

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 2. Topp 10 lykkeligste land</figcaption>
</figure>

### Les topp-10 som en stabilitetstest

Toppen (Sveits, Island, Danmark, Norge, Canada) ligger tett. Små avstander betyr at **den delte arkitekturen er viktigere enn rekkefølgen**: bred dekning av offentlige goder, sterkt sosialt nettverk og opplevd valgfrihet. I intervjuspråk: hvis modellen din forutsier store hopp år for år, overtilpasser den trolig støy og ikke struktur. I 2015 lå den nordiske blokken allerede øverst, 2025 bevarer den i stor grad

Praktisk for policyanalyse: **å løfte en allerede høy score er vanskelig**, fordi handlingsrommet er lite. Bevegelse på toppen kommer oftere fra *ikke-inntektsmessige* spaker – tillit, kvalitet i styring og opplevd frihet – heller enn fra marginal inntektsvekst

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 3. Lykkeindeks x BNP per innbygger (scatter)</figcaption>
</figure>

### Inntekt betyr mye, til den gjør det mindre

Scatteren viser to ting:  
1) **Sterk positiv sammenheng**: rikere land rapporterer høyere livstilfredshet  
2) **Avtakende utbytte**: gevinster flater ut når inntekten øker, *hvordan* ressurser blir til opplevd livskvalitet blir avgjørende

Jeg ser etter **residualer**, land langt over eller under trenden. **Over trenden** (f.eks. Costa Rica) antyder at sosial kapital, fellesskap eller styring omsetter begrensede inntekter til god opplevelse. **Under trenden** peker mot flaskehalser: utrygghet, svake institusjoner eller lav tillit som hindrer omsettingen fra inntekt til velvære

Dette er den mest handlingsnære figuren: velg en kohort med liknende BNP og spør hvorfor noen **over-konverterer** inntekt til tilfredshet mens andre **under-konverterer**

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 4. Hva bygger lykke (sammensetning)</figcaption>
</figure>

### Nivå kontra miks

Sammensetningen skiller **nivåeffekter** (høyt/lavt totalnivå) fra **mikseffekter** (hva landet lener seg på)

- **Balanserte toppere** (typiske nordiske) mangler én dominerende søyle, sosial støtte, sunn levealder, opplevd frihet og lav korrupsjon bidrar sammen  
- **Én-søyle-profiler** er sårbare, noen land lener tungt på *inntekt* eller *helse* men scorer svakt på *tillit/korrupsjon* eller *frihet*, et sjokk i hovedsøyla slår raskt ut  
- **Generøsitet** er ofte liten i absolutte tall men fungerer som **sosialt smøremiddel** der gjensidig hjelp er vanlig

Bruk bryteren (totaler vs andeler) for å se om problemet er **lavt totalnivå** eller **skjev miks**, tilnærmingen blir forskjellig

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 5. Dashboard: kart + rangering + scatter + sammensetning</figcaption>
</figure>

### Samlet: tre arketyper

1) **Høyt og balansert**, mørk på kartet, over trend i scatter, ingen tydelig svakhet i sammensetningen, systemet er konsistent og robust  
2) **Høy BNP, middels lykke**, til høyre i scatter men nær eller under trenden, svakheter ofte i *tillit/korrupsjon* eller *frihet*, mer institusjonelt enn økonomisk  
3) **Lav BNP, overprestasjon**, til venstre men over trenden, fellesskap og trygghet kompenserer for begrenset inntekt, å verne disse verdiene er like viktig som vekst

I intervjuer går jeg vanligvis gjennom ett eksempel av hver og skisserer **sannsynlige spaker**

---

## Metoder og definisjoner

- **Metrikk,** lykkescore bruker life ladder, en selvrapportert helhetsvurdering av livet  
- **Komponenter,** sammensetningen bygger på WHR-standardvariabler (log BNP per innbygger, sunn forventet levealder, sosial støtte, frihet til å velge, opplevd korrupsjon, generøsitet), dette er forklarende korrelater ikke en mekanisk sum  
- **Hvorfor 2015,** referanse før pandemien med færre forstyrrende faktorer, nyttig for å se om mønsteret i 2025 allerede var synlig altså om den “nordiske fordelen” er strukturell heller enn syklisk  
- **Interaktivitet,** Tableau muliggjør kohortvalg (lasso), kryssfiltre og rask **residual-tenkning**, ikke bare pynt

> Kilde: [World Happiness Report (2015, Kaggle)](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)

---

## Oppsummering

Tilbakeblikket til 2015 viser at dagens ledere delte den samme **institusjonelle arkitekturen**: tillit, fungerende offentlige tjenester og frihet som gjør inntekt om til opplevd livskvalitet. Avvikene i scatter og sammensetningsprofilen peker mot samme praktiske poeng: **det handler ikke bare om hvor mye man har, men om hvor forutsigbart systemet gjør det til et godt liv**. Ti år senere ligner kartet av en grunn
