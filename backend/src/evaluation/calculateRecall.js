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
    "./results/hybridRetrievalResults.json"
);

async function calculateRecall() {
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

    let totalRecall = 0;
    let evaluatedQueries = 0;

    for (const result of retrievalResults) {
        const queryId = result.query_id;

        const relevanceMap = groundTruthMap.get(queryId);

        if (!relevanceMap) {
            console.warn(`No ground truth found for ${queryId}`);
            continue;
        }

        const retrievedChunks = result.retrieved_chunks;

        // All ground-truth chunks with relevance > 0
        const relevantGroundTruthChunks = [...relevanceMap.entries()]
            .filter(([_, relevance]) => relevance > 0)
            .map(([chunkId]) => chunkId);

        let relevantRetrieved = 0;

        for (const chunkId of retrievedChunks) {
            const relevance = relevanceMap.get(String(chunkId)) ?? 0;

            if (relevance > 0) {
                relevantRetrieved++;
            }
        }

        const totalRelevant = relevantGroundTruthChunks.length;

        const recall = totalRelevant === 0
            ? 0
            : relevantRetrieved / totalRelevant;

        totalRecall += recall;
        evaluatedQueries++;

        console.log(
            `${queryId} → Recall@${retrievedChunks.length}: ${recall.toFixed(3)}`
        );
    }

    const meanRecall =
        evaluatedQueries === 0
            ? 0
            : totalRecall / evaluatedQueries;

    console.log(
        `\nMean Recall: ${meanRecall.toFixed(4)}`
    );
}

calculateRecall().catch(error => {
    console.error("Error calculating recall:", error);
});