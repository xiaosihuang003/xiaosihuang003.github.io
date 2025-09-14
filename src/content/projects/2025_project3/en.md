---
title: "(Databricks) Fashion-MNIST: k-NN Baseline + PCA Speedups"
date: 2025-09-13
tags: ["machine-learning","databricks","knn","pca"]
excerpt: "A simple, transparent image-classification baseline and a practical speed-vs-accuracy study."
---

<style>
/* Scoped to this page */
.proj { line-height: 1.65; }
.proj h2, .proj h3 { margin-top: 2rem; }
.proj .spacer { height: 10px; }
.proj .table-wrap { overflow-x: auto; }
.proj .table-wrap table { min-width: 520px; border-collapse: collapse; }
.proj table th, .proj table td { padding: 6px 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
.proj .btn { display:inline-block; padding:6px 10px; border:1px solid currentColor; border-radius:8px; text-decoration:none; }
.proj .btn:hover { background: rgba(0,0,0,0.05); }
</style>

<div class="proj">

### What I built ?
A simple image classifier that recognizes clothing items by finding the most similar training images (k-Nearest Neighbors), plus a speed-up step (PCA) that keeps accuracy while cutting runtime by about 2.3×.

---

## Why this matters ?
- You need a trustworthy baseline before trying complex models.  
- k-NN is transparent (no training): “find the closest images and copy their label.”  
- PCA compresses images into fewer informative numbers so search runs faster.

---

## Data & setup
- Dataset: Fashion-MNIST (60k train / 10k test, 28×28 grayscale, 10 classes)  
- Goal: predict the clothing category of each test image  
- Metric: accuracy  
- Platform: Databricks Community Edition (Python, NumPy, scikit-learn, MLflow)

<div class="spacer"></div>
<a class="btn" href="https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/1262134940925609/2502558802654417/3858847372272760/latest.html" target="_blank" rel="noreferrer">View notebook</a>

> Note: Databricks “Publish” links expire after 6 months. Keep a static HTML copy in your repo for long-term access.

---

## How it works ?
1) Flatten each 28×28 image into 784 numbers and scale to [0,1].  
2) k-NN (L2 distance): for a new image, find the k most similar training images; vote their labels.  
3) PCA (optional): reduce 784 → 50/100/200 to speed up search with minimal accuracy change.  
4) Batching: compute distances in chunks to save memory.  
5) Tracking: use MLflow to log parameters (k, PCA-d), accuracy, and artifacts.

---
<br />

## Results at a glance
- How good is ~85%? Random guessing is 10% (10 classes). A small CNN can reach 90%+.  
  This baseline is simple and transparent, and sets a solid starting point.

<br />

### k-NN (no PCA, 784D)

| k | Accuracy |
|:-:|:-------:|
| 1 | 0.8497 |
| 3 | 0.8541 |
| 5 | 0.8554 |

<br />

### PCA + 1-NN (end-to-end time)  
*Total time = PCA (fit+transform) + 1-NN search.*

<div class="table-wrap">

| Method              | Accuracy | Total time |
|---------------------|:-------:|:----------:|
| RAW 1-NN (784D)     | 0.8497  | 22.11s     |
| PCA-50 + 1-NN       | 0.8423  | 8.46s      |
| PCA-100 + 1-NN      | 0.8491  | 9.52s      |
| PCA-200 + 1-NN      | 0.8522  | 14.86s     |

</div>

<br />

**Key takeaways**
- PCA-100 gives nearly the same accuracy as raw 784D but ~2.3× faster (22.1s → 9.5s).  
- PCA-200 yields a tiny accuracy gain at additional cost.  
- Choosing k=3/5 (majority vote) improves stability and accuracy.

<br />

---

## Databricks demo
Confusion matrix (k=5) — darker diagonal is better; off-diagonal cells show common confusions (T-shirt/top vs Shirt, Coat vs Pullover).

![Confusion matrix for Fashion-MNIST, k=5](/images/projects/project3/1.png)

---

## Summary
- Memory-safe batching for pairwise distances (avoid a 10k×60k full matrix).  
- PCA pipeline with randomized SVD; end-to-end timing.  
- MLflow experiment tracking (k, PCA-d, metrics, artifacts).

## Limitations & next steps
- k-NN scales poorly on very large datasets → try FAISS (ANN) or a compact CNN.  
- Explore L1 distance, PCA whitening, or learned embeddings.

</div>
