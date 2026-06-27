# AI Business Health Summarizer Backend

A production-ready Python Flask backend with PostgreSQL integration.

## Setup Instructions

1. **Environment:**
   Ensure you have Python 3.9+ installed.
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Database Setup:**
   The backend is currently configured for a local SQLite database for easy development (`DATABASE_URL=sqlite:///summarizer.db`).
   To run migrations:
   ```bash
   flask db init
   flask db migrate -m "Init"
   flask db upgrade
   ```

3. **Environment Variables:**
   Create a `.env` file from `.env.example` and add your `GEMINI_API_KEY`.

4. **Run Server:**
   ```bash
   python app.py
   ```
   Server will start on `http://127.0.0.1:5000`.

## Deployment Instructions (Render + Supabase)

### 1. Database (Supabase)
1. Create a project in [Supabase](https://supabase.com).
2. Go to Project Settings -> Database.
3. Copy the Connection String (URI). Replace `[YOUR-PASSWORD]` with your DB password.

### 2. Web Service (Render)
1. Connect your GitHub repository to [Render](https://render.com).
2. Create a new "Web Service".
3. **Build Command:** `pip install -r backend/requirements.txt && flask db upgrade`
4. **Start Command:** `gunicorn -w 4 -b 0.0.0.0:5000 app:create_app()`
5. Add the following **Environment Variables**:
   - `DATABASE_URL`: The Supabase URI you copied.
   - `SECRET_KEY`: A secure random string.
   - `GEMINI_API_KEY`: Your Google Gemini API Key.

The database migrations (`flask db upgrade`) will run automatically on deployment to set up the PostgreSQL tables.
