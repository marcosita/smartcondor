'use client';

import React, { useState } from 'react';
import { CalendarEvent } from '@/types/tenant';
import { ChevronLeft, ChevronRight, Info, Calendar as CalendarIcon } from 'lucide-react';
import { EventDetailModal } from './EventDetailModal';

interface CondoCalendarProps {
  events: CalendarEvent[];
}

export const CondoCalendar: React.FC<CondoCalendarProps> = ({ events }) => {
  // Mock default to October 2026 as shown in the mockup image
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = Outubro
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const months = [
    'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
    'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Generate calendar grid for the month
  // October 2026 starts on Thursday (index 4 in Sun-Sat) and has 31 days
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 1 = Mon...
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Find event on a specific day
  const getEventForDay = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateQuery = `${currentYear}-${monthStr}-${dayStr}`;
    return events.find((e) => e.date === dateQuery);
  };

  const daysOfWeek = ['Sun', 'Dom', 'Mar', 'Qui', 'Sex', 'Sat', 'San']; // As displayed on the mockup layout header

  return (
    <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-100 mb-4">
      {/* Calendar Header with Navigation matching Mockup */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          onClick={handlePrevMonth}
          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h3 className="font-extrabold text-sm text-slate-900 tracking-wider uppercase">
          {months[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={handleNextMonth}
          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Week Days Headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dayName, idx) => (
          <span key={idx} className="text-[10px] font-bold text-slate-400 uppercase">
            {dayName}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {/* Empty cells before start of month */}
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-8 w-8 mx-auto" />
        ))}

        {/* Days of month */}
        {Array.from({ length: totalDays }).map((_, idx) => {
          const dayNum = idx + 1;
          const event = getEventForDay(dayNum);

          // Determine pill color style based on event type
          let badgeStyle = 'text-slate-800 hover:bg-slate-100';

          if (event) {
            if (event.type === 'evento') {
              // 🔵 Blue Pill matching mockup
              badgeStyle = 'bg-[#0084D1] text-white font-black shadow-xs shadow-blue-200 transform scale-105';
            } else if (event.type === 'acao' || event.type === 'obra') {
              // 🟢 Green Pill matching mockup
              badgeStyle = 'bg-[#00B050] text-white font-black shadow-xs shadow-emerald-200 transform scale-105';
            } else if (event.type === 'assembleia') {
              // 🟡 Yellow / Gold Pill matching mockup
              badgeStyle = 'bg-[#FBB03B] text-slate-900 font-black shadow-xs shadow-amber-200 transform scale-105';
            }
          }

          return (
            <button
              key={dayNum}
              onClick={() => event && setSelectedEvent(event)}
              disabled={!event}
              className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs font-semibold transition-all ${badgeStyle} ${
                event ? 'cursor-pointer active:scale-95' : 'cursor-default opacity-80'
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Legend matching Mockup */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[10px] font-bold">
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0084D1]" />
          <span>Eventos</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00B050]" />
          <span>Ações/Obras</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FBB03B]" />
          <span>Assembleias/Avisos</span>
        </div>
      </div>

      {/* Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
