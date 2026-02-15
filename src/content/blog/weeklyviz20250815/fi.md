---
title: "Kymmenen vuotta sitten, maailman onnellisimmat maat 2015"
subtitle: "Tableau-katsaus kymmenen vuoden taakse"
date: "2025-08-15"
lang: "fi"
excerpt: "Miltä onnellisuus näytti kymmenen vuotta sitten? Rakensin interaktiivisen Tableau-näkymän vuoteen 2015 ja siihen, mikä ohjaa koettua elämään tyytyväisyyttä."
tags:
  - Tableau
  - Onnellisuusindeksi
  - Datavisualisointi
  - "2015"
draft: false
---

Vuoden 2025 World Happiness Report näyttää tutulta: Suomi, Tanska ja Islanti kärjessä jälleen. Tämä pysyvyys herättää analyytikolle hyödyllisen kysymyksen: **olivatko samat rakenteelliset voimat nähtävissä jo kymmenen vuotta aiemmin?** Tässä postauksessa palaan **vuoteen 2015** puhtaana lähtötasona ennen viimeaikaisia shokkeja (pandemia, energiainflaatio, AI-omaksuminen). Tavoite ei ole vain näyttää sijoituksia, vaan pohtia **miksi** maat eroavat ja olivatko syyt jo valmiiksi olemassa.

---

## Interaktiivinen demo (Tableau)

> **Näin käytät.** Valitse maa kartalta tai rankingista, niin hajonta ja koostumuskuvio korostuvat ristiin. Hajontakuvassa vedä lasso valitaksesi joukon vertailuun. Koostumuskuviossa vaihda “tasot” ja “osuudet”, jotta näet ohjaako pisteitä **taso** vai **rakenne**

<figure class="viz">
  <iframe src="https://public.tableau.com/views/WorldHappinessMap-2015/1_1worldhappinessmap2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Kuva 1. Maailman onnellisuus 2015 (kartta)</figcaption>
</figure>

### Mitä kartta näyttää ja miksi se on tärkeää

Maantiede ei ole satunnainen. **Pohjois- ja Länsi-Eurooppa sekä Oseania** muodostavat tumman vyöhykkeen. Nämä ovat pitkään toimineita sosiaalidemokratioita, joissa on korkea instituutioihin kohdistuva luottamus, ennakoitavat julkiset palvelut ja suhteellisen matala korruption kokemus. Kuviota vastaa tapa mitata elämään tyytyväisyyttä: kyse on **globaalista itsearviosta**, joka kuvaa *miltä arki tuntuu* omassa materiaalisessa ja sosiaalisessa ympäristössä

**Latinalaisessa Amerikassa** useat maat ovat tummempia kuin BKT ennustaisi. Tätä toistuvaa ylisuoriutumista selitetään vahvalla perhe- ja yhteisöelämällä sekä tiheällä sosiaalisella kanssakäymisellä, jotka vaikuttavat *päivittäiseen kokemukseen* ilman erittäin korkeita tuloja

Sitä vastoin osat **Lähi-idästä ja Saharan eteläpuolisesta Afrikasta** ovat vaaleampia, mikä sopii yhteen poliittisen epävakauden, konfliktialtistuksen tai heikomman hallinnollisen kapasiteetin kanssa tuolloin

> **Analyytikon huomio.** Alueellinen kuvio on “tahmea”: maat harvoin vaihtavat kategoriaa muutamassa vuodessa, ellei taustalla ole makroshokkia tai institutionaalista uudistusta. Vuosi 2015 oli monin osin samaa kuin 2025 suuressa kuvassa

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/Top10HappiestCountriesBarChart-2015/1_2Top10HappiestCountriesBarChart?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Kuva 2. Kymmenen onnellisinta maata</figcaption>
</figure>

### Lue top-10 vakaustestinä

Kärki (Sveitsi, Islanti, Tanska, Norja, Kanada) on tiivis klusteri. Pienet erot tarkoittavat, että **jaettu arkkitehtuuri on järjestystä tärkeämpi**: laaja julkisten hyödykkeiden kattavuus, vahva sosiaalinen tuki ja koettu valinnanvapaus. Haastattelukielellä: jos mallisi ennustaa vuosittain suuria vaihtoja, se luultavasti ylisovittaa kohinaa eikä rakennetta. Vuonna 2015 pohjoismainen lohko oli jo kärjessä, ja 2025 pitkälti säilyttää sen

Käytännön johtopäätös politiikka-analyyseille on, että **valmiiksi korkean pisteen nostaminen on vaikeaa**, koska liikkumavara on pieni. Liike huipulla syntyy useammin *ei-tulollisista* vivuista, kuten luottamuksesta, hallinnon laadusta ja koetusta vapaudesta, eikä marginaalisista tulolisäyksistä

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/ScatterPlotHappinessIndexvs_GDP2015/1_3ScatterPlotHappinessIndexvs_GDP2015?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Kuva 3. Onnellisuusindeksi x BKT/asukas (hajonta)</figcaption>
</figure>

### Tulot merkitsevät, kunnes vaikutus heikkenee

