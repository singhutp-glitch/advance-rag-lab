import {prisma} from '../../../lib/prisma.js';


export async function getChunksForBM25({chatId}){
    return prisma.chunk.findMany({
            where:{
                document:{
                    chatId:chatId
                }
            },
            select:{
                id:true,
                text:true,
                sectionHeading:true
            }
             })                                                                                                                     
};

