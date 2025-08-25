---
title: "Veckovisualisering 1: För tio år sedan, världens lyckligaste länder 2015"
subtitle: "En Tableau-blick tio år tillbaka"
date: "2025-08-15"
lang: "sv"
excerpt: "Hur såg lycka ut för tio år sedan? Jag byggde en interaktiv Tableau-vy för att återbesöka 2015 och reflektera över vad som driver livstillfredsställelse."
tags:
  - Tableau
  - Lyckoindex
  - Datavisualisering
  - "2015"
draft: false
---

I 2025 års World Happiness Report ser toppen bekant ut: Finland, Danmark och Island igen. Den stabiliteten väcker en bra fråga för analytiker: **syntes samma strukturella krafter redan för tio år sedan?** I den här posten återvänder jag till **2015** som en ren baslinje före senare chocker (pandemi, energipriser, AI-införande). Målet är inte bara att visa placeringar, utan att resonera om **varför** länder skiljer sig och om orsakerna redan fanns där

---

## Interaktiv demo (Tableau)

> **Så här använder du.** Välj ett land i kartan eller listan för att korsmarkera scatter och sammansättning, markera en region i scatter för att jämföra en kohort, växla mellan totaler och andelar i stapeldiagrammet för att se om **nivå** eller **mix** driver poängen

<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 1. Lycka i världen 2015 (karta)</figcaption>
</figure>

### Vad kartan visar och varför det spelar roll

Geografin är inte slumpmässig. **Norra och västra Europa samt Oceanien** bildar ett mörkt bälte. Det gäller länder med hög institutionell tillit, förutsägbara offentliga tjänster och relativt låg upplevd korruption. Mönstret stämmer med hur livstillfredsställelse mäts: en **global självskattning** av *hur livet känns* givet materiell och social miljö

I **Latinamerika** är flera länder mörkare än deras BNP antyder, ett återkommande överpresterande som ofta kopplas till starka familje- och gemenskapsband och frekvent social kontakt, sådant påverkar *vardagsupplevelsen* även utan mycket höga inkomster

Delar av **Mellanöstern och Afrika söder om Sahara** är ljusare, i linje med politisk instabilitet, konflikt och svagare administrativ kapacitet under perioden

> **Analytikerns not.** Mönstret är segt, länder byter sällan kategori på några få år utan makrochock eller institutionell reform. I grova drag “såg 2015 ut som 2025”

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 2. Tio lyckligaste länderna</figcaption>
</figure>

### Läs top-10 som ett stabilitetstest

Toppen (Schweiz, Island, Danmark, Norge, Kanada) ligger tätt samlad. Små gap betyder att **den gemensamma arkitekturen är viktigare än ordningen**: bred täckning av offentliga nyttigheter, starkt socialt stöd och upplevd frihet att välja. I intervju-termer: om din modell förutspår stora hopp år från år överanpassar den nog brus i stället för struktur. 2015 låg Norden redan i topp, 2025 bevarar det till stor del

En praktisk slutsats för policy är att **höja ett redan högt betyg är svårt**, eftersom utrymmet är litet. Rörelsen i toppen kommer oftare från *icke-inkomst-reglage* som tillit, förvaltningens kvalitet och upplevd frihet, snarare än marginala inkomstökningar

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 3. Lyckoindex x BNP per capita (scatter)</figcaption>
</figure>

### Inkomster betyder mycket, tills avtagande avkastning tar över

Scatterploten visar två saker:  
1) **Tydlig positiv relation**: rikare länder rapporterar högre nöjdhet  
2) **Avtagande avkastning**: ökningar planar ut när inkomster stiger, *hur* resurserna blir till upplevt välmående blir avgörande

Jag letar efter **residualer**, länder långt över eller under trenden. **Över trenden** (t.ex. Costa Rica) tyder på att socialt kapital, gemenskapsliv eller styrning omvandlar begränsade inkomster till en god vardag. **Under trenden** antyder flaskhalsar: otrygghet, svaga institutioner eller låg tillit som hindrar inkomster från att bli välbefinnande

Detta är den mest handlingsbara bilden: välj en kohort med liknande BNP och fråga varför några **över-omvandlar** inkomster till nöjdhet medan andra **under-omvandlar**

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 4. Vad bygger lycka (sammansättning)</figcaption>
</figure>

### Nivå kontra mix

Sammansättningen skiljer **nivåeffekter** (högt/lågt i total) från **mixeffekter** (vad landet lutar mot)

- **Balanserade topprestatörer** (typiska nordiska) saknar en enda bärande pelare, socialt stöd, hälsosam livslängd, upplevd frihet och låg korruption bidrar tillsammans  
- **En-pelar-profiler** är sköra, vissa länder lutar tungt mot *inkomst* eller *hälsa* men får svaga värden på *tillit/korruption* eller *frihet*, en störning i huvudpelaren sänker snabbt utfallet  
- **Generositet** är ofta liten i absoluta tal men fungerar som **socialt smörjmedel** där ömsesidig hjälp är vanlig

Växla mellan totaler och andelar för att se om problemet är **låg total** eller **skev mix**, policyspåret skiljer sig

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Figur 5. Dashboard: karta + ranking + scatter + sammansättning</figcaption>
</figure>

### Tillsammans: tre arketyper

1) **Högt och balanserat**, mörk på kartan, över trenden i scatter, inga tydliga svagheter i sammansättningen, systemet är konsekvent och motståndskraftigt  
2) **Hög BNP, medelnöjdhet**, till höger i scatter men nära eller under trenden, svaghet ofta i *tillit/korruption* eller *frihet*, mer institutionellt än ekonomiskt  
3) **Låg BNP, överpresterare**, till vänster men över trenden, gemenskapsliv och trygghet kompenserar begränsade inkomster, att skydda dessa tillgångar är lika viktigt som tillväxt

I intervjuer går jag igenom ett exempel av varje och skissar **troliga reglage**

---

## Metoder och definitioner

- **Mått,** lyckopoängen använder life ladder, en självrapporterad helhetsbedömning av livet  
- **Komponenter,** sammansättningen bygger på WHR-standardvariabler (log BNP per capita, hälsosam livslängd, socialt stöd, frihet att välja, upplevd korruption, generositet), de är förklarande korrelat inte en mekanisk summa  
- **Varför 2015,** baslinje före pandemin med färre störfaktorer, gör det möjligt att fråga om 2025-mönstret redan syntes alltså om den “nordiska fördelen” är strukturell snarare än cyklisk  
- **Interaktivitet,** Tableau möjliggör kohortval (lasso), korsfilter och snabba **residual-tankar**, inte dekoration

> Källa: [World Happiness Report (2015, Kaggle)](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)

---

## Avslutning

Genom att gå tillbaka till 2015 ser vi att dagens ledare redan delade samma **institutionella arkitektur**: tillit, fungerande offentliga tjänster och frihet som omvandlar inkomster till upplevt välbefinnande. Scatter-residualerna och sammansättningen berättar samma praktiska sak: **det handlar inte bara om hur mycket man har, utan om hur förutsägbart systemet gör det till ett bra liv**. Tio år senare ser kartan likadan ut av en anledning
