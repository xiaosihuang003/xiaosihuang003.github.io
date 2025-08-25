---
title: "我的第二个项目"
date: 2025-09-01
excerpt: >
  一个很小的演示项目，用来验证多语言的项目列表与详情页渲染。
tags: ["演示", "模板"]
draft: false
---

<style>
.post-body{ --p-size:1.06rem; --h2-size:1.18rem; --h3-size:1.06rem; --p-leading:1.85; }
.post-body hr{ border:0; border-top:1px solid #e5e5e5; margin:24px 0; }
.project-hero{ width:100%; margin:2rem auto; text-align:center; }
.project-hero__img{ width:100%; height:auto; display:block; margin:0 auto; border-radius:8px; box-shadow:0 4px 20px rgba(0,0,0,.12); }
.project-hero__cap{ margin-top:12px; font-size:.95em; color:#6e6e73; }
@media (min-width:1024px){ .project-hero__img{ max-width:1280px; } }
</style>

<figure class="project-hero">
  <img src="/images/projects/2025-my-second-project.png" alt="我的第二个项目" class="project-hero__img" />
  <figcaption class="project-hero__cap">我的第二个项目 —— 占位的主图说明。</figcaption>
</figure>

## 这是啥？
一个占位项目，用来测试项目列表、路由以及 i18n 回退逻辑。

## 包含什么
- 最小文本段落（简介、清单、运行）
- Hero 图片位
- 卡片所需的标签、日期、摘要

## 如何运行
```bash
echo "你好，项目 2"
