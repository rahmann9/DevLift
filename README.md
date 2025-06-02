# DevLift - Developer Guide

DevLift is a 3-in-1 AI-powered developer tool that helps with debugging, legacy code modernization, and DSA learning.

## Features

- **StackTraceGPT**: Explains stack traces and suggests fixes
- **RefactorTool**: Modernizes legacy code (e.g., Java 8 → Java 21)
- **DSA Optimizer**: Explains and improves inefficient algorithms

## Project Structure

```
devlift/
├── frontend/               # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── api/            # API client code
│   │   └── ...
│   └── ...
├── backend/                # Python + FastAPI
│   ├── routers/            # API route handlers
│   ├── services/           # Business logic
│   ├── main.py             # Entry point
│   └── prompt_builder.py   # LLM prompt construction
└── README.dev.md           # Developer documentation
```

## Development Setup

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd devlift/backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on `env.example` and add your OpenAI API key.

5. Run the development server:
   ```
   uvicorn main:app --reload
   ```

The API will be available at http://localhost:8000.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd devlift/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

The frontend will be available at http://localhost:5173.

## API Endpoints

- `POST /explain/stacktrace` - Analyze and explain stack traces
- `POST /refactor/modernize` - Modernize legacy code
- `POST /optimize/dsa` - Optimize algorithms

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

## Deployment

- Frontend: Vercel
- Backend: Fly.io or Render 