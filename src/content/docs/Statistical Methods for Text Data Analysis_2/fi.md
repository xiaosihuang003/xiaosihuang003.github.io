---
title: "Tilastolliset menetelmät tekstiaineiston analyysiin 2: Tekstinkäsittelyn vaiheet ja Zipfin laki"
subtitle: "Hankinta, puhdistus, tokenisointi, koodaus, tilastot ja Zipfin laki"
date: 2025-09-14
lang: fi
excerpt: "Käytännön tekstinkäsittelyputki: hankinta, puhdistus, tokenisointi, stemmaus vs. lemmatisointi (POS), yhtenäinen sanasto ja indeksointi, korpustilastot sekä Zipfin laki."
tags: [NLP, text-processing, crawling, tokenization, stemming, lemmatization, POS-tagging, vocabulary, statistics, Zipf]
draft: false
---

## 1. Johdanto ja kurssin yleiskuva

Luento keskittyy **käytännön tekstinkäsittelyn vaiheisiin** eikä edistyneeseen mallinnukseen. Ydinidea on tuottaa analysoitavaa dataa monenlaisista tekstilähteistä; käytännön toteutus on ensisijainen tavoite.

Tavoitteet:
- Ymmärtää koko tekstinkäsittelyputki
- Toteuttaa datan hankinta useista lähteistä
- Hallita tekstin puhdistus- ja esikäsittelytekniikat
- Rakentaa sanaston hallintajärjestelmiä
- Tunnistaa ja analysoida Zipfin laki tekstidatassa

---

## 2. Tekstinkäsittelyputken arkkitehtuuri

Työnkulku noudattaa jäsenneltyä putkea, jossa on palautesilmukoita:

### Vaiheiden yleiskatsaus
```bash
Data Acquisition → Data Cleanup → Information Extraction & Encoding
       ↑                ↑                        ↓
       └── Feedback ←──  └── Visualization & Inspection
                                        ↓
Performance Evaluation ← Prediction/Generalization ← Modeling
       ↑                        ↑                      ↓
       └── Feedback Loops ←─────┴── Task-based Applications
```

### Vaiheiden kuvaukset

### Vaihe 1: Datan hankinta
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/1.png)
**Tarkoitus**: Kerätä tekstidataa monipuolisista lähteistä

**Datalähteet**:
- **Valmiit kokoelmat**: 20 newsgroups, Wikipedia, Project Gutenberg
- **Verkkodatasarjat**: Kaggle-kokoelmat, akateemiset datasarjat
- **Sosiaalisen median rajapinnat**: Twitter/X (rajoitukset lisääntyvät LLM-scrapauksen vuoksi)
- **Verkkoindeksointi (crawling)**: Suora verkkosivujen louhinta
- **Tiedostokokoelmat**: Paikalliset hakemistot eri formaateilla

**Yleiset tiedostomuodot**:
- JSON (API-vastaukset)
- HTML/XML (verkkosisältö)
- Tekstitiedostot
- PDF, DOCX (vaatii muunnoksen)

### Vaihe 2: Datan puhdistus
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/2.png)
**Tarkoitus**: Poistaa vioittunut tai ei‑toivottu sisältö

**Keskeiset toimet**:
- Muunnos pelkkään tekstiin
- HTML‑tagien ja skriptien poisto
- Välilyöntien/tyhjämerkkien normalisointi
- Koodauksen standardointi (UTF‑8 ym.)

### Vaihe 3: Tiedon poiminta ja koodaus
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/3.png)
**Tarkoitus**: Luoda mallinnukseen sopivat esitykset

**Prosessit**:
- Poimia faktoja, avaintermejä ja entiteettejä
- Muuntaa teksti analysoitavaan muotoon
- Luoda rakenteisia esityksiä

### Vaihe 4: Visualisointi ja tarkastus
**Tarkoitus**: Laadunvarmistus ja palaute

**Toiminnot**:
- Arvioida käsittelyn laatua
- Tunnistaa koodausongelmia
- Tarvittaessa palauttaa aiempiin vaiheisiin

### Vaihe 5: Mallinnus
**Tarkoitus**: Rakentaa kokoelmatason esityksiä

**Mallityypit**:
- Kielimallit
- Koneoppimismallit
- Tilastolliset esitykset

### Vaihe 6: Tehtäväperustaiset sovellukset
**Esimerkkejä**: Luokittelu, klusterointi, sentimenttianalyysi, aiheiden mallinnus

### Vaihe 7: Ennustus ja yleistettävyys
**Tarkoitus**: Testata mallin soveltuvuutta koulutusdatan ulkopuolelle

**Arviointimenetelmät**:
- Suorituskykymittarit
- Ristiinvalidointi
- Erotettu testaus (held‑out)

