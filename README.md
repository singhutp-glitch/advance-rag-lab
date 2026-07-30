# Advanced RAG Lab

An engineering-focused repository for researching, implementing, and evaluating advanced Retrieval-Augmented Generation (RAG) techniques beyond a basic document chatbot.

Rather than building another end-user application, this project focuses on the intelligence layer of modern RAG systems—improving how documents are parsed, represented, indexed, retrieved, and evaluated to increase answer accuracy on complex business documents.

The repository serves as an experimentation platform for implementing production-oriented RAG techniques commonly used in enterprise document intelligence systems.

---

# Motivation

A typical RAG pipeline looks like this:

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

This approach works reasonably well for simple documents, but begins to fail when processing real business knowledge such as:

* Annual reports
* Company policies
* Technical manuals
* Consulting reports
* Financial statements
* Compliance documentation
* Research papers

These documents contain rich structure—including headings, tables, lists, figures, appendices, and metadata—that is often lost during plain text extraction.

Once that structure is discarded, retrieval quality degrades regardless of how capable the language model is.

This repository explores techniques that preserve and utilize document structure to build more reliable retrieval pipelines.

---

# Repository Goals

The objectives of this repository are:

* Implement structure-preserving document ingestion pipelines.
* Evaluate different chunking strategies.
* Improve retrieval quality on complex business documents.
* Experiment with modern RAG techniques proposed in recent research.
* Build repeatable evaluation workflows for measuring retrieval improvements.
* Demonstrate engineering approaches that move beyond basic semantic search.

---

# Current Focus

## Structure-Preserving Document Parsing

The current development effort focuses on parsing documents while preserving their logical structure rather than flattening everything into plain text.

Examples include:

* Heading hierarchy
* Sections and subsections
* Tables
* Lists
* Document metadata
* Page information
* Structured document elements

The goal is to generate richer document representations that can support higher-quality retrieval.

---

## Context-Aware Chunking

Instead of relying solely on fixed-size chunking, this repository explores chunking strategies that preserve semantic and structural context.

Areas of experimentation include:

* Section-aware chunking
* Heading-aware chunking
* List-aware chunking
* Table-aware chunking
* Context-enriched chunks
* Chunk metadata generation

The objective is to reduce context fragmentation and improve retrieval precision.

---

# Technology Direction

The project adopts a hybrid architecture:

```text
Node.js Backend
        │
        ▼
Python Document Processing Service
        │
        ▼
Docling
        │
        ▼
Structured Document Representation
        │
        ▼
Chunking Pipeline
        │
        ▼
Embedding Generation
        │
        ▼
Vector Database
```

The existing Node.js application provides the surrounding infrastructure, while Python is used for document processing because of its mature ecosystem for document AI.

---

# Planned Areas of Research

This repository is intended to grow into an experimentation platform for advanced RAG techniques.

Planned topics include:

## Document Processing

* Structure-preserving PDF parsing
* Advanced DOCX parsing
* Layout-aware document extraction
* Table extraction
* Metadata extraction
* Figure and caption handling

---

## Chunking

* Recursive chunking
* Semantic chunking
* Context-aware chunking
* Structure-aware chunking
* Table-aware chunking
* Hierarchical chunking

---

## Retrieval

* Dense retrieval
* Hybrid keyword + vector retrieval
* Metadata filtering
* Query expansion
* Query rewriting
* Multi-query retrieval
* Parent-child retrieval
* Reranking

---

## Evaluation

Rather than only demonstrating implementations, the repository also evaluates them.

Experiments compare techniques using representative business documents and measure improvements such as:

* Retrieval accuracy
* Citation quality
* Context preservation
* Table retrieval performance
* Answer grounding quality

Where appropriate, experiments include before/after comparisons and quantitative evaluation.

---
