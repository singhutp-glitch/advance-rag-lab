import json
from pathlib import Path
from docling.document_converter import DocumentConverter

def main():
    BASE_DIR = Path(__file__).resolve().parent.parent
    pdf_path = BASE_DIR / "sample_pdf" / "chain_of_thought_paper.pdf"

    print('='*60)
    print('Initializing docling')
    print('='*60)

    converter = DocumentConverter()
    result = converter.convert(pdf_path)
    document = result.document

    print('='*60)
    print('Complete docling')
    print('='*60)

    print(f'Document Type:{type(document)}')

    print()
    print('Markdown preview')

    markdown = document.export_to_markdown()
    print(markdown[:2000])
    print()

    json_data = document.export_to_dict()
    output_path = Path("document.json")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=2, ensure_ascii=False)

    print(f"Saved to {output_path.resolve()}")

if __name__ == "__main__":
    main()