---
title: "(Python) 從古登堡計劃獲取與處理數據"
date: 2025-09-17
tags: ["Python", "NLP", "Web Scraping", "NLTK", "Text Mining"]
excerpt: "一條 NLP 流水線：抓取古登堡計劃最近 30 日下載榜，清理文本，用 NLTK 做分詞同詞形還原，並建立統一詞彙表同 Top-100 詞頻表。"
---

> 我搭建咗一條 NLP 流水線：會抓取古登堡計劃最近 30 日**下載量最高嘅前 20 本**公共領域電子書，去除樣板（boilerplate），對文本做分詞同詞形還原（lemmatize），最後產出**統一詞彙表**同**Top-100**詞頻清單。

來源清單（Gutenberg）：https://www.gutenberg.org/browse/scores/top-en.php

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

## 任務清單

> (a) 建一個爬蟲變體，用嚟下載古登堡計劃最近 30 日下載量最高嘅前 k 本電子書嘅 `.TXT` 格式。  
> (b) 用呢個爬蟲下載前 20 本（k=20）。報告書名同地址。  
> (c) 按課堂講嘅處理流程，對下載嘅圖書做分詞同詞形還原。  
> (d) 由電子書建立一個統一詞彙表；報告 Top-100 詞。

---

## 概覽

呢個項目會喺古登堡計劃嘅“最近 30 日 Top 100”清單入面抓取**前 20**本 TXT 電子書，刪走 Gutenberg 嘅頁眉/頁腳，之後用 **NLTK** 做分詞同詞形還原，再喺全部書上面匯總出**全局詞彙表**。我同時發佈**報告**同**代碼**，方便完全復現。

- **倉庫**: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg  
- **生成報告（Markdown）**: `outputs/report.md`  
- **關鍵產物**:  
    - `outputs/top20_books.csv` — 書名、書籍頁面 URL、TXT URL、本地路徑  
    - `outputs/per_book_token_counts.csv` — 每本書嘅總 token 同唯一 token 數  
    - `outputs/top100_words.csv` — 全局 Top-100 詞及頻次

---

## 方法

### 1) 爬取
- 解析“最近 30 日 Top 100”部分。
- 攞**前 20**個書目項，並解析佢哋嘅**純文本（UTF-8）**鏈接。
- 將原始 `.txt` 存落 `data/raw/`，同寫出 `outputs/top20_books.csv`。

### 2) 清理
- 用以下標記移除古登堡樣板：
    - `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
- 只保留兩個標記之間嘅正文內容。

### 3) 分詞與詞形還原
- 用 `nltk.word_tokenize(text, preserve_line=True)`；全部轉小寫；淨係保留**字母**詞元。
- 做詞性標註（POS）；映射到 WordNet 詞性 {**n**, **v**, **a**, **r**}；用 `WordNetLemmatizer` 做詞形還原。
- 去除英文**停用詞**。

### 4) 詞彙同統計
- 喺所有書上面建立**全局 Counter**；匯出**Top-100**（`outputs/top100_words.csv`）。
- 每本書記錄 `total_tokens` 同 `unique_tokens`（`outputs/per_book_token_counts.csv`）。

---

## 可復現

```bash
# 1) 環境
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 2) 抓取並下載前 20 本
python crawl_and_download.py

# 3) 清理、分詞、詞形還原、聚合統計
python clean_and_vocab.py

