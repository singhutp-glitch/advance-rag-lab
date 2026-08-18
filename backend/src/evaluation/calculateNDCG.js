import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groundTruthPath = path.resolve(__dirname, "./ground_truth.json");
const retrievalResultsPath = path.resolve(
    __dirname,
    "./results/hybridResults/hybridMixedResults.json"
);

function calculateDCG(relevances, k) {
    return relevances
        .slice(0, k)
        .reduce((dcg, relevance, index) => {
            const rank = index + 1;

            return (
                dcg +
                (Math.pow(2, relevance) - 1) /
                    Math.log2(rank + 1)
            );
        }, 0);
}

function calculateNDCG(retrievedRelevances, idealRelevances, k) {
    const dcg = calculateDCG(retrievedRelevances, k);
    const idcg = calculateDCG(idealRelevances, k);

    if (idcg === 0) {
        return 0;
    }

    return dcg / idcg;
}

async function calculateAllNDCG(top_k) {
    const groundTruth = JSON.parse(
        await fs.readFile(groundTruthPath, "utf-8")
    );

    const retrievalResults = JSON.parse(
        await fs.readFile(retrievalResultsPath, "utf-8")
    );

    // query_id -> chunk_id -> relevance
    const groundTruthMap = new Map();

    for (const query of groundTruth) {
        const relevanceMap = new Map();

        for (const chunk of query.relevant_chunks) {
            relevanceMap.set(
                String(chunk.chunk_id),
                chunk.relevance
            );
        }

        groundTruthMap.set(query.query_id, relevanceMap);
    }

    let totalNDCG = 0;
    let evaluatedQueries = 0;

    for (const result of retrievalResults) {
        const relevanceMap = groundTruthMap.get(result.query_id);

        if (!relevanceMap) {
            console.warn(
                `No ground truth found for ${result.query_id}`
            );
            continue;
        }

        // Relevance grades in the actual retrieval order
        const retrievedRelevances = result.retrieved_chunks.slice(0,top_k).map(
            chunkId => relevanceMap.get(String(chunkId)) ?? 0
        );

        // Ideal ordering from the ground truth
        const idealRelevances = Array.from(
            relevanceMap.values()
        ).sort((a, b) => b - a);

        const k = result.retrieved_chunks.slice(0,top_k).length;

        const ndcg = calculateNDCG(
            retrievedRelevances,
            idealRelevances,
            k
        );

        totalNDCG += ndcg;
        evaluatedQueries++;

        console.log(
            `${result.query_id} → nDCG@${k}: ${ndcg.toFixed(4)}`
        );
    }

    const meanNDCG =
        evaluatedQueries > 0
            ? totalNDCG / evaluatedQueries
            : 0;

    console.log("\n-----------------------------");
    console.log(
        `Mean nDCG: ${meanNDCG.toFixed(4)}`
    );
}

calculateAllNDCG(5).catch(error => {
    console.error("Error calculating nDCG:", error);
});