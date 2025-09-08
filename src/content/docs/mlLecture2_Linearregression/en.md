---
title: "ML_2: Linear regression"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 28.8.2025 TB104 😊"
date: 2025-09-01
lang: en
excerpt: "Step-by-step derivation of simple linear regression (y = a x + b) from scratch. We define residuals and MSE, apply the chain rule, set partial derivatives to zero, solve the normal equations for a and b, and verify with a small numeric example."
tags: ["Joni Kämäräinen", machine-learning, linear-regression, calculus, least-squares]
draft: false
---

## Deriving a & b for linear model via the least squares method from scratch

## Part 1 : Introduction

![Board notes](/images/docs/Lecture%202_Linearregression/1.png)

We started from the most fundamental problem in machine learning. The teacher explained that this idea is also inside neural networks and even modern language models. The mathematics you learned in high school is enough to follow today’s lecture.

<br />

### 1.1 The linear model

We recall the familiar equation of a line:

$$
y = a x + b .
$$

This is called a linear model. For now we only have one input and one output, but the same idea extends to many inputs and many outputs.

Here $x$ is the input (an observation we can measure) and $y$ is the target variable.

<br />

### 1.2 Parameters of the model

The two parameters are slope and intercept:

* $a$ is the slope. It controls how steep the line is. If $a = 0$, the line is parallel to the $x$ axis. Larger values make the line grow faster.  
* $b$ is the intercept (bias). Without $b$, the line always passes through the origin. With $b$, we can shift the line up or down along the $y$ axis.

<br />

### 1.3 Training data

To learn, we need training data. That means pairs of samples:

$$
(x_i, y_i), \quad i = 1, \ldots, N .
$$

With zero samples, every line is equally acceptable. We cannot decide good values for $a$ and $b$ without prior information.

With one sample, say

$$
(x_1, y_1) = (1.11, 85) ,
$$

the model becomes

$$
y_1 = a x_1 + b .
$$

From this we can solve for $b$:

$$
b = y_1 - a x_1 = 85 - a \cdot 1.11 .
$$

Here $a$ can be chosen freely, and then $b$ is fixed. Any line that passes through this single point has zero error.

<br />

### 1.4 Towards more samples

Having only one sample is not enough to define a unique line. With two samples we can find exactly one line that goes through both points. That is where we continue next.

<br />

---

## Part 2 : From two samples to many

![Board notes](/images/docs/Lecture%202_Linearregression/2.png)

We now add one more sample. Suppose the second sample is

$$
(x_2, y_2) = (1.52, 110) .
$$

<br />

### 2.1 Solving with two samples

The model equations are

$$
y_1 = a x_1 + b, \qquad y_2 = a x_2 + b .
$$

Substituting the numbers gives

$$
110 = a \cdot 1.52 + b, \qquad 85 = a \cdot 1.11 + b .
$$

Subtracting the second equation from the first,

$$
a = \frac{110 - 85}{1.52 - 1.11} = 60.98 .
$$

Then substitute back to find $b$,

$$
b = 110 - a \cdot 1.52 = 17.32 .
$$

This is exactly how we solved it in high school: with two points, there is a unique line going through them.

<br />

### 2.2 Visual check

We can always verify by plotting. Draw the two points on the plane and plot the line with slope $a = 60.98$ and intercept $b = 17.32$. The line passes through both points. This gives us our first working machine learning model: given height, we can now estimate weight.

<br />

### 2.3 Moving to $N$ samples

With more than two samples, we have a system of equations:

$$
\begin{aligned}
y_1 &= a x_1 + b , \\
y_2 &= a x_2 + b , \\
&\;\;\vdots \\
y_N &= a x_N + b .
\end{aligned}
$$

In practice, the points do not fall exactly on one line, because real-world measurements contain noise. Instead of an exact solution, we look for a line that is “as close as possible” to all the points.

<br />

### 2.4 Residuals and error

For each point we define the residual

$$
r_i = y_i - \hat{y}_i , \qquad i = 1, \ldots, N .
$$

Here $\hat{y}_i = a x_i + b$ is the model’s prediction. Any choice of $a$ and $b$ will produce residuals. The question is how to find the line that minimises these residuals overall.

<br />

![Board notes](/images/docs/Lecture%202_Linearregression/3.png)

### 2.5 Defining the error

A natural idea is to sum the residuals:

$$
\text{err}_1 = \sum_{i=1}^N (y_i - \hat{y}_i) .
$$

At first this looks fine. But if some points are above the line and some below, the errors can cancel out. The total might be zero even though the line does not fit well.

