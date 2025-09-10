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

## Part 1 — Why probability again?
- Many engineering heuristics:
  1) *Fit a line* (start simple).  
  2) **Define an error** and *minimize it*.  
  3) Today: **Bayesian learning** — a simple principle that, when followed rigorously, yields powerful methods.

- Probability often feels **non-intuitive**; rely on math + simulation to build intuition.

---

## Part 2 — Frequencies vs. Beliefs
### 2.1 Frequentist view
- Probability ≈ long-run frequency (e.g., a fair die shows each face ~1/6 over many rolls).  
- Needs many trials to “mean” something.

### 2.2 Bayesian view
- Probability quantifies **uncertainty/belief** *before* seeing extensive data.  
- You can talk about \(P(\text{Joni is next director})\) even if it has never happened: encode prior knowledge + update with evidence.

---

## Part 3 — Warm-ups with dice
### 3.1 Fair die refreshers
- \(P(\text{one}) = 1/6\); \(P(\text{two ones in a row}) = (1/6)^2\).  
- \(P(\text{not one}) = 1 - 1/6 = 5/6\).

### 3.2 Observation changes beliefs
- If, just before a final tumble, you **observe the top face = 5** on a physical die net, then after **one more roll**:
  - Opposite (1) cannot appear immediately → \(P(1)=0\).
  - Faces on the “side” could land; with a simple model, \(P(\text{side face})\approx 1/4\) each.  
- Moral: **Evidence (observation) updates the initial odds.**

### 3.3 Non-transitive dice (homework seed)
- Design dice A, B, C so that: \(A\) beats \(B\) on average, \(B\) beats \(C\), and \(C\) beats \(A\).  
- These **exist**; compute pairwise win probabilities.

---

## Part 4 — Conditional probability & Bayes’ rule
### 4.1 Read it correctly
- \(P(A\mid B)\): “**Probability of \(A\) when \(B\) is given**.”

Examples:  
- \(P(\text{Hobbit}\mid \text{height}=120\text{ cm})\).

### 4.2 Bayes’ rule (tattoo candidate 😉)
\[
P(A\mid B) \;=\; \frac{P(B\mid A)\,P(A)}{P(B)}.
\]

- **Prior** \(P(A)\): initial belief (before seeing \(B\)).  
- **Likelihood** \(P(B\mid A)\): how probable the observation is under hypothesis \(A\).  
- **Evidence** \(P(B)\): normalizer (same for all hypotheses).

### 4.3 Why \(P(B\mid A)\) is practical
- It’s often easier to measure **data distributions per class** (e.g., height histograms for Hobbits vs. Elves) once, than the reverse.

---

## Part 5 — Likelihood vs. posterior decisions
### 5.1 Maximum Likelihood (ML)
- Choose class \( \arg\max_A P(B\mid A) \).  
- **Ignores the prior**.

### 5.2 Maximum a Posteriori (MAP)
- Choose class \( \arg\max_A P(A\mid B) \propto P(B\mid A)P(A) \).  
- **Includes the prior**; crucial when classes are rare.

### 5.3 Why doctors are “natural Bayesians”
- Symptom = headache.  
  - **ML thinker** might jump to “brain tumor” (high \(P(\text{headache}\mid \text{tumor})\)).  
  - **MAP thinker** weighs rarity: \(P(\text{tumor})\) is tiny → common causes dominate first.  
- Clinical reasoning ≈ **prior × likelihood**.

---

## Part 6 — Classic paradox to test intuition: Monty Hall
- 3 doors: 1 car, 2 goats. You pick one; host opens a goat door among the other two; **should you switch?**  
- **Yes.** Switching raises win chance from \(1/3\) to **\(2/3\)**.  
- Use Bayes or conditional tree to verify. Intuition is unreliable; math isn’t.

---

## Part 7 — Estimating distributions from data
### 7.1 Histograms (discrete estimate)
- Bin counts \(\to\) relative frequencies.  
- Too **few** bins: coarse. Too **many**: spiky/zero bins.

### 7.2 Parametric fit (e.g., Gaussian)
- Fit **mean** \(\mu\) and **variance** \(\sigma^2\) → continuous **PDF**.  
- Remember: a PDF value is **not** a probability; only **integrals over intervals** are probabilities.

