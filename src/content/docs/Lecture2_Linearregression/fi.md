---
title: "Luento 2: Lineaarinen regressio"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 28.8.2025 TB104"
date: 2025-09-01
lang: "fi"
excerpt: "Vaiheittainen johdatus lineaariseen regressioon ($y = a x + b$): määritellään residuaalit ja MSE, käytetään ketjusääntöä, asetetaan osittaisderivaatat nollaan, ratkaistaan normaaliehdot $a$:lle ja $b$:lle ja varmistetaan pienellä esimerkillä."
tags: ["Joni Kämäräinen", "koneoppiminen", "lineaarinen regressio", "analyysi", "pienimmän neliösumman menetelmä"]
draft: false
---
## Johdetaan a ja b lineaariselle mallille alusta alkaen pienimmän neliösumman menetelmällä

## Osa 1 : Johdanto

![Taulumuistiinpanot](/images/docs/Lecture%202_Linearregression/1.png)

Lähdimme liikkeelle koneoppimisen kaikkein perustavimmasta ongelmasta. Opettaja korosti, että sama ajatus on myös neuroverkoissa ja jopa nykyaikaisissa kielimalleissa. Lukion matematiikka riittää hyvin seuraamaan tämän luennon.

<br />

### 1.1 Lineaarinen malli

Palautetaan mieleen suoran yhtälö:

$$
y = a x + b .
$$

Tätä kutsutaan lineaariseksi malliksi. Toistaiseksi meillä on yksi syöte ja yksi vaste, mutta sama idea yleistyy useisiin syötteisiin ja useisiin vasteisiin.

Tässä $x$ on syöte (havainto, jonka voimme mitata) ja $y$ on tavoitemuuttuja.

<br />

### 1.2 Mallin parametrit

Kaksi parametria ovat kulmakerroin ja vakiotermi:

* $a$ on kulmakerroin. Se määrää, kuinka jyrkkä suora on. Jos $a = 0$, suora on $x$-akselin suuntainen. Suuremmat arvot kasvattavat suoraa nopeammin.  
* $b$ on vakiotermi (bias). Ilman $b$:tä suora kulkee origon kautta; $b$:n avulla siirrämme suoraa y-akselin suunnassa ylös tai alas.

<br />

### 1.3 Opetusdata

Oppiminen vaatii opetusdatan, eli näytepareja:

$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

Kun näytteitä on nolla, jokainen suora on yhtä “kelvollinen”. Ilman aiempaa tietoa emme voi valita hyviä arvoja $a$:lle ja $b$:lle.

Kun näytteitä on vain yksi, esimerkiksi

$$
(x_1, y_1) = (1.11, 85) ,
$$

malli on

$$
y_1 = a x_1 + b .
$$

Tästä voimme ratkaista $b$:n:

$$
b = y_1 - a x_1 = 85 - a \cdot 1.11 .
$$

Tällöin $a$ voidaan valita vapaasti ja $b$ määräytyy siitä. Mikä tahansa suora, joka kulkee tämän pisteen kautta, antaa nollavirheen.

<br />

### 1.4 Kohti useampia näytteitä

Yksi näyte ei riitä yksikäsitteiseen suoraan. Kahdella näytteellä löytyy täsmälleen yksi suora, joka kulkee molempien pisteiden kautta. Jatkamme tästä eteenpäin.

<br />

---

## Osa 2: Kahdesta näytteestä moneen

![Board notes](/images/docs/Lecture%202_Linearregression/2.png)

Lisätään yksi näyte. Oletetaan että toinen näyte on

$$
(x_2, y_2) = (1.52, 110) .
$$

<br />

### 2.1 Ratkaisu kahdella näytteellä

Malliyhtälöt ovat

$$
y_1 = a x_1 + b, \qquad y_2 = a x_2 + b .
$$

Sijoitetaan luvut

$$
110 = a \cdot 1.52 + b, \qquad 85 = a \cdot 1.11 + b .
$$

Vähennetään toinen yhtälö ensimmäisestä,

$$
a = \frac{110 - 85}{1.52 - 1.11} = 60.98 .
$$

Sijoitetaan takaisin ja ratkaistaan \(b\),

$$
b = 110 - a \cdot 1.52 = 17.32 .
$$

Tämä on täsmälleen lukion menetelmä: kahden pisteen kautta kulkee yksi ainoa suora.

<br />

### 2.2 Visuaalinen tarkistus

