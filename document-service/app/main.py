from fastapi import FastAPI, UploadFile, File
import shutil
from app.parser.parser import parse_document
from pathlib import Path
from app.parser.extractor import normalizeDoclingDocument
from dataclasses import asdict

app = FastAPI(
    title='Document Service',
    version = '1.0.0'
)

Upload_DIR = Path('uploads')
Upload_DIR.mkdir(exist_ok = True)

@app.get('/')
def root():
    return {
        "service":'Dcoument Service',
        "status" : "running"
    }

@app.get('/health')
def health():
    return {
        'status' : 'ok'
    }

@app.post('/parse')
async def parse(file: UploadFile = File(...)):

    file_path = Upload_DIR / file.filename

    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)
    document = parse_document(file_path)
    normalizedDocument = normalizeDoclingDocument(document)
    

    return {
    "markdown": document.export_to_markdown(),
    "normalizedDocument": asdict(normalizedDocument)
}