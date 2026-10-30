import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { SoilRecord } from '../types';
import {
  Activity,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Droplet,
  Beaker
} from 'lucide-react';

export const SoilAnalysisModule: React.FC = () => {
  const { user, token, language, t } = useAuth();
  const [records, setRecords] = useState<SoilRecord[]>([]);
  const [activeTest, setActiveTest] = useState({
    nitrogen: 280,
    phosphorus: 24,
    potassium: 310,
    ph: 6.8,
    organic_carbon: 0.65,
    moisture: 34,
    health_score: 88,
    plot_name: 'Main Field (Plot A)'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formNitrogen, setFormNitrogen] = useState('280');
  const [formPhosphorus, setFormPhosphorus] = useState('24');
  const [formPotassium, setFormPotassium] = useState('310');
  const [formPh, setFormPh] = useState('6.8');
  const [formOrganicCarbon, setFormOrganicCarbon] = useState('0.65');
  const [formMoisture, setFormMoisture] = useState('34');
  const [formPlot, setFormPlot] = useState('Plot B - North Field');

  useEffect(() => {
    if (!token) return;
    fetch('/api/soil', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.records && data.records.length > 0) {
          setRecords(data.records);
          const latest = data.records[0];
          setActiveTest({
            nitrogen: latest.nitrogen,
            phosphorus: latest.phosphorus,
            potassium: latest.potassium,
            ph: latest.ph,
            organic_carbon: latest.organic_carbon,
            moisture: latest.moisture,
            health_score: latest.health_score,
            plot_name: latest.plot_name
          });
        }
      })
      .catch(err => console.warn('Failed to load soil records:', err));
  }, [token]);

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch('/api/soil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          plot_name: formPlot,
          nitrogen: parseFloat(formNitrogen),
          phosphorus: parseFloat(formPhosphorus),
          potassium: parseFloat(formPotassium),
          ph: parseFloat(formPh),
          organic_carbon: parseFloat(formOrganicCarbon),
          moisture: parseFloat(formMoisture),
          tested_at: new Date().toISOString().split('T')[0]
        })
      });
      const data = await res.json();
      if (data.success && data.record) {
        setRecords([data.record, ...records]);
        setActiveTest({
          nitrogen: data.record.nitrogen,
          phosphorus: data.record.phosphorus,
          potassium: data.record.potassium,
          ph: data.record.ph,
          organic_carbon: data.record.organic_carbon,
          moisture: data.record.moisture,
          health_score: data.record.health_score,
          plot_name: data.record.plot_name
        });
        setIsModalOpen(false);
      }
    } catch (err) {
      console.warn('Error saving soil test:', err);
    }
  };

  const parameters = [
    {
      name: t.soilNitrogen,
      value: `${activeTest.nitrogen} kg/ha`,
      status: activeTest.nitrogen >= 250 && activeTest.nitrogen <= 350 ? 'Optimal (సమతుల్యం)' : 'Low',
      range: 'Ideal: 250 - 350 kg/ha',
      percent: Math.min((activeTest.nitrogen / 400) * 100, 100),
      color: 'bg-emerald-500'
    },
    {
      name: t.soilPhosphorus,
      value: `${activeTest.phosphorus} kg/ha`,
      status: activeTest.phosphorus >= 18 && activeTest.phosphorus <= 30 ? 'Optimal (సమతుల్యం)' : 'Low',
      range: 'Ideal: 18 - 30 kg/ha',
      percent: Math.min((activeTest.phosphorus / 40) * 100, 100),
      color: 'bg-teal-500'
    },
    {
      name: t.soilPotassium,
      value: `${activeTest.potassium} kg/ha`,
      status: activeTest.potassium >= 200 && activeTest.potassium <= 350 ? 'Optimal (సమతుల్యం)' : 'Moderate',
      range: 'Ideal: 200 - 350 kg/ha',
      percent: Math.min((activeTest.potassium / 400) * 100, 100),
      color: 'bg-cyan-500'
    },
    {
      name: t.soilPh,
      value: `${activeTest.ph}`,
      status: activeTest.ph >= 6.5 && activeTest.ph <= 7.5 ? 'Neutral (ఉత్తమం)' : 'Slightly Alkaline',
      range: 'Ideal: 6.5 - 7.5 pH',
      percent: (activeTest.ph / 14) * 100,
      color: 'bg-lime-500'
    },
    {
      name: t.soilOrganicCarbon,
      value: `${activeTest.organic_carbon}%`,
      status: activeTest.organic_carbon >= 0.5 ? 'Medium (మితం)' : 'Low',
      range: 'Target: > 0.75%',
      percent: Math.min((activeTest.organic_carbon / 1.0) * 100, 100),
      color: 'bg-amber-500'
    },
    {
      name: t.soilMoisture,
      value: `${activeTest.moisture}%`,
      status: activeTest.moisture >= 30 ? 'Good Retention (సంతృప్తికరం)' : 'Dry',
      range: 'Field Capacity: 30 - 45%',
      percent: Math.min((activeTest.moisture / 60) * 100, 100),
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Beaker className="w-4 h-4" />
              <span>Scientific Soil Health Card</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.soilHeader}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'te'
                ? 'మీ పొలం మట్టిలోని పోషక విలువల సమగ్ర నివేదిక మరియు ఎరువుల సమతుల్యత'
                : 'Comprehensive NPK macro & micronutrient fertility diagnostics'}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'te' ? 'మట్టి పరీక్ష నమోదు' : 'Record Soil Test'}</span>
          </button>
        </div>

        {/* Overall Score Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#092b1f] via-[#0a3828] to-[#072318] border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">
              {activeTest.plot_name} · {user?.soil_type || 'Black Cotton Soil'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {language === 'te' ? 'సారవంతమైన నేల స్థితి (Grade A)' : 'High Soil Fertility Grade A'}
            </h2>
            <p className="text-xs text-slate-300 max-w-lg">
              {language === 'te'
                ? 'మీ నేలలో నత్రజని మరియు పొటాష్ పోషకాలు సమతుల్యంగా ఉన్నాయి. సేంద్రీయ కర్బనం (Organic Carbon) పెంచడానికి పచ్చిరొట్ట ఎరువులు వాడండి.'
                : 'Balanced NPK ratio with optimal pH of 6.8. Recommended to supplement with green manure or vermicompost to elevate organic carbon.'}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-emerald-500 bg-emerald-950/80 shadow-lg shadow-emerald-950/60">
            <span className="text-3xl font-extrabold text-white">{activeTest.health_score}</span>
            <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Health Index</span>
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parameters.map((param, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#092b1f]/80 border border-emerald-800/40 backdrop-blur-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{param.name}</span>
                <span className="text-[11px] font-semibold text-emerald-300">{param.status}</span>
              </div>
              <div className="text-2xl font-extrabold text-white">{param.value}</div>
              
              <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/60">
                <div
                  className={`h-full ${param.color} transition-all duration-500`}
                  style={{ width: `${param.percent}%` }}
                />
              </div>
              
              <div className="text-[10px] text-slate-400 font-mono">
                {param.range}
              </div>
            </div>
          ))}
        </div>

        {/* Tailored Prescriptions */}
        <div className="rounded-3xl bg-[#092b1f]/80 border border-emerald-800/40 p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.soilDosageRecommendation}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
              <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'te' ? 'రసాయన ఎరువుల మోతాదు (ఎకరానికి)' : 'Balanced Chemical Dosage (Per Acre)'}</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Urea (నత్రజని): 45 kg split into 3 doses at 20, 45, and 65 days.</li>
                <li>DAP (డై అమ్మోనియం ఫాస్ఫేట్): 50 kg applied as basal dressing during last ploughing.</li>
                <li>MOP (మ్యూరేట్ ఆఫ్ పొటాష్): 30 kg for boll filling and drought resistance.</li>
                <li>Zinc Sulphate 21%: 10 kg once in 2 years to prevent khaira leaf yellowing.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
              <h4 className="font-bold text-teal-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>{language === 'te' ? 'సేంద్రీయ & జీవ ఎరువుల యాజమాన్యం' : 'Organic Soil Amendments'}</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Apply 2 tonnes of well-decomposed Farmyard Manure (FYM) or Vermicompost per acre.</li>
                <li>Mix 2 kg Trichoderma viride + 2 kg Pseudomonas fluorescens in 100 kg cow dung before field application.</li>
                <li>Sow Daincha (జీలుగు) or Sunhemp as green manure crop before Kharif season.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Record Soil Test Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#092b1f] border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
              <h3 className="text-base font-bold text-white">Record Soil Test Result</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveRecord} className="space-y-3 text-xs">
              <div>
                <label className="block text-emerald-200 mb-1 font-semibold">Plot Name</label>
                <input
                  type="text"
                  value={formPlot}
                  onChange={(e) => setFormPlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Nitrogen (kg/ha)</label>
                  <input
                    type="number"
                    value={formNitrogen}
                    onChange={(e) => setFormNitrogen(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-white"
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Phosphorus (kg/ha)</label>
                  <input
                    type="number"
                    value={formPhosphorus}
                    onChange={(e) => setFormPhosphorus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Potassium (kg/ha)</label>
                  <input
                    type="number"
                    value={formPotassium}
                    onChange={(e) => setFormPotassium(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-white"
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 mb-1 font-semibold">Soil pH</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formPh}
                    onChange={(e) => setFormPh(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Save Soil Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
