export async function retrieveBM25(query, topK = 10) {
    // 1. Search the BM25 index using query
    // 2. Get the top-K matching chunks
    // 3. Return standardized retrieval results

    return [
        {
            chunkId: 123,
            score: 8.42,
            rank: 1
        },
        // ...
    ];
}