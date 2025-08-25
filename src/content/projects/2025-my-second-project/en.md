---
title: "My Second Project"
date: 2025-09-01
excerpt: >
  A tiny demo project to verify the multi-language project list and detail pages.
tags: ["Demo", "Template"]
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
  <img src="/images/projects/2025-my-second-project.png" alt="My Second Project" class="project-hero__img" />
  <figcaption class="project-hero__cap">My Second Project — placeholder hero image.</figcaption>
</figure>

## What is it?
A small placeholder project used to test the project list, routing, and i18n fallback.

## What’s included
- Minimal text sections (intro, list, how to run)
- A hero image slot
- Tags, date, and excerpt for the card

## How to run
```bash
echo "Hello from project 2"

