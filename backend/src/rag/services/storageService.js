import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.resolve(
    "src/rag/upload/uploads"
);

export async function uploadDocument(buffer, filename) {

    const filePath = path.join(
        UPLOAD_DIR,
        filename
    );

    await fs.writeFile(filePath, buffer);

    return filePath;
}