---

## 3. Käytännön toteutus

### 3.1 Paikallisten tiedostojen käsittely

#### Tiedostojen haku
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

#### Tiedostojen lukeminen
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

### 3.2 Verkkorobotin (crawler) toteutus

#### Tarvittavat kirjastot
```python
import requests
from bs4 import BeautifulSoup
```

#### Yksittäisen sivun käsittely
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

#### URL-osoitteiden poiminta ja suodatus
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

#### Koko verkkorobotti
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

**Tärkeää verkkorobotista**:
- Tämä on perusversio ilman tuotantokelpoisia ominaisuuksia
- Puuttuu mm.: robots.txt‑noudattaminen, nopeusrajoitus, virheenkäsittely
- Eettiset näkökulmat: kunnioita sivuston käytäntöjä ja palvelinkuormaa

---

## 4. Tekstin esikäsittelytekniikat

### 4.1 Tyhjämerkkien normalisointi

#### Peruspuhdistus
```python
# Remove leading and trailing whitespace
clean_text = my_text_string.strip()

# Remove multiple whitespaces between words
clean_text = " ".join(my_text_string.split())
```

**Huomioita**:
- Välilyönnit voivat olla informatiivisia (kappaleiden sisennys, koodin rakenne)
- Rivinvaihdot voivat merkitä osioiden rajoja
- Python‑koodin analyysi edellyttää sisennysten säilyttämistä
- Tasapaino puhdistuksen ja informaation säilyttämisen välillä

### 4.2 Tokenisointi NLTK:lla

#### Tarvittavat asetukset
```python
import nltk
from nltk.tokenize import word_tokenize

# Download required resources (one-time setup)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
```

#### Virkejakoon
```python
# Load pre-trained sentence splitter
sentence_splitter = nltk.data.load('tokenizers/punkt/english.pickle')

# Example with abbreviations
text = "E.g. J. Smith knows etc. I know that. Do you?"
sentences = sentence_splitter.tokenize(text)
# Result: ['E.g. J. Smith knows etc.', 'I know that.', 'Do you?']
```

#### Sanojen tokenisointi
```python
# Tokenize with punctuation separation
tokens = word_tokenize("Hey, what's going on? Who's that?")
# Result: ['Hey', ',', 'what', "'s", 'going', 'on', '?', 'Who', "'s", 'that', '?']

# Convert to NLTK format for further processing
nltk_text = nltk.Text(tokens)
```

#### Useiden dokumenttien käsittely
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

### 4.3 Kirjainkoon normalisointi

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

**Informaation katoamisen huomioita**:
- Erisnimet menettävät erottuvuuden (esim. ”Green” vs. ”green”)
- Lyhenteiden merkitys hämärtyy
- Otsikon ja leipätekstin erot häviävät
- Lauseenalkujen suuraakkostieto katoaa

### 4.4 Stemmaus

#### Porter‑stemmerin käyttö
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

**Stemmauksen piirteet**:
- Pelkistää sanoja juuriin (ei välttämättä sanakirjamuotoja)
- "modeling" → "model", "incredible" → "incred"
- Nopea ja yksinkertainen
- Voi tuottaa ei‑sanoja

### 4.5 Lemmatisointi

#### POS‑tägäyksen hyödyntäminen
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

**Lemmatisointi vs. stemmaus**:
- Lemmatisointi tuottaa sanakirjamuotoja
- Kontekstiriippuvainen (vaatii POS‑tägäyksen)
- "lighter" → "light" (adjektiivi) tai "lighter" (substantiivi)
- Laskennallisesti raskaampi mutta kielellisesti tarkempi
- Valitse yleensä jompikumpi, älä molempia

---

## 5. Sanaston hallinta

### 5.1 Hajautettu sanaston muodostus

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

### 5.2 Sanastojen yhdistäminen

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

**Yhdistetyn sanaston hyödyt**:
- Yhtenäinen sananindeksointi kaikissa dokumenteissa
- Tehokkaampi tallennus ja käsittely
- Mahdollistaa dokumenttien välisen analyysin
- Perusta tilastollisille laskelmille

---

## 6. Tilastollinen analyysi

### 6.1 Sanatilastojen laskenta

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

### 6.2 Yleisimpien sanojen analyysi

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

## 7. Zipfin lain analyysi

### 7.1 Teoreettinen perusta

![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/4.png)

**Zipfin laki**: Luonnollisen kielen korpuksissa sanan frekvenssi on kääntäen verrannollinen sen sijoitukseen frekvenssitaulukossa.

