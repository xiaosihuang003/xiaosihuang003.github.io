---
title: "Statistiske metoder for analyse av tekstdata 2: Tekstbehandlingsfaser og Zipfs lov"
subtitle: "Innsamling, rensing, tokenisering, koding, statistikk og Zipfs lov"
date: 2025-09-14
lang: no
excerpt: "Praktisk tekstbehandlingspipeline: innsamling, rensing, tokenisering, stemming vs. lemmatisering med POS, enhetlig vokabular og indeksering, korpusstatistikk og Zipfs lov."
tags: [NLP, text-processing, crawling, tokenization, stemming, lemmatization, POS-tagging, vocabulary, statistics, Zipf]
draft: false
---

## 1. Introduksjon og kursoversikt

Forelesningen fokuserer på **praktiske trinn i tekstbehandling** heller enn avansert modellering. Kjerneideen er å hente ut analyserbare data fra ulike tekstkilder, med praktisk implementering som hovedmål.

Viktige læringsmål:
- Forstå hele tekstbehandlingspipelinens flyt
- Implementere datainnsamling fra flere kilder
- Mestre rensing og forbehandling av tekst
- Bygge systemer for vokabularhåndtering
- Gjenkjenne og analysere Zipfs lov i tekstdata

---

## 2. Arkitektur for tekstbehandlingspipeline

Arbeidsflyten følger en strukturert pipeline med tilbakemeldingssløyfer:

### Oversikt over pipelinens faser
```bash
Data Acquisition → Data Cleanup → Information Extraction & Encoding
       ↑                ↑                        ↓
       └── Feedback ←──  └── Visualization & Inspection
                                        ↓
Performance Evaluation ← Prediction/Generalization ← Modeling
       ↑                        ↑                      ↓
       └── Feedback Loops ←─────┴── Task-based Applications
```

### Fasebeskrivelser

### Fase 1: Datainnsamling
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/1.png)
**Formål**: Samle inn tekstdata fra ulike kilder

**Datakilder**:
- **Ferdiglagde samlinger**: 20 newsgroups, Wikipedia, Project Gutenberg
- **Datasett på nett**: Kaggle-repositorier, akademiske datasett
- **API-er for sosiale medier**: Twitter/X (stadig mer begrenset pga. LLM-scraping)
- **Nettcrawling**: Direkte uthenting fra nettsider
- **Filsamlinger**: Lokale kataloger med ulike formater

**Vanlige dataformater**:
- JSON (API-responser)
- HTML/XML (nettinhold)
- Ren tekst
- PDF, DOCX (krever konvertering)

### Fase 2: Datarensing
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/2.png)
**Formål**: Fjerne ødelagt eller uønsket innhold

**Hovedaktiviteter**:
- Konvertering til ren tekst
- Fjerning av HTML-tagger og skript
- Normalisering av blanktegn
- Standardisering av tegnkoding (f.eks. UTF-8)

### Fase 3: Informasjonsuttrekk og koding
![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/3.png)
**Formål**: Lage representasjoner som passer for modellering

**Prosesser**:
- Trekke ut fakta, nøkkeltermer og entiteter
- Transformere tekst til analyserbare formater
- Lage strukturerte representasjoner

### Fase 4: Visualisering og inspeksjon
**Formål**: Kvalitetssikring og tilbakemelding

**Funksjoner**:
- Vurdere kvaliteten på behandlingen
- Identifisere kodingsproblemer
- Ved behov gå tilbake til tidligere faser

### Fase 5: Modellering
**Formål**: Bygge representasjoner på samlingsnivå

**Modelltyper**:
- Språkmodeller
- Maskinlæringsmodeller
- Statistiske representasjoner

### Fase 6: Oppgavebaserte applikasjoner
**Eksempler**: Klassifisering, klustring, sentimentanalyse, emnemodellering

### Fase 7: Prediksjon og generalisering
**Formål**: Teste modellens anvendbarhet utover treningsdata

