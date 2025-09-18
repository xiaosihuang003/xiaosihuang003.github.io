---
title: "(Python) Data acquisition and processing from Project Gutenberg"
date: 2025-09-17
tags: ["Python", "NLP", "Web Scraping", "NLTK", "Text Mining"]
excerpt: "A NLP pipeline: crawl the last-30-days top downloads on Project Gutenberg, clean texts, tokenize & lemmatize with NLTK, and build a unified vocabulary with a Top-100 frequency table."
---

> I built a NLP pipeline that crawls Project Gutenberg’s **Top-20** most downloaded public-domain ebooks (last 30 days), removes boilerplate, tokenizes & lemmatizes the texts, and produces a **unified vocabulary** with a **Top-100** frequency list.

Source list on Gutenberg: https://www.gutenberg.org/browse/scores/top-en.php

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

## Tasks list

> (a) Create a variant of the web crawler intended to download the top-k most downloaded ebooks of the last 30 days from Project Gutenberg in `.TXT` format.  
> (b) Using the crawler, download the top-20 ebooks (k=20). Report the names and addresses of the books.  
> (c) Use the processing pipeline described in the lecture to tokenize and lemmatize the downloaded books.  
> (d) Create a unified vocabulary from the ebooks; report the top-100 words.

---

## Overview

This project crawls the “Top 100 — Last 30 Days” list from Project Gutenberg, downloads the **top-20** TXT ebooks, cleans out Gutenberg headers/footers, tokenizes and lemmatizes with **NLTK**, and aggregates a **global vocabulary** across all books. I publish both the **report** and the **code** for full reproducibility.

- **Repo**: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg  
- **Generated report (Markdown)**: `outputs/report.md`  
- **Key outputs**:  
    - `outputs/top20_books.csv` — titles, book-page URLs, TXT URLs, local paths  
    - `outputs/per_book_token_counts.csv` — per-book total & unique token counts  
    - `outputs/top100_words.csv` — global Top-100 words with frequencies

---

## Methods

### 1) Crawling
- Parse the “Top 100 — Last 30 Days” section.
- Take the first **20** book entries and resolve their **Plain Text (UTF-8)** links.
- Save raw `.txt` files under `data/raw/` and write `outputs/top20_books.csv`.

### 2) Cleaning
- Remove Project Gutenberg boilerplate using markers:
    - `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
- Keep only the content between those markers.

### 3) Tokenization & Lemmatization
- `nltk.word_tokenize(text, preserve_line=True)`; lowercase; keep **alphabetic** tokens only.
- POS-tag tokens; map to WordNet POS {**n**, **v**, **a**, **r**}; lemmatize with `WordNetLemmatizer`.
- Remove English **stopwords**.

### 4) Vocabulary & Statistics
- Build a **global Counter** across all books; export **Top-100** (`outputs/top100_words.csv`).
- For each book, record `total_tokens` and `unique_tokens` (`outputs/per_book_token_counts.csv`).

---

## Reproducibility

```bash
# 1) Setup
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 2) Crawl & download top-20
python crawl_and_download.py

# 3) Clean, tokenize, lemmatize, and aggregate stats
python clean_and_vocab.py

