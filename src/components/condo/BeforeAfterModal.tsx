'use client';

import React, { useState } from 'react';
import { BeforeAfterItem } from '@/types/tenant';
import {
  X,
  FileCheck2,
  DollarSign,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  Download,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';

interface BeforeAfterModalProps {
  item: BeforeAfterItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BeforeAfterModal: React.FC<BeforeAfterModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'slider' | 'side_by_side' | 'relatorio'>('side_by_side');

  if (!isOpen || !item) return null;

  const formattedInvestment = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(item.investmentValue);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00B050] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {item.category}
            </span>
            <h3 className="font-extrabold text-base text-slate-900 leading-snug mt-1">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-3 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('side_by_side')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'side_by_side' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Lado a Lado
          </button>
          <button
            onClick={() => setActiveTab('slider')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'slider' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Comparador Interativo
          </button>
          <button
            onClick={() => setActiveTab('relatorio')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              activeTab === 'relatorio' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Prestação de Contas
          </button>
        </div>

        {/* Side by Side Mode */}
        {activeTab === 'side_by_side' && (
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3">
                <img
                  src={item.beforeImageUrl}
                  alt={`Antes - ${item.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  Antes da Obra
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#00B050] bg-slate-100 aspect-4/3 shadow-sm">
                <img
                  src={item.afterImageUrl}
                  alt={`Depois - ${item.title}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute top-2 left-2 bg-[#00B050] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Depois (Concluído)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Comparison Slider */}
        {activeTab === 'slider' && (
          <div className="mb-4">
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden select-none border border-slate-200">
              {/* After image (background) */}
              <img
                src={item.afterImageUrl}
                alt="Depois"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-[#00B050] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                Depois
              </span>

              {/* Before image (clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={item.beforeImageUrl}
                  alt="Antes"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '400px' }}
                />
                <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  Antes
                </span>
              </div>

              {/* Divider line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center text-xs font-bold -ml-0.5">
                  ↔
                </div>
              </div>
            </div>

            {/* Slider Input */}
            <div className="mt-2 px-1">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00B050]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>◀ Arraste para comparar Antes</span>
                <span>Depois ▶</span>
              </div>
            </div>
          </div>
        )}

        {/* Financial & Delivery Metrics Box */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-4 space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-xl bg-white border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Investimento Realizado</div>
              <div className="text-sm font-black text-emerald-700">{formattedInvestment}</div>
            </div>

            <div className="p-2 rounded-xl bg-white border border-slate-200/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Data de Conclusão</div>
              <div className="text-xs font-black text-slate-800">{item.completionDate}</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-600 pt-1">
            <span className="font-medium">Empresa Executora:</span>
            <span className="font-bold text-slate-900">{item.supplierName}</span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="font-medium">Prazo de Execução:</span>
            <span className="font-bold text-slate-900">{item.durationDays} dias</span>
          </div>
        </div>

        {/* Detailed Benefits List */}
        {item.benefitsList && (
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Benefícios & Ganhos Patrimoniais
            </h4>
            <ul className="space-y-1.5">
              {item.benefitsList.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => alert(`Relatório da obra "${item.title}" baixado com sucesso em PDF!`)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Relatório PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
