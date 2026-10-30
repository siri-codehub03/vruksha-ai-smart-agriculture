import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CROP_RECOMMENDATIONS_DATA } from '../data/mockAgricultureData';
import { Trees, Filter, Award, Droplets, Clock, TrendingUp, Sparkles, Check } from 'lucide-react';

export const CropRecommendationModule: React.FC = () => {
  const { user, language, t } = useAuth();

  const [soilFilter, setSoilFilter] = useState(user?.soil_type || 'Black Cotton Soil');
  const [seasonFilter, setSeasonFilter] = useState<'Kharif' | 'Rabi' | 'Zaid' | 'All'>('Kharif');
  const [waterFilter, setWaterFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');

  const filteredCrops = CROP_RECOMMENDATIONS_DATA.filter((crop) => {
    if (seasonFilter !== 'All' && crop.season !== seasonFilter && crop.season !== 'All Season') return false;
    if (waterFilter !== 'All' && crop.water_requirement !== waterFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="pb-4 border-b border-emerald-900/50">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Trees className="w-4 h-4" />
            <span>Intelligent Agronomic Matching Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t.cropRecHeader}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {t.cropRecSubtitle}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="rounded-2xl bg-[#092b1f]/80 border border-emerald-800/40 p-4 sm:p-5 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            {/* Soil Type Filter */}
            <div>
              <label className="block text-emerald-200 font-semibold mb-1.5">{t.filterSoilType}</label>
              <select
                value={soilFilter}
                onChange={(e) => setSoilFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Black Cotton Soil">Black Cotton Soil (నల్లరేగడి నేల)</option>
                <option value="Red Loamy Soil">Red Loamy Soil (ఎర్ర నేలలు)</option>
                <option value="Sandy Loam">Sandy Loam (ఇసుక నేలలు)</option>
                <option value="Clayey Loam">Clayey Loam (బంకమట్టి నేల)</option>
              </select>
            </div>

            {/* Season Filter */}
            <div>
              <label className="block text-emerald-200 font-semibold mb-1.5">{t.filterSeason}</label>
              <select
                value={seasonFilter}
                onChange={(e) => setSeasonFilter(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Kharif">Kharif (ఖరీఫ్ - Monsoon)</option>
                <option value="Rabi">Rabi (రబీ - Winter)</option>
                <option value="Zaid">Zaid (జైద్ - Summer)</option>
                <option value="All">All Seasons (అన్ని కాలాలు)</option>
              </select>
            </div>

            {/* Water Availability */}
            <div>
              <label className="block text-emerald-200 font-semibold mb-1.5">{t.filterWater}</label>
              <select
                value={waterFilter}
                onChange={(e) => setWaterFilter(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="All">Any Water Availability</option>
                <option value="High">High (Canal / Perennial River)</option>
                <option value="Medium">Medium (Borewell / Drip Irrigation)</option>
                <option value="Low">Low (Rainfed / Dryland)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Crops Recommendation Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'te'
                ? `సిఫార్సు చేయబడిన పంటలు (${filteredCrops.length})`
                : `Recommended High-Yield Crops (${filteredCrops.length})`}
            </h2>
            <span className="text-[11px] text-emerald-400 font-mono">
              Soil Target: {soilFilter}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                className="rounded-3xl bg-[#092b1f]/85 border border-emerald-600/30 p-6 backdrop-blur-md shadow-lg hover:border-emerald-400/60 transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      {language === 'te' ? crop.crop_name_te : crop.crop_name}
                    </h3>
                    <div className="text-xs text-emerald-300">
                      {language === 'te' ? crop.crop_name : crop.crop_name_te}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{crop.suitability_score}% Match</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Duration</span>
                    <span className="font-bold text-white">{crop.duration_days}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Water Need</span>
                    <span className="font-bold text-cyan-300">{crop.water_requirement}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Expected Yield</span>
                    <span className="font-bold text-emerald-300">{crop.expected_yield}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-700/30 text-xs space-y-1">
                  <div className="flex justify-between items-center text-emerald-400 font-semibold">
                    <span>{t.profitEstimate}:</span>
                    <span className="text-white font-extrabold text-sm">{crop.expected_profit_per_acre}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">
                    {language === 'te' ? crop.rationale_te : crop.rationale}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
