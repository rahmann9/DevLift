# DevLift

DevLift is an AI-powered development tool that helps developers debug, refactor, and optimize their code. It provides intelligent assistance for stack trace analysis, code modernization, and algorithm optimization.

## Features

- **Stack Trace Analysis**: Get detailed explanations of stack traces and suggested fixes
- **Code Modernization**: Modernize legacy code to use newer language features and conventions
- **Algorithm Optimization**: Optimize algorithms for better time and space complexity

## Tech Stack

### Backend
- FastAPI (Python web framework)
- OpenAI API for AI-powered features
- Python 3.12+

### Frontend
- React
- TypeScript
- Vite

## Getting Started

### Prerequisites
- Python 3.12 or higher
- Node.js 16 or higher
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
py -3.12 -m venv .venv
```

3. Activate the virtual environment:
```bash
# Windows
.venv\Scripts\activate

# Unix/MacOS
source .venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the backend directory with the following content:
```
PORT=8000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your_api_key_here
```

6. Start the backend server:
```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## API Documentation

Once the backend server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Available Endpoints

#### Stack Trace Analysis
- `POST /explain/stacktrace`: Analyze a stack trace and provide explanations
- `GET /explain/providers`: Get list of available AI providers

#### Code Modernization
- `POST /refactor/modernize`: Modernize legacy code

#### Algorithm Optimization
- `POST /optimize/dsa`: Optimize algorithms for better performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 