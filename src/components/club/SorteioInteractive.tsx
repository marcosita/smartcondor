'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Ticket, Sparkles, Trophy, Check } from 'lucide-react';

export const SorteioInteractive: React.FC = () => {
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTicket = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomNum = Math.floor(100000 + Math.random() * 900000).toString();
      setTicketNumber(randomNum);
      setIsGenerating(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 1200);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-orange-500/10 rounded-2xl border-2 border-amber-300/60 text-center mb-4">
      <div className="flex items-center justify-center gap-1.5 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-1">
        <Trophy className="w-4 h-4 text-amber-600" />
        <span>Cupom Oficial do Morador</span>
      </div>

      <p className="text-[11px] text-slate-600 mb-3">
        Gere seu número da sorte exclusivo para os sorteios mensais do Damha 1:
      </p>

      {ticketNumber ? (
        <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-sm inline-block w-full">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Seu Número da Sorte
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono tracking-widest my-1">
            #{ticketNumber}
          </div>
          <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-700 font-bold">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cadastrado para o Sorteio de Outubro/2026</span>
          </div>
        </div>
      ) : (
        <button
          onClick={handleGenerateTicket}
          disabled={isGenerating}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Validando seu Lote...' : 'Gerar Meu Número da Sorte'}</span>
        </button>
      )}
    </div>
  );
};
