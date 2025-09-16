---
title: "文本數據分析統計方法 2：文本處理階段同齊夫定律"
subtitle: "獲取、清洗、分詞、編碼、統計，同齊夫定律"
date: 2025-09-14
lang: yue
excerpt: "實戰文本處理流程：數據獲取、清理、分詞、詞幹 vs. 配合詞性的詞形還原、統一詞彙與索引、語料統計，及齊夫定律。"
tags: [NLP, text-processing, crawling, tokenization, stemming, lemmatization, POS-tagging, vocabulary, statistics, Zipf]
draft: false
---

## 1. 簡介同課程概覽

呢堂重點係 **動手做嘅文本處理各個階段**，唔係高階建模。核心概念係由唔同文本來源抽取可分析嘅數據，實作係首要目標。

學習重點：
- 明白完整嘅文本處理流水線
- 由多個來源實作數據獲取
- 掌握文本清洗同預處理技巧
- 建立詞彙管理系統
- 識別並分析文本數據入面嘅齊夫定律（Zipf's Law）

---

## 2. 文本處理流水線架構

整個工作流跟住一條有回饋循環嘅結構化流水線：

### 流水線階段總覽
```bash
Data Acquisition → Data Cleanup → Information Extraction & Encoding
       ↑                ↑                        ↓
       └── Feedback ←──  └── Visualization & Inspection
                                        ↓
Performance Evaluation ← Prediction/Generalization ← Modeling
       ↑                        ↑                      ↓
       └── Feedback Loops ←─────┴── Task-based Applications
```

### 各階段詳情

### 階段 1：數據獲取（Data Acquisition）
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/1.png)
**目的**：由多種來源收集文本數據

**數據來源**：
- **預製語料**：20 newsgroups、Wikipedia、Project Gutenberg
- **在線數據集**：Kaggle 倉庫、學術數據集
- **社交媒體 API**：Twitter/X（因 LLM 抓取問題而日益收緊）
- **網頁爬取**：直接抽取網頁內容
- **文件集合**：本地目錄包含多種格式

**常見數據格式**：
- JSON（API 回應）
- HTML/XML（網頁內容）
- 純文字檔
- PDF、DOCX（需要轉換）

### 階段 2：數據清洗（Data Cleanup）
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/2.png)
**目的**：移除損壞或唔要嘅內容

**關鍵工作**：
- 轉換格式變成純文本
- 去除 HTML 標籤同 script
- 空白符規範化
- 編碼標準化（處理 UTF-8 等）

### 階段 3：資訊抽取與編碼（Information Extraction & Encoding）
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/3.png)
**目的**：為建模創建合適嘅表示

**流程**：
- 抽取事實、關鍵詞、實體
- 將文本轉做可分析格式
- 產生結構化表示

### 階段 4：可視化與檢查（Visualization & Inspection）
**目的**：質量保證同回饋

**功能**：
- 評估處理質量
- 發現編碼問題
- 必要時回退前面階段

### 階段 5：建模（Modeling）
**目的**：建立集合層面（corpus-level）嘅表示

**模型類型**：
- 語言模型
- 機器學習模型
- 統計表示

### 階段 6：任務應用（Task-based Applications）
**例子**：分類、聚類、情感分析、主題建模

### 階段 7：預測與泛化（Prediction & Generalization）
**目的**：測試模型喺訓練集以外嘅適用性

**評估方法**：
- 性能指標
- 交叉驗證
- 留出測試

---

## 3. 實作（Practical Implementation）

### 3.1 本地文件處理（Local File Processing）

