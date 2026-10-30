import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calculator, TrendingUp, IndianRupee, PieChart, Sparkles, RefreshCcw } from 'lucide-react';

export const ProfitCalculatorModule: React.FC = () => {
  const { user, language, t } = useAuth();

  // Inputs
  const [landAcres, setLandAcres] = useState<number>(user?.farm_size_acres || 4.0);
  const [seedCostPerAcre, setSeedCostPerAcre] = useState<number>(3500);
  const [fertCostPerAcre, setFertCostPerAcre] = useState<number>(8500);
  const [laborCostPerAcre, setLaborCostPerAcre] = useState<number>(9000);
  const [machineCostPerAcre, setMachineCostPerAcre] = useState<number>(4500);
  const [irrigCostPerAcre, setIrrigCostPerAcre] = useState<number>(2000);
  const [expectedYieldPerAcre, setExpectedYieldPerAcre] = useState<number>(32); // quintals/acre
  const [sellingPricePerQuintal, setSellingPricePerQuintal] = useState<number>(2850); // ₹/quintal

  // Presets
  const applyPreset = (crop: 'paddy' | 'chilli' | 'cotton') => {
    if (crop === 'paddy') {
      setSeedCostPerAcre(2800);
      setFertCostPerAcre(7500);
      setLaborCostPerAcre(8000);
      setMachineCostPerAcre(4000);
      setIrrigCostPerAcre(2500);
      setExpectedYieldPerAcre(34);
      setSellingPricePerQuintal(2850);
    } else if (crop === 'chilli') {
      setSeedCostPerAcre(12000);
      setFertCostPerAcre(24000);
      setLaborCostPerAcre(28000);
      setMachineCostPerAcre(6000);
      setIrrigCostPerAcre(3500);
      setExpectedYieldPerAcre(24);
      setSellingPricePerQuintal(21500);
    } else if (crop === 'cotton') {
      setSeedCostPerAcre(3500);
      setFertCostPerAcre(11000);
      setLaborCostPerAcre(14000);
      setMachineCostPerAcre(5000);
      setIrrigCostPerAcre(2000);
      setExpectedYieldPerAcre(14);
      setSellingPricePerQuintal(7600);
    }
  };

  // Calculations
  const costPerAcre = seedCostPerAcre + fertCostPerAcre + laborCostPerAcre + machineCostPerAcre + irrigCostPerAcre;
  const totalCost = costPerAcre * landAcres;
  const totalYieldQuintals = expectedYieldPerAcre * landAcres;
  const grossRevenue = totalYieldQuintals * sellingPricePerQuintal;
  const netProfit = grossRevenue - totalCost;
  const netProfitPerAcre = netProfit / (landAcres || 1);
  const roiPercent = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Agri-Economic Feasibility Forecaster</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.calcHeader}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {t.calcSubtitle}
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Load Crop Model:</span>
            <button
              onClick={() => applyPreset('paddy')}
              className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 font-semibold"
            >
              Paddy (వరి)
            </button>
            <button
              onClick={() => applyPreset('chilli')}
              className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 font-semibold"
            >
              Chilli (మిర్చి)
            </button>
            <button
              onClick={() => applyPreset('cotton')}
              className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 font-semibold"
            >
              Cotton (పత్తి)
            </button>
          </div>
        </div>

        {/* Results Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-[#092b1f]/85 border border-emerald-800/50 backdrop-blur-md">
            <span className="text-[11px] text-slate-400 block mb-1">{t.calcTotalInvest}</span>
            <div className="text-2xl font-extrabold text-white">
              ₹{totalCost.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              ₹{costPerAcre.toLocaleString('en-IN')} / Acre
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#092b1f]/85 border border-emerald-800/50 backdrop-blur-md">
            <span className="text-[11px] text-slate-400 block mb-1">{t.calcGrossIncome}</span>
            <div className="text-2xl font-extrabold text-emerald-300">
              ₹{grossRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-400/90 mt-1">
              {totalYieldQuintals.toFixed(1)} Quintals Total
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950 to-[#083022] border border-emerald-500/50 backdrop-blur-md shadow-lg">
            <span className="text-[11px] text-emerald-300 font-bold block mb-1">{t.calcNetProfit}</span>
            <div className="text-2xl font-extrabold text-emerald-400">
              ₹{netProfit.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-200 mt-1">
              ₹{Math.round(netProfitPerAcre).toLocaleString('en-IN')} / Acre
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#092b1f]/85 border border-emerald-800/50 backdrop-blur-md">
            <span className="text-[11px] text-slate-400 block mb-1">{t.calcRoi}</span>
            <div className="text-2xl font-extrabold text-teal-300">
              {roiPercent.toFixed(1)}%
            </div>
            <div className="text-[10px] text-teal-300/80 mt-1">
              {roiPercent > 50 ? 'High Profitability' : 'Moderate Yield'}
            </div>
          </div>

        </div>

        {/* Input Parameters Form */}
        <div className="rounded-3xl bg-[#092b1f]/80 border border-emerald-800/40 p-6 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {language === 'te' ? 'పెట్టుబడి & దిగుబడి పారామీటర్లు' : 'Cost Breakdown & Yield Parameters'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcLandAcres}</label>
              <input
                type="number"
                step="0.5"
                value={landAcres}
                onChange={(e) => setLandAcres(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcSeedCost}</label>
              <input
                type="number"
                value={seedCostPerAcre}
                onChange={(e) => setSeedCostPerAcre(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcFertCost}</label>
              <input
                type="number"
                value={fertCostPerAcre}
                onChange={(e) => setFertCostPerAcre(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcLaborCost}</label>
              <input
                type="number"
                value={laborCostPerAcre}
                onChange={(e) => setLaborCostPerAcre(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcMachineCost}</label>
              <input
                type="number"
                value={machineCostPerAcre}
                onChange={(e) => setMachineCostPerAcre(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcIrrigCost}</label>
              <input
                type="number"
                value={irrigCostPerAcre}
                onChange={(e) => setIrrigCostPerAcre(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcYield}</label>
              <input
                type="number"
                value={expectedYieldPerAcre}
                onChange={(e) => setExpectedYieldPerAcre(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-semibold mb-1">{t.calcPrice}</label>
              <input
                type="number"
                value={sellingPricePerQuintal}
                onChange={(e) => setSellingPricePerQuintal(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