**Matemaattinen muoto**:
```bash
P(word_i) = (1 / rank_i^s) × C
```
Missä:
- `P(word_i)` = sanan i todennäköisyys
- `rank_i` = sanan i sijoitus taulukossa
- `s` = eksponentti (tyypillisesti ≈ 1)
- `C` = normalisointivakio

### 7.2 Empiiriset havainnot

20 newsgroups ‑datan keskeisiä havaintoja:
- Yleisimmät ”sanat”: välimerkit ja funktiosanat
- Kaksoispiste (':') = 308 665 esiintymää
- Pilkku (',') = 305 640 esiintymää  
- "the" = 256 006 esiintymää

**Johtopäätökset**:
- Harvat sanat kattavat suurimman osan tekstistä
- Useimmin esiintyvät sanat ovat usein epäinformatiivisia (stop-sanat)
- Harvinaisten sanojen pitkä häntä
- Yleispätevä ilmiö kielestä ja domainista riippumatta

### 7.3 Visualisointikoodi

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

**Käytännön merkitys**:
- Ohjaa esikäsittelypäätöksiä (stop-sanojen poisto)
- Vaikuttaa sanaston kokovalintaan
- Vaikuttaa otantaan ja tilastomenetelmiin
- Keskeinen tekstiaineiston ominaisuuksien ymmärtämisessä

---

## 8. Toteutuksen parhaat käytännöt

### 8.1 Virheenkäsittely

Luentokoodi on yksinkertaistettu havainnollistamisen vuoksi. Tuotannossa tulisi olla mm.:

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

### 8.2 Eettiset ohjeet

**Tutkimuseettiset periaatteet**:
- Hanki asianmukaiset luvat datan keruuseen
- Anonymisoi henkilötiedot
- Noudata GDPR:ää ja paikallista tietosuojalainsäädäntöä
- Kunnioita tekijänoikeuksia ja lisenssejä

**Verkkorobotin etiikka**:
- Tarkista ja noudata robots.txt:tä
- Toteuta nopeusrajoitus
- Vältä palvelimien ylikuormittamista
- Huomioi käyttöehdot (ToS)

### 8.3 Skaalautuvuus

Suurimittakaavaiseen käsittelyyn:
- Käytä striimaavaa prosessointia muistin säästämiseksi
- Rinnakkaista, kun mahdollista
- Harkitse hajautettuja laskentakehyksiä
- Seuraa muistinkäyttöä sanaston muodostuksen aikana

---

## 9. Yhteenveto ja seuraavat askeleet

### Keskeiset opit

Tämä luento kattoi tekstinkäsittelyputken perusteet:
1. **Datan hankinta**: useat lähteet ja formaatit
2. **Verkkorobotti**: perustoteutus ja suodatus
3. **Esikäsittely**: tokenisointi, kirjainkoon normalisointi, stemmaus/lemmatisointi
4. **Sanaston hallinta**: yhtenäisen sanaston muodostus
5. **Tilastot**: sanataajuudet ja jakaumat
6. **Zipfin laki**: teoria ja empiirinen tarkastelu

### Ensi viikon aiheet

- **Stop-sanat**: epäinformatiivisten sanojen suodatus
- **Edistynyt esikäsittely**: kehittyneemmät puhdistustekniikat
- **Piirteiden valinta**: relevanttien alisanastojen valinta
- **Tekstiesitykset**: kohti mallinnusmenetelmiä

### Harjoitukset

Opiskelijat:
- Lataavat kirjoja Project Gutenbergista
- Toteuttavat koko käsittelyputken
- Analysoivat sanataajuusjakaumia
- Vahvistavat Zipfin lain omilla dataseteillä
- Vertailevat käsittelyvalintoja (stemmaus vs. lemmatisointi)

---

## 10. Tekninen liite

### Tarvittavien kirjastojen asennus
```bash
pip install nltk beautifulsoup4 requests numpy matplotlib
```

### NLTK-resurssien lataus
```python
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('tagsets')
```

### Yleiset koodausongelmat
- **UTF‑8**: standardi, mutta ei universaali
- **Latin‑1**: länsieurooppalaiset kielet
- **CP1252**: Windows-koodaus
- Käytä tarvittaessa error‑käsittelyä ('ignore' / 'replace')

### Suorituskykymuistiot
- Tokenisointi on laskennallisesti kallista
- POS‑tägäys lisää kuormaa
- Sanaston yhdistäminen vaatii huolellista muistinhallintaa
- Tilastolaskenta kasvaa korpuksen koon myötä

---

*Nämä muistiinpanot muodostavat käytännön perustan tekstinkäsittelylle. Kun nämä tekniikat ovat hallussa, voidaan edetä edistyneempiin mallinnus- ja analyysimenetelmiin seuraavilla luennoilla.*