#### 文件發現系統（File Discovery System）
```python
import os

def get_text_files_list(directory_path):
    """
    將目錄入面嘅項目分類為文本文件、非文本文件、同埋非文件
    
    參數：
        directory_path (str): 要掃描嘅目錄路徑
        
    返回：
        tuple: (text_files, not_text_files, non_files)
    """
    directory_text_files = []
    not_text_files = []
    non_files = []
    
    directory_contents = os.listdir(directory_path)
    
    for item in directory_contents:
        full_path = os.path.join(directory_path, item)
        
        # 檢查係咪真係文件
        if not os.path.isfile(full_path):
            non_files.append(item)
        elif ".txt" in full_path:  # 天真嘅文本檔偵測
            directory_text_files.append(item)
        else:
            not_text_files.append(item)
    
    return directory_text_files, not_text_files, non_files
```

#### 文件讀取系統（File Reading System）
```python
def basic_file_crawler(directory_path):
    """
    讀取目錄下所有文本檔
    
    參數：
        directory_path (str): 含有文本檔嘅目錄
        
    返回：
        tuple: (file_names, file_contents)
    """
    num_files_read = 0
    crawled_file_names = []
    crawled_texts = []
    
    # 攞文本檔列表
    directory_contents_lists = get_text_files_list(directory_path)
    directory_text_files = directory_contents_lists[0]
    
    for file_name in directory_text_files:
        print(f"Reading file: {file_name}")
        full_path = os.path.join(directory_path, file_name)
        
        # 打開同處理編碼問題
        with open(full_path, 'r', encoding='utf-8', errors='ignore') as temp_file:
            temp_text = temp_file.read()
        
        crawled_file_names.append(file_name)
        crawled_texts.append(temp_text)
        num_files_read += 1
    
    return crawled_file_names, crawled_texts
```

### 3.2 網頁爬取實作（Web Crawling Implementation）

#### 需要嘅庫
```python
import requests
from bs4 import BeautifulSoup
```

#### 單頁處理
```python
def get_page_content(url):
    """由 URL 提取並解析 HTML 內容"""
    response = requests.get(url)
    parsed_page = BeautifulSoup(response.content, 'html.parser')
    return parsed_page

def get_page_text(parsed_page):
    """由解析後嘅 HTML 提取乾淨文本，並移除 script"""
    # 移除 script 元素（包含非正文程式碼）
    for script in parsed_page.find_all("script"):
        script.extract()  # 修改 parsed_page 物件
    
    return parsed_page.get_text()
```

#### URL 提取同過濾
```python
def get_page_urls(webpage):
    """
    由網頁入面抽取同過濾 URL
    
    參數：
        webpage: BeautifulSoup 解析後嘅頁面物件
        
    返回：
        list: 經過過濾嘅有效 URL 列表
    """
    page_links = webpage.find_all('a')
    page_urls = []
    
    for page_link in page_links:
        page_url_is_ok = 1
        
        # 試下攞 href
        try:
            page_url = page_link['href']
        except:
            page_url_is_ok = 0
        
        if page_url_is_ok:
            # 濾走文檔類型
            if page_url.find('.pdf') != -1 or page_url.find('.ps') != -1:
                page_url_is_ok = 0
            
            # 必須係 HTTP 協議
            if page_url.find('http') == -1:
                page_url_is_ok = 0
            
            # 網域過濾（例：只要 .fi）
            if page_url.find('.fi') == -1:
                page_url_is_ok = 0
        
        if page_url_is_ok:
            page_urls.append(page_url)
    
    return page_urls
```

#### 完整爬蟲
```python
def basic_web_crawler(seed_page_url, max_pages):
    """
    由種子 URL 開始爬頁
    
    參數：
        seed_page_url (str): 起始 URL
        max_pages (int): 最大爬取頁數
        
    返回：
        tuple: (crawled_urls, crawled_texts)
    """
    pages_crawled = 0
    crawled_urls = []
    crawled_texts = []
    pages_to_crawl = [seed_page_url]
    
    while pages_crawled < max_pages and len(pages_to_crawl) > 0:
        # 拎下一個 URL
        current_url = pages_to_crawl[0]
        print(f"Crawling: {current_url}")
        
        # 抓取並解析
        response = requests.get(current_url)
        parsed_page = BeautifulSoup(response.content, 'html.parser')
        
        # 提取內容同 URL
        page_text = get_page_text(parsed_page)
        page_urls = get_page_urls(parsed_page)
        
        # 存結果
        pages_crawled += 1
        crawled_urls.append(current_url)
        crawled_texts.append(page_text)
        
        # 更新隊列
        pages_to_crawl = pages_to_crawl[1:]    # 移除已處理 URL
        pages_to_crawl.extend(page_urls)       # 加入新 URL
    
    return crawled_urls, crawled_texts
```

