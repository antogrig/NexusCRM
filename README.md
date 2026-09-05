# 🚀 NexusCRM — Modern Fullstack SaaS Platform

A high-performance, decoupled Fullstack CRM and Task Management web application built with **Laravel 11 (REST API)**, **PostgreSQL**, and **React 19 (SPA with Tailwind CSS & Vite)**.

Designed and engineered following modern software engineering best practices, including **Token-based Authentication (Sanctum)**, **Relational Eager Loading (N+1 resolution)**, **Asynchronous Background Queues**, and **Automated Feature Testing**.

---

## 🌟 Key Architecture & Features

### 1. ⚙️ Backend (Laravel 11 RESTful API & PostgreSQL)
- **Decoupled Architecture:** Clean RESTful API returning structured JSON responses with standard HTTP status codes (`200`, `201`, `401`, `404`).
- **Database Engineering (PostgreSQL):** Robust relational schema with foreign key constraints, soft deletes (`deleted_at`), and indexed search columns (`company_name`).
- **Performance & Eager Loading:** Nested eager loading (`with('projects.tasks')`) to eliminate the notorious N+1 query problem.
- **Security & Authentication (Laravel Sanctum):** Protected API endpoints secured with Bearer Tokens, password hashing, and token revocation on logout.
- **Asynchronous Background Jobs (Queues):** Dedicated `SendTaskCreatedNotification` Job dispatched to a database queue worker for non-blocking notifications.
- **Automated Feature Testing:** Comprehensive PHPUnit test suite validating authentication flows, unauthorized access blocks, and database persistence.

### 2. 💻 Frontend (React 19, Vite & Tailwind CSS)
- **Single Page Application (SPA):** Instant, reactive UI with client-side state management (`useState`, `useEffect`).
- **Controlled Components & Forms:** Seamless creation of Clients, Projects, and Tasks with real-time optimistic UI updates.
- **Interactive Task Workflow:** Instant `PATCH` status toggles (`todo` ↔ `done`) with live feedback.
- **1-Click Demo Login:** Pre-configured recruiter demo access for instant 1-click evaluation.
- **🧠 Interactive Tech Quiz:** Built-in 26-question revision and technical assessment center covering Laravel, React, APIs, and Architecture.

---

## 🔐 Demo Credentials

For quick evaluation without registration:
- **Email:** `admin@nexus.cy`
- **Password:** `admin`
- *(Or simply click the **"⚡ 1-Click Demo Login"** button on the login screen).*

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Axios |
| **Backend** | Laravel 11, PHP 8.4, Laravel Sanctum |
| **Database** | PostgreSQL 18 |
| **Async Queues** | Laravel Queue Worker (`database` driver) |
| **Testing** | PHPUnit (In-memory SQLite Feature Tests) |

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd nexus-crm
composer install
cp .env.example .env
# Configure DB_CONNECTION=pgsql in .env
php artisan migrate
php artisan db:seed
php artisan serve --port=8080
```

### 2. Queue Worker (Optional for async jobs)
```bash
cd nexus-crm
php artisan queue:work
```

### 3. Frontend Setup
```bash
cd nexus-frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Running Automated Tests
```bash
cd nexus-crm
php artisan test
```

---

## 📄 License
Open-source software licensed under the [MIT license](LICENSE).