<br />

A better idea is to take the absolute value:

$$
\text{err}_2 = \sum_{i=1}^N \lvert y_i - \hat{y}_i \rvert .
$$

This avoids cancellation, but at zero the slope is not well-defined, which makes optimisation harder.

<br />

So the most common choice is to square the errors:

$$
\text{err}_3 = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 .
$$

This is the **mean squared error (MSE)**. Squaring makes all errors positive, smooths the optimisation, and normalising by $N$ removes the effect of how many points we have.

<br />

### 2.6 Engineering rule

The teacher emphasised what he called *Engineering rule number one*:

If you need to measure error and you don’t know which error to use, measure the **mean squared error**. It usually leads you to the right solution.

<br />

---

## Part 3 : Minimising the error

![Board notes](/images/docs/Lecture%202_Linearregression/4.png)

We now have the mean squared error,

$$
L_{\text{MSE}} = \frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2 = \frac{1}{N} \sum_{i=1}^N (y_i - (a x_i + b))^2 .
$$

For any values of $a$ and $b$ we can compute this error. The task is to find the values that minimise it:

$$
a, b = \arg \min_{a, b} L_{\text{MSE}} .
$$

<br />

### 3.1 Brute force solution

The first approach is brute force. If nothing else works, brute force always works.

We can loop over possible values of $a$ and $b$, evaluate the error, and keep the best pair:

- For $a = -100 : 1 : +100$  
  - For $b = -100 : 1 : +100$  
    - calculate $L_{\text{MSE}}(a, b)$  
    - if smaller than best so far → update $a, b$  

Even with thousands of points, this can run quickly on a computer. Brute force is simple to implement, guarantees a solution, and gives a baseline to compare with more advanced methods.

<br />

### 3.2 Visualising the error surface

Think of $L_{\text{MSE}}$ as a function of $a$ and $b$. This is a surface in three dimensions.  

For each pair $(a, b)$ we can calculate the error. Plotting these values gives a landscape where the lowest point is the optimal solution. The darker areas correspond to lower error.  

From such a plot, we can make a rough guess: for example, $a \approx 50$, $b \approx 20$.

<br />

### 3.3 Why brute force is useful

Brute force is always an option. It is easy to implement, it runs fast enough for small ranges, and it guarantees a solution.  

Even more importantly, brute force gives us a baseline. If we later design a smarter method, we can always compare its result to brute force. If the “better” method performs worse, then something must be wrong.  

But brute force is not the only way. We also have something better, and it only needs high school math.

<br />

### 3.4 Using derivatives to find the minimum

![Board notes](/images/docs/Lecture%202_Linearregression/5.png)

The error function is

$$
L_{\text{MSE}}(a, b) = \frac{1}{N} \sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)^2 .
$$

This is a function of the parameters $a$ and $b$.  
The dataset $(x_i, y_i)$ is fixed, so the only variables that change the output are $a$ and $b$.

We want to find the minimum of this function. From high school math, you may recall:

- At a minimum, the derivative is zero.  
- For a function of two variables, we set both partial derivatives to zero:  

$$
\frac{\partial L_{\text{MSE}}}{\partial a} = 0, 
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b} = 0 .
$$

These two conditions together mean that the **gradient is zero** at the minimum point.

This is the key idea. Next, we will expand the definition of $L_{\text{MSE}}$, take the derivatives, and solve for $a$ and $b$. That will lead to the analytic solution, which connects directly to homework and next week’s exercise.

<br />

---
## Part 4 : Solving $a$ and $b$ by derivatives

![Board notes](/images/docs/Lecture%202_Linearregression/6.png)

We use only high school math. The dataset $\{(x_i,y_i)\}_{i=1}^N$ is fixed; the error changes only when $a$ or $b$ changes.

The mean squared error is

$$
L_{\text{MSE}}(a,b)=\frac{1}{N}\sum_{i=1}^{N}\bigl(y_i-(a x_i+b)\bigr)^2 .
$$

At a minimum, the derivatives are zero:

$$
\frac{\partial L_{\text{MSE}}}{\partial a}=0,
\qquad
\frac{\partial L_{\text{MSE}}}{\partial b}=0 .
$$

<br />

### 4.1 Differentiate with respect to $a$

Start from the definition and move the derivative inside the sum (linearity of differentiation). Apply the chain rule to each squared term.

$$
\begin{aligned}
\frac{\partial L_{\text{MSE}}}{\partial a}
&= \frac{1}{N}\sum_{i=1}^{N}
\frac{\partial}{\partial a}\Bigl(y_i-(a x_i+b)\Bigr)^2 \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot
\frac{\partial}{\partial a}\Bigl(y_i-(a x_i+b)\Bigr) \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot(-x_i) .
\end{aligned}
$$

