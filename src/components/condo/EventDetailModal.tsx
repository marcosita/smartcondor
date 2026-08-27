'use client';

import React from 'react';
import { CalendarEvent } from '@/types/tenant';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Share2,
  CalendarPlus,
  Tag,
} from 'lucide-react';

interface EventDetailModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !event) return null;

  const getTypeBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'evento':
        return {
          label: 'Evento Social & Esportivo',
          bg: 'bg-blue-100 text-blue-800 border-blue-200',
          dot: 'bg-[#0084D1]',
        };
      case 'acao':
        return {
          label: 'Ação de Manutenção Preventiva',
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          dot: 'bg-[#00B050]',
        };
      case 'obra':
        return {
          label: 'Obra & Benfeitoria Estrutural',
          bg: 'bg-amber-100 text-amber-900 border-amber-200',
          dot: 'bg-[#FBB03B]',
        };
      case 'assembleia':
        return {
          label: 'Assembleia Geral / Convocação',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-[#FBB03B]',
        };
      default:
        return {
          label: 'Acontecimento',
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          dot: 'bg-slate-500',
        };
    }
  };

  const badge = getTypeBadge(event.type);

  // Format date to Brazilian format
  const [year, month, day] = event.date.split('-');
  const formattedDate = `${day}/${month}/${year}`;

  const handleShare = () => {
    const text = `*${event.title}* no Residencial Damha 1\n📅 Data: ${formattedDate} ${event.time ? `às ${event.time}` : ''}\n📍 Local: ${event.location || 'Condomínio'}\n\nSaiba mais no app: smartcondor.isol.com.br/damha1`;
    if (navigator.share) {
      navigator.share({ title: event.title, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Informações do evento copiadas para a área de transferência!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
            {badge.label}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-lg text-slate-900 leading-snug mb-3">
          {event.title}
        </h3>

        {/* Info Grid */}
        <div className="space-y-2 mb-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Data: {formattedDate}</span>
          </div>

          {event.time && (
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Horário: {event.time}</span>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Local: {event.location}</span>
            </div>
          )}

          {event.organizer && (
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Organização: {event.organizer}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Descrição & Orientações
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 p-3 rounded-xl">
            {event.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={handleShare}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Compartilhar</span>
          </button>

          <button
            onClick={() => {
              alert(`Evento "${event.title}" agendado com sucesso no seu dispositivo!`);
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Lembrar no Celular</span>
          </button>
        </div>
      </div>
    </div>
  );
};
