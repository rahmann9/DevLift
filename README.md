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
- Docker

### Frontend
- React
- TypeScript
- Vite
- Docker
- Nginx

## Getting Started

### Prerequisites
- Python 3.12 or higher
- Node.js 16 or higher
- Docker and Docker Compose
- OpenAI API key

### Development Setup

#### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devlift.git
cd devlift
```

2. Create a `.env` file in the backend directory:
```
PORT=8000
HOST=0.0.0.0
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your_api_key_here
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

#### Manual Setup

##### Backend Setup

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

##### Frontend Setup

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

## Deployment

### Backend Deployment (Render)

1. Push your code to GitHub

2. Go to [Render](https://render.com) and sign in with your GitHub account

3. Click "New +" and select "Web Service"

4. Connect your GitHub repository

5. Configure the service:
   - Name: `devlift-api`
   - Environment: `Docker`
   - Dockerfile Path: `./backend/Dockerfile`
   - Root Directory: `backend`

6. Add environment variables:
   - `PORT`: `8000`
   - `FRONTEND_URL`: `https://devlift.vercel.app`
   - `OPENAI_API_KEY`: Your OpenAI API key

7. Click "Create Web Service"

### Frontend Deployment (Vercel)

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account

3. Click "New Project" and import your repository

4. Configure the project:
   - Framework Preset: Docker
   - Root Directory: `frontend`
   - Dockerfile Path: `./Dockerfile`

5. Add environment variables if needed

6. Click "Deploy"

After deployment:
- Frontend: https://devlift.vercel.app
- Backend API: https://devlift-api.onrender.com
- API Documentation: https://devlift-api.onrender.com/docs

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

## Deployment

- Frontend: Vercel
- Backend: Fly.io or Render 