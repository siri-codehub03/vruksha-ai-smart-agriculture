import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), 'vruksha_farm.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Initialize tables
export function initDatabase() {
  db.exec(`
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

    CREATE TABLE IF NOT EXISTS otp_verifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identifier TEXT NOT NULL,
      otp_code TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS farmer_crops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      crop_name TEXT NOT NULL,
      variety TEXT NOT NULL,
      sowing_date TEXT NOT NULL,
      area_acres REAL NOT NULL,
      stage TEXT NOT NULL,
      health_status TEXT NOT NULL,
      expected_harvest_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS soil_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plot_name TEXT NOT NULL,
      nitrogen REAL NOT NULL,
      phosphorus REAL NOT NULL,
      potassium REAL NOT NULL,
      ph REAL NOT NULL,
      organic_carbon REAL NOT NULL,
      moisture REAL NOT NULL,
      tested_at TEXT NOT NULL,
      health_score INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Seed default demo farmer if no users exist
  const count = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };
  if (count.count === 0) {
    const demoPasswordHash = bcrypt.hashSync('Farmer@123', 10);
    const insertUser = db.prepare(`
      INSERT INTO users (
        full_name, mobile, email, password_hash, state, district, village, preferred_language, farm_size_acres, soil_type, saved_crops
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertUser.run(
      'Ramesh Reddy (రమేష్ రెడ్డి)',
      '9876543210',
      'ramesh.farmer@vruksha.ai',
      demoPasswordHash,
      'Andhra Pradesh',
      'Guntur',
      'Tenali',
      'te',
      6.5,
      'Black Cotton Soil (నల్లరేగడి నేల)',
      'Paddy (వరి), Chilli (మిర్చి), Cotton (పత్తి)'
    );

    const userId = result.lastInsertRowid;

    // Seed demo crops for Ramesh
    const insertCrop = db.prepare(`
      INSERT INTO farmer_crops (user_id, crop_name, variety, sowing_date, area_acres, stage, health_status, expected_harvest_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertCrop.run(userId, 'Sona Masoori Paddy (వరి)', 'BPT 5204', '2026-07-15', 3.5, 'Grain Filling (గింజ దశ)', 'Excellent', '2026-11-20');
    insertCrop.run(userId, 'Teja Chilli (తేజ మిర్చి)', 'Teja S17', '2026-08-01', 2.0, 'Flowering & Fruiting (పూత & కాత)', 'Healthy', '2026-12-15');
    insertCrop.run(userId, 'Bt Cotton (పత్తి)', 'RCH 659', '2026-06-25', 1.0, 'Boll Maturity (కాయ పక్వత)', 'Moderate', '2026-11-10');

    // Seed soil test
    const insertSoil = db.prepare(`
      INSERT INTO soil_tests (user_id, plot_name, nitrogen, phosphorus, potassium, ph, organic_carbon, moisture, tested_at, health_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertSoil.run(userId, 'Main Field (Plot A)', 280, 24, 310, 6.8, 0.65, 34, '2026-09-10', 88);
  }
}

// User helper functions
export interface DbUser {
  id: number;
  full_name: string;
  mobile: string;
  email: string;
  password_hash: string;
  state: string;
  district: string;
  village: string;
  preferred_language: string;
  farm_size_acres: number;
  soil_type: string;
  saved_crops: string;
  profile_photo: string;
  created_at: string;
  updated_at: string;
}

export function getUserByEmailOrMobile(identifier: string): DbUser | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ? OR mobile = ?');
  return stmt.get(identifier.trim(), identifier.trim()) as DbUser | undefined;
}

export function getUserById(id: number): DbUser | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as DbUser | undefined;
}

export function createUser(userData: {
  full_name: string;
  mobile: string;
  email: string;
  password: string;
  state: string;
  district: string;
  village: string;
  preferred_language: string;
}): DbUser {
  const password_hash = bcrypt.hashSync(userData.password, 10);
  const stmt = db.prepare(`
    INSERT INTO users (full_name, mobile, email, password_hash, state, district, village, preferred_language, farm_size_acres, soil_type, saved_crops)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 4.0, 'Black Cotton Soil', 'Paddy, Cotton')
  `);

  const result = stmt.run(
    userData.full_name.trim(),
    userData.mobile.trim(),
    userData.email.toLowerCase().trim(),
    password_hash,
    userData.state.trim(),
    userData.district.trim(),
    userData.village.trim(),
    userData.preferred_language || 'en'
  );

  const newUserId = Number(result.lastInsertRowid);

  // Add initial sample crop for new farmer
  const insertCrop = db.prepare(`
    INSERT INTO farmer_crops (user_id, crop_name, variety, sowing_date, area_acres, stage, health_status, expected_harvest_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertCrop.run(newUserId, 'Paddy (వరి)', 'MTU 1010', new Date().toISOString().split('T')[0], 4.0, 'Vegetative (శాఖా దశ)', 'Healthy', '2026-12-30');

  // Add initial soil test
  const insertSoil = db.prepare(`
    INSERT INTO soil_tests (user_id, plot_name, nitrogen, phosphorus, potassium, ph, organic_carbon, moisture, tested_at, health_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertSoil.run(newUserId, 'Primary Farm Plot', 260, 20, 290, 7.1, 0.58, 30, new Date().toISOString().split('T')[0], 82);

  return getUserById(newUserId)!;
}

export function updateUserProfile(id: number, updates: {
  full_name?: string;
  mobile?: string;
  state?: string;
  district?: string;
  village?: string;
  preferred_language?: string;
  farm_size_acres?: number;
  soil_type?: string;
  saved_crops?: string;
}): DbUser {
  const user = getUserById(id);
  if (!user) throw new Error('User not found');

  const stmt = db.prepare(`
    UPDATE users SET
      full_name = COALESCE(?, full_name),
      mobile = COALESCE(?, mobile),
      state = COALESCE(?, state),
      district = COALESCE(?, district),
      village = COALESCE(?, village),
      preferred_language = COALESCE(?, preferred_language),
      farm_size_acres = COALESCE(?, farm_size_acres),
      soil_type = COALESCE(?, soil_type),
      saved_crops = COALESCE(?, saved_crops),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  stmt.run(
    updates.full_name?.trim() || null,
    updates.mobile?.trim() || null,
    updates.state?.trim() || null,
    updates.district?.trim() || null,
    updates.village?.trim() || null,
    updates.preferred_language || null,
    updates.farm_size_acres !== undefined ? updates.farm_size_acres : null,
    updates.soil_type?.trim() || null,
    updates.saved_crops?.trim() || null,
    id
  );

  return getUserById(id)!;
}

export function updateUserPassword(id: number, newPasswordPlain: string): void {
  const password_hash = bcrypt.hashSync(newPasswordPlain, 10);
  const stmt = db.prepare(`
    UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `);
  stmt.run(password_hash, id);
}

// OTP helper functions
export function saveOtp(identifier: string, code: string, expiryMinutes: number = 15): void {
  const expiresAt = Date.now() + expiryMinutes * 60 * 1000;
  // Invalidate previous OTPs for this identifier
  db.prepare('DELETE FROM otp_verifications WHERE identifier = ?').run(identifier);
  db.prepare('INSERT INTO otp_verifications (identifier, otp_code, expires_at) VALUES (?, ?, ?)')
    .run(identifier, code, expiresAt);
}

export function verifyAndConsumeOtp(identifier: string, code: string): boolean {
  const record = db.prepare(`
    SELECT * FROM otp_verifications 
    WHERE identifier = ? AND otp_code = ? AND used = 0 AND expires_at > ?
  `).get(identifier, code, Date.now()) as { id: number } | undefined;

  if (record) {
    db.prepare('UPDATE otp_verifications SET used = 1 WHERE id = ?').run(record.id);
    return true;
  }
  return false;
}

// Crops and soil query helpers
export function getFarmerCrops(userId: number) {
  return db.prepare('SELECT * FROM farmer_crops WHERE user_id = ? ORDER BY id DESC').all(userId);
}

export function addFarmerCrop(userId: number, cropData: {
  crop_name: string;
  variety: string;
  sowing_date: string;
  area_acres: number;
  stage: string;
  health_status: string;
  expected_harvest_date?: string;
}) {
  const stmt = db.prepare(`
    INSERT INTO farmer_crops (user_id, crop_name, variety, sowing_date, area_acres, stage, health_status, expected_harvest_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    userId,
    cropData.crop_name,
    cropData.variety,
    cropData.sowing_date,
    cropData.area_acres,
    cropData.stage,
    cropData.health_status,
    cropData.expected_harvest_date || ''
  );
  return db.prepare('SELECT * FROM farmer_crops WHERE id = ?').get(result.lastInsertRowid);
}

export function getSoilRecords(userId: number) {
  return db.prepare('SELECT * FROM soil_tests WHERE user_id = ? ORDER BY id DESC').all(userId);
}

export function addSoilRecord(userId: number, record: {
  plot_name: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organic_carbon: number;
  moisture: number;
  tested_at: string;
}) {
  // Compute health score roughly based on standard NPK and pH targets
  let score = 70;
  if (record.ph >= 6.2 && record.ph <= 7.5) score += 10;
  if (record.nitrogen >= 250 && record.nitrogen <= 350) score += 8;
  if (record.phosphorus >= 18 && record.phosphorus <= 30) score += 6;
  if (record.potassium >= 200 && record.potassium <= 350) score += 6;
  score = Math.min(score, 98);

  const stmt = db.prepare(`
    INSERT INTO soil_tests (user_id, plot_name, nitrogen, phosphorus, potassium, ph, organic_carbon, moisture, tested_at, health_score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    userId,
    record.plot_name,
    record.nitrogen,
    record.phosphorus,
    record.potassium,
    record.ph,
    record.organic_carbon,
    record.moisture,
    record.tested_at,
    score
  );
  return db.prepare('SELECT * FROM soil_tests WHERE id = ?').get(result.lastInsertRowid);
}

export default db;
