from docling_core.types.doc.document import DoclingDocument

from .models import (
    DocumentElement,
    NormalizedDocument
)


def normalizeDoclingDocument(
    doclingDocument: DoclingDocument
) -> NormalizedDocument:

    elements = []

    for index, child in enumerate(doclingDocument.body.children):

        #
        # Resolve the body reference into the real object
        #
        element = child.resolve(doclingDocument)

        #
        # Collect page numbers
        #
        pages = []

        if hasattr(element, "prov") and element.prov:

            pages = sorted(
                {
                    p.page_no
                    for p in element.prov
                }
            )

        #
        # Convert different element types
        #
        if hasattr(element, "export_to_markdown"):

            try:
               markdown = element.export_to_markdown()

            except TypeError:
                markdown = element.export_to_markdown(doclingDocument)

        elif hasattr(element, "text"):

            markdown = element.text

        else:

            markdown = ""

        #
        # Store normalized element
        #
        elements.append(

            DocumentElement(

                element_index=index,

                type=element.label,

                markdown=markdown,

                pages=pages

            )

        )

    return NormalizedDocument(elements=elements)