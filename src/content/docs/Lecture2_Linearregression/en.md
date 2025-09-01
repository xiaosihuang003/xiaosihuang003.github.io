---
title: "Linear regression, Deriving a & b for linear model via the least squares method from scratch"
subtitle: "Linear model → residual → squared error → MSE → ∂L/∂a=0, ∂L/∂b=0 → normal equations → closed form a, b"
date: 2025-09-01
lang: en
excerpt: "Step-by-step derivation of simple linear regression (y = a x + b) from scratch. We define residuals and MSE, apply the chain rule, set partial derivatives to zero, solve the normal equations for a and b, and verify with a small numeric example."
tags: [lecture, machine-learning, linear-regression, calculus, least-squares]
draft: false
---

## 1) What is the task?

Given **N** training samples $(x_1,y_1), (x_2,y_2), \ldots, (x_N,y_N)$, derive the **closed-form** solutions for $a$ and $b$ in the linear model
$$
\hat y \;=\; a x + b
$$
by minimizing the mean squared error
$$
L_{\text{MSE}}(a,b)
=\frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2.
$$
---

## 2) What the professor taught?

### 2.1 Residual  
For a single sample, the **residual** is the gap between the true value and the prediction:  
$$
e_i = y_i - \hat{y}_i, \qquad \hat{y}_i = a x_i + b .
$$
<br />

### 2.2 Squared error (per sample)  
The formula for Squared Error is the square of the difference between an observed (actual) value and a predicted value for each data point. It is calculated as (Actual Value - Predicted Value)²
$$
e_i^{2} = \big(y_i - \hat{y}_i\big)^2 .
$$
<br />

### 2.3 Mean Squared Error (MSE)  
Mean Squared Error (MSE) is a metric that measures the average squared difference between predicted and actual values in a statistical model, quantifying its error and accuracy.
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2 .
$$
<br />

### 2.4 Least Squares Method

The least squares method is a statistical and mathematical technique used to find the best-fitting line or curve for a set of data points by minimizing the sum of the squared differences (residuals) between the observed and predicted values.

$$
\min_{a,b}\; \frac{1}{N}\sum_{i=1}^{N}\big(y_i - (a x_i + b)\big)^2
$$

- $\boldsymbol{N}$: total number of samples  
- $\boldsymbol{y}_i$: observed value (data)  
- $\hat{\boldsymbol{y}}_i = a x_i + b$: predicted value (model output)  
- $\boldsymbol{y}_i - \hat{\boldsymbol{y}}_i$: residual (error for sample $i$)  
- $\boldsymbol{\sum}$: sum over all samples ($i=1\ldots \boldsymbol{N}$)  
- $\tfrac{1}{\boldsymbol{N}}$: average over samples


Machine learning’s goal here is to <span class="hl-marker">find the pair (a, b) that minimizes the MSE</span>.

<br />


### 2.5 How do we find (a, b) that minimizes MSE?

**Solution:** brute force.

We try many $(a,b)$ pairs in a bounded grid, compute the loss  
$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2,
$$
and keep the best one.

- For **a** from **-100 : 1 : +100**  
- For **b** from **-100 : 1 : +100**  
- Compute $L_{\text{MSE}}(a,b)$  
- If the loss is smaller → update the current best $(a,b)$

This mirrors the instructor’s board: “-100 : 1 : +100” means **start at -100, step by 1, end at +100**.

This simple brute-force search makes the idea clear: **we search the parameter space for the $(a,b)$ that minimizes the MSE** (later we’ll replace this with closed-form or gradient methods).

<br />

### 2.6 Find the minimum of $L_{\text{MSE}}$

We want to find the minimum of $L_{\text{MSE}}(a,b)$.

At the minimum, the derivative (slope) is zero; hence

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0.
$$

$L_{\text{MSE}}$ has two inputs: $a$ (slope) and $b$ (intercept).

Equivalently, the gradient is zero:

$$
\nabla L_{\text{MSE}}(a,b)
=\left(\frac{\partial L_{\text{MSE}}}{\partial a},\ \frac{\partial L_{\text{MSE}}}{\partial b}\right)
=(0,0).
$$

