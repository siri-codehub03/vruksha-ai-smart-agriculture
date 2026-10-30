"""
VRUKSHA AI – Intelligent Smart Agriculture Platform
FastAPI & SQLite Authentication Backend

Endpoints implemented:
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- POST /auth/forgot-password
- POST /auth/reset-password
- GET  /auth/me
- PUT  /auth/profile
"""

import sqlite3
import random
import time
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Header, Response, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt

SECRET_KEY = "vruksha_ai_fastapi_jwt_secret_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(
    title="VRUKSHA AI - Farmer Authentication API",
    description="Intelligent Smart Agriculture Platform API with SQLite & JWT",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "vruksha_farm.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_sqlite_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        mobile TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        state TEXT NOT NULL,
        district TEXT NOT NULL,
        village TEXT NOT NULL,
        preferred_language TEXT DEFAULT 'en',
        farm_size_acres REAL DEFAULT 5.0,
        soil_type TEXT DEFAULT 'Black Cotton Soil',
        saved_crops TEXT DEFAULT 'Paddy, Cotton, Chilli',
        profile_photo TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS otp_verifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        identifier TEXT NOT NULL,
        otp_code TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        used INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)
    conn.commit()
    conn.close()

init_sqlite_db()

# Pydantic Schemas
class RegisterRequest(BaseModel):
    full_name: str
    mobile: str
    email: EmailStr
    password: str
    confirm_password: Optional[str] = None
    state: str
    district: str
    village: str
    preferred_language: Optional[str] = "en"
    terms_accepted: Optional[bool] = True

class LoginRequest(BaseModel):
    identifier: str
    password: str
    remember_me: Optional[bool] = False

class ForgotPasswordRequest(BaseModel):
    identifier: str

class ResetPasswordRequest(BaseModel):
    identifier: str
    otp_code: str
    new_password: str
    confirm_new_password: Optional[str] = None

class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    mobile: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    village: Optional[str] = None
    preferred_language: Optional[str] = None
    farm_size_acres: Optional[float] = None
    soil_type: Optional[str] = None
    saved_crops: Optional[str] = None

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = time.time() + (ACCESS_TOKEN_EXPIRE_MINUTES * 60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid authentication token")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User account not found")
    
    user_dict = dict(user)
    user_dict.pop("password_hash", None)
    return user_dict

@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest):
    if len(data.full_name.strip()) < 2:
        raise HTTPException(status_code=400, detail="Full name must be at least 2 characters")
    if len(data.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    if data.confirm_password and data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    clean_mobile = "".join(filter(str.isdigit, data.mobile))
    if len(clean_mobile) != 10:
        raise HTTPException(status_code=400, detail="Valid 10-digit Indian mobile number required")
    
    conn = get_db()
    existing = conn.execute(
        "SELECT id FROM users WHERE mobile = ? OR email = ?",
        (clean_mobile, data.email.lower().strip())
    ).fetchone()
    
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Farmer account with this mobile or email already exists")
    
    hashed = hash_password(data.password)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO users (full_name, mobile, email, password_hash, state, district, village, preferred_language)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.full_name.strip(),
        clean_mobile,
        data.email.lower().strip(),
        hashed,
        data.state.strip(),
        data.district.strip(),
        data.village.strip(),
        data.preferred_language or "en"
    ))
    new_user_id = cursor.lastrowid
    conn.commit()
    
    user_row = conn.execute("SELECT * FROM users WHERE id = ?", (new_user_id,)).fetchone()
    conn.close()
    
    user_dict = dict(user_row)
    user_dict.pop("password_hash", None)
    token = create_access_token({"id": new_user_id, "email": user_dict["email"]})
    
    return {
        "success": True,
        "message": "Farmer registration successful!",
        "user": user_dict,
        "token": token
    }

@app.post("/auth/login")
def login(data: LoginRequest):
    clean_id = data.identifier.strip().lower()
    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE lower(email) = ? OR mobile = ?",
        (clean_id, clean_id)
    ).fetchone()
    conn.close()
    
    if not user:
        raise HTTPException(status_code=401, detail="No farmer account found with this identifier")
    
    if not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect password. Please verify and try again.")
    
    user_dict = dict(user)
    user_dict.pop("password_hash", None)
    token = create_access_token({"id": user["id"], "email": user["email"]})
    
    return {
        "success": True,
        "message": "Welcome back to VRUKSHA AI!",
        "user": user_dict,
        "token": token
    }

@app.post("/auth/logout")
def logout():
    return {"success": True, "message": "Logged out successfully"}

@app.post("/auth/forgot-password")
def forgot_password(data: ForgotPasswordRequest):
    clean_id = data.identifier.strip().lower()
    conn = get_db()
    user = conn.execute(
        "SELECT id, mobile, email FROM users WHERE lower(email) = ? OR mobile = ?",
        (clean_id, clean_id)
    ).fetchone()
    
    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="No registered account found with this email or mobile")
    
    otp_code = str(random.randint(100000, 999999))
    expires_at = int(time.time()) + (15 * 60)
    
    cursor = conn.cursor()
    cursor.execute("DELETE FROM otp_verifications WHERE identifier = ?", (clean_id,))
    cursor.execute(
        "INSERT INTO otp_verifications (identifier, otp_code, expires_at) VALUES (?, ?, ?)",
        (clean_id, otp_code, expires_at)
    )
    conn.commit()
    conn.close()
    
    return {
        "success": True,
        "message": f"Verification OTP code generated for {clean_id}",
        "demoOtp": otp_code
    }

@app.post("/auth/reset-password")
def reset_password(data: ResetPasswordRequest):
    clean_id = data.identifier.strip().lower()
    if data.confirm_new_password and data.new_password != data.confirm_new_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    if len(data.new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    
    conn = get_db()
    otp_row = conn.execute("""
        SELECT id FROM otp_verifications
        WHERE identifier = ? AND otp_code = ? AND used = 0 AND expires_at > ?
    """, (clean_id, data.otp_code.strip(), int(time.time()))).fetchone()
    
    if not otp_row:
        conn.close()
        raise HTTPException(status_code=400, detail="Invalid or expired OTP code")
    
    cursor = conn.cursor()
    cursor.execute("UPDATE otp_verifications SET used = 1 WHERE id = ?", (otp_row["id"],))
    
    hashed = hash_password(data.new_password)
    cursor.execute("""
        UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
        WHERE lower(email) = ? OR mobile = ?
    """, (hashed, clean_id, clean_id))
    conn.commit()
    conn.close()
    
    return {"success": True, "message": "Password reset successful! You may now log in."}

@app.get("/auth/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return {"success": True, "user": current_user}

@app.put("/auth/profile")
def update_profile(data: ProfileUpdateRequest, current_user: dict = Depends(get_current_user)):
    conn = get_db()
    cursor = conn.cursor()
    
    updates = []
    values = []
    
    for field, val in data.model_dump(exclude_unset=True).items():
        if val is not None:
            updates.append(f"{field} = ?")
            values.append(val)
            
    if not updates:
        conn.close()
        return {"success": True, "user": current_user}
        
    updates.append("updated_at = CURRENT_TIMESTAMP")
    values.append(current_user["id"])
    
    sql = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
    cursor.execute(sql, tuple(values))
    conn.commit()
    
    user_row = conn.execute("SELECT * FROM users WHERE id = ?", (current_user["id"],)).fetchone()
    conn.close()
    
    user_dict = dict(user_row)
    user_dict.pop("password_hash", None)
    
    return {"success": True, "message": "Profile updated", "user": user_dict}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
