---
title: "(Databricks) Anomaly Detection with Multivariate Gaussian Distributions: A Case Study on Bike Sharing Data"
date: "2025-09-01"
excerpt: "Exploring how Gaussian modeling can help detect unusual demand patterns in bike sharing."
tags: ["machine-learning", "databricks", "anomaly-detection", "gaussian"]
draft: false
---

## 1. Introduction

In this project, I wanted to see whether a **simple statistical model** could already spot interesting patterns in real-world data. I picked the **bike sharing dataset** from Databricks because it has both **weather information** and **hourly rental counts**, which makes it perfect for asking the question:

👉 *“Does the demand for bikes match the weather conditions?”*  

Instead of jumping into complex machine learning, I decided to start with a **Multivariate Gaussian**. It’s a clean and explainable way to model what “normal” looks like.

---

## 2. Technical setup

The dataset I used was stored in: dbfs:/databricks-datasets/bikeSharing/data-001/hour.csv


It contains **17,379 hourly records**, including features like temperature (`temp`), humidity (`hum`), and the count of bikes rented (`cnt`). I focused on these three because they are both **continuous** and **intuitively related**: if the temperature and humidity suggest bad weather, the rental count should also reflect that.  


The model is simple:
- 1.Compute the **mean vector μ** and **covariance matrix Σ** from the features.  
- 2.Score each row using the **multivariate Gaussian PDF**.  
- 3.Flag rows as anomalies if their probability is **below the 5th percentile**.  

This way, “normal” demand is defined by the joint distribution of weather + rentals, and anything too unlikely gets flagged.

---

## 3. Workflow

1. **Exploration**  
   I first browsed the folder to confirm the right file. Then I quickly plotted the distributions of temperature, humidity, and counts to get a feel for the ranges.  

2. **Model fitting**  
   After computing μ and Σ, I noticed that some combinations of features were strongly correlated (e.g., humidity and demand). The covariance matrix helps account for this.  

3. **Thresholding**  
   I chose the **5% quantile** as the cutoff. This is easy to explain: “if something happens less than 5% of the time under normal conditions, we treat it as unusual.”  

4. **Visualization**  
   To check whether the flagged cases made sense, I drew a scatter plot of `temp` vs `cnt`. I used orange “x” marks to highlight anomalies.  
   What stood out were cases like:
   - **Rainy and cold hours with unexpectedly high rentals.**  
   - **Sunny, nice-weather hours with surprisingly low rentals.**  

These matched my intuition and confirmed the method was capturing the right kind of outliers.

---

## 4. Databricks Workspace

<div class="screenshot-large">
  <img src="/images/projects/project2/1.png" alt="Databricks notebook full-page screenshot">
</div>

---

## 5. Reflections

Working through this project gave me a clearer sense of how much can already be achieved with relatively simple statistical tools. The multivariate Gaussian, although conceptually straightforward, turned out to be surprisingly powerful in highlighting demand patterns that “don’t fit the weather.”  

One of the first things I noticed is how **correlated features** such as temperature, humidity, and demand interact. By modeling their joint distribution, the Gaussian didn’t just capture each variable in isolation — it actually learned the “shape” of normal conditions. For example, hours with high humidity but still very high rentals stood out immediately, because such combinations are rare in the data. This made me appreciate how covariance structures matter in anomaly detection, and why a univariate approach would have completely missed these cases.  

The choice of threshold was another interesting learning point. I set the cutoff at the **5th percentile**, which worked well for this dataset: it balanced sensitivity (catching unusual hours) with specificity (not over-flagging normal variation). But in a real production system, this decision would have to involve stakeholders. Operations teams may want fewer false alarms, while product teams might prefer to capture as many anomalies as possible. That trade-off between statistical rigor and business usability is something I became more conscious of through this project.  

From a data engineering perspective, I also realized the importance of **explainability and reproducibility**. A Gaussian baseline is not only easy to implement in Databricks, but it also produces results that can be explained to non-technical stakeholders in a single plot. Compared to deep learning, this is much easier to communicate and maintain, especially if the goal is to deploy a daily monitoring job that flags anomalies automatically.  

In short, this project showed me that anomaly detection doesn’t always require complex models to generate value. Sometimes, **a simple, interpretable statistical approach is the right starting point**, both for quick insights and as a reliable baseline before moving on to more sophisticated techniques.
