'use client';

import React from 'react';
import { MainTabType } from '../navigation/TabNavigation';
import {
  Building,
  Sparkles,
  Calendar,
  Layers,
  MessageCircle,
  Shield,
  Palette,
} from 'lucide-react';

interface BottomNavProps {
  activeTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
  onOpenAdvertise: () => void;
  onOpenAdmin: () => void;
  onOpenThemeCustomizer: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onOpenAdvertise,
  onOpenAdmin,
  onOpenThemeCustomizer,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl py-2 px-4">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Tab 1: Condomínio */}
        <button
          onClick={() => onChangeTab('condominio')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'condominio'
              ? 'text-[#0084D1] font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <Building className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Informativo</span>
        </button>

        {/* Tab 2: Clube de Vantagens */}
        <button
          onClick={() => onChangeTab('clube_vantagens')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'clube_vantagens'
              ? 'text-[#00B050] font-extrabold scale-105'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Vantagens</span>
        </button>

        {/* Action: Anunciar WhatsApp */}
        <button
          onClick={onOpenAdvertise}
          className="flex flex-col items-center gap-1 text-emerald-600 hover:text-emerald-700 font-extrabold group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center -mt-3 shadow-md border-2 border-white transition-all transform group-hover:scale-110">
            <MessageCircle className="w-4 h-4 fill-white" />
          </div>
          <span className="text-[10px] text-emerald-700 font-extrabold">Anunciar</span>
        </button>

        {/* Action: Customizer Cores */}
        <button
          onClick={onOpenThemeCustomizer}
          className="flex flex-col items-center gap-1 text-amber-600 hover:text-amber-700 font-medium transition-all"
        >
          <Palette className="w-5 h-5" />
          <span className="text-[10px]">Temas</span>
        </button>

        {/* Action: Síndico / Gestão */}
        <button
          onClick={onOpenAdmin}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-600 font-medium transition-all"
        >
          <Shield className="w-5 h-5" />
          <span className="text-[10px]">Síndico</span>
        </button>
      </div>
    </div>
  );
};