# 4) Build the Markdown report
python make_report.py
```

> **Notes**
> - The pipeline auto-downloads required NLTK data. If you ever run into a `punkt_tab` lookup error:
>   ```bash
>   python -c "import nltk; [nltk.download(x) for x in ['punkt','punkt_tab','stopwords','wordnet','omw-1.4']]"
>   ```
> - `data/raw/` and `data/clean/` are git-ignored to keep the repo small; they can be re-generated.

---

## Top-20 Books (Last 30 Days)

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

## Token statistics per book

<div class="table-wrap">
<table class="table-compact">
    <thead>
    <tr>
        <th>Book</th>
        <th style="text-align:right">Unique&nbsp;Tokens</th>
        <th style="text-align:right">Total&nbsp;Tokens</th>
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

> **Observation** — Shakespeare’s *Complete Works* dominates raw counts (expected). Vocabulary richness varies widely across titles.

---

## Global Top-100 words (unified vocabulary)

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
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:right;">Rank</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">Word</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:right;">Count</th>
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
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">19</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">upon</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,737</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">20</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">must</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,498</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">21</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">look</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,474</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">22</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">may</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,390</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">23</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">time</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">5,148</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">24</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thy</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,908</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">25</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">much</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,800</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">26</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">tell</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,608</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">27</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">never</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,561</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">28</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">sir</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,555</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">29</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">little</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,552</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">30</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">great</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,544</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">31</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">love</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,429</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">32</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">let</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,346</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">33</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">find</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,085</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">34</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">u</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">4,002</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">35</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">lord</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,818</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">36</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">yet</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,735</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">37</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">first</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,675</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">38</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">king</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,578</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">39</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">hand</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,559</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">40</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">lady</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,458</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">41</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">get</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,421</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">42</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">day</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,416</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">43</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">seem</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,401</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">44</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thee</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,386</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">45</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">hear</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,381</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">46</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">might</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,353</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">47</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">old</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,330</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">48</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">though</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,311</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">49</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">eye</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,309</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">50</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">enter</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,270</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">51</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">two</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,255</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">52</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">leave</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,234</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">53</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thing</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,160</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">54</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">without</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,133</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">55</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">speak</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">3,117</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">56</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">even</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,998</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">57</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">young</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,987</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">58</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">friend</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,969</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">59</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">hath</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,903</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">60</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">life</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,818</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">61</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">call</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,807</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">62</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">long</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,764</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">63</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">work</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,761</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">64</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">every</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,744</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">65</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">way</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,717</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">66</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">heart</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,585</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">67</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">ever</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,548</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">68</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">word</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,524</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">69</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">poor</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,524</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">70</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">nothing</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,519</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">71</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">men</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,505</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">72</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">many</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,502</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">73</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">turn</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,493</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">74</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">dear</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,492</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">75</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">cry</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,475</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">76</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">father</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,470</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">77</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">away</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,469</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">78</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">part</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,436</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">79</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">mean</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,380</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">80</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">place</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,350</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">81</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">keep</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,348</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">82</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">mr</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,333</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">83</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">miss</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,314</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">84</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">still</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,305</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">85</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">ask</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,300</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">86</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">put</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,273</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">87</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">use</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,257</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">88</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">last</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,212</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">89</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">begin</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,157</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">90</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">stand</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,152</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">91</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">indeed</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,122</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">92</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">god</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,111</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">93</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">bring</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,092</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">94</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">woman</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,089</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">95</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">want</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,085</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">96</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">head</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,084</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">97</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">scene</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,068</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">98</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">house</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,066</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">99</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">mind</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,027</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">100</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">answer</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,025</td></tr>
    </tbody>
    </table>
</div>


---

## Implementation details — why these choices?

- **Requests + BeautifulSoup + lxml**: lightweight and robust for HTML scraping.  
- **Retry & politeness**: basic rate limiting, tolerant of transient 5xx/429 errors.  
- **Header/footer stripping**: exact markers from Gutenberg documentation; fail-safe fallback.  
- **NLTK**: widely used; `preserve_line=True` avoids sentence-model dependency (`punkt_tab`).  
- **Normalization**: lowercase, keep alphabetic tokens, POS-aware lemmatization, stopword removal.

---

## Limitations & next steps

- Generic **stopword** list; for stylistics you may keep function words instead.  
- `isalpha()` drops hyphenations & numerals; custom tokenization can be added per task.  
- **Book imbalance** (e.g., *Complete Works of Shakespeare*) skews counts → consider per-book normalization or TF-IDF.  
- English-only pipeline; add language detection for multilingual corpora.  
- Future work: visualizations (e.g., diversity curves), per-author comparisons, collocations.

---

## How to cite & license

- Public-domain texts courtesy of **Project Gutenberg**. Terms of use: https://www.gutenberg.org/policy/permission.html  
- Code & data pipeline: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg




---

## Processing pipeline (as in the lecture)

This section follows the three-stage pipeline used in the lecture slides:
**(1) Data acquisition → (2) Data cleanup → (3) Information extraction & encoding**.
I implement each stage with a dedicated script and persist intermediate artifacts
for full reproducibility.

---

### 1) Data acquisition
- **Goal in lecture:** collect text data from diverse sources.
- **What I do here:** crawl Project Gutenberg’s “Top 100 — Last 30 Days”, take the
    first **k=20** books, resolve each book’s **Plain Text (UTF-8)** link, and download
    the raw `.txt` files.
- **Script / functions:** `crawl_and_download.py` → `fetch_top_page()`,
    `parse_last_30_days()`, `resolve_plaintext_url()`, `download_txt()`.
- **Outputs:**
    - Raw texts: `data/raw/*.txt`
    - Index CSV with titles, book-page URLs, TXT URLs, local paths:
    `outputs/top20_books.csv`
- **Command:**
    ```bash
    python crawl_and_download.py
    ```

### 2) Data cleanup
- **Goal in lecture:** remove boilerplate and normalize the content.
- **What I do here:** strip Project Gutenberg headers/footers using the official
    markers and keep only the core book content.
    - Start marker: `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - End marker:   `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
    Normalize whitespace and ensure UTF-8 text.
- **Script / functions:** `clean_and_vocab.py` → `read_text()`,
    `strip_gutenberg_header_footer(text)`.
- **Outputs:** cleaned plain text per book in `data/clean/*.txt`
    (git-ignored; re-generable).

### 3) Information extraction & encoding
- **Goal in lecture:** turn text into analysable linguistic units / features.
- **What I do here:** tokenization → POS tagging → lemmatization → stopword removal,
    then build per-book and global statistics.
    - **Tokenization:** `nltk.word_tokenize(text, preserve_line=True)`
    - **Normalization:** lowercase; keep alphabetic tokens only (`str.isalpha()`).
    - **POS tagging:** `nltk.pos_tag(tokens)`
    - **Lemmatization:** WordNet-aware; map POS to {n, v, a, r} before lemmatizing
    (`WordNetLemmatizer()`).
    - **Stopwords:** remove NLTK English stopwords.
    - **Aggregation:** count total tokens & unique tokens per book; build a **unified
    vocabulary** across all books and export the **Top-100** words.
- **Script / functions:** `clean_and_vocab.py` → `tokenize_and_lemmatize(text)`,
    `nltk_pos_to_wordnet_pos(tag)`, `accumulate_counts(tokens)`.
- **Outputs:**
    - `outputs/per_book_token_counts.csv` — per-book totals & unique types
    - `outputs/top100_words.csv` — global Top-100 words with frequencies
- **Command:**
    ```bash
    python clean_and_vocab.py
    ```

---

### Why these choices (brief)
- **NLTK** provides reliable tokenization, POS tagging and WordNet lemmatization.
    Using `preserve_line=True` reduces dependency on sentence models and avoids
    `punkt_tab` issues; I still download the necessary NLTK models on first run.
- **Header/footer stripping** exactly follows Gutenberg’s documented markers to
    avoid counting license text.
- **Alphabetic filter** (`isalpha()`) simplifies the vocabulary for this assignment;
    for downstream tasks we could keep hyphenations/numerals or switch to a custom
    tokenizer.

### Reproduce end-to-end
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python crawl_and_download.py
python clean_and_vocab.py
python make_report.py
```

*Artifacts to check:*
- `outputs/top20_books.csv`
- `outputs/per_book_token_counts.csv`
- `outputs/top100_words.csv`
- Markdown report: `outputs/report.md`

## Zipf’s law (Top-20 Gutenberg corpus)

Let $p(r)$ be the empirical frequency of the word at rank $r$ (token count divided by the total number of tokens). On log–log axes, Zipf’s law predicts a power-law decay:
$$
p(r;a)=\frac{r^{-a}}{\sum_{k=1}^{V} k^{-a}},\qquad r=1,\dots,V.
$$

**Method.** Using the cleaned tokens from the Top-20 books, I built a rank–frequency table and plotted $p(r)$ vs. $r$ on log–log axes. I overlaid theoretical Zipf curves $p(r)\propto r^{-a}$ for $a\in\{0.80,1.00,1.20\}$, and fitted $a$ by OLS on $(\log r,\ \log p(r))$ over ranks $10$–$3000$ to avoid head/tail artifacts.

**Key outputs**
- CSV: [`outputs/zipf_freqs.csv`](outputs/zipf_freqs.csv) — rank, word, raw count, normalized probability.
- Figures:
  - Empirical rank–frequency:  
    <img src="/images/projects/project5/zipf_rank_freq.png" alt="Zipf empirical rank–frequency" width="720">
  - Empirical vs. Zipf overlays (with fitted slope):  
    <img src="/images/projects/project5/zipf_overlay.png" alt="Zipf empirical vs models" width="720">
  - Artifacts (CSV and generated figures in repo):  
    <img src="/images/projects/project5/3.png" alt="VS Code view of zipf_freqs.csv and output figures" width="880">

### Findings

1. **Heavy tail.** The most frequent word (“say”) takes ~1.1% of all tokens; probabilities drop rapidly with rank — a classic heavy-tail signature.
2. **Power-law regime.** The mid-range (roughly ranks $10$–$3000$) is close to a straight line in log–log space $\rightarrow$ power-law behavior. The very top is flatter (function words / genre mixing), and the far tail bends down (finite-sample effects).
3. **Best exponent.** The fitted exponent on the mid-range is **$a \approx 0.964$**, very close to the canonical Zipf value $1$. The model with $a=1.0$ tracks the data closely; $a=0.8$ is too shallow and $a=1.2$ too steep.

**Conclusion.** The unified vocabulary of the Top-20 books follows **Zipf’s law** to a good approximation with exponent **$a\approx0.96$**. Deviations at the head and tail are expected.
