import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sprout, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setLanguage, t, navigateTo, user } = useAuth();

  return (
    <footer className="bg-[#041710] border-t border-emerald-950/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                VRUKSHA <span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-emerald-400 font-semibold tracking-wider uppercase text-xs">
              {t.brandTagline}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {language === 'te'
                ? 'భారతీయ రైతుల సంక్షేమం మరియు అధిక దిగుబడుల కోసం ఉద్దేశించిన వినూత్న వ్యవసాయ సాంకేతిక వేదిక. మట్టి పరీక్ష, వాతావరణం మరియు మార్కెట్ ధరలను అనుసంధానించే వ్యవస్థ.'
                : 'Next-generation smart agricultural intelligence platform empowering Indian farmers with scientific precision, real-time market data, and soil agronomy.'}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FastAPI & SQLite Enterprise Security · Bcrypt Hashed · ISO 27001 Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              {language === 'te' ? 'ముఖ్యమైన లింకులు' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => navigateTo(user ? 'dashboard' : 'landing')}
                  className="hover:text-emerald-300 transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('gps_weather')}
                  className="hover:text-emerald-300 transition-colors"
                >
                  {t.navWeather}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('soil_analysis')}
                  className="hover:text-emerald-300 transition-colors"
                >
                  {t.navSoil}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('crop_doctor')}
                  className="hover:text-emerald-300 transition-colors"
                >
                  {t.navCropDoctor}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('market_prices')}
                  className="hover:text-emerald-300 transition-colors"
                >
                  {t.navMandi}
                </button>
              </li>
            </ul>
          </div>

          {/* Farmer Helpline & Contact */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              {language === 'te' ? 'రైతు సహాయవాణి' : 'Kisan Support & Helpline'}
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-900/50">
                <PhoneCall className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-bold text-xs">1800-180-1551</div>
                  <div className="text-[10px] text-slate-400">
                    {language === 'te' ? 'టోల్ ఫ్రీ కిసాన్ కాల్ సెంటర్ (ఉచితం)' : 'National Kisan Call Center (Toll Free)'}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Email: support@vruksha.ai · Hyderabad & Guntur Innovation Hub
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded text-[11px] ${language === 'en' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  English
                </button>
                <span>·</span>
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-2 py-0.5 rounded text-[11px] ${language === 'te' ? 'bg-emerald-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  తెలుగు (Telugu)
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} VRUKSHA AI Technologies Pvt Ltd. Dedicated to the Indian Farmer.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Indian Agriculture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
