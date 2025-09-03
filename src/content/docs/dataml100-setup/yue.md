---
title: DATA.ML.100 課程編程環境設定 (macOS)
subtitle: 機器學習導論, 2025年秋季
date: 2025-08-25
lang: yue
excerpt: 為 DATA.ML.100 (Joni Kämäräinen) 配置 Anaconda、Python 同 Jupyter 嘅逐步說明。
tags: ["Joni Kämäräinen","anaconda", "jupyter", "machine-learning"]
draft: false
---

呢個環境設定係 **DATA.ML.100 機器學習導論** 課程所需 (2025年秋季, 25.8.–17.10.2025)，授課老師係 *Joni Kämäräinen*。課程入面全部編程都會用 **Python**。為咗避免同其他項目有衝突，我哋會建立一個叫做 **`dataml100`** 嘅獨立環境。大部分課堂示例會用 **Jupyter Notebook** 發佈，所以我哋要安裝以下組件：

- **Anaconda** (conda 套件管理器)  
- **Python 3.12**  
- **Jupyter Notebook / JupyterLab**

> **提示:** 喺 Windows 上，要喺 **Anaconda Prompt** 入面執行命令。  
> 喺 macOS/Linux 上，就用 **Terminal**。

---


## Step 1. 安裝 Anaconda

1. 下載 Anaconda: <https://docs.anaconda.com/anaconda/install/>
2. 跟返你系統平台嘅指引安裝。
3. 驗證安裝：

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1
```

---

## Step 2. 更新 conda

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda update -n base -c defaults conda
Retrieving notices: done
Channels:
 - defaults
 - conda-forge
Platform: osx-arm64
Collecting package metadata (repodata.json): done
Solving environment: done

# 所有要求嘅套件已經安裝咗。

xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```

---

## Step 3. 建立課程環境

建立一個叫做 dataml100 嘅環境：

```bash
conda create --name dataml100
```

要啟動呢個環境，用：

```bash
conda activate dataml100
```

要退出環境，用：
```bash
conda deactivate
```
---

## Step 4. 安裝 Python

喺已啟動嘅環境中安裝 Python 3.12：
```bash
(dataml100)$ conda install python=3.12
```

---

## Step 5. 安裝 Jupyter

喺已啟動嘅環境中安裝 Jupyter：

```bash
(dataml100)$ conda install anaconda::jupyter
```
---


## Step 6. 驗證安裝

確認安裝成功：

檢查 Anaconda 安裝：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1

```

檢查 Python 版本 (應該係 3.12.x)：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python --version
Python 3.12.11
```

檢查 Jupyter 是否安裝好：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ jupyter --version
Selected Jupyter core packages...
IPython          : 9.1.0
ipykernel        : 6.29.5
ipywidgets       : 8.1.5
jupyter_client   : 8.6.3
jupyter_core     : 5.8.1
jupyter_server   : 2.16.0
jupyterlab       : 4.4.4
nbclient         : 0.10.2
nbconvert        : 7.16.6
nbformat         : 5.10.4
notebook         : 7.4.4
qtconsole        : 5.6.1
traitlets        : 5.14.3
```

檢查你係咪喺正確嘅環境：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda info --envs

# conda environments:
#
base                   /opt/anaconda3
dataml100            * /opt/anaconda3/envs/dataml100 
pyarrow_env            /opt/anaconda3/envs/pyarrow_env

(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```
當前啟動嘅環境會用星號 (*) 標記。


確認所有組件嘅路徑：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ which python
/opt/anaconda3/envs/dataml100/bin/python
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ which jupyter
/opt/anaconda3/envs/dataml100/bin/jupyter
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ which conda
conda () {
	\local cmd="${1-__missing__}"
	case "$cmd" in
		(activate | deactivate) __conda_activate "$@" ;;
		(install | update | upgrade | remove | uninstall) __conda_exe "$@" || \return
			__conda_activate reactivate ;;
		(*) __conda_exe "$@" ;;
	esac
}
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```

測試 Python：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python -c "print('你好, DATA.ML.100!')"
你好, DATA.ML.100!
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```


---

## Step 7. 打開 Notebook

為咗確保 Jupyter Notebook (`lec_introduction.ipynb`) 可以正確顯示圖片，**notebook 文件**同 **images 資料夾**要放喺同一個目錄。

### 1. 建立課程資料夾
進入 `Downloads` 目錄並建立新資料夾：

```bash
cd ~/Downloads
mkdir "01.Joni Kämäräinen_Introduction to Machine Learning"
```

### 2. 將文件搬入呢個資料夾 (從 Moodle 下載)
將 notebook 文件同 images 資料夾都搬入：
```bash
mv lec_introduction.ipynb "01.Joni Kämäräinen_Introduction to Machine Learning"/
mv images "01.Joni Kämäräinen_Introduction to Machine Learning"/
```

### 3. 打開 notebook
喺呢個目錄下執行：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~/Downloads/01.Joni Kämäräinen_Introduction to Machine Learning  $ jupyter notebook lec_introduction.ipynb
```

---

## 可選維護操作

導出環境 (方便分享/重現)：

```bash
conda env export --from-history > environment.yml
```

刪除環境 (如果要重置)：

```bash
conda remove -n dataml100 --all
```

完成設定之後，你就可以運行所有 notebooks，跟住課程 **DATA.ML.100 機器學習導論**！
