---
title: Programming Environment Setup for DATA.ML.100 course (macOS)
subtitle: Introduction to Machine Learning, Autumn 2025
date: 2025-08-25
lang: en
excerpt: Step-by-step notes on setting up Anaconda, Python, and Jupyter for DATA.ML.100 (Joni Kämäräinen).
tags: ["anaconda", "python", "jupyter", "machine-learning"]
draft: false
---

This setup is required for the course **DATA.ML.100 Introduction to Machine Learning** (Autumn 2025, 25.8.–17.10.2025) taught by *Joni Kämäräinen*. All programming in this course is done in **Python**. To avoid conflicts with other projects, we will create a dedicated environment named **`dataml100`**. Most lecture examples are distributed as **Jupyter notebooks**, so we will install:

- **Anaconda** (conda package manager)  
- **Python 3.12**  
- **Jupyter Notebook / JupyterLab**

> **Tip:** On Windows, run the commands in **Anaconda Prompt**.  
> On macOS/Linux, use **Terminal**.

---


## Step 1. Install Anaconda

1. Download Anaconda: <https://docs.anaconda.com/anaconda/install/>
2. Follow the platform specific instructions.
3. Verify installation:

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1
```

---

## Step 2. Update conda

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda update -n base -c defaults conda
Retrieving notices: done
Channels:
 - defaults
 - conda-forge
Platform: osx-arm64
Collecting package metadata (repodata.json): done
Solving environment: done

# All requested packages already installed.

xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```

---

## Step 3. Create the course environment

Create the environment named dataml100:

```bash
conda create --name dataml100
```

To activate this environment, use:

```bash
conda activate dataml100
```

To deactivate an active environment, use
```bash
conda deactivate
```
---

## Step 4. Install Python

Install Python 3.12 in the activated environment:
```bash
(dataml100)$ conda install python=3.12
```

---

## Step 5. Install Jupyter

Install Jupyter in the activated environment:

```bash
(dataml100)$ conda install anaconda::jupyter
```
---


## Step 6. Verification

To verify your installation is successful:

Check Anaconda installation:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1

```

Check Python version (should show 3.12.x):
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python --version
Python 3.12.11
```

Check Jupyter is installed and accessible:
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

Check you're in the correct environment:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda info --envs

# conda environments:
#
base                   /opt/anaconda3
dataml100            * /opt/anaconda3/envs/dataml100 
pyarrow_env            /opt/anaconda3/envs/pyarrow_env

(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```
The active environment should be marked with an asterisk (*).


Verify all components are pointing to the correct environment:
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

Test basic Python functionality:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python -c "print('Hello, DATA.ML.100!')"
Hello, DATA.ML.100!
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```


---

## Step 7. Open the notebooks

To make sure the Jupyter notebook (`lec_introduction.ipynb`) displays images correctly, you must keep the **notebook file** and the **images folder** in the same directory.

### 1. Create a dedicated folder for the lecture
Navigate to your `Downloads` folder and create a new directory:

```bash
cd ~/Downloads
mkdir "01.Joni Kämäräinen_Introduction to Machine Learning"
```



### 2. Move the files into this folder after downloading from Moodel
Move both the notebook file and the images folder into the new directory:
```bash
mv lec_introduction.ipynb "01.Joni Kämäräinen_Introduction to Machine Learning"/
mv images "01.Joni Kämäräinen_Introduction to Machine Learning"/
```

### 3. Open the notebook
While inside this directory, launch Jupyter Notebook:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~/Downloads/01.Joni Kämäräinen_Introduction to Machine Learning  $ jupyter notebook lec_introduction.ipynb
```



---
## Useful maintenance (optional)

Export the environment (for sharing/reproducibility):

```bash
conda env export --from-history > environment.yml
```

Remove the environment (if you ever need to reset):

```bash
conda remove -n dataml100 --all
```

With this setup complete, you are ready to run all notebooks and follow along with **DATA.ML.100 Introduction to Machine Learning**!
