import { generateQueryEmbeddings } from "../../embeddings/queryEmbedding.js"
import { retrieveChunks } from "../../services/retrievelService.js"

export async function retrieveDense(query,chatId, topK = 10) {
    const queryEmbedding = await generateQueryEmbeddings(query);
    const chunkResults = await retrieveChunks(queryEmbedding,chatId);

 
    return chunkResults;
}