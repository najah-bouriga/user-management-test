Here’s a simplified and clearer version of your **README.md**:

---

# User Management Interface

This is a full-stack app for **user management** featuring **CRUD** operations. It uses **Angular** for the frontend, **Django REST Framework** for the backend, and **Docker** for containerization. **SQLite** is used for the database during testing.

## Technologies
- **Frontend**: Angular, Bootstrap, ag-Grid, amCharts
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (for testing)
- **Containerization**: Docker

## Features
- **CRUD** operations for managing users
- **ag-Grid** for interactive data grids
- **amCharts** for data visualizations

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/najah-bouriga/user-management-test.git
cd user-management-test
```

### 2. Run with Docker
```bash
docker-compose up --build
```
- Frontend: [http://localhost:4200](http://localhost:4200)
- API: [http://localhost:8000/api](http://localhost:8000/api)

### 3. Development Setup (Optional)

#### Frontend
```bash
cd frontend
npm install
ng serve
```

#### Backend
```bash
cd backend
python -m venv env
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## API Testing
To test the API, import the provided **Postman collection**:  
**[User Management API.postman_collection.json](https://raw.githubusercontent.com/najah-bouriga/user-management-test/refs/heads/main//User%20Management%20API.postman_collection.json)**

