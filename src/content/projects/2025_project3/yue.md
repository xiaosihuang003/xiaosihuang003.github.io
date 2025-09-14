---
title: "(Databricks) Fashion-MNIST：k-NN 基線 + PCA 加速"
date: 2025-09-13
tags: ["machine-learning","databricks","knn","pca"]
excerpt: "一個簡單、透明嘅圖像分類基線，同埋一個實用嘅速度同準確率取捨研究。"
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

### 我做咗乜？
用 k-Nearest Neighbors（k-NN）搵出同訓練圖片**最相似**嘅樣本去辨認服飾類別；再加一個 PCA 加速步驟，喺**幾乎唔減準確率**嘅情況下，將運行時間縮短大約 **2.3×**。

---

## 點解呢件事重要？
- 起步做機器學習項目，首先要有一個**可靠嘅基線（baseline）**，先至再諗複雜模型。  
- k-NN **唔駛訓練、易解釋**：就係「搵最近嘅圖片，抄佢嘅標籤」。  
- PCA 好似將相片**壓縮成更少但有用嘅數字**，搜索會快好多。

---

## 數據同環境
- 數據集：Fashion-MNIST（訓練 60k / 測試 10k，28×28 灰度，10 類）  
- 目標：預測每張測試圖嘅服飾分類  
- 指標：accuracy（準確率）  
- 平台：Databricks Community Edition（Python、NumPy、scikit-learn、MLflow）

<div class="spacer"></div>
<a class="btn" href="https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/1262134940925609/2502558802654417/3858847372272760/latest.html" target="_blank" rel="noreferrer">查看 Notebook</a>

> 注意：Databricks「Publish」連結 6 個月之後會失效；請喺倉庫保留一份靜態 HTML 方便長期存取。

---

## 點樣做？
1) 將每張 28×28 圖片攤平成 784 個數字，並縮放到 [0,1]。  
2) k-NN（L2 距離）：對新圖片，搵 **k 個最相似**嘅訓練樣本；用佢哋嘅標籤投票。  
3) PCA（可選）：將 784 維壓到 50/100/200 維，**加速搜索**而準確率變化好少。  
4) 分批（Batching）：分批計距離，**慳內存**。  
5) 追蹤：用 MLflow 記錄參數（k、PCA 維度）、準確率同產物。

---
<br />

## 結果一眼睇晒
- **大約 85% 算唔算好？** 隨機猜（10 類）得 **10%**；細個 CNN 可以去到 **90%+**。  
  呢個基線**簡單同透明**，係一個扎實嘅起點。

<br />

### k-NN（無 PCA，784 維）

| k | Accuracy |
|:-:|:-------:|
| 1 | 0.8497 |
| 3 | 0.8541 |
| 5 | 0.8554 |

<br />

### PCA + 1-NN（端到端時間）  
*總時間 = PCA（fit+transform）+ 1-NN 搜索。*

<div class="table-wrap">

| 方法                | 準確率 | 總時間   |
|---------------------|:-----:|:--------:|
| RAW 1-NN（784 維）  | 0.8497 | 22.11s   |
| PCA-50 + 1-NN       | 0.8423 | 8.46s    |
| PCA-100 + 1-NN      | 0.8491 | 9.52s    |
| PCA-200 + 1-NN      | 0.8522 | 14.86s   |

</div>

<br />

**重點結論**
- **PCA-100** 嘅準確率幾乎同原本 784 維一樣，但**提速約 2.3×**（22.1s → 9.5s）。  
- **PCA-200** 準確率有少少提升，但時間開銷會多啲。  
- 揀 **k=3/5**（多數投票）會更穩定同更準。

<br />

---

## Databricks 示範
混淆矩陣（k=5）—— 對角線愈深愈好；非對角線顯示常見混淆（T-shirt/top 對 Shirt、Coat 對 Pullover）。

![Confusion matrix for Fashion-MNIST, k=5](/images/projects/project3/1.png)

---

## 總結
- **內存友好**嘅成對距離分批計算（避免 10k×60k 嘅大矩陣）。  
- 用隨機化 SVD 嘅 **PCA** 流程，並做端到端計時。  
- 用 **MLflow** 記錄 k、PCA 維度、指標同產物。

## 限制同下一步
- k-NN 喺超大數據集上伸縮性一般 → 可以試 **FAISS**（ANN）或者細個 **CNN**。  
- 可探討 **L1 距離**、**PCA 白化**，或者用**學習得到嘅嵌入表示**。

</div>
