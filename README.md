# Manivtha Tours & Travels AI Monthly Business Health Summarizer

This repository contains the full stack codebase for the Manivtha Tours & Travels Business Health Summarizer application. It features a React/Vite frontend and a FastAPI/SQLite backend integrated with the Gemini/Gemma models to produce structured executive summaries of monthly business operations.

---

## Project Directory Structure

```text
project/
├── frontend/                   # React Frontend application
│   ├── src/                    # React source code (pages, components, assets, etc.)
│   ├── public/                 # Static public assets
│   ├── index.html              # HTML shell template
│   ├── package.json            # Node/NPM dependencies and scripts
│   ├── package-lock.json       # Lockfile
│   ├── vite.config.js          # Vite configuration
│   └── eslint.config.js        # ESLint rules configuration
│
├── backend/                    # FastAPI Backend application
│   ├── database.py             # SQLite connection and session setup
│   ├── main.py                 # Application entrypoint & CORS middleware
│   ├── migrate.py              # Database migration script for status normalization
│   ├── models.py               # SQLAlchemy database models (reports table)
│   ├── requirements.txt        # Python dependencies (fastapi, sqlalchemy, etc.)
│   ├── schemas.py              # Pydantic validation schemas with status checks
│   ├── summarizer.db           # Active SQLite database file
│   ├── routes/                 # FastAPI router endpoints
│   │   ├── dashboard.py        # Dashboard stats and recent items API
│   │   └── reports.py          # Report generation, rating, and retrieval API
│   ├── services/               # Business logic layer
│   │   └── summary_service.py  # AI generation logic with optimized model fallback chain
│   └── utils/                  # Utility helpers
│       └── health_calculator.py # Regex parsing and status fallback calculations
```

---

## Simplified Business Health Status System

The app utilizes exactly three business health statuses, consistent across both backend schema validation and frontend badge themes:
1. **Average**: Orange badge theme
2. **Good**: Blue badge theme
3. **Excellent**: Green badge theme

---

## Development Setup

### Running the Backend
1. Navigate to `backend/`
2. Create and activate a virtual environment (`python3 -m venv .venv && source .venv/bin/activate`)
3. Install dependencies: `pip install -r requirements.txt`
4. Run the development server: `uvicorn main:app --reload` (runs on port `8000`)

### Running the Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run the Vite development server: `npm run dev` (runs on port `5174` / `5173`)
