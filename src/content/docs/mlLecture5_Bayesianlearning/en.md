---
title: "ML_5: Probabilities & Bayesian Thinking"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Mon 8.9.2025 K1704 😊"
date: "2025-09-11"
lang: "en"
excerpt: "From frequentist intuition to Bayes’ rule: conditional probability, priors vs. likelihoods, ML vs. MAP decisions, Monty Hall, non-transitive dice, small-sample pitfalls, and why doctors think like Bayesians."
tags: ["Joni Kämäräinen", "machine-learning", "probability", "Bayes", "MAP", "ML", "Monty-Hall", "nontransitive-dice"]
draft: false
---

## Preamble — housekeeping & KNN note
- Instructor’s **reference implementation for *k*-Nearest Neighbour** seems strong; if your exercise accuracy is hard to match, ping on the *Exercise 3* channel.  
- Even details like **floating-point dtype/precision** can noticeably affect accuracy. Lesson: *numerics matter*.

---
## Part 1 — Bayesian Probability & Inference 

## 1.1 Introduction
Today we move from deterministic models (like fitting a line, minimizing an error function) into **probabilistic reasoning**. This lecture introduces **Bayesian probability**, a framework that allows us to update beliefs given new evidence.

Two classical guiding rules in problem-solving:
1. If unsure, try to fit a line → a simple starting model.  
2. Define an error measure → find a solution that minimizes it.  

Now, we introduce the **Bayesian approach**: start from prior beliefs, update them with observations, and derive posterior beliefs.

---

## 1.2 Probability Refresher with Dice

![Board notes](/images/docs/mlLecture5_Bayesianlearning/1.png)

Consider a fair 6-sided die.

- Probability of rolling a `1`:  
  $$P(X=1) = \frac{1}{6}$$  

- Probability of two consecutive rolls both being `1`:  
  $$P(\text{two 1s}) = P(1) \cdot P(1) = \frac{1}{6} \cdot \frac{1}{6} = \frac{1}{36}$$  

- Probability of *not* rolling a `1`:  
  $$P(X \neq 1) = 1 - P(X=1) = 1 - \frac{1}{6} = \frac{5}{6}$$  

So far, this is **classical probability**.

---

## 1.3 Frequentist vs Bayesian Interpretations

- **Frequentist interpretation**:  
  Probability is the limiting frequency of an event after infinitely many trials.  
  Example: rolling a die 1000 times → about one sixth of them are `1`.

- **Bayesian interpretation**:  
  Probability represents a *degree of belief*, which can be updated with new evidence.  
  Even without many trials, we can assign and update probabilities using prior knowledge.

---

## 1.4 Example: Monty Hall Problem

![Board notes](/images/docs/mlLecture5_Bayesianlearning/2.png)

The game:  
- 3 doors.  
- Behind 1 door: a car. Behind 2 doors: goats.  
- You pick one door.  
- Host opens another door (always revealing a goat).  
- You are asked: **switch or stay?**

Analysis:  
- Probability your initial choice was correct:  
  $$P(\text{car behind chosen door}) = \frac{1}{3}$$  

- Probability the car is behind one of the other two doors:  
  $$P(\text{car behind other doors}) = \frac{2}{3}$$  

Once host opens a goat door, the **entire $2/3$ probability shifts to the remaining closed door**.  

Thus:  
- Staying = success chance $1/3$.  
- Switching = success chance $2/3$.  

**Conclusion:** Always switch. You double your winning probability.

---

## 1.5 Conditional Probability

![Board notes](/images/docs/mlLecture5_Bayesianlearning/3.png)

The conditional probability of $A$ given $B$ is defined as:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Interpretation: the probability of $A$ happening when $B$ is known to be true.

**Example 1:**  
- $A$: being a hobbit.  
- $B$: observed height = 120 cm.  
Then:  
$$P(\text{hobbit} \mid \text{height} = 120)$$ is likely high,  
while $$P(\text{elf} \mid \text{height} = 120)$$ is low.

---

### Example 2: Dice Observation Updates Belief

Suppose you roll a die and **just before the last roll finishes**, you observe the top face is `5`.  
What is the probability that the final result will be a `1` or a `2` after the die settles?

- Opposite faces on a standard die sum to 7, so the face opposite `1` is `6`.  
- Therefore, after one more random tumble, `1` cannot end up on top if `6` is currently on top.

Observed case: top = `5` → all four adjacent faces are equally likely to roll on top after the final move.

$$
P(\text{top}=1 \mid \text{observe}=5) = \frac{1}{4}
$$

But if we had observed top = `6`, then:

$$
P(\text{top}=1 \mid \text{observe}=6) = 0
$$

This demonstrates **observation modifies the prior**.  
Your **a priori belief** might have been $P(\text{top}=1)=\frac{1}{6}$, but after observing the state just before the roll,  
you must update your belief — this is the essence of Bayesian reasoning: 

> **Observations adjust the initial belief (prior).**


---

## 1.6 Bayes’ Theorem

![Board notes](/images/docs/mlLecture5_Bayesianlearning/4.png)

The cornerstone of Bayesian learning:

$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$

Where:
- $P(A)$ = prior probability of $A$ (belief before evidence).  
- $P(B \mid A)$ = likelihood (probability of observation if $A$ is true).  
- $P(B)$ = marginal probability of $B$ (normalizing constant).  
- $P(A \mid B)$ = posterior probability (updated belief after observing $B$).  

---

### Hobbit vs Elf Example
- $A$: character is a hobbit or elf.  
- $B$: observed height.  

- Prior belief: $P(\text{hobbit})$, $P(\text{elf})$.  
- Likelihood: $P(\text{height} \mid \text{hobbit})$, $P(\text{height} \mid \text{elf})$.  
- Evidence: $P(\text{height}) = P(\text{height} \mid \text{hobbit})P(\text{hobbit}) + P(\text{height} \mid \text{elf})P(\text{elf})$.  

