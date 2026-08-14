import {prisma} from '../../../lib/prisma.js';


export async function retrieveChunks(queryEmbedding,chatId) {
    const vectorString =`[${queryEmbedding.join(",")}]`;

    return await prisma.$queryRaw`
                SELECT C.id AS "chunkId",C."documentId",C.text, C."chunkIndex",
                 D."originalFileName", C.pages, C.type,C."sectionHeading"
                 ,C.embedding <=> ${vectorString}::vector AS score
                FROM "Document" D 
                JOIN "Chunk" C
                ON D.id = C."documentId"
                WHERE D."chatId" = ${chatId}
                ORDER BY score
                LIMIT 10
            `;
};