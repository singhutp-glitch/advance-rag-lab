export async function saveDocument(db ,document){
    return await db.document.create({
        data:{
            originalFileName:document.name,
            storedFileName:document.storedFileName,
            mimeType:document.type,
            fileSize:document.size,
            userId:document.userId,
            chatId:document.chatId
        }
    });
};

