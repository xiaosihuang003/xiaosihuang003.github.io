---
title: ML_1:DATA.ML.100 课程编程环境设置 (macOS)
subtitle: 机器学习导论, 2025年秋季
date: 2025-08-25
lang: zh
excerpt: 为 DATA.ML.100 (Joni Kämäräinen) 配置 Anaconda、Python 和 Jupyter 的分步说明。
tags: ["Joni Kämäräinen","anaconda", "jupyter", "machine-learning"]
draft: false
---

本环境配置适用于课程 **DATA.ML.100 机器学习导论** (2025年秋季, 25.8.–17.10.2025)，任课教师 *Joni Kämäräinen*。本课程所有编程均使用 **Python**。为避免与其他项目冲突，我们将创建一个名为 **`dataml100`** 的独立环境。大部分课程示例以 **Jupyter Notebook** 的形式发布，因此需要安装以下组件：

- **Anaconda** (conda 包管理器)  
- **Python 3.12**  
- **Jupyter Notebook / JupyterLab**

> **提示:** 在 Windows 上，请在 **Anaconda Prompt** 中运行命令。  
> 在 macOS/Linux 上，请使用 **终端**。

---


## Step 1. 安装 Anaconda

1. 下载 Anaconda: <https://docs.anaconda.com/anaconda/install/>
2. 按照系统平台的指引进行安装。
3. 验证安装：

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

# 所有请求的包已安装。

xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```

---

## Step 3. 创建课程环境

创建名为 dataml100 的环境：

```bash
conda create --name dataml100
```

激活该环境：

```bash
conda activate dataml100
```

退出环境：
```bash
conda deactivate
```
---

## Step 4. 安装 Python

在激活的环境中安装 Python 3.12：
```bash
(dataml100)$ conda install python=3.12
```

---

## Step 5. 安装 Jupyter

在激活的环境中安装 Jupyter：

```bash
(dataml100)$ conda install anaconda::jupyter
```
---


## Step 6. 验证安装

验证安装是否成功：

检查 Anaconda 安装：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1

```

检查 Python 版本 (应为 3.12.x)：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python --version
Python 3.12.11
```

检查 Jupyter 是否安装成功：
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

检查当前所处环境：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda info --envs

# conda environments:
#
base                   /opt/anaconda3
dataml100            * /opt/anaconda3/envs/dataml100 
pyarrow_env            /opt/anaconda3/envs/pyarrow_env

(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```
当前激活的环境会用星号 (*) 标记。


确认各组件路径：
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

测试 Python：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python -c "print('你好, DATA.ML.100!')"
你好, DATA.ML.100!
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```


---

## Step 7. 打开 Notebook

为确保 Jupyter Notebook (`lec_introduction.ipynb`) 正确显示图片，需将 **notebook 文件** 与 **images 文件夹** 放在同一目录下。

### 1. 创建课程文件夹
进入 `Downloads` 目录并创建新文件夹：

```bash
cd ~/Downloads
mkdir "01.Joni Kämäräinen_Introduction to Machine Learning"
```

### 2. 将文件移入该文件夹 (从 Moodle 下载)
将 notebook 文件和 images 文件夹同时移入：
```bash
mv lec_introduction.ipynb "01.Joni Kämäräinen_Introduction to Machine Learning"/
mv images "01.Joni Kämäräinen_Introduction to Machine Learning"/
```

### 3. 打开 notebook
在该目录下运行：
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~/Downloads/01.Joni Kämäräinen_Introduction to Machine Learning  $ jupyter notebook lec_introduction.ipynb
```

---

## 可选维护操作

导出环境 (便于分享/复现)：

```bash
conda env export --from-history > environment.yml
```

删除环境 (若需重置)：

```bash
conda remove -n dataml100 --all
```

完成以上配置后，你就可以运行所有 notebooks 并跟随课程 **DATA.ML.100 机器学习导论** 了！