Posterior:  
$$
P(\text{hobbit} \mid \text{height}) = \frac{P(\text{height} \mid \text{hobbit}) P(\text{hobbit})}{P(\text{height})}
$$

---

## 1.7 Role of Priors

![Board notes](/images/docs/mlLecture5_Bayesianlearning/5.png)

Bayes’ rule reminds us that the **prior** matters:

- **Prior ($P(A)$):** initial belief before data.  
- **Likelihood ($P(B \mid A)$):** how likely data is under each hypothesis.  
- **Evidence ($P(B)$):** ensures normalization  

$$
P(B) = \sum_A P(B \mid A) P(A)
$$

so that  

$$
\sum_A P(A \mid B) = 1
$$

- **Posterior ($P(A \mid B)$):** updated belief after incorporating evidence.  

Priors are crucial!  
Example: Landing a Mars rover.  
- Prior probability that a random landing spot is rocky may be estimated from satellite images (e.g., 10%).  
- This prior changes the final decision about where to land.

---

## Part 2 — Estimating Likelihoods from Data (what $P(B\mid A)$ really is)

![Board notes](/images/docs/mlLecture5_Bayesianlearning/6.png)

In Bayesian inference, the **likelihood** $P(B\mid A)$ is usually a **probability density function (PDF)** rather than a single number.  
Example: height $h$ given class (Hobbit/Elf):

- We want $P(h\mid \text{hobbit})$ and $P(h\mid \text{elf})$.  
- These are **continuous distributions** $p(h\mid\cdot)$ satisfying
  $$
  \int_{-\infty}^{+\infty} p(h\mid \text{hobbit})\,\mathrm dh=1,
  \qquad
  \int_{-\infty}^{+\infty} p(h\mid \text{elf})\,\mathrm dh=1.
  $$

## 2.1 From data to histograms (discrete approximation)
Given samples $h_1,\dots,h_N$, split the real line into bins $\{I_j\}$ and count
$$
c_j=\#\{\,h_i\in I_j\,\},\qquad \hat P(h\in I_j)=\frac{c_j}{N}.
$$
- Too few bins → overly coarse.
- Too many bins → spiky, possibly zero counts.

## 2.2 Fitting a continuous distribution (Gaussian example)
If heights are approximately Gaussian, fit
$$
h\mid\text{hobbit}\sim \mathcal N(\mu_H,\sigma_H^2),\qquad
h\mid\text{elf}\sim \mathcal N(\mu_E,\sigma_E^2),
$$
with PDF
$$
p(h\mid \mu,\sigma^2)=\frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\frac{(h-\mu)^2}{2\sigma^2}\right).
$$

> **Important:** a PDF value is **not a probability**.  
> Only integrals over intervals are probabilities:
> $$
> P(a\le h\le b\mid \text{hobbit})=\int_a^b p(h\mid \text{hobbit})\,\mathrm dh.
> $$

## 2.3 Parameter estimation (Gaussian case)
For i.i.d. data, maximum likelihood estimators (MLE) are
$$
\hat\mu_{\text{ML}}=\frac{1}{N}\sum_{i=1}^N h_i,\qquad
\hat\sigma^2_{\text{ML}}=\frac{1}{N}\sum_{i=1}^N (h_i-\hat\mu_{\text{ML}})^2.
$$
(Unbiased variance uses $N-1$ in the denominator.)

## 2.4 Why $P(B\mid A)$ is easier to measure
Directly estimating $P(A\mid B)$ is hard.  
Instead, we often **measure data distributions per class** (likelihoods) once, then apply Bayes’ rule to invert them.  
This is exactly the workflow shown on the board: fit $p(h\mid y)$ first, then compute $P(y\mid h)$ using priors.

---

## Part 3 — Decisions: ML vs MAP (why priors matter)

Let $x$ denote the observation (e.g., measured height), and $y\in\mathcal A$ the class label (e.g., Hobbit or Elf).

## 3.1 Maximum Likelihood (ML)
Choose the class that maximizes the likelihood:
$$
\hat y_{\text{ML}}
=\arg\max_{y\in\mathcal A}\; P(x\mid y).
$$
> **Ignores the prior.** Works fine when classes are balanced and misclassification costs are symmetric, but fails badly with rare classes.

## 3.2 Maximum a Posteriori (MAP)
Include the prior into the decision rule:
$$
\hat y_{\text{MAP}}
=\arg\max_{y\in\mathcal A}\; P(y\mid x)
=\arg\max_{y\in\mathcal A}\; \frac{P(x\mid y)\,P(y)}{P(x)}
\;\propto\; \arg\max_{y\in\mathcal A}\; P(x\mid y)\,P(y).
$$

![Board notes](/images/docs/mlLecture5_Bayesianlearning/7.png)

> **Note:** $P(x)$ is constant for all $y$ and thus cancels inside the $\arg\max$.


## 3.3 Normalization (two-class case)
For two classes (H/E), the evidence term is
$$
P(x)=P(x\mid \text{H})P(\text{H})+P(x\mid \text{E})P(\text{E}),
$$
ensuring that
$$
P(\text{H}\mid x)+P(\text{E}\mid x)=1.
$$

## 3.4 Why doctors are “Bayesian by training”
Symptom $x=$ “headache.”  
- **ML thinker:** jumps to rare but high-likelihood causes (“brain tumor”).  
- **MAP thinker:** weighs the tiny prior $P(\text{tumor})$, so common causes dominate until ruled out.  
Mathematically: choose class by comparing $P(x\mid y)P(y)$, not just $P(x\mid y)$.

---