Set to zero and cancel the nonzero constant $-2/N$:

$$
\sum_{i=1}^{N} x_i\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Expand and group like terms:

$$
\sum_{i=1}^{N} x_i y_i
- a\sum_{i=1}^{N} x_i^2
- b\sum_{i=1}^{N} x_i
=0
\;\;\Longleftrightarrow\;\;
a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i .
$$

Isolate $a$ in terms of $b$:

$$
a
=
\frac{\sum_{i=1}^{N} x_i y_i - b\sum_{i=1}^{N} x_i}
{\sum_{i=1}^{N} x_i^{2}} .
$$

<br />

### 4.2 Differentiate with respect to $b$

Apply the same idea:

$$
\begin{aligned}
\frac{\partial L_{\text{MSE}}}{\partial b}
&= \frac{1}{N}\sum_{i=1}^{N}
\frac{\partial}{\partial b}\Bigl(y_i-(a x_i+b)\Bigr)^2 \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot
\frac{\partial}{\partial b}\Bigl(y_i-(a x_i+b)\Bigr) \\[4pt]
&= \frac{1}{N}\sum_{i=1}^{N}
2\Bigl(y_i-(a x_i+b)\Bigr)\cdot(-1).
\end{aligned}
$$

Set to zero and cancel $-2/N$:

$$
\sum_{i=1}^{N}\Bigl(y_i-a x_i-b\Bigr)=0 .
$$

Expand and solve for $b$ in terms of $a$:

$$
\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i - N b = 0
\quad\Longrightarrow\quad
b
=
\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

<br />

### 4.3 Solve the two equations (every algebra move shown)

We now have the pair

$$
\text{(A)}\;\; a\sum_{i=1}^{N} x_i^2 + b\sum_{i=1}^{N} x_i = \sum_{i=1}^{N} x_i y_i,
\qquad
\text{(B)}\;\; a\sum_{i=1}^{N} x_i + N b = \sum_{i=1}^{N} y_i .
$$

From (B),

$$
b=\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}.
$$

Substitute this $b$ into (A):

$$
a\sum_{i=1}^{N} x_i^2
+ \left(\frac{\sum_{i=1}^{N} y_i - a\sum_{i=1}^{N} x_i}{N}\right)\!\left(\sum_{i=1}^{N} x_i\right)
= \sum_{i=1}^{N} x_i y_i .
$$

Distribute the middle term:

$$
a\sum_{i=1}^{N} x_i^2
+ \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}
- a\,\frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}
= \sum_{i=1}^{N} x_i y_i .
$$

Move the non-$a$ terms to the right and factor $a$:

$$
a\left(\sum_{i=1}^{N} x_i^2 - \frac{\left(\sum_{i=1}^{N} x_i\right)^2}{N}\right)
=
\sum_{i=1}^{N} x_i y_i
- \frac{\left(\sum_{i=1}^{N} x_i\right)\left(\sum_{i=1}^{N} y_i\right)}{N}.
$$

Clear the denominator by multiplying both sides by $N$:

$$
a\Bigl(N\sum_{i=1}^{N} x_i^2 - \bigl(\sum_{i=1}^{N} x_i\bigr)^2\Bigr)
=
N\sum_{i=1}^{N} x_i y_i
- \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr).
$$

Therefore

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2}.
$$

**Finally compute $b$ from the earlier formula (show the substitution clearly)**

We already have the two formulas:

- From $\dfrac{\partial L}{\partial b}=0$:
  $$
  (B1)\qquad b=\frac{\sum_{i=1}^{N} y_i}{N}\;-\;a\,\frac{\sum_{i=1}^{N} x_i}{N}.
  $$

- From solving for $a$:
  $$
  (\star)\qquad
  a=\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
         {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 }.
  $$

**Step 1.** Start from (B1) where you can still “see” the $a$:
$$
b=\frac{\sum_{i=1}^{N} y_i}{N} \;-\; a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

**Step 2.** Replace $a$ by the whole fraction in $(\star)$（这就是“把 \(a\) 带入”）：
$$
b=\frac{\sum_{i=1}^{N} y_i}{N}
-\frac{\sum_{i=1}^{N} x_i}{N}\;
\underbrace{\frac{N\sum_{i=1}^{N} x_i y_i - (\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)}
{N\sum_{i=1}^{N} x_i^{2} - (\sum_{i=1}^{N} x_i)^2}}_{\text{this is }a\text{ from }(\star)}.
$$

