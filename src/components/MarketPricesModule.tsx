import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_MANDI_RATES } from '../data/mockAgricultureData';
import { TrendingUp, Search, ArrowUp, ArrowDown, MapPin, Building, Calendar } from 'lucide-react';

export const MarketPricesModule: React.FC = () => {
  const { language, t } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('All');

  const filteredRates = MOCK_MANDI_RATES.filter((rate) => {
    const matchesSearch =
      rate.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.commodity_te.includes(searchTerm) ||
      rate.market_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedCommodity === 'All' || rate.commodity.toLowerCase().includes(selectedCommodity.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>National Agricultural APMC Market Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.mandiHeader}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {t.mandiSubtitle}
            </p>
          </div>

          <div className="text-xs text-emerald-300/80 font-mono">
            {language === 'te' ? 'తాజా ధరల అప్‌డేట్: నేటి APMC యార్డులు' : 'Daily Official Modal Arrivals'}
          </div>
        </div>

        {/* Search & Commodity Filters */}
        <div className="rounded-2xl bg-[#092b1f]/80 border border-emerald-800/40 p-4 backdrop-blur-md flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchMarket}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            {['All', 'Chilli', 'Paddy', 'Cotton', 'Turmeric'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCommodity(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCommodity === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mandi Rates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRates.map((rate) => (
            <div
              key={rate.id}
              className="rounded-3xl bg-[#092b1f]/85 border border-emerald-600/30 p-6 backdrop-blur-md shadow-lg hover:border-emerald-400/60 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {language === 'te' ? rate.commodity_te : rate.commodity}
                  </h3>
                  <div className="text-xs text-slate-300 font-medium">
                    {rate.variety}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>{rate.market_name}, {rate.district} ({rate.state})</span>
                  </div>
                </div>

                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                  rate.change_percent >= 0
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                }`}>
                  {rate.change_percent >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{rate.change_percent > 0 ? `+${rate.change_percent}%` : `${rate.change_percent}%`}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
                  <span className="text-[10px] text-slate-400 block mb-0.5">{t.minPrice}</span>
                  <span className="font-bold text-slate-200">₹{rate.min_price.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50">
                  <span className="text-[10px] text-emerald-300 block mb-0.5">{t.modalPrice}</span>
                  <span className="font-extrabold text-emerald-300 text-sm">₹{rate.modal_price.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40">
                  <span className="text-[10px] text-slate-400 block mb-0.5">{t.maxPrice}</span>
                  <span className="font-bold text-slate-200">₹{rate.max_price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-emerald-900/40 font-mono">
                <span>Unit: {rate.unit}</span>
                <span>Arrival: {rate.arrival_date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
