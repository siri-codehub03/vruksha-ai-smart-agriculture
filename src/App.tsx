import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { GpsWeatherModule } from './components/GpsWeatherModule';
import { SoilAnalysisModule } from './components/SoilAnalysisModule';
import { CropRecommendationModule } from './components/CropRecommendationModule';
import { CropGrowthTracker } from './components/CropGrowthTracker';
import { CropDoctorModule } from './components/CropDoctorModule';
import { MarketPricesModule } from './components/MarketPricesModule';
import { ProfitCalculatorModule } from './components/ProfitCalculatorModule';
import { KisanMitraChatbot } from './components/KisanMitraChatbot';
import { FarmerProfile } from './components/FarmerProfile';
import { Sprout } from 'lucide-react';

const MainApp: React.FC = () => {
  const { activePage, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071d15] flex flex-col items-center justify-center text-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-2xl border border-emerald-400/40 animate-pulse">
          <Sprout className="w-9 h-9 text-white" />
        </div>
        <div className="mt-4 text-center">
          <div className="text-lg font-bold text-white tracking-wide">VRUKSHA <span className="text-emerald-400">AI</span></div>
          <p className="text-xs text-emerald-300 font-mono mt-0.5">Initializing Smart Agriculture Platform...</p>
        </div>
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'forgot_password':
        return <ForgotPasswordPage />;
      case 'dashboard':
        return <FarmerDashboard />;
      case 'gps_weather':
        return <GpsWeatherModule />;
      case 'soil_analysis':
        return <SoilAnalysisModule />;
      case 'crop_recommendation':
        return <CropRecommendationModule />;
      case 'crop_growth':
        return <CropGrowthTracker />;
      case 'crop_doctor':
        return <CropDoctorModule />;
      case 'market_prices':
        return <MarketPricesModule />;
      case 'profit_calculator':
        return <ProfitCalculatorModule />;
      case 'ai_chatbot':
        return <KisanMitraChatbot />;
      case 'profile':
        return <FarmerProfile />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071d15] text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
