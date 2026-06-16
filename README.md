# REAP-CMS — Rajasthan Engineering Admission Portal

> **Counselling Management System** for engineering college admissions in Rajasthan, India.

A full-stack web application built with **React.js**, **Express.js**, **Prisma ORM**, and **MongoDB** that manages the complete student counselling workflow — from registration and profile management to preference-based choice filling and administrative oversight.

![Tech Stack](https://img.shields.io/badge/React-19-blue?logo=react) ![Express](https://img.shields.io/badge/Express-5-black?logo=express) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb) ![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss)

---

## 📋 Features

### Student Portal
- **Student Dashboard** — Overview of application status, deadlines, and priority choices
- **Student Information Form** — Personal details, academic records (JEE percentile, Class 12%), domicile & category
- **Choice Filling** — Add, reorder (move up/down), and remove college+branch preferences
- **Choice Locking** — Final lock with confirmation dialog (irreversible)

### Admin Panel
- **Student List Sidebar** — Browse all registered students with status badges
- **Student Detail View** — Full profile, academic merit, and filled choices for each student
- **Lock Status Monitoring** — Visual indicator for locked/unlocked choice status

---

## 🏗️ Project Structure

```
REAP-CMS/
├── backend/
│   ├── index.js              # Express server with all API routes
│   ├── prisma/
│   │   └── schema.prisma     # Database schema (Student, Choice, ApplicationStatus)
│   ├── .env.example          # Environment variable template
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx               # Router (4 routes)
    │   ├── Admin.jsx             # Admin dashboard
    │   ├── ChoiceFilling.jsx     # Choice management page
    │   ├── StudentDashboard.jsx  # Student home dashboard
    │   └── StudentInformation.jsx # Student profile form
    ├── index.html
    ├── tailwind.config.js    # Material Design 3 token system
    └── package.json
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router v7, TailwindCSS 3 |
| **Backend** | Express.js 5, Node.js |
| **Database** | MongoDB Atlas |
| **ORM** | Prisma 5 |
| **Build Tool** | Vite 5 |
| **Icons** | Google Material Symbols (Outlined) |
| **Fonts** | Newsreader (headings), Public Sans (body) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and npm
- **MongoDB Atlas** account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/mahi1817/REAP-CMS.git
cd REAP-CMS
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file based on the template:
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:
```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/counsellingReap?retryWrites=true&w=majority"
PORT=5000
```

Generate Prisma client and start the server:
```bash
npx prisma generate
npm run dev
```

The backend will be running at `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be running at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/admin/students` | Get all students with choices & status |
| `GET` | `/api/students/:reapId` | Get student by REAP ID |
| `POST` | `/api/students` | Create a new student |
| `PUT` | `/api/students/:reapId` | Update student information |
| `POST` | `/api/choices/:studentId` | Save/lock choices for a student |

---

## 🗄️ Database Schema

### Student
| Field | Type | Description |
|-------|------|-------------|
| `reapId` | String (unique) | REAP registration ID |
| `fullName` | String | Student's full name |
| `casteCategory` | String? | Category (General/OBC/SC/ST/EWS) |
| `jeePercentile` | Float? | JEE Mains percentile score |
| `class12Percentage` | Float? | Class 12 aggregate percentage |
| `domicile` | String? | State domicile |
| `exServiceman` | Boolean | Ex-serviceman category |
| `meritRank` | Int? | Calculated REAP merit rank |

### Choice
| Field | Type | Description |
|-------|------|-------------|
| `preference` | Int | Priority order (1 = highest) |
| `institution` | String | College/institution name |
| `branch` | String | Branch/discipline |
| `studentId` | ObjectId | Reference to Student |

### ApplicationStatus
| Field | Type | Description |
|-------|------|-------------|
| `studentId` | String (unique) | Reference to Student |
| `registrationStatus` | String | Registration verification status |
| `documentVerification` | String | Document verification status |
| `choiceFilling` | String | Choice filling progress |
| `lockedChoices` | Boolean | Whether choices are finalized |

---

## 🌐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | MongoDB connection string (Prisma format) |
| `PORT` | ❌ | Server port (default: 5000) |

---

## 📸 Screenshots

The application features a Material Design 3 inspired UI with:
- Deep navy (`#002045`) primary color palette
- Newsreader serif headings with Public Sans body text
- Responsive sidebar navigation
- Bento-grid dashboard layout

---

## 🛣️ Roadmap / Future Improvements

- [ ] **Authentication** — JWT-based login for students and admin
- [ ] **Role-based access control** — Protect admin routes
- [ ] **Input validation** — Server-side validation with Zod/Joi
- [ ] **Seat allotment algorithm** — Merit-based automatic allotment
- [ ] **Email notifications** — OTP verification and status updates
- [ ] **Document upload** — Photo, marksheets, certificates
- [ ] **Payment integration** — Counselling fee payment gateway

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 👤 Author

**mahi1817** — [GitHub Profile](https://github.com/mahi1817)
