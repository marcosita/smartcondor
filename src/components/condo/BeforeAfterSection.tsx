'use client';

import React from 'react';
import { BeforeAfterItem } from '@/types/tenant';
import { BeforeAfterCard } from './BeforeAfterCard';

interface BeforeAfterSectionProps {
  items: BeforeAfterItem[];
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ items }) => {
  return (
    <section className="w-full mb-4">
      {/* Section Header matching Mockup: "MULTIMÍDIA: ANTES E DEPOIS" */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
          MULTIMÍDIA: ANTES E DEPOIS
        </h3>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          {items.length} Obras Registradas
        </span>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {items.map((item) => (
          <BeforeAfterCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
