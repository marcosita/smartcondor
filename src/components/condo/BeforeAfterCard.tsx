'use client';

import React, { useState } from 'react';
import { BeforeAfterItem } from '@/types/tenant';
import { BeforeAfterModal } from './BeforeAfterModal';
import { Sparkles, ArrowRight } from 'lucide-react';

interface BeforeAfterCardProps {
  item: BeforeAfterItem;
}

export const BeforeAfterCard: React.FC<BeforeAfterCardProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-3xl p-3.5 shadow-sm border border-slate-100 mb-3">
      {/* Side-by-side image preview matching the Mockup */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200">
          <img
            src={item.beforeImageUrl}
            alt="Antes"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <span className="absolute bottom-1.5 left-1.5 bg-black/75 backdrop-blur-xs text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
            Antes
          </span>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200">
          <img
            src={item.afterImageUrl}
            alt="Depois"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <span className="absolute bottom-1.5 left-1.5 bg-[#00B050] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
            Depois
          </span>
        </div>
      </div>

      {/* Title & Description matching Mockup */}
      <div className="px-1 mb-3">
        <h4 className="font-black text-xs uppercase tracking-tight text-slate-900 leading-tight">
          {item.title}
        </h4>
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mt-0.5">
          Fotos & Prestação de Contas.
        </p>
      </div>

      {/* Action Button matching Mockup: "VER DETALHES & RELATÓRIO." */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 px-4 rounded-full border-2 border-slate-700 hover:border-slate-900 bg-transparent hover:bg-slate-50 text-slate-800 font-extrabold text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-[0.99]"
      >
        <span>VER DETALHES & RELATÓRIO.</span>
      </button>

      {/* Detailed Modal */}
      <BeforeAfterModal item={item} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
