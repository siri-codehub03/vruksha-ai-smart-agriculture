# VRUKSHA AI – Database & Backend Architecture Guide

**Project:** VRUKSHA AI – Intelligent Smart Agriculture Platform  
**Tagline:** RIGHT CROP. RIGHT SOIL. RIGHT TIME. BETTER PROFIT.

---

## 1. Architecture Overview

VRUKSHA AI features a full-stack, production-ready authentication and agricultural decision platform:

- **Integrated Runtime:** Node.js + Express with `better-sqlite3` and `@google/genai` (powers the live interactive web app on port 3000).
- **Alternative Standalone Backend:** Python FastAPI + SQLite (`/backend_fastapi/main.py`) providing identical REST API contracts.
- **Database Engine:** SQLite (`vruksha_farm.db`) with WAL mode, foreign keys, and indexes.
- **Security:**
  - Password Hashing: `bcrypt` (10 rounds)
  - Token Management: Signed JWT (`HS256`) with configurable expiration (7 to 30 days)
  - Protected API routes via Bearer Token header or HTTP cookies
  - Real OTP verification with 15-minute expiration table
  - Defense against plain-text credential leaks

---

## 2. SQLite Database Schema

The database `vruksha_farm.db` contains four primary tables:

### `users` Table
| Column | Type | Description |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Unique Farmer ID |
| `full_name` | TEXT NOT NULL | Farmer Name |
| `mobile` | TEXT UNIQUE NOT NULL | 10-digit Indian Mobile |
| `email` | TEXT UNIQUE NOT NULL | Email Address |
| `password_hash` | TEXT NOT NULL | Bcrypt hashed password |
| `state` | TEXT NOT NULL | State (e.g., Andhra Pradesh, Telangana) |
| `district` | TEXT NOT NULL | District (e.g., Guntur, Warangal) |
| `village` | TEXT NOT NULL | Village / Mandal |
| `preferred_language`| TEXT DEFAULT 'en' | 'en' (English) or 'te' (Telugu) |
| `farm_size_acres` | REAL DEFAULT 5.0 | Total Cultivated Land in Acres |
| `soil_type` | TEXT | Primary soil type (Black Cotton, Red Loamy, etc.) |
| `saved_crops` | TEXT | Registered crops list |
| `created_at` | DATETIME | Registration timestamp |
| `updated_at` | DATETIME | Last profile modification |

### `otp_verifications` Table
| Column | Type | Description |
|---|---|---|
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | Verification ID |
| `identifier` | TEXT NOT NULL | Mobile number or email |
| `otp_code` | TEXT NOT NULL | 6-digit one-time code |
| `expires_at` | INTEGER NOT NULL | Expiry Unix timestamp (15 mins) |
| `used` | INTEGER DEFAULT 0 | 0 = active, 1 = redeemed |

### `farmer_crops` Table
Stores individual crop tracking records with phenology stage and health status.

### `soil_tests` Table
Stores scientific soil fertility parameters: Nitrogen (N), Phosphorus (P), Potassium (K), pH, Organic Carbon (OC %), and Moisture %.

---

## 3. Implemented API Endpoints

All endpoints are available at `/auth/*` and `/api/auth/*`:

### 1. `POST /auth/register`
- **Body:** `{ full_name, mobile, email, password, confirm_password, state, district, village, preferred_language, terms_accepted }`
- **Validations:** 10-digit mobile check, email pattern, min 6-char password, duplicate mobile/email check.
- **Response:** `{ success: true, message: "...", user, token }`

### 2. `POST /auth/login`
- **Body:** `{ identifier, password, remember_me }`
- **Supports:** Login via Mobile Number or Email.
- **Response:** `{ success: true, user, token }`

### 3. `POST /auth/logout`
- **Response:** `{ success: true, message: "Logged out" }`

### 4. `POST /auth/forgot-password`
- **Body:** `{ identifier }`
- **Behavior:** Generates a secure 6-digit OTP stored in SQLite, returned in response payload for instant testing.

### 5. `POST /auth/reset-password`
- **Body:** `{ identifier, otp_code, new_password, confirm_new_password }`
- **Behavior:** Validates unexpired OTP, hashes new password with bcrypt, marks OTP as used.

### 6. `GET /auth/me` *(Protected)*
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Response:** `{ success: true, user }`

### 7. `PUT /auth/profile` *(Protected)*
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:** `{ full_name, state, district, village, preferred_language, farm_size_acres, soil_type, saved_crops }`
- **Response:** `{ success: true, user }`

---

## 4. Running the Standalone Python FastAPI Backend

To run the Python FastAPI backend separately:

```bash
# 1. Navigate to fastapi directory
cd backend_fastapi

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Start the FastAPI development server
uvicorn main:app --reload --port 8000
```

FastAPI Interactive Swagger Docs will be available at:
`http://localhost:8000/docs`

---

## 5. Pre-seeded Demo Credentials

For convenience and instant testing, a demo farmer account is pre-seeded into `vruksha_farm.db`:

- **Identifier / Mobile:** `9876543210`
- **Email:** `ramesh.farmer@vruksha.ai`
- **Password:** `Farmer@123`
- **Farmer Name:** Ramesh Reddy (రమేష్ రెడ్డి)
- **Location:** Tenali, Guntur, Andhra Pradesh
- **Crops:** Sona Masoori Paddy, Teja Chilli, Bt Cotton
