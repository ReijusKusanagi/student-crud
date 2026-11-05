# Student CRUD Fullstack Application

A fullstack Student Information Management application built with **Spring Boot** (Java) on the backend and **React + Vite + Tailwind CSS** on the frontend.

---

## 📁 Project Structure

```text
STUDENT-CRUD/
├── student/             # Spring Boot (Java) Backend API
│   ├── src/main/java/   # Entity, Repository, and Controller
│   └── pom.xml
└── frontend/            # Vite + React + Tailwind CSS Frontend
    ├── src/             # Components, API client, and layout
    └── vite.config.js   # Dev proxy to backend port 8080
```

---

## 🚀 Getting Started

### Prerequisites
* Java 17+ & Maven (or Maven Wrapper included)
* Node.js 18+ & npm
* PostgreSQL database named `db_student` (configured in `student/src/main/resources/application.properties`)

---

### 1. Run the Backend API
Navigate to the `student` directory and start the Spring Boot application:
```powershell
cd student
.\mvnw.cmd spring-boot:run
```
* **API Base URL**: `http://localhost:8080/cruz/students`

---

### 2. Run the Frontend
In another terminal, navigate to the `frontend` directory and start the Vite dev server:
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```
* **Frontend URL**: `http://localhost:5173`

---

## 🛠️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/cruz/students` | Get all students |
| `GET` | `/cruz/students/{id}` | Get student by ID |
| `POST` | `/cruz/students` | Create new student |
| `PUT` | `/cruz/students/{id}` | Update student by ID |
| `DELETE` | `/cruz/students/{id}` | Delete student by ID |
