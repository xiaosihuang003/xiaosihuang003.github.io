---
title: "文本数据分析的统计方法 2：文本处理阶段与齐夫定律"
subtitle: "获取、清洗、分词、编码、统计与齐夫定律"
date: 2025-09-14
lang: zh
excerpt: "实践性文本处理流水线：数据获取、清理、分词、词干提取与词形还原、统一词汇与索引、语料统计、齐夫定律。"
tags: [NLP, 文本处理, 爬虫, 分词, 词干提取, 词形还原, 词性标注, 词汇表, 统计, 齐夫定律]
draft: false
---

## 1. 引言与课程概览

本次讲座重点在于 **动手实践的文本处理阶段**，而不是高级建模。核心概念是从各种文本来源提取可分析的数据，并以实践实现为主要目标。

学习目标：
- 理解完整的文本处理流水线
- 实现多源数据采集
- 掌握文本清洗和预处理技术
- 构建词汇管理系统
- 识别并分析文本数据中的齐夫定律

---

## 2. 文本处理流水线架构

文本处理遵循一个有反馈回路的结构化流水线：

### 流水线阶段总览
```bash
    Data Acquisition → Data Cleanup → Information Extraction & Encoding
           ↑                ↑                        ↓
           └── Feedback ←──  └── Visualization & Inspection
                                            ↓
    Performance Evaluation ← Prediction/Generalization ← Modeling
           ↑                        ↑                      ↓
           └── Feedback Loops ←─────┴── Task-based Applications
```

### 阶段详情

### 阶段 1：数据获取
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/1.png)

**目的**：收集来自多种来源的文本数据

**数据来源**：
- **预制集合**：20 newsgroups、Wikipedia、Project Gutenberg
- **在线数据集**：Kaggle 数据仓库、学术数据集
- **社交媒体 API**：Twitter/X（由于 LLM 抓取限制日益严格）
- **网页爬取**：直接提取网页内容
- **文件集合**：本地目录中的多种格式文件

**常见数据格式**：
- JSON（API 响应）
- HTML/XML（网页内容）
- 纯文本文件
- PDF、DOCX（需要转换）

### 阶段 2：数据清洗
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/2.png)

**目的**：去除损坏或不需要的内容

**主要任务**：
- 格式转换为纯文本
- 移除 HTML 标签与脚本
- 归一化空白符
- 标准化编码（处理 UTF-8）

### 阶段 3：信息抽取与编码
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/3.png)

**目的**：创建适合建模的表示

**处理流程**：
- 抽取事实、关键词、实体
- 将文本转化为可分析的格式
- 创建结构化表示

### 阶段 4：可视化与检查
**目的**：质量保证与反馈

**功能**：
- 评估处理质量
- 识别编码问题
- 必要时回退前一阶段

### 阶段 5：建模
**目的**：建立集合级别的表示

**模型类型**：
- 语言模型
- 机器学习模型
- 统计表示

### 阶段 6：任务驱动应用
**示例**：分类、聚类、情感分析、主题建模

### 阶段 7：预测与泛化
**目的**：测试模型在训练数据之外的适用性

**评估方法**：
- 性能指标
- 交叉验证
- 留出测试

---

## 3. 实践实现

### 3.1 本地文件处理

#### 文件发现系统

```bash
    import os

    def get_text_files_list(directory_path):
        """
        将目录下文件分类为文本文件、非文本文件、非文件
        
        参数：
            directory_path (str): 要扫描的目录路径
            
        返回：
            tuple: (text_files, not_text_files, non_files)
        """
        directory_text_files = []
        not_text_files = []
        non_files = []
        
        directory_contents = os.listdir(directory_path)
        
        for item in directory_contents:
            full_path = os.path.join(directory_path, item)
            
            # 检查是否为文件
            if not os.path.isfile(full_path):
                non_files.append(item)
            elif ".txt" in full_path:  # 简单文本文件检测
                directory_text_files.append(item)
            else:
                not_text_files.append(item)
        
        return directory_text_files, not_text_files, non_files
```

#### 文件读取系统

