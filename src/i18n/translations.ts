import { Language } from '../types';

export const translations = {
  en: {
    // Brand
    brandName: 'VRUKSHA AI',
    brandTagline: 'RIGHT CROP. RIGHT SOIL. RIGHT TIME. BETTER PROFIT.',
    brandSubtagline: 'Intelligent Smart Agriculture Ecosystem for Indian Farmers',

    // Nav & Common
    navHome: 'Home',
    navDashboard: 'Dashboard',
    navWeather: 'Weather & GPS',
    navSoil: 'Soil Analysis',
    navCropRec: 'Crop Recommendation',
    navGrowthTracker: 'Crop Growth',
    navCropDoctor: 'AI Crop Doctor',
    navMandi: 'Mandi Prices',
    navCalculator: 'Profit Calculator',
    navChatbot: 'Kisan Mitra AI',
    navProfile: 'Farmer Profile',
    btnLogin: 'Login',
    btnRegister: 'Register',
    btnLogout: 'Logout',
    btnGetStarted: 'Get Started',
    btnSave: 'Save Changes',
    btnCancel: 'Cancel',
    loading: 'Loading...',
    backToHome: 'Back to Home',
    languageToggle: 'తెలుగు',

    // Landing Page
    landingHeroTitle: 'Empowering Indian Annadata with Smart Artificial Intelligence',
    landingHeroDesc: 'VRUKSHA AI turns soil data, satellite weather, APMC Mandi trends, and agronomy intelligence into actionable advice for higher yields and maximum farm profits.',
    landingBadge: '🌾 Empowering 50,000+ Farmers Across Andhra Pradesh, Telangana & Pan-India',
    landingQuickDemo: 'Try Demo Farmer Account',
    featureWeatherTitle: 'Hyperlocal Micro-Weather',
    featureWeatherDesc: 'Live GPS-driven rainfall probability, humidity, and optimal chemical spraying windows.',
    featureSoilTitle: 'Precision Soil Health',
    featureSoilDesc: 'Real-time NPK ratio balancing, organic carbon, and customized fertilizer prescriptions.',
    featureDoctorTitle: 'AI Crop Doctor',
    featureDoctorDesc: 'Instant plant disease detection with organic neem remedies & approved treatments.',
    featureMandiTitle: 'Live APMC Mandi Rates',
    featureMandiDesc: 'Daily modal prices across Guntur, Warangal, Kurnool, and major agricultural markets.',
    farmerTestimonial: '"VRUKSHA AI helped me pick the right seed variety and saved my chilli crop from leaf curl thrips, increasing my profit by ₹45,000 per acre!"',
    farmerTestimonialAuthor: '— Venkata Rao, Chilli & Cotton Farmer, Guntur District',

    // Auth - Login
    loginTitle: 'Farmer Login',
    loginSubtitle: 'Enter your credentials to access your smart farming dashboard',
    loginIdentifierLabel: 'Mobile Number or Email',
    loginIdentifierPlaceholder: 'e.g. 9876543210 or farmer@example.com',
    loginPasswordLabel: 'Password',
    loginPasswordPlaceholder: 'Enter your secure password',
    loginRememberMe: 'Remember Me',
    loginForgotPassword: 'Forgot Password?',
    loginSubmitBtn: 'Secure Login',
    loginNoAccount: "Don't have an account?",
    loginRegisterNow: 'Register Now',
    loginDemoFillBtn: 'Auto-fill Demo Farmer (Ramesh Reddy)',

    // Auth - Register
    registerTitle: 'Farmer Registration',
    registerSubtitle: 'Join VRUKSHA AI to receive precision crop advisories and market rates',
    regFullName: 'Full Name (రైతు పేరు)',
    regFullNamePlaceholder: 'e.g. Ramesh Reddy',
    regMobile: 'Mobile Number (10 Digits)',
    regMobilePlaceholder: 'e.g. 9876543210',
    regEmail: 'Email Address',
    regEmailPlaceholder: 'e.g. farmer@gmail.com',
    regPassword: 'Create Password',
    regConfirmPassword: 'Confirm Password',
    regState: 'State',
    regDistrict: 'District',
    regVillage: 'Village / Mandal',
    regVillagePlaceholder: 'e.g. Tenali / Jagial',
    regLanguage: 'Preferred Language',
    regTermsAccept: 'I accept the Terms and Conditions of agricultural advisories',
    regSubmitBtn: 'Create Farmer Account',
    regAlreadyHaveAccount: 'Already have an account?',
    regLoginLink: 'Login Here',

    // Auth - Password Strength
    pwdWeak: 'Weak',
    pwdFair: 'Fair',
    pwdGood: 'Good',
    pwdStrong: 'Strong',
    pwdHint: 'Use 8+ characters with uppercase, numbers and symbols',

    // Auth - Forgot Password
    forgotTitle: 'Recover Farmer Account',
    forgotSubtitle: 'Enter your registered Mobile or Email to receive an OTP verification code',
    forgotIdentifierLabel: 'Registered Mobile or Email',
    forgotSendOtpBtn: 'Send 6-Digit OTP',
    forgotOtpLabel: 'Enter 6-Digit OTP Code',
    forgotNewPasswordLabel: 'New Password',
    forgotConfirmNewPasswordLabel: 'Confirm New Password',
    forgotResetBtn: 'Reset Password & Login',
    forgotBackToLogin: 'Return to Login',

    // Protected Route Message
    authRequiredNotice: 'Authentication Required. Please log in or register to access the VRUKSHA AI Farmer Dashboard.',

    // Dashboard Overview
    dashWelcome: 'Namaste',
    dashSubtitle: 'Here is your live smart farming snapshot for today',
    kpiActiveCrops: 'Active Crops',
    kpiFarmArea: 'Cultivated Land',
    kpiSoilHealth: 'Soil Health Score',
    kpiExpectedRevenue: 'Projected Net Profit',
    kpiWeatherStatus: 'Weather Condition',
    quickAdvisoriesTitle: 'Today’s Agronomy Advisories & Alerts',
    myCropsTitle: 'My Registered Crops',
    addCropBtn: 'Register New Crop',

    // GPS & Weather
    weatherHeader: 'GPS Field Weather & Spraying Advisory',
    weatherTemp: 'Temperature',
    weatherHumidity: 'Humidity',
    weatherWind: 'Wind Speed',
    weatherRainChance: 'Rainfall Probability',
    weatherSprayAlert: 'Farming Advisory',
    weatherUseGps: 'Detect GPS Location',

    // Soil Analysis
    soilHeader: 'Soil Health & Fertility Card',
    soilScore: 'Soil Health Score',
    soilNitrogen: 'Available Nitrogen (N)',
    soilPhosphorus: 'Phosphorus (P2O5)',
    soilPotassium: 'Potassium (K2O)',
    soilPh: 'Soil pH Level',
    soilOrganicCarbon: 'Organic Carbon (OC)',
    soilMoisture: 'Soil Moisture Level',
    soilDosageRecommendation: 'Fertilizer & Amendment Prescriptions',

    // Crop Recommendation
    cropRecHeader: 'Intelligent Crop Recommendation Engine',
    cropRecSubtitle: 'Machine-learning powered crop selection tailored to your soil, season, and market viability',
    filterSoilType: 'Soil Type',
    filterSeason: 'Current Season',
    filterWater: 'Irrigation Availability',
    btnAnalyzeCrops: 'Find Best Crops',
    suitabilityScore: 'Suitability Score',
    expectedYield: 'Expected Yield',
    profitEstimate: 'Est. Net Profit',

    // Crop Growth Tracker
    trackerHeader: 'Crop Growth & Phenology Tracker',
    trackerSubtitle: 'Monitor growth milestones from sowing to harvesting with stage-wise water & nutrient schedules',

    // AI Crop Doctor
    doctorHeader: 'AI Crop Doctor – Disease & Pest Diagnostic',
    doctorSubtitle: 'Instant symptom identification, organic remedies, and approved chemical solutions',
    doctorUploadPrompt: 'Select crop and describe symptoms or upload leaf picture',
    selectCropLabel: 'Select Crop',
    describeSymptomsLabel: 'Observed Leaf / Stem Symptoms',
    btnDiagnose: 'Diagnose with AI Crop Doctor',

    // Mandi Rates
    mandiHeader: 'Live APMC Mandi Market Prices',
    mandiSubtitle: 'Daily official arrivals and modal prices across agricultural market committees',
    searchMarket: 'Search commodity, district or market...',
    modalPrice: 'Modal Price',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',

    // Profit Calculator
    calcHeader: 'Crop Cultivation & Profitability Calculator',
    calcSubtitle: 'Forecast total investment, gross revenue, net farm income, and ROI per acre',
    calcLandAcres: 'Farm Land Area (Acres)',
    calcSeedCost: 'Seed / Sapling Cost (₹/Acre)',
    calcFertCost: 'Fertilizers & Pesticides (₹/Acre)',
    calcLaborCost: 'Labor & Weeding (₹/Acre)',
    calcMachineCost: 'Tractor / Machinery / Fuel (₹/Acre)',
    calcIrrigCost: 'Irrigation & Electricity (₹/Acre)',
    calcYield: 'Expected Yield (Quintals/Acre)',
    calcPrice: 'Expected Selling Price (₹/Quintal)',
    calcTotalInvest: 'Total Cultivation Cost',
    calcGrossIncome: 'Gross Market Revenue',
    calcNetProfit: 'Net Farmer Profit',
    calcProfitPerAcre: 'Net Profit Per Acre',
    calcRoi: 'Return on Investment (ROI)',

    // Chatbot
    chatHeader: 'Kisan Mitra AI – 24/7 Farming Assistant',
    chatSubtitle: 'Ask anything about crop protection, fertilizer schedules, government schemes, and market timing',
    chatPlaceholder: 'Type your farming question in English or Telugu...',
    btnSend: 'Ask Kisan Mitra',

    // Profile
    profileHeader: 'Farmer Profile & Field Configuration',
    profileSubtitle: 'Manage your personal details, land records, and language preference',
  },

  te: {
    // Brand
    brandName: 'వృక్ష AI',
    brandTagline: 'సరైన పంట. సరైన నేల. సరైన సమయం. అధిక లాభం.',
    brandSubtagline: 'భారతీయ రైతుల కోసం స్మార్ట్ ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ వ్యవసాయ వేదిక',

    // Nav & Common
    navHome: 'హోమ్',
    navDashboard: 'రైతు డ్యాష్‌బోర్డ్',
    navWeather: 'వాతావరణం & GPS',
    navSoil: 'మట్టి పరీక్ష',
    navCropRec: 'పంట సిఫార్సు',
    navGrowthTracker: 'ఎదుగుదల ట్రాకర్',
    navCropDoctor: 'AI పంట డాక్టర్',
    navMandi: 'మార్కెట్ ధరలు',
    navCalculator: 'ఆదాయ కాలిక్యులేటర్',
    navChatbot: 'కిసాన్ మిత్ర AI',
    navProfile: 'రైతు ప్రొఫైల్',
    btnLogin: 'లాగిన్',
    btnRegister: 'రిజిస్ట్రేషన్',
    btnLogout: 'లాగౌట్',
    btnGetStarted: 'ప్రారంభించండి',
    btnSave: 'మార్పులను సేవ్ చేయండి',
    btnCancel: 'రద్దు చేయండి',
    loading: 'వేచి ఉండండి...',
    backToHome: 'హోమ్‌కు తిరిగి వెళ్లండి',
    languageToggle: 'English',

    // Landing Page
    landingHeroTitle: 'రైతన్న సాధికారత కోసం స్మార్ట్ ఆర్టిఫిషియల్ ఇంటెలిజెన్స్',
    landingHeroDesc: 'మట్టి సారం, ఉపగ్రహ వాతావరణం, APMC మార్కెట్ ధరలు మరియు వ్యవసాయ సాంకేతికతతో అధిక దిగుబడులు మరియు గరిష్ట లాభాలను పొందండి.',
    landingBadge: '🌾 ఆంధ్రప్రదేశ్, తెలంగాణ మరియు దేశవ్యాప్తంగా 50,000+ రైతుల నమ్మకం',
    landingQuickDemo: 'డెమో రైతు ఖాతాను ప్రయత్నించండి',
    featureWeatherTitle: 'ఖచ్చితమైన వాతావరణం',
    featureWeatherDesc: 'వర్షపాతం అవకాశం, తేమ శాతం మరియు మందుల పిచికారీకి అనుకూల సమయ సమాచారం.',
    featureSoilTitle: 'సమగ్ర మట్టి విశ్లేషణ',
    featureSoilDesc: 'NPK పోషకాల నిష్పత్తి, సేంద్రీయ కర్బనం మరియు సమతుల్య ఎరువుల సిఫార్సులు.',
    featureDoctorTitle: 'AI పంట డాక్టర్',
    featureDoctorDesc: 'ఆకుల ఫోటో లేదా లక్షణాలతో తెగుళ్లు, చీడపీడల గుర్తింపు మరియు సేంద్రీయ నివారణ చర్యలు.',
    featureMandiTitle: 'లైవ్ మార్కెట్ యార్డ్ ధరలు',
    featureMandiDesc: 'గుంటూరు, వరంగల్, ఖమ్మం తదితర మార్కెట్ యార్డుల తాజా క్వింటాల్ ధరలు.',
    farmerTestimonial: '"వృక్ష AI సిఫార్సుతో మిర్చిలో తామర పురుగుల నివారణ చేసి ఎకరానికి రూ. 45,000 అదనపు లాభం పొందాను!"',
    farmerTestimonialAuthor: '— వెంకటరావు, మిర్చి & పత్తి రైతు, గుంటూరు జిల్లా',

    // Auth - Login
    loginTitle: 'రైతు లాగిన్',
    loginSubtitle: 'మీ స్మార్ట్ వ్యవసాయ డ్యాష్‌బోర్డ్‌ను పొందడానికి లాగిన్ అవ్వండి',
    loginIdentifierLabel: 'మొబైల్ నంబర్ లేదా ఈమెయిల్',
    loginIdentifierPlaceholder: 'ఉదా: 9876543210 లేదా email@example.com',
    loginPasswordLabel: 'పాస్‌వర్డ్',
    loginPasswordPlaceholder: 'మీ రహస్య పాస్‌వర్డ్ నమోదు చేయండి',
    loginRememberMe: 'నన్ను గుర్తుంచుకో',
    loginForgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    loginSubmitBtn: 'సురక్షిత లాగిన్',
    loginNoAccount: 'ఖాతా లేదా?',
    loginRegisterNow: 'ఇప్పుడే రిజిస్టర్ చేసుకోండి',
    loginDemoFillBtn: 'డెమో రైతు వివరాలు నింపండి (రమేష్ రెడ్డి)',

    // Auth - Register
    registerTitle: 'కొత్త రైతు రిజిస్ట్రేషన్',
    registerSubtitle: 'వ్యవసాయ సలహాలు, తెగుళ్ల నివారణ మరియు మార్కెట్ ధరల కోసం చేరండి',
    regFullName: 'పూర్తి పేరు (రైతు పేరు)',
    regFullNamePlaceholder: 'ఉదా: రమేష్ రెడ్డి',
    regMobile: 'మొబైల్ నంబర్ (10 అంకెలు)',
    regMobilePlaceholder: 'ఉదా: 9876543210',
    regEmail: 'ఈమెయిల్ చిరునామా',
    regEmailPlaceholder: 'ఉదా: farmer@gmail.com',
    regPassword: 'పాస్‌వర్డ్ సృష్టించండి',
    regConfirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    regState: 'రాష్ట్రం',
    regDistrict: 'జిల్లా',
    regVillage: 'గ్రామం / మండలం',
    regVillagePlaceholder: 'ఉదా: తెనాలి / జగ్గయ్యపేట',
    regLanguage: 'ప్రాధాన్య భాష',
    regTermsAccept: 'వ్యవసాయ సలహా నియమ నిబంధనలకు అంగీకరిస్తున్నాను',
    regSubmitBtn: 'రైతు ఖాతాను సృష్టించండి',
    regAlreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    regLoginLink: 'ఇక్కడ లాగిన్ అవ్వండి',

    // Auth - Password Strength
    pwdWeak: 'బలహీనం',
    pwdFair: 'సాధారణం',
    pwdGood: 'మంచిది',
    pwdStrong: 'చాలా బలంగా ఉంది',
    pwdHint: 'కనీసం 8 అక్షరాలు, పెద్ద అక్షరాలు, అంకెలు మరియు ప్రత్యేక గుర్తులు ఉపయోగించండి',

    // Auth - Forgot Password
    forgotTitle: 'పాస్‌వర్డ్ రికవరీ',
    forgotSubtitle: 'OTP కోడ్ పొందడానికి మీ రిజిస్టర్డ్ మొబైల్ లేదా ఈమెయిల్ నమోదు చేయండి',
    forgotIdentifierLabel: 'రిజిస్టర్డ్ మొబైల్ లేదా ఈమెయిల్',
    forgotSendOtpBtn: '6-అంకెల OTP పంపండి',
    forgotOtpLabel: '6-అంకెల OTP కోడ్ నమోదు చేయండి',
    forgotNewPasswordLabel: 'కొత్త పాస్‌వర్డ్',
    forgotConfirmNewPasswordLabel: 'కొత్త పాస్‌వర్డ్ నిర్ధారించండి',
    forgotResetBtn: 'పాస్‌వర్డ్ మార్చి లాగిన్ అవ్వండి',
    forgotBackToLogin: 'లాగిన్‌కు తిరిగి వెళ్ళండి',

    // Protected Route Message
    authRequiredNotice: 'రైతు డ్యాష్‌బోర్డ్ చూడటానికి దయచేసి లాగిన్ అవ్వండి లేదా రిజిస్టర్ చేసుకోండి.',

    // Dashboard Overview
    dashWelcome: 'నమస్కారం',
    dashSubtitle: 'నేటి మీ వ్యవసాయ క్షేత్ర సమాచారం మరియు సూచనలు',
    kpiActiveCrops: 'సాగులో ఉన్న పంటలు',
    kpiFarmArea: 'వ్యవసాయ భూమి వైశాల్యం',
    kpiSoilHealth: 'మట్టి ఆరోగ్య స్కోరు',
    kpiExpectedRevenue: 'అంచనా నికర లాభం',
    kpiWeatherStatus: 'నేటి వాతావరణం',
    quickAdvisoriesTitle: 'నేటి ముఖ్యమైన వ్యవసాయ సూచనలు',
    myCropsTitle: 'నా పంటల వివరాలు',
    addCropBtn: 'కొత్త పంట నమోదు',

    // GPS & Weather
    weatherHeader: 'GPS వ్యవసాయ వాతావరణం & పిచికారీ సూచనలు',
    weatherTemp: 'ఉష్ణోగ్రత',
    weatherHumidity: 'తేమ శాతం',
    weatherWind: 'గాలి వేగం',
    weatherRainChance: 'వర్షపాతం అవకాశం',
    weatherSprayAlert: 'రైతుకు సూచన',
    weatherUseGps: 'GPS లొకేషన్ గుర్తించండి',

    // Soil Analysis
    soilHeader: 'మట్టి ఆరోగ్య పరీక్ష కార్డు',
    soilScore: 'మట్టి ఆరోగ్య స్కోరు',
    soilNitrogen: 'నత్రజని (Nitrogen)',
    soilPhosphorus: 'భాస్వరం (Phosphorus)',
    soilPotassium: 'పొటాష్ (Potassium)',
    soilPh: 'మట్టి pH విలువ',
    soilOrganicCarbon: 'సేంద్రీయ కర్బనం (OC %)',
    soilMoisture: 'మట్టి తేమ శాతం',
    soilDosageRecommendation: 'ఎరువుల యాజమాన్యం మరియు సిఫార్సులు',

    // Crop Recommendation
    cropRecHeader: 'శాస్త్రీయ పంట సిఫార్సు విధానం',
    cropRecSubtitle: 'మీ నేల రకం, కాలం మరియు నీటి లభ్యతకు తగిన పంటల ఎంపిక',
    filterSoilType: 'నేల రకం',
    filterSeason: 'ప్రస్తుత కాలం',
    filterWater: 'నీటి సదుపాయం',
    btnAnalyzeCrops: 'ఉత్తమ పంటలను గుర్తించండి',
    suitabilityScore: 'అనుకూలత స్కోర్',
    expectedYield: 'అంచనా దిగుబడి',
    profitEstimate: 'ఎకరానికి నికర లాభం',

    // Crop Growth Tracker
    trackerHeader: 'పంట ఎదుగుదల దశల ట్రాకర్',
    trackerSubtitle: 'విత్తనం నాటినప్పటి నుండి కోత వరకు దశలవారీగా నీరు, ఎరువుల షెడ్యూల్',

    // AI Crop Doctor
    doctorHeader: 'AI సస్యరక్షణ డాక్టర్ (తెగుళ్ల గుర్తింపు)',
    doctorSubtitle: 'లక్షణాల ఆధారంగా చీడపీడల నిర్ధారణ, సేంద్రీయ మరియు రసాయన మందుల సలహా',
    doctorUploadPrompt: 'పంటను ఎంచుకుని లక్షణాలు వివరించండి లేదా ఆకు ఫోటో అప్‌లోడ్ చేయండి',
    selectCropLabel: 'పంటను ఎంచుకోండి',
    describeSymptomsLabel: 'ఆకులు/కాండంపై గమనించిన లక్షణాలు',
    btnDiagnose: 'AI డాక్టర్‌తో తనిఖీ చేయండి',

    // Mandi Rates
    mandiHeader: 'తాజా మార్కెట్ యార్డ్ ధరలు (APMC Mandi)',
    mandiSubtitle: 'ప్రధాన మార్కెట్లలో వ్యవసాయ ఉత్పత్తుల కనీస, గరిష్ట మరియు సగటు మోడల్ ధరలు',
    searchMarket: 'పంట, జిల్లా లేదా మార్కెట్ యార్డ్ వెతకండి...',
    modalPrice: 'మోడల్ ధర',
    minPrice: 'కనీస ధర',
    maxPrice: 'గరిష్ట ధర',

    // Profit Calculator
    calcHeader: 'పంట సాగు వ్యయం & లాభాల కాలిక్యులేటర్',
    calcSubtitle: 'పెట్టుబడి ఖర్చులు, దిగుబడి ఆదాయం మరియు ఎకరానికి నికర లాభం లెక్కించండి',
    calcLandAcres: 'సాగు భూమి వైశాల్యం (ఎకరాలు)',
    calcSeedCost: 'విత్తనాల ఖర్చు (ఎకరానికి ₹)',
    calcFertCost: 'ఎరువులు & పురుగుమందులు (ఎకరానికి ₹)',
    calcLaborCost: 'కూలి & కలుపు ఖర్చులు (ఎకరానికి ₹)',
    calcMachineCost: 'ట్రాక్టర్ / యంత్రాల అద్దె (ఎకరానికి ₹)',
    calcIrrigCost: 'నీటిపారుదల & కరెంట్ ఖర్చు (ఎకరానికి ₹)',
    calcYield: 'అంచనా దిగుబడి (క్వింటాళ్ళు/ఎకరా)',
    calcPrice: 'అంచనా విక్రయ ధర (రూ. / క్వింటాల్)',
    calcTotalInvest: 'మొత్తం సాగు పెట్టుబడి',
    calcGrossIncome: 'మొత్తం రాబడి',
    calcNetProfit: 'నికర రైతు లాభం',
    calcProfitPerAcre: 'ఎకరానికి నికర లాభం',
    calcRoi: 'పెట్టుబడిపై లాభ శాతం (ROI)',

    // Chatbot
    chatHeader: 'కిసాన్ మిత్ర AI – 24/7 వ్యవసాయ సహాయకుడు',
    chatSubtitle: 'ఎరువుల మోతాదు, తెగుళ్లు, ప్రభుత్వ పథకాలు లేదా మార్కెట్ విషయాలపై ఏదైనా అడగండి',
    chatPlaceholder: 'మీ వ్యవసాయ ప్రశ్నను తెలుగు లేదా ఇంగ్లీషులో టైప్ చేయండి...',
    btnSend: 'ప్రశ్నించండి',

    // Profile
    profileHeader: 'రైతు ప్రొఫైల్ & వివరాల నిర్వహణ',
    profileSubtitle: 'మీ వ్యక్తిగత వివరాలు, వ్యవసాయ భూమి వివరాలు మరియు ప్రాధాన్య భాషను మార్చుకోండి',
  }
};
