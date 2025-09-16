---
title: "Statistical Methods for Text Data Analysis 2 : Text Processing Stages & Zipf’s Law"
subtitle: "Acquisition, Cleanup, Tokenization, Encoding, Statistics, and Zipf’s Law"
date: 2025-09-14
lang: en
excerpt: "Faithful class notes on a practical text-processing pipeline: acquisition, cleanup, tokenization, stemming vs. lemmatization with POS, unified vocabulary & indexing, corpus statistics, and Zipf’s law."
tags: [NLP, text-processing, crawling, tokenization, stemming, lemmatization, POS-tagging, vocabulary, statistics, Zipf]
draft: false
---

## 1. Introduction & Course Overview

The lecture focuses on **hands-on text processing stages** rather than advanced modeling. The core concept involves extracting analyzable data from various text sources, with practical implementation being the primary goal.

Key Learning Objectives:
- Understand the complete text processing pipeline
- Implement data acquisition from multiple sources
- Master text cleanup and preprocessing techniques
- Build vocabulary management systems
- Recognize and analyze Zipf's Law in text data

---

## 2. Text Processing Pipeline Architecture

The text processing workflow follows a structured pipeline with feedback loops:

### Pipeline Stages Overview
```bash
Data Acquisition → Data Cleanup → Information Extraction & Encoding
       ↑                ↑                        ↓
       └── Feedback ←──  └── Visualization & Inspection
                                        ↓
Performance Evaluation ← Prediction/Generalization ← Modeling
       ↑                        ↑                      ↓
       └── Feedback Loops ←─────┴── Task-based Applications
```

### Stage Details

### Stage 1: Data Acquisition
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/1.png)
**Purpose**: Gather text data from diverse sources

**Data Sources**:
- **Pre-made Collections**: 20 newsgroups, Wikipedia, Project Gutenberg
- **Online Datasets**: Kaggle repositories, academic datasets
- **Social Media APIs**: Twitter/X (increasingly restricted due to LLM scraping concerns)
- **Web Crawling**: Direct webpage extraction
- **File Collections**: Local directories with various formats

**Common Data Formats**:
- JSON (API responses)
- HTML/XML (web content)
- Plain text files
- PDF, DOCX (require conversion)

### Stage 2: Data Cleanup
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/2.png)
**Purpose**: Remove corrupted or unwanted content

**Key Activities**:
- Format conversion to plain text
- HTML tag and script removal
- Whitespace normalization
- Encoding standardization (UTF-8 handling)

### Stage 3: Information Extraction & Encoding
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/3.png)
**Purpose**: Create suitable representations for modeling

**Processes**:
- Extract facts, key terms, entities
- Transform text into analyzable formats
- Create structured representations

### Stage 4: Visualization & Inspection
**Purpose**: Quality assurance and feedback

**Functions**:
- Assess processing quality
- Identify encoding issues
- Trigger returns to earlier stages if needed

### Stage 5: Modeling
**Purpose**: Build collection-level representations

**Model Types**:
- Language models
- Machine learning models
- Statistical representations

### Stage 6: Task-based Applications
**Examples**: Classification, clustering, sentiment analysis, topic modeling

### Stage 7: Prediction & Generalization
**Purpose**: Test model applicability beyond training data

**Evaluation Methods**:
- Performance metrics
- Cross-validation
- Held-out testing

---

## 3. Practical Implementation

### 3.1 Local File Processing

#### File Discovery System
```python
import os

def get_text_files_list(directory_path):
    """
    Categorize files in directory into text files, non-text files, and non-files
    
    Args:
        directory_path (str): Path to directory to scan
        
    Returns:
        tuple: (text_files, not_text_files, non_files)
    """
    directory_text_files = []
    not_text_files = []
    non_files = []
    
    directory_contents = os.listdir(directory_path)
    
    for item in directory_contents:
        full_path = os.path.join(directory_path, item)
        
        # Check if item is actually a file
        if not os.path.isfile(full_path):
            non_files.append(item)
        elif ".txt" in full_path:  # Naive text file detection
            directory_text_files.append(item)
        else:
            not_text_files.append(item)
    
    return directory_text_files, not_text_files, non_files
```

