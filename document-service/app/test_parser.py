from parser import parse_document

document = parse_document('./sample_pdf/chain_of_thought_paper.pdf')

print(type(document))
print(document.name)