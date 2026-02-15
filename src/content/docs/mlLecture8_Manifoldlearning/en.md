---
title: "Manifold Learning - Lecture Notes"
subtitle: "Dimensionality Reduction and Data Visualization Methods"
date: 2025-09-20
lang: en
excerpt: "Comprehensive notes covering multidimensional scaling, random projections, PCA, and self-organizing maps for high-dimensional data analysis and visualization"
tags: ["Joni Kämäräinen", "machine-learning", "manifold-learning", "dimensionality-reduction", "data-visualization", "MDS", "PCA", "SOM"]
draft: false
---

# Manifold Learning - Lecture Notes

## 1. Introduction to High-Dimensional Data Representation

### 1.1 The Challenge of High-Dimensional Spaces

When working with image data, every pixel is considered as its own dimension. For example, a small image in weekly exercises becomes a 784-dimensional sample, where each sample represents a single image as a point in 784-dimensional space.

This concept extends to other domains:

- **Audio Processing**: A one-second guitar recording at CD quality (44,100 samples per second) creates a 44,000-dimensional vector representing all audible frequencies from 20Hz to 20,000Hz
- **General Data**: Any high-dimensional dataset can be viewed as points in a corresponding high-dimensional space

### 1.2 The Manifold Hypothesis

The key insight is that high-dimensional data often doesn't fill the entire space uniformly. Instead, data points lie on or near a much lower-dimensional surface called a **manifold**.

**Evidence for Manifolds:**

- If data truly filled the entire space, you could travel directly between any two points and all intermediate points would be valid samples
- In reality, this is not the case - traveling directly between two face images doesn't guarantee all intermediate points look like faces
- Valid samples exist on a lower-dimensional surface within the high-dimensional space

**Mathematical Representation:**

- Data exists on a surface that is much smaller than the full dimensional space
- To travel between two valid samples while maintaining validity, you must travel along the manifold surface
- This surface captures the intrinsic structure of the data

## 2 Goals of Manifold Learning

### 2.1 Primary Objectives

1. **Surface Discovery**: Finding the underlying manifold structure in high-dimensional data
2. **Dimensionality Reduction**: Mapping high-dimensional data to lower dimensions (typically 2D or 3D) for visualization and analysis
3. **Structure Preservation**: Maintaining important relationships and patterns from the original space

### 2.2 Visualization Benefits

Humans excel at pattern recognition in 2D and 3D spaces:

- 2D visualization provides an immediate "map-like" understanding without rotation
- 3D can be useful with virtual reality for immersive data exploration
- Some individuals can even develop intuition for 4D spaces (as demonstrated in certain video games)

### 2.3 Applications Across Disciplines

**Psychology and Social Sciences:**

- Analyzing questionnaire responses from patients or customers
- Creating 2D maps showing clusters of similar response patterns
- Identifying groups with similar characteristics (e.g., personality traits, behavioral patterns)
- Commonly uses Multidimensional Scaling (MDS) in psychological research

**Business and Marketing:**

- Customer segmentation and analysis
- Product positioning and market research
- Identifying similar customer groups for targeted strategies


## 3. Multidimensional Scaling (MDS)

### 3.1 Core Principle

MDS seeks to find a 2D representation where distances between points approximate the distances in the original high-dimensional space as closely as possible.

**Mathematical Formulation:**

$$\text{distance}(x_i, x_j) \approx \text{distance}(\hat{x}_i, \hat{x}_j)$$

Where:
- $x_i, x_j$ are points in the original d-dimensional space
- $\hat{x}_i, \hat{x}_j$ are corresponding points in the 2D mapped space

### 3.2 Algorithm Approach

**Optimization Process:**

1. Start with random positions in 2D space
2. Calculate distances between all point pairs in both original and 2D spaces
3. Compute mean squared error between distance matrices
4. Iteratively adjust 2D positions to minimize distance differences

**Objective Function:**
Minimize the difference between original distances and mapped distances across all point pairs.

### 3.3 Perfect Mapping Conditions

MDS achieves perfect distance preservation when:

**2D to 1D mapping:** All points lie on the same line in 2D space

**3D to 2D mapping:** All points lie on the same plane in 3D space

**General case:** Points lie on a surface of the target dimension

### 3.4 Distance Considerations

**Euclidean Distance:** Standard straight-line distance, requires points to lie on planes for perfect 2D mapping

**Surface Distance:** For curved surfaces (like measuring waist circumference on a 3D body scan), surface distance is more appropriate:

- Approximate by sampling points on the surface
- Measure Euclidean distances between consecutive sample points
- Sum distances along the path
- As sampling density increases, approaches true surface distance

### 3.5 Implementation

MDS is available in scikit-learn and other Python packages, making it accessible for practical applications without implementing the optimization algorithm from scratch.

## 4 Random Projections

### 4.1 Linear Algebra Foundation

For a sample vector $x_i = [x_{i1}, x_{i2}, ..., x_{id}]$:

**Identity Mapping:**
$$A \cdot x = x$$

Where $A$ is a $d \times d$ identity matrix:

$A = \begin{bmatrix}
1 & 0 & 0 & \cdots & 0 \\\\
0 & 1 & 0 & \cdots & 0 \\\\
\vdots & \vdots & \ddots & \ddots & \vdots \\\\
0 & 0 & 0 & \cdots & 1
\end{bmatrix}$

**Compression Mapping:**

$A \cdot x = \hat{x}$

Where $A$ is now $\hat{d} \times d$ with $\hat{d} < d$ (fewer rows, same columns)

### 4.2 Random Vector Selection

**Brute Force Approach:**

- Randomly select projection directions (row vectors in matrix $A$)
- Ensure random vectors have unit length to preserve scale
- Each row represents a random direction in the original space

**Surprising Effectiveness:**
Random projections work surprisingly well in practice, often preserving local structure and clustering patterns in the data.

### 4.3 Theoretical Foundation

**Deep Learning Connection:**
A master's thesis by an early deep learning pioneer showed that with properly normalized data:

- Random projections + simple classifier ≈ performance of learned projections + complex classifier

**Normalization requirements:**

- Zero mean
- Standard deviation of one
- Rotation to decorrelate features (based on covariance structure)

**Normalization Process:**

1. Center data (zero mean)
2. Scale to unit variance
3. Rotate based on covariance matrix to remove correlations

### 4.4 Implementation

Random projections are available in scikit-learn, providing fast, linear dimensionality reduction without requiring iterative optimization.

## 5. Principal Component Analysis (PCA)

### 5.1 Eigenvalue-Based Approach

Instead of random vectors, PCA uses mathematically optimal projection directions based on data variance.

**Mathematical Foundation:**

Given data matrix $X$, compute covariance matrix:
$$C = \text{cov}(X)$$

Find eigenvalues and eigenvectors:
$$C \cdot v_i = \lambda_i \cdot v_i$$

**Selection Criteria:**

- Choose $\hat{d}$ eigenvectors corresponding to the largest eigenvalues
- These directions capture maximum variance in the data
- Use selected eigenvectors as projection matrix $A$

### 5.2 Interpretation of Components

**First Principal Component:**

- Direction of maximum variance in the data
- For face images: represents the "average face"
- Captures the most significant variation across all samples

**Subsequent Components:**

- Orthogonal directions of decreasing variance
- May correspond to interpretable features (age, gender, lighting, etc.)
- Allow interactive exploration with sliders to adjust component weights

### 5.3 Interactive Visualization

PCA enables creation of interactive systems where:

- Sliders control weights of different principal components
- Users can generate new samples by combining components
- Components often have semantic meaning (more masculine/feminine features, age variations)

### 5.4 Historical Context

PCA is a classical method, at least 40 years old, but remains fundamental to understanding manifold learning and dimensionality reduction.

## 6. Self-Organizing Map (SOM)

### 6.1 Historical and Cultural Context

**Origin:** Invented in Finland, representing a significant contribution to manifold learning

**Applications:**

- Used 25-30 years ago for dating service matching systems
- Applied to business problems like market entry decisions
- Movie recommendation systems based on user ratings

### 6.2 Conceptual Foundation

#### 6.2.1 Topological Flexibility

A Self-Organizing Map uses a flexible network structure:

**1D Network (Thread/String):**

- Nodes connected in sequence: Node 0 → Node 1 → Node 2 → ...
- Can be bent, twisted, or shaped into curves while maintaining connectivity
- Topology remains unchanged regardless of spatial arrangement

**2D Network (Grid):**

- Nodes arranged in a grid pattern with local connections
- Can be deformed into complex shapes while preserving neighbor relationships
- Maintains topological structure even when stretched or curved

#### 6.2.2 High-Dimensional Embedding

**Key Insight:** Each node contains a full d-dimensional vector