**網頁爬取注意事項**：
- 呢個實作係基礎版，未有生產級特性
- 未包含：robots.txt 合規、頻率限制、錯誤處理
- 倫理考量：尊重網站政策同伺服器負載

---

## 4. 文本預處理技巧（Text Preprocessing Techniques）

### 4.1 空白符規範化（Whitespace Normalization）

#### 基本去除空白
```python
# 去頭去尾嘅空白
clean_text = my_text_string.strip()

# 合併詞與詞之間嘅多重空白
clean_text = " ".join(my_text_string.split())
```

**考慮點**：
- 空白有時有資訊（段落縮排、程式碼結構）
- 換行可能代表段落界線
- 分析 Python 程式碼要保留縮排
- 喺清理同保留資訊之間要平衡

### 4.2 用 NLTK 分詞（Tokenization with NLTK）

#### 需要設定
```python
import nltk
from nltk.tokenize import word_tokenize

# 下載所需資源（一次性）
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
```

#### 句子切分
```python
# 載入預訓練句子切分器
sentence_splitter = nltk.data.load('tokenizers/punkt/english.pickle')

# 包含縮寫嘅例子
text = "E.g. J. Smith knows etc. I know that. Do you?"
sentences = sentence_splitter.tokenize(text)
# 結果: ['E.g. J. Smith knows etc.', 'I know that.', 'Do you?']
```

#### 詞語分詞
```python
# 分詞並分離標點
tokens = word_tokenize("Hey, what's going on? Who's that?")
# 結果: ['Hey', ',', 'what', "'s", 'going', 'on', '?', 'Who', "'s", 'that', '?']

# 轉做 NLTK 格式方便後續處理
nltk_text = nltk.Text(tokens)
```

#### 多文件處理
```python
def process_multiple_texts(crawled_texts):
    """將文本字串列表轉為 NLTK 文本物件"""
    my_nltk_texts = []
    
    for i in range(len(crawled_texts)):
        # 對每篇文檔分詞
        temp_tokens = word_tokenize(crawled_texts[i])
        # 轉做 NLTK 格式
        temp_text = nltk.Text(temp_tokens)
        my_nltk_texts.append(temp_text)
    
    return my_nltk_texts
```

### 4.3 大小寫統一（Case Normalization）

```python
def convert_to_lowercase(my_nltk_texts):
    """將所有 token 轉成細階（小寫），同時保留結構"""
    my_lowercase_texts = []
    
    for text in my_nltk_texts:
        lowercase_words = []
        for i in range(len(text)):
            lowercase_words.append(text[i].lower())
        
        # 改返做 NLTK 格式
        my_lowercase_texts.append(nltk.Text(lowercase_words))
    
    return my_lowercase_texts
```

**資訊損失考慮**：
- 專有名詞會同一般詞混淆（例如 “Green” 姓 vs “green” 顏色）
- 縮寫會失去意義
- 標題 vs 正文差異消失
- 句首大寫訊息唔見咗

### 4.4 詞幹提取（Stemming）

#### Porter Stemmer 實作
```python
from nltk.stem import PorterStemmer

def stem_text(nltk_text):
    """對 NLTK 文本做 Porter 詞幹提取"""
    stemmer = PorterStemmer()
    stemmed_words = []
    
    for word in nltk_text:
        stemmed_words.append(stemmer.stem(word))
    
    return stemmed_words

def process_all_texts_stemming(my_lowercase_texts):
    """對所有文檔做詞幹提取"""
    my_stemmed_texts = []
    
    for text in my_lowercase_texts:
        stemmed_words = stem_text(text)
        my_stemmed_texts.append(nltk.Text(stemmed_words))
    
    return my_stemmed_texts
```

