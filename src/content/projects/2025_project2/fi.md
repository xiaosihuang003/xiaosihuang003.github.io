---
title: "(Databricks) Poikkeavuuksien havaitseminen monimuuttujaisella Gaussin jakaumalla: Tapaustutkimus kaupunkipyörien kysynnästä"
date: "2025-09-01"
excerpt: "Tutkin, miten Gaussin mallinnusta voi käyttää havaitsemaan epätavallisia kysyntäkuvioita kaupunkipyörien käytössä."
tags: ["koneoppiminen", "databricks", "poikkeavuuksien-havaitseminen", "gaussi"]
draft: false
---

## 1️⃣ Johdanto

Tässä projektissa halusin kokeilla, voiko **yksinkertainen tilastollinen malli** jo paljastaa kiinnostavia ilmiöitä oikeasta datasta. Valitsin **kaupunkipyöräaineiston** Databricksista, koska siinä on sekä **säädataa** että **tuntikohtaiset vuokramäärät**. Se on täydellinen yhdistelmä kysymykseen:

👉 *“Vastaako pyörien kysyntä oikeasti sääolosuhteita?”*  

Sen sijaan, että olisin hypännyt suoraan monimutkaisiin koneoppimismalleihin, päätin aloittaa **monimuuttujaisella Gaussin jakaumalla**. Se on selkeä ja helposti tulkittava tapa mallintaa, miltä “normaali” näyttää.

---

## 2️⃣ Tekninen asettelu

Käyttämäni datasetti löytyi polusta: dbfs:/databricks-datasets/bikeSharing/data-001/hour.csv  

Siinä on yhteensä **17 379 tuntihavaintoa**, joissa on mukana muuttujat lämpötila (`temp`), ilmankosteus (`hum`) ja pyörien määrä (`cnt`). Keskityin näihin kolmeen, koska ne ovat kaikki **jatkuvia muuttujia** ja myös **loogisesti yhteydessä toisiinsa**: jos sää on huono, vuokramäärän pitäisi laskea.  

Mallin idea oli yksinkertainen:
- 1. Laske **keskimääräinen vektori μ** ja **kovarianssimatriisi Σ** muuttujille.  
- 2. Arvioi jokainen havainto **monimuuttujaisen Gaussin tiheysfunktion** avulla.  
- 3. Merkitse poikkeaviksi kaikki havainnot, joiden todennäköisyys on **alle 5. prosenttipisteen**.  

Näin “normaali kysyntä” määritellään sään ja vuokramäärän yhteisjakauman avulla, ja kaikki liian epätodennäköiset tapaukset liputetaan poikkeamiksi.

---

## 3️⃣ Työnkulku

1. **Explorointi**  
   Selasin ensin kansiota varmistaakseni, että valitsin oikean tiedoston. Sen jälkeen piirsin nopeasti lämpötilan, kosteuden ja vuokramäärien jakaumat, jotta sain käsityksen datan vaihtelusta.  

2. **Mallin sovitus**  
   Kun laskin μ:n ja Σ:n, huomasin että osa muuttujista oli vahvasti korreloituneita (esim. kosteus ja vuokraukset). Kovarianssimatriisi ottaa tämän riippuvuuden huomioon.  

3. **Kynnysarvon valinta**  
   Asetin rajan **5 %:n kvantiiliin**. Tämä on helppo selittää: “jos jotain tapahtuu alle 5 % ajasta normaaleissa olosuhteissa, pidämme sitä poikkeavana.”  

4. **Visualisointi**  
   Testatakseni, onko havaintoja liputettu järkevästi, piirsin hajontakuvan `temp` vs `cnt`. Merkitsin poikkeamat oranssilla “x”-merkillä.  
   Selkeimmät tapaukset olivat:  
   - **Kylmiä/sateisia tunteja, jolloin vuokramäärät olivat yllättävän korkeita.**  
   - **Aurinkoisia, hyvän sään tunteja, jolloin vuokramäärät olivat yllättävän matalia.**  

Nämä vastasivat hyvin omaa intuitiotani ja vahvistivat, että menetelmä nappasi oikeanlaiset poikkeamat.

---

## 4️⃣ Databricks-ympäristö

<div class="screenshot-large">
  <img src="/images/projects/project2/1.png" alt="Databricks-muistikirjan koko sivun kuvakaappaus">
</div>

---

## 5️⃣ Pohdinnat

Projektin aikana opin, kuinka paljon voi jo saada irti melko yksinkertaisilla tilastollisilla työkaluilla. Monimuuttujainen Gauss, vaikka on teoreettisesti suoraviivainen, osoittautui yllättävän tehokkaaksi löytämään tilanteet, joissa kysyntä ei vastannut säätä.  

Yksi ensimmäisistä havainnoista oli, miten **korreloituneet muuttujat** kuten lämpötila, kosteus ja vuokraukset käyttäytyivät. Kun ne mallinnettiin yhdessä, Gaussi ei katsonut jokaista muuttujaa erikseen, vaan oppi hahmottamaan “normaalin muodon”. Esimerkiksi tunnit, joissa kosteus oli korkea mutta vuokramäärä silti iso, nousivat heti esiin, koska tällaisia yhdistelmiä esiintyi harvoin. Tämä sai minut tajuamaan, että **kovarianssirakenne** on todella tärkeä poikkeamien havaitsemisessa, ja yksimuuttujainen lähestymistapa olisi missannut nämä kokonaan.  

Myös kynnysarvon valinta oli opettavainen. 5 % tuntui tälle datasetille sopivalta: se löysi epätavalliset tapaukset, mutta ei ylireagoinut normaaliin vaihteluun. Oikeassa tuotantojärjestelmässä tämä olisi kuitenkin keskusteltava eri tiimien kanssa. Operatiivinen tiimi voi haluta vähemmän vääriä hälytyksiä, kun taas tuotekehitys voi olla kiinnostuneempi kaappaamaan enemmän poikkeamia. Tämä teki minut tietoisemmaksi **tilastollisen tarkkuuden ja liiketoiminnan tarpeiden välisestä tasapainosta**.  

Data engineering -näkökulmasta opin myös **selitettävyyden ja toistettavuuden merkityksen**. Gauss-malli on helppo toteuttaa Databricksissa, ja sen tulokset saa visualisoitua niin, että myös ei-tekniset sidosryhmät ymmärtävät. Verrattuna syväoppimiseen tämä on paljon helpompi kommunikoida ja ylläpitää, erityisesti jos tavoitteena on automatisoitu päivittäinen monitorointi.  

Kaiken kaikkiaan projekti osoitti minulle, ettei poikkeamien havaitseminen aina vaadi monimutkaisia malleja. Joskus **yksinkertainen ja tulkittava tilastollinen lähestymistapa on juuri oikea lähtökohta**, joka antaa nopeasti oivalluksia ja toimii luotettavana baseline-menetelmänä ennen siirtymistä kehittyneempiin tekniikoihin.
