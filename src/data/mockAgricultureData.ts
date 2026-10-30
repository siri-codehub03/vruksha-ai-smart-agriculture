import { MandiRate, CropRecommendation, DiseaseDiagnosis, WeatherData } from '../types';

export const INDIAN_STATES_AND_DISTRICTS: Record<string, string[]> = {
  'Andhra Pradesh': [
    'Guntur', 'Krishna', 'East Godavari', 'West Godavari', 'Kurnool',
    'Anantapur', 'Prakasam', 'Nellore', 'Chittoor', 'Kadapa', 'Visakhapatnam', 'Vizianagaram', 'Srikakulam'
  ],
  'Telangana': [
    'Warangal', 'Karimnagar', 'Khammam', 'Nizamabad', 'Nalgonda',
    'Mahabubnagar', 'Medak', 'Adilabad', 'Rangareddy', 'Suryapet', 'Jagtial', 'Siddipet'
  ],
  'Karnataka': [
    'Raichur', 'Belagavi', 'Ballari', 'Dharwad', 'Shivamogga', 'Mysuru', 'Tumakuru', 'Davangere'
  ],
  'Maharashtra': [
    'Nagpur', 'Amravati', 'Yavatmal', 'Nashik', 'Pune', 'Kolhapur', 'Solapur', 'Aurangabad'
  ],
  'Punjab': [
    'Ludhiana', 'Amritsar', 'Patiala', 'Bathinda', 'Jalandhar', 'Sangrur', 'Ferozepur'
  ],
  'Tamil Nadu': [
    'Thanjavur', 'Madurai', 'Coimbatore', 'Salem', 'Tiruchirappalli', 'Erode', 'Tirunelveli'
  ]
};

export const MOCK_MANDI_RATES: MandiRate[] = [
  {
    id: 'm-1',
    commodity: 'Red Chilli (Teja)',
    commodity_te: 'ఎండిన మిర్చి (తేజ)',
    variety: 'Teja S17 Grade A',
    market_name: 'Guntur Mirchi Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    arrival_date: 'Today',
    min_price: 18500,
    max_price: 23200,
    modal_price: 21400,
    unit: 'Quintal (100kg)',
    change_percent: 2.8,
  },
  {
    id: 'm-2',
    commodity: 'Paddy (Sona Masoori)',
    commodity_te: 'వరి (సోనా మసూరి)',
    variety: 'BPT 5204 Fine Grain',
    market_name: 'Miryalaguda AMC',
    district: 'Nalgonda',
    state: 'Telangana',
    arrival_date: 'Today',
    min_price: 2650,
    max_price: 2950,
    modal_price: 2840,
    unit: 'Quintal (100kg)',
    change_percent: 1.4,
  },
  {
    id: 'm-3',
    commodity: 'Cotton (Kapas)',
    commodity_te: 'పత్తి (కపాస్)',
    variety: 'Medium Long Staple',
    market_name: 'Warangal Enumamula Yard',
    district: 'Warangal',
    state: 'Telangana',
    arrival_date: 'Today',
    min_price: 7200,
    max_price: 7850,
    modal_price: 7600,
    unit: 'Quintal (100kg)',
    change_percent: -0.9,
  },
  {
    id: 'm-4',
    commodity: 'Turmeric (Finger)',
    commodity_te: 'పసుపు (కొమ్ము)',
    variety: 'Salem / Nizamabad Special',
    market_name: 'Nizamabad APMC',
    district: 'Nizamabad',
    state: 'Telangana',
    arrival_date: 'Today',
    min_price: 13500,
    max_price: 16800,
    modal_price: 15400,
    unit: 'Quintal (100kg)',
    change_percent: 4.2,
  },
  {
    id: 'm-5',
    commodity: 'Groundnut (Pod)',
    commodity_te: 'వేరుశనగ (కాయ)',
    variety: 'Kadiri 6 Bold',
    market_name: 'Kurnool AMC',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    arrival_date: 'Today',
    min_price: 6400,
    max_price: 7200,
    modal_price: 6950,
    unit: 'Quintal (100kg)',
    change_percent: 1.1,
  },
  {
    id: 'm-6',
    commodity: 'Maize (Corn)',
    commodity_te: 'మొక్కజొన్న',
    variety: 'Yellow Hybrid Feed Grade',
    market_name: 'Khammam APMC',
    district: 'Khammam',
    state: 'Telangana',
    arrival_date: 'Today',
    min_price: 2150,
    max_price: 2380,
    modal_price: 2290,
    unit: 'Quintal (100kg)',
    change_percent: 0.5,
  },
  {
    id: 'm-7',
    commodity: 'Bengal Gram (Chana)',
    commodity_te: 'శనగలు',
    variety: 'Desi Annigeri 1',
    market_name: 'Raichur APMC',
    district: 'Raichur',
    state: 'Karnataka',
    arrival_date: 'Today',
    min_price: 5800,
    max_price: 6450,
    modal_price: 6200,
    unit: 'Quintal (100kg)',
    change_percent: 1.8,
  },
  {
    id: 'm-8',
    commodity: 'Tomato',
    commodity_te: 'టమోటా',
    variety: 'Hybrid Hybrid 1057',
    market_name: 'Madanapalle AMC',
    district: 'Chittoor',
    state: 'Andhra Pradesh',
    arrival_date: 'Today',
    min_price: 1600,
    max_price: 2200,
    modal_price: 1950,
    unit: 'Quintal (100kg)',
    change_percent: -3.5,
  }
];

