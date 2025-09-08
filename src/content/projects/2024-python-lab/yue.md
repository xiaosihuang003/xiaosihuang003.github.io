---
title: "Python 實驗室：邊做邊學"
date: 2025-08-18
excerpt: >
  一系列動手實踐嘅 Python 細項目，用實際操作嚟加強
  基本編程技能。
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
    alt="Python Lab - 動手實踐嘅 Python 細項目概覽"
    class="project-hero__img"
  />
  <figcaption class="project-hero__cap">
    圖片：Python Lab — 一系列細細個、專注嘅 Python 項目
  </figcaption>
</figure>

<!-- ===== CTA Buttons ===== -->
<div style="text-align:center; margin:24px 0 44px 0;">
  <a href="https://xiaosihuang003.github.io/python-lab/" target="_blank"
     style="display:inline-block; margin:6px; padding:12px 22px; border:1px solid #d2d2d7; border-radius:12px; text-decoration:none; color:#0070c9;">
     在線文檔 (Demo)
  </a>
  <a href="https://github.com/xiaosihuang003/python-lab" target="_blank"
     style="display:inline-block; margin:6px; padding:12px 22px; border:1px solid #d2d2d7; border-radius:12px; text-decoration:none; color:#0070c9;">
     GitHub 倉庫
  </a>
</div>

---

## 係咩嚟？

Python Lab 係一個持續增長嘅細 Python 項目合集。每個項目都保持獨立同簡單，你可以好快咁讀、clone 同執行。目標係練習基本功（數據類型、loop、函數、命令行工具），再慢慢過渡到實際小工具（清洗 CSV/Excel、快速 EDA 幫手等等）。

---

## 點解要做呢個項目？

呢個項目唔靠大框架，而係著重清晰、統一同易於重用嘅寫法，啲代碼可以喺唔同細任務度反覆用到。

---

## 有乜嘢內容

- 字/行計數器同快速計算器（命令行練習）  
- 字符串處理（切片、分析、標準化）  
- List 同 dictionary 操作（過濾、轉換）  
- 幫手處理 CSV/Excel 數據嘅小工具  
- 示範流程控制嘅短練習（break/continue, loop-else）
