---
title: "Python Lab: Lær ved å bygge"
date: 2025-08-18
excerpt: >
  En samling praktiske Python-miniprosjekter som styrker
  grunnleggende programmeringsferdigheter gjennom konkret implementering.
tags: ["Python", "Pandas", "CLI", "Utilities"]
---

<style>
/* —— 只影响本页：调正文字号与层级 —— */
.post-body{
  --p-size: 1.08rem;   /* 正文段落 */
  --h2-size: 1.50rem;  /* H2 */
  --h3-size: 1.22rem;  /* H3 */
  --p-leading: 1.9;    /* 段落行距 */
}

/* 分隔线、图文等微调（保留原视觉，不改布局） */
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
    alt="Python Lab – oversikt over praktiske Python-miniprosjekter"
    class="project-hero__img"
  />
  <figcaption class="project-hero__cap">
    Bilde: Python Lab — en samling små, fokuserte Python-miniprosjekter
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

## Hva er det?

Python Lab er en voksende samling små, fokuserte Python-prosjekter. Hvert miniprosjekt er selvstendig og enkelt, slik at du raskt kan lese, klone og kjøre det. Målet er å øve på grunnleggende konsepter (datatyper, løkker, funksjoner, CLI-verktøy) og gradvis gå over til nyttige verktøy i praksis (rensing av CSV/Excel, raske EDA-hjelpere m.m.).

---

## Hvorfor dette prosjektet?

I stedet for store rammeverk vektlegger laben klarhet, konsistens og gjenbrukbare mønstre — kode du kan bruke igjen i mange små oppgaver.

---

## Hva følger med

- Ord-/linjetellere og raske kalkulatorer for kommandolinje-trening  
- Strengbehandling (slicing, analyse, normalisering)  
- Operasjoner på lister og dictionaries med filtre og transformasjoner  
- Små hjelpere for arbeid med CSV-/Excel-data  
- Korte øvelser som demonstrerer flytkontroll (break/continue, loop-else)
