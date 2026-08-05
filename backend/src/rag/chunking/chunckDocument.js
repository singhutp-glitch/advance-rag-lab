import { fixedChunking } from "./strategies/fixedChunker.js";
import { pagedChunking } from "./strategies/pageWiseChunker.js";
import { structureAwareChunking } from "./strategies/structureAwareChunker.js";

export async function chunkDocument(parsedDocument){
    const chunks = structureAwareChunking(parsedDocument.normalizedDocument);
    return chunks
}
