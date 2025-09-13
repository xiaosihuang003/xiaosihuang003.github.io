---
title: Koneoppiminen 1:Ohjelmointiympäristön asennus DATA.ML.100 -kurssille (macOS)
subtitle: Johdatus koneoppimiseen, syksy 2025 | Mon 25.8.2025 K1704
date: 2025-08-25
lang: fi
excerpt: Vaiheittaiset ohjeet Anacondan, Pythonin ja Jupytern asentamiseen DATA.ML.100 -kurssille (Joni Kämäräinen).
tags: ["Joni Kämäräinen","anaconda", "jupyter", "machine-learning"]
draft: false
---

Tämä asennus vaaditaan kurssille **DATA.ML.100 Johdatus koneoppimiseen** (syksy 2025, 25.8.–17.10.2025), opettajana *Joni Kämäräinen*. Kaikki ohjelmointi tässä kurssissa tehdään **Pythonilla**. Välttääksemme ristiriidat muiden projektien kanssa luomme erillisen ympäristön nimeltä **`dataml100`**. Suurin osa luentoesimerkeistä jaetaan **Jupyter-notebookkeina**, joten asennamme:

- **Anaconda** (conda-paketinhallinta)  
- **Python 3.12**  
- **Jupyter Notebook / JupyterLab**

> **Vinkki:** Windowsissa suorita komennot **Anaconda Prompt** -ikkunassa.  
> macOS/Linuxissa käytä **Terminalia**.

---


## Step 1. Asenna Anaconda

1. Lataa Anaconda: <https://docs.anaconda.com/anaconda/install/>
2. Seuraa käyttöjärjestelmäkohtaisia ohjeita.
3. Varmista asennus:

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1
```

---

## Step 2. Päivitä conda

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda update -n base -c defaults conda
Retrieving notices: done
Channels:
 - defaults
 - conda-forge
Platform: osx-arm64
Collecting package metadata (repodata.json): done
Solving environment: done

# Kaikki pyydetyt paketit on jo asennettu.

xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```

---

## Step 3. Luo kurssiympäristö

Luo ympäristö nimeltä dataml100:

```bash
conda create --name dataml100
```

Aktivoi tämä ympäristö:

```bash
conda activate dataml100
```

Poistu aktiivisesta ympäristöstä:
```bash
conda deactivate
```
---

## Step 4. Asenna Python

Asenna Python 3.12 aktivoituun ympäristöön:
```bash
(dataml100)$ conda install python=3.12
```

---

## Step 5. Asenna Jupyter

Asenna Jupyter aktivoituun ympäristöön:

```bash
(dataml100)$ conda install anaconda::jupyter
```
---


## Step 6. Varmistus

Varmista, että asennus onnistui:

Tarkista Anaconda-asennus:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1

```

Tarkista Python-versio (pitäisi olla 3.12.x):
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python --version
Python 3.12.11
```

Tarkista, että Jupyter on asennettu ja käytettävissä:
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

Tarkista, että olet oikeassa ympäristössä:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda info --envs

# conda environments:
#
base                   /opt/anaconda3
dataml100            * /opt/anaconda3/envs/dataml100 
pyarrow_env            /opt/anaconda3/envs/pyarrow_env

(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```
Aktiivinen ympäristö merkitään tähdellä (*).


Varmista, että kaikki komponentit osoittavat oikeaan ympäristöön:
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

Testaa perustoiminto Pythonilla:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python -c "print('Hei, DATA.ML.100!')"
Hei, DATA.ML.100!
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```


---

## Step 7. Avaa notebookit

Jotta Jupyter-notebook (`lec_introduction.ipynb`) näyttää kuvat oikein, notebook-tiedoston ja images-kansion on oltava samassa hakemistossa.

### 1. Luo erillinen kansio luentoa varten
Siirry `Downloads`-hakemistoon ja luo uusi kansio:

```bash
cd ~/Downloads
mkdir "01.Joni Kämäräinen_Introduction to Machine Learning"
```

### 2. Siirrä tiedostot tähän kansioon Moodlesta lataamisen jälkeen
Siirrä sekä notebook-tiedosto että images-kansio uuteen hakemistoon:
```bash
mv lec_introduction.ipynb "01.Joni Kämäräinen_Introduction to Machine Learning"/
mv images "01.Joni Kämäräinen_Introduction to Machine Learning"/
```

### 3. Avaa notebook
Kun olet tässä hakemistossa, käynnistä Jupyter Notebook:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~/Downloads/01.Joni Kämäräinen_Introduction to Machine Learning  $ jupyter notebook lec_introduction.ipynb
```

---

## Ylläpito (valinnainen)

Vie ympäristö (jaettavaan / toistettavaan muotoon):

```bash
conda env export --from-history > environment.yml
```

Poista ympäristö (jos joskus haluat nollata sen):

```bash
conda remove -n dataml100 --all
```

Kun tämä asennus on valmis, olet valmis suorittamaan kaikki notebookit ja seuraamaan kurssia **DATA.ML.100 Johdatus koneoppimiseen**!