#### File Reading System
```python
def basic_file_crawler(directory_path):
    """
    Read all text files from a directory
    
    Args:
        directory_path (str): Directory containing text files
        
    Returns:
        tuple: (file_names, file_contents)
    """
    num_files_read = 0
    crawled_file_names = []
    crawled_texts = []
    
    # Get list of text files
    directory_contents_lists = get_text_files_list(directory_path)
    directory_text_files = directory_contents_lists[0]
    
    for file_name in directory_text_files:
        print(f"Reading file: {file_name}")
        full_path = os.path.join(directory_path, file_name)
        
        # Open with error handling for encoding issues
        with open(full_path, 'r', encoding='utf-8', errors='ignore') as temp_file:
            temp_text = temp_file.read()
        
        crawled_file_names.append(file_name)
        crawled_texts.append(temp_text)
        num_files_read += 1
    
    return crawled_file_names, crawled_texts
```

### 3.2 Web Crawling Implementation

#### Required Libraries
```python
import requests
from bs4 import BeautifulSoup
```

#### Single Page Processing
```python
def get_page_content(url):
    """Extract and parse HTML content from URL"""
    response = requests.get(url)
    parsed_page = BeautifulSoup(response.content, 'html.parser')
    return parsed_page

def get_page_text(parsed_page):
    """Extract clean text from parsed HTML, removing scripts"""
    # Remove script elements (they contain non-content code)
    for script in parsed_page.find_all("script"):
        script.extract()  # Modifies the parsed_page object
    
    return parsed_page.get_text()
```

#### URL Extraction and Filtering
```python
def get_page_urls(webpage):
    """
    Extract and filter URLs from webpage
    
    Args:
        webpage: BeautifulSoup parsed page object
        
    Returns:
        list: Filtered list of valid URLs
    """
    page_links = webpage.find_all('a')
    page_urls = []
    
    for page_link in page_links:
        page_url_is_ok = 1
        
        # Try to extract href attribute
        try:
            page_url = page_link['href']
        except:
            page_url_is_ok = 0
        
        if page_url_is_ok:
            # Filter out document files
            if page_url.find('.pdf') != -1 or page_url.find('.ps') != -1:
                page_url_is_ok = 0
            
            # Ensure HTTP protocol
            if page_url.find('http') == -1:
                page_url_is_ok = 0
            
            # Domain filtering (example: .fi domain only)
            if page_url.find('.fi') == -1:
                page_url_is_ok = 0
        
        if page_url_is_ok:
            page_urls.append(page_url)
    
    return page_urls
```

#### Full Web Crawler
```python
def basic_web_crawler(seed_page_url, max_pages):
    """
    Crawl web pages starting from seed URL
    
    Args:
        seed_page_url (str): Starting URL
        max_pages (int): Maximum pages to crawl
        
    Returns:
        tuple: (crawled_urls, crawled_texts)
    """
    pages_crawled = 0
    crawled_urls = []
    crawled_texts = []
    pages_to_crawl = [seed_page_url]
    
    while pages_crawled < max_pages and len(pages_to_crawl) > 0:
        # Get next URL to crawl
        current_url = pages_to_crawl[0]
        print(f"Crawling: {current_url}")
        
        # Fetch and parse page
        response = requests.get(current_url)
        parsed_page = BeautifulSoup(response.content, 'html.parser')
        
        # Extract content and URLs
        page_text = get_page_text(parsed_page)
        page_urls = get_page_urls(parsed_page)
        
        # Store results
        pages_crawled += 1
        crawled_urls.append(current_url)
        crawled_texts.append(page_text)
        
        # Update crawling queue
        pages_to_crawl = pages_to_crawl[1:]    # Remove processed URL
        pages_to_crawl.extend(page_urls)       # Add discovered URLs
    
    return crawled_urls, crawled_texts
```

**Important Notes on Web Crawling**:
- This is a basic implementation lacking production features
- Missing: robots.txt compliance, rate limiting, error handling
- Ethical considerations: respect website policies and server load

---

## 4. Text Preprocessing Techniques

### 4.1 Whitespace Normalization

#### Basic Whitespace Removal
```python
# Remove leading and trailing whitespace
clean_text = my_text_string.strip()

# Remove multiple whitespaces between words
clean_text = " ".join(my_text_string.split())
```

**Considerations**:
- Whitespace can be informative (paragraph indentation, code structure)
- Line breaks may indicate section boundaries
- Python code analysis requires preserving indentation
- Balance between cleanup and information preservation

### 4.2 Tokenization with NLTK

#### Required Setup
```python
import nltk
from nltk.tokenize import word_tokenize

# Download required resources (one-time setup)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
```

