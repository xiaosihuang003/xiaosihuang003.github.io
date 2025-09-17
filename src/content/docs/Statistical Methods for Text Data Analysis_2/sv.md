---
title: "Statistiska metoder för textdataanalys 2: Steg i textbearbetning och Zipfs lag"
subtitle: "Insamling, rensning, tokenisering, kodning, statistik och Zipfs lag"
date: 2025-09-14
lang: sv
excerpt: "Praktisk textbearbetningspipeline: insamling, rensning, tokenisering, stemming vs. lemmatisering med POS, enhetligt ordförråd och indexering, korpusstatistik samt Zipfs lag."
tags: [NLP, text-processing, crawling, tokenization, stemming, lemmatization, POS-tagging, vocabulary, statistics, Zipf]
draft: false
---

## 1. Introduktion och kursöversikt

Föreläsningen fokuserar på **praktiska steg i textbearbetning** snarare än avancerad modellering. Kärnidén är att extrahera analyserbara data från olika textkällor, med praktisk implementering som huvudmål.

Centrala lärandemål:
- Förstå hela textbearbetningspipelinens flöde
- Implementera datainsamling från flera källor
- Bemästra rensning och förbehandling av text
- Bygga system för ordförrådshantering
- Känna igen och analysera Zipfs lag i textdata

---

## 2. Arkitektur för textbearbetningspipeline

Arbetsflödet följer en strukturerad pipeline med återkopplingsslingor:

### Översikt över stegen
```bash
Data Acquisition → Data Cleanup → Information Extraction & Encoding
       ↑                ↑                        ↓
       └── Feedback ←──  └── Visualization & Inspection
                                        ↓
Performance Evaluation ← Prediction/Generalization ← Modeling
       ↑                        ↑                      ↓
       └── Feedback Loops ←─────┴── Task-based Applications
```

### Stegbeskrivningar

### Steg 1: Datainsamling
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/1.png)
**Syfte**: Samla in textdata från olika källor

**Datakällor**:
- **Färdiga samlingar**: 20 newsgroups, Wikipedia, Project Gutenberg
- **Onlinedataset**: Kaggle-repositorier, akademiska dataset
- **Sociala medier-API:er**: Twitter/X (alltmer begränsade p.g.a. LLM-scraping)
- **Webbcrawling**: Direkt extrahering av webbsidor
- **Filsamlingar**: Lokala kataloger med olika format

**Vanliga dataformat**:
- JSON (API-svar)
- HTML/XML (webbinnehåll)
- Oformaterad text
- PDF, DOCX (kräver konvertering)

### Steg 2: Datarensning
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/2.png)
**Syfte**: Ta bort skadat eller oönskat innehåll

**Huvudaktiviteter**:
- Konvertering till ren text
- Borttagning av HTML-taggar och skript
- Normalisering av blanksteg
- Standardisering av teckenkodning (t.ex. UTF-8)

### Steg 3: Informationsutvinning och kodning
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/3.png)
**Syfte**: Skapa representationer som lämpar sig för modellering

**Processer**:
- Extrahera fakta, nyckeltermer och entiteter
- Omvandla text till analyserbara format
- Skapa strukturerade representationer

### Steg 4: Visualisering och granskning
**Syfte**: Kvalitetssäkring och återkoppling

**Funktioner**:
- Bedöma bearbetningskvalitet
- Identifiera kodningsproblem
- Vid behov återgå till tidigare steg

### Steg 5: Modellering
**Syfte**: Bygga representationer på samlingsnivå

**Modelltyper**:
- Språkmodeller
- Maskininlärningsmodeller
- Statistiska representationer

### Steg 6: Uppgiftsbaserade applikationer
**Exempel**: Klassificering, klustring, sentimentsanalys, ämnesmodellering

### Steg 7: Prediktion och generalisering
**Syfte**: Testa modellens tillämpbarhet bortom träningsdata

**Utvärderingsmetoder**:
- Prestandamått
- Korsvalidering
- Avskild testning (held-out)

---

## 3. Praktisk implementation

### 3.1 Bearbetning av lokala filer

#### System för filupptäckt
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

#### System för filinläsning
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

### 3.2 Implementation av webbcrawler

