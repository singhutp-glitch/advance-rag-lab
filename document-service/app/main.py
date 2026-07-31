from fastapi import FastAPI

app = FastAPI(
    title='Document Service',
    version = '1.0.0'
)

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