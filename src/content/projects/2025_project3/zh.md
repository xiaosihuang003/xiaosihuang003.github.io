---
title: "(Databricks) Fashion-MNIST k-NN 基线"
date: 2025-09-13
tags: ["machine-learning","databricks","knn","pca"]
excerpt: "一个简单透明的图像分类基线，并进行速度与准确率的实用权衡研究。"
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

### 我做了什么？
用 **k 近邻（k-NN）** 通过寻找与训练图片**最相似**的样本来识别服饰类别；并加入 **PCA** 加速步骤，在**几乎不损失准确率**的前提下，将运行时间缩短约 **2.3×**。

---

## 为什么重要？
- 在尝试复杂模型之前，需要一个**可靠的基线**。  
- k-NN **无需训练、容易解释**： “找到最相近的图片并采用其标签”。  
- PCA 把图像压缩成更少但更有信息的数值，从而让检索更快。

---

## 数据与环境
- 数据集：Fashion-MNIST（训练 60k / 测试 10k，28×28 灰度，10 类）  
- 目标：预测每张测试图的服饰类别  
- 指标：accuracy  
- 平台：Databricks Community Edition（Python、NumPy、scikit-learn、MLflow）

<div class="spacer"></div>
<a class="btn" href="https://databricks-prod-cloudfront.cloud.databricks.com/public/4027ec902e239c93eaaa8714f173bcfc/1262134940925609/2502558802654417/3858847372272760/latest.html" target="_blank" rel="noreferrer">查看 Notebook</a>

> 注意：Databricks “Publish” 链接 6 个月后会过期。请在仓库中保留静态 HTML 以便长期访问。

---

## 实现思路？
1) 将每张 28×28 图片展平成 784 维，并缩放到 [0,1]。  
2) k-NN（L2 距离）：对新图片，找到 **k 个最相似**的训练样本；用它们的标签投票。  
3) PCA（可选）：把 784 维降到 50/100/200，**加速检索**且准确率变化很小。  
4) 批处理（Batching）：分批计算距离，**节省内存**。  
5) 跟踪：使用 MLflow 记录参数（k、PCA 维度）、准确率与产物。

---
<br />

## 结果速览
- **约 85% 有多好？** 随机猜（10 类）是 **10%**；小型 CNN 可达 **90%+**。  
  这个基线**简单透明**，能提供一个可靠的起点。

<br />

### k-NN（无 PCA，784 维）

| k | Accuracy |
|:-:|:-------:|
| 1 | 0.8497 |
| 3 | 0.8541 |
| 5 | 0.8554 |

<br />

### PCA + 1-NN（端到端时间）  
*总时间 = PCA（fit+transform）+ 1-NN 检索。*

<div class="table-wrap">

| 方法                 | 准确率 | 总时间   |
|----------------------|:-----:|:--------:|
| RAW 1-NN（784 维）   | 0.8497 | 22.11s   |
| PCA-50 + 1-NN        | 0.8423 | 8.46s    |
| PCA-100 + 1-NN       | 0.8491 | 9.52s    |
| PCA-200 + 1-NN       | 0.8522 | 14.86s   |

</div>

<br />

**关键结论**
- **PCA-100** 的准确率几乎等同于原始 784 维，但**提速约 2.3×**（22.1s → 9.5s）。  
- **PCA-200** 有轻微准确率提升，但时间开销更大。  
- 选择 **k=3/5**（多数投票）更稳定、准确率更高。

<br />

---

## Databricks 演示
混淆矩阵（k=5）——对角线越深越好；非对角线显示常见混淆（如 T-shirt/top 与 Shirt、Coat 与 Pullover）。

![Confusion matrix for Fashion-MNIST, k=5](/images/projects/project3/1.png)

---

## 工程实践
- **内存友好**的成对距离批处理（避免 10k×60k 的完整大矩阵）。  
- 带随机化 SVD 的 **PCA** 流水线，并做端到端计时。  
- 使用 **MLflow** 记录 k、PCA 维度、指标与产物。

## 局限与后续
- k-NN 在超大数据集上扩展性较差 → 可尝试 **FAISS**（ANN）或小型 **CNN**。  
- 可探索 **L1 距离**、**PCA 白化**，或使用**学习到的特征嵌入**。

</div>
