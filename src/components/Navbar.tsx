import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  Languages,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  CloudSun,
  Activity,
  Trees,
  LineChart,
  Stethoscope,
  TrendingUp,
  Calculator,
  Bot,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, language, setLanguage, activePage, navigateTo, logout, t } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  const authenticatedLinks = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'gps_weather', label: t.navWeather, icon: CloudSun },
    { id: 'soil_analysis', label: t.navSoil, icon: Activity },
    { id: 'crop_recommendation', label: t.navCropRec, icon: Trees },
    { id: 'crop_growth', label: t.navGrowthTracker, icon: LineChart },
    { id: 'crop_doctor', label: t.navCropDoctor, icon: Stethoscope },
    { id: 'market_prices', label: t.navMandi, icon: TrendingUp },
    { id: 'profit_calculator', label: t.navCalculator, icon: Calculator },
    { id: 'ai_chatbot', label: t.navChatbot, icon: Bot },
  ];

  const handleNavClick = (pageId: any) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#062319]/90 backdrop-blur-md border-b border-emerald-900/40 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNavClick(user ? 'dashboard' : 'landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  VRUKSHA <span className="text-emerald-400">AI</span>
                </span>
                <span className="text-xs bg-emerald-900/80 text-emerald-300 font-medium px-2 py-0.5 rounded border border-emerald-700/50">
                  {language === 'te' ? 'వృక్ష AI' : 'Kisan Tech'}
                </span>
              </div>
              <p className="text-[10px] text-emerald-300/80 font-medium tracking-wider hidden sm:block uppercase">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation for Authenticated Farmers */}
          {user && (
            <nav className="hidden xl:flex items-center space-x-1">
              {authenticatedLinks.slice(0, 7).map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-emerald-900/30'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/40 text-xs font-medium transition-colors"
              title="Switch Language / భాష మార్చండి"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.languageToggle}</span>
            </button>

            {/* Authenticated User Status vs Public Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
                    activePage === 'profile'
                      ? 'bg-emerald-700 text-white border-emerald-500'
                      : 'bg-emerald-900/40 hover:bg-emerald-800/50 text-emerald-100 border-emerald-700/40'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xs font-bold text-emerald-300">
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium max-w-[110px] truncate hidden md:inline">
                    {user.full_name}
                  </span>
                </button>

                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/30 transition-colors"
                  title={t.btnLogout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-emerald-200 hover:text-white transition-colors"
                >
                  {t.btnLogin}
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50 transition-all border border-emerald-400/30 hover:scale-[1.02]"
                >
                  {t.btnRegister}
                </button>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-emerald-900/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#062319] border-b border-emerald-900/50 px-4 pt-2 pb-6 space-y-1">
          {user ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {authenticatedLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-950/50 text-slate-200 hover:bg-emerald-900/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium bg-emerald-950/50 text-slate-200 hover:bg-emerald-900/50 col-span-2"
              >
                <UserIcon className="w-4 h-4 text-emerald-400" />
                <span>{t.navProfile} ({user.full_name})</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleNavClick('landing')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-emerald-950"
              >
                {t.navHome}
              </button>
              <button
                onClick={() => handleNavClick('login')}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-950 text-emerald-200 border border-emerald-800/40"
              >
                {t.btnLogin}
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 text-white shadow"
              >
                {t.btnRegister}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
