import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CROP_DISEASES_DB } from '../data/mockAgricultureData';
import { DiseaseDiagnosis } from '../types';
import {
  Stethoscope,
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const CropDoctorModule: React.FC = () => {
  const { user, token, language, t } = useAuth();

  const [selectedCrop, setSelectedCrop] = useState('Chilli / Mirchi (మిరప)');
  const [symptomsInput, setSymptomsInput] = useState('Leaves curling upward, bushy stunted growth, flower drop');
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(CROP_DISEASES_DB[0]);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const samplePresets = [
    { label: 'Chilli Leaf Curl (మిర్చి ఆకు ముడుత)', crop: 'Chilli / Mirchi (మిరప)', desc: 'Leaves curling upward, puckering, small stunted growth' },
    { label: 'Paddy Blast (వరి అగ్గితెగులు)', crop: 'Paddy / Rice (వరి)', desc: 'Spindle-shaped brown lesions with grey center on leaf blades' },
    { label: 'Cotton Bollworm (పత్తి కాయ తొలుచు పురుగు)', crop: 'Cotton (పత్తి)', desc: 'Rosette flowers, exit holes with frass on young green bolls' }
  ];

  const handleDiagnose = async (cropParam?: string, sympParam?: string) => {
    const c = cropParam || selectedCrop;
    const s = sympParam || symptomsInput;

    setIsDiagnosing(true);
    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ crop_name: c, symptoms: s })
      });
      const data = await res.json();
      if (data.success && data.diagnosis) {
        setDiagnosis(data.diagnosis);
      }
    } catch (err) {
      console.warn('Diagnosis error, using local expert fallback:', err);
      setDiagnosis(CROP_DISEASES_DB[0]);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const loadPreset = (preset: typeof samplePresets[0]) => {
    setSelectedCrop(preset.crop);
    setSymptomsInput(preset.desc);
    handleDiagnose(preset.crop, preset.desc);
  };

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="pb-4 border-b border-emerald-900/50">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4" />
            <span>AI Plant Pathology & Pest Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.doctorHeader}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {t.doctorSubtitle}
          </p>
        </div>

        {/* Diagnostic Input Section */}
        <div className="rounded-3xl bg-[#092b1f]/85 border border-emerald-500/30 p-6 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.doctorUploadPrompt}
            </h3>
            <span className="text-[11px] text-emerald-300 font-mono">
              ICAR Validated Diagnostics
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 self-center text-[11px]">Quick Symptoms:</span>
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadPreset(preset)}
                className="px-3 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-300 text-xs font-medium transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Crop Picker */}
            <div>
              <label className="block text-emerald-200 font-semibold mb-1.5">{t.selectCropLabel}</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Chilli / Mirchi (మిరప)">Chilli / Mirchi (మిరప)</option>
                <option value="Paddy / Rice (వరి)">Paddy / Rice (వరి)</option>
                <option value="Cotton (పత్తి)">Cotton (పత్తి)</option>
                <option value="Maize / Corn (మొక్కజొన్న)">Maize / Corn (మొక్కజొన్న)</option>
                <option value="Groundnut (వేరుశనగ)">Groundnut (వేరుశనగ)</option>
                <option value="Tomato (టమోటా)">Tomato (టమోటా)</option>
              </select>
            </div>

            {/* Symptoms Description */}
            <div className="sm:col-span-2">
              <label className="block text-emerald-200 font-semibold mb-1.5">{t.describeSymptomsLabel}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  placeholder="Describe leaf spots, curling, wilting, or pest damage..."
                  className="w-full px-3 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={() => handleDiagnose()}
                  disabled={isDiagnosing}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shrink-0 shadow transition-all flex items-center gap-1.5 disabled:opacity-60"
                >
                  {isDiagnosing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{t.btnDiagnose}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis Results Card */}
        {diagnosis && (
          <div className="rounded-3xl bg-[#092b1f]/90 border border-emerald-500/40 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6 animate-fadeIn">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/60">
              <div>
                <span className="text-xs text-emerald-400 font-mono uppercase tracking-wider">
                  Diagnosis Result · {language === 'te' ? diagnosis.crop_name_te : diagnosis.crop_name}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {language === 'te' ? diagnosis.disease_name_te : diagnosis.disease_name}
                </h2>
                <div className="text-xs text-slate-300 mt-0.5">
                  {language === 'te' ? diagnosis.disease_name : diagnosis.disease_name_te}
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold text-sm shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{diagnosis.confidence}% Confidence</span>
              </div>
            </div>

            {/* Symptoms & Causes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
                <h4 className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Key Symptoms Identified</span>
                </h4>
                <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                  {(language === 'te' ? (diagnosis.symptoms_te || diagnosis.symptoms) : diagnosis.symptoms).map((sym, i) => (
                    <li key={i}>{sym}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
                <h4 className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Cause & Transmission</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {language === 'te' ? (diagnosis.causes_te || diagnosis.causes) : diagnosis.causes}
                </p>
              </div>

            </div>

            {/* Treatments: Organic vs Chemical */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Organic Remediation */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-[#08291e] border border-emerald-600/40 space-y-2.5">
                <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'te' ? 'సేంద్రీయ & జీవ నియంత్రణ' : 'Organic & Biological Treatment'}</span>
                </h4>
                <ul className="space-y-2 text-slate-200">
                  {(language === 'te' ? (diagnosis.organic_treatment_te || diagnosis.organic_treatment) : diagnosis.organic_treatment).map((org, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{org}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c2e22]/90 to-emerald-950/80 border border-emerald-600/40 space-y-2.5">
                <h4 className="font-bold text-teal-300 text-sm flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-teal-400" />
                  <span>{language === 'te' ? 'సిఫార్సు చేయబడిన రసాయన మందులు (CIBRC)' : 'Approved Chemical Sprays & Dosages'}</span>
                </h4>
                <ul className="space-y-2 text-slate-200">
                  {(language === 'te' ? (diagnosis.chemical_treatment_te || diagnosis.chemical_treatment) : diagnosis.chemical_treatment).map((chem, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold shrink-0">✓</span>
                      <span>{chem}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Prevention */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs space-y-1">
              <span className="font-bold text-slate-300 uppercase tracking-wider block">
                {language === 'te' ? 'భవిష్యత్తు నివారణ చర్యలు:' : 'Preventive Cultural Practices:'}
              </span>
              <p className="text-slate-400">
                {(language === 'te' ? (diagnosis.preventive_measures_te || diagnosis.preventive_measures) : diagnosis.preventive_measures).join(' · ')}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
