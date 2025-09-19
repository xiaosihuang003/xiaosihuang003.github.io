---
title: "(Python) Datainnsamling og -behandling fra Project Gutenberg"
date: 2025-09-17
tags: ["Python", "NLP", "Web Scraping", "NLTK", "Text Mining"]
excerpt: "En NLP-pipeline: hent de siste 30 dagers toppnedlastinger på Project Gutenberg, rens tekster, tokeniser og lemmatiser med NLTK, og bygg et samlet vokabular med en Top-100 frekvenstabell."
---

> Jeg bygde en NLP-pipeline som henter Project Gutenbergs **Top-20** mest nedlastede e-bøker i det offentlige domene (siste 30 dager), fjerner boilerplate, tokeniserer og lemmatiserer tekstene, og produserer et **samlet vokabular** med en **Top-100** frekvensliste.

Kildeliste på Gutenberg: https://www.gutenberg.org/browse/scores/top-en.php

<!-- Table styles -->
<style>
.table-wrap{overflow-x:auto;margin:1rem 0;}
.table-compact{border-collapse:collapse;width:100%;font-size:0.95rem;}
.table-compact th,.table-compact td{border:1px solid var(--table-border,#e5e7eb);padding:.5rem .6rem;}
.table-compact th{background:var(--table-th-bg,#f8fafc);font-weight:600;position:sticky;top:0;z-index:1;}
.table-compact td.num{text-align:right;}
.table-compact td.rank{text-align:right;width:4.5rem;}
.table-compact td.word{white-space:nowrap;}
.table-compact td.book{max-width:720px;white-space:normal;}
.muted{color:#6b7280;font-size:.9em;}
@media (max-width:640px){
    .table-compact{font-size:.9rem;}
    .table-compact td.book{max-width:100%;}
}
</style>

---

## Oppgaveliste

> (a) Lag en variant av nett-crawleren som skal laste ned de mest nedlastede e-bøkene fra de siste 30 dagene på Project Gutenberg i `.TXT`-format, for topp-k.  
> (b) Bruk crawleren til å laste ned topp-20 e-bøker (k=20). Rapporter navn og adresser (URL-er) til bøkene.  
> (c) Bruk prosesseringspipen beskrevet i forelesningen til å tokenisere og lemmatisere de nedlastede bøkene.  
> (d) Lag et samlet vokabular fra e-bøkene; rapporter de 100 mest frekvente ordene.

---

## Oversikt

Dette prosjektet henter listen “Top 100 — Last 30 Days” fra Project Gutenberg, laster ned **topp-20** TXT-e-bøker, renser bort Gutenberg-overskrifter/-bunner, tokeniserer og lemmatiserer med **NLTK**, og aggregerer et **globalt vokabular** på tvers av alle bøkene. Jeg publiserer både **rapporten** og **koden** for full reproduksjon.

- **Repo**: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg  
- **Generert rapport (Markdown)**: `outputs/report.md`  
- **Viktige utdata**:  
    - `outputs/top20_books.csv` — titler, boksidenes URL-er, TXT-URL-er, lokale stier  
    - `outputs/per_book_token_counts.csv` — per-bok totale og unike token-forekomster  
    - `outputs/top100_words.csv` — global Top-100-ordliste med frekvenser

---

## Metoder

### 1) Crawling
- Parse seksjonen “Top 100 — Last 30 Days”.
- Ta de første **20** bokoppføringene og finn lenkene til **Plain Text (UTF-8)**.
- Lagre rå `.txt`-filer under `data/raw/` og skriv `outputs/top20_books.csv`.

### 2) Rensing
- Fjern Project Gutenberg-boilerplate ved å bruke markørene:
    - `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
- Behold kun innholdet mellom disse markørene.

### 3) Tokenisering og lemmatisering
- `nltk.word_tokenize(text, preserve_line=True)`; små bokstaver; behold kun **alfabetiske** token.
- POS-tag tokenene; map til WordNet-POS {**n**, **v**, **a**, **r**}; lemmatiser med `WordNetLemmatizer`.
- Fjern engelske **stoppord**.

### 4) Vokabular og statistikk
- Bygg en **global Counter** på tvers av alle bøker; eksporter **Top-100** (`outputs/top100_words.csv`).
- For hver bok, registrer `total_tokens` og `unique_tokens` (`outputs/per_book_token_counts.csv`).

---

## Reproduserbarhet

```bash
# 1) Oppsett
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 2) Hent og last ned topp-20
python crawl_and_download.py

# 3) Rens, tokeniser, lemmatiser og aggreger statistikk
python clean_and_vocab.py

# 4) Bygg Markdown-rapporten
python make_report.py
```

> **Notater**
> - Pipen laster automatisk ned nødvendig NLTK-data. Hvis du skulle få en `punkt_tab`-oppslagsfeil:
>   ```bash
>   python -c "import nltk; [nltk.download(x) for x in ['punkt','punkt_tab','stopwords','wordnet','omw-1.4']]"
>   ```
> - `data/raw/` og `data/clean/` er ignorert av git for å holde repoet lite; de kan regenereres.

---

## Topp-20 bøker (siste 30 dager)

1. [Moby Dick; Or, The Whale by Herman Melville (120117)](https://www.gutenberg.org/ebooks/2701)  
2. [Frankenstein; Or, The Modern Prometheus by Mary Wollstonecraft Shelley (117668)](https://www.gutenberg.org/ebooks/84)  
3. [Romeo and Juliet by William Shakespeare (81275)](https://www.gutenberg.org/ebooks/1513)  
4. [Pride and Prejudice by Jane Austen (71294)](https://www.gutenberg.org/ebooks/1342)  
5. [Alice's Adventures in Wonderland by Lewis Carroll (60624)](https://www.gutenberg.org/ebooks/11)  
6. [A Room with a View by E. M. Forster (57478)](https://www.gutenberg.org/ebooks/2641)  
7. [The Complete Works of William Shakespeare by William Shakespeare (56211)](https://www.gutenberg.org/ebooks/100)  
8. [Middlemarch by George Eliot (55252)](https://www.gutenberg.org/ebooks/145)  
9. [Little Women; Or, Meg, Jo, Beth, and Amy by Louisa May Alcott (53318)](https://www.gutenberg.org/ebooks/37106)  
10. [Beowulf: An Anglo-Saxon Epic Poem (52640)](https://www.gutenberg.org/ebooks/16328)  
11. [How to Observe: Morals and Manners by Harriet Martineau (51437)](https://www.gutenberg.org/ebooks/33944)  
12. [Dracula by Bram Stoker (47752)](https://www.gutenberg.org/ebooks/345)  
13. [The Enchanted April by Elizabeth Von Arnim (45511)](https://www.gutenberg.org/ebooks/16389)  
14. [The Blue Castle: a novel by L. M. Montgomery (45401)](https://www.gutenberg.org/ebooks/67979)  
15. [The Strange Case of Dr. Jekyll and Mr. Hyde by Robert Louis Stevenson (44586)](https://www.gutenberg.org/ebooks/43)  
16. [Cranford by Elizabeth Cleghorn Gaskell (40784)](https://www.gutenberg.org/ebooks/394)  
17. [The Adventures of Ferdinand Count Fathom — Complete by T. Smollett (40314)](https://www.gutenberg.org/ebooks/6761)  
18. [The Expedition of Humphry Clinker by T. Smollett (40226)](https://www.gutenberg.org/ebooks/2160)  
19. [Twenty years after by Alexandre Dumas and Auguste Maquet (39708)](https://www.gutenberg.org/ebooks/1259)  
20. [History of Tom Jones, a Foundling by Henry Fielding (39646)](https://www.gutenberg.org/ebooks/6593)

---

## Token-statistikk per bok

<div class="table-wrap">
<table class="table-compact">
    <thead>
    <tr>
        <th>Bok</th>
        <th style="text-align:right">Unike&nbsp;token</th>
        <th style="text-align:right">Totale&nbsp;token</th>
    </tr>
    </thead>
    <tbody>
    <tr><td class="book">A Room with a View by E. M. Forster <span class="muted">57478</span></td><td class="num">4,891</td><td class="num">28,298</td></tr>
    <tr><td class="book">Alice's Adventures in Wonderland by Lewis Carroll <span class="muted">60624</span></td><td class="num">2,076</td><td class="num">12,461</td></tr>
    <tr><td class="book">Beowulf: An Anglo-Saxon Epic Poem <span class="muted">52640</span></td><td class="num">3,921</td><td class="num">18,116</td></tr>
    <tr><td class="book">Cranford by Elizabeth Cleghorn Gaskell <span class="muted">40784</span></td><td class="num">4,854</td><td class="num">31,905</td></tr>
    <tr><td class="book">Dracula by Bram Stoker <span class="muted">47752</span></td><td class="num">6,857</td><td class="num">65,156</td></tr>
    <tr><td class="book">Frankenstein; Or, The Modern Prometheus by Mary Wollstonecraft Shelley <span class="muted">117668</span></td><td class="num">5,268</td><td class="num">33,175</td></tr>
    <tr><td class="book">History of Tom Jones, a Foundling by Henry Fielding <span class="muted">39646</span></td><td class="num">9,201</td><td class="num">151,809</td></tr>
    <tr><td class="book">How to Observe: Morals and Manners by Harriet Martineau <span class="muted">51437</span></td><td class="num">5,696</td><td class="num">30,610</td></tr>
    <tr><td class="book">Little Women; Or, Meg, Jo, Beth, and Amy by Louisa May Alcott <span class="muted">53318</span></td><td class="num">7,813</td><td class="num">87,560</td></tr>
    <tr><td class="book">Middlemarch by George Eliot <span class="muted">55252</span></td><td class="num">11,119</td><td class="num">133,697</td></tr>
    <tr><td class="book">Moby Dick; Or, The Whale by Herman Melville <span class="muted">120117</span></td><td class="num">12,463</td><td class="num">99,529</td></tr>
    <tr><td class="book">Pride and Prejudice by Jane Austen <span class="muted">71294</span></td><td class="num">4,941</td><td class="num">53,363</td></tr>
    <tr><td class="book">Romeo and Juliet by William Shakespeare <span class="muted">81275</span></td><td class="num">3,050</td><td class="num">13,324</td></tr>
    <tr><td class="book">The Adventures of Ferdinand Count Fathom — Complete by T. Smollett <span class="muted">40314</span></td><td class="num">8,134</td><td class="num">73,203</td></tr>
    <tr><td class="book">The Blue Castle: a novel by L. M. Montgomery <span class="muted">45401</span></td><td class="num">5,043</td><td class="num">30,099</td></tr>
    <tr><td class="book">The Complete Works of William Shakespeare by William Shakespeare <span class="muted">56211</span></td><td class="num">18,274</td><td class="num">425,521</td></tr>
    <tr><td class="book">The Enchanted April by Elizabeth Von Arnim <span class="muted">45511</span></td><td class="num">4,545</td><td class="num">32,830</td></tr>
    <tr><td class="book">The Expedition of Humphry Clinker by T. Smollett <span class="muted">40226</span></td><td class="num">9,504</td><td class="num">68,230</td></tr>
    <tr><td class="book">The Strange Case of Dr. Jekyll and Mr. Hyde by Robert Louis Stevenson <span class="muted">44586</span></td><td class="num">3,205</td><td class="num">12,136</td></tr>
    <tr><td class="book">Twenty years after by Alexandre Dumas and Auguste Maquet <span class="muted">39708</span></td><td class="num">7,787</td><td class="num">106,487</td></tr>
    </tbody>
</table>
</div>

> **Observasjon** — Shakespeares *Complete Works* dominerer råtallene (forventet). Ordforrådsrikdommen varierer mye mellom titlene.

---

## Global Top-100-ord (samlet vokabular)

<!-- Left-aligned & width-limited table -->
<div style="width:100%; max-width:720px; margin:1rem 0;">
    <table style="width:100% !important; table-layout:fixed !important; border-collapse:separate !important; border-spacing:0 !important; font-size:0.95rem;">
    <colgroup>
        <col style="width:18% !important;">
        <col style="width:52% !important;">
        <col style="width:30% !important;">
    </colgroup>
     <thead>
        <tr>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">Rang</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">Ord</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">Antall</th>
        </tr>
    </thead>
    <tbody>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">1</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">say</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">16,700</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">would</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">10,635</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">one</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">9,805</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">make</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">9,430</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">5</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">go</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">9,299</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">come</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">9,175</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">7</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">know</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">8,083</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">8</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">good</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">7,649</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">9</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">see</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">7,108</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">10</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">shall</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,913</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">11</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thou</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,794</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">12</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">take</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,635</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">13</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">think</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,372</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">14</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">like</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,281</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">15</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">could</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,141</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">16</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">give</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,083</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">17</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">well</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">6,061</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">18</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">man</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">5,761</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">19</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">upon</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">5,737</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">20</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">must</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">5,498</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">21</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">look</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">5,474</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">22</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">may</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">5,390</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">23</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">time</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">5,148</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">24</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thy</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,908</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">25</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">much</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,800</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">26</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">tell</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,608</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">27</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">never</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,561</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">28</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">sir</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,555</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">29</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">little</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,552</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">30</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">great</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,544</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">31</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">love</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,429</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">32</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">let</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,346</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">33</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">find</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,085</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">34</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">u</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">4,002</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">35</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">lord</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,818</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">36</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">yet</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,735</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">37</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">first</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,675</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">38</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">king</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,578</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">39</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">hand</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,559</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">40</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">lady</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,458</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">41</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">get</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,421</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">42</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">day</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,416</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">43</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">seem</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,401</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">44</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thee</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,386</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">45</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">hear</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,381</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">46</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">might</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,353</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">47</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">old</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">48</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">though</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,311</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">49</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">eye</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,309</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">50</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">enter</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,270</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">51</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">two</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,255</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">52</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">leave</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,234</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">53</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">thing</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,160</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">54</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">without</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,133</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">55</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">speak</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,117</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">56</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">even</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,998</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">57</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">young</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,987</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">58</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">friend</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,969</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">59</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">hath</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,903</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">60</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">life</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,818</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">61</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">call</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,807</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">62</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">long</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,764</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">63</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">work</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,761</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">64</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">every</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,744</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">65</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">way</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,717</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">66</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">heart</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,585</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">67</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">ever</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,548</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">68</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">word</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,524</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">69</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">poor</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,524</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">70</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">nothing</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,519</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">71</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">men</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,505</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">72</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">many</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,502</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">73</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">turn</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,493</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">74</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">dear</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,492</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">75</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">cry</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,475</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">76</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">father</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,470</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">77</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">away</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,469</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">78</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">part</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,436</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">79</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">mean</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,380</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">80</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">place</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,350</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">81</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">keep</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,348</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">82</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">mr</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,333</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">83</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">miss</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,314</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">84</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">still</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,305</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">85</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">ask</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,300</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">86</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">put</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,273</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">87</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">use</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,257</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">88</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">last</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,212</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">89</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">begin</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,157</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">90</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">stand</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,152</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">91</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">indeed</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,122</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">92</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">god</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,111</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">93</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">bring</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,092</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">94</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">woman</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,089</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">95</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">want</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,085</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">96</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">head</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,084</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">97</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">scene</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,068</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">98</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">house</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,066</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">99</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">mind</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,027</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">100</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">answer</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,025</td></tr>
    </tbody>
    </table>
</div>


---

## Implementasjonsdetaljer — hvorfor disse valgene?

- **Requests + BeautifulSoup + lxml**: lettvekts og robust for HTML-scraping.  
- **Retry & høflighet**: enkel ratelimiting, tolerant for midlertidige 5xx/429-feil.  
- **Fjerning av header/footer**: eksakte markører fra Gutenberg-dokumentasjonen; sikkerhetsfall-back.  
- **NLTK**: mye brukt; `preserve_line=True` unngår avhengighet til setningsmodeller (`punkt_tab`).  
- **Normalisering**: små bokstaver, behold alfabetiske token, POS-bevisst lemmatisering, fjerning av stoppord.

---

## Begrensninger og videre arbeid

- Generisk **stoppord**-liste; for stilistiske analyser kan man beholde funksjonsord i stedet.  
- `isalpha()` fjerner bindestrekssammensetninger og tall; tilpasset tokenisering kan legges til per oppgave.  
- **Skjevhet mellom bøker** (f.eks. *Complete Works of Shakespeare*) vrir tellingene → vurder per-bok-normalisering eller TF-IDF.  
- Kun engelsk pipeline; legg til språkgjenkjenning for flerspråklige korpus.  
- Fremtidig arbeid: visualiseringer (f.eks. diversitetskurver), per-forfatter-sammenligninger, kollokasjoner.

---

## Slik siterer du og lisens

- Tekster i det offentlige domene med tillatelse fra **Project Gutenberg**. Bruksvilkår: https://www.gutenberg.org/policy/permission.html  
- Kode og datapipeline: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg




---

## Behandlingspipeline (som i forelesningen)

Denne seksjonen følger tredelt-pipelinen brukt i forelesningsslidene:
**(1) Datainnsamling → (2) Datavask → (3) Informasjonsuttrekk og koding**.
Jeg implementerer hvert steg med et eget skript og lagrer mellomliggende artefakter
for full reproduksjon.

---

### 1) Datainnsamling
- **Mål i forelesningen:** samle tekstdata fra ulike kilder.
- **Hva jeg gjør her:** hent Project Gutenbergs “Top 100 — Last 30 Days”, ta de
    første **k=20** bøkene, finn hver boks **Plain Text (UTF-8)**-lenke, og last ned
    de rå `.txt`-filene.
- **Skript / funksjoner:** `crawl_and_download.py` → `fetch_top_page()`,
    `parse_last_30_days()`, `resolve_plaintext_url()`, `download_txt()`.
- **Utdata:**
    - Råtekster: `data/raw/*.txt`
    - Indeks-CSV med titler, boksidenes URL-er, TXT-URL-er, lokale stier:
    `outputs/top20_books.csv`
- **Kommando:**
    ```bash
    python crawl_and_download.py
    ```

### 2) Datavask
- **Mål i forelesningen:** fjern boilerplate og normaliser innholdet.
- **Hva jeg gjør her:** fjern Project Gutenberg-overskrifter/-bunner med de offisielle
    markørene og behold kun kjerneteksten.
    - Startmarkør: `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - Sluttmarkør: `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
    Normaliser blanktegn og sikre UTF-8-tekst.
- **Skript / funksjoner:** `clean_and_vocab.py` → `read_text()`,
    `strip_gutenberg_header_footer(text)`.
- **Utdata:** renset ren tekst per bok i `data/clean/*.txt`
    (ignorert av git; kan regenereres).

### 3) Informasjonsuttrekk og koding
- **Mål i forelesningen:** gjøre tekst om til analyserbare språklige enheter / features.
- **Hva jeg gjør her:** tokenisering → POS-taging → lemmatisering → fjerning av stoppord,
    deretter bygge per-bok- og globale statistikker.
    - **Tokenisering:** `nltk.word_tokenize(text, preserve_line=True)`
    - **Normalisering:** små bokstaver; behold kun alfabetiske token (`str.isalpha()`).
    - **POS-taging:** `nltk.pos_tag(tokens)`
    - **Lemmatisering:** WordNet-bevisst; map POS til {n, v, a, r} før lemmatisering
    (`WordNetLemmatizer()`).
    - **Stoppord:** fjern NLTK engelske stoppord.
    - **Aggregering:** tell totale token og unike token per bok; bygg et **samlet
    vokabular** på tvers av alle bøker og eksporter **Top-100**-ord.
- **Skript / funksjoner:** `clean_and_vocab.py` → `tokenize_and_lemmatize(text)`,
    `nltk_pos_to_wordnet_pos(tag)`, `accumulate_counts(tokens)`.
- **Utdata:**
    - `outputs/per_book_token_counts.csv` — per-bok totaler og unike typer
    - `outputs/top100_words.csv` — global Top-100-ordliste med frekvenser
- **Kommando:**
    ```bash
    python clean_and_vocab.py
    ```

---

### Hvorfor disse valgene (kort)
- **NLTK** gir pålitelig tokenisering, POS-taging og WordNet-lemmatisering.
    Bruk av `preserve_line=True` reduserer avhengighet til setningsmodeller og unngår
    `punkt_tab`-problemer; jeg laster fortsatt ned nødvendige NLTK-modeller ved første kjøring.
- **Fjerning av header/footer** følger nøyaktig Gutenbergs dokumenterte markører for å
    unngå å telle lisens-tekst.
- **Alfabet-filter** (`isalpha()`) forenkler vokabularet for denne oppgaven;
    for senere oppgaver kan vi beholde bindestreker/tall eller bytte til en tilpasset
    tokenizer.

### Reproduser ende-til-ende
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python crawl_and_download.py
python clean_and_vocab.py
python make_report.py
```

*Artefakter å sjekke:*
- `outputs/top20_books.csv`
- `outputs/per_book_token_counts.csv`
- `outputs/top100_words.csv`
- Markdown-rapport: `outputs/report.md`

## Zipfs lov (Top-20 Gutenberg-korpus)

La $p(r)$ være den empiriske frekvensen til ordet på rang $r$ (antall forekomster delt på totalt antall token). På log–log-aksene forutsier Zipfs lov et potenslov-fall:
$$
p(r;a)=\frac{r^{-a}}{\sum_{k=1}^{V} k^{-a}},\qquad r=1,\dots,V.
$$

**Metode.** Ved å bruke de rensede tokenene fra topp-20-bøkene bygde jeg en rang–frekvens-tabell og plottet $p(r)$ mot $r$ på log–log-aksene. Jeg la over teoretiske Zipf-kurver $p(r)\propto r^{-a}$ for $a\in\{0.80,1.00,1.20\}$, og tilpasset $a$ ved OLS på $(\log r,\ \log p(r))$ over rangene $10$–$3000$ for å unngå artefakter i topp og hale.

**Viktige utdata**
- CSV: [`outputs/zipf_freqs.csv`](outputs/zipf_freqs.csv) — rang, ord, rå telling, normalisert sannsynlighet.
- Figurer:
  - Empirisk rang–frekvens:  
    <img src="/images/projects/project5/zipf_rank_freq.png" alt="Zipf empirical rank–frequency" width="720">
  - Empiri vs. Zipf-overlegg (med tilpasset helning):  
    <img src="/images/projects/project5/zipf_overlay.png" alt="Zipf empirical vs models" width="720">
  - Artefakter (CSV og genererte figurer i repo):  
    <img src="/images/projects/project5/3.png" alt="VS Code view of zipf_freqs.csv and output figures" width="880">

### Funn

1. **Tung hale:** Det mest frekvente ordet (“say”) utgjør ~1,1% av alle token; sannsynlighetene faller raskt med rang — et klassisk tung-hale-kjennetegn.
2. **Potenslov-regime:** Mellomområdet (omtrent rangene $10$–$3000$) er nær en rett linje i log–log-rom $\rightarrow$ potenslov-atferd. Toppen er flatere (funksjonsord / sjangermiks), og den fjerne halen bøyer ned (endelig utvalgsstørrelse).
3. **Beste eksponent:** Den tilpassede eksponenten i mellomområdet er **$a \approx 0.964$**, svært nær den kanoniske Zipf-verdien $1$. Modellen med $a=1.0$ følger dataene tett; $a=0.8$ er for grunn og $a=1.2$ for bratt.

**Konklusjon:** Det samlede vokabularet til topp-20-bøkene følger **Zipfs lov** med god tilnærming med eksponent **$a\approx0.96$**. Avvik i topp og hale er forventet.