**Meaning of the partial derivatives**
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial a}$: partial derivative of the loss w.r.t. the slope $a$  
- $\displaystyle \frac{\partial L_{\text{MSE}}}{\partial b}$: partial derivative of the loss w.r.t. the intercept $b$


Example: Take $L_{\text{MSE}}(a,b)$ as a bowl, at the bottom, the slopes in all directions are zero, that point gives the best $(a,b)$.

To get the optimal solution, make the gradient zero, at that point the loss 𝐿MSE is minimal.

<br />



### 2.7 Chain rule (what we will use to take derivatives)
If a function is composed as f(g(x)\), its derivative obeys the **chain rule**:
$$
\frac{d}{dx} \, f\!\big(g(x)\big) \;=\; f'\!\big(g(x)\big)\cdot g'(x).
$$
We will apply this rule when differentiating the squared residual inside the MSE with respect to \(a\) and \(b\) in the next section.

<br />

---
## 3) What is the task?







Data: $N$ samples $(x_i,y_i)$.

- Linear model  
  $$
  \hat y_i = a\,x_i + b
  $$

- Residual  
  $$
  r_i = y_i - \hat y_i = y_i - (a x_i + b)
  $$

- Squared error (per sample)  
  $$
  r_i^2
  $$

- Mean squared error (MSE)  
  $$
  L(a,b)=\frac{1}{N}\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)^2
  $$

Goal (least squares): choose $(a,b)$ that **minimize** $L(a,b)$.

---

## 2) Minimum principle

At a minimum of $L$,
$$
\frac{\partial L}{\partial a}=0,
\qquad
\frac{\partial L}{\partial b}=0 .
$$

We will use the chain rule:
$$
\frac{d}{dz}f(g(z)) = f'(g(z))\,g'(z).
$$

---

## 3) Take the partial w.r.t. \(a\) — no steps skipped

Start
$$
\frac{\partial L}{\partial a}
= \frac{1}{N}\sum_{i=1}^{N}\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2 .
$$

Chain rule on each term:
- outer $f(u)=u^2 \Rightarrow f'(u)=2u$
- inner $g(a)=y_i-(a x_i+b) \Rightarrow g'(a)=-x_i$

Therefore
$$
\frac{\partial}{\partial a}\Big(y_i-(a x_i+b)\Big)^2
=2\big(y_i-(a x_i+b)\big)(-x_i),
$$
and
$$
\frac{\partial L}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-x_i).
$$

Set to $0$ and cancel the constant $2/N$:
$$
\sum_{i=1}^{N}\big(y_i-(a x_i+b)\big)(-x_i)=0 .
$$

Distribute $-x_i$:
$$
\sum_{i=1}^{N}\big(-x_i y_i + a x_i^2 + b x_i\big)=0 .
$$

Group the like terms (bring the sum inside each symbol):
$$
a\sum_{i=1}^{N}x_i^2 + b\sum_{i=1}^{N}x_i - \sum_{i=1}^{N}x_i y_i = 0 .
$$

Rearrange (this is the first normal equation):
$$
\boxed{\,a\sum x_i^2 + b\sum x_i = \sum x_i y_i \,}\tag{A}
$$

Also isolate $a$ (for later substitution):
$$
a=\frac{\sum x_i y_i - b\sum x_i}{\sum x_i^2}. \tag{A1}
$$

---

## 4) Take the partial w.r.t. \(b\)

Similarly,
$$
\frac{\partial}{\partial b}\Big(y_i-(a x_i+b)\Big)=-1,
$$
so
$$
\frac{\partial L}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N}2\big(y_i-(a x_i+b)\big)(-1).
$$

Set to $0$ and remove $2/N$:
$$
\sum_{i=1}^{N}(-y_i + a x_i + b)=0 .
$$

Collect terms (second normal equation):
$$
\boxed{\,a\sum x_i + bN = \sum y_i \,}\tag{B}
$$

Also isolate $b$:
$$
b=\frac{\sum y_i - a\sum x_i}{N}. \tag{B1}
$$

---

## 5) Solve by substitution — every algebra move written out

### 5.1 Solve for \(a\) in a shared-denominator form

