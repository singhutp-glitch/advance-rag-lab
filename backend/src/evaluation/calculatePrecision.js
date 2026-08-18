import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groundTruthPath = path.resolve(
    __dirname,
    "./ground_truth.json"
);

const retrievalResultsPath = path.resolve(
    __dirname,
    "./results/bm25RetrievalResults.json"
);

async function calculatePrecision(top_k) {
    const groundTruth = JSON.parse(
        await fs.readFile(groundTruthPath, "utf-8")
    );

    const retrievalResults = JSON.parse(
        await fs.readFile(retrievalResultsPath, "utf-8")
    );

    // Ground truth indexed by query_id
    const groundTruthMap = new Map(
        groundTruth.map(item => [
            item.query_id,
            new Map(
                item.relevant_chunks.map(chunk => [
                    String(chunk.chunk_id),
                    chunk.relevance
                ])
            )
        ])
    );

    let totalPrecision = 0;

    for (const result of retrievalResults) {
        const queryId = result.query_id;

        const relevanceMap = groundTruthMap.get(queryId);

        if (!relevanceMap) {
            console.warn(`No ground truth found for ${queryId}`);
            continue;
        }

        const retrievedChunks = result.retrieved_chunks.slice(0,top_k);

        let relevantRetrieved = 0;

        for (const chunkId of retrievedChunks) {
            const relevance = relevanceMap.get(String(chunkId)) ?? 0;

            if (relevance > 0) {
                relevantRetrieved++;
            }
        }

        const k = retrievedChunks.length;

        const precision = k === 0
            ? 0
            : relevantRetrieved / k;

        totalPrecision += precision;

        console.log(
            `${queryId} → Precision@${k}: ${precision.toFixed(3)}`
        );
    }

    const meanPrecision =
        totalPrecision / retrievalResults.length;

    console.log(
        `\nMean Precision: ${meanPrecision.toFixed(4)}`
    );
}

calculatePrecision(10).catch(error => {
    console.error("Error calculating precision:", error);
});