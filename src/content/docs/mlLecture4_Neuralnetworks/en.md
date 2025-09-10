---
title: "ML_4: Neural networks"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 4.9.2025 TB104 😊"
date: "2025-09-08"
lang: "en"
excerpt: "The foundations of neural networks: from biological inspiration to LTUs, Hebbian learning, XOR limitations, nonlinear activations, backpropagation, and modern frameworks (TensorFlow & PyTorch)."
tags: ["Joni Kämäräinen", "machine-learning", "neural-networks", "TensorFlow", "PyTorch"]
draft: false
---


## Part 1 : From Brains to Neural Networks

![Board notes](/images/docs/mlLecture4_Neuralnetworks/1.png)

### 1.1 Why study neural networks?
- When engineers face bottlenecks, they often borrow ideas from other sciences (biology, human sciences, etc.).  
- The human brain is the most intelligent "computer" we currently know, and thus serves as inspiration for machine learning.  

### 1.2 Brain and evolution
- Brain size is limited by **skull/birth canal** — it cannot grow indefinitely.  
- Food availability also affects evolution (e.g., island populations becoming smaller).  
- Number of neurons across different species:
  - Starfish: ~500  
  - Leech: ~10,000  
  - Fruit fly: ~100,000  
  - Cockroach: ~1,000,000  
  - Turtle: ~10,000,000  
  - Hamster: ~100,000,000  
  - Owl: ~1,000,000,000  
  - Gorilla: ~30,000,000,000  
  - Human: ~100,000,000,000  
- Key factor is not only the number of neurons, but **the number of connections** (~$10^{13}$ synapses in the human brain).  

### 1.3 Biological neuron structure
- **Dendrites** = inputs ($x_1, x_2, …$)  
- **Synapses** = weights (can excite or inhibit)  
- **Cell body (soma)** = computational unit (like linear model + activation function)  
- **Axon** = output ($y$)  

➡️ **Artificial neuron model = Inputs × Weights → Summation → Activation function → Output**

### 1.4 Notes
- Biological neurons transmit signals as **spikes**, while artificial neurons use continuous values.  
- This leads to emerging fields such as:  
  - **Spiking Neural Networks (SNNs)**  
  - **Neuromorphic chips**

### 1.5 Artificial neuron as a linear model
- In essence, an artificial neuron can be described as a **linear model**: a weighted sum of inputs plus a bias.  
- This connects directly to what we studied in **linear regression** and **classification**.  
- These earlier topics serve as the foundation for understanding neural networks.

---

## Part 2 : Linear Model and the First Neural Network Wave (1943)

![Board notes](/images/docs/mlLecture4_Neuralnetworks/2.png)

### 2.1 Linear model as a neuron
- The neuron can be modeled as a **linear combination of inputs** plus a bias:  
  $$
  y = \sum_i w_i x_i + w_0
  $$
- This system can already perform **linear regression**.  
- For classification, however, linear regression is not sufficient → need thresholding or a non-linear activation.  

### 2.2 Towards classification
- Binary classification: only two classes (0/1).  
- Fix: apply a **threshold function** (or later a sigmoid/logistic).  
- In code:  
  - First compute the weighted sum.  
  - Then apply threshold (or sigmoid) to decide the output.  

### 2.3 Historical note — Wave 1 (1943)
- **McCulloch & Pitts (1943): Linear Threshold Unit (LTU)**  
- Definition:  
  $$
  y = 
    \begin{cases}
      1 & \text{if } w_1x_1 + w_2x_2 + w_0 \geq \theta \\
      0 & \text{if } w_1x_1 + w_2x_2 + w_0 < \theta
    \end{cases}
  $$
- Typically threshold $\theta = 0$.  
- Motivation: simulate logic gates (basis of digital computers).  

### 2.4 Example: AND gate
- Inputs: $x_1, x_2 \in \{0,1\}$  
- Desired output: $y=1$ only when both inputs are 1.  
- Choose weights: $w_1 = w_2 = \tfrac{2}{3},\ w_0 = -1$  

Check:  
$$
\begin{aligned}
(0,0):\ & -1<0 \ \Rightarrow y=0 \\
(1,0)\ \text{or}\ (0,1):\ & \tfrac{2}{3}-1=-\tfrac{1}{3}<0 \ \Rightarrow y=0 \\
(1,1):\ & \tfrac{4}{3}-1=\tfrac{1}{3}>0 \ \Rightarrow y=1
\end{aligned}
$$  

✅ Works as AND gate.  

### 2.5 Example: OR gate
![Board notes](/images/docs/mlLecture4_Neuralnetworks/3.png)

- Inputs: $x_1, x_2 \in \{0,1\}$  
- Desired output: $y=1$ if either input is 1.  
- Choose weights (basic version): $w_1 = w_2 = 1,\ w_0 = -1$  
  - (0,0): $-1<0 \Rightarrow y=0$  
  - (1,0) or (0,1): $1-1=0 \Rightarrow y=1$  
  - (1,1): $2-1=1>0 \Rightarrow y=1$  