export const CROP_RECOMMENDATIONS_DATA: CropRecommendation[] = [
  {
    id: 'crop-1',
    crop_name: 'Teja Chilli (Red Pepper)',
    crop_name_te: 'తేజ మిరప (ఎర్ర మిర్చి)',
    suitability_score: 96,
    ideal_soil: 'Deep Black Cotton Soil or Well-drained Red Loam',
    ideal_soil_te: 'నల్లరేగడి లేదా సారవంతమైన ఎర్ర నేలలు',
    duration_days: '150 - 180 Days',
    water_requirement: 'Medium',
    water_requirement_te: 'మితమైన నీరు (డ్రిప్ పద్ధతి ఉత్తమం)',
    expected_yield: '25 - 30 Quintals / Acre (Dry)',
    expected_profit_per_acre: '₹1,20,000 - ₹1,80,000',
    season: 'Kharif',
    season_te: 'ఖరీఫ్ & రబీ',
    rationale: 'Excellent soil pH (6.8), high potash reserves, and strong Guntur export market demand.',
    rationale_te: 'మట్టి pH (6.8) అనుకూలం, పొటాష్ సమృద్ధిగా ఉంది మరియు గుంటూరు యార్డులో మంచి డిమాండ్ ఉంది.'
  },
  {
    id: 'crop-2',
    crop_name: 'Sona Masoori Paddy (Rice)',
    crop_name_te: 'సోనా మసూరి వరి (BPT 5204)',
    suitability_score: 92,
    ideal_soil: 'Clayey Loam with good water retention',
    ideal_soil_te: 'బంకమట్టి కలిసిన రేగడి నేలలు',
    duration_days: '135 - 145 Days',
    water_requirement: 'High',
    water_requirement_te: 'అధిక నీటి లభ్యత అవసరం',
    expected_yield: '32 - 38 Quintals / Acre',
    expected_profit_per_acre: '₹48,000 - ₹65,000',
    season: 'Kharif',
    season_te: 'ఖరీఫ్ (సార్వా)',
    rationale: 'High nitrogen response, canal irrigation compatibility, and stable MSP procurement.',
    rationale_te: 'నత్రజని గ్రహణ సామర్థ్యం, కాలువ నీటి సదుపాయం మరియు స్థిరమైన మద్దతు ధర లభిస్తుంది.'
  },
  {
    id: 'crop-3',
    crop_name: 'Bt Cotton (Long Staple)',
    crop_name_te: 'బిటి పత్తి (దీర్ఘ పోగు)',
    suitability_score: 89,
    ideal_soil: 'Deep Black Soil with good depth',
    ideal_soil_te: 'లోతైన నల్లరేగడి భూములు',
    duration_days: '160 - 175 Days',
    water_requirement: 'Medium',
    water_requirement_te: 'మితమైన వర్షాధార లేదా ఆరుతడి',
    expected_yield: '12 - 16 Quintals / Acre',
    expected_profit_per_acre: '₹55,000 - ₹75,000',
    season: 'Kharif',
    season_te: 'ఖరీఫ్ వర్షాకాలం',
    rationale: 'Optimal soil moisture retention, high organic matter, and Warangal textile cluster proximity.',
    rationale_te: 'నేలలో తేమ నిల్వ సామర్థ్యం బాగుంది, వరంగల్ మిల్లుల వద్ద మంచి గిరాకీ ఉంది.'
  },
  {
    id: 'crop-4',
    crop_name: 'Hybrid Yellow Maize',
    crop_name_te: 'హైబ్రిడ్ పసుపు మొక్కజొన్న',
    suitability_score: 85,
    ideal_soil: 'Well-drained Sandy Loam or Red Soil',
    ideal_soil_te: 'మురుగునీటి సౌకర్యం గల ఎర్ర నేలలు',
    duration_days: '95 - 105 Days',
    water_requirement: 'Medium',
    water_requirement_te: 'తక్కువ నీటితో స్వల్పకాలిక సాగు',
    expected_yield: '35 - 40 Quintals / Acre',
    expected_profit_per_acre: '₹40,000 - ₹52,000',
    season: 'Rabi',
    season_te: 'రబీ & ఖరీఫ్',
    rationale: 'Short duration, low pest risk, excellent for rotation with legumes to restore nitrogen.',
    rationale_te: 'తక్కువ కాలపరిమితి, తక్కువ తెగుళ్ల బెడద, పంట మార్పిడికి అత్యుత్తమమైనది.'
  },
  {
    id: 'crop-5',
    crop_name: 'Groundnut (Peanut)',
    crop_name_te: 'వేరుశనగ (కదిరి 6)',
    suitability_score: 84,
    ideal_soil: 'Light Red Sandy Loam',
    ideal_soil_te: 'తేలికపాటి ఇసుకతో కూడిన ఎర్ర నేలలు',
    duration_days: '105 - 115 Days',
    water_requirement: 'Low',
    water_requirement_te: 'తక్కువ నీటి అవసరం (ఆరుతడి)',
    expected_yield: '10 - 14 Quintals / Acre',
    expected_profit_per_acre: '₹38,000 - ₹50,000',
    season: 'Rabi',
    season_te: 'రబీ కాలం',
    rationale: 'Fixes atmospheric nitrogen into soil, drought tolerant, high oil mill demand.',
    rationale_te: 'గాలిలోని నత్రజనిని నేలలో స్థిరీకరిస్తుంది, బెట్టను తట్టుకుంటుంది.'
  }
];

