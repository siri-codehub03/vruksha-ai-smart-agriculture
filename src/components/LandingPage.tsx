import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CloudSun,
  Activity,
  Stethoscope,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Award,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language, setLanguage, navigateTo, login, t } = useAuth();

  const handleDemoLogin = async () => {
    await login('9876543210', 'Farmer@123', true);
  };

  const featureCards = [
    {
      icon: CloudSun,
      title: t.featureWeatherTitle,
      desc: t.featureWeatherDesc,
      tag: language === 'te' ? 'మైక్రో వాతావరణం' : 'Hyperlocal Radar',
      color: 'from-amber-500/20 to-emerald-500/10'
    },
    {
      icon: Activity,
      title: t.featureSoilTitle,
      desc: t.featureSoilDesc,
      tag: language === 'te' ? 'NPK విశ్లేషణ' : 'Precision NPK',
      color: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      icon: Stethoscope,
      title: t.featureDoctorTitle,
      desc: t.featureDoctorDesc,
      tag: language === 'te' ? 'సస్యరక్షణ' : 'Instant AI Scan',
      color: 'from-teal-500/20 to-cyan-500/10'
    },
    {
      icon: TrendingUp,
      title: t.featureMandiTitle,
      desc: t.featureMandiDesc,
      tag: language === 'te' ? 'APMC లైవ్' : 'Real-time Mandi',
      color: 'from-green-500/20 to-emerald-500/10'
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#071d15] text-slate-100">
      
      {/* Agriculture Hero Banner Background with Forest Green Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=80"
          alt="Lush green agriculture field and modern farmer"
          className="w-full h-full object-cover object-center opacity-25 filter saturate-150 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062319]/90 via-[#071d15]/85 to-[#051810]" />
        
        {/* Subtle decorative radial gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        {/* Language Quick Switcher Floating Bar */}
        <div className="flex justify-between items-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.landingBadge}</span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/70 backdrop-blur-md p-1 rounded-lg border border-emerald-800/40">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                language === 'te'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
              VRUKSHA <span className="text-emerald-400">AI</span>
            </span>
            <span className="text-emerald-400 font-mono text-xs font-semibold">| స్మార్ట్ వ్యవసాయం</span>
          </div>

          {/* Project Tagline */}
          <div className="tracking-widest uppercase font-extrabold text-sm sm:text-base text-emerald-400 font-mono">
            {t.brandTagline}
          </div>

          {/* Welcome Message for Indian Farmers */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {language === 'te' ? (
              <>
                స్వాగతం రైతన్న! <br />
                <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-200 bg-clip-text text-transparent">
                  అధిక దిగుబడి & లాభాల కోసం స్మార్ట్ AI
                </span>
              </>
            ) : (
              <>
                Welcome Indian Farmers! <br />
                <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-200 bg-clip-text text-transparent">
                  Precision AI for Higher Yields & Maximum Profit
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.landingHeroDesc}
          </p>

          {/* Core Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <button
              onClick={() => navigateTo('register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 border border-emerald-300/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>{t.btnGetStarted}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('login')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-200 font-semibold text-sm border border-emerald-700/50 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>{t.btnLogin}</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={handleDemoLogin}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold text-sm border border-amber-500/40 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              title="Instantly sign into Ramesh Reddy's pre-configured farm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.landingQuickDemo}</span>
            </button>

          </div>

          {/* Security & Reliability Indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>FastAPI & SQLite Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bcrypt Password Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>ICAR & ANGRAU Agronomy Protocols</span>
            </div>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {language === 'te'
                ? 'రైతుల కోసం సమగ్ర స్మార్ట్ వ్యవసాయ సేవలు'
                : 'Comprehensive Precision Agriculture Ecosystem'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'te'
                ? 'లాగిన్ చేసి మీ పొలానికి సంబంధించిన ప్రతి అంశాన్ని డిజిటల్ పద్ధతిలో నిర్వహించండి'
                : 'Login to unlock soil diagnosis, live APMC Mandi trends, and disease treatments'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-emerald-950/40 border border-emerald-800/30 backdrop-blur-md hover:border-emerald-500/50 transition-all hover:-translate-y-1 shadow-lg group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600/30 to-green-800/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400/90 font-medium tracking-wide">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farmer Testimonial Banner */}
        <div className="mt-16 rounded-2xl p-8 bg-gradient-to-r from-emerald-950/80 via-[#0a3828]/70 to-emerald-950/80 border border-emerald-700/40 backdrop-blur-md relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <p className="text-base sm:text-lg text-emerald-100 font-medium italic">
              {t.farmerTestimonial}
            </p>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {t.farmerTestimonialAuthor}
            </p>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'te'
              ? 'మీ వ్యవసాయాన్ని లాభసాటిగా మార్చుకోవడానికి సిద్ధమా?'
              : 'Ready to Transform Your Farming Yields & Profit?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {language === 'te'
              ? 'ఉచితంగా ఖాతా తెరవండి, మట్టి విశ్లేషణ మరియు వాతావరణ ఆధారిత సలహాలు పొందండి.'
              : 'Create your free farmer account today to get started with scientific soil testing and live APMC Mandi rates.'}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('register')}
              className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
            >
              {t.btnRegister}
            </button>
            <button
              onClick={() => navigateTo('login')}
              className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs border border-white/20 transition-all"
            >
              {t.btnLogin}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