**Evalueringsmetoder**:
- Ytelsesmål
- Kryssvalidering
- Holdt-av testing (held-out)

---

## 3. Praktisk implementering

### 3.1 Behandling av lokale filer

#### System for filoppdagelse
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

#### System for filinnlesing
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

### 3.2 Implementering av nett-crawler

#### Nødvendige biblioteker
```python
import requests
from bs4 import BeautifulSoup
```

#### Behandling av enkeltside
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

#### Uttrekk og filtrering av URL-er
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

#### Full nett-crawler
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

**Viktige merknader om nettcrawling**:
- Dette er en grunnleggende implementering uten produksjonsfunksjoner
- Mangler: etterlevelse av robots.txt, raterestriksjon, feilhåndtering
- Etiske hensyn: respekter nettsteders retningslinjer og serverbelastning

---

## 4. Teknikker for tekstforbehandling

### 4.1 Normalisering av blanktegn

#### Grunnleggende fjerning av blanktegn
```python
# Remove leading and trailing whitespace
clean_text = my_text_string.strip()

# Remove multiple whitespaces between words
clean_text = " ".join(my_text_string.split())
```

**Vurderinger**:
- Blanktegn kan være informative (avsnittsinnrykk, kodestruktur)
- Linjeskift kan indikere seksjonsgrenser
- Analyse av Python-kode krever at innrykk bevares
- Avvei mellom rensing og bevaring av informasjon

### 4.2 Tokenisering med NLTK

#### Nødvendig oppsett
```python
import nltk
from nltk.tokenize import word_tokenize

# Download required resources (one-time setup)
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
```

#### Setningssegmentering
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

#### Behandling av flere dokumenter
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

### 4.3 Normalisering av store/små bokstaver

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

**Vurderinger om informasjonstap**:
- Egennavn mister identitet (f.eks. «Green» navn vs. «green» farge)
- Akronymer mister betydning
- Skillet mellom tittel og brødtekst forsvinner
- Informasjon om stor forbokstav i setningsstart går tapt

### 4.4 Stemming

#### Implementering av Porter-stemmer
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

**Kjennetegn ved stemming**:
- Reduserer ord til røtter (ikke nødvendigvis gyldige ord)
- "modeling" → "model", "incredible" → "incred"
- Rask og enkel
- Kan gi ikke-ord

### 4.5 Lemmatisering

#### Integrasjon med POS-tagger
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
- Lemmatisering gir gyldige ordboksformer
- Kontekstavhengig (krever POS-tagger)
- "lighter" → "light" (adjektiv) eller "lighter" (substantiv)
- Mer beregningstung, men språklig mer presis
- Velg vanligvis én tilnærming, ikke begge

---

## 5. System for vokabularhåndtering

### 5.1 Distribuert vokabularbygging

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

### 5.2 Samordning av vokabularer

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

**Fordeler med enhetlig vokabular**:
- Konsistent ordindeksering på tvers av dokumenter
- Effektiv lagring og prosessering
- Legger til rette for analyse på tvers av dokumenter
- Grunnlag for statistiske beregninger

---

## 6. Statistisk analyse

### 6.1 Beregning av ordstatistikk

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

### 6.2 Analyse av toppord

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

## 7. Analyse av Zipfs lov

### 7.1 Teoretisk grunnlag

![Pipeline Architecture](/images/docs/Statistical%20Methods%20for%20Text%20Data%20Analysis_2/4.png)

**Zipfs lov**: I naturlige språkkorpora er frekvensen til et ord omvendt proporsjonal med rangeringen i frekvenstabellen.

**Matematisk uttrykk**:
```bash
P(word_i) = (1 / rank_i^s) × C
```
Der:
- `P(word_i)` = sannsynligheten for ord i
- `rank_i` = ordets rang i frekvenstabellen
- `s` = eksponent (typisk ≈ 1)
- `C` = normaliseringskonstant

