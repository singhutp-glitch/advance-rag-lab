
export async function reciprocalRankFusion(rankLists,k=60,topK=10){
    const  chunkScores = new Map();

    for(const rankList of rankLists){
        rankList.forEach((chunk,index)=>{
            const contribution = 1/(k+index+1);
            const chunkId = chunk.id;
            chunkScores.set(chunkId,
                (chunkScores.get(chunkId) || 0) +contribution
            )            
        })
    }
    const topResults = Array.from(chunkScores.entries())
        .map(([chunkId, score]) => ({
            chunkId,
            score
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map((result, index) => ({
            ...result,
            rank: index + 1
        }));
        return topResults;
} 
