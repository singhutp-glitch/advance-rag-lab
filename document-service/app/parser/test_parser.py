from parser import parse_document
from extractor import normalizeDoclingDocument
from docling_core.types.doc.document import DoclingDocument
document = parse_document('')

print(type(document))
print(document.name)


normalizedDocument = normalizeDoclingDocument(document);

print(normalizedDocument.elements[0])

# print(dir(document))

# print(type(document.body.children[0]))
# print(document.body.children[0])
# print(dir(document.body.children[0]))