#### Nödvändiga bibliotek
```python
import requests
from bs4 import BeautifulSoup
```

#### Bearbetning av en enskild sida
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

#### URL-extraktion och filtrering
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

#### Fullständig webbcrawler
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

**Viktigt om webbcrawling**:
- Detta är en grundläggande implementation utan produktionsfunktioner
- Saknar: robots.txt-efterlevnad, hastighetsbegränsning, felhantering
- Etiska aspekter: respektera webbplatsers policyer och serverbelastning

---

## 4. Textförbehandlingstekniker

### 4.1 Normalisering av blanksteg

#### Grundläggande borttagning av blanksteg
```python
# Remove leading and trailing whitespace
clean_text = my_text_string.strip()

# Remove multiple whitespaces between words
clean_text = " ".join(my_text_string.split())
```

**Att beakta**:
- Blanksteg kan bära information (indrag, kodstruktur)
- Radbrytningar kan markera avsnittsgränser
- Analys av Python-kod kräver att indrag bevaras
- Avvägning mellan rensning och informationsbevarande

### 4.2 Tokenisering med NLTK

#### Nödvändiga inställningar
```python
import nltk
from nltk.tokenize import word_tokenize

# Download required resources (one-time setup)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
```

#### Meningssegmentering
```python
# Load pre-trained sentence splitter
sentence_splitter = nltk.data.load('tokenizers/punkt/english.pickle')

# Example with abbreviations
text = "E.g. J. Smith knows etc. I know that. Do you?"
sentences = sentence_splitter.tokenize(text)
# Result: ['E.g. J. Smith knows etc.', 'I know that.', 'Do you?']
```

#### Ordtokenisering
```python
# Tokenize with punctuation separation
tokens = word_tokenize("Hey, what's going on? Who's that?")
# Result: ['Hey', ',', 'what', "'s", 'going', 'on', '?', 'Who', "'s", 'that', '?']

# Convert to NLTK format for further processing
nltk_text = nltk.Text(tokens)
```

#### Bearbetning av flera dokument
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

### 4.3 Normalisering av skiftläge

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

**Risk för informationsförlust**:
- Egennamn förlorar särart (t.ex. ”Green” namn vs. ”green” färg)
- Akronymer tappar betydelse
- Skillnader mellan titel och brödtext suddas ut
- Information om versal i meningsbörjan försvinner

### 4.4 Stemming

#### Implementation av Porter-stemmer
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

**Egenskaper hos stemming**:
- Reducerar ord till rötter (behöver inte vara giltiga ord)
- "modeling" → "model", "incredible" → "incred"
- Snabb och enkel
- Kan ge icke-ord

### 4.5 Lemmatisering

#### Integrering av ordklasstaggning (POS)
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

**Lemmatisering vs. stemming**:
- Lemmatisering ger giltiga uppslagsformer
- Kontextberoende (kräver POS-taggning)
- "lighter" → "light" (adjektiv) eller "lighter" (substantiv)
- Mer beräkningskrävande men språkligt korrektare
- Välj vanligtvis ett av tillvägagångssätten, inte båda

---

## 5. System för ordförrådshantering

### 5.1 Distribuerad konstruktion av ordförråd

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

### 5.2 Sammanfogning av ordförråd

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

**Fördelar med ett enhetligt ordförråd**:
- Konsistent ordindexering i alla dokument
- Effektivare lagring och bearbetning
- Möjliggör analys över dokument
- Grund för statistiska beräkningar

---

## 6. Statistisk analys

### 6.1 Beräkning av ordstatistik

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

### 6.2 Analys av vanligaste ord

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

## 7. Analys av Zipfs lag

### 7.1 Teoretisk grund

![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/4.png)

**Zipfs lag**: I naturligt språk är ett ords frekvens omvänt proportionell mot dess rang i frekvenstabellen.

**Matematisk form**:
```bash
P(word_i) = (1 / rank_i^s) × C
```
Där:
- `P(word_i)` = sannolikheten för ord i
- `rank_i` = ordets rang i frekvenstabellen
- `s` = exponent (typiskt ≈ 1)
- `C` = normaliseringskonstant

### 7.2 Empiriska observationer