Hajontakuvio näyttää kaksi asiaa:  
1) **Vahva positiivinen yhteys**: rikkaammat maat raportoivat yleensä korkeampaa tyytyväisyyttä  
2) **Vähenevä rajahyöty**: hyödyt tasoittuvat tulojen kasvaessa, ja ratkaisevaksi tulee se, *miten* resurssit muuttuvat koetuksi arjeksi

Tässä etsin **poikkeamia trendistä**. **Trendiä ylempänä** olevat (esim. Costa Rica) viittaavat siihen, että sosiaalinen pääoma, yhteisöllisyys tai hallinto muuntaa rajalliset tulot hyväksi kokemukseksi. **Trendiä alempana** olevat vihjaavat pullonkauloista: turvattomuus, heikot instituutiot tai matala luottamus estävät tuloja muuttumasta hyvinvoinniksi

Tämä on käytännöllisin näkymä diagnoosiin: valitse **samantuloinen** joukko ja kysy, miksi osa **ylimuuntaa** tulot tyytyväisyydeksi ja osa **alimuuntaa**

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/PercentageDistributionofHappinessIndexComponentsbyCountry2015/1_4PercentageCompositionofHappinessIndexbyCountry?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Kuva 4. Mikä rakentaa onnellisuutta (koostumus)</figcaption>
</figure>

### Taso vs. rakenne

Koostumus erottaa **tasovaikutuksen** (kokonaisuus korkea/matala) ja **rakennevaikutuksen** (mihin maa nojaa)

- **Tasapainoiset huiput** (tyypilliset pohjoismaat) eivät nojaa yhteen pilariin, sosiaalinen tuki, terve elinajanodote, koettu vapaus ja matala korruptio kantavat yhdessä  
- **Yhden pilarin profiilit** ovat hauraita, osa maista nojaa raskaasti *tuloon* tai *terveyteen* ja saa heikon *luottamus/korruptio* tai *vapaus*-arvion, shokki hallitsevaan pilariin painaa pisteitä nopeasti  
- **Anteliaisuus** on usein pieni absoluuttisesti, mutta toimii **sosiaalisena voiteluaineena**, ja vahvistaa muiden osien vaikutusta siellä missä vastavuoroinen apu on yleistä

Käytä vaihtoa (tasot vs. osuudet) nähdäksesi onko ongelma **alhainen taso** vai **vinoutunut rakenne**, toimintalinja on eri

---

<figure class="viz">
  <iframe src="https://public.tableau.com/views/GlobalHappinessIndexVisualizationAnalysis2015/Dashboard1?:showVizHome=no&:embed=true" loading="lazy" allowfullscreen frameborder="0"></iframe>
  <figcaption class="fig-title">Kuva 5. Kojelauta: kartta + ranking + hajonta + koostumus</figcaption>
</figure>

### Yhdessä: kolme arkkityyppiä

1) **Korkea ja tasapainoinen**, kartta tumma, hajonnassa trendin yläpuolella, koostumuksessa ei heikkoa osaa, järjestelmä on johdonmukainen ja kestävä  
2) **Korkea BKT, keskitasoinen onnellisuus**, hajonnassa oikealla mutta lähellä tai alle trendin, heikkous usein *luottamus/korruptio* tai *vapaus*, kyse on enemmän instituutioista kuin taloudesta  
3) **Matala BKT, ylisuoriutuja**, hajonnassa vasemmalla mutta trendin yläpuolella, yhteisöllisyys ja turvallisuus kompensoivat rajallisia tuloja, niiden suojaaminen on yhtä tärkeää kuin kasvu

Haastattelussa käyn yleensä läpi yhden esimerkin kustakin ja hahmottelen **todennäköiset vivut**

---

## Menetelmät ja määritelmät

- **Mittari,** onnellisuuspiste käyttää life ladder -arviointia, itse raportoitu kokonaisarvio elämästä  
- **Osatekijät,** koostumus hyödyntää WHR:n tavanomaisia selittäjiä (log BKT/asukas, terve elinajanodote, sosiaalinen tuki, valinnanvapaus, korruption kokemus, anteliaisuus), nämä ovat selittäviä korrelaatteja eivät mekaaninen summa  
- **Miksi 2015,** pandemiaa edeltävä peruslinja vähäisemmillä sekoittavilla tekijöillä, auttaa kysymään oliko vuoden 2025 kuvio jo näkyvissä eli onko “pohjoismainen etu” rakenteellinen eikä syklistinen  
- **Interaktiivisuus,** Tableau mahdollistaa ryhmän valinnan (lasso), ristiinsuodatukset ja nopeat **poikkeama-havainnot**, ei vain koristelua

> Lähde: [World Happiness Report (2015, Kaggle)](https://www.kaggle.com/datasets/unsdsn/world-happiness?resource=download)

---

## Yhteenveto

Vuoteen 2015 palaaminen näyttää, että tämän päivän kärjellä oli jo sama **institutionaalinen arkkitehtuuri**: luottamus, toimivat julkiset palvelut ja vapaus joka muuntaa tulot koetuksi hyvinvoinniksi. Hajonnan poikkeamat ja koostumuksen profiili kertovat käytännön tarinan: **ei vain se, kuinka paljon on, vaan miten järjestelmä muuntaa sen hyväksi arjeksi**. Kymmenen vuotta myöhemmin kartta näyttää samalta syystä