```bash

    def basic_file_crawler(directory_path):
        """
        读取目录中所有文本文件
        
        参数：
            directory_path (str): 包含文本文件的目录
            
        返回：
            tuple: (file_names, file_contents)
        """
        num_files_read = 0
        crawled_file_names = []
        crawled_texts = []
        
        # 获取文本文件列表
        directory_contents_lists = get_text_files_list(directory_path)
        directory_text_files = directory_contents_lists[0]
        
        for file_name in directory_text_files:
            print(f"Reading file: {file_name}")
            full_path = os.path.join(directory_path, file_name)
            
            # 打开文件，处理编码错误
            with open(full_path, 'r', encoding='utf-8', errors='ignore') as temp_file:
                temp_text = temp_file.read()
            
            crawled_file_names.append(file_name)
            crawled_texts.append(temp_text)
            num_files_read += 1
        
        return crawled_file_names, crawled_texts
```

### 3.2 网页爬虫实现

#### 需要的库

```bash
    import requests
    from bs4 import BeautifulSoup
```

#### 单页处理

```bash
    def get_page_content(url):
        """从 URL 提取并解析 HTML 内容"""
        response = requests.get(url)
        parsed_page = BeautifulSoup(response.content, 'html.parser')
        return parsed_page

    def get_page_text(parsed_page):
        """从解析后的 HTML 中提取纯文本，移除脚本"""
        # 移除脚本元素（它们包含非正文代码）
        for script in parsed_page.find_all("script"):
            script.extract()  # 修改 parsed_page 对象
        
        return parsed_page.get_text()
```

#### URL 提取与过滤

```bash
    def get_page_urls(webpage):
        """
        从网页中提取并过滤 URL
        
        参数：
            webpage: BeautifulSoup 解析后的页面对象
            
        返回：
            list: 过滤后的有效 URL 列表
        """
        page_links = webpage.find_all('a')
        page_urls = []
        
        for page_link in page_links:
            page_url_is_ok = 1
            
            # 尝试提取 href 属性
            try:
                page_url = page_link['href']
            except:
                page_url_is_ok = 0
            
            if page_url_is_ok:
                # 过滤掉文档文件
                if page_url.find('.pdf') != -1 or page_url.find('.ps') != -1:
                    page_url_is_ok = 0
                
                # 必须是 HTTP 协议
                if page_url.find('http') == -1:
                    page_url_is_ok = 0
                
                # 域名过滤（示例：仅 .fi 域名）
                if page_url.find('.fi') == -1:
                    page_url_is_ok = 0
            
            if page_url_is_ok:
                page_urls.append(page_url)
        
        return page_urls
```

#### 完整网页爬虫

```bash
    def basic_web_crawler(seed_page_url, max_pages):
        """
        从种子 URL 开始爬取网页
        
        参数：
            seed_page_url (str): 起始 URL
            max_pages (int): 最大爬取页面数
            
        返回：
            tuple: (crawled_urls, crawled_texts)
        """
        pages_crawled = 0
        crawled_urls = []
        crawled_texts = []
        pages_to_crawl = [seed_page_url]
        
        while pages_crawled < max_pages and len(pages_to_crawl) > 0:
            # 获取下一个要爬的 URL
            current_url = pages_to_crawl[0]
            print(f"Crawling: {current_url}")
            
            # 获取并解析页面
            response = requests.get(current_url)
            parsed_page = BeautifulSoup(response.content, 'html.parser')
            
            # 提取正文与 URL
            page_text = get_page_text(parsed_page)
            page_urls = get_page_urls(parsed_page)
            
            # 存储结果
            pages_crawled += 1
            crawled_urls.append(current_url)
            crawled_texts.append(page_text)
            
            # 更新爬取队列
            pages_to_crawl = pages_to_crawl[1:]    # 移除已处理 URL
            pages_to_crawl.extend(page_urls)       # 添加新发现 URL
        
        return crawled_urls, crawled_texts
```

**网页爬虫注意事项**：
- 此实现较为基础，缺少生产级特性
- 缺失：robots.txt 合规、速率限制、错误处理
- 伦理考虑：尊重网站策略与服务器负载

---

## 4. 文本预处理技术

### 4.1 空白符规范化

#### 基本空白符去除

```bash
    # 去掉首尾空白
    clean_text = my_text_string.strip()

    # 去掉单词间多余空白
    clean_text = " ".join(my_text_string.split())
```

**注意事项**：
- 空白符可能有信息（段落缩进、代码结构）
- 换行符可能表示段落边界
- Python 代码分析需要保留缩进
- 在清理与保留信息之间取得平衡

### 4.2 使用 NLTK 进行分词

#### 安装准备

```bash
    import nltk
    from nltk.tokenize import word_tokenize

    # 下载所需资源（首次执行）
    nltk.download('punkt')
    nltk.download('averaged_perceptron_tagger')
    nltk.download('wordnet')
```

#### 句子分割