### 7.2 Empiriske observasjoner

Nøkkelfunn fra datasettet 20 newsgroups:
- Toppord: tegnsetting og funksjonsord
- Kolon (':') = 308,665 forekomster
- Komma (',') = 305,640 forekomster  
- "the" = 256,006 forekomster

**Implikasjoner**:
- Få ord står for mesteparten av teksten
- De hyppigste ordene er ofte lite informative (stoppord)
- Lang hale av sjeldne ord
- Universelt mønster på tvers av språk og domener

### 7.3 Visualiseringskode

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

**Praktisk betydning**:
- Veileder forbehandlingsvalg (fjerne stoppord)
- Påvirker valg av vokabularstørrelse
- Påvirker utvalg og statistiske metoder
- Viktig for å forstå egenskaper ved tekstdata

---

## 8. Beste praksis for implementering

### 8.1 Vurderinger for feilhåndtering

Forelesningskoden er forenklet for tydelighet. I produksjon bør man inkludere:

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

### 8.2 Etiske retningslinjer

**Forskningsetikk**:
- Skaff nødvendige tillatelser for datainnsamling
- Anonymiser personidentifiserbar informasjon
- Følg GDPR og lokale personvernlovgivninger
- Respekter opphavsrett og lisensvilkår

**Etikk for nettcrawling**:
- Sjekk og respekter robots.txt
- Implementer raterestriksjon
- Unngå å overbelaste servere
- Ta hensyn til vilkår for bruk (ToS)

### 8.3 Skalerbarhetsvurderinger

For storskalabehandling av tekst:
- Bruk strømmende prosessering for å spare minne
- Parallelliser der det er mulig
- Vurder distribuerte beregningsrammeverk
- Overvåk minnebruk under bygging av vokabular

---

## 9. Sammendrag og neste steg

### Viktige oppnåelser

Denne forelesningen dekket grunnlaget for tekstbehandlingspipelin en:
1. **Datainnsamling**: flere kilder og formater
2. **Nett-crawling**: grunnleggende implementering med filtrering
3. **Tekstforbehandling**: tokenisering, normalisering av store/små bokstaver, stemming/lemmatisering
4. **Vokabularhåndtering**: bygging av enhetlig vokabular
5. **Statistisk analyse**: ordfrekvens og fordelinger
6. **Zipfs lov**: teoretisk forståelse og empirisk validering

### Kommende temaer

Neste ukes fokusområder:
- **Stoppord**: filtrering av lite informative ord
- **Avansert forbehandling**: mer sofistikerte renseteknikker
- **Egenskapsutvalg**: velge relevante underutvalg av vokabular
- **Tekstrepr esentasjon**: mot modelleringsmetoder

### Praktiske øvelser

Studentene skal:
- Laste ned bøker fra Project Gutenberg
- Implementere en komplett behandlingspipeline
- Analysere ordfrekvensfordelinger
- Validere Zipfs lov på egne datasett
- Sammenligne forbehandlingsvalg (stemming vs. lemmatisering)

---

## 10. Teknisk appendiks

### Installasjon av nødvendige biblioteker
```bash
pip install nltk beautifulsoup4 requests numpy matplotlib
```

### Nedlasting av NLTK-ressurser
```python
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('tagsets')
```

### Vanlige problemer med tegnkoding
- **UTF-8**: standard, men ikke universell
- **Latin-1**: vesteuropeiske språk
- **CP1252**: Windows-koding
- Bruk ved behov `errors='ignore'` eller `errors='replace'`

### Ytelsesnotater
- Tokenisering er beregningstungt
- POS-tagger øker belastningen
- Samordning av vokabularer krever nøye minnehåndtering
- Statistiske beregninger skalerer med korpusstørrelse

---

*Disse notatene utgjør det praktiske grunnlaget for tekstbehandling. Når du behersker disse teknikkene, kan du gå videre til avansert modellering og analyse i kommende forelesninger.*