**詞幹提取特性**：
- 將詞還原成詞根（未必係字典詞）
- "modeling" → "model"，"incredible" → "incred"
- 快同簡單
- 可能產生唔存在嘅詞

### 4.5 詞形還原（Lemmatization）

#### 配合詞性標註（POS Tagging）
```python
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag

def get_wordnet_pos(treebank_tag):
    """將 Penn Treebank 詞性轉做 WordNet 詞性"""
    if treebank_tag.startswith('N'):
        return 'n'  # 名詞
    elif treebank_tag.startswith('V'):
        return 'v'  # 動詞
    elif treebank_tag.startswith('J'):
        return 'a'  # 形容詞
    elif treebank_tag.startswith('R'):
        return 'r'  # 副詞
    else:
        return None

def lemmatize_text(nltk_text):
    """配合詞性標註做詞形還原"""
    lemmatizer = WordNetLemmatizer()
    
    # 攞 POS 標註，做情境感知還原
    tagged_text = pos_tag(nltk_text)
    lemmatized_text = []
    
    for word, pos_tag_result in tagged_text:
        wordnet_tag = get_wordnet_pos(pos_tag_result)
        
        if wordnet_tag:
            lemma = lemmatizer.lemmatize(word, wordnet_tag)
        else:
            lemma = word  # 冇合適標籤就原樣保留
        
        lemmatized_text.append(lemma)
    
    return lemmatized_text
```

**詞形還原 vs 詞幹提取**：
- 詞形還原會產生合法詞形
- 依賴上下文（需要 POS 標註）
- "lighter" → "light"（形容詞）或 "lighter"（名詞）
- 計算成本較高但語言學上更準
- 一般二選一，唔好同時用

---

## 5. 詞彙管理系統（Vocabulary Management System）

### 5.1 分布式詞彙構建（Distributed Vocabulary Construction）

```python
import numpy as np

def create_distributed_vocabularies(my_lemmatized_texts):
    """為每份文檔各自建立詞彙表"""
    my_vocabularies = []
    my_indices_vocabularies = []
    
    for text in my_lemmatized_texts:
        # 攞唯一詞同其索引
        unique_words, word_indices = np.unique(text, return_inverse=True)
        
        my_vocabularies.append(unique_words)
        my_indices_vocabularies.append(word_indices)
    
    return my_vocabularies, my_indices_vocabularies
```

### 5.2 詞彙統一（Vocabulary Unification）

```python
def unify_vocabularies(my_vocabularies, my_indices_vocabularies):
    """將所有文檔嘅詞彙表合併成一個統一詞彙表"""
    
    # 步驟 1：串接所有詞彙表
    big_vocabulary = []
    for vocabulary in my_vocabularies:
        big_vocabulary.extend(vocabulary)
    
    # 步驟 2：喺全部文檔中搵唯一詞
    unified_vocabulary, word_indices = np.unique(big_vocabulary, return_inverse=True)
    
    # 步驟 3：將文檔索引轉映射到統一詞彙表
    my_unified_indices_vocabularies = []
    vocabulary_start = 0
    
    for i in range(len(my_vocabularies)):
        # 攞當前文檔索引
        indices = np.array(my_indices_vocabularies[i])
        
        # 偏移到串接詞彙表嘅位置
        shifted_indices = indices + vocabulary_start
        
        # 轉為統一詞彙表索引
        unified_indices = word_indices[shifted_indices]
        my_unified_indices_vocabularies.append(unified_indices)
        
        # 更新下一份文檔嘅起點
        vocabulary_start += len(my_vocabularies[i])
    
    return unified_vocabulary, my_unified_indices_vocabularies
```

