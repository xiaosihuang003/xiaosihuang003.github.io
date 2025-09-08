---
title: "Python Lab: Opi tekemällä"
date: 2025-08-18
excerpt: >
  Kokoelma käytännön Python-miniprojekteja, joiden avulla vahvistat
  ohjelmoinnin perus­taitoja konkreettisen tekemisen kautta.
tags: ["Python", "Pandas", "CLI", "Utilities"]
---

<style>
.post-body{
  --p-size: 1.08rem;   /* 正文段落 */
  --h2-size: 1.50rem;  /* H2 */
  --h3-size: 1.22rem;  /* H3 */
  --p-leading: 1.9;    /* 段落行距 */
}

.post-body hr { border: 0; border-top: 1px solid #e5e5e5; margin: 32px 0; }

.post-body figure { margin: 10px auto 24px auto; text-align: center; }
.post-body figure img { border-radius: 14px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); }
.post-body figure figcaption { color: #6e6e73; font-size: 0.92em; margin-top: 10px; }

.post-body a { font-size: 0.95rem; }
.post-body a:hover { opacity: 0.9; }

/* 项目 Hero 图 */
.project-hero { width: 100%; margin: 2rem auto; text-align: center; }
.project-hero__img {
  width: 100%; max-width: none; height: auto; display: block; margin: 0 auto;
  border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,.12);
}
.project-hero__cap { margin-top: 12px; font-size: .95em; color: #6e6e73; }
@media (min-width:1024px){
  .project-hero__img{ max-width: 1280px; }
}
</style>

<!-- ===== Hero Visual ===== -->
<figure class="project-hero">
  <img
    src="/images/projects/project1.png"
    alt="Python Lab – katsaus käytännön Python-miniprojekteihin"
    class="project-hero__img"
  />
  <figcaption class="project-hero__cap">
    Kuva: Python Lab — kokoelma pieniä, tarkasti rajattuja Python-miniprojekteja
  </figcaption>
</figure>

<!-- ===== CTA Buttons ===== -->
<div style="text-align:center; margin:24px 0 44px 0;">
  <a href="https://xiaosihuang003.github.io/python-lab/" target="_blank"
     style="display:inline-block; margin:6px; padding:12px 22px; border:1px solid #d2d2d7; border-radius:12px; text-decoration:none; color:#0070c9;">
     Live Docs (Demo)
  </a>
  <a href="https://github.com/xiaosihuang003/python-lab" target="_blank"
     style="display:inline-block; margin:6px; padding:12px 22px; border:1px solid #d2d2d7; border-radius:12px; text-decoration:none; color:#0070c9;">
     GitHub Repository
  </a>
</div>

---

## Mikä tämä on?

Python Lab on kasvava kokoelma pieniä, fokusoituja Python-projekteja. Jokainen miniprojekti on itsenäinen ja selkeä, joten voit lukea, kloonata ja ajaa sen nopeasti. Tavoitteena on harjoitella perusteita (tietotyypit, silmukat, funktiot, CLI-työkalut) ja siirtyä vähitellen kohti käytännön apuohjelmia (CSV/Excelin siivous, nopeat EDA-apu-skriptit jne.).

---

## Miksi tämä projekti?

Suurten kehysten sijaan laboratorio painottaa selkeyttä, johdonmukaisuutta ja toistettavia kaavoja — koodia, jota voit hyödyntää monissa pienissä tehtävissä.

---

## Mitä mukana

- Sana-/rivilaskurit ja nopeat laskurit komentorivin harjoitteluun  
- Merkkijonokäsittelyä (slicing, analyysi, normalisointi)  
- Listojen ja sanakirjojen operaatiot suodattimilla ja muunnoksilla  
- Pienet apurit CSV-/Excel-datan käsittelyyn  
- Lyhyitä harjoituksia, jotka havainnollistavat ohjauksen kulkua (break/continue, loop-else)