- The network topology is separate from the embedding space
- A 1D chain of nodes can "fill" d-dimensional volume through positioning
- Example: A spiral arrangement of 1D nodes can represent 3D data structure

### 6.3 Algorithm Description

The SOM algorithm is remarkably simple yet effective:

#### 6.3.1 Initialization

- Create network of nodes (1D chain, 2D grid, etc.)
- Initialize each node with a d-dimensional weight vector
- Define neighborhood relationships between nodes

#### 6.3.2 Training Process

**For each iteration (repeat M times):**

1. **Sample Selection:** Randomly select a training sample $x_i$

2. **Best Matching Unit (BMU):** Find the node closest to $x_i$:
   $$\text{BMU} = \arg\min_j \|x_i - w_j\|$$
   where $w_j$ is the weight vector of node $j$

3. **Weight Update:** Update the BMU toward the sample:
   $$w_{\text{BMU}}^{\text{new}} = w_{\text{BMU}}^{\text{old}} + \alpha(x_i - w_{\text{BMU}}^{\text{old}})$$

4. **Neighborhood Update:** Update neighbors of BMU using the same rule:
   $$w_{\text{neighbor}}^{\text{new}} = w_{\text{neighbor}}^{\text{old}} + \alpha(x_i - w_{\text{neighbor}}^{\text{old}})$$

**Parameters:**

- $\alpha$: Learning rate (e.g., 0.5 for half-way updates)
- Neighborhood definition: typically immediate neighbors in the network

### 6.4 Example Walkthrough

**Initial Configuration:**

- 1D network with 3 nodes: $M_1 = 0, M_2 = 4, M_3 = 8$
- Connections: $M_1 \leftrightarrow M_2 \leftrightarrow M_3$
- Learning rate: $\alpha = 0.5$

**Training Step:**

- Sample: $x_1 = 6$
- Distances: $|6-0| = 6, |6-4| = 2, |6-8| = 2$
- BMU: $M_3$ (distance = 2, tie-broken arbitrarily)
- Update $M_3$: $M_3^{\text{new}} = 8 + 0.5(6-8) = 7$
- Update neighbor $M_2$: $M_2^{\text{new}} = 4 + 0.5(6-4) = 5$
- $M_1$ unchanged (not a neighbor of $M_3$)

### 6.5 Key Properties

#### 6.5.1 Convergence

- **Empirical observation:** SOM always converges in practice
- **Theoretical status:** Convergence is unproven but universally observed
- **Reliability:** Never fails to produce meaningful organization

#### 6.5.2 Simplicity Principle (Occam's Razor)

The algorithm's effectiveness despite its simplicity exemplifies Occam's Razor: prefer simple explanations over complex ones.

**Historical Example:**

- Geocentric model: Complex system with multiple rotating axes to explain planetary motion
- Heliocentric model: Simple system with sun at center
- The simpler model proved correct

### 6.6 Practical Applications

#### 6.6.1 Business Decision Making

**Market Entry Problem:**

- Input: Statistical data for different countries
- Process: Organize countries based on similarity
- Output: Map showing which countries have similar market characteristics
- Application: Select expansion targets based on successful existing markets

**Implementation:**

- Achieved better results than Nobel Prize-winning economic models
- Used for bachelor thesis projects with superior performance

#### 6.6.2 Entertainment Recommendation

**Movie Recommendation System:**

- Data source: Internet Movie Database ratings from 1000+ evaluators
- Handles missing data naturally (incomplete rating matrices)
- Result: Movies with similar ratings cluster together
- Examples: Star Wars movies cluster near each other, Indiana Jones films group nearby
- Basis: Users with similar tastes rate similar movies similarly

### 6.7 Visualization and Interpretation

#### 6.7.1 Topological Maps

Create height maps showing dissimilarity between neighboring nodes:

- Light colors: Similar neighboring nodes (smooth regions)
- Dark colors: Large differences between neighbors (boundaries/mountains)
- Helps identify cluster boundaries and transition regions

#### 6.7.2 Data Organization

**Digit Recognition Example:**

- Input: 8×8 pixel handwritten digits (64-dimensional data)
- Organization: Similar digits naturally cluster together
- Visualization: Can display representative digit for each node
- Empty regions indicate gaps in the data distribution

### 6.8 Comparison with Other Methods

#### vs. Random Projections

- Random projections: Fast, linear, surprisingly effective
- SOM: Slower but provides interpretable topological organization
- Both preserve local neighborhood relationships

#### vs. MDS