**統一詞彙嘅好處**：
- 跨文檔一致嘅詞索引
- 儲存同運算更有效率
- 支援跨文檔分析
- 係統計計算嘅基礎

---

## 6. 統計分析（Statistical Analysis）

### 6.1 詞統計計算（Word Statistics Computation）

```python
def compute_word_statistics(unified_vocabulary, unified_indices_vocabularies):
    """喺整個語料層面計算完整詞統計"""
    
    vocab_size = len(unified_vocabulary)
    num_documents = len(unified_indices_vocabularies)
    
    # 初始化統計陣列
    total_counts = np.zeros(vocab_size)
    document_counts = np.zeros(vocab_size)
    mean_counts = np.zeros(vocab_size)
    count_variances = np.zeros(vocab_size)
    
    # 第一輪：計數
    for doc_indices in unified_indices_vocabularies:
        temp_counts = np.zeros(vocab_size)
        
        # 當前文檔內逐 token 計數
        for token_index in doc_indices:
            temp_counts[token_index] += 1
        
        # 更新全域統計
        total_counts += temp_counts
        document_counts += (temp_counts > 0).astype(int)
    
    # 均值
    mean_counts = total_counts / num_documents
    
    # 第二輪：方差
    for doc_indices in unified_indices_vocabularies:
        temp_counts = np.zeros(vocab_size)
        
        for token_index in doc_indices:
            temp_counts[token_index] += 1
        
        # 平方偏差累積
        count_variances += (temp_counts - mean_counts) ** 2
    
    # 無偏估計
    count_variances = count_variances / (num_documents - 1)
    
    return total_counts, document_counts, mean_counts, count_variances
```

### 6.2 高頻詞分析（Top Words Analysis）

```python
def analyze_top_words(unified_vocabulary, total_counts, top_n=20):
    """顯示語料庫入面最頻繁嘅詞"""
    
    # 按總次數由高到低排序嘅索引
    sorted_indices = np.argsort(total_counts)[::-1]
    
    print(f"Top {top_n} words by total count:")
    for i in range(min(top_n, len(sorted_indices))):
        word_idx = sorted_indices[i]
        word = unified_vocabulary[word_idx]
        count = total_counts[word_idx]
        print(f"{word}: {count}")
```

---

## 7. 齊夫定律分析（Zipf's Law Analysis）

### 7.1 理論基礎（Theoretical Foundation）

![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/4.png)

**齊夫定律**：喺自然語言語料入面，某個詞嘅出現頻率與佢喺頻率表嘅排名成反比。

**數學表達式**：

$$
P(\text{word}_i) = \frac{1}{\text{rank}_i^{\,s}} \times C
$$

其中：
- $P(\text{word}_i)$ = 第 $i$ 個詞出現嘅概率
- $\text{rank}_i$ = 嗰個詞喺頻率表嘅排名
- $s$ = 指數（通常約等於 1）
- $C$ = 歸一化常數

### 7.2 經驗觀察（Empirical Observation）

基於 20 newsgroups 數據集嘅發現：
- 最高頻通常係標點同功能詞
- 冒號（':'）= 308,665 次
- 逗號（','）= 305,640 次  
- “the” = 256,006 次

**啟示**：
- 少數詞覆蓋大部分文本
- 最高頻詞往往資訊量低（停用詞）
- 罕見詞形成長尾
- 喺唔同語言同領域都幾普遍

### 7.3 視覺化代碼（Visualization Code）

```python
import matplotlib.pyplot as plt

def plot_zipf_distribution(total_counts, top_n=500):
    """畫出近似齊夫定律嘅詞頻分佈"""
    
    # 次數降序
    sorted_counts = np.sort(total_counts)[::-1]
    ranks = np.arange(1, len(sorted_counts) + 1)
    
    # 全量分佈
    plt.figure(figsize=(12, 5))
    
    plt.subplot(1, 2, 1)
    plt.loglog(ranks, sorted_counts)
    plt.xlabel('Word Rank')
    plt.ylabel('Word Count')
    plt.title('Zipf\'s Law: Full Distribution')
    plt.grid(True)
    
    # 頭 top_n
    plt.subplot(1, 2, 2)
    plt.loglog(ranks[:top_n], sorted_counts[:top_n])
    plt.xlabel('Word Rank')
    plt.ylabel('Word Count')
    plt.title(f'Zipf\'s Law: Top {top_n} Words')
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()
```