# 4) 生成 Markdown 報告
python make_report.py
```

> **備註**
> - 流水線會自動下載所需 NLTK 數據。如果遇到 `punkt_tab` 查找錯：
>   ```bash
>   python -c "import nltk; [nltk.download(x) for x in ['punkt','punkt_tab','stopwords','wordnet','omw-1.4']]"
>   ```
> - `data/raw/` 同 `data/clean/` 已經被 git ignore，為咗保持倉庫細；可以隨時再生成。

---

## 最近 30 日 Top-20 圖書

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

## 每本書嘅詞元統計

<div class="table-wrap">
<table class="table-compact">
    <thead>
    <tr>
        <th>書</th>
        <th style="text-align:right">唯一&nbsp;Tokens</th>
        <th style="text-align:right">總&nbsp;Tokens</th>
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

> **觀察** — 莎士比亞《全集》喺原始計數上佔優（合理）。唔同書嘅詞彙豐富度差異好大。

---

## 全局 Top-100 詞（統一詞彙表）

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
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">排名</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">詞</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">計數</th>
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
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">47</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">old</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,330</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">48</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">though</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,311</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">49</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">eye</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,309</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">50</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">enter</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,270</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">51</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">two</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,255</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">52</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">leave</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,234</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">53</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">thing</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,160</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">54</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">without</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,133</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">55</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">speak</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">3,117</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">56</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">even</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,998</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">57</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">young</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,987</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">58</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">friend</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,969</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">59</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">hath</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,903</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">60</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">life</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,818</td></tr>
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">61</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem;">call</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:left;">2,807</td></tr>
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

## 實現細節 — 點解咁揀？

- **Requests + BeautifulSoup + lxml**：輕量又穩陣嘅 HTML 抓取組合。  
- **重試同禮貌性**：基本限流，對瞬時 5xx/429 友好。  
- **頁眉/頁腳剝離**：完全依照 Gutenberg 文檔標記；有保底回退。  
- **NLTK**：常用；`preserve_line=True` 可避開對句子模型（`punkt_tab`）嘅依賴。  
- **規範化**：小寫、只保留字母詞、POS 感知嘅詞形還原、停用詞移除。

---

## 侷限與下一步

- 用咗通用**停用詞**清單；如果做文體，可能要保留功能詞。  
- `isalpha()` 會丟棄連字號同數字；可以按任務改用自定義分詞。  
- **書目不均衡**（例如《莎士比亞全集》）會拉歪計數 → 可考慮按書歸一化或 TF-IDF。  
- 目前淨係英文；可加語言檢測以處理多語料。  
- 未來：可視化（好似多樣性曲線）、按作者比較、搭配關係。

---

## 引用與許可

- 公共領域文本由 **Project Gutenberg** 提供。使用條款：https://www.gutenberg.org/policy/permission.html  
- 代碼與數據流水線：https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg




---

## 處理流水線（同課堂一樣）

呢一節跟住課件嗰三階段流程：**(1) Data acquisition → (2) Data cleanup → (3) Information extraction & encoding**。我為每個階段都寫咗專用腳本，並將中間產物落碟，方便復現。

---

### 1) Data acquisition
- **課堂目標：** 由多個來源收集文本數據。
- **我喺度做：** 爬古登堡計劃嘅“最近 30 日 Top 100”，攞**k=20**本，解析每本嘅**純文本（UTF-8）**鏈接，並下載原始 `.txt` 文件。
- **腳本 / 函數：** `crawl_and_download.py` → `fetch_top_page()`、
    `parse_last_30_days()`、`resolve_plaintext_url()`、`download_txt()`。
- **輸出：**
    - 原始文本：`data/raw/*.txt`
    - 索引 CSV（書名、書籍頁 URL、TXT URL、本地路徑）：
    `outputs/top20_books.csv`
- **命令：**
    ```bash
    python crawl_and_download.py
    ```

### 2) Data cleanup
- **課堂目標：** 去除樣板同做規範化。
- **我喺度做：** 按官方標記刪走 Project Gutenberg 嘅頁眉/頁腳，只保留正文：
    - 起始標記：`*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - 結束標記：  `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
    同步做空白歸一化，確保 UTF-8 文本。
- **腳本 / 函數：** `clean_and_vocab.py` → `read_text()`、
    `strip_gutenberg_header_footer(text)`。
- **輸出：** 每本書清理後嘅純文本 `data/clean/*.txt`
    （git ignore，隨時可重建）。

### 3) Information extraction & encoding
- **課堂目標：** 將文本變成可分析嘅語言單位 / 特徵。
- **我喺度做：** 分詞 → 詞性標註 → 詞形還原 → 停用詞去除，之後做逐書同全局統計。
    - **Tokenization：** `nltk.word_tokenize(text, preserve_line=True)`
    - **Normalization：** 小寫；只保留字母詞（`str.isalpha()`）。
    - **POS 標註：** `nltk.pos_tag(tokens)`
    - **Lemmatization：** 先將 POS 映射到 {n, v, a, r}，再用 `WordNetLemmatizer()`。
    - **停用詞：** 刪走 NLTK 英文停用詞。
    - **聚合：** 統計每本書嘅總詞同唯一詞；建立**統一詞彙表**並匯出**Top-100**。
- **腳本 / 函數：** `clean_and_vocab.py` → `tokenize_and_lemmatize(text)`、
    `nltk_pos_to_wordnet_pos(tag)`、`accumulate_counts(tokens)`。
- **輸出：**
    - `outputs/per_book_token_counts.csv` — 每書總量同唯一類型數
    - `outputs/top100_words.csv` — 全局 Top-100 詞同頻次
- **命令：**
    ```bash
    python clean_and_vocab.py
    ```

---

### 點解咁揀（簡）
- **NLTK** 提供穩定嘅分詞、POS 同 WordNet 詞形還原。
    用 `preserve_line=True` 可以減少對句子模型嘅依賴，避免 `punkt_tab` 問題；首次運行仍會下載必要資源。
- **頁眉/頁腳剝離** 嚴格跟住 Gutenberg 文檔，避免誤計授權文字。
- **只保留字母**（`isalpha()`）令呢次作業嘅詞表更簡潔；如果做下游任務，可以保留連字符/數字或者換自定義分詞器。

### 端到端復現
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python crawl_and_download.py
python clean_and_vocab.py
python make_report.py
```

*可檢查嘅產物：*
- `outputs/top20_books.csv`
- `outputs/per_book_token_counts.csv`
- `outputs/top100_words.csv`
- Markdown 報告：`outputs/report.md`

## 齊普夫定律（Top-20 Gutenberg 語料）

令 $p(r)$ 係排名為 $r$ 嘅詞嘅經驗頻率（該詞計數除以總詞數）。喺對數–對數坐標下，齊普夫定律預測幂律衰減：
$$
p(r;a)=\frac{r^{-a}}{\sum_{k=1}^{V} k^{-a}},\qquad r=1,\dots,V.
$$

**方法。** 用 Top-20 書嘅清理後詞元，我起咗一個秩–頻率表，並喺對數–對數坐標畫 $p(r)$ 對 $r$。再疊加理論齊普夫曲線 $p(r)\propto r^{-a}$，其中 $a\in\{0.80,1.00,1.20\}$，並喺秩 $10$–$3000$ 區間對 $(\log r,\ \log p(r))$ 做 OLS 擬合，避開頭/尾偽影。

**關鍵產物**
- CSV：[`outputs/zipf_freqs.csv`](outputs/zipf_freqs.csv) — 秩、詞、原始計數、歸一化概率。
- 圖：
  - 經驗秩–頻率：  
    <img src="/images/projects/project5/zipf_rank_freq.png" alt="Zipf empirical rank–frequency" width="720">
  - 經驗 vs. 齊普夫（連擬合斜率）：  
    <img src="/images/projects/project5/zipf_overlay.png" alt="Zipf empirical vs models" width="720">
  - 產物（CSV 同輸出圖喺倉庫）：  
    <img src="/images/projects/project5/3.png" alt="VS Code view of zipf_freqs.csv and output figures" width="880">

### 發現

1. **重尾。** 最常見嘅詞（“say”）大概佔全部詞元嘅 ~1.1%；概率隨秩快速下降——典型重尾特徵。  
2. **幂律區。** 中段（大概秩 $10$–$3000$）喺 log–log 空間接近直線 → 幂律行為；最頭部較平（功能詞/體裁混合），最尾會向下彎（有限樣本效應）。  
3. **最佳指數。** 中段擬合得到指數 **$a \approx 0.964$**，好接近經典嘅 $1$。$a=1.0$ 模型貼近數據；$a=0.8$ 偏淺、$a=1.2$ 偏陡。

**結論。** 前 20 本書整合嘅統一詞彙表基本符合**齊普夫定律**，指數 **$a\approx0.96$**。頭部同尾部出現偏差喺預期之內。
