'use client';

import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, DollarSign, TrendingUp, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useTenant } from '../common/ThemeProvider';

export const WeatherExchangeWidget: React.FC = () => {
  const { tenant } = useTenant();
  const [isOpen, setIsOpen] = useState(false);

  // Simulated live economic and weather data
  const [weather] = useState({
    temp: 29,
    condition: 'Ensolarado',
    humidity: '48%',
    city: tenant.widgetSettings.weatherCity || 'Araraquara, SP',
  });

  const [rates] = useState({
    dollar: '5.42',
    dollarChange: '+0.15%',
    euro: '5.89',
    euroChange: '-0.08%',
    ibov: '136.850 pts',
    ibovChange: '+0.62%',
  });

  return (
    <div className="w-full mb-3">
      {/* Mini Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-[11px] font-medium text-slate-600 transition-all shadow-xs"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Sun className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{weather.city.split(',')[0]} {weather.temp}°C</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 text-emerald-600 font-semibold">
            <span>USD: R$ {rates.dollar}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <span className="text-[10px] uppercase tracking-wider">Indicadores</span>
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </div>
      </button>

      {/* Expanded Widget */}
      {isOpen && (
        <div className="mt-2 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Weather Box */}
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-amber-900 uppercase">Tempo Local</span>
                <Sun className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-lg font-black text-slate-900">{weather.temp}°C</div>
              <div className="text-[10px] text-slate-600">{weather.condition} • Umid: {weather.humidity}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{weather.city}</div>
            </div>

            {/* Financial Box */}
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-emerald-900 uppercase">Câmbio & Bolsa</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-0.5 text-[10px]">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Dólar Comercial:</span>
                  <span className="font-bold text-slate-900">R$ {rates.dollar}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Euro Comercial:</span>
                  <span className="font-bold text-slate-900">R$ {rates.euro}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Ibovespa:</span>
                  <span className="font-bold text-emerald-600">{rates.ibov}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
