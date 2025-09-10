---
title: "Machine Learning 3: Linear classification"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Mon 1.9.2025 · K1704 😊"
date: 2025-09-02
lang: en
excerpt: "Recap of linear regression → simple baseline → classification. k-NN (distance/k/complexity), line-fitting view, step rule, logistic (sigmoid) output, MSE gradients, and why there’s no closed-form—setup for neural nets."
tags: ["Joni Kämäräinen","machine-learning","linear-classification","step-function", "sigmoid-function", "logistic"]
draft: false 
---

<details>
<summary><strong>Table of contents (Click ▶️ when needed.)</strong></summary>

- [Part 1 : Recap from last week course](#part-1--recap-from-last-week-course)
  - [1.1 Model and training data](#11-model-and-training-data)
  - [1.2 Error and how we solved it](#12-error-and-how-we-solved-it)
  - [1.3 Why the analytic solution matters](#13-why-the-analytic-solution-matters)
  - [1.4 What kind of problem this is](#14-what-kind-of-problem-this-is)
- [Part 2 : Baseline and classification](#part-2--baseline-and-classification)
  - [2.1 A simple baseline](#21-a-simple-baseline)
  - [2.2 Moving to classification](#22-moving-to-classification)
  - [2.3 Output type changes](#23-output-type-changes)
  - [2.4 What the observation is](#24-what-the-observation-is)
- [Part 3 : Example: Hobbits vs. Elves](#part-3--example-hobbits-vs-elves)
  - [3.1 Learning from training examples](#31-learning-from-training-examples)
  - [3.2 Orcs’ trap story](#32-orcs-trap-story)
  - [3.3 Generating data](#33-generating-data)
  - [3.4 Accepting overlap](#34-accepting-overlap)
  - [3.5 Moving to two dimensions](#35-moving-to-two-dimensions)
  - [3.6 Training vs. inference](#36-training-vs-inference)
  - [3.7 First classification idea](#37-first-classification-idea)
- [Part 4 : Nearest neighbor classifier](#part-4--nearest-neighbor-classifier)
  - [4.1 Name and idea](#41-name-and-idea)
  - [4.2 Training (store everything)](#42-training-store-everything)
  - [4.3 Inference (find the closest and copy its label)](#43-inference-find-the-closest-and-copy-its-label)
  - [4.4 Simple baselines for classification](#44-simple-baselines-for-classification)
  - [4.5 Takeaways](#45-takeaways)
- [Part 5 : k-NN considerations → line fitting](#part-5--k-nn-considerations--line-fitting)
  - [5.1 What we can tweak in k-NN](#51-what-we-can-tweak-in-k-nn)
  - [5.2 Can we classify by fitting a line?](#52-can-we-classify-by-fitting-a-line)
  - [5.3 How do we measure error for classification?](#53-how-do-we-measure-error-for-classification)
- [Part 6 : From line fitting to a step, then to sigmoid](#part-6--from-line-fitting-to-a-step-then-to-sigmoid)
  - [6.1 Step rule and the discriminator](#61-step-rule-and-the-discriminator)
  - [6.2 Approximate the step with a logistic (sigmoid)](#62-approximate-the-step-with-a-logistic-sigmoid)
  - [6.3 Training signal (for now)](#63-training-signal-for-now)
- [Part 7 : MSE with sigmoid output, gradients (step-by-step, clean)](#part-7--mse-with-sigmoid-output-gradients-step-by-step-clean)
  - [7.1 Model, targets, loss](#71-model-targets-loss)
  - [7.2 Why ∂zᵢ/∂b = 1 and ∂zᵢ/∂a = xᵢ?](#72-why--1-and--x)
  - [7.3 Derivative of the sigmoid](#73-derivative-of-the-sigmoid)
  - [7.4 Differentiate the MSE (chain rule)](#74-differentiate-the-mse-chain-rule)
  - [7.5 What each factor means](#75-what-each-factor-means)
  - [7.6 Why we don’t have a closed-form solution](#76-why-we-dont-have-a-closed-form-solution)

</details>

## Part 1 : Recap from last week course

![Board notes](/images/docs/Lecture3_Linearclassification/1.png)

We started from the idea that one observation can be written as a function, $y = f(x)$. That makes it a machine learning problem for us: the model gives a prediction $\hat{y}$ and we compare it with the ground truth $y$.

<br />

### 1.1 Model and training data

We used a very simple linear model,
$$
\hat{y} = a x + b ,
$$
where $a$ and $b$ are the learning parameters. With $N$ examples, the training data is
$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

<br />

### 1.2 Error and how we solved it

To choose $a$ and $b$, we minimised the error between the ground truth and our prediction:
$$
\mathcal{L} = \sum_{i=1}^{N} (y_i - \hat{y}_i)^2 .
$$
We then set the gradients to zero to get the optimum:
$$
\frac{\partial \mathcal{L}}{\partial a} = 0, \qquad
\frac{\partial \mathcal{L}}{\partial b} = 0 .
$$
This gives an analytic solution (the one we also used in the homework).

<br />

### 1.3 Why the analytic solution matters

It is very fast to compute: we plug in the points, use the sums, and we get the estimate in milliseconds. That speed makes sense in real-time situations (the lecture example was an airplane system making rotation decisions about a thousand times per second).

<br />

### 1.4 What kind of problem this is

Our output is a real value, $y \in \mathbb{R}$, so this is a **regression problem**. Regression shows up all the time, and whatever we do later, we compare it to linear regression first.

<br />

---

## Part 2 : Baseline and classification

![Board notes](/images/docs/Lecture3_Linearclassification/2.png)

<br />

### 2.1 A simple baseline

We first added a very simple baseline to judge whether our linear regression is any good. The idea: **don’t learn anything**—just predict the average of all training targets. On the board this is written as “$\hat{y}$ = average of all training data $y_i$”, i.e.
$$
\hat{y}=\frac{1}{N}\sum_{i=1}^{N} y_i .
$$
This is trivial to compute, and we should always implement a baseline like this. Our linear regression should be clearly better than it; if it isn’t, then something is weird with the data and we need to check it.

<br />

### 2.2 Moving to classification

From there we switched to another important ML problem: **classification**. The main message for this lecture is that the same linear line fitting can work for classification too, but we need a few small tricks.

<br />

### 2.3 Output type changes

Here the output is **not a real value**. Instead it is one of **discrete values** (labels). On the board:
$$
y \in \{1,2,3\}.
$$
So the task is to decide which class the input belongs to.

<br />

### 2.4 What the observation is

$x$ is the observation. It can be many things:
- image (the examples in class often use images),
- temperature,
- sound,
- or a combination of these.

A typical story is autonomous driving: the system takes images many times per second and needs to detect things like pedestrians, vehicles, and cyclists, and then pass their information to the driving system. That turns it into a classification problem using discrete labels.

<br />

---

## Part 3 : Example: Hobbits vs. Elves

![Board notes](/images/docs/Lecture3_Linearclassification/3.png)

<br />

### 3.1 Learning from training examples

We still have the model $y = f(x)$, and the parameters of $f$ are learned from training examples. This part works the same way as regression: collect data, then fit the function.  

<br />

### 3.2 Orcs’ trap story

The lecture introduced a story. We are orcs and we have a trap. If the trap catches hobbits, that’s good, we like to eat them. If the trap catches elves, that’s dangerous, we are in trouble. So the observation $x$ could be the **height** of the creature.  

We assume hobbits are shorter, and elves are taller. That is the feature we use to separate them.  

<br />

### 3.3 Generating data

To simulate, we assume in Middle-earth the distribution of height is normal, just like animal traits in our world. We generate five random samples for hobbits and five for elves. Hobbits are shown in one color, elves in another.  

In the sample, we notice one very tall hobbit and one rather short elf. This means the two classes are not completely separate, they overlap. In real life this is typical, and it means we cannot expect 100% classification accuracy.  

<br />

### 3.4 Accepting overlap

Because of overlap, we must allow for errors. Whatever system we build, some mistakes will happen.  
- Example: in cancer detection, not all cancers can be detected, and sometimes healthy samples are misclassified as cancerous.  

So we must expect some error rate in classification.

<br />

### 3.5 Moving to two dimensions

So far we only used one feature: height. But we could add another, like weight. The assumption: hobbits might be shorter and heavier, while elves are taller and slimmer.  

That gives us **two-dimensional data**:  
- $x_1 =$ height  
- $x_2 =$ weight  

Now each training point is a pair $(x_1, x_2)$, and $y$ is the class label. For the training data we can assign numerical labels, e.g. $y=0$ for hobbit and $y=1$ for elf.

<br />

### 3.6 Training vs. inference

In machine learning we usually separate two stages:  
1. **Training** — we learn the parameters of the model from labeled examples.  
2. **Inference** — we test the model on a new sample to decide its class.  

So if a new point comes in, the task is: decide whether it is a hobbit or an elf.

<br />

### 3.7 First classification idea

In the lecture, a new sample was shown on the board. Students thought about how to classify it. The intuitive answer was: classify it as hobbit, because it is very close to other hobbit points.  

This leads naturally to one of the first classification methods: using closeness to training samples.

<br />

---

## Part 4 : Nearest neighbor classifier

![Board notes](/images/docs/Lecture3_Linearclassification/4.png)

<br />

### 4.1 Name and idea
We moved from the “closeness” intuition to a concrete method: the **Nearest Neighbour classifier** (1-NN, and later $k$-NN). The idea is simple, a new sample should take the same class as the closest training sample.

<br />

### 4.2 Training (store everything)
Training is trivial here, **we just store all training examples** (features and their class labels). There’s no parameter fitting at this stage.

<br />

### 4.3 Inference (find the closest and copy its label)
When a new sample arrives, we do the computation:
1. For **all** training samples, calculate the distance to the new sample.  
   (Any reasonable distance is fine; we only need a way to compare who is closer.)
2. If the distance is **smaller than the best so far**, update the current best and **select** that sample.
3. **Return the class label** of the sample with the **shortest distance**.

That’s the whole algorithm. We’ll implement this in Python in exercises.

<br />

### 4.4 Simple baselines for classification
We also set baselines to judge if our classifier is any good:
- **Random class** — output a random label from the class set.
- **Most common label** — always output the label that appears most in the training data.

The second baseline is usually better than random, especially when one class **dominates** (e.g., 99% of the samples are from one class). If the “most common label” already gives 99% accuracy, our method must beat **that** number to be meaningful.

<br />

### 4.5 Takeaways
- Nearest neighbour is a **very simple** algorithm, yet **surprisingly powerful**.  
- Always compare against the **simple baseline** for your data; it tells us how difficult the problem is and what performance we must beat.

<br />

---

## Part 5 : k-NN considerations → line fitting

![Board notes](/images/docs/Lecture3_Linearclassification/5.png)

<br />

### 5.1 What we can tweak in k-NN
When we start to study what we can change in nearest neighbour, a whole world opens:

- **Distance.** We can choose the distance measure.  
  Euclidean in 1D looks like  
  $$
  d(x,x_i)=\sqrt{(x-x_i)^2},
  $$
  and a **city-block** (L1) style distance is  
  $$
  d(x,x_i)=|x-x_i|.
  $$
  There are many other distances; we should pick what fits the data.

- **Number of neighbours.** $k$ can be $1,3,\dots$  
  For two classes, $k=2$ can tie (one hobbit, one elf), so $k=3$ avoids the tie.

- **Computation time.** A basic 1-NN scan is a loop over all training points and can be slow for huge datasets, but **fast NN methods exist** (often approximate) that partition the space and speed up the search.

- **1D vs 2D distances in k-NN:**  
  In **1D**, Euclidean (L2) and city-block (L1) distances coincide, both reducing to  
  $$
  |x-x_i|.
  $$  
  In **2D and higher dimensions**, they differ:  
  - Euclidean (L2) in 2D:  
    $$
    d(\mathbf{x},\mathbf{x_i})=\sqrt{(x_1-x_{i1})^2+(x_2-x_{i2})^2},
    $$
    which produces circular neighbourhoods.  
  - City-block (L1) in 2D:  
    $$
    d(\mathbf{x},\mathbf{x_i})=|x_1-x_{i1}|+|x_2-x_{i2}|,
    $$
    which produces diamond-shaped neighbourhoods.  

  This difference changes the **decision boundaries of k-NN**: with L2, boundaries are smoother and rounded; with L1, they align with coordinate axes. Choosing the right one depends on data geometry.

**🤔 Homework:** Give 2D points for which **1-NN** and **3-NN** give **different** classifications.

<br />

### 5.2 Can we classify by fitting a line?
![Board notes](/images/docs/Lecture3_Linearclassification/6.png)


Let’s try to cast classification as **line fitting**. We assign class targets
$$
y=-1 \;\text{for hobbit}, \qquad y=+1 \;\text{for elf}.
$$
Then we fit a line
$$
\hat y = a x + b
$$
to those $(x,y)$ pairs (exactly like in regression).  
Once the line is fitted, we use the simple **classification rule**
$$
\hat y < 0 \Rightarrow \text{hobbit}, \qquad
\hat y > 0 \Rightarrow \text{elf}.
$$
The point where $\hat y=0$ is the **discriminator** (decision boundary).

In the toy test shown in class, we fitted the line and then evaluated a few new samples; with this data the rule above classified them all correctly.


![Board notes](/images/docs/Lecture3_Linearclassification/7.png)

<br />

### 5.3 How do we measure error for classification?
For classification the error is **binary**:
- if $\hat y$ gives the **correct** class ⇒ $\text{err}=0$,
- if $\hat y$ gives the **incorrect** class ⇒ $\text{err}=1$.

We don’t allow “maybe” outputs.  
Notice the mismatch: line fitting minimises **squared error**, not this 0/1 error. That mismatch can cause trouble later — we’ll fix it next.

<br />

---

## Part 6 : From line fitting to a step, then to sigmoid

![Board notes](/images/docs/Lecture3_Linearclassification/8.png)

<br />

### 6.1 Step rule and the discriminator

We keep the fitted line $\hat y = a x + b$ and define the **discriminator** at $\hat y=0$.  
The step rule on the board uses **$\pm1$** labels:

$$
y =
\begin{cases}
+1, & x > x_d,\\[4pt]
-1, & x < x_d .
\end{cases}
$$

Equivalently with the line’s sign:

$$
\hat y < 0 \Rightarrow \text{hobbit}, \qquad
\hat y > 0 \Rightarrow \text{elf}.
$$


![Board notes](/images/docs/Lecture3_Linearclassification/9.png)

<br />

### 6.2 Approximate the step with a logistic (sigmoid)

Because a hard step is discontinuous, we use its smooth approximation, the logistic (“logsig”):

$$
\operatorname{logsig}(x)=\frac{1}{1+e^{-x}} .
$$

Compose it with the line:

$$
\hat y \;=\; \operatorname{logsig}(a x + b)
=\frac{1}{1+e^{-(a x + b)}} .
$$

Here $a$ controls how sharp the transition is, and $b$ moves the threshold.  
We relabel classes to match the $[0,1]$ range (hobbit $=0$, elf $=1$).

<br />

### 6.3 Training signal (for now)

With this smooth output we can still minimise **mean squared error** between the targets in $\{0,1\}$ and $\hat y$ to fit $a$ and $b$.

<br />

---

## Part 7 : MSE with sigmoid output, gradients (step-by-step, clean)

![Board notes](/images/docs/Lecture3_Linearclassification/10.png)

<br />

### 7.1 Model, targets, loss

Model (1D feature \(x\)):

$$
z_i = a x_i + b
$$

$$
\hat y_i = \sigma(z_i) = \frac{1}{1+e^{-z_i}}
$$

Targets:

$$
y_i \in \{0,1\}
$$

Mean Squared Error (MSE):

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-\hat y_i\bigr)^2
$$

<br />

### 7.2 Why $ \frac{\partial z_i}{\partial b} = 1 $ and $ \frac{\partial z_i}{\partial a} = x_i $?

We have a straight line:

$$
z_i = a x_i + b
$$

Differentiate w.r.t. \(b\):

$$
\frac{\partial z_i}{\partial b} = 1
$$

Differentiate w.r.t. \(a\):

$$
\frac{\partial z_i}{\partial a} = x_i
$$

So changing \(b\) shifts the line up/down by 1 per unit of \(b\); changing \(a\) tilts the line, scaled by \(x_i\).

<br />

### 7.3 Derivative of the sigmoid

Definition:

$$
\sigma(z)=\frac{1}{1+e^{-z}}
$$

Derivative:

$$
\frac{d\sigma}{dz}=\sigma(z)\bigl(1-\sigma(z)\bigr)
$$

<br />

### 7.4 Differentiate the MSE (chain rule)

Residual:

$$
e_i = y_i - \hat y_i
$$

Loss in residual form:

$$
\mathcal{L}_{\text{MSE}}=\frac{1}{N}\sum_{i=1}^{N} e_i^{\,2}
$$

Derivative of the outer square:

$$
\frac{\partial}{\partial e_i}\bigl(e_i^{\,2}\bigr)=2e_i
$$

Residual vs. output:

$$
\frac{\partial e_i}{\partial \hat y_i} = -1
$$

Sigmoid chain (compose with the line):

$$
\frac{\partial \hat y_i}{\partial a} = \frac{d\sigma}{dz}\Big|_{z=z_i}\cdot \frac{\partial z_i}{\partial a}
$$

$$
\frac{\partial \hat y_i}{\partial a} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot x_i
$$

$$
\frac{\partial \hat y_i}{\partial b} = \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot 1
$$

Now put the chain together for \(a\):

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N} 2e_i \cdot \frac{\partial e_i}{\partial \hat y_i}\cdot \frac{\partial \hat y_i}{\partial a}
$$

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{1}{N}\sum_{i=1}^{N} 2e_i \cdot (-1)\cdot \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\,x_i
$$

Similarly for \(b\):

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
=\frac{1}{N}\sum_{i=1}^{N} 2e_i \cdot (-1)\cdot \sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\cdot 1
$$

Replace \(e_i=y_i-\hat y_i\) and absorb the minus sign into the residual (equivalent, cleaner form):

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)\,x_i
$$

$$
\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
=\frac{2}{N}\sum_{i=1}^{N}\bigl(\hat y_i-y_i\bigr)\,\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

<br />

### 7.5 What each factor means

- Residual:
$$
\hat y_i - y_i
$$

- Sigmoid slope:
$$
\sigma(z_i)\bigl(1-\sigma(z_i)\bigr)
$$

- Input scale (only for \(a\)):
$$
x_i
$$

Near 0.5 the sigmoid slope is large (bigger learning signal). Near 0 or 1 it is small (saturated).

<br />

### 7.6 Why we don’t have a closed-form solution

The parameters \(a,b\) sit **inside** the nonlinear sigmoid in the sums. Setting the two gradients to zero does not simplify to closed-form equations (unlike linear regression). We therefore **iterate**:

Learning-rate update:

$$
a \leftarrow a - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial a}
$$

$$
b \leftarrow b - \eta\,\frac{\partial \mathcal{L}_{\text{MSE}}}{\partial b}
$$

Repeat until the loss stops decreasing.
