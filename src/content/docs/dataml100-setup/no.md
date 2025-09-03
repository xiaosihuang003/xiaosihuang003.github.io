---
title: Oppsett av programmeringsmiljø for DATA.ML.100-kurset (macOS)
subtitle: Introduksjon til maskinlæring, høsten 2025
date: 2025-08-25
lang: no
excerpt: Steg-for-steg notater om oppsett av Anaconda, Python og Jupyter for DATA.ML.100 (Joni Kämäräinen).
tags: ["Joni Kämäräinen","anaconda", "jupyter", "machine-learning"]
draft: false
---

Dette oppsettet kreves for kurset **DATA.ML.100 Introduksjon til maskinlæring** (høsten 2025, 25.8.–17.10.2025) undervist av *Joni Kämäräinen*. All programmering i dette kurset gjøres i **Python**. For å unngå konflikter med andre prosjekter lager vi et dedikert miljø kalt **`dataml100`**. De fleste forelesningseksempler distribueres som **Jupyter-notatbøker**, så vi installerer:

- **Anaconda** (conda pakkehåndtering)  
- **Python 3.12**  
- **Jupyter Notebook / JupyterLab**

> **Tips:** På Windows, kjør kommandoene i **Anaconda Prompt**.  
> På macOS/Linux, bruk **Terminal**.

---


## Step 1. Installer Anaconda

1. Last ned Anaconda: <https://docs.anaconda.com/anaconda/install/>
2. Følg instruksjonene for ditt operativsystem.
3. Bekreft installasjonen:

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1
```

---

## Step 2. Oppdater conda

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda update -n base -c defaults conda
Retrieving notices: done
Channels:
 - defaults
 - conda-forge
Platform: osx-arm64
Collecting package metadata (repodata.json): done
Solving environment: done

# Alle forespurte pakker er allerede installert.

xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```

---

## Step 3. Opprett kursmiljøet

Lag miljøet kalt dataml100:

```bash
conda create --name dataml100
```

For å aktivere dette miljøet, bruk:

```bash
conda activate dataml100
```

For å deaktivere et aktivt miljø, bruk:
```bash
conda deactivate
```
---

## Step 4. Installer Python

Installer Python 3.12 i det aktiverte miljøet:
```bash
(dataml100)$ conda install python=3.12
```

---

## Step 5. Installer Jupyter

Installer Jupyter i det aktiverte miljøet:

```bash
(dataml100)$ conda install anaconda::jupyter
```
---


## Step 6. Verifikasjon

For å bekrefte at installasjonen er vellykket:

Sjekk Anaconda-installasjonen:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1

```

Sjekk Python-versjonen (skal vise 3.12.x):
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python --version
Python 3.12.11
```

Sjekk at Jupyter er installert og tilgjengelig:
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

Sjekk at du er i riktig miljø:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda info --envs

# conda environments:
#
base                   /opt/anaconda3
dataml100            * /opt/anaconda3/envs/dataml100 
pyarrow_env            /opt/anaconda3/envs/pyarrow_env

(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```
Det aktive miljøet skal markeres med en stjerne (*).


Bekreft at alle komponenter peker til riktig miljø:
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

Test grunnleggende Python-funksjonalitet:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python -c "print('Hei, DATA.ML.100!')"
Hei, DATA.ML.100!
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```


---

## Step 7. Åpne notatbøkene

For å sikre at Jupyter-notatboken (`lec_introduction.ipynb`) viser bilder riktig, må notatbokfilen og images-mappen ligge i samme katalog.

### 1. Opprett en egen mappe for forelesningen
Gå til `Downloads`-mappen og opprett en ny katalog:

```bash
cd ~/Downloads
mkdir "01.Joni Kämäräinen_Introduction to Machine Learning"
```

### 2. Flytt filene til denne mappen etter nedlasting fra Moodle
Flytt både notatbokfilen og images-mappen inn i den nye katalogen:
```bash
mv lec_introduction.ipynb "01.Joni Kämäräinen_Introduction to Machine Learning"/
mv images "01.Joni Kämäräinen_Introduction to Machine Learning"/
```

### 3. Åpne notatboken
Mens du er i denne katalogen, start Jupyter Notebook:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~/Downloads/01.Joni Kämäräinen_Introduction to Machine Learning  $ jupyter notebook lec_introduction.ipynb
```

---

## Vedlikehold (valgfritt)

Eksporter miljøet (for deling / reproduserbarhet):

```bash
conda env export --from-history > environment.yml
```

Fjern miljøet (hvis du noen gang trenger å nullstille det):

```bash
conda remove -n dataml100 --all
```

Med dette oppsettet fullført er du klar til å kjøre alle notatbøker og følge kurset **DATA.ML.100 Introduksjon til maskinlæring**!