Nyckelfynd från datasetet 20 newsgroups:
- Topporden: skiljetecken och funktionsord
- Kolon (':') = 308 665 förekomster
- Komma (',') = 305 640 förekomster  
- "the" = 256 006 förekomster

**Implikationer**:
- Få ord står för majoriteten av texten
- De vanligaste orden är ofta oinformativa (stopwords)
- Lång svans av sällsynta ord
- Universellt mönster över språk och domäner

### 7.3 Visualiseringskod

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
    plt.title('Zipf's Law: Full Distribution')
    plt.grid(True)
    
    # Plot top N words
    plt.subplot(1, 2, 2)
    plt.loglog(ranks[:top_n], sorted_counts[:top_n])
    plt.xlabel('Word Rank')
    plt.ylabel('Word Count')
    plt.title(f'Zipf's Law: Top {top_n} Words')
    plt.grid(True)
    
    plt.tight_layout()
    plt.show()
```

**Praktisk betydelse**:
- Vägleder förbehandlingsbeslut (borttagning av stoppord)
- Påverkar val av ordförrådets storlek
- Påverkar samp ling och statistiska metoder
- Grundläggande för förståelse av textdatas egenskaper

---

## 8. Bästa praxis för implementation

### 8.1 Felhantering

Exempelkoden i föreläsningen är förenklad för tydlighet. I produktion bör man inkludera:

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

### 8.2 Etiska riktlinjer

**Forskningsetik**:
- Skaffa nödvändiga tillstånd för datainsamling
- Anonymisera personidentifierbar information
- Följ GDPR och lokala sekretesslagar
- Respektera upphovsrätt och licensvillkor

**Etik för webbcrawling**:
- Kontrollera och respektera robots.txt
- Implementera hastighetsbegränsning
- Undvik att överbelasta servrar
- Beakta användarvillkor (ToS)

### 8.3 Skalbarhetsöverväganden

För storskalig textbearbetning:
- Använd strömmande (streaming) bearbetning för minneshushållning
- Parallellisera där det är möjligt
- Överväg distribuerade beräkningsramverk
- Övervaka minnesanvändning vid ordförrådsbygge

---

## 9. Sammanfattning och nästa steg

### Viktigaste lärdomar

Denna föreläsning täckte grunderna i textbearbetningspipelin en:
1. **Datainsamling**: flera källor och format
2. **Webbcrawling**: grundläggande implementation med filtrering
3. **Textförbehandling**: tokenisering, normalisering av skiftläge, stemming/lemmatisering
4. **Ordförrådshantering**: uppbyggnad av enhetligt ordförråd
5. **Statistisk analys**: ordfrekvens och fördelning
6. **Zipfs lag**: teoretisk förståelse och empirisk validering

### Kommande ämnen

Fokusområden nästa vecka:
- **Stoppord**: filtrering av oinformativa ord
- **Avancerad förbehandling**: mer sofistikerade rensningstekniker
- **Urval av egenskaper**: välja relevanta delmängder av ordförrådet
- **Textrepresentation**: mot modellbaserade metoder

### Praktiska övningar

Studenter kommer att:
- Ladda ner böcker från Project Gutenberg
- Implementera en komplett bearbetningspipeline
- Analysera ordfrekvensfördelningar
- Validera Zipfs lag på egna dataset
- Jämföra bearbetningsval (stemming vs. lemmatisering)

---

## 10. Teknisk bilaga

### Installation av nödvändiga bibliotek
```bash
pip install nltk beautifulsoup4 requests numpy matplotlib
```

### Nerladdning av NLTK-resurser
```python
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('tagsets')
```

### Vanliga kodningsproblem
- **UTF-8**: standard men inte universell
- **Latin-1**: västeuropeiska språk
- **CP1252**: Windows-kodning
- Använd vid behov `errors='ignore'` eller `errors='replace'`

### Prestandanoteringar
- Tokenisering är beräkningsmässigt kostsam
- POS-taggning ökar beräkningsbördan
- Sammanfogning av ordförråd kräver noggrann minneshantering
- Statistiska beräkningar skalar med korpusstorlek

---

*Dessa anteckningar utgör den praktiska grunden för textbearbetning. När du behärskar teknikerna kan du gå vidare till avancerad modellering och analys i kommande föreläsningar.*
