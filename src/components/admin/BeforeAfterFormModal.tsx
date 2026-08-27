'use client';

import React, { useState } from 'react';
import { BeforeAfterItem } from '@/types/tenant';
import { X, ImagePlus, Plus, DollarSign, Building } from 'lucide-react';

interface BeforeAfterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBeforeAfter: (item: BeforeAfterItem) => void;
}

export const BeforeAfterFormModal: React.FC<BeforeAfterFormModalProps> = ({
  isOpen,
  onClose,
  onAddBeforeAfter,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infraestrutura & Obras');
  const [description, setDescription] = useState('');
  const [beforeImageUrl, setBeforeImageUrl] = useState('https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80');
  const [afterImageUrl, setAfterImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80');
  const [investmentValue, setInvestmentValue] = useState(85000);
  const [supplierName, setSupplierName] = useState('Paulista Engenharia & Construções');
  const [durationDays, setDurationDays] = useState(30);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: BeforeAfterItem = {
      id: `ba-${Date.now()}`,
      tenantId: 'damha-1-araraquara',
      title,
      category,
      description,
      beforeImageUrl,
      afterImageUrl,
      completionDate: 'Outubro de 2026',
      investmentValue: Number(investmentValue),
      supplierName,
      durationDays: Number(durationDays),
      benefitsList: [
        'Melhoria estética e valorização das residências',
        'Garantia de 5 anos de execução',
        'Aprovado em assembleia geral'
      ]
    };
    onAddBeforeAfter(newItem);
    alert('Nova obra cadastrada com sucesso na Central de Arquivos Antes e Depois!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <ImagePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Nova Obra / Antes e Depois
              </h3>
              <p className="text-xs text-slate-500">
                Central de Arquivos e Prestação de Contas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Título da Obra / Melhoria
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Reforma do Salão de Festas / Pavimentação da Alameda 5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option>Infraestrutura & Obras</option>
                <option>Esportes & Lazer</option>
                <option>Segurança & Portaria</option>
                <option>Sustentabilidade & Energia</option>
                <option>Paisagismo & Urbanismo</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Investimento (R$)
              </label>
              <input
                type="number"
                required
                value={investmentValue}
                onChange={(e) => setInvestmentValue(Number(e.target.value))}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Empresa Executora
              </label>
              <input
                type="text"
                placeholder="Ex: Silva & Filhos Engenharia"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Prazo (Dias)
              </label>
              <input
                type="number"
                placeholder="30"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              URL Foto Antes
            </label>
            <input
              type="url"
              required
              value={beforeImageUrl}
              onChange={(e) => setBeforeImageUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              URL Foto Depois (Concluído)
            </label>
            <input
              type="url"
              required
              value={afterImageUrl}
              onChange={(e) => setAfterImageUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Descrição & Relatório da Obra
            </label>
            <textarea
              rows={3}
              required
              placeholder="Explique o escopo, melhorias realizadas e resultados..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Obra na Central de Arquivos</span>
          </button>
        </form>
      </div>
    </div>
  );
};
