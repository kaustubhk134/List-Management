# List Management Application

A simple full-stack CRUD application built using React, Node.js, Express and PostgreSQL.

## Tech Stack

Frontend

- React
- Ant Design
- Tailwind CSS
- Formik
- Yup
- Axios

Backend

- Node.js
- Express.js
- PostgreSQL
- Sequelize

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend

```bash
cd backend

npm install
```

Create a `.env` file using `.env.example`

Start server

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

### Database

Install PostgreSQL

Create Database

```sql
CREATE DATABASE listdb;
```

Tables are automatically created when the backend starts.

---

## Features

- Create Record
- List Records
- Get Record by ID
- Update Record
- Soft Delete
- Hard Delete
- Form Validation using Yup
- Ant Design Table
- MVC Architecture
- Service Layer