'use client';

import React from 'react';
import { useTenant } from '../common/ThemeProvider';
import { Building, Check, X, MapPin, Users } from 'lucide-react';

interface TenantSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TenantSelectorModal: React.FC<TenantSelectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { tenant, setTenantSlug, availableTenants } = useTenant();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Seletor de Condomínio (SaaS)
              </h3>
              <p className="text-xs text-slate-500">
                Demonstração da arquitetura White-Label Multi-Tenant
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
          {availableTenants.map((t) => {
            const isSelected = t.slug === tenant.slug;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTenantSlug(t.slug);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-xs"
                    style={{ backgroundColor: t.theme.primaryColor }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 leading-tight">
                      {t.name}
                      {t.slug === 'damha1' && (
                        <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          Piloto Oficial
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {t.city} - {t.state}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {t.residentCount} moradores
                      </span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100">
          💡 Em produção, a resolução do condomínio ocorre automaticamente pelo subdomínio ou URL (ex: <code>damha1.smartcondor.isol.com.br</code> ou <code>smartcondor.isol.com.br/damha1</code>).
        </div>
      </div>
    </div>
  );
};
