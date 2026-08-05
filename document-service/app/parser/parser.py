from pathlib import Path
from docling.document_converter import DocumentConverter
from docling_core.types.doc.document import DoclingDocument


converter = DocumentConverter()

def parse_document(file_path: str| Path) -> DoclingDocument:
    
    file_path = Path(file_path)

    if not file_path.exists():
        raise FileNotFoundError(f'Dcocument not found: {file_path}')



    result = converter.convert(file_path)

    print(f"Parsing {file_path}")

    return result.document