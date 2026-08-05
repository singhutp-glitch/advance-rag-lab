import { parseDocument } from "../parsers/parserFactory.js";
import { chunkDocument } from "../chunking/chunckDocument.js";
import { saveDocumentandChunk } from "../services/ingestionService.js";
import { generateEmbeddings } from "../embeddings/embeddingService.js";
import { searchChatIdwithUserId } from "../../services/databaseService.js";
import {uploadDocument} from '../services/storageService.js'
import { randomUUID } from "crypto";
import path from "path";


export default async function postUploadDocument(req,res){
    if(!req.file){
        return res.status(400).json({
            error:'No file uploaded'
        })
    }

    try{
        const chatId = Number(req.params.chatId);

        const userChat = await searchChatIdwithUserId(req.user.userId,chatId);
        if(!userChat){
            return res.status(404).json({
                error:'Chat not found'
            })
        };
        req.file.filePath = await uploadDocument(req.file.buffer,req.file.originalname);
        const extension = path.extname(req.file.originalname);

        const storedFileName = `${randomUUID()}${extension}`;


        const parsedDocument = await parseDocument(req.file);
        console.log('parse result - ',parsedDocument.parsedText.slice(0,200));
        const chunks = await chunkDocument(parsedDocument);
        chunks.slice(0,4).forEach((chunk,index) => {
            console.log(`chunk result ${index} - `,chunk.text)
        })
        

        // const finalChunks = await generateEmbeddings(chunks);

        // const document = await saveDocumentandChunk({
        //     originalname: req.file.originalname,
        //     mimetype: req.file.mimetype,
        //     size: req.file.size,
        //     userId: req.user.userId,
        //     chatId: chatId,
        //     storedFileName,
        // },chunks);
        

            res.status(200).json({
                message:'Upload successful',
                documentContent:parsedDocument.fullText
            })
        }catch(error){
            console.error(error);
        
            return res.status(500).json({
            error:'Error in uploading file'
        })          
        }

};