✅ Works as OR gate, but boundary is sensitive.  

Improvement: $w_1 = w_2 = \tfrac{3}{2},\ w_0 = -1$ gives a better margin (less sensitive).  

### 2.6 Homework: NAND gate
> Design a **NAND gate** with the LTU model.  
> - Hint: NAND = NOT(AND).  
> - Start from the AND gate weights and adjust them.  

### 2.7 Key takeaway
- A simple LTU with the right weights can implement logical functions.  
- This historical step showed that neural units could, in principle, form the basis of computation.  

---

## Part 3 : Wave 2 (1949) — Hebbian Learning

![Board notes](/images/docs/mlLecture4_Neuralnetworks/4.png)

### 3.1 Hebbian learning rule
- Proposed as an update mechanism for weights in LTU.  
- Update rule:  
  $$
  w_i^{t+1} = w_i^t + \eta (y - \hat{y}) x
  $$
- Where:  
  - $y$ = true output (ground truth)  
  - $\hat{y}$ = estimated output  
  - error = $y - \hat{y}$  
  - $\eta$ = learning rate (e.g. 0.1)  

### 3.2 Learning dynamics
- If the estimate is too high → weights decrease.  
- If the estimate is too low → weights increase.  
- Over time, weights converge to a point where $y \approx \hat{y}$.  

### 3.3 Learning rate scheduling
- Large $\eta$ may cause oscillation (error does not settle).  
- Solution: **decrease learning rate gradually** to ensure convergence.   

---

## Part 4 : Limits of a Single Neuron — XOR and the Second Winter

![Board notes](/images/docs/mlLecture4_Neuralnetworks/5.png)

### 4.1 Linear separability
- A perceptron can only solve problems where data is **linearly separable** (a single line/hyperplane divides classes).  
- Example: AND, OR are solvable.  

### 4.2 XOR problem
- XOR truth table:  
  - (0,0) → 0  
  - (1,0) → 1  
  - (0,1) → 1  
  - (1,1) → 0  
- Not linearly separable — cannot be solved with a single perceptron.  

### 4.3 Second AI Winter
- 1969: Minsky & Papert showed limitations of perceptrons (esp. XOR).  
- Led to skepticism and reduced funding → “second winter.”  

### 4.4 Multi-layer idea
- Biological brains have **many neurons working together**.  
- If we combine multiple neurons (hidden layer), XOR *can* be represented.  
- Backpropagation algorithm (1970s–80s) enabled efficient training of such networks.  

---

## Part 5 : From Linear to Nonlinear — Logistic, Loss & Gradient Descent

![Board notes](/images/docs/mlLecture4_Neuralnetworks/6.png)

### 5.1 Activation functions
- To move beyond linear regression, we use nonlinear activations:  
  - **Sigmoid (logistic):**  
    $$\sigma(z) = \frac{1}{1+e^{-z}} \quad \in (0,1)$$  
  - **Tanh:**  
    $$\tanh(z) \in (-1,1)$$  
  - Linear (identity), ReLU, etc. (later developments).  

### 5.2 Loss functions
- Regression: Mean Squared Error (MSE)  
  $$L = \frac{1}{N} \sum (y - \hat{y})^2$$  
- Classification: Cross-entropy (introduced later).  

### 5.3 Gradient Descent
- Compute gradient of loss w.r.t. weights:  
  $$\nabla_w L = \left( \frac{\partial L}{\partial w_1}, \frac{\partial L}{\partial w_2}, … \right)$$  
- Update rule:  
  $$
  w^{(t+1)} = w^{(t)} - \eta \, \nabla_w L
  $$
- $\eta$: learning rate — too large → divergence, too small → slow training.  
- **Learning rate scheduling** helps convergence.  

### 5.4 Universal Approximation Theorem
- With at least **one hidden layer** and nonlinear activation, a neural network can approximate *any* function (Cybenko 1989).  

### 5.5 Multi-layer perceptrons & Backpropagation
![Board notes](/images/docs/mlLecture4_Neuralnetworks/7.png)

- A **single LTU** cannot solve problems like XOR.  
- Solution: combine multiple neurons into a **multi-layer perceptron (MLP)**.  
  - Example: two hidden neurons ($y_1, y_2$) feeding into an output neuron.  
  - This structure allows nonlinear decision boundaries.  

- **Loss function**: still Mean Squared Error (MSE).  
- **Training challenge**: how to update weights in hidden layers?  

➡️ **Backpropagation algorithm**  
- Compute output error (difference between prediction and target).  
- Propagate error backwards through the network using the **chain rule**.  
- Update all weights (input → hidden, hidden → output) via gradient descent.  

This breakthrough in the 1970s–80s enabled practical training of deep networks, overcoming the XOR limitation.

