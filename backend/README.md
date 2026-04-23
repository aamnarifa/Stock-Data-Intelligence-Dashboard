# Stock Dashboard Backend

## Requirements
*   Python 3.8+
*   The virtual environment is already set up as requested.

## Running the Backend
1. **Activate your Virtual Environment** (do this from `C:\Users\Aamina Rifa\Desktop\Fin_Tech`):
   ```bash
   # Windows
   your_env_name\Scripts\activate
   ```
2. **Install Dependencies**:
   ```bash
   cd stock-dashboard/backend
   pip install -r requirements.txt
   ```
3. **Run the API server**:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend will be live at `http://127.0.0.1:8000`. 
   You can verify it by opening `http://127.0.0.1:8000/docs` in your browser.