**實務意義**：
- 幫手決定預處理（例如移除停用詞）
- 影響詞彙表大小
- 影響抽樣同統計方法
- 係理解文本數據特徵嘅基礎

---

## 8. 最佳實踐（Implementation Best Practices）

### 8.1 錯誤處理考慮（Error Handling Considerations）

講解用嘅示例代碼係簡化版。生產環境應加入：

```python
def robust_file_reader(file_path, encodings=['utf-8', 'latin-1', 'cp1252']):
    """嘗試多個編碼去讀文件"""
    for encoding in encodings:
        try:
            with open(file_path, 'r', encoding=encoding) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
    raise ValueError(f"Could not decode file {file_path} with any encoding")

def safe_web_request(url, timeout=10, retries=3):
    """帶錯誤處理同重試嘅網絡請求"""
    for attempt in range(retries):
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()
            return response
        except requests.RequestException as e:
            if attempt == retries - 1:
                raise e
            time.sleep(2 ** attempt)  # 指數回退
```

### 8.2 倫理指南（Ethical Guidelines）

**研究倫理**：
- 取得數據收集嘅適當許可
- 匿名化個人可識別資訊
- 遵守 GDPR 同本地私隱法
- 尊重版權同授權條款

**網頁爬取倫理**：
- 檢查並遵守 robots.txt
- 做好速率限制
- 避免過載伺服器
- 留意服務條款（ToS）

### 8.3 可擴展性考慮（Scalability Considerations）

面向大規模處理：
- 用串流處理慳內存
- 能並行就並行
- 考慮分布式計算框架
- 喺詞彙構建期間監控內存

---

## 9. 總結同下一步（Summary and Next Steps）

### 主要收穫（Key Accomplishments）

今堂覆蓋咗文本處理流水線嘅基礎：
1. **數據獲取**：多來源多格式
2. **網頁爬取**：基礎實作同過濾
3. **文本預處理**：分詞、大小寫統一、詞幹/詞形還原
4. **詞彙管理**：統一詞彙表構建
5. **統計分析**：詞頻及分佈分析
6. **齊夫定律**：理論理解同經驗驗證

### 下星期主題（Upcoming Topics）

- **停用詞移除**：過濾低資訊量詞
- **進階預處理**：更精細嘅清理技巧
- **特徵選擇**：揀選較相關嘅詞彙子集
- **文本表示**：走向建模表示方法

### 實作練習（Practical Exercises）

學生會：
- 喺 Project Gutenberg 下載書
- 實作完整處理流水線
- 分析詞頻分佈
- 喺自己數據上驗證齊夫定律
- 比較處理選擇（詞幹 vs 詞形還原）

---

## 10. 技術附錄（Technical Appendix）

### 需要安裝嘅庫（Required Libraries Installation）
```bash
pip install nltk beautifulsoup4 requests numpy matplotlib
```

### NLTK 資源下載（NLTK Resource Downloads）
```python
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('tagsets')
```

### 常見編碼問題（Common Encoding Issues）
- **UTF-8**：標準但唔係完全通用
- **Latin-1**：西歐語言常用
- **CP1252**：Windows 編碼
- 可用 `errors='ignore'` 或 `errors='replace'` 增加魯棒性

### 性能注意（Performance Notes）
- 分詞計算比較重
- 詞性標註成本更高
- 統一詞彙要小心內存管理
- 統計計算會隨語料規模上升

---

*呢份筆記提供咗文本處理嘅完整實操基礎。熟練掌握之後，就可以進入之後課堂嘅高階建模同分析方法。*
