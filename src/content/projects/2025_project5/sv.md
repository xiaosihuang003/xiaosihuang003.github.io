---
title: "(Python) Datainsamling och bearbetning från Project Gutenberg"
date: 2025-09-17
tags: ["Python", "NLP", "Web Scraping", "NLTK", "Text Mining"]
excerpt: "En NLP‑pipeline: crawla toppnedladdningar de senaste 30 dagarna på Project Gutenberg, rensa texterna, tokenisera & lemmatisera med NLTK, och bygg ett enhetligt ordförråd med en Top‑100 frekvenstabell."
---

> Jag byggde en NLP‑pipeline som crawlar Project Gutenbergs **Topp‑20** mest nedladdade e‑böcker i public domain (senaste 30 dagarna), tar bort boilerplate, tokeniserar & lemmatiserar texterna och producerar ett **enhetligt ordförråd** med en **Top‑100** frekvenslista.

Källista på Gutenberg: https://www.gutenberg.org/browse/scores/top-en.php

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

## Uppgiftslista

> (a) Skapa en variant av webb‑crawlern för att ladda ned de top‑k mest nedladdade e‑böckerna under de senaste 30 dagarna från Project Gutenberg i `.TXT`‑format.  
> (b) Använd crawlern för att ladda ned de topp 20 e‑böckerna (k=20). Rapportera böckernas namn och adresser.  
> (c) Använd bearbetningspipen från föreläsningen för att tokenisera och lemmatisera de nedladdade böckerna.  
> (d) Skapa ett enhetligt ordförråd från e‑böckerna; rapportera de 100 vanligaste orden.

---

## Översikt

Detta projekt crawlar listan “Top 100 — Last 30 Days” från Project Gutenberg, laddar ned **topp‑20** TXT‑e‑böcker, rensar bort Gutenbergs headers/footers, tokeniserar och lemmatiserar med **NLTK**, och aggregerar ett **globalt ordförråd** över alla böcker. Jag publicerar både **rapporten** och **koden** för full reproducerbarhet.

- **Repo**: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg  
- **Genererad rapport (Markdown)**: `outputs/report.md`  
- **Nyckelutdata**:  
    - `outputs/top20_books.csv` — titlar, boksidors URL:er, TXT‑URL:er, lokala sökvägar  
    - `outputs/per_book_token_counts.csv` — per‑bok totala & unika tokenantal  
    - `outputs/top100_words.csv` — global Top‑100 ord med frekvenser

---

## Metoder

### 1) Crawling
- Parsar sektionen “Top 100 — Last 30 Days”.
- Tar de första **20** bokposterna och löser deras **Plain Text (UTF‑8)**‑länkar.
- Sparar råa `.txt`‑filer under `data/raw/` och skriver `outputs/top20_books.csv`.

### 2) Rensning
- Tar bort Project Gutenbergs boilerplate med markörer:
    - `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
- Behåll endast innehållet mellan dessa markörer.

### 3) Tokenisering & lemmatisering
- `nltk.word_tokenize(text, preserve_line=True)`; gemener; behåll endast **alfabetiska** token.
- POS‑tagga token; mappa till WordNet‑POS {**n**, **v**, **a**, **r**}; lemmatisera med `WordNetLemmatizer`.
- Ta bort engelska **stopwords**.

### 4) Ordförråd & statistik
- Bygg en **global Counter** över alla böcker; exportera **Top‑100** (`outputs/top100_words.csv`).
- För varje bok, registrera `total_tokens` och `unique_tokens` (`outputs/per_book_token_counts.csv`).

---

## Reproducerbarhet

```bash
# 1) Setup
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 2) Crawla & ladda ned topp-20
python crawl_and_download.py

# 3) Rensa, tokenisera, lemmatisera och aggregera statistik
python clean_and_vocab.py

