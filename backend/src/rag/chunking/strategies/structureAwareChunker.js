export function structureAwareChunking(normalizedDocument) {

    const chunks = [];

    let chunkIndex = 0;
    let currentHeading = "";

    for (const element of normalizedDocument.elements) {

        // Remember the latest heading
        if (element.type === "heading") {
            currentHeading = element.markdown;
            continue;
        }

        chunks.push({

            index: chunkIndex,

            text: element.markdown,

            type: element.type,

            sectionHeading: currentHeading,

            pages: element.pages,

            startPage: element.pages[0],

            endPage: element.pages[element.pages.length - 1]

        });

        chunkIndex++;
    }

    return chunks;
}