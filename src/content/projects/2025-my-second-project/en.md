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

# Setting Up and Verifying a Python/Jupyter Environment with Anaconda

This guide explains how to set up a **dedicated Python environment** using Anaconda, install Jupyter, and verify that everything is working correctly.  

---

## 1. Install/Update Anaconda
- Download from: [https://docs.anaconda.com/anaconda/install/](https://docs.anaconda.com/anaconda/install/)  
- Update conda (optional but recommended):

```bash
conda update -n base -c defaults conda
```

---

## 2. Create and Activate a New Environment

```bash
# Create a new environment named "dataml100"
conda create --name dataml100

# Activate the environment
conda activate dataml100
```

---

## 3. Install Python 3.12

```bash
conda install python=3.12
```

---

## 4. Install Jupyter

```bash
conda install anaconda::jupyter
```

---

## 5. Verify the Environment Setup

### Check Python version
```bash
python --version
```
Expected output:
```
Python 3.12.x
```

### Check Jupyter installation
```bash
jupyter --version
```
You should see versions of `notebook`, `jupyterlab`, etc.

### Confirm executables come from the right environment
```bash
which python
which jupyter
```
Both paths should point to:
```
/opt/anaconda3/envs/dataml100/...
```

---

## 6. Launch JupyterLab / Notebook

```bash
jupyter lab
# or
jupyter notebook
```

This will open Jupyter in your browser at `localhost:8888`.

---

## 7. Verify Inside Jupyter

In a new notebook, run:

```python
import sys
print(sys.executable)
print(sys.version)
```

Expected output:
```
/opt/anaconda3/envs/dataml100/bin/python
3.12.x
```

This confirms that Jupyter is using the correct environment (`dataml100`) with Python 3.12.

---

## 8. Daily Workflow

```bash
# 1. Open terminal
# 2. Activate the environment
conda activate dataml100

# 3. Launch Jupyter
jupyter lab   # or jupyter notebook

# 4. Work on your notebooks

# 5. When finished
conda deactivate
```

---

✅ **At this point, your setup is complete.**  
You have an isolated environment with Python 3.12 + Jupyter, and you know how to check it step by step.

