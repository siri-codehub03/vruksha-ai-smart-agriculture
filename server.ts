import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  initDatabase,
  getUserByEmailOrMobile,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserPassword,
  saveOtp,
  verifyAndConsumeOtp,
  getFarmerCrops,
  addFarmerCrop,
  getSoilRecords,
  addSoilRecord,
  DbUser
} from './src/db/database.ts';
import { CROP_DISEASES_DB } from './src/data/mockAgricultureData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'vruksha_ai_secure_jwt_secret_key_2026';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Initialize SQLite Database
initDatabase();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize Gemini Client if key is available
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('Gemini client initialization skipped:', err);
  }
}

// Sanitized user object without password_hash
function sanitizeUser(user: DbUser) {
  const { password_hash, ...sanitized } = user;
  return sanitized;
}

// Auth Middleware
interface AuthRequest extends Request {
  user?: DbUser;
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  let token: string | undefined;

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.vruksha_token) {
    token = req.cookies.vruksha_token;
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    const user = getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Farmer account not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired token' });
  }
}

// ==========================================
// AUTHENTICATION API ENDPOINTS
// ==========================================

// Helper to register endpoints at both /auth/... and /api/auth/...
function registerAuthRoutes() {
  const registerHandler = (req: Request, res: Response) => {
    try {
      const {
        full_name,
        mobile,
        email,
        password,
        confirm_password,
        state,
        district,
        village,
        preferred_language,
        terms_accepted
      } = req.body;

      // Validations
      if (!full_name || full_name.trim().length < 2) {
        return res.status(400).json({ success: false, error: 'Please enter your full name (at least 2 characters)' });
      }

      const cleanMobile = (mobile || '').replace(/\D/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit Indian mobile number' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: 'Please provide a valid email address' });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
      }

      if (confirm_password && password !== confirm_password) {
        return res.status(400).json({ success: false, error: 'Passwords do not match' });
      }

      if (!state || !district || !village) {
        return res.status(400).json({ success: false, error: 'State, District, and Village are required for precision agronomy' });
      }

      // Check for existing user
      const existingUser = getUserByEmailOrMobile(cleanMobile) || getUserByEmailOrMobile(email.toLowerCase());
      if (existingUser) {
        if (existingUser.mobile === cleanMobile) {
          return res.status(400).json({ success: false, error: 'This mobile number is already registered. Please login.' });
        }
        return res.status(400).json({ success: false, error: 'This email address is already registered. Please login.' });
      }

      // Create farmer
      const newUser = createUser({
        full_name,
        mobile: cleanMobile,
        email: email.toLowerCase(),
        password,
        state,
        district,
        village,
        preferred_language: preferred_language || 'en'
      });

      // Generate JWT
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '14d' });

      res.cookie('vruksha_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 14 * 24 * 60 * 60 * 1000,
        sameSite: 'lax'
      });

      return res.status(201).json({
        success: true,
        message: 'Farmer registration completed successfully!',
        user: sanitizeUser(newUser),
        token
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      return res.status(500).json({ success: false, error: error.message || 'Server error during registration' });
    }
  };

  const loginHandler = (req: Request, res: Response) => {
    try {
      const { identifier, password, remember_me } = req.body;

      if (!identifier || !password) {
        return res.status(400).json({ success: false, error: 'Please provide your Mobile Number / Email and Password' });
      }

      const cleanIdentifier = identifier.trim().toLowerCase();
      const user = getUserByEmailOrMobile(cleanIdentifier);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'No account found with this mobile number or email. Please check or register.'
        });
      }

      const isMatch = bcrypt.compareSync(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Incorrect password. Please verify and try again or use Forgot Password.'
        });
      }

      const expiresIn = remember_me ? '30d' : '7d';
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn });

      res.cookie('vruksha_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: (remember_me ? 30 : 7) * 24 * 60 * 60 * 1000,
        sameSite: 'lax'
      });

      return res.json({
        success: true,
        message: 'Welcome back to VRUKSHA AI!',
        user: sanitizeUser(user),
        token
      });
    } catch (error: any) {
      console.error('Login error:', error);
      return res.status(500).json({ success: false, error: error.message || 'Server error during login' });
    }
  };

  const logoutHandler = (_req: Request, res: Response) => {
    res.clearCookie('vruksha_token');
    return res.json({ success: true, message: 'Successfully logged out' });
  };

  const forgotPasswordHandler = (req: Request, res: Response) => {
    try {
      const { identifier } = req.body;
      if (!identifier) {
        return res.status(400).json({ success: false, error: 'Please provide your registered mobile number or email' });
      }

      const cleanIdentifier = identifier.trim().toLowerCase();
      const user = getUserByEmailOrMobile(cleanIdentifier);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'No registered farmer account found with this identifier'
        });
      }

      // Generate 6-digit OTP code
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      saveOtp(cleanIdentifier, otpCode, 15);

      // Return success with verification code in response for testing/live preview
      return res.json({
        success: true,
        message: `OTP sent successfully to ${user.mobile ? 'XXXXXX' + user.mobile.slice(-4) : user.email}.`,
        demoOtp: otpCode
      });
    } catch (error: any) {
      console.error('Forgot password error:', error);
      return res.status(500).json({ success: false, error: error.message || 'Server error processing OTP request' });
    }
  };

  const resetPasswordHandler = (req: Request, res: Response) => {
    try {
      const { identifier, otp_code, new_password, confirm_new_password } = req.body;

      if (!identifier || !otp_code || !new_password) {
        return res.status(400).json({ success: false, error: 'Identifier, OTP code, and new password are required' });
      }

      if (confirm_new_password && new_password !== confirm_new_password) {
        return res.status(400).json({ success: false, error: 'New passwords do not match' });
      }

      if (new_password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
      }

      const cleanIdentifier = identifier.trim().toLowerCase();
      const isValidOtp = verifyAndConsumeOtp(cleanIdentifier, otp_code.trim());

      if (!isValidOtp) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired OTP code. Please request a new code.'
        });
      }

      const user = getUserByEmailOrMobile(cleanIdentifier);
      if (!user) {
        return res.status(404).json({ success: false, error: 'Farmer account not found' });
      }

      updateUserPassword(user.id, new_password);

      return res.json({
        success: true,
        message: 'Password reset successfully! You can now log in with your new password.'
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      return res.status(500).json({ success: false, error: error.message || 'Server error resetting password' });
    }
  };

  const meHandler = (req: AuthRequest, res: Response) => {
    return res.json({
      success: true,
      user: sanitizeUser(req.user!)
    });
  };

  const updateProfileHandler = (req: AuthRequest, res: Response) => {
    try {
      const updated = updateUserProfile(req.user!.id, req.body);
      return res.json({
        success: true,
        message: 'Farmer profile updated successfully',
        user: sanitizeUser(updated)
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      return res.status(500).json({ success: false, error: error.message || 'Failed to update profile' });
    }
  };

  // Mount at /auth/* as explicitly requested in prompt
  app.post('/auth/register', registerHandler);
  app.post('/auth/login', loginHandler);
  app.post('/auth/logout', logoutHandler);
  app.post('/auth/forgot-password', forgotPasswordHandler);
  app.post('/auth/reset-password', resetPasswordHandler);
  app.get('/auth/me', authenticateToken as any, meHandler as any);
  app.put('/auth/profile', authenticateToken as any, updateProfileHandler as any);

  // Mount at /api/auth/* for standard API conventions
  app.post('/api/auth/register', registerHandler);
  app.post('/api/auth/login', loginHandler);
  app.post('/api/auth/logout', logoutHandler);
  app.post('/api/auth/forgot-password', forgotPasswordHandler);
  app.post('/api/auth/reset-password', resetPasswordHandler);
  app.get('/api/auth/me', authenticateToken as any, meHandler as any);
  app.put('/api/auth/profile', authenticateToken as any, updateProfileHandler as any);
}

registerAuthRoutes();

// ==========================================
// PROTECTED AGRICULTURE MODULES API ENDPOINTS
// ==========================================

// Get and Add Farmer's Crops
app.get('/api/crops', authenticateToken as any, (req: AuthRequest, res: Response) => {
  const crops = getFarmerCrops(req.user!.id);
  res.json({ success: true, crops });
});

app.post('/api/crops', authenticateToken as any, (req: AuthRequest, res: Response) => {
  try {
    const { crop_name, variety, sowing_date, area_acres, stage, health_status, expected_harvest_date } = req.body;
    if (!crop_name || !sowing_date || !area_acres) {
      return res.status(400).json({ success: false, error: 'Crop name, sowing date, and land area are required' });
    }
    const newCrop = addFarmerCrop(req.user!.id, {
      crop_name,
      variety: variety || 'Standard Local Hybrid',
      sowing_date,
      area_acres: parseFloat(area_acres),
      stage: stage || 'Vegetative (శాఖా దశ)',
      health_status: health_status || 'Healthy',
      expected_harvest_date: expected_harvest_date || ''
    });
    res.status(201).json({ success: true, crop: newCrop });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Soil Test Records
app.get('/api/soil', authenticateToken as any, (req: AuthRequest, res: Response) => {
  const records = getSoilRecords(req.user!.id);
  res.json({ success: true, records });
});

app.post('/api/soil', authenticateToken as any, (req: AuthRequest, res: Response) => {
  try {
    const { plot_name, nitrogen, phosphorus, potassium, ph, organic_carbon, moisture, tested_at } = req.body;
    const newRecord = addSoilRecord(req.user!.id, {
      plot_name: plot_name || 'Main Field',
      nitrogen: parseFloat(nitrogen) || 280,
      phosphorus: parseFloat(phosphorus) || 22,
      potassium: parseFloat(potassium) || 290,
      ph: parseFloat(ph) || 6.8,
      organic_carbon: parseFloat(organic_carbon) || 0.6,
      moisture: parseFloat(moisture) || 32,
      tested_at: tested_at || new Date().toISOString().split('T')[0]
    });
    res.status(201).json({ success: true, record: newRecord });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI Crop Doctor Diagnosis API
app.post('/api/ai/diagnose', authenticateToken as any, async (req: AuthRequest, res: Response) => {
  try {
    const { crop_name, symptoms, image_base64 } = req.body;
    const language = req.user?.preferred_language || 'en';

    // If Gemini is available, call it for real-time agronomic analysis
    if (geminiClient && process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are VRUKSHA AI Senior Plant Pathologist & Agronomist for Indian agriculture.
Analyze the following crop disease or pest issue:
Crop: ${crop_name || 'General Field Crop'}
Observed Symptoms: ${symptoms || 'Leaf yellowing, curling, and spotted lesions'}
Farmer Language: ${language === 'te' ? 'Telugu and English' : 'English'}

Provide a structured, precise diagnosis in JSON format matching this schema:
{
  "crop_name": "${crop_name || 'Crop'}",
  "crop_name_te": "పంట పేరు",
  "disease_name": "Disease/Pest English Name",
  "disease_name_te": "తెగులు/చీడపీడ తెలుగు పేరు",
  "confidence": 95,
  "symptoms": ["Symptom 1", "Symptom 2", "Symptom 3"],
  "symptoms_te": ["లక్షణం 1", "లక్షణం 2"],
  "causes": "Detailed cause description in English",
  "causes_te": "తెలుగులో కారణాలు",
  "organic_treatment": ["Neem Oil recipe", "Bio-fungicide recommendation"],
  "organic_treatment_te": ["సేంద్రీయ చిట్కా 1", "సేంద్రీయ చిట్కా 2"],
  "chemical_treatment": ["Approved CIBRC chemical with dosage per liter"],
  "chemical_treatment_te": ["రసాయన మందు మోతాదు లీటరుకు"],
  "preventive_measures": ["Crop rotation", "Seed treatment"],
  "preventive_measures_te": ["నివారణ చర్య 1", "నివారణ చర్య 2"]
}
Return only valid raw JSON without markdown code fences.`;

        const response = await geminiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const text = response.text || '';
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        return res.json({ success: true, diagnosis: parsed });
      } catch (geminiErr) {
        console.warn('Gemini diagnosis fallback used:', geminiErr);
      }
    }

    // High quality local fallback from expert ICAR/ANGRU database
    const query = (crop_name + ' ' + symptoms).toLowerCase();
    let matched = CROP_DISEASES_DB.find(d => 
      query.includes(d.crop_name.toLowerCase()) || 
      query.includes('chilli') || 
      query.includes('mirchi') ||
      query.includes('curl')
    ) || CROP_DISEASES_DB[0];

    if (query.includes('paddy') || query.includes('rice') || query.includes('blast')) {
      matched = CROP_DISEASES_DB[1];
    } else if (query.includes('cotton') || query.includes('bollworm')) {
      matched = CROP_DISEASES_DB[2];
    }

    return res.json({ success: true, diagnosis: matched });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI Farming Chatbot API (Kisan Mitra)
app.post('/api/ai/chat', authenticateToken as any, async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const user = req.user!;
    const userLanguage = user.preferred_language || 'en';

    if (geminiClient && process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are "Kisan Mitra" (కిసాన్ మిత్ర), an expert AI agronomist and farming advisor at VRUKSHA AI in India.
Farmer Details:
- Name: ${user.full_name}
- Location: ${user.village}, ${user.district}, ${user.state}
- Farm Size: ${user.farm_size_acres} acres
- Soil Type: ${user.soil_type}
- Saved Crops: ${user.saved_crops}
- Preferred Language: ${userLanguage === 'te' ? 'Telugu (తెలుగు)' : 'English'}

Farmer's Question: "${message}"

Rules:
1. Provide accurate, practical agricultural advice suitable for Indian climate and soil.
2. Recommend both organic solutions (Neem, Trichoderma, Jeevamrutham) and safe, approved chemical inputs with exact dosages.
3. If the user writes in Telugu or has Telugu preference, reply primarily in clear, warm Telugu (తెలుగు) with English names in brackets. If in English, reply in crisp English.
4. Keep the tone respectful, encouraging, and supportive (use "రైతన్న" / "Annadata").
5. Structure with clear bullet points.`;

        const response = await geminiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        return res.json({
          success: true,
          reply: response.text || 'I am ready to help you with your crops!'
        });
      } catch (geminiErr) {
        console.warn('Gemini chat fallback used:', geminiErr);
      }
    }

    // Smart context-aware fallback response in both languages
    const lower = message.toLowerCase();
    let reply = '';

    if (userLanguage === 'te') {
      if (lower.includes('water') || lower.includes('నీరు') || lower.includes('తడి')) {
        reply = `నమస్కారం ${user.full_name} గారు!\n\nమీ ${user.soil_type} నేలలో తేమ ఆరిపోకుండా చూసుకోవడం ముఖ్యం:\n• పూత మరియు గింజ పాలుపోసుకునే దశలలో 4-6 రోజుల వ్యవధిలో తేలికపాటి తడులు ఇవ్వండి.\n• పొలంలో నీరు నిల్వ ఉండకుండా చూసుకోండి.\n• డ్రిప్ ఇరిగేషన్ ద్వారా 40% నీరు ఆదా అవుతుంది మరియు ఎరువులు నేరుగా వేళ్లకు అందుతాయి.`;
      } else if (lower.includes('fertilizer') || lower.includes('యూరియా') || lower.includes('ఎరువు')) {
        reply = `నమస్కారం ${user.full_name} గారు!\n\n${user.saved_crops} పంటకు ఎరువుల యాజమాన్యం:\n• యూరియాను ఒకేసారి వేయకుండా 3 దఫాలుగా విభజించి వేయండి (మొలక దశ, శాఖా దశ, పూతకు ముందు).\n• భాస్వరం మరియు పొటాష్ ఎరువులను ఆఖరి దుక్కిలోనే వేయడం ఉత్తమం.\n• ఎకరానికి 100 కిలోల వేప పిండి వేస్తే నేలలో వేరుకుళ్లు మరియు నెమటోడ్లు తగ్గుతాయి.`;
      } else {
        reply = `నమస్కారం ${user.full_name} గారు! నేను మీ వృక్ష AI కిసాన్ మిత్ర సహాయకుడిని.\n\nమీరు అడిగిన విషయానికి సంబంధించి:\n1. మీ ${user.district} జిల్లా వాతావరణం మరియు నేల రకానికి (${user.soil_type}) అనుగుణంగా క్రమం తప్పకుండా నీటి తడులు ఇవ్వండి.\n2. ఆకులపై ఏవైనా మచ్చలు లేదా ముడుత కనిపిస్తే వెంటనే మన 'AI క్రాప్ డాక్టర్' టూల్ ద్వారా ఫోటో తీసి నిర్ధారించుకోండి.\n3. తాజా మార్కెట్ యార్డ్ ధరల ఆధారంగా మాత్రమే పంటను అమ్మకానికి సిద్ధం చేయండి.\n\nఇంకేదైనా నిర్దిష్ట సమాచారం కావాలా?`;
      }
    } else {
      if (lower.includes('water') || lower.includes('irrigat')) {
        reply = `Namaste ${user.full_name}!\n\nRegarding irrigation for your ${user.soil_type}:\n• Provide light irrigations every 5-7 days during critical flowering and grain-filling stages.\n• Avoid standing water stagnation to prevent fungal root rot.\n• Drip irrigation is highly recommended for cotton and chilli to save 40% water and apply fertigation efficiently.`;
      } else if (lower.includes('fertilizer') || lower.includes('urea') || lower.includes('npk')) {
        reply = `Namaste ${user.full_name}!\n\nFertilizer advice for your crops (${user.saved_crops}):\n• Split Nitrogen (Urea) into 3 equal splits: Basal, Tillering/Vegetative, and Panicle initiation/Flowering.\n• Apply entire Phosphorus (DAP or SSP) and Potash as basal dressing during last ploughing.\n• Mix 100kg Neem cake per acre to improve nitrogen use efficiency and suppress soil nematodes.`;
      } else {
        reply = `Namaste ${user.full_name}! I am your VRUKSHA AI Kisan Mitra farming companion.\n\nKey recommendation for your farm in ${user.district}, ${user.state}:\n1. Monitor soil moisture in your ${user.soil_type} field before spraying.\n2. Keep an eye on APMC Mandi trends in ${user.district} for optimal selling timing.\n3. Use our AI Crop Doctor tool anytime to check suspicious symptoms or leaf discoloration.\n\nFeel free to ask about any specific crop, disease, or scheme!`;
      }
    }

    return res.json({ success: true, reply });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// VITE DEV SERVER / STATIC FILE SERVING
// ==========================================

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 VRUKSHA AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
