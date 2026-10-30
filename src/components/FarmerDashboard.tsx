import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FarmerCrop } from '../types';
import {
  Sprout,
  LayoutDashboard,
  CloudSun,
  Activity,
  Trees,
  LineChart,
  Stethoscope,
  TrendingUp,
  Calculator,
  Bot,
  MapPin,
  ArrowUpRight,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user, token, navigateTo, language, t } = useAuth();
  const [crops, setCrops] = useState<FarmerCrop[]>([]);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const [newVariety, setNewVariety] = useState('');
  const [newArea, setNewArea] = useState('2.0');
  const [newStage, setNewStage] = useState('Vegetative (శాఖా దశ)');
  const [newSowingDate, setNewSowingDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (!token) return;
    fetch('/api/crops', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.crops) {
          setCrops(data.crops);
        }
      })
      .catch(err => console.warn('Failed to fetch crops:', err));
  }, [token]);

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName || !token) return;

    try {
      const res = await fetch('/api/crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          crop_name: newCropName,
          variety: newVariety || 'Hybrid Local',
          sowing_date: newSowingDate,
          area_acres: parseFloat(newArea) || 1.0,
          stage: newStage,
          health_status: 'Healthy'
        })
      });
      const data = await res.json();
      if (data.success && data.crop) {
        setCrops([data.crop, ...crops]);
        setIsAddCropOpen(false);
        setNewCropName('');
      }
    } catch (err) {
      console.warn('Error adding crop:', err);
    }
  };

  const quickNavCards = [
    {
      id: 'gps_weather',
      title: t.navWeather,
      desc: language === 'te' ? '31°C · వర్ష సూచన 20% · సాయంత్రం పిచికారీకి అనుకూలం' : '31°C · 20% Rain Risk · Optimal Spray Window',
      icon: CloudSun,
      color: 'bg-amber-500/10 border-amber-500/30 text-amber-300'
    },
    {
      id: 'soil_analysis',
      title: t.navSoil,
      desc: language === 'te' ? 'స్కోర్ 88/100 · నల్లరేగడి నేల · pH 6.8 సమతుల్యంగా ఉంది' : 'Health Score 88/100 · Black Cotton · Balanced pH 6.8',
      icon: Activity,
      color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
    },
    {
      id: 'crop_doctor',
      title: t.navCropDoctor,
      desc: language === 'te' ? 'ఆకు ముడుత, అగ్గితెగులు తనిఖీ & సేంద్రీయ నివారణ' : 'Diagnose leaf curl, blast & pests instantly',
      icon: Stethoscope,
      color: 'bg-teal-500/10 border-teal-500/30 text-teal-300'
    },
    {
      id: 'market_prices',
      title: t.navMandi,
      desc: language === 'te' ? 'తేజ మిర్చి: ₹21,400/Q · సోనా మసూరి: ₹2,840/Q' : 'Teja Chilli: ₹21,400/Q · Sona Masoori: ₹2,840/Q',
      icon: TrendingUp,
      color: 'bg-green-500/10 border-green-500/30 text-green-300'
    },
    {
      id: 'crop_recommendation',
      title: t.navCropRec,
      desc: language === 'te' ? 'నేల & నీటి ఆధారంగా అత్యుత్తమ పంటల సిఫార్సు' : 'Machine learning crop selection for max profit',
      icon: Trees,
      color: 'bg-lime-500/10 border-lime-500/30 text-lime-300'
    },
    {
      id: 'profit_calculator',
      title: t.navCalculator,
      desc: language === 'te' ? 'సాగు ఖర్చు vs మార్కెట్ ఆదాయ గణన' : 'Calculate cost of cultivation & net farm ROI',
      icon: Calculator,
      color: 'bg-blue-500/10 border-blue-500/30 text-blue-300'
    },
    {
      id: 'ai_chatbot',
      title: t.navChatbot,
      desc: language === 'te' ? 'ఎరువుల మోతాదు లేదా పురుగుల నివారణపై అడగండి' : '24/7 AI agronomist in English and Telugu',
      icon: Bot,
      color: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
    }
  ];

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#092e21] via-[#0b3c2c] to-[#07241a] p-6 sm:p-8 border border-emerald-500/30 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>
                  {user?.village}, {user?.district}, {user?.state} · {user?.soil_type || 'Black Soil'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {t.dashWelcome}, {user?.full_name}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl">
                {t.dashSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateTo('crop_doctor')}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{language === 'te' ? 'AI పంట డాక్టర్' : 'Scan Crop Disease'}</span>
              </button>
              <button
                onClick={() => navigateTo('ai_chatbot')}
                className="px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-600/40 text-emerald-200 font-semibold text-xs backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>{language === 'te' ? 'కిసాన్ మిత్రను అడగండి' : 'Ask Kisan Mitra'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="rounded-2xl p-4 bg-[#092b1f]/80 border border-emerald-800/40 backdrop-blur-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">{t.kpiFarmArea}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-white">{user?.farm_size_acres || 5.0}</span>
              <span className="text-xs text-emerald-400 font-semibold">{language === 'te' ? 'ఎకరాలు' : 'Acres'}</span>
            </div>
            <div className="text-[10px] text-emerald-300/80 mt-1 flex items-center gap-1">
              <span>{user?.soil_type || 'Black Soil'}</span>
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-[#092b1f]/80 border border-emerald-800/40 backdrop-blur-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">{t.kpiActiveCrops}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-emerald-300">{crops.length || 3}</span>
              <span className="text-xs text-slate-400 font-medium">{language === 'te' ? 'రకాలు' : 'Crops'}</span>
            </div>
            <div className="text-[10px] text-emerald-300/80 mt-1">
              {language === 'te' ? 'వరి, మిర్చి, పత్తి' : 'Paddy, Chilli, Cotton'}
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-[#092b1f]/80 border border-emerald-800/40 backdrop-blur-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">{t.kpiSoilHealth}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-teal-300">88</span>
              <span className="text-xs text-slate-400 font-medium">/ 100</span>
            </div>
            <div className="text-[10px] text-emerald-300/80 mt-1">
              {language === 'te' ? 'చాలా మంచి స్థితి' : 'Grade A (Fertile)'}
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-[#092b1f]/80 border border-emerald-800/40 backdrop-blur-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">{t.kpiWeatherStatus}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-amber-300">31°C</span>
              <span className="text-xs text-slate-400 font-medium">晴</span>
            </div>
            <div className="text-[10px] text-amber-300/90 mt-1">
              {language === 'te' ? 'వర్షం 20% · అనుకూలం' : '20% Rain · Spray Safe'}
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-[#092b1f]/80 border border-emerald-800/40 backdrop-blur-md col-span-2 lg:col-span-1">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">{t.kpiExpectedRevenue}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-emerald-400">₹3.45</span>
              <span className="text-xs text-slate-300 font-semibold">{language === 'te' ? 'లక్షలు' : 'Lakhs'}</span>
            </div>
            <div className="text-[10px] text-emerald-300/80 mt-1">
              {language === 'te' ? 'అంచనా నికర లాభం' : 'Net Farm Revenue'}
            </div>
          </div>

        </div>

        {/* Agronomy Advisories & Live Alerts */}
        <div className="rounded-2xl bg-emerald-950/40 border border-emerald-800/40 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.quickAdvisoriesTitle}</span>
            </h3>
            <span className="text-[10px] text-emerald-400/90 font-mono">
              {language === 'te' ? 'తాజా అప్‌డేట్: ఈరోజు' : 'Live ICAR Agronomy Engine'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            
            <div className="p-3 rounded-xl bg-[#08261c] border border-emerald-700/30 flex items-start gap-2.5">
              <CloudSun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-200 block mb-0.5">
                  {language === 'te' ? 'వాతావరణం & పిచికారీ' : 'Weather & Spray Window'}
                </strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {language === 'te'
                    ? 'ఈరోజు సాయంత్రం 4:30 నుండి గాలి వేగం తగ్గనుంది. మిర్చిలో తామర పురుగుల నివారణ మందుల పిచికారీకి అత్యంత అనుకూలం.'
                    : 'Wind speeds drop below 10 km/h after 4:30 PM. Ideal window for pesticide spraying in chilli and cotton.'}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#08261c] border border-emerald-700/30 flex items-start gap-2.5">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-200 block mb-0.5">
                  {language === 'te' ? 'గుంటూరు మిర్చి మార్కెట్' : 'Guntur APMC Price Alert'}
                </strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {language === 'te'
                    ? 'తేజ మిర్చి ధర క్వింటాలుకు ₹21,400 కు చేరింది (+2.8%). నాణ్యమైన కాయలను గ్రేడింగ్ చేసి అమ్మడం లాభదాయకం.'
                    : 'Teja S17 chilli crossed ₹21,400/Q today (+2.8%). High buyer demand for properly sun-dried red pods.'}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#08261c] border border-emerald-700/30 flex items-start gap-2.5">
              <Activity className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-teal-200 block mb-0.5">
                  {language === 'te' ? 'వరిలో ఎరువుల సలహా' : 'Paddy Nitrogen Top-Dress'}
                </strong>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {language === 'te'
                    ? 'చిరుపొట్ట దశకు చేరుకుంటున్న వరి పైరుకు ఎకరానికి 20 కిలోల యూరియా మరియు 15 కిలోల మ్యూరేట్ ఆఫ్ పొటాష్ వేయండి.'
                    : 'Apply second split of 20kg Urea + 15kg MOP per acre before panicle initiation stage.'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Agriculture Modules Access Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              {language === 'te' ? 'వ్యవసాయ టూల్స్ & సేవల విభాగం' : 'Smart Agriculture Command Modules'}
            </h2>
            <span className="text-xs text-slate-400">
              {language === 'te' ? 'అన్ని టూల్స్ పూర్తి స్థాయిలో అందుబాటులో ఉన్నాయి' : 'All 9 modules active & verified'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickNavCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => navigateTo(card.id as any)}
                  className={`p-5 rounded-2xl border backdrop-blur-md cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg group ${card.color}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300/90 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farmer Registered Crops Management Table */}
        <div className="rounded-3xl bg-[#092b1f]/80 border border-emerald-800/40 p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Trees className="w-5 h-5 text-emerald-400" />
                <span>{t.myCropsTitle}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'te' ? 'మీ వ్యవసాయ క్షేత్రంలో సాగవుతున్న పంటల వివరాలు' : 'Live tracking of current sown crops'}
              </p>
            </div>

            <button
              onClick={() => setIsAddCropOpen(!isAddCropOpen)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addCropBtn}</span>
            </button>
          </div>

          {/* Add Crop Inline Form */}
          {isAddCropOpen && (
            <form onSubmit={handleAddCrop} className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-600/40 space-y-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Crop Name</label>
                  <input
                    type="text"
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    placeholder="e.g. Sona Masoori Paddy"
                    className="w-full px-3 py-2 rounded-lg bg-emerald-900/60 border border-emerald-700/60 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Variety / Hybrid</label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    placeholder="e.g. BPT 5204"
                    className="w-full px-3 py-2 rounded-lg bg-emerald-900/60 border border-emerald-700/60 text-white"
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-emerald-900/60 border border-emerald-700/60 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-emerald-900/60 border border-emerald-700/60 text-white"
                  >
                    <option value="Vegetative (శాఖా దశ)">Vegetative (శాఖా దశ)</option>
                    <option value="Flowering (పూత దశ)">Flowering (పూత దశ)</option>
                    <option value="Fruiting / Grain Filling">Grain Filling (గింజ దశ)</option>
                    <option value="Harvest Ready (కోత దశ)">Harvest Ready (కోత దశ)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCropOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs"
                >
                  Save Crop
                </button>
              </div>
            </form>
          )}

          {/* Crops List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-950/60 text-emerald-300 uppercase font-mono text-[10px] tracking-wider border-b border-emerald-800/40">
                <tr>
                  <th className="py-3 px-4">Crop & Variety</th>
                  <th className="py-3 px-4">Cultivated Land</th>
                  <th className="py-3 px-4">Sown Date</th>
                  <th className="py-3 px-4">Growth Stage</th>
                  <th className="py-3 px-4">Plant Health</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/40 text-slate-200">
                {crops.length > 0 ? (
                  crops.map((crop) => (
                    <tr key={crop.id} className="hover:bg-emerald-900/20 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div>{crop.crop_name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{crop.variety}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-emerald-300">{crop.area_acres}</span> Acres
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {crop.sowing_date}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-300">{crop.stage}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 font-semibold ${
                          crop.health_status === 'Excellent' || crop.health_status === 'Healthy'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{crop.health_status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => navigateTo('crop_growth')}
                          className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 text-[11px]"
                        >
                          View Tracker
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      No registered crops yet. Click "Register New Crop" above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