```bash
    # 加载预训练句子分割器
    sentence_splitter = nltk.data.load('tokenizers/punkt/english.pickle')

    # 示例，包含缩写
    text = "E.g. J. Smith knows etc. I know that. Do you?"
    sentences = sentence_splitter.tokenize(text)
    # 结果: ['E.g. J. Smith knows etc.', 'I know that.', 'Do you?']
```

#### 单词分词
```bash
    # 分词并分离标点
    tokens = word_tokenize("Hey, what's going on? Who's that?")
    # 结果: ['Hey', ',', 'what', "'s", 'going', 'on', '?', 'Who', "'s", 'that', '?']

    # 转为 NLTK 格式便于后续处理
    nltk_text = nltk.Text(tokens)
```

#### 多文档处理

```bash
    def process_multiple_texts(crawled_texts):
        """将文本字符串列表转为 NLTK 格式文本"""
        my_nltk_texts = []
        
        for i in range(len(crawled_texts)):
            # 对每个文档分词
            temp_tokens = word_tokenize(crawled_texts[i])
            # 转为 NLTK 格式
            temp_text = nltk.Text(temp_tokens)
            my_nltk_texts.append(temp_text)
        
        return my_nltk_texts
```

### 4.3 大小写归一化
```bash
    def convert_to_lowercase(my_nltk_texts):
        """将所有 token 转为小写，同时保留结构"""
        my_lowercase_texts = []
        
        for text in my_nltk_texts:
            lowercase_words = []
            for i in range(len(text)):
                lowercase_words.append(text[i].lower())
            
            # 转回 NLTK 格式
            my_lowercase_texts.append(nltk.Text(lowercase_words))
        
        return my_lowercase_texts
```

**信息损失注意**：
- 专有名词失去区分（“Green” 姓氏 vs “green” 颜色）
- 缩写丢失语义
- 标题与正文差异消失
- 句首大写信息丢失

### 4.4 词干提取

#### Porter Stemmer 实现
```bash
    from nltk.stem import PorterStemmer

    def stem_text(nltk_text):
        """对 NLTK 文本应用 Porter 词干提取"""
        stemmer = PorterStemmer()
        stemmed_words = []
        
        for word in nltk_text:
            stemmed_words.append(stemmer.stem(word))
        
        return stemmed_words

    def process_all_texts_stemming(my_lowercase_texts):
        """对所有文档应用词干提取"""
        my_stemmed_texts = []
        
        for text in my_lowercase_texts:
            stemmed_words = stem_text(text)
            my_stemmed_texts.append(nltk.Text(stemmed_words))
        
        return my_stemmed_texts
```

**词干提取特点**：
- 将单词简化为词根（不一定是合法词）
- "modeling" → "model"，"incredible" → "incred"
- 快速简单
- 可能产生不存在的词形

### 4.5 词形还原

#### 结合词性标注

```bash
    from nltk.stem import WordNetLemmatizer
    from nltk import pos_tag

    def get_wordnet_pos(treebank_tag):
        """将 Penn Treebank 词性标签转换为 WordNet 词性"""
        if treebank_tag.startswith('N'):
            return 'n'  # 名词
        elif treebank_tag.startswith('V'):
            return 'v'  # 动词
        elif treebank_tag.startswith('J'):
            return 'a'  # 形容词
        elif treebank_tag.startswith('R'):
            return 'r'  # 副词
        else:
            return None

    def lemmatize_text(nltk_text):
        """结合词性标注进行词形还原"""
        lemmatizer = WordNetLemmatizer()
        
        # 获取词性标签以便上下文感知词形还原
        tagged_text = pos_tag(nltk_text)
        lemmatized_text = []
        
        for word, pos_tag_result in tagged_text:
            wordnet_tag = get_wordnet_pos(pos_tag_result)
            
            if wordnet_tag:
                lemma = lemmatizer.lemmatize(word, wordnet_tag)
            else:
                lemma = word  # 无合适标签则保持原样
            
            lemmatized_text.append(lemma)
        
        return lemmatized_text
```

**词形还原 vs 词干提取**：
- 词形还原生成合法词形
- 上下文相关（需词性标注）
- "lighter" → "light"（形容词）或 "lighter"（名词）
- 计算更耗时，但语言学准确
- 一般二选一，不要叠加使用

---

## 5. 词汇管理系统

