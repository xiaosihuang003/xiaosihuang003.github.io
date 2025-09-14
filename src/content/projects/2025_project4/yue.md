---
title: "(Databricks) Fashion-MNIST：雙層 MLP 基線 + MLflow"
date: 2025-09-14
tags: ["machine-learning","tensorflow","keras","mlflow","classification","mnist"]
excerpt: "Fashion-MNIST 嘅 MLP 基線：數據、模型、訓練流程、指標、錯誤分析同交付物。"
---

## 摘要
實現咗一個用於 Fashion-MNIST 圖像分類任務嘅兩層多層感知機（MLP）基線。流程包括預處理（歸一化、28×28→784 攤平、分層 90/10 訓練/驗證拆分）、模型結構（Dense-256 同 Dense-128，含批歸一化同 Dropout）、訓練配置（Adam 優化器、ReduceLROnPlateau、EarlyStopping）同評估。用 MLflow 記錄參數、指標同產物（訓練/驗證曲線、混淆矩陣、測試集預測）。模型喺測試集上達到 0.846 準確率，可以作為之後 CNN 或嵌入模型嘅參考基線。

---

## Databricks 示範

![Notebook snapshot & curves](/images/projects/project4/1.png)

---

## 1. 數據集同目標
- **數據集**：Fashion-MNIST，60,000 張訓練圖像同 10,000 張測試圖像，**28×28** 灰度，**10** 類別。  
- **任務**：多類別圖像分類。  
- **主要指標**：保留測試集準確率。

---

## 2. 方法

### 2.1 預處理
- 將像素值轉換為 **float32**，縮放到 **[0, 1]**。  
- 將 28×28 圖像攤平成 **784 維向量**。  
- 從原始訓練集創建 **分層** 90/10 訓練/驗證拆分。

### 2.2 模型結構
一個緊湊嘅帶批歸一化同 dropout 嘅 MLP：
```bash  
    Input(784)
     → Dense(256) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(128) → BatchNorm → ReLU → Dropout(0.2)
     → Dense(10, softmax)
```

### 2.3 訓練流程
- **優化器**：Adam（初始學習率 1e-3）。  
- **損失函數**：稀疏分類交叉熵。  
- **批大小**：256；**輪數**：最多 20。  
- **回調**：  
    - `ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=2, min_lr=1e-6)`  
    - `EarlyStopping(monitor="val_loss", patience=5, restore_best_weights=True)`

### 2.4 實驗追蹤（MLflow）
記錄嘅參數：隱藏層大小、dropout 率、優化器、epoch、batch 大小。  
記錄嘅指標：訓練/驗證/測試準確率。  
產物：訓練曲線（loss & accuracy）、混淆矩陣、同 `PRED_mlp.dat`。

---

## 3. 結果

### 3.1 準確率
| 數據拆分 | 準確率 |
|:--|:--:|
| 訓練集 | **0.864** |
| 驗證集 | **0.859** |
| 測試集 | **0.846** |

觀察：學習曲線顯示收斂穩定，正則化適度；驗證集同測試集結果接近，顯示呢個容量下過擬合唔嚴重。

### 3.2 錯誤分析
混淆矩陣突顯咗預期嘅混淆對：
- **T-shirt/top ↔ Shirt**
- **Coat ↔ Pullover**  
呢啲類別喺低分辨率灰度圖像中好相似；CNN 或嵌入模型應該可以減少呢啲混淆。

---

## 4. 交付物（產物）
- **`PRED_mlp.dat`** — 10,000 條整數標籤（模型對測試集嘅預測）。  
- **`mlp_training_curve.png`** — 訓練 vs 驗證 **loss** 曲線。  
- **`mlp_training_curve_acc.png`** — 訓練 vs 驗證 **accuracy** 曲線。  
- **`mlp_confusion_matrix.png`** — 混淆矩陣。  

> 為咗方便公開托管，呢啲產物已經鏡像到網站倉庫，避免鏈接過期。

---

## 5. 可重現性說明
- 數據加載器支援兩種常見嘅 pickle 格式：  
  1) `((x_train, y_train), (x_test, y_test))` **或者**  
  2) 四個順序 dump 嘅對象 `x_train, y_train, x_test, y_test`（讀到 `EOFError` 為止）。  
- 從 DBFS 用標準 Python I/O 讀取時，應該用 **`/dbfs/...`** 前綴（唔好用 `dbfs:/...`）。  
- 固定所有隨機種子（`numpy`、`tensorflow`）提高多次運行一致性。

---

## 6. 局限性同擴展
- **容量限制**：全連接層直接處理原始像素，空間結構利用不足；性能大約 85% 左右飽和。  
- **下一步**：  
  - 用 **細型 CNN**（2–3 個卷積塊）取代 MLP，有望達到 **90%+**，同時保持相同嘅 MLflow 記錄。  
  - 試下 **白化 / PCA** 預處理或者 **學習嘅嵌入**；評估檢索式基線。  
  - 加入 **校準** 同 **逐類指標**，更全面反映質量。

---

## 7. 選定超參數
```bash 
    hidden1=256, hidden2=128, dropout=0.2
    optimizer=Adam(lr=1e-3), batch_size=256, epochs=20
    callbacks = ReduceLROnPlateau, EarlyStopping
```

---

## 8. 總結
建立咗一個緊湊、記錄完善嘅 Fashion-MNIST 基線，喺測試集達到 **0.846 準確率**，並透過 **MLflow** 完整記錄實驗過程。呢份報告加埋導出嘅產物，定義咗清晰嘅參考標準，方便後續 CNN、嵌入或檢索方法嘅迭代保持可比性同可審計性。
