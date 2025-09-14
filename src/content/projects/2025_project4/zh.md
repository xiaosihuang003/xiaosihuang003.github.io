---
title: "(Databricks) Fashion-MNIST：双层 MLP 基线 + MLflow"
date: 2025-09-14
tags: ["machine-learning","tensorflow","keras","mlflow","classification","mnist"]
excerpt: "一个紧凑、可复现的 Fashion-MNIST MLP 基线：数据、模型、训练协议、指标、误差分析与交付物。"
---

## 摘要
实现了一个用于 Fashion-MNIST 图像分类任务的两层多层感知机（MLP）基线。流程包括预处理（归一化、28×28→784 展平、分层 90/10 训练/验证划分）、模型结构（Dense-256 和 Dense-128，含批归一化和 Dropout）、训练配置（Adam 优化器、ReduceLROnPlateau、EarlyStopping）和评估。使用 MLflow 记录参数、指标和产物（训练/验证曲线、混淆矩阵、测试集预测）。模型在测试集上达到 0.846 准确率，可作为后续 CNN 或嵌入模型的参考基线。

---

## Databricks 演示

![Notebook snapshot & curves](/images/projects/project4/1.png)

---

## 1. 数据集与目标
- **数据集**：Fashion-MNIST，60,000 张训练图像和 10,000 张测试图像，**28×28** 灰度，**10** 类别。  
- **任务**：多类别图像分类。  
- **主要指标**：保留测试集上的准确率。

---

## 2. 方法

### 2.1 预处理
- 将像素值转换为 **float32** 并缩放至 **[0, 1]**。  
- 将 28×28 图像展平为 **784 维向量**。  
- 从原训练集创建 **分层** 90/10 训练/验证划分。

### 2.2 模型结构
一个紧凑的带批归一化和 dropout 的 MLP：
```bash    
    Input(784)
     → Dense(256) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(128) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(10, softmax)
```

### 2.3 训练协议
- **优化器**：Adam（初始学习率 1e-3）。  
- **损失函数**：稀疏分类交叉熵。  
- **批大小**：256；**轮数**：最多 20。  
- **回调函数**：  
    - `ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, min_lr=1e-6)`  
    - `EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)`

### 2.4 实验追踪（MLflow）
记录的参数：隐藏层大小、dropout 率、优化器、epoch、batch 大小。  
记录的指标：训练/验证/测试准确率。  
产物：训练曲线（loss & accuracy）、混淆矩阵、以及 `PRED_mlp.dat`。

---

## 3. 结果

### 3.1 准确率
| 数据划分 | 准确率 |
|:--|:--:|
| 训练集 | **0.864** |
| 验证集 | **0.859** |
| 测试集 | **0.846** |

观察：学习曲线表明收敛稳定，正则化适度；验证集与测试集结果接近，表明该容量下过拟合有限。

### 3.2 误差分析
混淆矩阵揭示了预期的混淆对：
- **T-shirt/top ↔ Shirt**
- **Coat ↔ Pullover**  
这些类别在低分辨率灰度下相似度较高；CNN 或基于嵌入的模型应能降低这类混淆。

---

## 4. 交付物（产物）
- **`PRED_mlp.dat`** — 10,000 条整数标签（模型对测试集的预测）。  
- **`mlp_training_curve.png`** — 训练与验证 **loss** 曲线。  
- **`mlp_training_curve_acc.png`** — 训练与验证 **accuracy** 曲线。  
- **`mlp_confusion_matrix.png`** — 混淆矩阵。  

> 为了便于公开托管，这些产物已镜像至网站仓库，以避免链接失效。

---

## 5. 可复现性说明
- 数据加载器支持两种常见的 pickle 格式：  
  1) `((x_train, y_train), (x_test, y_test))` **或**  
  2) 四个顺序写入的对象 `x_train, y_train, x_test, y_test`（读取到 `EOFError` 为止）。  
- 从 DBFS 使用标准 Python I/O 读取时，应使用 **`/dbfs/...`** 前缀（而不是 `dbfs:/...`）。  
- 固定所有随机种子（`numpy`、`tensorflow`）以提高多次运行的一致性。

---

## 6. 局限性与扩展
- **容量限制**：全连接层直接作用于原始像素，空间结构利用不足；性能约在 85% 附近饱和。  
- **下一步**：  
  - 用 **小型 CNN**（2–3 个卷积块）替代 MLP，有望达到 **90%+**，并保持相同的 MLflow 记录契约。  
  - 尝试 **白化 / PCA** 预处理或 **学习的嵌入**；评估检索式基线。  
  - 增加 **校准** 和 **逐类指标**，以更完整地反映质量。

---

## 7. 选定超参数
```bash 
    hidden1=256, hidden2=128, dropout=0.2
    optimizer=Adam(lr=1e-3), batch_size=256, epochs=20
    callbacks = ReduceLROnPlateau, EarlyStopping
```
---

## 8. 总结
构建了一个紧凑、记录完善的 Fashion-MNIST 基线，在测试集上达到 **0.846 准确率**，并通过 **MLflow** 实现了完整的实验可追溯性。该报告及导出的产物定义了一个清晰的参考，为后续的 CNN、嵌入或检索方法迭代提供了可比性与审计性保障。
