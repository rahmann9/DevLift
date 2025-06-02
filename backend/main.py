from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import explain, refactor, optimize

app = FastAPI(
    title="DevLift API",
    description="API for DevLift, an AI-powered tool for debugging, refactoring, and optimizing code",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://devlift.vercel.app"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(explain.router)
app.include_router(refactor.router)
app.include_router(optimize.router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 