**Step 3.** Put everything over one common denominator \(N\bigl(N\sum x_i^2-(\sum x_i)^2\bigr)\):
$$
b=
\frac{
\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(N\sum_{i=1}^{N} x_i y_i-(\sum_{i=1}^{N} x_i)(\sum_{i=1}^{N} y_i)\Bigr)
}{
N\Bigl(N\sum_{i=1}^{N} x_i^2-(\sum_{i=1}^{N} x_i)^2\Bigr)
}.
$$

**Step 4.** Expand the numerator term by term:

$$
\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(N\sum_{i=1}^N x_i^2 - \Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigr)
-\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(N\sum_{i=1}^N x_i y_i - \Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigr)
$$

Distribute:

$$
N\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i^2\Bigr)
-\Bigl(\sum_{i=1}^N y_i\Bigr)\Bigl(\sum_{i=1}^N x_i\Bigr)^2
-N\Bigl(\sum_{i=1}^N x_i\Bigr)\Bigl(\sum_{i=1}^N x_i y_i\Bigr)
+\Bigl(\sum_{i=1}^N x_i\Bigr)^2\Bigl(\sum_{i=1}^N y_i\Bigr).
$$

The second and the fourth terms are equal with opposite signs, so they cancel.  
Divide numerator and denominator by $N$:

$$
b=
\frac{\Bigl(\sum_{i=1}^{N} y_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i^2\Bigr)
-\Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} x_i y_i\Bigr)}
{\,N\sum_{i=1}^{N} x_i^2 - \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2\,}.
$$


**Step 5.** Mean-value form (same result, shorter to compute):
define $\displaystyle \bar x=\frac{1}{N}\sum_{i=1}^{N}x_i$ and
$\displaystyle \bar y=\frac{1}{N}\sum_{i=1}^{N}y_i$, then
$$
\boxed{\,b=\bar y - a\,\bar x\,}.
$$


<br />

### 4.4 What to compute for the exercise

All you need are four sums and two formulas:

$$
\sum_{i=1}^{N} x_i,\qquad
\sum_{i=1}^{N} y_i,\qquad
\sum_{i=1}^{N} x_i^2,\qquad
\sum_{i=1}^{N} x_i y_i .
$$

Then

$$
a =
\frac{N\sum_{i=1}^{N} x_i y_i - \bigl(\sum_{i=1}^{N} x_i\bigr)\bigl(\sum_{i=1}^{N} y_i\bigr)}
{N\sum_{i=1}^{N} x_i^{2} - \bigl(\sum_{i=1}^{N} x_i\bigr)^2},
\qquad
b
=
\frac{\sum_{i=1}^{N} y_i}{N}
- a\,\frac{\sum_{i=1}^{N} x_i}{N}.
$$

After that you can draw the line $\hat{y} = a x + b$ and check it against the points.

### 4.5 Final explicit solutions

Given $N$ samples $(x_1,y_1),(x_2,y_2),\ldots,(x_N,y_N)$ and the linear model $y=ax+b$, the least–squares minimisers of $L_{\text{MSE}}$ are

$$
a \;=\;
\frac{N\sum_{i=1}^{N} x_i y_i \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)\Bigl(\sum_{i=1}^{N} y_i\Bigr)}
     {N\sum_{i=1}^{N} x_i^{2} \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2},
$$

$$
b \;=\; \frac{\sum_{i=1}^{N} y_i \;-\; a\sum_{i=1}^{N} x_i}{N}
\;=\; \bar{y} \;-\; a\,\bar{x},
\qquad
\bar{x}=\frac{1}{N}\sum_{i=1}^{N}x_i,\;\;
\bar{y}=\frac{1}{N}\sum_{i=1}^{N}y_i .
$$

These formulas are valid when
$$
N\sum_{i=1}^{N} x_i^2 \;-\; \Bigl(\sum_{i=1}^{N} x_i\Bigr)^2 \neq 0,
$$
which simply means the $x_i$ are not all the same. The full derivation is in Sections 4.1–4.3.

### 4.6 Quick check

Algebraic check (no numbers): the solutions above satisfy the two conditions
$$
\sum_{i=1}^N \bigl(y_i - (a x_i + b)\bigr)=0,
\qquad
\sum_{i=1}^N x_i \bigl(y_i - (a x_i + b)\bigr)=0,
$$
which are exactly the two normal equations we derived. So the line fits with zero average residual and zero correlation between $x$ and the residuals.

