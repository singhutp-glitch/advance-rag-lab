# Advanced RAG Lab

An engineering-focused repository for implementing and evaluating advanced **Retrieval-Augmented Generation (RAG)** techniques beyond a basic document chatbot.

The project focuses on the retrieval and document intelligence layer of RAG systems — improving how complex documents are parsed, chunked, represented, searched, and evaluated.

It is designed around practical problems encountered in **business and enterprise documents**, including reports, policies, technical manuals, financial documents, compliance material, and research papers.

---
# Implemented Techniques

The repository currently contains two major implemented RAG techniques. Each technique is documented as a separate experiment, including its implementation approach and evaluation.

| # | Technique                                                | What it covers                                                                                                                                             |
| - | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Advanced Document Parsing & Structure-Aware Chunking** | Structure-preserving document parsing and context-aware chunking using document elements such as headings, paragraphs, tables, lists, and page information |
| 2 | **Dense, BM25 & Hybrid Retrieval**                       | Implementation and comparison of dense vector retrieval, BM25 lexical retrieval, and hybrid retrieval using a ground-truth evaluation dataset              |

---

# 1. Advanced Document Parsing & Structure-Aware Chunking

The first implemented technique focuses on improving the document ingestion stage of a RAG pipeline.

Basic RAG systems often extract a document as plain text and then split it into fixed-size chunks. This can work for simple documents, but it can break the relationships between headings, paragraphs, tables, lists, and other structured elements.

This experiment uses **Docling** to parse documents while preserving their structure.

The parsing pipeline extracts information such as:

* Headings and section hierarchy
* Paragraphs
* Tables
* Lists
* Page information
* Document metadata
* Other structured document elements

The structured output is then passed to a chunking pipeline that uses these elements to create more meaningful chunks instead of relying only on fixed character or token limits.

### Chunking Approach

The implemented chunking strategy is based on the idea that a chunk should represent an atomic information unit while retaining the context needed to understand it.

Depending on the document structure, chunks can represent elements such as:

* Paragraphs
* Lists
* Tables
* Other structured content

Relevant section and page information is retained as metadata with each chunk.

A chunk is represented using fields such as:

```text
Chunk
 ├── Markdown content
 ├── Chunk index
 ├── Page information
 ├── Section heading
 └── Element type
```

The resulting chunks provide a structured document representation for the retrieval experiments that follow.

### What Was Implemented

The experiment includes:

* Document parsing using Docling
* Preservation of document structure
* Extraction of headings, tables, lists, and other elements
* Structure-aware chunk creation
* Section and page metadata
* Normalized chunk representation
* Chunk output suitable for downstream retrieval

The result is a document processing pipeline that preserves substantially more of the original document structure than basic text extraction and fixed-size chunking.

---

# 2. Dense, BM25 & Hybrid Retrieval

The second implemented technique focuses on the retrieval stage of the RAG pipeline.

Instead of relying on a single retrieval method, three approaches were implemented and compared:

* **Dense retrieval** — semantic vector search using embeddings
* **BM25 retrieval** — lexical search based on term matching
* **Hybrid retrieval** — combination of dense and BM25 results

### Dense Retrieval

Dense retrieval converts queries and document chunks into embedding vectors and retrieves chunks based on their semantic similarity.

This allows the system to retrieve relevant information even when the query and document use different wording but express a similar meaning.

```text
Query
  │
  ▼
Query Embedding
  │
  ▼
Vector Search
  │
  ▼
Top-K Chunks
```

### BM25 Retrieval

BM25 provides a lexical retrieval approach based on the terms appearing in the query and document.

It is useful for cases where exact terms are important, such as technical terminology, company names, identifiers, and domain-specific keywords.

```text
Query
  │
  ▼
Term Matching
  │
  ▼
BM25 Scoring
  │
  ▼
Top-K Chunks
```

### Hybrid Retrieval

Hybrid retrieval combines the results from dense and BM25 retrieval.

```text
                 Query
                   │
          ┌────────┴────────┐
          ▼                 ▼
    Dense Retrieval     BM25 Retrieval
          │                 │
          ▼                 ▼
    Semantic Results    Lexical Results
          │                 │
          └────────┬────────┘
                   ▼
              Result Fusion
                   │
                   ▼
                 Top-K
```

