'use client';

import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { ThemeCustomizerModal } from './ThemeCustomizerModal';

export const ThemeCustomizerTrigger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-300/40 rounded-full text-xs font-bold transition-all shadow-xs"
        title="Personalizar Cores, Fontes e Temas do SaaS"
      >
        <Palette className="w-3.5 h-3.5 text-amber-600" />
        <span>Personalizar Cores</span>
      </button>

      <ThemeCustomizerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