Voimme aina tarkistaa piirtämällä. Piirrä kaksi pistettä tasoon ja suora, jonka kulmakerroin on \(a = 60.98\) ja vakiotermi \(b = 17.32\). Suora kulkee pisteiden kautta. Tämä antaa ensimmäisen toimivan koneoppimismallimme: annetusta pituudesta voimme arvioida painon.

<br />

### 2.3 Siirtyminen \(N\) näytteeseen

Kun näytteitä on enemmän kuin kaksi, saamme yhtälöryhmän:

$$
\begin{aligned}
y_1 &= a x_1 + b , \\
y_2 &= a x_2 + b , \\
&\;\;\vdots \\
y_N &= a x_N + b .
\end{aligned}
$$

Käytännössä pisteet eivät asetu täsmälleen samalle suoralle, koska mittauksissa on kohinaa. Etsimme siis suoraa, joka on “mahdollisimman lähellä” kaikkia pisteitä.

<br />

### 2.4 Jäännökset ja virhe

Määritellään kullekin pisteelle jäännös

$$
r_i = y_i - \hat{y}_i , \qquad i = 1, \ldots, N .
$$

Tässä \(\hat{y}_i = a x_i + b\) on mallin ennuste. Mitkä tahansa \(a\) ja \(b\) tuottavat jäännöksiä. Kysymys on, miten löydämme suoran, joka minimoi jäännökset kokonaisuutena.

<br />

![Board notes](/images/docs/Lecture%202_Linearregression/3.png)

### 2.5 Virheen määrittely

Luonteva ajatus on summata jäännökset:

$$
\text{err}_1 = \sum_{i=1}^N (y_i - \hat{y}_i) .
$$

Tämä näyttää ensin järkevältä. Mutta jos osa pisteistä on suoran yläpuolella ja osa alapuolella, virheet voivat kumoutua. Summa voi olla nolla vaikka sovitus olisi huono.

<br />

Parempi ajatus on ottaa itseisarvo:

$$
\text{err}_2 = \sum_{i=1}^N \lvert y_i - \hat{y}_i \rvert .
$$

Tällöin kumoutumista ei tapahdu, mutta nollakohdassa kulmakerroin ei ole hyvin määritelty, mikä vaikeuttaa optimointia.

<br />

Siksi yleisin valinta on neliöidä virheet:

$$
\text{err}_3 = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 .
$$

Tämä on **keskiarvoinen neliövirhe (MSE)**. Neliöinti tekee virheistä positiivisia ja tasoittaa optimointia, ja jakaminen \(N\):llä poistaa näytemäärän vaikutusta.

<br />

### 2.6 Insinöörisääntö

Opettaja korosti niin sanottua “insinöörin ensimmäistä sääntöä”:

Jos sinun täytyy mitata virhettä etkä tiedä mitä mittaria käyttää, käytä **MSE:tä**. Se vie sinut yleensä oikeaan suuntaan.

<br />

---

## Osa 3: Virheen minimointi

![Board notes](/images/docs/Lecture%202_Linearregression/4.png)

Meillä on nyt keskineliövirhe (MSE):

$$
L_{\text{MSE}} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 = \frac{1}{N} \sum_{i=1}^N (y_i - (a x_i + b))^2 .
$$

Millä tahansa \(a\):n ja \(b\):n arvoilla voimme laskea tämän virheen. Tehtävä on löytää arvot, jotka minimoivat sen:

$$
a, b = \arg \min_{a, b} L_{\text{MSE}} .
$$

<br />

### 3.1 Brute force -ratkaisu

Ensimmäinen lähestymistapa on brute force. Jos mikään muu ei toimi, brute force toimii aina.

Voimme kiertää mahdolliset \(a\)- ja \(b\)-arvot, arvioida virheen ja pitää parhaimman parin:

- For \(a = -100 : 1 : +100\)  
  - For \(b = -100 : 1 : +100\)  
    - calculate \(L_{\text{MSE}}(a, b)\)  
    - if smaller than best so far → update \(a, b\)  

Vaikka pisteitä olisi tuhansia, tämä pyörii nopeasti tietokoneella. Brute force on helppo toteuttaa, takaa ratkaisun ja antaa vertailukohdan kehittyneemmille menetelmille.

<br />

### 3.2 Virhepinnan visualisointi

Ajattele \(L_{\text{MSE}}\):tä \(a\):n ja \(b\):n funktiona. Tämä muodostaa kolmiulotteisen pinnan.  
Jokaiselle \((a, b)\) voidaan laskea virhe. Piirtämällä arvot saamme “maastokartan”, jonka alin kohta on optimaalinen ratkaisu. Tummemmat kohdat vastaavat pienempää virhettä.  
Kuvasta voidaan tehdä karkea arvaus: esimerkiksi \(a \approx 50\), \(b \approx 20\).