- MDS: Focuses on global distance preservation
- SOM: Emphasizes local neighborhood relationships and topological structure
- SOM: More suitable for discrete, interpretable organization

#### vs. PCA

- PCA: Linear projections based on variance
- SOM: Nonlinear organization preserving topological relationships
- PCA: Better for continuous variation, SOM better for discrete clusters

### 6.9 Implementation Challenges

#### 6.9.1 Software Availability

- **Not in scikit-learn:** Must use specialized implementations
- **Best implementations:** Historical versions in MATLAB and C
- **Current status:** Limited Python implementations available
- **Original inventor:** Deceased, limiting ongoing development

#### 6.9.2 Practical Considerations

- Requires downloading and integrating external code
- Less standardized than other methods
- Despite implementation challenges, remains powerful for appropriate applications

### 6.10 Limitations and Considerations

#### 6.10.1 Information Loss

Similar to other manifold learning methods:

- **Preserved:** Points close in the map are close in original space
- **Lost:** Points far in the map may still be close in original space
- **Implication:** Focus on local relationships, be cautious about global interpretations

#### 6.10.2 Parameter Selection

- Learning rate affects convergence speed and stability
- Neighborhood size influences smoothness of organization
- Network topology choice impacts final organization structure

## Practical Considerations and Limitations

### 6.11 The "No Free Lunch" Problem

All manifold learning methods involve trade-offs:

- **Gained:** Lower-dimensional visualization and understanding
- **Lost:** Some aspects of the original high-dimensional relationships

### 6.12 Information Preservation vs. Loss

#### 6.12.1 What is Preserved

- **Local relationships:** Points close in the mapped space are close in the original space
- **Cluster structure:** Groups of similar data points tend to remain grouped
- **Neighborhood relationships:** Local patterns are generally maintained

#### 6.12.2 What May Be Lost

- **Global relationships:** Points far apart in the mapped space may still be close in the original space
- **Distance accuracy:** Exact distances are approximated, not perfectly preserved
- **Complete information:** Some high-dimensional structure cannot be captured in lower dimensions

### 6.13 Interpretation Guidelines

#### 6.13.1 Safe Interpretations

- Identify clusters and groups of similar data points
- Analyze local neighborhoods and gradual transitions
- Compare relative positions of nearby points

#### 6.13.2 Cautionary Interpretations

- Avoid strong conclusions about points that appear far apart in the map
- Be careful about global distance interpretations
- Remember that the mapping is an approximation, not a perfect representation

### 6.14 Method Selection Criteria

#### 6.14.1 Choose MDS when:

- Global distance preservation is most important
- You have relatively small datasets
- Computational time is not critical

#### 6.14.2 Choose Random Projections when:

- Speed is essential
- You need a simple, linear method
- Data is properly normalized
- You want a baseline comparison

#### 6.14.3 Choose PCA when:

- You want interpretable, variance-based components
- Linear relationships dominate your data
- You need mathematical guarantees about information preservation
- You want to understand the main directions of variation

#### 6.14.4 Choose SOM when:

- You want interpretable, topological organization
- Discrete clusters are expected
- You need a method that handles missing data naturally
- Visualization of data organization is the primary goal

### 6.15 Practical Implementation Tips

#### 6.15.1 Data Preprocessing

1. **Normalization:** Ensure features are on similar scales
2. **Missing Data:** Consider how each method handles incomplete information
3. **Outliers:** Identify and potentially handle extreme values
4. **Feature Selection:** Remove irrelevant or redundant features when possible

#### 6.15.2 Evaluation Strategies

1. **Visual Inspection:** Does the mapping make intuitive sense?
2. **Cluster Validation:** Do known groups appear together?
3. **Stress Testing:** How does the method perform on different subsets?
4. **Cross-Validation:** Test stability across different random initializations

#### 6.15.3 Integration with Other Methods

- Use multiple methods for comparison and validation
- Combine manifold learning with clustering algorithms
- Apply manifold learning as preprocessing for classification or regression
- Use ensemble approaches when appropriate

### 6.16 Future Directions and Advanced Topics

#### 6.16.1 Neural Network Extensions

- Contrastive learning for distance-based mappings
- Autoencoder-based manifold learning
- Deep embedding methods

#### 6.16.2 Modern Applications

- Large-scale data visualization
- Interactive exploration systems
- Real-time manifold learning for streaming data
- Integration with modern machine learning pipelines

This comprehensive overview provides the foundation for understanding and applying manifold learning methods effectively across various domains and applications.