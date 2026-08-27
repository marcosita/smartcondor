'use client';

import React from 'react';
import { Building, Sparkles, FolderHeart } from 'lucide-react';

export type MainTabType = 'condominio' | 'clube_vantagens';

interface TabNavigationProps {
  activeTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="w-full mb-4">
      {/* Segmented Controller matching the Mockup Headers */}
      <div className="grid grid-cols-2 p-1 bg-slate-200/70 backdrop-blur-md rounded-2xl border border-slate-300/40 shadow-inner">
        <button
          onClick={() => onChangeTab('condominio')}
          className={`relative py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'condominio'
              ? 'bg-white text-[#002D5A] shadow-md scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building className="w-4 h-4 text-[#0084D1]" />
          <span>CONDOMÍNIO</span>
          {activeTab === 'condominio' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#0084D1] ml-0.5" />
          )}
        </button>

        <button
          onClick={() => onChangeTab('clube_vantagens')}
          className={`relative py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'clube_vantagens'
              ? 'bg-white text-[#002D5A] shadow-md scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#00B050]" />
          <span>CLUBE DE VANTAGENS</span>
          {activeTab === 'clube_vantagens' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B050] ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};
