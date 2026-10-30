import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES_AND_DISTRICTS } from '../data/mockAgricultureData';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Trees,
  Activity,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const FarmerProfile: React.FC = () => {
  const { user, updateProfile, language, setLanguage, t } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [state, setState] = useState(user?.state || 'Andhra Pradesh');
  const [district, setDistrict] = useState(user?.district || 'Guntur');
  const [village, setVillage] = useState(user?.village || '');
  const [prefLang, setPrefLang] = useState<'en' | 'te'>(user?.preferred_language || 'en');
  const [farmSize, setFarmSize] = useState<number>(user?.farm_size_acres || 5.0);
  const [soilType, setSoilType] = useState(user?.soil_type || 'Black Cotton Soil');
  const [savedCrops, setSavedCrops] = useState(user?.saved_crops || 'Paddy, Cotton, Chilli');

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableDistricts = INDIAN_STATES_AND_DISTRICTS[state] || ['District'];

  const handleStateChange = (newState: string) => {
    setState(newState);
    const districts = INDIAN_STATES_AND_DISTRICTS[newState] || [];
    if (districts.length > 0) {
      setDistrict(districts[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const result = await updateProfile({
      full_name: fullName,
      mobile,
      state,
      district,
      village,
      preferred_language: prefLang,
      farm_size_acres: farmSize,
      soil_type: soilType,
      saved_crops: savedCrops
    });

    setIsSaving(false);

    if (result.success) {
      setSuccessMsg(
        language === 'te'
          ? 'మీ ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ చేయబడింది!'
          : 'Farmer profile updated successfully in the database!'
      );
      if (prefLang !== language) {
        setLanguage(prefLang);
      }
    } else {
      setErrorMsg(result.error || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="pb-4 border-b border-emerald-900/50">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Farmer Account & Farm Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.profileHeader}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {t.profileSubtitle}
          </p>
        </div>

        {/* Profile Card Summary Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#092b1f] via-[#0a3828] to-[#072318] border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl border-2 border-emerald-300/40 shrink-0">
            {fullName ? fullName.charAt(0).toUpperCase() : 'R'}
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{fullName}</h2>
              <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-600/40 px-2 py-0.5 rounded-full font-mono">
                Farmer ID #{user?.id || 1}
              </span>
            </div>
            <div className="text-xs text-emerald-300/90 flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {village}, {district}, {state}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                +91 {mobile}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Edit Form */}
        <div className="rounded-3xl bg-[#092b1f]/80 border border-emerald-800/40 p-6 sm:p-8 backdrop-blur-md shadow-lg">
          <form onSubmit={handleSave} className="space-y-4">
            
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-emerald-900/50">
              Personal & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Farmer Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Mobile Number (10 Digits)</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Email Address (Read Only)</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-900/40 text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Preferred Language</label>
                <select
                  value={prefLang}
                  onChange={(e) => setPrefLang(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                >
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-4 pb-2 border-b border-emerald-900/50">
              Farm & Land Location Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                >
                  {Object.keys(INDIAN_STATES_AND_DISTRICTS).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                >
                  {availableDistricts.map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Village / Mandal</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Cultivated Land (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={farmSize}
                  onChange={(e) => setFarmSize(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                />
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Primary Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                >
                  <option value="Black Cotton Soil">Black Cotton Soil (నల్లరేగడి నేల)</option>
                  <option value="Red Loamy Soil">Red Loamy Soil (ఎర్ర నేలలు)</option>
                  <option value="Sandy Loam">Sandy Loam (ఇసుక నేలలు)</option>
                  <option value="Clayey Loam">Clayey Loam (బంకమట్టి నేల)</option>
                </select>
              </div>

              <div>
                <label className="block text-emerald-200 font-semibold mb-1">Saved / Registered Crops</label>
                <input
                  type="text"
                  value={savedCrops}
                  onChange={(e) => setSavedCrops(e.target.value)}
                  placeholder="e.g. Paddy, Cotton, Chilli"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? t.loading : t.btnSave}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