### 5.1 分布式词汇构建
```bash
    import numpy as np

    def create_distributed_vocabularies(my_lemmatized_texts):
        """分别为每个文档构建词汇表"""
        my_vocabularies = []
        my_indices_vocabularies = []
        
        for text in my_lemmatized_texts:
            # 获取唯一词及其索引
            unique_words, word_indices = np.unique(text, return_inverse=True)
            
            my_vocabularies.append(unique_words)
            my_indices_vocabularies.append(word_indices)
        
        return my_vocabularies, my_indices_vocabularies
```

### 5.2 词汇统一

```bash
    def unify_vocabularies(my_vocabularies, my_indices_vocabularies):
        """合并所有文档的词汇表为统一词汇表"""
        
        # 第一步：拼接所有词汇表
        big_vocabulary = []
        for vocabulary in my_vocabularies:
            big_vocabulary.extend(vocabulary)
        
        # 第二步：查找所有文档中的唯一词
        unified_vocabulary, word_indices = np.unique(big_vocabulary, return_inverse=True)
        
        # 第三步：将文档索引映射到统一词汇表索引
        my_unified_indices_vocabularies = []
        vocabulary_start = 0
        
        for i in range(len(my_vocabularies)):
            # 获取当前文档索引
            indices = np.array(my_indices_vocabularies[i])
            
            # 偏移到拼接词汇表中的位置
            shifted_indices = indices + vocabulary_start
            
            # 映射到统一词汇表索引
            unified_indices = word_indices[shifted_indices]
            my_unified_indices_vocabularies.append(unified_indices)
            
            # 更新下一文档的起始位置
            vocabulary_start += len(my_vocabularies[i])
        
        return unified_vocabulary, my_unified_indices_vocabularies
```

**统一词汇的好处**：
- 所有文档共享一致的词索引
- 存储与处理更高效
- 支持跨文档分析
- 为统计计算提供基础

## 6. 统计分析

### 6.1 词频统计计算

```bash
    def compute_word_statistics(unified_vocabulary, unified_indices_vocabularies):
        """计算整个语料库的综合词频统计"""
        
        vocab_size = len(unified_vocabulary)
        num_documents = len(unified_indices_vocabularies)
        
        # 初始化统计数组
        total_counts = np.zeros(vocab_size)
        document_counts = np.zeros(vocab_size)
        mean_counts = np.zeros(vocab_size)
        count_variances = np.zeros(vocab_size)
        
        # 第一遍：计数
        for doc_indices in unified_indices_vocabularies:
            temp_counts = np.zeros(vocab_size)
            
            # 统计当前文档中词出现次数
            for token_index in doc_indices:
                temp_counts[token_index] += 1
            
            # 更新全局统计
            total_counts += temp_counts
            document_counts += (temp_counts > 0).astype(int)
        
        # 计算均值
        mean_counts = total_counts / num_documents
        
        # 第二遍：计算方差
        for doc_indices in unified_indices_vocabularies:
            temp_counts = np.zeros(vocab_size)
            
            for token_index in doc_indices:
                temp_counts[token_index] += 1
            
            # 累积平方偏差
            count_variances += (temp_counts - mean_counts) ** 2
        
        # 方差无偏估计
        count_variances = count_variances / (num_documents - 1)
        
        return total_counts, document_counts, mean_counts, count_variances
```

### 6.2 高频词分析

```bash
    def analyze_top_words(unified_vocabulary, total_counts, top_n=20):
        """显示语料库中最频繁的词"""
        
        # 索引按总频次降序
        sorted_indices = np.argsort(total_counts)[::-1]
        
        print(f"Top {top_n} words by total count:")
        for i in range(min(top_n, len(sorted_indices))):
            word_idx = sorted_indices[i]
            word = unified_vocabulary[word_idx]
            count = total_counts[word_idx]
            print(f"{word}: {count}")
```

---

## 7. 齐夫定律分析

### 7.1 理论基础

![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/4.png)

**齐夫定律（Zipf's Law）**：在自然语言语料中，词的频率与其在频率表中的排名成反比。

**数学表达式**：

$$
P(\text{word}_i) = \frac{1}{\text{rank}_i^{\,s}} \times C
$$

其中：
- $P(\text{word}_i)$：第 $i$ 个词出现的概率
- $\text{rank}_i$：该词在频率表中的排名
- $s$：指数（通常约为 1）
- $C$：归一化常数

### 7.2 经验观察

来自 20 newsgroups 数据集的关键发现：
- 高频词多为标点和功能词
- 冒号（':'）出现 308,665 次
- 逗号（','）出现 305,640 次  
- “the” 出现 256,006 次

