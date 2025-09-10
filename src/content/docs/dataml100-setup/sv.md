---
title: ML_1:Programmeringsmiljöinställning för DATA.ML.100-kursen (macOS)
subtitle: Introduktion till maskininlärning, hösten 2025
date: 2025-08-25
lang: sv
excerpt: Steg-för-steg-anteckningar om att konfigurera Anaconda, Python och Jupyter för DATA.ML.100 (Joni Kämäräinen).
tags: ["Joni Kämäräinen","anaconda", "jupyter", "machine-learning"]
draft: false
---

Denna inställning krävs för kursen **DATA.ML.100 Introduktion till maskininlärning** (hösten 2025, 25.8.–17.10.2025) undervisad av *Joni Kämäräinen*. All programmering i denna kurs görs i **Python**. För att undvika konflikter med andra projekt skapar vi en dedikerad miljö som heter **`dataml100`**. De flesta föreläsningsexempel distribueras som **Jupyter-notebooks**, så vi installerar:

- **Anaconda** (conda pakethanterare)  
- **Python 3.12**  
- **Jupyter Notebook / JupyterLab**

> **Tips:** På Windows, kör kommandona i **Anaconda Prompt**.  
> På macOS/Linux, använd **Terminal**.

---


## Step 1. Installera Anaconda

1. Ladda ner Anaconda: <https://docs.anaconda.com/anaconda/install/>
2. Följ instruktionerna för ditt operativsystem.
3. Verifiera installationen:

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1
```

---

## Step 2. Uppdatera conda

```bash
xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda update -n base -c defaults conda
Retrieving notices: done
Channels:
 - defaults
 - conda-forge
Platform: osx-arm64
Collecting package metadata (repodata.json): done
Solving environment: done

# Alla begärda paket är redan installerade.

xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```

---

## Step 3. Skapa kursmiljön

Skapa miljön som heter dataml100:

```bash
conda create --name dataml100
```

För att aktivera denna miljö, använd:

```bash
conda activate dataml100
```

För att avaktivera en aktiv miljö, använd:
```bash
conda deactivate
```
---

## Step 4. Installera Python

Installera Python 3.12 i den aktiverade miljön:
```bash
(dataml100)$ conda install python=3.12
```

---

## Step 5. Installera Jupyter

Installera Jupyter i den aktiverade miljön:

```bash
(dataml100)$ conda install anaconda::jupyter
```
---


## Step 6. Verifiering

För att verifiera att installationen lyckades:

Kontrollera Anaconda-installationen:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda --version
conda 25.1.1

```

Kontrollera Python-versionen (ska visa 3.12.x):
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python --version
Python 3.12.11
```

Kontrollera att Jupyter är installerat och tillgängligt:
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

Kontrollera att du är i rätt miljö:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ conda info --envs

# conda environments:
#
base                   /opt/anaconda3
dataml100            * /opt/anaconda3/envs/dataml100 
pyarrow_env            /opt/anaconda3/envs/pyarrow_env

(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```
Den aktiva miljön ska markeras med en asterisk (*).


Verifiera att alla komponenter pekar på rätt miljö:
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

Testa grundläggande Python-funktionalitet:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ python -c "print('Hej, DATA.ML.100!')"
Hej, DATA.ML.100!
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~ $ 
```


---

## Step 7. Öppna noteböckerna

För att säkerställa att Jupyter-notebooken (`lec_introduction.ipynb`) visar bilder korrekt måste notebook-filen och images-mappen ligga i samma katalog.

### 1. Skapa en dedikerad mapp för föreläsningen
Gå till din `Downloads`-mapp och skapa en ny katalog:

```bash
cd ~/Downloads
mkdir "01.Joni Kämäräinen_Introduction to Machine Learning"
```

### 2. Flytta filerna till denna mapp efter nedladdning från Moodle
Flytta både notebook-filen och images-mappen till den nya katalogen:
```bash
mv lec_introduction.ipynb "01.Joni Kämäräinen_Introduction to Machine Learning"/
mv images "01.Joni Kämäräinen_Introduction to Machine Learning"/
```

### 3. Öppna notebooken
När du är i denna katalog, starta Jupyter Notebook:
```bash
(dataml100) xiaosihuang@Xiaosis-MacBook-Pro ~/Downloads/01.Joni Kämäräinen_Introduction to Machine Learning  $ jupyter notebook lec_introduction.ipynb
```

---

## Underhåll (valfritt)

Exportera miljön (för delning / reproducerbarhet):

```bash
conda env export --from-history > environment.yml
```

Ta bort miljön (om du någonsin behöver återställa den):

```bash
conda remove -n dataml100 --all
```

Med denna installation klar är du redo att köra alla notebooks och följa kursen **DATA.ML.100 Introduktion till maskininlärning**!
