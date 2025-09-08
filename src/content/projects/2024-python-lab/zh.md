---
title: "Python 实验室：以构建来学习"
date: 2025-08-18
excerpt: >
  一组动手实践的 Python 小型项目，旨在通过实际实现
  来强化核心编程技能。
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
    alt="Python Lab - 动手实践的 Python 小项目概览"
    class="project-hero__img"
  />
  <figcaption class="project-hero__cap">
    图片：Python Lab — 一组小巧、专注的 Python 项目集合
  </figcaption>
</figure>

<!-- ===== CTA Buttons ===== -->
<div style="text-align:center; margin:24px 0 44px 0;">
  <a href="https://xiaosihuang003.github.io/python-lab/" target="_blank"
     style="display:inline-block; margin:6px; padding:12px 22px; border:1px solid #d2d2d7; border-radius:12px; text-decoration:none; color:#0070c9;">
     在线文档 (演示)
  </a>
  <a href="https://github.com/xiaosihuang003/python-lab" target="_blank"
     style="display:inline-block; margin:6px; padding:12px 22px; border:1px solid #d2d2d7; border-radius:12px; text-decoration:none; color:#0070c9;">
     GitHub 仓库
  </a>
</div>

---

## 这是什么？

Python Lab 是一个不断扩展的小型 Python 项目集合。每个项目都保持独立和简洁，你可以快速阅读、克隆和运行。目标是练习编程基础（数据类型、循环、函数、命令行工具），并逐渐过渡到实际工具（清洗 CSV/Excel、快速 EDA 助手等）。

---

## 为什么做这个项目？

与其依赖庞大的框架，本实验室更强调清晰、一致和可重复的模式，这些代码可以在许多小任务中反复使用。

---

## 包含内容

- 词/行计数器与快速计算器（命令行练习）  
- 字符串处理片段（切片、分析、标准化）  
- 列表和字典操作（过滤与转换）  
- CSV/Excel 数据处理小助手  
- 展示流程控制的简短练习（break/continue, loop-else）
