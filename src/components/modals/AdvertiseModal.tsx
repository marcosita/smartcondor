'use client';

import React, { useState } from 'react';
import { useTenant } from '../common/ThemeProvider';
import {
  X,
  MessageCircle,
  Building,
  User,
  Phone,
  Tag,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AdvertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvertiseModal: React.FC<AdvertiseModalProps> = ({ isOpen, onClose }) => {
  const { tenant } = useTenant();

  const [formType, setFormType] = useState<'morador' | 'empresa_externa'>('morador');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Serviços e Consultorias');
  const [phone, setPhone] = useState('');
  const [lot, setLot] = useState('');
  const [proposal, setProposal] = useState('');

  if (!isOpen) return null;

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const isMorador = formType === 'morador';
    const message = `*SOLICITAÇÃO DE ANÚNCIO - SMARTCONDO (${tenant.name.toUpperCase()})*
----------------------------------
👤 *Nome:* ${name}
🏢 *Empresa / Serviço:* ${businessName}
📂 *Categoria:* ${category}
📱 *Telefone/WhatsApp:* ${phone}
🏡 *Tipo:* ${isMorador ? `Morador Residencial (Lote: ${lot})` : 'Empresa / Parceiro Externo'}
🎁 *Proposta / Benefício:* ${proposal || 'Quero negociar tabela de anúncio'}
----------------------------------
Enviado através da plataforma: smartcondor.isol.com.br`;

    const cleanNumber = tenant.emergencyContacts.whatsappComercial || '5516999991444';
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Anuncie para {tenant.residentCount.toLocaleString('pt-BR')} Moradores
              </h3>
              <p className="text-xs text-slate-500">
                Canal oficial de captação do {tenant.name}
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

        {/* Type Selector (Morador vs Empresa) */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setFormType('morador')}
            className={`py-2 rounded-xl transition-all ${
              formType === 'morador'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sou Morador (Grátis)
          </button>

          <button
            type="button"
            onClick={() => setFormType('empresa_externa')}
            className={`py-2 rounded-xl transition-all ${
              formType === 'empresa_externa'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Empresa Externa / Parceiro
          </button>
        </div>

        {formType === 'morador' && (
          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 mb-4 text-xs text-purple-900">
            ⭐ <strong>Regra Comunitária:</strong> O anúncio no <em>Indicador Profissional do Morador</em> é <strong>100% gratuito</strong> para proprietários e residentes do condomínio.
          </div>
        )}

        <form onSubmit={handleSendToWhatsApp} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Seu Nome Completo
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Dr. Marcelo Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Nome da Empresa / Profissão
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Silva Arquitetura & Reformas"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                WhatsApp de Contato
              </label>
              <input
                type="text"
                required
                placeholder="(16) 99999-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {formType === 'morador' ? (
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Seu Lote / Alameda
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lote 142 - Acácias"
                  value={lot}
                  onChange={(e) => setLot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>
            ) : (
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Pasta de Interesse
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option>Ofertas & Descontos</option>
                  <option>Brindes (Compre e Ganhe)</option>
                  <option>Sorteios Promocionais</option>
                  <option>Cashback Comunitário</option>
                  <option>Serviços Homologados</option>
                  <option>Banner Principal de Topo</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Descreva seu Serviço ou Oferta Exclusiva
            </label>
            <textarea
              rows={3}
              placeholder="Ex: Ofereço 15% de desconto para moradores em consultoria e projetos..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Enviar Solicitação via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
