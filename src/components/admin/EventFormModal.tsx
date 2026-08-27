'use client';

import React, { useState } from 'react';
import { CalendarEvent, EventType } from '@/types/tenant';
import { X, Calendar, Plus, Clock, MapPin, Tag } from 'lucide-react';

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CalendarEvent) => void;
}

export const EventFormModal: React.FC<EventFormModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>('evento');
  const [date, setDate] = useState('2026-10-20');
  const [time, setTime] = useState('19:00');
  const [location, setLocation] = useState('Salão Social / Clube');
  const [organizer, setOrganizer] = useState('Comissão Social');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      tenantId: 'damha-1-araraquara',
      title,
      type,
      date,
      time,
      location,
      organizer,
      description,
      status: 'agendado',
    };
    onAddEvent(newEvent);
    alert('Novo evento/obra cadastrado com sucesso no calendário!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Novo Acontecimento / Obra
              </h3>
              <p className="text-xs text-slate-500">
                Publicar no calendário oficial do condomínio
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

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Título do Acontecimento
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Torneio de Beach Tennis / Dedetização das Caixas d'água"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Categoria
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EventType)}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-bold"
              >
                <option value="evento">🔵 Evento Social</option>
                <option value="acao">🟢 Ação / Manutenção</option>
                <option value="obra">🟡 Obra / Melhoria</option>
                <option value="assembleia">🟡 Assembleia Geral</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Data
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Horário
              </label>
              <input
                type="text"
                placeholder="Ex: 08:00 às 17:00"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Local
              </label>
              <input
                type="text"
                placeholder="Ex: Quadras / Alameda 3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Comissão Organizadora / Responsável
            </label>
            <input
              type="text"
              placeholder="Ex: Diretoria de Obras / Síndico Geral"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Descrição & Informações para os Moradores
            </label>
            <textarea
              rows={3}
              required
              placeholder="Descreva detalhes, recomendações e impacto para as residências..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar no Calendário</span>
          </button>
        </form>
      </div>
    </div>
  );
};
