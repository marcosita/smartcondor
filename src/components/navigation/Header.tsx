'use client';

import React, { useState } from 'react';
import { CondoLogo } from '../common/CondoLogo';
import { useTenant } from '../common/ThemeProvider';
import { Shield, PhoneCall, Building2, Bell } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenEmergency: () => void;
  onOpenTenantSelector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmin,
  onOpenEmergency,
  onOpenTenantSelector,
}) => {
  const { tenant } = useTenant();

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100 shadow-xs">
      {/* Top Utility Bar */}
      <div className="max-w-md mx-auto px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100/60">
        <button
          onClick={onOpenTenantSelector}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors font-medium"
        >
          <Building2 className="w-3.5 h-3.5 text-blue-500" />
          <span className="truncate max-w-[170px]">{tenant.name}</span>
          <span className="text-[9px] bg-slate-100 px-1 py-0.5 rounded text-slate-600 ml-0.5">Trocar</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Emergency / Phone Button */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold transition-colors"
            title="Contatos de Emergência e Portaria"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Portaria 24h</span>
          </button>

          {/* Admin Panel Access Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-2 py-0.5 rounded-full font-medium transition-all"
            title="Acesso Síndico / Gestão"
          >
            <Shield className="w-3 h-3 text-slate-700" />
            <span className="text-[10px]">Síndico</span>
          </button>
        </div>
      </div>

      {/* Main Branding Section matching Mockup */}
      <div className="max-w-md mx-auto px-4 py-3 flex flex-col items-center justify-center">
        <CondoLogo tenant={tenant} size="md" />
      </div>
    </header>
  );
};
