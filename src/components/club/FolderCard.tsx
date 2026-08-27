'use client';

import React from 'react';
import { AdvantageFolder } from '@/types/tenant';
import {
  Percent,
  Gift,
  Ticket,
  BadgePercent,
  Briefcase,
  Wrench,
  ChevronRight,
} from 'lucide-react';

interface FolderCardProps {
  folder: AdvantageFolder;
  onClick: () => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Percent':
        return <Percent className="w-5 h-5 text-white" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-white" />;
      case 'Ticket':
        return <Ticket className="w-5 h-5 text-white" />;
      case 'BadgePercent':
        return <BadgePercent className="w-5 h-5 text-white" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-white" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-white" />;
      default:
        return <Gift className="w-5 h-5 text-white" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className="relative w-full text-left transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg active:scale-98 group focus:outline-hidden"
    >
      {/* Folder Tab (Aba superior de pasta física) */}
      <div className="relative">
        <div
          className="w-16 h-3.5 rounded-t-xl"
          style={{ backgroundColor: folder.color }}
        />
      </div>

      {/* Main Folder Body */}
      <div
        className="w-full rounded-2xl rounded-tl-none p-3.5 text-white shadow-md relative overflow-hidden min-h-[102px] flex flex-col justify-between"
        style={{ backgroundColor: folder.color }}
      >
        {/* Top Row: Icon + Count */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center">
            {getIcon(folder.icon)}
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
            {folder.count} {folder.count === 1 ? 'item' : 'itens'}
          </span>
        </div>

        {/* Title & Subtitle matching Mockup */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-tight leading-snug line-clamp-1">
            {folder.title}
          </h4>
          <p className="text-[9.5px] text-white/90 font-medium leading-tight line-clamp-2 mt-0.5">
            {folder.subtitle}
          </p>
        </div>

        {/* Subtle decorative background shine */}
        <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
      </div>
    </button>
  );
};