**启示**：
- 少数词占据了大部分文本
- 最频繁的词往往信息量低（停用词）
- 罕见词形成长尾
- 跨语言与领域呈现普适模式

### 7.3 可视化代码

```bash
    import matplotlib.pyplot as plt

    def plot_zipf_distribution(total_counts, top_n=500):
        """绘制遵循齐夫定律的词频分布"""
        
        # 频次降序
        sorted_counts = np.sort(total_counts)[::-1]
        ranks = np.arange(1, len(sorted_counts) + 1)
        
        # 全量分布
        plt.figure(figsize=(12, 5))
        
        plt.subplot(1, 2, 1)
        plt.loglog(ranks, sorted_counts)
        plt.xlabel('Word Rank')
        plt.ylabel('Word Count')
        plt.title('Zipf\'s Law: Full Distribution')
        plt.grid(True)
        
        # Top N
        plt.subplot(1, 2, 2)
        plt.loglog(ranks[:top_n], sorted_counts[:top_n])
        plt.xlabel('Word Rank')
        plt.ylabel('Word Count')
        plt.title(f'Zipf\'s Law: Top {top_n} Words')
        plt.grid(True)
        
        plt.tight_layout()
        plt.show()
```

**实践意义**：
- 指导预处理决策（停用词移除）
- 影响词汇表大小选择
- 影响采样与统计方法
- 理解文本数据特征的基础

---

## 8. 实施最佳实践

### 8.1 错误处理注意事项

```bash

讲义中的代码为讲解而简化。生产实现应包含：

    def robust_file_reader(file_path, encodings=['utf-8', 'latin-1', 'cp1252']):
        """多编码尝试的文件读取"""
        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding) as f:
                    return f.read()
            except UnicodeDecodeError:
                continue
        raise ValueError(f"Could not decode file {file_path} with any encoding")

    def safe_web_request(url, timeout=10, retries=3):
        """带错误处理与重试的网络请求"""
        for attempt in range(retries):
            try:
                response = requests.get(url, timeout=timeout)
                response.raise_for_status()
                return response
            except requests.RequestException as e:
                if attempt == retries - 1:
                    raise e
                time.sleep(2 ** attempt)  # 指数回退
```

### 8.2 伦理指南

**科研伦理**：
- 获得数据收集的适当授权
- 匿名化个人可识别信息
- 遵守 GDPR 与本地隐私法规
- 尊重版权与许可条款

**网页爬取伦理**：
- 检查并遵守 robots.txt
- 实施速率限制
- 避免过载服务器
- 考虑服务条款（ToS）

### 8.3 可扩展性考虑

面向大规模文本处理：
- 使用流式处理以节省内存
- 尽可能并行化
- 采用分布式计算框架
- 在词汇构建阶段监控内存

---

## 9. 总结与下一步

### 关键成果

本讲覆盖了文本处理流水线的基础：
1. **数据获取**：多种来源与格式
2. **网页爬取**：基础实现与过滤
3. **文本预处理**：分词、归一化、词干/词形还原
4. **词汇管理**：统一词汇表构建
5. **统计分析**：词频与分布分析
6. **齐夫定律**：理论与经验验证

### 下周主题

- **停用词移除**：过滤低信息量词
- **高级预处理**：更复杂的清理技巧
- **特征选择**：挑选相关词汇子集
- **文本表示**：迈向建模方法

### 实践练习

学生将：
- 从 Project Gutenberg 下载图书
- 实现完整处理流水线
- 分析词频分布
- 在个人数据集上验证齐夫定律
- 比较处理选择（词干 vs 词形还原）

---

## 10. 技术附录

### 所需库安装

```bash
    pip install nltk beautifulsoup4 requests numpy matplotlib
```
### NLTK 资源下载

```bash
    import nltk
    nltk.download('punkt')
    nltk.download('averaged_perceptron_tagger')
    nltk.download('wordnet')
    nltk.download('tagsets')
```

### 常见编码问题
- **UTF-8**：标准但非普适
- **Latin-1**：西欧语言常用
- **CP1252**：Windows 编码
- 可使用 `errors='ignore'` 或 `errors='replace'` 提高鲁棒性

### 性能提示
- 分词计算开销较大
- 词性标注显著增加耗时
- 统一词汇需要谨慎的内存管理
- 统计计算随语料规模线性~超线性增长

---

*这些笔记构成了文本处理的完整动手基础。掌握这些技术后，便可进入后续讲座中的高级建模与分析方法。*