<br />

### 3.3 Miksi brute force on hyödyllinen

Brute force on aina vaihtoehto. Se on helppo toteuttaa, riittävän nopea pienillä hakualueilla ja takaa ratkaisun.  
Vielä tärkeämpää: se antaa vertailutason. Jos myöhemmin kehitämme “paremman” menetelmän, tulosta voi aina verrata brute forceen; jos uusi on huonompi, jokin on pielessä.  
Mutta brute force ei ole ainoa tapa. Meillä on myös parempi menetelmä, joka vaatii vain lukion matematiikkaa.

<br />

### 3.4 Äärettömien derivaattojen avulla minimiin

![Board notes](/images/docs/Lecture%202_Linearregression/5.png)

Virhefunktio on

$$
L_{\text{MSE}}(a, b) = \frac{1}{N} \sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)^2 .
$$

Se on parametrien \(a\) ja \(b\) funktio.  
Aineisto \((x_i, y_i)\) on kiinteä, joten vain \(a\) ja \(b\) muuttavat arvoa.

Haluamme löytää funktion minimin. Lukion matematiikasta:

- Minimissä derivaatta on nolla.  
- Kaksiulotteiselle funktiolle asetetaan molemmat osittaisderivaatat nollaksi:  

$$
\frac{\partial L_{\text{MSE}}}{\partial a} = 0, 
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b} = 0 .
$$

Yhdessä nämä tarkoittavat, että **gradientti on nolla** optimaalisessa pisteessä.

Tämä on avainidea. Seuraavaksi laajennamme \(L_{\text{MSE}}\):n määritelmän, derivoimme ja ratkaisemme \(a\):n ja \(b\):n. Näin saadaan analyyttinen ratkaisu, joka liittyy suoraan kotitehtäviin ja ensi viikon harjoituksiin.

<br />

---
## Osa 4 : Ratkaistaan $a$ ja $b$ derivaattojen avulla

![Board notes](/images/docs/Lecture%202_Linearregression/6.png)

Käytämme vain lukion matematiikkaa. Aineisto $\{(x_i,y_i)\}_{i=1}^N$ on kiinteä; virhe muuttuu vain, kun $a$ tai $b$ muuttuu.

Keskimääräinen neliövirhe on

$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-(a x_i+b)\bigr)^2 .
$$

Minimissä derivaatat ovat nollia:

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0 .
$$

<br />

### 4.1 Derivoi $a$:n suhteen

Aloita määritelmästä ja vie derivointi summamerkin sisään (derivoinnin lineaarisuus). Sovella ketjusääntöä jokaiseen neliötyyppiseen termiin.

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

Aseta tämä nollaksi ja supista nollasta poikkeavalla vakiolla $-2/N$:

$$
\sum_{i=1}^{N} x_i\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Laajenna ja ryhmittele samanlaiset termit:

$$
\sum_{i=1}^{N} x_i y_i
- a\sum_{i=1}^{N} x_i^2
- b\sum_{i=1}^{N} x_i
=0
\;\;\Longleftrightarrow\;\;
a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i .
$$

Eristä $a$ $b$:n funktiona:

$$
a
=
\frac{\sum_{i=1}^{N} x_i y_i - b\sum_{i=1}^{N} x_i}
{\sum_{i=1}^{N} x_i^{2}} .
$$

<br />

### 4.2 Derivoi $b$:n suhteen

Sama idea:

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

Aseta nollaksi ja supista $-2/N$:

$$
\sum_{i=1}^{N}\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Laajenna ja ratkaise $b$ $a$:n funktiona:

$$
\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i - N b = 0
\quad\Longrightarrow\quad
b
=
\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

<br />

### 4.3 Ratkaise yhtälöpari (kaikki algebravaiheet näytetään)

Meillä on nyt pari

$$
\text{(A)}\;\; a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i,
\qquad
\text{(B)}\;\; a\sum_{i=1}^{N} x_i + N b = \sum_{i=1}^{N} y_i .
$$

Yhtälöstä (B),

$$
b=\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

Sijoita tämä $b$ yhtälöön (A):

$$
a\sum_{i=1}^{N} x_i^2
+ \left(\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}\right)\!\left(\sum_{i=1}^{N} x_i\right)
= \sum_{i=1}^{N} x_i y_i .
$$

