---
title: "(Databricks) Fashion-MNIST: Two-Layer MLP Baseline with MLflow"
date: 2025-09-14
tags: ["machine-learning","tensorflow","keras","mlflow","classification","mnist"]
excerpt: "A compact, reproducible MLP baseline for Fashion-MNIST: data, model, training protocol, metrics, error analysis, and deliverables."
---

## Abstract
A two-layer multilayer perceptron (MLP) baseline is implemented for the Fashion-MNIST image-classification task. The pipeline includes preprocessing (normalization, 28×28→784 flattening, stratified 90/10 train/validation split), model architecture (Dense-256 and Dense-128 with Batch Normalization and Dropout), training configuration (Adam optimizer, ReduceLROnPlateau, EarlyStopping), and evaluation. Parameters, metrics, and artifacts (training/validation curves, confusion matrix, and test-set predictions) are recorded with MLflow. The model attains 0.846 test accuracy and serves as a reference baseline for subsequent CNN- or embedding-based models.

---

## Databricks Demo

![Notebook snapshot & curves](/images/projects/project4/1.png)

---

## 1. Dataset and Objective
- **Dataset**: Fashion-MNIST, 60,000 training images and 10,000 test images, **28×28** grayscale, **10** classes.  
- **Task**: Multi-class image classification.  
- **Primary metric**: Accuracy on the held-out test set.

---

## 2. Methodology

### 2.1 Pre-processing
- Convert pixel values to **float32** and scale to **[0, 1]**.  
- Flatten 28×28 images to **784-dimensional** vectors.  
- Create a **stratified** 90/10 train/validation split from the original training set.

### 2.2 Model Architecture
A compact MLP with batch normalization and dropout:
```bash
Input(784)
 → Dense(256) → BatchNorm → ReLU → Dropout(0.2)
 → Dense(128) → BatchNorm → ReLU → Dropout(0.2)
 → Dense(10, softmax)
```

### 2.3 Training Protocol
- **Optimizer**: Adam (initial lr = 1e-3).  
- **Loss**: Sparse categorical cross-entropy.  
- **Batch size**: 256; **epochs**: up to 20.  
- **Callbacks**:  
  - `ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, min_lr=1e-6)`  
  - `EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)`

### 2.4 Experiment Tracking (MLflow)
Logged parameters: hidden sizes, dropout rate, optimizer, epochs, batch size.  
Logged metrics: train/val/test accuracy.  
Artifacts: training curves (loss & accuracy), confusion matrix, and `PRED_mlp.dat`.

---

## 3. Results

### 3.1 Accuracy
| Split | Accuracy |
|:--|:--:|
| Train | **0.864** |
| Val   | **0.859** |
| Test  | **0.846** |

Observations: learning curves indicate stable convergence with mild regularization; validation and test closely match, suggesting limited overfitting at this capacity.

### 3.2 Error Analysis
The confusion matrix highlights the expected ambiguities:
- **T-shirt/top ↔ Shirt**
- **Coat ↔ Pullover**  
These categories are visually similar in low-resolution grayscale; a CNN or embedding-based model should reduce these confusions.

---

## 4. Deliverables (Artifacts)
- **`PRED_mlp.dat`** — 10,000 integer labels (model predictions for the test split).  
- **`mlp_training_curve.png`** — training vs. validation **loss**.  
- **`mlp_training_curve_acc.png`** — training vs. validation **accuracy**.  
- **`mlp_confusion_matrix.png`** — confusion matrix.  

> For public hosting, these artifacts are mirrored in the website repository to avoid link expiry.

---

## 5. Reproducibility Notes
- Data loader supports both common pickle layouts:  
  1) `((x_train, y_train), (x_test, y_test))` **or**  
  2) four sequential dumps `x_train, y_train, x_test, y_test` (read until `EOFError`).  
- When reading from DBFS with standard Python I/O, use the **`/dbfs/...`** prefix (not `dbfs:/...`).  
- All random seeds are fixed (`numpy`, `tensorflow`) to improve run-to-run consistency.

---

## 6. Limitations and Extensions
- **Capacity**: Fully-connected layers on raw pixels under-utilize spatial structure; performance saturates ~85%.  
- **Next steps**:  
  - Replace MLP with a **small CNN** (2–3 conv blocks) to reach **90%+** while keeping the same MLflow contract.  
  - Try **whitening / PCA** pre-processing or **learned embeddings**; evaluate retrieval-style baselines.  
  - Add **calibration** and **per-class metrics** for a fuller quality picture.

---

## 7. Selected Hyper-parameters
```bash
hidden1=256, hidden2=128, dropout=0.2
optimizer=Adam(lr=1e-3), batch_size=256, epochs=20
callbacks = ReduceLROnPlateau, EarlyStopping
```

---

## 8. Summary
A compact, well-instrumented baseline for Fashion-MNIST has been established with **0.846 test accuracy** and complete experiment traceability via **MLflow**. This report, together with the exported artifacts, defines a clear reference for subsequent model iterations (CNN, embeddings, or retrieval approaches) while preserving comparability and auditability.
