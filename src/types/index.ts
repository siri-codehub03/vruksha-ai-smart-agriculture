export type Language = 'en' | 'te';

export interface User {
  id: number;
  full_name: string;
  mobile: string;
  email: string;
  state: string;
  district: string;
  village: string;
  preferred_language: Language;
  farm_size_acres: number;
  soil_type: string;
  saved_crops: string;
  profile_photo?: string;
  created_at: string;
  updated_at: string;
}

export type ActivePage = 
  | 'landing'
  | 'login'
  | 'register'
  | 'forgot_password'
  | 'dashboard'
  | 'gps_weather'
  | 'soil_analysis'
  | 'crop_recommendation'
  | 'crop_growth'
  | 'crop_doctor'
  | 'market_prices'
  | 'profit_calculator'
  | 'ai_chatbot'
  | 'profile';

export interface WeatherData {
  city: string;
  state: string;
  temperature: number;
  feels_like: number;
  condition: string;
  condition_te: string;
  humidity: number;
  wind_speed_kmh: number;
  rain_probability: number;
  uv_index: number;
  soil_moisture_estimate: number;
  spray_advisory: string;
  spray_advisory_te: string;
  forecast: {
    day: string;
    day_te: string;
    temp_max: number;
    temp_min: number;
    condition: string;
    rain_chance: number;
  }[];
}

export interface MandiRate {
  id: string;
  commodity: string;
  commodity_te: string;
  variety: string;
  market_name: string;
  district: string;
  state: string;
  arrival_date: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  unit: string;
  change_percent: number;
}

export interface CropRecommendation {
  id: string;
  crop_name: string;
  crop_name_te: string;
  suitability_score: number;
  ideal_soil: string;
  ideal_soil_te: string;
  duration_days: string;
  water_requirement: 'Low' | 'Medium' | 'High';
  water_requirement_te: string;
  expected_yield: string;
  expected_profit_per_acre: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'All Season';
  season_te: string;
  rationale: string;
  rationale_te: string;
}

export interface FarmerCrop {
  id: number;
  user_id: number;
  crop_name: string;
  variety: string;
  sowing_date: string;
  area_acres: number;
  stage: string;
  health_status: 'Excellent' | 'Healthy' | 'Moderate' | 'At Risk';
  expected_harvest_date?: string;
}

export interface SoilRecord {
  id: number;
  user_id: number;
  plot_name: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organic_carbon: number;
  moisture: number;
  tested_at: string;
  health_score: number;
}

export interface DiseaseDiagnosis {
  crop_name: string;
  crop_name_te: string;
  disease_name: string;
  disease_name_te: string;
  confidence: number;
  symptoms: string[];
  symptoms_te: string[];
  causes: string;
  causes_te: string;
  organic_treatment: string[];
  organic_treatment_te: string[];
  chemical_treatment: string[];
  chemical_treatment_te: string[];
  preventive_measures: string[];
  preventive_measures_te: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
