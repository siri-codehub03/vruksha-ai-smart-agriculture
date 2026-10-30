import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LineChart, Calendar, CheckCircle2, Clock, Droplets, Sparkles, AlertCircle } from 'lucide-react';

export const CropGrowthTracker: React.FC = () => {
  const { user, language, t } = useAuth();

  const [selectedCrop, setSelectedCrop] = useState('Paddy (వరి)');

  const stages = [
    {
      id: 1,
      name: 'Germination & Nursery',
      name_te: 'మొలక & నారుమడి దశ',
      days: 'Day 1 - 25',
      status: 'Completed',
      tasks: ['Seed treatment with Trichoderma', 'Nursery raised bed preparation', 'Puddle field transplanting']
    },
    {
      id: 2,
      name: 'Active Tillering & Vegetative',
      name_te: 'శాఖా దశ (పిలకల పెరుగుదల)',
      days: 'Day 26 - 60',
      status: 'In Progress (ప్రస్తుత దశ)',
      tasks: ['First split of Urea + Zinc', 'Weeding / Conoweeder operation', 'Stem borer scouting']
    },
    {
      id: 3,
      name: 'Panicle Initiation & Flowering',
      name_te: 'చిరుపొట్ట & పూత దశ',
      days: 'Day 61 - 90',
      status: 'Upcoming',
      tasks: ['Second split of Potash (MOP)', 'Maintain 2-inch standing water', 'Blast disease preventive spray']
    },
    {
      id: 4,
      name: 'Grain Filling (Dough Stage)',
      name_te: 'గింజ పాలుపోసుకునే దశ',
      days: 'Day 91 - 120',
      status: 'Upcoming',
      tasks: ['Suckering pest monitoring (BPH)', 'Avoid field drying', 'Bird scare netting']
    },
    {
      id: 5,
      name: 'Maturity & Harvesting',
      name_te: 'పక్వత & కోత దశ',
      days: 'Day 121 - 135',
      status: 'Upcoming',
      tasks: ['Drain field water 10 days before harvest', 'Check moisture at 14% for bagging', 'Combine harvester booking']
    }
  ];

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <LineChart className="w-4 h-4" />
              <span>Crop Phenology & Stage Scheduler</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.trackerHeader}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {t.trackerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-semibold">Active Field:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white text-xs font-bold focus:outline-none"
            >
              <option value="Paddy (వరి)">Sona Masoori Paddy (Plot A - 3.5 Acres)</option>
              <option value="Chilli (మిర్చి)">Teja Chilli (Plot B - 2.0 Acres)</option>
              <option value="Cotton (పత్తి)">Bt Cotton (Plot C - 1.0 Acre)</option>
            </select>
          </div>
        </div>

        {/* Growth Progress Status Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#092b1f] via-[#0a3828] to-[#072318] border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Current Growth Progress
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                Day 48 of 135 · Vegetative Stage (శాఖా దశ)
              </h2>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/50 text-center">
                <span className="text-slate-400 block text-[10px]">Harvest Countdown</span>
                <span className="text-lg font-extrabold text-emerald-300">87 Days</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/50 text-center">
                <span className="text-slate-400 block text-[10px]">Next Irrigation</span>
                <span className="text-lg font-extrabold text-cyan-300">In 3 Days</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Sown: 15 July 2026</span>
              <span className="text-emerald-300 font-bold">36% Completed</span>
              <span>Expected Harvest: 20 Nov 2026</span>
            </div>
            <div className="h-3 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/60">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" style={{ width: '36%' }} />
            </div>
          </div>
        </div>

        {/* Milestone Stage Timeline */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {language === 'te' ? 'పంట ఎదుగుదల దశల షెడ్యూల్' : 'Milestone Checklists & Management Schedule'}
          </h3>

          <div className="space-y-3">
            {stages.map((stg) => (
              <div
                key={stg.id}
                className={`p-5 rounded-2xl border backdrop-blur-md transition-all ${
                  stg.status.includes('In Progress')
                    ? 'bg-emerald-950/80 border-emerald-500/60 shadow-lg'
                    : stg.status === 'Completed'
                    ? 'bg-[#082218]/60 border-emerald-900/40 opacity-80'
                    : 'bg-[#061e16]/50 border-emerald-950'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-700/60">
                      {stg.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {language === 'te' ? stg.name_te : stg.name}
                      </h4>
                      <span className="text-[11px] text-emerald-400 font-mono">{stg.days}</span>
                    </div>
                  </div>

                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    stg.status.includes('In Progress')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : stg.status === 'Completed'
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-emerald-950 text-slate-400'
                  }`}>
                    {stg.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-900/40 text-xs text-slate-300">
                  {stg.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