#### Sentence Tokenization
```python
# Load pre-trained sentence splitter
sentence_splitter = nltk.data.load('tokenizers/punkt/english.pickle')

# Example with abbreviations
text = "E.g. J. Smith knows etc. I know that. Do you?"
sentences = sentence_splitter.tokenize(text)
# Result: ['E.g. J. Smith knows etc.', 'I know that.', 'Do you?']
```

#### Word Tokenization
```python
# Tokenize with punctuation separation
tokens = word_tokenize("Hey, what's going on? Who's that?")
# Result: ['Hey', ',', 'what', "'s", 'going', 'on', '?', 'Who', "'s", 'that', '?']

# Convert to NLTK format for further processing
nltk_text = nltk.Text(tokens)
```

#### Processing Multiple Documents
```python
def process_multiple_texts(crawled_texts):
    """Convert list of text strings to NLTK format texts"""
    my_nltk_texts = []
    
    for i in range(len(crawled_texts)):
        # Tokenize each document
        temp_tokens = word_tokenize(crawled_texts[i])
        # Convert to NLTK format
        temp_text = nltk.Text(temp_tokens)
        my_nltk_texts.append(temp_text)
    
    return my_nltk_texts
```

### 4.3 Case Normalization

```python
def convert_to_lowercase(my_nltk_texts):
    """Convert all tokens to lowercase while preserving structure"""
    my_lowercase_texts = []
    
    for text in my_nltk_texts:
        lowercase_words = []
        for i in range(len(text)):
            lowercase_words.append(text[i].lower())
        
        # Convert back to NLTK format
        my_lowercase_texts.append(nltk.Text(lowercase_words))
    
    return my_lowercase_texts
```

**Information Loss Considerations**:
- Proper nouns lose identity (e.g., "Green" name vs. "green" color)
- Acronyms lose meaning
- Title vs. body text distinctions disappear
- Beginning-of-sentence capitalization information lost

### 4.4 Stemming

#### Porter Stemmer Implementation
```python
from nltk.stem import PorterStemmer

def stem_text(nltk_text):
    """Apply Porter stemming to NLTK text"""
    stemmer = PorterStemmer()
    stemmed_words = []
    
    for word in nltk_text:
        stemmed_words.append(stemmer.stem(word))
    
    return stemmed_words

def process_all_texts_stemming(my_lowercase_texts):
    """Apply stemming to all documents"""
    my_stemmed_texts = []
    
    for text in my_lowercase_texts:
        stemmed_words = stem_text(text)
        my_stemmed_texts.append(nltk.Text(stemmed_words))
    
    return my_stemmed_texts
```

**Stemming Characteristics**:
- Reduces words to root forms (not necessarily valid words)
- "modeling" → "model", "incredible" → "incred"
- Fast and simple
- May produce non-words as stems

### 4.5 Lemmatization

#### POS Tagging Integration
```python
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag

def get_wordnet_pos(treebank_tag):
    """Convert Penn Treebank POS tags to WordNet POS tags"""
    if treebank_tag.startswith('N'):
        return 'n'  # noun
    elif treebank_tag.startswith('V'):
        return 'v'  # verb
    elif treebank_tag.startswith('J'):
        return 'a'  # adjective
    elif treebank_tag.startswith('R'):
        return 'r'  # adverb
    else:
        return None

def lemmatize_text(nltk_text):
    """Apply lemmatization with POS tagging"""
    lemmatizer = WordNetLemmatizer()
    
    # Get POS tags for context-aware lemmatization
    tagged_text = pos_tag(nltk_text)
    lemmatized_text = []
    
    for word, pos_tag_result in tagged_text:
        wordnet_tag = get_wordnet_pos(pos_tag_result)
        
        if wordnet_tag:
            lemma = lemmatizer.lemmatize(word, wordnet_tag)
        else:
            lemma = word  # Keep original if no suitable tag
        
        lemmatized_text.append(lemma)
    
    return lemmatized_text
```

**Lemmatization vs. Stemming**:
- Lemmatization produces valid dictionary words
- Context-dependent (requires POS tagging)
- "lighter" → "light" (adjective) or "lighter" (noun)
- More computationally expensive but linguistically accurate
- Choose one approach, not both

---

## 5. Vocabulary Management System

### 5.1 Distributed Vocabulary Construction