# 4) Bygg Markdown-rapporten
python make_report.py
```

> **Anmärkningar**
> - Pipen laddar automatiskt ned nödvändiga NLTK‑data. Om du stöter på ett `punkt_tab` lookup‑fel:
>   ```bash
>   python -c "import nltk; [nltk.download(x) for x in ['punkt','punkt_tab','stopwords','wordnet','omw-1.4']]"
>   ```
> - `data/raw/` och `data/clean/` är git‑ignorerade för att hålla repot litet; de kan återskapas.

---

## Topp‑20 böcker (senaste 30 dagarna)

1. [Moby Dick; Or, The Whale av Herman Melville (120117)](https://www.gutenberg.org/ebooks/2701)  
2. [Frankenstein; Or, The Modern Prometheus av Mary Wollstonecraft Shelley (117668)](https://www.gutenberg.org/ebooks/84)  
3. [Romeo and Juliet av William Shakespeare (81275)](https://www.gutenberg.org/ebooks/1513)  
4. [Pride and Prejudice av Jane Austen (71294)](https://www.gutenberg.org/ebooks/1342)  
5. [Alice's Adventures in Wonderland av Lewis Carroll (60624)](https://www.gutenberg.org/ebooks/11)  
6. [A Room with a View av E. M. Forster (57478)](https://www.gutenberg.org/ebooks/2641)  
7. [The Complete Works of William Shakespeare av William Shakespeare (56211)](https://www.gutenberg.org/ebooks/100)  
8. [Middlemarch av George Eliot (55252)](https://www.gutenberg.org/ebooks/145)  
9. [Little Women; Or, Meg, Jo, Beth, and Amy av Louisa May Alcott (53318)](https://www.gutenberg.org/ebooks/37106)  
10. [Beowulf: An Anglo-Saxon Epic Poem (52640)](https://www.gutenberg.org/ebooks/16328)  
11. [How to Observe: Morals and Manners av Harriet Martineau (51437)](https://www.gutenberg.org/ebooks/33944)  
12. [Dracula av Bram Stoker (47752)](https://www.gutenberg.org/ebooks/345)  
13. [The Enchanted April av Elizabeth Von Arnim (45511)](https://www.gutenberg.org/ebooks/16389)  
14. [The Blue Castle: a novel av L. M. Montgomery (45401)](https://www.gutenberg.org/ebooks/67979)  
15. [The Strange Case of Dr. Jekyll and Mr. Hyde av Robert Louis Stevenson (44586)](https://www.gutenberg.org/ebooks/43)  
16. [Cranford av Elizabeth Cleghorn Gaskell (40784)](https://www.gutenberg.org/ebooks/394)  
17. [The Adventures of Ferdinand Count Fathom — Complete av T. Smollett (40314)](https://www.gutenberg.org/ebooks/6761)  
18. [The Expedition of Humphry Clinker av T. Smollett (40226)](https://www.gutenberg.org/ebooks/2160)  
19. [Twenty years after av Alexandre Dumas och Auguste Maquet (39708)](https://www.gutenberg.org/ebooks/1259)  
20. [History of Tom Jones, a Foundling av Henry Fielding (39646)](https://www.gutenberg.org/ebooks/6593)

---

## Tokenstatistik per bok

<div class="table-wrap">
<table class="table-compact">
    <thead>
    <tr>
        <th>Bok</th>
        <th style="text-align:right">Unika&nbsp;token</th>
        <th style="text-align:right">Totala&nbsp;token</th>
    </tr>
    </thead>
    <tbody>
    <tr><td class="book">A Room with a View av E. M. Forster <span class="muted">57478</span></td><td class="num">4,891</td><td class="num">28,298</td></tr>
    <tr><td class="book">Alice's Adventures in Wonderland av Lewis Carroll <span class="muted">60624</span></td><td class="num">2,076</td><td class="num">12,461</td></tr>
    <tr><td class="book">Beowulf: An Anglo-Saxon Epic Poem <span class="muted">52640</span></td><td class="num">3,921</td><td class="num">18,116</td></tr>
    <tr><td class="book">Cranford av Elizabeth Cleghorn Gaskell <span class="muted">40784</span></td><td class="num">4,854</td><td class="num">31,905</td></tr>
    <tr><td class="book">Dracula av Bram Stoker <span class="muted">47752</span></td><td class="num">6,857</td><td class="num">65,156</td></tr>
    <tr><td class="book">Frankenstein; Or, The Modern Prometheus av Mary Wollstonecraft Shelley <span class="muted">117668</span></td><td class="num">5,268</td><td class="num">33,175</td></tr>
    <tr><td class="book">History of Tom Jones, a Foundling av Henry Fielding <span class="muted">39646</span></td><td class="num">9,201</td><td class="num">151,809</td></tr>
    <tr><td class="book">How to Observe: Morals and Manners av Harriet Martineau <span class="muted">51437</span></td><td class="num">5,696</td><td class="num">30,610</td></tr>
    <tr><td class="book">Little Women; Or, Meg, Jo, Beth, and Amy av Louisa May Alcott <span class="muted">53318</span></td><td class="num">7,813</td><td class="num">87,560</td></tr>
    <tr><td class="book">Middlemarch av George Eliot <span class="muted">55252</span></td><td class="num">11,119</td><td class="num">133,697</td></tr>
    <tr><td class="book">Moby Dick; Or, The Whale av Herman Melville <span class="muted">120117</span></td><td class="num">12,463</td><td class="num">99,529</td></tr>
    <tr><td class="book">Pride and Prejudice av Jane Austen <span class="muted">71294</span></td><td class="num">4,941</td><td class="num">53,363</td></tr>
    <tr><td class="book">Romeo and Juliet av William Shakespeare <span class="muted">81275</span></td><td class="num">3,050</td><td class="num">13,324</td></tr>
    <tr><td class="book">The Adventures of Ferdinand Count Fathom — Complete av T. Smollett <span class="muted">40314</span></td><td class="num">8,134</td><td class="num">73,203</td></tr>
    <tr><td class="book">The Blue Castle: a novel av L. M. Montgomery <span class="muted">45401</span></td><td class="num">5,043</td><td class="num">30,099</td></tr>
    <tr><td class="book">The Complete Works of William Shakespeare av William Shakespeare <span class="muted">56211</span></td><td class="num">18,274</td><td class="num">425,521</td></tr>
    <tr><td class="book">The Enchanted April av Elizabeth Von Arnim <span class="muted">45511</span></td><td class="num">4,545</td><td class="num">32,830</td></tr>
    <tr><td class="book">The Expedition of Humphry Clinker av T. Smollett <span class="muted">40226</span></td><td class="num">9,504</td><td class="num">68,230</td></tr>
    <tr><td class="book">The Strange Case of Dr. Jekyll and Mr. Hyde av Robert Louis Stevenson <span class="muted">44586</span></td><td class="num">3,205</td><td class="num">12,136</td></tr>
    <tr><td class="book">Twenty years after av Alexandre Dumas och Auguste Maquet <span class="muted">39708</span></td><td class="num">7,787</td><td class="num">106,487</td></tr>
    </tbody>
</table>
</div>

> **Observation** — Shakespeares *Complete Works* dominerar råa räkningar (förväntat). Ordförrådets rikedom varierar kraftigt mellan titlarna.

---

## Globala topp‑100 ord (enhetligt ordförråd)

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
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:right;">Rang</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">Ord</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:right;">Antal</th>
        </tr>
    </thead>
    <tbody>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">1</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">say</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">16,700</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">would</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">10,635</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">one</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">9,805</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">make</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">9,430</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">go</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">9,299</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">come</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">9,175</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">7</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">know</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">8,083</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">8</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">good</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">7,649</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">9</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">see</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">7,108</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">10</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">shall</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,913</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">11</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thou</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,794</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">12</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">take</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,635</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">13</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">think</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,372</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">14</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">like</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,281</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">15</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">could</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,141</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">16</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">give</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,083</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">17</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">well</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">6,061</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">18</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">man</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,761</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">19</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">upon</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,737</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">20</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">must</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,498</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">21</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">look</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,474</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">22</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">may</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,390</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">23</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">time</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,148</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">24</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">thy</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,908</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">25</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">much</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,800</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">26</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">tell</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,608</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">27</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">never</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,561</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">28</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">sir</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,555</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">29</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">little</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,552</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">30</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">great</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,544</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">31</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">love</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,429</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">32</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">let</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,346</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">33</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">find</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,085</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">34</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">u</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,002</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">35</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">lord</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,818</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">36</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">yet</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,735</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">37</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">first</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,675</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">38</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">king</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,578</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">39</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">hand</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,559</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">40</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">lady</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,458</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">41</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">get</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,421</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">42</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">day</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,416</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">43</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">seem</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,401</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">44</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">thee</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,386</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">45</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">hear</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,381</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">46</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">might</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,353</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">47</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">old</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,330</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">48</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">though</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,311</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">49</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">eye</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,309</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">50</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">enter</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,270</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">51</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">two</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,255</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">52</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">leave</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,234</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">53</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">thing</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,160</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">54</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">without</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,133</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">55</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">speak</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,117</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">56</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">even</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,998</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">57</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">young</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,987</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">58</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">friend</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,969</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">59</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">hath</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,903</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">60</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">life</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,818</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">61</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">call</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,807</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">62</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">long</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,764</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">63</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">work</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,761</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">64</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">every</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,744</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">65</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">way</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,717</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">66</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">heart</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,585</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">67</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">ever</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,548</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">68</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">word</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,524</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">69</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">poor</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,524</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">70</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">nothing</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,519</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">71</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">men</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,505</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">72</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">many</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,502</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">73</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">turn</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,493</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">74</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">dear</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,492</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">75</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">cry</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,475</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">76</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">father</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,470</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">77</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">away</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,469</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">78</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">part</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,436</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">79</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">mean</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,380</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">80</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">place</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,350</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">81</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">keep</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,348</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">82</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">mr</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,333</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">83</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">miss</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,314</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">84</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">still</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,305</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">85</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">ask</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,300</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">86</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">put</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,273</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">87</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">use</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,257</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">88</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">last</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,212</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">89</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">begin</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,157</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">90</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">stand</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,152</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">91</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">indeed</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,122</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">92</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">god</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,111</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">93</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">bring</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,092</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">94</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">woman</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,089</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">95</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">want</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,085</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">96</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">head</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,084</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">97</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">scene</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,068</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">98</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">house</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,066</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">99</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">mind</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,027</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">100</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">answer</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,025</td></tr>
    </tbody>
    </table>
</div>

---

## Implementationsdetaljer — varför dessa val?

- **Requests + BeautifulSoup + lxml**: lättviktigt och robust för HTML‑skrapning.  
- **Hänsyn & retries**: enkel takthållning, tolerant mot tillfälliga 5xx/429‑fel.  
- **Header/footer‑borttagning**: exakta markörer från Gutenbergs dokumentation; failsafe‑fallback.  
- **NLTK**: välanvänt; `preserve_line=True` undviker beroende av meningsmodeller (`punkt_tab`).  
- **Normalisering**: gemener, behåll alfabetiska token, POS‑medveten lemmatisering, borttagning av stopwords.

---

## Begränsningar & nästa steg

- Generisk lista över **stopwords**; för stilistik kan man behålla funktionsord i stället.  
- `isalpha()` tar bort avstavningar & siffror; anpassad tokenisering kan läggas till per uppgift.  
- **Obalans mellan böcker** (t.ex. *Complete Works of Shakespeare*) snedvrider räkningar → överväg per‑bok‑normalisering eller TF‑IDF.  
- Endast engelska i pipen; lägg till språkdetecktering för flerspråkiga korpusar.  
- Framtida arbete: visualiseringar (t.ex. diversitetskurvor), jämförelser per författare, kollokationer.

---

## Hur man citerar & licenser

- Texterna i public domain tillhandahålls av **Project Gutenberg**. Användningsvillkor: https://www.gutenberg.org/policy/permission.html  
- Kod & datapipeline: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg




---

## Bearbetningspipeline (som i föreläsningen)

Detta avsnitt följer trestegspipen som används i föreläsningsbilderna:
**(1) Datainsamling → (2) Datarensning → (3) Informationsutvinning & kodning**.
Jag implementerar varje steg med ett dedikerat skript och sparar mellanprodukter
för full reproducerbarhet.

---

### 1) Datainsamling
- **Mål i föreläsningen:** samla in textdata från olika källor.
- **Vad jag gör här:** crawlar Project Gutenbergs “Top 100 — Last 30 Days”, tar de
    första **k=20** böckerna, löser varje boks **Plain Text (UTF‑8)**‑länk och laddar ned
    de råa `.txt`‑filerna.
- **Skript / funktioner:** `crawl_and_download.py` → `fetch_top_page()`,
    `parse_last_30_days()`, `resolve_plaintext_url()`, `download_txt()`.
- **Utdata:**
    - Råtext: `data/raw/*.txt`
    - Index‑CSV med titlar, boksidors URL:er, TXT‑URL:er, lokala sökvägar:
    `outputs/top20_books.csv`
- **Kommando:**
    ```bash
    python crawl_and_download.py
    ```

### 2) Datarensning
- **Mål i föreläsningen:** ta bort boilerplate och normalisera innehållet.
- **Vad jag gör här:** tar bort Project Gutenbergs headers/footers med de officiella
    markörerna och behåller endast bokens kärninnehåll.
    - Startmarkör: `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - Slutmarkör:  `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
    Normalisera whitespace och säkerställ UTF‑8‑text.
- **Skript / funktioner:** `clean_and_vocab.py` → `read_text()`,
    `strip_gutenberg_header_footer(text)`.
- **Utdata:** rensad brödtext per bok i `data/clean/*.txt`
    (git‑ignorerat; kan återskapas).

### 3) Informationsutvinning & kodning
- **Mål i föreläsningen:** göra text till analyserbara språkliga enheter / features.
- **Vad jag gör här:** tokenisering → POS‑taggning → lemmatisering → borttagning av stopwords,
    och därefter bygger jag per‑bok‑ och globala statistik.
    - **Tokenisering:** `nltk.word_tokenize(text, preserve_line=True)`
    - **Normalisering:** gemener; behåll endast alfabetiska token (`str.isalpha()`).
    - **POS‑taggning:** `nltk.pos_tag(tokens)`
    - **Lemmatisering:** WordNet‑medveten; mappa POS till {n, v, a, r} före lemmatisering
    (`WordNetLemmatizer()`).
    - **Stopwords:** ta bort NLTK:s engelska stopwords.
    - **Aggregering:** räkna totala token & unika typer per bok; bygg ett **enhetligt
    ordförråd** över alla böcker och exportera **Top‑100**‑orden.
- **Skript / funktioner:** `clean_and_vocab.py` → `tokenize_and_lemmatize(text)`,
    `nltk_pos_to_wordnet_pos(tag)`, `accumulate_counts(tokens)`.
- **Utdata:**
    - `outputs/per_book_token_counts.csv` — per‑bok totala & unika typer
    - `outputs/top100_words.csv` — globala Top‑100 ord med frekvenser
- **Kommando:**
    ```bash
    python clean_and_vocab.py
    ```

---

### Varför dessa val (kort)
- **NLTK** ger pålitlig tokenisering, POS‑taggning och WordNet‑lemmatisering.
    Med `preserve_line=True` minskar beroendet av meningsmodeller och undviker
    `punkt_tab`‑problem; jag laddar ändå ned nödvändiga NLTK‑modeller vid första körning.
- **Header/footer‑borttagning** följer exakt Gutenbergs dokumenterade markörer för att
    undvika att licenstext räknas.
- **Alfabetiskt filter** (`isalpha()`) förenklar ordförrådet för denna uppgift;
    för andra uppgifter kan vi behålla avstavningar/siffror eller byta till en anpassad
    tokenizer.

### Reproducera end‑to‑end
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python crawl_and_download.py
python clean_and_vocab.py
python make_report.py
```

*Artefakter att kontrollera:*
- `outputs/top20_books.csv`
- `outputs/per_book_token_counts.csv`
- `outputs/top100_words.csv`
- Markdown‑rapport: `outputs/report.md`

## Zipfs lag (Top‑20 Gutenberg‑korpus)

Låt $p(r)$ vara den empiriska frekvensen för ordet på rang $r$ (antal token dividerat med totala antalet token). På log–log‑axlar förutspår Zipfs lag en potenslagavtagning:
$$
p(r;a)=\frac{r^{-a}}{\sum_{k=1}^{V} k^{-a}},\qquad r=1,\dots,V.
$$

**Metod.** Med de rensade token från topp‑20‑böckerna byggde jag en rang–frekvenstabell och plottade $p(r)$ mot $r$ i log–log‑skala. Jag överlagrade teoretiska Zipf‑kurvor $p(r)\propto r^{-a}$ för $a\in\{0.80,1.00,1.20\}$, och skattade $a$ med OLS på $(\log r,\ \log p(r))$ över rang $10$–$3000$ för att undvika artefakter i huvud/svans.

**Nyckelutdata**
- CSV: [`outputs/zipf_freqs.csv`](outputs/zipf_freqs.csv) — rang, ord, rått antal, normaliserad sannolikhet.
- Figurer:
  - Empirisk rang–frekvens:  
    <img src="/images/projects/project5/zipf_rank_freq.png" alt="Zipf empirisk rang–frekvens" width="720">
  - Empiri vs. Zipf‑överlagringar (med skattad lutning):  
    <img src="/images/projects/project5/zipf_overlay.png" alt="Zipf empiri vs modeller" width="720">
  - Artefakter (CSV och genererade figurer i repo):  
    <img src="/images/projects/project5/3.png" alt="VS Code‑vy av zipf_freqs.csv och utdatafigurer" width="880">

### Resultat

1. **Tung svans:** Det mest frekventa ordet (“say”) utgör ~1,1% av alla token; sannolikheterna faller snabbt med rang — en klassisk tungsvans‑signatur.
2. **Potenslagsregim:** Mittområdet (ungefär rang $10$–$3000$) är nära en rät linje i log–log‑rum $\rightarrow$ beteende enligt potenslag. Toppen är flatare (funktionsord / genremix), och längst ut böjer svansen ned (ändlig‑urvalseffekter).
3. **Bästa exponent:** Den skattade exponenten i mittområdet är **$a \approx 0.964$**, mycket nära den kanoniska Zipf‑nivån $1$. Modellen med $a=1{.}0$ följer data väl; $a=0{.}8$ är för grund och $a=1{.}2$ för brant.

**Slutsats:** Det enhetliga ordförrådet för topp‑20‑böckerna följer **Zipfs lag** med god approximation med exponent **$a\approx0.96$**. Avvikelser i huvud och svans är förväntade.
