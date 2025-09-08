---
title: "ML_4: Neural networks"
subtitle: "DATA.ML.100 · Joni Kämäräinen · Thu 4.9.2025 TB104 😊"
date: "2025-09-08"
lang: "en"
excerpt: "x"
tags:
  - "Joni Kämäräinen"
  - "machine-learning"
  - "Neural networks"
draft: false
---

## Part 1 : From Brains to Neural Networks

![Board notes](/images/docs/mlLecture4_Neuralnetworks/1.png)

### 1. Why study neural networks?
- When engineers face bottlenecks, they often borrow ideas from other sciences (biology, human sciences, etc.).  
- The human brain is the most intelligent "computer" we currently know, and thus serves as inspiration for machine learning.  

### 2. Brain and evolution
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

### 3. Biological neuron structure
- **Dendrites** = inputs ($x_1, x_2, …$)  
- **Synapses** = weights (can excite or inhibit)  
- **Cell body (soma)** = computational unit (like linear model + activation function)  
- **Axon** = output ($y$)  

➡️ **Artificial neuron model = Inputs × Weights → Summation → Activation function → Output**

### 4. Notes
- Biological neurons transmit signals as **spikes**, while artificial neurons use continuous values.  
- This leads to emerging fields such as:  
  - **Spiking Neural Networks (SNNs)**  
  - **Neuromorphic chips**

---

## Part 2 : Linear Model and the First Neural Network Wave (1943)

![Board notes](/images/docs/mlLecture4_Neuralnetworks/2.png)

### 1. Linear model as a neuron
- The neuron can be modeled as a **linear combination of inputs** plus a bias:  
  $$y = \sum_i w_i x_i + w_0$$
- This system can already perform **linear regression**.  
- For classification, however, linear regression is not sufficient → need thresholding or a non-linear activation.  

### 2. Towards classification
- Binary classification: only two classes (0/1).  
- Fix: apply a **threshold function** (or later a sigmoid/logistic).  
- In code:  
  - First compute the weighted sum.  
  - Then apply threshold (or sigmoid) to decide the output.  

### 3. Historical note — Wave 1 (1943)
- **McCulloch & Pitts (1943): Linear Threshold Unit (LTU)**.  
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

### 4. Example: AND gate
- Inputs: $x_1, x_2 \in \{0,1\}$.  
- Desired output: $y=1$ only when both inputs are 1, otherwise 0.  
- Choose weights $w_1 = w_2 = \tfrac{2}{3}$, bias $w_0 = -1$.  
- Check:  
  $$
  \begin{aligned}
  (0,0):\ & -1<0 \ \Rightarrow y=0 \\
  (1,0)\ \text{or}\ (0,1):\ & \tfrac{2}{3}-1=-\tfrac{1}{3}<0 \ \Rightarrow y=0 \\
  (1,1):\ & \tfrac{4}{3}-1=\tfrac{1}{3}>0 \ \Rightarrow y=1
  \end{aligned}
  $$
- ✅ Works as AND gate.  

### 5. Key takeaway
- A simple LTU with the right weights can implement logical functions.  
- This historical step showed that neural units could, in principle, form the basis of computation.