```python
import numpy as np

def create_distributed_vocabularies(my_lemmatized_texts):
    """Create vocabulary for each document separately"""
    my_vocabularies = []
    my_indices_vocabularies = []
    
    for text in my_lemmatized_texts:
        # Get unique words and their indices
        unique_words, word_indices = np.unique(text, return_inverse=True)
        
        my_vocabularies.append(unique_words)
        my_indices_vocabularies.append(word_indices)
    
    return my_vocabularies, my_indices_vocabularies
```

### 5.2 Vocabulary Unification

```python
def unify_vocabularies(my_vocabularies, my_indices_vocabularies):
    """Merge all document vocabularies into unified vocabulary"""
    
    # Step 1: Concatenate all vocabularies
    big_vocabulary = []
    for vocabulary in my_vocabularies:
        big_vocabulary.extend(vocabulary)
    
    # Step 2: Find unique words across all documents
    unified_vocabulary, word_indices = np.unique(big_vocabulary, return_inverse=True)
    
    # Step 3: Translate document indices to unified vocabulary
    my_unified_indices_vocabularies = []
    vocabulary_start = 0
    
    for i in range(len(my_vocabularies)):
        # Get current document's indices
        indices = np.array(my_indices_vocabularies[i])
        
        # Shift to position in concatenated vocabulary
        shifted_indices = indices + vocabulary_start
        
        # Translate to unified vocabulary indices
        unified_indices = word_indices[shifted_indices]
        my_unified_indices_vocabularies.append(unified_indices)
        
        # Update start position for next document
        vocabulary_start += len(my_vocabularies[i])
    
    return unified_vocabulary, my_unified_indices_vocabularies
```

**Benefits of Unified Vocabulary**:
- Consistent word indexing across all documents
- Efficient storage and processing
- Enables cross-document analysis
- Foundation for statistical computations

---

## 6. Statistical Analysis

### 6.1 Word Statistics Computation

```python
def compute_word_statistics(unified_vocabulary, unified_indices_vocabularies):
    """Calculate comprehensive word statistics across corpus"""
    
    vocab_size = len(unified_vocabulary)
    num_documents = len(unified_indices_vocabularies)
    
    # Initialize statistics arrays
    total_counts = np.zeros(vocab_size)
    document_counts = np.zeros(vocab_size)
    mean_counts = np.zeros(vocab_size)
    count_variances = np.zeros(vocab_size)
    
    # First pass: count occurrences
    for doc_indices in unified_indices_vocabularies:
        temp_counts = np.zeros(vocab_size)
        
        # Count word occurrences in current document
        for token_index in doc_indices:
            temp_counts[token_index] += 1
        
        # Update global statistics
        total_counts += temp_counts
        document_counts += (temp_counts > 0).astype(int)
    
    # Calculate mean counts
    mean_counts = total_counts / num_documents
    
    # Second pass: calculate variances
    for doc_indices in unified_indices_vocabularies:
        temp_counts = np.zeros(vocab_size)
        
        for token_index in doc_indices:
            temp_counts[token_index] += 1
        
        # Accumulate squared deviations
        count_variances += (temp_counts - mean_counts) ** 2
    
    # Finalize variance calculation (unbiased estimator)
    count_variances = count_variances / (num_documents - 1)
    
    return total_counts, document_counts, mean_counts, count_variances
```

### 6.2 Top Words Analysis

```python
def analyze_top_words(unified_vocabulary, total_counts, top_n=20):
    """Display most frequent words in corpus"""
    
    # Get sorted indices (highest counts first)
    sorted_indices = np.argsort(total_counts)[::-1]
    
    print(f"Top {top_n} words by total count:")
    for i in range(min(top_n, len(sorted_indices))):
        word_idx = sorted_indices[i]
        word = unified_vocabulary[word_idx]
        count = total_counts[word_idx]
        print(f"{word}: {count}")
```

---

## 7. Zipf's Law Analysis

### 7.1 Theoretical Foundation

![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/4.png)

**Zipf's Law**: In natural language corpora, the frequency of a word is inversely proportional to its rank in the frequency table.

**Mathematical Expression**:
```bash
P(word_i) = (1 / rank_i^s) × C
```
Where:
- `P(word_i)` = probability of word i
- `rank_i` = rank of word i in frequency table
- `s` = exponent (typically ≈ 1)
- `C` = normalization constant

### 7.2 Empirical Observation

