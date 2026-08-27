'use client';

import React, { useState } from 'react';
import { AdvantageFolder, AdvantagePartner } from '@/types/tenant';
import { PartnerCard } from './PartnerCard';
import { SorteioInteractive } from './SorteioInteractive';
import {
  X,
  Search,
  PlusCircle,
  Percent,
  Gift,
  Ticket,
  BadgePercent,
  Briefcase,
  Wrench,
  Sparkles,
} from 'lucide-react';

interface FolderDetailModalProps {
  folder: AdvantageFolder | null;
  partners: AdvantagePartner[];
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvertise: () => void;
}

export const FolderDetailModal: React.FC<FolderDetailModalProps> = ({
  folder,
  partners,
  isOpen,
  onClose,
  onOpenAdvertise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen || !folder) return null;

  // Filter partners belonging to this folder category
  const folderPartners = partners.filter(
    (p) =>
      p.folderCategory === folder.id &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Percent':
        return <Percent className="w-5 h-5" />;
      case 'Gift':
        return <Gift className="w-5 h-5" />;
      case 'Ticket':
        return <Ticket className="w-5 h-5" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-50 text-slate-900 w-full max-w-lg rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0"
              style={{ backgroundColor: folder.color }}
            >
              {getIcon(folder.icon)}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                {folder.title}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1">
                {folder.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-3 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Buscar em ${folder.title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {/* Interactive Sorteio widget inside Sorteios folder */}
          {folder.id === 'sorteios' && <SorteioInteractive />}

          {/* Resident Professional Callout inside Indicador Morador folder */}
          {folder.id === 'indicador_morador' && (
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-purple-950 flex items-center justify-between">
              <div className="pr-2">
                <span className="font-extrabold text-xs block">
                  Você é morador e oferece serviços?
                </span>
                <span className="text-[10px] text-purple-700 block mt-0.5">
                  Anúncio 100% gratuito para moradores do condomínio.
                </span>
              </div>
              <button
                onClick={onOpenAdvertise}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-[10px] font-black uppercase whitespace-nowrap shadow-xs"
              >
                Cadastrar
              </button>
            </div>
          )}

          {/* Partner Cards List */}
          {folderPartners.length > 0 ? (
            folderPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">Nenhum parceiro encontrado</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Tente buscar com outros termos ou anuncie o seu estabelecimento!
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA to announce */}
        <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Deseja incluir sua empresa nesta pasta?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenAdvertise();
            }}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-700 underline"
          >
            Quero Anunciar
          </button>
        </div>
      </div>
    </div>
  );
};