### 5.6 Multi-class classification

![Board notes](/images/docs/mlLecture4_Neuralnetworks/8.png)

- So far we only considered **binary classification** (0/1).  
- For **multi-class problems (N classes)**:  
  - The output layer has **N neurons**, one for each class.  
  - Example: 3 classes → output = $(y_1, y_2, y_3)$.  
- **Ground truth labels** use **one-hot encoding**:  
  - Class 1 → (1, 0, 0)  
  - Class 2 → (0, 1, 0)  
  - Class 3 → (0, 0, 1)  
- During training:  
  - Forward pass: compute outputs for all classes.  
  - Loss: often **cross-entropy** with softmax activation at the output.  
  - Backward pass: propagate error through all weights using backpropagation.  

➡️ This generalization allows neural networks to handle **any number of classes**.

---

## Part 6 : Practice with Frameworks — TensorFlow & PyTorch

![Board notes](/images/docs/mlLecture4_Neuralnetworks/9.png)

### 6.1 TensorFlow vs. PyTorch
- Both are the **mainstream deep learning frameworks**.  

- **TensorFlow (Google)**  
  - Chosen for this course *“for the sake of diversity.”*  
  - `Sequential` API is very simple: you can add layers one by one.  
  - Good for a **first neural network demo** (e.g., linear regression).  
  - Installation may throw *“some little errors”* but it still works.  

- **PyTorch (Meta/Facebook)**  
  - *“PyTorch, I think, starts to be way more popular than TensorFlow.”*  
  - More flexible and closer to raw Python, better for complex models.  
  - *“PyTorch is more educative, but it’s more difficult too.”*  
  - Will be used in the **Deep Learning course** later.  

- **Summary**  
  - **TensorFlow** → easier, beginner-friendly, good for demos.  
  - **PyTorch** → more popular in research, flexible, more educative but harder.  

- Quote from the lecture:  
  > *“Nobody does backprop manually, except if you want to learn. For real work, we use TensorFlow or PyTorch.”*  

---

### 6.2 Simple regression with a single neuron
- Model: `Dense(units=1, activation="linear")`  
- Optimizer: SGD (stochastic gradient descent).  
- Loss: Mean Squared Error (MSE).  
- Training (`fit`) shows error decreasing over epochs.  
- ✅ Learns a regression line (like linear regression).  

---

### 6.3 Multi-layer perceptron (MLP) regression
- Task: approximate a **sinusoidal wave**.  
- Input: $t$ (time).  
- Hidden layer: 50 neurons, **sigmoid activation**.  
- Output: $y \approx \sin(t)$.  
- Demonstrates the **Universal Approximation Theorem**:  
  - With enough neurons, even one hidden layer can approximate any function.  
- Training involves tuning **learning rate** and **epochs** to reduce oscillation and error.  

---

### 6.4 Classification example
- Task: classify “**Hobbits vs. Elves**.”  
- Output layer: 2 neurons (binary classification).  
- Labels encoded with **one-hot encoding**:  
  - Hobbit → (1,0)  
  - Elf → (0,1)  
- Loss: cross-entropy.  
- Accuracy improves with training epochs (e.g., 86% → 92%).  

---

### 6.5 Homework
- Try training your own neural networks in **TensorFlow**.  
- Experiment with:  
  - Different learning rates.  
  - More epochs.  
  - More hidden neurons/layers.  
- Challenge: beat the accuracy of **Hebbian learning** and the teacher’s demos.  

---

## Summary

1. **From Brains to Neural Networks**  
   - Neural networks are inspired by biological neurons: inputs, weights (synapses), summation, and activations.  
   - The brain shows us the power of massive interconnections (~$10^{13}$ synapses).  

2. **Wave 1 (1943): Linear Threshold Units**  
   - McCulloch & Pitts showed that single neurons can implement logical functions (AND, OR, NAND).  
   - But they had no learning mechanism.  

3. **Wave 2 (1949): Hebbian Learning**  
   - Introduced the idea of adjusting weights based on error.  
   - Early form of learning, but sensitive to learning rate and convergence.  

4. **Limits of Single Neurons (XOR)**  
   - A perceptron can only solve linearly separable problems.  
   - XOR exposed this limitation → led to skepticism and the second AI winter.  

5. **Nonlinear Activations & Backpropagation**  
   - Logistic/sigmoid, tanh, and other activations enable non-linear decision boundaries.  
   - Backpropagation (1970s–80s) made it possible to train multi-layer perceptrons.  
   - Universal Approximation Theorem (1989): one hidden layer is enough to approximate any function.  

6. **Modern Practice: TensorFlow & PyTorch**  
   - TensorFlow: beginner-friendly, good for demos, used in this course.  
   - PyTorch: flexible, more popular in research, used in the deep learning course.  
   - Frameworks make it practical to train regression, classification, and multi-layer networks at scale.  