export const CROP_DISEASES_DB: DiseaseDiagnosis[] = [
  {
    crop_name: 'Chilli / Mirchi',
    crop_name_te: 'మిరప (మిర్చి)',
    disease_name: 'Chilli Leaf Curl Virus (Gemini Virus transmitted by Whiteflies)',
    disease_name_te: 'మిర్చి బొబ్బర తెగులు (ఆకు ముడుత - తెల్లదోమ ద్వారా వ్యాప్తి)',
    confidence: 96,
    symptoms: [
      'Upward curling and crinkling of young leaves',
      'Thickened leaf veins and stunted plant growth',
      'Shortened internodes giving a bushy appearance',
      'Severe flower drop and small deformed pods'
    ],
    symptoms_te: [
      'పైకి ముడుచుకుపోయే లేత ఆకులు మరియు ఈనెల వాపు',
      'మొక్క ఎదుగుదల ఆగిపోయి గుబురుగా మారడం',
      'పూత రాలిపోవడం మరియు పిందెలు వంకరతిరగడం',
      'ఆకులు దళసరిగా, పెళుసుగా మారడం'
    ],
    causes: 'Vector transmission by Whitefly (Bemisia tabaci) and Thrips during hot, dry weather spells.',
    causes_te: 'వేడి వాతావరణంలో తెల్లదోమ మరియు తామర పురుగుల ఉధృతి వల్ల ఈ వైరస్ వేగంగా వ్యాపిస్తుంది.',
    organic_treatment: [
      'Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil @ 5ml/liter with soap solution',
      'Install 20 yellow and blue sticky traps per acre to trap whiteflies and thrips',
      'Spray Agniastra or Dashaparni Kashayam twice a week'
    ],
    organic_treatment_te: [
      'ఎకరాకు 20 పసుపు, నీలి రంగు జిగురు అట్టలను అమర్చండి',
      'వేపనూనె (10,000 PPM) 5 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయండి',
      'అగ్నిఅస్త్రం లేదా దశపర్ణి కషాయం వారానికి ఒకసారి పిచికారీ చేయండి'
    ],
    chemical_treatment: [
      'Diafenthiuron 50% WP @ 1.25g per liter of water',
      'Or Acetamiprid 20% SP @ 0.2g per liter',
      'Or Spinetoram 11.7% SC @ 1ml per liter for resistant thrips'
    ],
    chemical_treatment_te: [
      'డయాఫెంథియురాన్ 50% WP లీటరు నీటికి 1.25 గ్రాములు కలిపి పిచికారీ చేయండి',
      'లేదా ఎసిటామైప్రిడ్ 20% SP లీటరుకు 0.2 గ్రాములు',
      'తామర పురుగుల నివారణకు స్పైనెటోరామ్ 11.7% SC లీటరుకు 1 మి.లీ'
    ],
    preventive_measures: [
      'Grow 2-3 rows of maize or sorghum as border crops to prevent vector entry',
      'Remove and destroy infected virus plants immediately',
      'Avoid excess nitrogenous fertilizers which attract sucking pests'
    ],
    preventive_measures_te: [
      'చేను చుట్టూ 2-3 వరుసల జొన్న లేదా మొక్కజొన్నను సరిహద్దు పంటగా వేయండి',
      'వైరస్ సోకిన మొక్కలను పీకి నాశనం చేయండి',
      'యూరియా ఎరువును మోతాదుకు మించి వాడకండి'
    ]
  },
  {
    crop_name: 'Paddy / Rice',
    crop_name_te: 'వరి (వరి పైరు)',
    disease_name: 'Paddy Blast (Magnaporthe oryzae)',
    disease_name_te: 'వరి అగ్గితెగులు (బ్లాస్ట్)',
    confidence: 94,
    symptoms: [
      'Spindle-shaped elliptical lesions with brown borders and grey centers',
      'Neck rot causing empty, chaffy panicles that droop',
      'Node blackening causing tillers to snap under wind'
    ],
    symptoms_te: [
      'ఆకులపై కంటి లేదా నూలు కండె ఆకారపు మచ్చలు (మధ్యలో బూడిద, అంచున గోధుమ రంగు)',
      'కంకి మెడ విరిగిపోయి తాలు గింజలుగా మారడం (మెడ విరుపు)',
      'కణుపులు నల్లగా మారి మొక్కలు విరిగిపడటం'
    ],
    causes: 'High atmospheric humidity (>90%), cool nights (20-22°C), and excessive nitrogen application.',
    causes_te: 'అధిక తేమ, చల్లని రాత్రులు మరియు విపరీతంగా యూరియా చల్లడం వల్ల ఫంగస్ వృద్ధి చెందుతుంది.',
    organic_treatment: [
      'Spray Pseudomonas fluorescens @ 10g or 5ml per liter of water',
      'Apply Trichoderma viride enriched farmyard manure to the soil',
      'Spray Cow urine and Hing (Asafoetida) concoction'
    ],
    organic_treatment_te: [
      'సూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రాములు లీటరు నీటికి కలిపి ఆకులపై పిచికారీ చేయండి',
      'ట్రైకోడెర్మా విరిడే కలిపిన పశువుల ఎరువును భూమిలో వేయండి'
    ],
    chemical_treatment: [
      'Tricyclazole 75% WP @ 0.6g per liter of water (most effective systemic fungicide)',
      'Or Kasugamycin 3% SL @ 2.5ml per liter',
      'Or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml per liter'
    ],
    chemical_treatment_te: [
      'ట్రైసైక్లాజోల్ 75% WP లీటరు నీటికి 0.6 గ్రాములు కలిపి తక్షణమే పిచికారీ చేయండి',
      'లేదా కసుగామైసిన్ 3% SL లీటరుకు 2.5 మి.లీ',
      'లేదా అజాక్సిస్ట్రోబిన్ + డైఫెనోకొనజోల్ 1 మి.లీ'
    ],
    preventive_measures: [
      'Seed treatment with Carbendazim @ 2g/kg seed before nursery sowing',
      'Split nitrogen application into 3-4 doses rather than single heavy broadcast',
      'Ensure proper drainage during cloudy and high humidity periods'
    ],
    preventive_measures_te: [
      'విత్తన శుద్ధి తప్పనిసరిగా కార్బండజిమ్ 2 గ్రా. కిలో విత్తనానికి పట్టించాలి',
      'యూరియాను ఒకేసారి వేయకుండా 3-4 దఫాలుగా వేయాలి',
      'నీటిని పొలంలో నిల్వ ఉండకుండా చూసుకోవాలి'
    ]
  },
  {
    crop_name: 'Cotton',
    crop_name_te: 'పత్తి (కాటన్)',
    disease_name: 'Pink Bollworm (Pectinophora gossypiella)',
    disease_name_te: 'పత్తిలో గులాబీ రంగు కాయ తొలుచు పురుగు',
    confidence: 93,
    symptoms: [
      'Rosette flowers where petals twist and do not open normally',
      'Small exit holes plugged with frass on young bolls',
      'Stained discolored lint and damaged seeds inside green bolls'
    ],
    symptoms_te: [
      'గులాబీ పువ్వులా ముడుచుకుపోయే వికసించని పూలు (రోసెట్ ఫ్లవర్స్)',
      'లేత కాయలపై చిన్న రంధ్రాలు మరియు విసర్జితాలు',
      'కాయ లోపలి గింజలు తినేయడం మరియు దూది రంగు మారడం'
    ],
    causes: 'Continuous cotton cropping without off-season break and improper disposal of cotton stalks.',
    causes_te: 'పంట మార్పిడి లేకపోవడం మరియు మునుపటి పంట మోళ్లను నాశనం చేయకపోవడం.',
    organic_treatment: [
      'Install 8 to 10 Pheromone Traps (PBR) per acre with gossyplure lures',
      'Release Trichogramma bactrae egg parasitoids @ 60,000 per acre weekly',
      'Spray Beauveria bassiana @ 5g/liter during early squaring stage'
    ],
    organic_treatment_te: [
      'ఎకరాకు 8 నుండి 10 లింగాకర్షక బుట్టలను అమర్చి పురుగుల ఉనికిని గమనించండి',
      'ట్రైకోగ్రామా పరాన్నజీవులను ఎకరాకు 60,000 చొప్పున విడుదల చేయండి',
      'బవేరియా బాసియానా 5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి'
    ],
    chemical_treatment: [
      'Profenofos 50% EC @ 2ml per liter of water',
      'Or Emamectin Benzoate 5% SG @ 0.5g per liter',
      'Or Chlorantraniliprole 18.5% SC @ 0.3ml per liter'
    ],
    chemical_treatment_te: [
      'ప్రొఫెనోఫాస్ 50% EC లీటరుకు 2 మి.లీ కలిపి పిచికారీ చేయండి',
      'లేదా ఇమామెక్టిన్ బెంజోయేట్ 5% SG లీటరుకు 0.5 గ్రాములు',
      'లేదా కోరాజెన్ 0.3 మి.లీ'
    ],
    preventive_measures: [
      'Terminate crop by December to break the pest diapause cycle',
      'Avoid deep summer ratoon cotton',
      'Destroy crop residue after final picking'
    ],
    preventive_measures_te: [
      'డిసెంబర్ ఆఖరుకల్లా పంటను పూర్తి చేసి మోళ్లను పీకేయండి',
      'పత్తిలో మోక పంటను (రేటూన్) అనుమతించకండి'
    ]
  }
];