Kerro keskimmäinen termi auki:

$$
a\sum_{i=1}^{N} x_i^2
+ \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}
- a\,\frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}
= \sum_{i=1}^{N} x_i y_i .
$$

Siirrä $a$:ta sisältämättömät termit oikealle ja ota $a$ tekijäksi:

$$
a\left(\sum_{i=1}^{N} x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}\right)
=
\sum_{i=1}^{N} x_i y_i
- \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}.
$$

Kerro molemmat puolet $N$:llä poistamaan nimittäjä:

$$
a\Bigl(N\sum_{i=1}^{N} x_i^2 - \bigl(\sum_{i=1}^{N} x_i\bigr)^2\Bigr)
=
N\sum_{i=1}^{N} x_i y_i
- \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr).
$$

Siispä

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2}.
$$

**Lopuksi laske $b$ aiemmasta kaavasta (näytä sijoitus selvästi)**

Meillä on kaksi kaavaa:

- $\dfrac{\partial L}{\partial b}=0$ antaa:
  $$
  (B1)\qquad b=\frac{\sum_{i=1}^{N} y_i}{N}\;-\;a\,\frac{\sum_{i=1}^{N} x_i}{N}.
  $$

- Ratkaistu $a$ on:
  $$
  (\star)\qquad
  a=\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
         {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 }.
  $$

**Vaihe 1.** Aloita (B1):stä, jossa $a$ on vielä näkyvissä:
$$
b=\frac{\sum_{i=1}^{N} y_i}{N} \;-\; a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

**Vaihe 2.** Korvaa $a$ koko murtolausekkeella $(\star)$ (tämä on “sijoitetaan \(a\)”):
$$
b=\frac{\sum_{i=1}^{N} y_i}{N}
-\frac{\sum_{i=1}^{N} x_i}{N}\;
\underbrace{\frac{N\sum_{i=1}^{N} x_i y_i - (\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)}
{N\sum_{i=1}^{N} x_i^{2} - (\sum_{i=1}^{N} x_i)^2}}_{\text{tämä }a\text{ tulee }(\star)\text{:sta}}.
$$

**Vaihe 3.** Yhdistä yhteiseen nimittäjään \(N\bigl(N\sum x_i^2-(\sum x_i)^2\bigr)\):
$$
b=
\frac{
\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i y_i-(\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)\Bigr)
}{
N\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
}.
$$

**Vaihe 4.** Laajenna osoittaja termi termiltä:

$$
\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(N\sum_{i=1}^N x_i^2 - \Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigr)
-\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(N\sum_{i=1}^N x_i y_i - \Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigr)
$$

Jakolain mukaan:

$$
N\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i^2\Bigr)
-\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i\Bigr)^2
-N\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N x_i y_i\Bigr)
+\Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigl(\sum_{i=1}^N y_i\Bigr).
$$

2. ja 4. termi ovat samat vastakkaisilla merkeillä, joten ne kumoutuvat.  
Jaa osoittaja ja nimittäjä $N$:llä:

$$
b=
\frac{\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i y_i\Bigr)}
{\,N\sum_{i=1}^{N} x_i^2 - \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2\,}.
$$


**Vaihe 5.** Keskiarvomuoto (sama tulos, lyhyempi laskea):  
määritä $\displaystyle \bar x=\frac{1}{N}\sum_{i=1}^{N}x_i$ ja
$\displaystyle \bar y=\frac{1}{N}\sum_{i=1}^{N}y_i$, niin
$$
\boxed{\,b=\bar y - a\,\bar x\,}.
$$


<br />

### 4.4 Mitä laskea harjoitusta varten

Tarvitset vain neljä summaa ja kaksi kaavaa:

$$
\sum_{i=1}^{N} x_i,\qquad
\sum_{i=1}^{N} y_i,\qquad
\sum_{i=1}^{N} x_i^2,\qquad
\sum_{i=1}^{N} x_i y_i .
$$

Sitten

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

Tämän jälkeen voit piirtää suoran $\hat{y} = a x + b$ ja verrata pisteisiin.

### 4.5 Lopulliset eksplisiittiset ratkaisut

Annettuna $N$ havaintoa $(x_1,y_1),(x_2,y_2),\ldots,(x_N,y_N)$ ja lineaarinen malli $y=ax+b$, $L_{\text{MSE}}$:n minimöivät ratkaisut ovat

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

