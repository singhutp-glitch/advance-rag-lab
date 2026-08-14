import BM25 from 'wink-bm25-text-search';
import nlp from 'wink-nlp-utils';
import { getChunksForBM25 } from '../../services/getChunks.js';


function getSearchText(chunk){
    return chunk.sectionHeading+'\n'+chunk.text;
}

export async function retrieveBM25(query,chatId, topK = 10) {
    const chunks = await getChunksForBM25(chatId);
    const bm25 = BM25()

    bm25.defineConfig({
        fldWeights:{text: 1}
    });

    console.log({
    stringToTokens: nlp.stringToTokens,
    removeWords: nlp.removeWords,
    stem: nlp.stem
});

    bm25.definePrepTasks([
         nlp.string.lowerCase,
        nlp.string.removeExtraSpaces,
        nlp.string.tokenize0,
        nlp.tokens.removeWords,
        nlp.tokens.stem
    ])

    for(const chunk of chunks){
        bm25.addDoc(
    {
        text: getSearchText(chunk)
    },
    chunk.id
);
    };

    bm25.consolidate();

    const results = bm25.search(query);

 
    return await results.map(([chunkId, score], index) => {
    const chunk = chunks.find(chunk => chunk.id === +chunkId);

    return {
        id:chunk.id,
        score,
        rank: index + 1,
        text: chunk.text,
        sectionHeading: chunk.sectionHeading,
        originalFileName: chunk.document.originalFileName,
        type:chunk.type
    };
});
}