Start from (A1) and substitute $b$ from (B1):
$$
a=\frac{\sum x_i y_i - \Big(\frac{\sum y_i - a\sum x_i}{N}\Big)\sum x_i}{\sum x_i^2}.
$$

Expand the numerator:
$$
\sum x_i y_i \;-\; \frac{(\sum x_i)(\sum y_i)}{N} \;+\; a\,\frac{(\sum x_i)^2}{N}.
$$

Split by $\sum x_i^2$:
$$
a=\frac{\sum x_i y_i}{\sum x_i^2}
\;-\;\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}
\;+\;a\,\frac{(\sum x_i)^2}{N\,\sum x_i^2}. \tag{★}
$$

Bring the $a$-term on the right to the left:
$$
a\Bigg(1-\frac{(\sum x_i)^2}{N\,\sum x_i^2}\Bigg)
=\frac{\sum x_i y_i}{\sum x_i^2}
-\frac{(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Put left side over a single denominator:
$$
a\,\frac{N\sum x_i^2-(\sum x_i)^2}{N\,\sum x_i^2}
=\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\,\sum x_i^2}.
$$

Cancel equal denominators:
$$
a\big(N\sum x_i^2-(\sum x_i)^2\big)
= N\sum x_i y_i-(\sum x_i)(\sum y_i).
$$

So
$$
\boxed{\,a=\dfrac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}\,}. \tag{C}
$$

### 5.2 Solve for \(b\) with the same denominator (no shortcuts)

Start from (B1):
$$
b=\frac{\sum y_i}{N} - a\,\frac{\sum x_i}{N}.
$$

Insert $a$ from (C):
$$
b=\frac{\sum y_i}{N}
-\frac{\sum x_i}{N}\cdot
\frac{N\sum x_i y_i-(\sum x_i)(\sum y_i)}{N\sum x_i^2-(\sum x_i)^2}.
$$

Make a common denominator $N\big(N\sum x_i^2-(\sum x_i)^2\big)$:
$$
b=\frac{(\sum y_i)\big(N\sum x_i^2-(\sum x_i)^2\big)
-(\sum x_i)\big(N\sum x_i y_i-(\sum x_i)(\sum y_i)\big)}
{\,N\big(N\sum x_i^2-(\sum x_i)^2\big)} .
$$

Expand the numerator fully:
$$
\underbrace{N(\sum y_i)(\sum x_i^2)}_{\text{term 1}}
-\underbrace{(\sum y_i)(\sum x_i)^2}_{\text{term 2}}
-\underbrace{N(\sum x_i)(\sum x_i y_i)}_{\text{term 3}}
+\underbrace{(\sum x_i)^2(\sum y_i)}_{\text{term 4}} .
$$

Notice **term 2** and **term 4** cancel exactly. Divide numerator and denominator by $N$:
$$
b=\frac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}.
$$

Thus
$$
\boxed{\,b=\dfrac{(\sum y_i)(\sum x_i^2)-(\sum x_i)(\sum x_i y_i)}
{\,N\sum x_i^2-(\sum x_i)^2\,}
\;=\; \bar y - a\,\bar x\,}, \qquad
\bar x=\frac{1}{N}\sum x_i,\ \bar y=\frac{1}{N}\sum y_i .
$$

> If all $x_i$ are equal, then $N\sum x_i^2-(\sum x_i)^2=0$: the slope is not identifiable (no $x$ variation).

---

## 6) (Optional) covariance form

$$
a=\frac{\sum (x_i-\bar x)(y_i-\bar y)}{\sum (x_i-\bar x)^2}
=\frac{\mathrm{Cov}(x,y)}{\mathrm{Var}(x)},
\qquad
b=\bar y - a\,\bar x .
$$

---

## 7) Tiny numeric check

Data: $(0,1),(1,3),(2,5),(3,7)$ (true line $y=2x+1$).  
Sums: $\sum x=6,\ \sum y=16,\ \sum x^2=14,\ \sum xy=34,\ N=4$.

Compute
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}
=\frac{136-96}{56-36}=\frac{40}{20}=2,
\qquad
b=\frac{16-2\cdot6}{4}=1.
$$

Residuals are zero $\Rightarrow$ $\text{MSE}=0$.
