'use client';

import React, { useState } from 'react';
import { useTenant } from '../common/ThemeProvider';
import {
  X,
  ShieldCheck,
  KeyRound,
  CalendarPlus,
  ImagePlus,
  Store,
  Users,
  BarChart3,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddEvent: () => void;
  onOpenAddBeforeAfter: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAddEvent,
  onOpenAddBeforeAfter,
}) => {
  const { tenant } = useTenant();

  // 2FA Security Token simulation
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [weatherWidgetEnabled, setWeatherWidgetEnabled] = useState(true);
  const [exchangeWidgetEnabled, setExchangeWidgetEnabled] = useState(true);

  if (!isOpen) return null;

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFactorToken.length >= 4 || twoFactorToken === '1234') {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Token inválido. Digite qualquer código de 4 ou 6 dígitos para testar.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white w-full max-w-md h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">
                  Painel do Síndico / Gestão
                </h3>
                <p className="text-xs text-slate-400">
                  {tenant.name} • Acesso Seguro
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* 2FA Token Login Screen */
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 my-4">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4" />
                <span>Autenticação 2FA Obrigatória</span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Por segurança, o acesso à publicação de acontecimentos e antes/depois requer validação por token de 2 fatores.
              </p>

              <form onSubmit={handleVerify2FA} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Código de Acesso 2FA / Token
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Digite o código (ex: 1234)"
                    value={twoFactorToken}
                    onChange={(e) => setTwoFactorToken(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono tracking-widest text-center text-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                  {errorMessage && (
                    <span className="text-[10px] text-red-400 mt-1 block">{errorMessage}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Validar Token & Entrar
                </button>
              </form>

              <div className="mt-3 text-[10px] text-slate-400 text-center">
                💡 Dica de demonstração: clique em <strong>Validar</strong> diretamente ou use <code>1234</code>.
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/60 rounded-2xl border border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sessão 2FA Autenticada como Síndico</span>
                </div>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-[10px] text-slate-400 hover:text-white underline"
                >
                  Sair
                </button>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Publicações Rápidas
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddEvent();
                    }}
                    className="p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 rounded-2xl text-left transition-all group"
                  >
                    <CalendarPlus className="w-5 h-5 text-blue-400 mb-1.5 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-xs text-white">Novo Evento/Obra</div>
                    <div className="text-[10px] text-slate-400">Publicar no calendário</div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenAddBeforeAfter();
                    }}
                    className="p-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 rounded-2xl text-left transition-all group"
                  >
                    <ImagePlus className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-xs text-white">Novo Antes/Depois</div>
                    <div className="text-[10px] text-slate-400">Fotos e custos de obras</div>
                  </button>
                </div>
              </div>

              {/* Widgets Management */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Controle de Widgets da Capa
                </h4>

                <div className="flex items-center justify-between text-xs">
                  <span>Widget de Previsão do Tempo ({tenant.city})</span>
                  <button
                    onClick={() => setWeatherWidgetEnabled(!weatherWidgetEnabled)}
                    className="text-blue-400"
                  >
                    {weatherWidgetEnabled ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-500" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700/50">
                  <span>Widget de Cotações (Dólar, Euro, Ibovespa)</span>
                  <button
                    onClick={() => setExchangeWidgetEnabled(!exchangeWidgetEnabled)}
                    className="text-blue-400"
                  >
                    {exchangeWidgetEnabled ? (
                      <ToggleRight className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Metrics Box */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    Engajamento Comunitário
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-700">
                    <div className="text-lg font-black text-white">{tenant.residentCount}</div>
                    <div className="text-[9px] text-slate-400 uppercase">Moradores Conectados</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-700">
                    <div className="text-lg font-black text-emerald-400">94.8%</div>
                    <div className="text-[9px] text-slate-400 uppercase">Taxa de Abertura</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center">
          SmartCondo SaaS Engine • Storne Master Admin
        </div>
      </div>
    </div>
  );
};