Tiny numeric sanity check (optional): take $(0,1),(1,3),(2,5),(3,7)$. Then
$$
\sum x_i=6,\ \sum y_i=16,\ \sum x_i^2=14,\ \sum x_i y_i=34,\ N=4.
$$
Plugging into the formulas gives
$$
a=\frac{4\cdot34-6\cdot16}{4\cdot14-6^2}=2,\qquad
b=\frac{16-2\cdot6}{4}=1,
$$
so $\hat y=2x+1$ and all residuals are $0$.


<br />

---

## Part 5 : From one input to many inputs

![Board notes](/images/docs/Lecture%202_Linearregression/7.png)

We move from a single input to multiple inputs. The idea is the same; only the notation grows.

<br />

### 5.1 Model with two inputs

For two inputs and one bias:
$$
y \;=\; w_1 x_1 \;+\; w_2 x_2 \;+\; w_0 .
$$

For sample $i$:
$$
\hat y^{(i)} \;=\; w_1 x_1^{(i)} \;+\; w_2 x_2^{(i)} \;+\; w_0 .
$$

Geometrically this is a plane in $(x_1,x_2,y)$ space.

<br />

### 5.2 Vector and matrix form (exactly as on the board)

Collect predictions, parameters, and inputs:

$$
\hat{\mathbf y} \;=\;
\begin{pmatrix}
\hat y^{(1)}\\[2pt]\hat y^{(2)}\\[2pt]\vdots\\[2pt]\hat y^{(N)}
\end{pmatrix},
\qquad
\mathbf w \;=\;
\begin{pmatrix}
w_1\\[2pt] w_2\\[2pt] w_0
\end{pmatrix},
\qquad
A \;=\;
\begin{pmatrix}
x_1^{(1)} & x_2^{(1)} & 1\\
x_1^{(2)} & x_2^{(2)} & 1\\
\vdots    & \vdots    & \vdots\\
x_1^{(N)} & x_2^{(N)} & 1
\end{pmatrix}.
$$

Shapes: $A\in\mathbb R^{N\times 3}$, $\mathbf w\in\mathbb R^{3\times 1}$, $\hat{\mathbf y}\in\mathbb R^{N\times 1}$.

Compact form (teacher’s line):
$$
\hat{\mathbf y} \;=\; A\,\mathbf w .
$$

With MSE,
$$
L_{\text{MSE}}(\mathbf w)=\tfrac1N\|\mathbf y-A\mathbf w\|_2^2,
$$
the normal equations are
$$
A^\top A\,\mathbf w \;=\; A^\top \mathbf y,
$$
and if $A^\top A$ is invertible,
$$
\boxed{\;\mathbf w=(A^\top A)^{-1}A^\top \mathbf y\;}
$$
(“solve for $\mathbf w$”).

This extends to any number of inputs by adding columns to $A$ and entries to $\mathbf w$.

<br />

### 5.3 “Nonlinear” via feature expansion (squares only, like the board)

Keep a **linear model in the features**, but change the columns of $A$ to include squared terms:

$$
\hat y \;=\; w_3\,x_1^2 \;+\; w_4\,x_2^2 \;+\; w_1\,x_1 \;+\; w_2\,x_2 \;+\; w_0 .
$$

Build
$$
A \;=\;
\begin{pmatrix}
x_1^{(1)2} & x_2^{(1)2} & x_1^{(1)} & x_2^{(1)} & 1\\
\vdots     & \vdots      & \vdots    & \vdots    & \vdots\\
x_1^{(N)2} & x_2^{(N)2} & x_1^{(N)} & x_2^{(N)} & 1
\end{pmatrix},
\qquad
\mathbf w =
\begin{pmatrix}
w_3\\ w_4\\ w_1\\ w_2\\ w_0
\end{pmatrix}.
$$

Again $\hat{\mathbf y}=A\mathbf w$ and the solution is the **same**
$$
\mathbf w=(A^\top A)^{-1}A^\top\mathbf y.
$$

<br />

### 5.4 A quick note on robust fitting (RANSAC idea)

Outliers happen. The sketched trick:
pick two points at random, fit the line/plane, choose a distance threshold, count inliers, repeat, keep the model with the most inliers, then re-fit using those inliers. It works well, but you must pick the inlier threshold (no free lunch).

<br />

### 5.5 What to implement

Prepare $A$ with one row per sample and one column per feature plus a column of ones. Build $\mathbf y$. Then compute
$$
\mathbf w=(A^\top A)^{-1}A^\top \mathbf y,
$$
plot $\hat{\mathbf y}=A\mathbf w$, and compare to the data.
