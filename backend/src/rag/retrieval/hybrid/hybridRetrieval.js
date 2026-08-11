import { retrieveBM25 } from "../bm25/bm25Retieval.js";
import { retrieveDense } from "../dense/denseRetrieval.js";
import { reciprocalRankFusion } from "./rrf.js";

export async function retrieveHybrid(query,chatId, topK = 10) {
    const denseChunkResults = await retrieveDense(query,chatId);
    const bm25ChunkResults = await retrieveBM25(query,chatId);

    const hybridChunkResults = await reciprocalRankFusion([
        denseChunkResults,
        bm25ChunkResults
    ])
    const chunkMap = new Map([
        ...denseChunkResults.map(chunk => [chunk.id, chunk]),
        ...bm25ChunkResults.map(chunk => [chunk.id, chunk])
    ]);

    const enrichedResults = hybridChunkResults.map(result => {
        const chunk = chunkMap.get(result.chunkId);
;            return {
                chunkId: result.chunkId,
                score: result.score,
                rank: result.rank,
                text: chunk.text,
                sectionHeading: chunk.sectionHeading,
                documentName: chunk.originalFileName
            };
        });
 
    return enrichedResults;
}