Key findings from 20 newsgroups dataset:
- Top words: punctuation and function words
- Colon (':') = 308,665 occurrences
- Comma (',') = 305,640 occurrences  
- "the" = 256,006 occurrences

**Implications**:
- Few words account for majority of text
- Most frequent words often uninformative (stopwords)
- Long tail of rare words
- Universal pattern across languages and domains

### 7.3 Visualization Code

```python
import matplotlib.pyplot as plt

def plot_zipf_distribution(total_counts, top_n=500):
    """Plot word frequency distribution following Zipf's law"""
    
    # Sort counts in descending order
    sorted_counts = np.sort(total_counts)[::-1]
    ranks = np.arange(1, len(sorted_counts) + 1)
    
    # Plot full distribution
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    plt.loglog(ranks, sorted_counts)
    plt.xlabel('Word Rank')
    plt.ylabel('Word Count')
    plt.title('Zipf\'s Law: Full Distribution')
    plt.grid(True)
    
    # Plot top N words
    plt.subplot(1, 2, 2)
    plt.loglog(ranks[:top_n], sorted_counts[:top_n])
    plt.xlabel('Word Rank')
    plt.ylabel('Word Count')
    plt.title(f'Zipf\'s Law: Top {top_n} Words')
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()
```

**Practical Significance**:
- Guides preprocessing decisions (stopword removal)
- Influences vocabulary size choices
- Affects sampling and statistical methods
- Essential for understanding text data characteristics

---

## 8. Implementation Best Practices

### 8.1 Error Handling Considerations

The lecture code examples are simplified for clarity. Production implementations should include:

```python
def robust_file_reader(file_path, encodings=['utf-8', 'latin-1', 'cp1252']):
    """Read file with multiple encoding attempts"""
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
    raise ValueError(f"Could not decode file {file_path} with any encoding")

def safe_web_request(url, timeout=10, retries=3):
    """Make web request with error handling and retries"""
    for attempt in range(retries):
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()
            return response
        except requests.RequestException as e:
            if attempt == retries - 1:
                raise e
            time.sleep(2 ** attempt)  # Exponential backoff
```

### 8.2 Ethical Guidelines

**Research Ethics**:
- Obtain proper permissions for data collection
- Anonymize personally identifiable information
- Comply with GDPR and local privacy laws
- Respect copyright and licensing terms

**Web Crawling Ethics**:
- Check and respect robots.txt
- Implement rate limiting
- Avoid overloading servers
- Consider terms of service

### 8.3 Scalability Considerations

For large-scale text processing:
- Use streaming processing for memory efficiency
- Implement parallel processing where possible
- Consider distributed computing frameworks
- Monitor memory usage during vocabulary construction

---

## 9. Summary and Next Steps

### Key Accomplishments

This lecture covered the fundamental text processing pipeline:
1. **Data Acquisition**: Multiple source types and formats
2. **Web Crawling**: Basic implementation with filtering
3. **Text Preprocessing**: Tokenization, normalization, stemming/lemmatization
4. **Vocabulary Management**: Unified vocabulary construction
5. **Statistical Analysis**: Word frequency and distribution analysis
6. **Zipf's Law**: Theoretical understanding and empirical validation

### Upcoming Topics

Next week's focus areas:
- **Stopword Removal**: Filtering uninformative words
- **Advanced Preprocessing**: More sophisticated cleanup techniques
- **Feature Selection**: Choosing relevant vocabulary subsets
- **Text Representation**: Moving toward modeling approaches

### Practical Exercises

Students will:
- Download books from Project Gutenberg
- Implement complete processing pipeline
- Analyze word frequency distributions
- Validate Zipf's Law on personal datasets
- Compare processing choices (stemming vs. lemmatization)

---

## 10. Technical Appendix

### Required Libraries Installation
```bash
pip install nltk beautifulsoup4 requests numpy matplotlib
```

### NLTK Resource Downloads
```python
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('tagsets')
```

### Common Encoding Issues
- **UTF-8**: Standard but not universal
- **Latin-1**: Western European languages
- **CP1252**: Windows encoding
- Use error='ignore' or error='replace' for robustness

### Performance Notes
- Tokenization is computationally expensive
- POS tagging adds significant overhead
- Vocabulary unification requires careful memory management
- Statistical computation scales with corpus size

---

*These notes represent the complete hands-on foundation for text processing. Mastery of these techniques enables progression to advanced modeling and analysis methods covered in subsequent lectures.*