The purpose is to combine the strengths of both approaches: semantic matching from dense retrieval and exact lexical matching from BM25.

### Retrieval Evaluation

The three retrieval approaches were evaluated using a **ground-truth dataset containing queries and their relevant chunk IDs**.

The same document chunks, queries, and relevance information were used for Dense, BM25, and Hybrid retrieval so that the approaches could be compared under the same conditions.

The evaluation measures:

* **Recall** — how many relevant chunks were retrieved
* **Precision** — how many retrieved chunks were relevant
* **nDCG** — how well relevant chunks were ranked within the retrieved results

The evaluation workflow is:

```text
Ground-Truth Queries
        │
        ▼
 ┌──────┼────────┐
 ▼      ▼        ▼
Dense  BM25    Hybrid
 │      │        │
 └──────┼────────┘
        ▼
   Retrieved Chunks
        │
        ▼
Compare with Ground Truth
        │
        ▼
Recall / Precision / nDCG
```

This makes the retrieval experiment more than an implementation comparison: the different approaches are evaluated quantitatively using the same ground-truth queries and relevant chunk mappings.

The retrieval experiments therefore provide a baseline for future work such as query rewriting, reranking, metadata filtering, multi-query retrieval, and other advanced retrieval techniques.

# Motivation

A typical basic RAG pipeline looks like:

```text
Document
    │
    ▼
Text Extraction
    │
    ▼
Fixed-Size Chunking
    │
    ▼
Embeddings
    │
    ▼
Vector Search
    │
    ▼
LLM
```

This approach works reasonably well for simple documents but can become unreliable when documents contain significant structure.

Examples include:

* Annual reports
* Company policies
* Technical manuals
* Consulting reports
* Financial statements
* Compliance documentation
* Research papers

These documents contain headings, tables, lists, figures, appendices, and metadata that can be lost during basic text extraction.

Retrieval can also suffer when only one search strategy is used. Dense retrieval and lexical retrieval have different strengths, which makes comparing and combining them useful for real-world RAG systems.

This project therefore focuses on improving the parts of the pipeline that directly affect the quality of retrieved context.

---

# Repository Goals

The repository is intended to:

* Implement structure-preserving document ingestion.
* Experiment with different chunking strategies.
* Compare dense and lexical retrieval.
* Implement hybrid retrieval.
* Evaluate retrieval using ground-truth relevance data.
* Measure retrieval improvements quantitatively.
* Experiment with additional RAG techniques as the project grows.
* Provide reproducible implementations that can be applied to production-oriented document intelligence systems.

---

# Planned Techniques

The following areas represent **future experiments**. They have not been implemented yet.

## Document Processing

* Advanced DOCX parsing
* Layout-aware extraction improvements
* Improved table extraction
* Figure and caption handling
* Additional metadata extraction

## Chunking

* Recursive chunking
* Semantic chunking
* Hierarchical chunking
* Parent-child chunking
* Additional context-aware chunking strategies

## Retrieval

* Metadata filtering
* Query expansion
* Query rewriting
* Multi-query retrieval
* Additional retrieval fusion strategies

## Reranking

* Cross-encoder reranking
* LLM-based reranking
* Retrieval + reranking pipelines

## Generation & Evaluation

* Citation quality evaluation
* Answer groundedness evaluation
* Faithfulness evaluation
* End-to-end answer quality evaluation
* Advanced RAG prompting strategies

## System-Level Evaluation

* Retrieval regression testing
* Latency measurements
* Cost analysis
* Experiment tracking
* RAG observability

---

# Experimental Workflow

Each technique follows a common experimental workflow:

```text
Implementation
      │
      ▼
Test Dataset
      │
      ▼
Experiment
      │
      ▼
Ground Truth
      │
      ▼
Metrics
      │
      ▼
Comparison
      │
      ▼
Findings
```

The evaluation setup is designed to make different RAG techniques comparable under consistent conditions.

For retrieval experiments, the same document chunks, queries, and ground-truth relevance mappings are used across Dense, BM25, and Hybrid retrieval.

As new techniques are implemented, they will be added to the **Implemented Techniques** section and documented in their own dedicated section. Techniques that have not yet been implemented remain under **Planned Techniques**.
