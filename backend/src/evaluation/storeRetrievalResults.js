import { readFile, writeFile } from "fs/promises";
import path from "path";

const resultsFilePath = new URL(
  "./results/retrievalResults.json",
  import.meta.url
);

export async function storeRetrievalResult({
  queryId,
  queryText,
  retrievedChunks
}) {
  let results = [];

  try {
    const fileContent = await readFile(resultsFilePath, "utf-8");

    if (fileContent.trim()) {
      results = JSON.parse(fileContent);
    }

    if (!Array.isArray(results)) {
      throw new Error("Retrieval results file must contain a JSON array.");
    }
  } catch (error) {
    // File does not exist yet → start with empty array.
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const resultObject = {
    query_id: queryId+ `${+results.at(-1)["query_id"].slice(5) + 1}`,
    query: queryText,
    retrieved_chunks: retrievedChunks.map(chunk => chunk.chunkId)
  };

  results.push(resultObject);

  await writeFile(
    resultsFilePath,
    JSON.stringify(results, null, 2),
    "utf-8"
  );
}