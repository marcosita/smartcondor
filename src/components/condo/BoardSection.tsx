'use client';

import React from 'react';
import { BoardMember } from '@/types/tenant';
import { useTenant } from '../common/ThemeProvider';
import { ShieldCheck, Mail, Phone, Building, Sparkles } from 'lucide-react';

interface BoardSectionProps {
  board: BoardMember[];
}

export const BoardSection: React.FC<BoardSectionProps> = ({ board }) => {
  const { tenant } = useTenant();

  return (
    <footer className="w-full mt-6 pt-6 border-t border-slate-200">
      {/* Board & Council Section */}
      <div className="mb-6">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 mb-3 px-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Gestão & Representação Legal</span>
        </h4>

        <div className="grid grid-cols-1 gap-2.5">
          {board.map((member) => (
            <div
              key={member.id}
              className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-xs text-slate-900 leading-tight">
                    {member.name}
                  </div>
                  <div className="text-[10px] font-semibold text-blue-700 mt-0.5">
                    {member.roleTitle}
                  </div>
                </div>
              </div>

              {member.contact && (
                <a
                  href={`tel:${member.contact.replace(/\D/g, '')}`}
                  className="text-[10px] font-bold text-slate-500 hover:text-blue-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100"
                >
                  {member.contact}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Storne Footer matching Briefing */}
      <div className="p-4 bg-slate-900 text-slate-400 rounded-3xl text-center space-y-2 mb-6">
        <div className="flex items-center justify-center gap-1.5 text-xs text-white font-extrabold tracking-wide">
          <span>{tenant.name}</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400">Associação Ativa</span>
        </div>

        <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-relaxed">
          {tenant.welcomeMessage}
        </p>

        <div className="pt-2 border-t border-slate-800 flex flex-col items-center justify-center gap-1 text-[9.5px]">
          <div className="flex items-center gap-1 text-slate-300 font-semibold">
            <span>Tecnologia & Infraestrutura:</span>
            <span className="text-white font-black tracking-wider uppercase">STORNE</span>
          </div>
          <span className="text-slate-500">
            Plataforma SaaS Multi-Tenant • Domínio Oficial: smartcondor.isol.com.br
          </span>
        </div>
      </div>
    </footer>
  );
};