Nämä kaavat pätevät, kun
$$
N\sum_{i=1}^{N} x_i^2 \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 \neq 0,
$$
mikä tarkoittaa, ettei kaikki $x_i$ ole samoja. Koko derivaatio on kohdissa 4.1–4.3.

### 4.6 Pikatarkistus

Algebrallinen tarkistus (ilman numeroita): yllä olevat ratkaisut täyttävät ehdot
$$
\sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)=0,
\qquad
\sum_{i=1}^N x_i \bigl(y_i - (a x_i + b)\bigr)=0,
$$
jotka ovat täsmälleen johdetut normaaliyhtälöt. Siis residuaalien keskiarvo on nolla ja ne korreloivat $x$:n kanssa nollasti.

Pieni numeerinen tarkistus (valinnainen): ota $(0,1),(1,3),(2,5),(3,7)$. Tällöin
$$
\sum x_i=6,\ \sum y_i=16,\ \sum x_i^2=14,\ \sum x_i y_i=34,\ N=4.
$$
Sijoittamalla saadaan
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}=2,\qquad
b=\frac{16-2\cdot6}{4}=1,
$$
joten $\hat y=2x+1$ ja kaikki residuaalit ovat $0$.

<br />

---

## Osa 5 : Yhdestä syötteestä moneen

![Board notes](/images/docs/Lecture%202_Linearregression/7.png)

Siirrymme yhdestä syötemuuttujasta useisiin. Idea on sama; merkintöjä tulee lisää.

<br />

### 5.1 Malli kahdella syötteellä

Kahdelle syötteelle ja yhdelle bias-termille:
$$
y \;=\; w_1 x_1 \;+\; w_2 x_2 \;+\; w_0 .
$$

Näytteelle $i$:
$$
\hat y^{(i)} \;=\; w_1 x_1^{(i)} \;+\; w_2 x_2^{(i)} \;+\; w_0 .
$$

Geometrisesti tämä on taso $(x_1,x_2,y)$-avaruudessa.

<br />

### 5.2 Vektori- ja matriisimuoto (kuten taululla)

Kokoa ennusteet, parametrit ja syötteet:

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

Muodot: $A\in\mathbb R^{N\times 3}$, $\mathbf w\in\mathbb R^{3\times 1}$, $\hat{\mathbf y}\in\mathbb R^{N\times 1}$.

Kompakti muoto (opettajan rivi):
$$
\hat{\mathbf y} \;=\; A\,\mathbf w .
$$

MSE-kriteerillä
$$
L_{\text{MSE}}(\mathbf w)=\tfrac1N\|\mathbf y-A\mathbf w\|_2^2,
$$
normaaliyhtälöt ovat
$$
A^\top A\,\mathbf w \;=\; A^\top \mathbf y,
$$
ja jos $A^\top A$ on kääntyvä,
$$
\boxed{\;\mathbf w=(A^\top A)^{-1}A^\top \mathbf y\;}
$$
(“ratkaise $\mathbf w$”).

Tämä yleistyy moneen syötteeseen lisäämällä sarakkeita $A$:han ja komponentteja $\mathbf w$:hen.

<br />

### 5.3 ”Epälineaarinen” piirrelaajennuksella (vain neliötermit, kuten taululla)

Pidä **lineaarinen malli piirteissä**, mutta muuta $A$:n sarakkeet sisältämään neliötermit:

$$
\hat y \;=\; w_3\,x_1^2 \;+\; w_4\,x_2^2 \;+\; w_1\,x_1 \;+\; w_2\,x_2 \;+\; w_0 .
$$

Rakenna
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

Jälleen $\hat{\mathbf y}=A\mathbf w$ ja ratkaisu on **sama**
$$
\mathbf w=(A^\top A)^{-1}A^\top\mathbf y.
$$

<br />

### 5.4 Pikahuomio robustista sovituksesta (RANSAC)

Poikkeamia esiintyy. Temppu: valitse satunnaisesti kaksi pistettä, sovita suora/taso, valitse etäisyyskynnys, laske sisäpisteet, toista, pidä malli jolla sisäpisteitä on eniten, ja sovita uudelleen sisäpisteillä. Toimii hyvin, mutta kynnys pitää valita itse (ei ilmaista lounasta).

<br />

### 5.5 Mitä toteuttaa

Rakenna $A$ (yksi rivi per näyte, yksi sarake per piirre + ykköspylväs). Rakenna $\mathbf y$. Laske sitten
$$
\mathbf w=(A^\top A)^{-1}A^\top \mathbf y,
$$
piirrä $\hat{\mathbf y}=A\mathbf w$ ja vertaa dataan.
