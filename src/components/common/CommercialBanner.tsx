'use client';

import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useTenant } from './ThemeProvider';

interface CommercialBannerProps {
  onOpenAdvertise: () => void;
}

export const CommercialBanner: React.FC<CommercialBannerProps> = ({ onOpenAdvertise }) => {
  const { tenant } = useTenant();

  return (
    <div className="w-full mb-5">
      {/* Banner matching the Mockup Bottom Floating Commercial Bar */}
      <div className="relative w-full rounded-3xl p-3 bg-gradient-to-r from-slate-900 via-[#002D5A] to-slate-900 text-white shadow-xl border-2 border-slate-700/50 flex items-center justify-between gap-3 overflow-hidden">
        {/* WhatsApp Icon with Colorful Vibrant Ring matching Mockup */}
        <div className="relative shrink-0">
          <div className="w-13 h-13 rounded-full p-1 bg-gradient-to-tr from-emerald-400 via-amber-400 to-rose-500 flex items-center justify-center animate-pulse">
            <div className="w-full h-full rounded-full bg-[#25D366] flex items-center justify-center shadow-md">
              <MessageCircle className="w-7 h-7 text-white fill-white" />
            </div>
          </div>
        </div>

        {/* Text Details matching Mockup */}
        <div className="flex-1 min-w-0 pr-1">
          <h4 className="font-black text-[11.5px] uppercase tracking-tight text-amber-300 leading-tight">
            ANUNCIE AQUI PARA MAIS DE {tenant.residentCount.toLocaleString('pt-BR')} MORADORES!
          </h4>
          <p className="text-[9.5px] font-bold text-slate-200 mt-0.5 tracking-wider uppercase">
            CONTATO: {tenant.emergencyContacts.whatsappComercial || '0800 777 1444'}
          </p>
        </div>

        {/* Action Button: "SAIBA MAIS" matching Mockup */}
        <button
          onClick={onOpenAdvertise}
          className="shrink-0 py-2 px-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-[10.5px] uppercase tracking-wider rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
        >
          SAIBA MAIS
        </button>

        {/* Background Glow */}
        <div className="absolute -left-10 -bottom-10 w-24 h-24 rounded-full bg-emerald-500/20 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};
