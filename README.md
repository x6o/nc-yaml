# NC YAML Configuration Editor

A fullstack web app for editing YAML configuration file with DB synchronization, text editor and form-based editing UI. Part of the project assessment.


**Tech Stack:**
- **Front**: React 19, TypeScript, MUI for styles
- **Backend**: Flask, jsonschema

## How to Run

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm

### Backend Setup

0. Clone the repository.

1. Navigate to the backend directory.

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS or Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Flask server:
```bash
python app.py
```

Backend runs at `http://127.0.0.1:5000`

### Frontend Setup

1. Navigate to the frontend directory:

2. Install dependencies:

Note: Use `--legacy-peer-deps` due to a peer dependency conflict between TypeScript and `react-scripts`.
```bash
npm install --legacy-peer-deps
```

3. Start the React dev server:
```bash
npm start
```

The frontend runs at `http://localhost:3000`.

### Accessing the Application

Open `http://localhost:3000`

## Assumptions & Trade-offs

### Assumptions
1. **Single User**: The application is single-user access (expected for this assessment).
2. **File-based Storage**: Configuration is stored in a single `config.yaml` file on the backend filesystem rather than a DB (like SQLite or Postgres)
3. **Simple Schema**: The schema is very simple and straightforward.
4. Please don't run this in prod haha

### Trade-offs
1. ~~**No Real YAML Parsing Yet**: Currently parsing JSON instead of YAML in the FE for simplicity. Next step would be using something like « `js-yaml`.~~ Realized it's an easy add/win, so added it.
2. **Basic Text Editor**: Using a plain textarea of a build-in code editor with syntax highlighting.


## Improvements (If I had time)

1. **No unit tests**: For the sake of speed and time management, I did not implement any testing whatsoever, but it would be a much needed improvement.
2. ~~**Real YAML Support**: Use actual YAML parsing with `js-yaml` in the Frontend~~ Added.
3. **Integrate a code editor**
   - Syntax highlighting
   - Line numbers
   - etc
4. **Clientside Validation**: Add frontend validation to relieve the BE api calls
5. **Better Errors**: More descriptive errors that includes the affected fields 
6. **Success Indicators**: Add more UX messages (like Saved to database)
7. **Better comments**: I would have improved the BE comments to be more descriptive, with argument and return type descriptions
