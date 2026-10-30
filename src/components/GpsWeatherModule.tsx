import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_WEATHER_DATA } from '../data/mockAgricultureData';
import { WeatherData } from '../types';
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  CloudRain,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  Sun
} from 'lucide-react';

export const GpsWeatherModule: React.FC = () => {
  const { user, language, t } = useAuth();
  const [weather, setWeather] = useState<WeatherData>({
    ...DEFAULT_WEATHER_DATA,
    city: user ? `${user.village}, ${user.district}` : DEFAULT_WEATHER_DATA.city,
    state: user ? user.state : DEFAULT_WEATHER_DATA.state
  });
  const [gpsLocating, setGpsLocating] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);

  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation not supported by browser.');
      return;
    }

    setGpsLocating(true);
    setGpsStatus(language === 'te' ? 'GPS ఉపగ్రహంతో అనుసంధానిస్తోంది...' : 'Connecting to GPS satellite...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLocating(false);
        const lat = pos.coords.latitude.toFixed(3);
        const lng = pos.coords.longitude.toFixed(3);
        setGpsStatus(
          language === 'te'
            ? `లొకేషన్ గుర్తించబడింది: ${lat}°N, ${lng}°E (ఖచ్చితత్వం: ±${Math.round(pos.coords.accuracy)}m)`
            : `Coordinates verified: ${lat}°N, ${lng}°E (Accuracy ±${Math.round(pos.coords.accuracy)}m)`
        );
      },
      (err) => {
        setGpsLocating(false);
        setGpsStatus(
          language === 'te'
            ? `డిఫాల్ట్ లొకేషన్ ఉపయోగించబడింది (${user?.district || 'Guntur'})`
            : `Using profile location: ${user?.district || 'Guntur'}`
        );
      },
      { timeout: 7000 }
    );
  };

  return (
    <div className="min-h-screen bg-[#071d15] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/50">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <CloudSun className="w-4 h-4" />
              <span>Hyperlocal Agronomy Radar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.weatherHeader}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'te'
                ? 'వ్యవసాయ పనులకు మరియు మందుల పిచికారీకి అనుకూల వాతావరణ అంచనా'
                : 'Real-time weather parameters and agricultural spray safety guidelines'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <button
              onClick={handleDetectGps}
              disabled={gpsLocating}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow transition-all flex items-center gap-2 disabled:opacity-60"
            >
              <MapPin className="w-4 h-4" />
              <span>{gpsLocating ? t.loading : t.weatherUseGps}</span>
            </button>
            {gpsStatus && (
              <span className="text-[11px] text-emerald-300 font-mono">
                {gpsStatus}
              </span>
            )}
          </div>
        </div>

        {/* Current Weather Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#092b1f] via-[#0a3828] to-[#072318] border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 text-xs">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold text-sm text-white">{weather.city}, {weather.state}</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
                  {weather.temperature}°C
                </span>
                <div>
                  <div className="text-base sm:text-lg font-bold text-emerald-300">
                    {language === 'te' ? weather.condition_te : weather.condition}
                  </div>
                  <div className="text-xs text-slate-300">
                    Feels like {weather.feels_like}°C · UV Index: {weather.uv_index}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-teal-400" />
                  <span>{t.weatherHumidity}</span>
                </div>
                <div className="text-lg font-bold text-white">{weather.humidity}%</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.weatherWind}</span>
                </div>
                <div className="text-lg font-bold text-white">{weather.wind_speed_kmh} km/h</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.weatherRainChance}</span>
                </div>
                <div className="text-lg font-bold text-emerald-300">{weather.rain_probability}%</div>
              </div>
            </div>

          </div>

          {/* Spraying Advisory Highlight Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-[#061e16] border border-emerald-600/40 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-0.5">
                {t.weatherSprayAlert}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {language === 'te' ? weather.spray_advisory_te : weather.spray_advisory}
              </p>
            </div>
          </div>
        </div>

        {/* 5-Day Agriculture Forecast */}
        <div className="rounded-3xl bg-[#092b1f]/80 border border-emerald-800/40 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'te' ? 'రాబోయే 5 రోజుల వాతావరణ అంచనా' : '5-Day Field Weather Outlook'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {weather.forecast.map((fc, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/30 text-center space-y-2 hover:border-emerald-600/40 transition-colors"
              >
                <div className="text-xs font-bold text-white">
                  {language === 'te' ? fc.day_te : fc.day}
                </div>
                <div className="flex justify-center text-amber-400 py-1">
                  {fc.rain_chance > 40 ? <CloudRain className="w-6 h-6 text-blue-400" /> : <Sun className="w-6 h-6" />}
                </div>
                <div className="text-sm font-extrabold text-white">
                  {fc.temp_max}° / <span className="text-slate-400 font-normal">{fc.temp_min}°</span>
                </div>
                <div className="text-[11px] text-emerald-300">
                  {fc.condition}
                </div>
                <div className="text-[10px] text-blue-300 font-mono">
                  🌧 {fc.rain_chance}% Rain
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
