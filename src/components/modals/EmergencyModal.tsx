'use client';

import React from 'react';
import { useTenant } from '../common/ThemeProvider';
import {
  X,
  PhoneCall,
  Shield,
  Building,
  MessageCircle,
  AlertTriangle,
  Flame,
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { tenant } = useTenant();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Contatos & Emergência 24h
              </h3>
              <p className="text-xs text-slate-500">
                {tenant.name} - {tenant.city}
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

        <div className="space-y-2.5 mb-5">
          {/* Portaria 24h */}
          <a
            href={`tel:${tenant.emergencyContacts.portaria.replace(/\D/g, '')}`}
            className="p-3 bg-red-50 hover:bg-red-100 rounded-2xl border border-red-200 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-red-950 uppercase">Portaria Principal 24h</div>
                <div className="text-sm font-black text-red-700">{tenant.emergencyContacts.portaria}</div>
              </div>
            </div>
            <span className="text-xs font-bold text-red-600 group-hover:underline">Ligar Agora</span>
          </a>

          {/* Segurança e Ronda */}
          <a
            href={`tel:${tenant.emergencyContacts.seguranca.replace(/\D/g, '')}`}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-xs">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-slate-900 uppercase">Segurança Armada & Ronda</div>
                <div className="text-sm font-black text-slate-700">{tenant.emergencyContacts.seguranca}</div>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:underline">Ligar Agora</span>
          </a>

          {/* Administração */}
          <a
            href={`tel:${tenant.emergencyContacts.administracao.replace(/\D/g, '')}`}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-slate-900 uppercase">Administração Predial</div>
                <div className="text-sm font-black text-blue-700">{tenant.emergencyContacts.administracao}</div>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-700 group-hover:underline">Ligar Agora</span>
          </a>
        </div>

        {/* Public Emergencies (SAMU, Bombeiros, PM) */}
        <div className="p-3 bg-slate-100 rounded-2xl">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Serviços Públicos de Emergência
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <a href="tel:190" className="p-2 bg-white rounded-xl border border-slate-200 font-black text-slate-800 hover:bg-slate-50">
              🚓 190 PM
            </a>
            <a href="tel:192" className="p-2 bg-white rounded-xl border border-slate-200 font-black text-slate-800 hover:bg-slate-50">
              🚑 192 SAMU
            </a>
            <a href="tel:193" className="p-2 bg-white rounded-xl border border-slate-200 font-black text-slate-800 hover:bg-slate-50">
              🚒 193 Bombeiros
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