export const DEFAULT_WEATHER_DATA: WeatherData = {
  city: 'Guntur District',
  state: 'Andhra Pradesh',
  temperature: 31,
  feels_like: 34,
  condition: 'Partly Sunny with Agronomic Breeze',
  condition_te: 'పాక్షికంగా ఎండ మరియు వ్యవసాయ అనుకూల గాలి',
  humidity: 68,
  wind_speed_kmh: 12,
  rain_probability: 20,
  uv_index: 7,
  soil_moisture_estimate: 36,
  spray_advisory: 'Optimal spraying window today between 4:00 PM and 6:30 PM. Rain risk is minimal.',
  spray_advisory_te: 'ఈరోజు సాయంత్రం 4:00 నుండి 6:30 వరకు మందుల పిచికారీకి అనుకూలం. వర్షం ముప్పు తక్కువగా ఉంది.',
  forecast: [
    { day: 'Today', day_te: 'ఈరోజు', temp_max: 33, temp_min: 24, condition: 'Partly Sunny', rain_chance: 20 },
    { day: 'Tomorrow', day_te: 'రేపు', temp_max: 32, temp_min: 23, condition: 'Sunny & Clear', rain_chance: 15 },
    { day: 'Day 3', day_te: '3వ రోజు', temp_max: 30, temp_min: 24, condition: 'Scattered Clouds', rain_chance: 35 },
    { day: 'Day 4', day_te: '4వ రోజు', temp_max: 29, temp_min: 22, condition: 'Light Showers', rain_chance: 60 },
    { day: 'Day 5', day_te: '5వ రోజు', temp_max: 31, temp_min: 23, condition: 'Clearing Up', rain_chance: 25 },
  ]
};
