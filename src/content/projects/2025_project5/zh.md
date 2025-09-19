---
title: "(Python) 来自古登堡计划的文本获取与处理"
date: 2025-09-17
tags: ["Python", "NLP", "Web Scraping", "NLTK", "Text Mining"]
excerpt: "一个 NLP 流水线：抓取古登堡计划最近 30 天下载榜的前 30 名，清洗文本，用 NLTK 进行分词与词形还原，并构建统一词表与 Top-100 词频表。"
---

> 我构建了一个 NLP 流水线：抓取古登堡计划最近 30 天**下载量最高的前 20 本**公共领域电子书，去除页眉页脚样板，进行分词与词形还原（lemmatize），并产出一个**统一词表**和**Top-100**词频列表。

来源列表（Gutenberg）：https://www.gutenberg.org/browse/scores/top-en.php

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

## 任务清单

> (a) 创建一个爬虫变体，用于下载古登堡计划最近 30 天下载量最高的前 k 本电子书的 `.TXT` 格式。  
> (b) 使用爬虫下载前 20 本（k=20）。报告书名与地址。  
> (c) 使用课堂讲述的处理流程，对下载的图书进行分词与词形还原。  
> (d) 从电子书构建一个统一词表；报告 Top-100 词。

---

## 概览

本项目从古登堡计划的“最近 30 天 Top 100”页面抓取**前 20**本 TXT 电子书，去掉 Gutenberg 的页眉/页脚，用 **NLTK** 做分词与词形还原，然后在所有书上汇总为一个**全局词表**。我同时发布**报告**与**代码**，以保证完全可复现。

- **代码仓库**: https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg  
- **生成的报告（Markdown）**: `outputs/report.md`  
- **关键产物**:  
    - `outputs/top20_books.csv` — 书名、书籍页面 URL、TXT URL、本地路径  
    - `outputs/per_book_token_counts.csv` — 每本书的总 token 与唯一 token 数  
    - `outputs/top100_words.csv` — 全局 Top-100 词及其频次

---

## 方法

### 1）爬取
- 解析“最近 30 天 Top 100”板块。
- 取**前 20**条书目并解析其**纯文本（UTF-8）**链接。
- 将原始 `.txt` 保存到 `data/raw/`，并写出 `outputs/top20_books.csv`。

### 2）清洗
- 使用以下标记移除古登堡的页眉/页脚：
    - `*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
- 仅保留这两个标记之间的正文内容。

### 3）分词与词形还原
- 使用 `nltk.word_tokenize(text, preserve_line=True)`；统一转小写；仅保留**字母**词元。
- 对词元做词性标注（POS）；映射到 WordNet 词性 {**n**, **v**, **a**, **r**}；用 `WordNetLemmatizer` 词形还原。
- 去除英语**停用词**。

### 4）词表与统计
- 在所有书上构建**全局 Counter**；导出**Top-100**（`outputs/top100_words.csv`）。
- 对每本书记录 `total_tokens` 和 `unique_tokens`（`outputs/per_book_token_counts.csv`）。

---

## 可复现性

```bash
# 1) 环境搭建
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 2) 爬取并下载前 20 本
python crawl_and_download.py

# 3) 清洗、分词、词形还原并聚合统计
python clean_and_vocab.py

