---
name: mineru
description: High-accuracy document parsing, formula extraction, and table OCR engine from opendatalab/MinerU. Use when extracting complex PDFs, research papers, academic textbooks, scanned documents, financial reports, mathematical formulas (LaTeX), or multi-column layouts into clean, structured Markdown and JSON for LLM RAG pipelines and knowledge ingestion.
---

# MinerU (Advanced Document & PDF Parsing Engine)

MinerU (`opendatalab/MinerU` / `magic-pdf`) parses raw, messy, or scanned PDFs and documents into clean, structured Markdown while preserving mathematical formulas (LaTeX), tables, multi-column reading orders, and image assets.

## 1. Installation & CLI Usage

Install MinerU via Python / uv:
```bash
# Install with full OCR & layout models
uv pip install -U "magic-pdf[full]"

# Or minimal layout parser
uv pip install mineru
```

### CLI Command Execution:
```bash
# Convert a single PDF into Markdown + extracted images
magic-pdf -p document.pdf -o ./output_dir -m auto

# Parse with dedicated OCR mode (for scanned documents)
magic-pdf -p scanned.pdf -o ./output_dir -m ocr

# Parse with high-speed text extraction (for digital vector PDFs)
magic-pdf -p paper.pdf -o ./output_dir -m txt
```

---

## 2. Key Capabilities

| Capability | What It Does |
| :--- | :--- |
| **Formula Extraction** | Detects inline ($...$) and block ($$...$$) mathematical formulas and outputs standardized LaTeX KaTeX syntax. |
| **Table Recognition** | Reconstructs complex merged cells and nested rows into clean HTML or Markdown tables. |
| **Reading Order Reconstruction**| Eliminates multi-column fragmentation (left-to-right academic paper reading flow). |
| **Artifact Removal** | Strips out headers, footers, page numbers, and watermarks that pollute LLM context windows. |

---

## 3. Python Integration for Agent Pipelines

```python
from magic_pdf.data.data_reader_writer import FileBasedDataReader, FileBasedDataWriter
from magic_pdf.pipe.UNIPipe import UNIPipe

def parse_pdf_for_agent(pdf_path: str, output_dir: str) -> str:
    reader = FileBasedDataReader("")
    pdf_bytes = reader.read(pdf_path)
    
    # Initialize pipeline
    pipe = UNIPipe(pdf_bytes, {"_pdf_type": "auto"}, output_dir)
    pipe.pipe_classify()
    pipe.pipe_analyze()
    pipe.pipe_parse()
    
    # Generate clean Markdown output
    md_content = pipe.pipe_mk_markdown(output_dir, drop_mode="none")
    return md_content
```
