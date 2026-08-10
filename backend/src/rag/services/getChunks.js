import {prisma} from '../../../lib/prisma.js';


export async function getChunksForBM25(chatId) {
    return await prisma.chunk.findMany({
        where: {
            document: {
                chatId: chatId
            }
        },
        select: {
            id: true,
            chunkIndex:true,
            text: true,
            sectionHeading: true,
            pages:true,
            type:true,
            document: {
                select: {
                    originalFileName: true,

                }
            }
        }
    });
};