# 4) 生成 Markdown 报告
python make_report.py
```

> **备注**
> - 该流水线会自动下载所需的 NLTK 数据。如遇 `punkt_tab` 查找错误：
>   ```bash
>   python -c "import nltk; [nltk.download(x) for x in ['punkt','punkt_tab','stopwords','wordnet','omw-1.4']]"
>   ```
> - `data/raw/` 与 `data/clean/` 已加入 git ignore 以保持仓库体积较小；可随时再生成。

---

## 最近 30 天 Top-20 图书

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

## 每本书的词元统计

<div class="table-wrap">
<table class="table-compact">
    <thead>
    <tr>
        <th>书名</th>
        <th style="text-align:right">唯一词元</th>
        <th style="text-align:right">总词元</th>
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

> **观察** — 莎士比亚《全集》在原始计数上占优（符合预期）。不同书目的词汇丰富度差异很大。

---

## 全局 Top-100 词（统一词表）

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
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:right;">排名</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:left;">词</th>
        <th style="border:1px solid #e5e7eb; padding:.55rem .65rem; background:#f8fafc; font-weight:600; white-space:nowrap; text-align:right;">计数</th>
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
        <tr><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">72</td><td style="border:1px solid; padding:.55rem .65rem;">many</td><td style="border:1px solid #e5e7eb; padding:.55rem .65rem; text-align:right;">2,502</td></tr>
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

## 实现细节 —— 为什么这样选？

- **Requests + BeautifulSoup + lxml**：轻量且稳定的 HTML 抓取组合。  
- **重试与礼貌性**：基础的限频，对瞬时 5xx/429 友好。  
- **页眉/页脚剥离**：严格按 Gutenberg 文档的标记；提供安全回退。  
- **NLTK**：广泛使用；`preserve_line=True` 避免对句子模型（`punkt_tab`）的依赖。  
- **标准化**：小写，仅字母词，基于 POS 的词形还原，停用词过滤。

---

## 局限与下一步

- 使用通用**停用词**列表；做风格学研究时可保留功能词。  
- `isalpha()` 会丢弃连字符与数字；可按任务切换到自定义分词。  
- **书目不平衡**（如《莎士比亚全集》）会拉偏计数 → 可考虑按书归一化或 TF-IDF。  
- 仅面向英文；可添加语言识别以处理多语言语料。  
- 后续：可视化（如多样性曲线）、按作者比较、搭配（collocations）。

---

## 如何引用与许可

- **Project Gutenberg** 提供的公共领域文本。使用条款：https://www.gutenberg.org/policy/permission.html  
- 代码与数据流水线：https://github.com/xiaosihuang003/Data-acquisition-and-processing-from-Gutenberg





---

## 处理流水线（与课堂一致）

本节遵循课件中的三阶段流程：**(1) 数据获取 → (2) 数据清洗 → (3) 信息抽取与编码**。我为每一阶段分别实现脚本，并持久化中间产物，确保可复现。

---

### 1）数据获取
- **课堂目标：** 从多源收集文本数据。
- **本项目做法：** 爬取古登堡计划“最近 30 天 Top 100”，取**k=20**本，解析每本的**纯文本（UTF-8）**链接并下载原始 `.txt`。
- **脚本 / 函数：** `crawl_and_download.py` → `fetch_top_page()`、
    `parse_last_30_days()`、`resolve_plaintext_url()`、`download_txt()`。
- **输出：**
    - 原始文本：`data/raw/*.txt`
    - 索引 CSV（书名、书籍页 URL、TXT URL、本地路径）：
    `outputs/top20_books.csv`
- **命令：**
    ```bash
    python crawl_and_download.py
    ```

### 2）数据清洗
- **课堂目标：** 去除样板并规范化内容。
- **本项目做法：** 按官方标记剥离 Project Gutenberg 页眉/页脚，仅保留正文：
    - 起始标记：`*** START OF THIS PROJECT GUTENBERG EBOOK ... ***`
    - 结束标记：  `*** END OF THIS PROJECT GUTENBERG EBOOK ... ***`
    归一化空白并确保 UTF-8。
- **脚本 / 函数：** `clean_and_vocab.py` → `read_text()`、
    `strip_gutenberg_header_footer(text)`。
- **输出：** 每本书清洗后的纯文本 `data/clean/*.txt`
    （已 git ignore，可再生成）。

### 3）信息抽取与编码
- **课堂目标：** 将文本转为可分析的语言单位 / 特征。
- **本项目做法：** 分词 → 词性标注 → 词形还原 → 停用词移除，再做逐书与全局统计。
    - **分词：** `nltk.word_tokenize(text, preserve_line=True)`
    - **规范化：** 小写；仅字母词（`str.isalpha()`）。
    - **词性标注：** `nltk.pos_tag(tokens)`
    - **词形还原：** 先将 POS 映射到 {n, v, a, r} 后再用
    `WordNetLemmatizer()`。
    - **停用词：** 删除 NLTK 英文停用词。
    - **聚合：** 统计每本书的总词与唯一词；构建**统一词表**并导出**Top-100**。
- **脚本 / 函数：** `clean_and_vocab.py` → `tokenize_and_lemmatize(text)`、
    `nltk_pos_to_wordnet_pos(tag)`、`accumulate_counts(tokens)`。
- **输出：**
    - `outputs/per_book_token_counts.csv` — 每书总量与唯一类型数
    - `outputs/top100_words.csv` — 全局 Top-100 及频次
- **命令：**
    ```bash
    python clean_and_vocab.py
    ```

---

### 选择说明（简）
- **NLTK** 提供稳定的分词、POS 与 WordNet 词形还原。
    使用 `preserve_line=True` 可降低对句子模型的依赖并避免
    `punkt_tab` 问题；首次运行仍会下载必要资源。
- **页眉/页脚剥离** 严格遵循 Gutenberg 文档，避免统计到许可文本。
- **仅字母过滤**（`isalpha()`）简化了本次作业的词表；若用于下游任务，可保留连字符/数字或改用自定义分词器。

### 端到端复现
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python crawl_and_download.py
python clean_and_vocab.py
python make_report.py
```

*可检查的产物：*
- `outputs/top20_books.csv`
- `outputs/per_book_token_counts.csv`
- `outputs/top100_words.csv`
- Markdown 报告：`outputs/report.md`

## 齐普夫定律（Top-20 Gutenberg 语料）

设 $p(r)$ 为排名为 $r$ 的词的经验频率（该词计数除以总词数）。在对数–对数坐标下，齐普夫定律预测幂律衰减：
$$
p(r;a)=\frac{r^{-a}}{\sum_{k=1}^{V} k^{-a}},\qquad r=1,\dots,V.
$$

**方法。** 基于 Top-20 书目的清洗词元，我构建了一个词频排名表，并在对数–对数坐标绘制 $p(r)$ 与 $r$。叠加三条理论齐普夫曲线 $p(r)\propto r^{-a}$，其中 $a\in\{0.80,1.00,1.20\}$，并在秩 $10$–$3000$ 上对 $(\log r,\ \log p(r))$ 做 OLS 拟合，以规避头/尾伪影。

**关键产物**
- CSV：[`outputs/zipf_freqs.csv`](outputs/zipf_freqs.csv) — 排名、词、原始计数、归一化概率。
- 图像：
  - 经验秩–频率：  
    <img src="/images/projects/project5/zipf_rank_freq.png" alt="Zipf empirical rank–frequency" width="720">
  - 经验 vs. 齐普夫叠加（含拟合斜率）：  
    <img src="/images/projects/project5/zipf_overlay.png" alt="Zipf empirical vs models" width="720">
  - 产物（CSV 与输出图像在仓库中）：  
    <img src="/images/projects/project5/3.png" alt="VS Code view of zipf_freqs.csv and output figures" width="880">

### 发现

1. **重尾:** 最频繁的词（“say”）约占全部词元的 ~1.1%；随排名迅速下降——典型重尾特征。
2. **幂律区段:** 中段（约秩 $10$–$3000$）在对数–对数坐标近似直线 → 幂律；最头部更平（功能词/体裁混合），远尾下弯（有限样本效应）。
3. **最佳指数:** 在中段拟合的指数为 **$a \approx 0.964$**，与经典的 $1$ 很接近。$a=1.0$ 模型与数据贴合；$a=0.8$ 偏浅、$a=1.2$ 偏陡。

**结论:** 该 Top-20 统一词表总体上较好地服从**齐普夫定律**，指数 **$a\approx0.96$**。头尾的偏差在预期之内。