---

## Part 8 — Small-sample pitfalls & Bayesian fixes
### 8.1 Coin example
- Frequentist estimate after \(N\) flips: \(\hat p = \#\text{heads}/N\).  
- With **very small \(N\)** this can be wildly wrong (e.g., two flips, two heads → \(\hat p=1\)).

### 8.2 Bayesian estimate with a Beta prior
- Prior \(p \sim \mathrm{Beta}(\alpha,\beta)\) (no zeros/ones).  
- After \(h\) heads, \(t\) tails: \(p\mid \text{data} \sim \mathrm{Beta}(\alpha+h,\;\beta+t)\).  
- A common “uninformative-ish” choice: \(\alpha=\beta=1\) (uniform) or **Jeffreys prior** \(\alpha=\beta=1/2\).  
- Use the **posterior mean** \(E[p]=\frac{\alpha+h}{\alpha+\beta+h+t}\) as a stabilized estimate.

### 8.3 Convergence
- As \(N\to\infty\), **ML and MAP coincide**; with small \(N\), **MAP is safer**.

---

## Part 9 — MAP vs. ML in linear models (sketch)
- **ML line fit** ≈ ordinary least squares.  
- **MAP line fit**: put priors on slope/intercept (e.g., Gaussian around plausible values).  
  - Early samples: prior **regularizes** the solution.  
  - With more data: prior influence fades.

---

## Part 10 — Worked mini-examples

### 10.1 Hobbit vs. Elf by height (Gaussian class-conditionals)
- Priors: \(P(H), P(E)\).  
- Likelihoods: \(P(x\mid H)=\mathcal N(\mu_H,\sigma_H^2)\), \(P(x\mid E)=\mathcal N(\mu_E,\sigma_E^2)\).  
- Decision: **MAP** → pick class with larger \(P(x\mid \text{class})P(\text{class})\).

### 10.2 Monty Hall (Bayes table)
- Prior on car location: \(1/3\) each.  
- Conditional of host action differs by location → posterior favors the **other unopened door** (prob \(2/3\)).

### 10.3 Cancer test (homework skeleton)
- Given: test sensitivity/specificity are high, but **disease prevalence is low**.  
- Compute \(P(\text{cancer}\mid \text{test}=+)\) via Bayes:  
\[
\frac{P(+\mid C)P(C)}{P(+\mid C)P(C) + P(+\mid \neg C)P(\neg C)}.
\]
- Insight: with rare diseases, **false positives dominate** unless specificity is extreme.

---

## Part 11 — What to remember
1. **Read \(P(A\mid B)\) correctly** and write Bayes’ rule from muscle memory.  
2. **Likelihood** is not enough in imbalanced/risky domains — use **MAP**.  
3. **Evidence updates priors**; observations change odds.  
4. **Small data?** Prefer **Bayesian estimators** (e.g., Beta-Binomial).  
5. When intuition argues with Bayes, **trust the math** (see Monty Hall).

---

## Exercises (do at home)
1. **Non-transitive dice**: Construct A, B, C with \(P(A>B)>1/2\), \(P(B>C)>1/2\), \(P(C>A)>1/2\). Compute exact win probs.  
2. **Monty Hall derivation**: Show switching is \(2/3\) using Bayes and using a scenario tree.  
3. **Cancer test**: With prevalence \(1\%\), sensitivity \(99\%\), specificity \(95\%\), compute \(P(C\mid +)\). Then vary prevalence to see the effect of priors.  
4. **Coin with few flips**: Compare ML \(\hat p\) vs. Beta(1,1) and Beta(1/2,1/2) posterior means for \(N\in\{2,4,8\}\).  
5. **MAP line fit (conceptual)**: Explain how a Gaussian prior on slope/intercept regularizes overfitting with 3 data points.

---

## Selected quotes (verbatim sentiment from lecture)
- *“If you struggle to meet the KNN accuracy, let me know — even dtype precision can matter.”*  
- *“Probabilities aren’t intuitive; put the math on paper and check.”*  
- *“There’s a profession trained from day one to think in Bayes — medical doctors.”*  
- *“Don’t reveal medical tests to everyone; without priors you’ll panic over false positives.”*

