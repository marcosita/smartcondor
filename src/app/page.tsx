'use client';

import React, { useState } from 'react';
import { useTenant } from '@/components/common/ThemeProvider';
import { Header } from '@/components/navigation/Header';
import { TabNavigation, MainTabType } from '@/components/navigation/TabNavigation';
import { WeatherExchangeWidget } from '@/components/widgets/WeatherExchangeWidget';
import { CondoCalendar } from '@/components/condo/CondoCalendar';
import { BeforeAfterSection } from '@/components/condo/BeforeAfterSection';
import { ClubSection } from '@/components/club/ClubSection';
import { CommercialBanner } from '@/components/common/CommercialBanner';
import { BoardSection } from '@/components/condo/BoardSection';
import { BottomNav } from '@/components/common/BottomNav';
import { EmergencyModal } from '@/components/modals/EmergencyModal';
import { AdvertiseModal } from '@/components/modals/AdvertiseModal';
import { TenantSelectorModal } from '@/components/navigation/TenantSelectorModal';
import { AdminDrawer } from '@/components/admin/AdminDrawer';
import { EventFormModal } from '@/components/admin/EventFormModal';
import { BeforeAfterFormModal } from '@/components/admin/BeforeAfterFormModal';
import { ThemeCustomizerModal } from '@/components/theme/ThemeCustomizerModal';

import {
  MOCK_EVENTS,
  MOCK_BEFORE_AFTER,
  ADVANTAGE_FOLDERS,
  MOCK_PARTNERS,
  MOCK_BOARD,
} from '@/data/mockData';
import { CalendarEvent, BeforeAfterItem } from '@/types/tenant';
import { Sparkles, Eye, Smartphone, Monitor } from 'lucide-react';

export default function HomePage() {
  const { tenant } = useTenant();

  // Tab State
  const [activeTab, setActiveTab] = useState<MainTabType>('condominio');

  // Dynamic Data State (allows adding new events / before & after)
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [beforeAfterItems, setBeforeAfterItems] = useState<BeforeAfterItem[]>(MOCK_BEFORE_AFTER);

  // Modals & Drawers State
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAdvertiseOpen, setIsAdvertiseOpen] = useState(false);
  const [isTenantSelectorOpen, setIsTenantSelectorOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isAddBeforeAfterOpen, setIsAddBeforeAfterOpen] = useState(false);
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);

  // Handlers for adding items via Síndico panel
  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleAddBeforeAfter = (newItem: BeforeAfterItem) => {
    setBeforeAfterItems((prev) => [newItem, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-200/70 pb-24 md:py-8 flex flex-col items-center justify-start">
      {/* SaaS Desktop Presentation Container (Mobile-first frame on desktop) */}
      <main className="w-full max-w-md bg-white min-h-screen md:min-h-[844px] md:rounded-[44px] shadow-2xl md:border-[10px] md:border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
        {/* Mobile Status Bar Simulation (visible on desktop) */}
        <div className="hidden md:flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-bold text-slate-800 select-none">
          <span>9:41</span>
          <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">5G</span>
            <div className="w-4 h-2.5 border border-slate-700 rounded-xs p-0.5">
              <div className="w-full h-full bg-slate-800 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Top Header & Branding */}
        <Header
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenTenantSelector={() => setIsTenantSelectorOpen(true)}
        />

        {/* Main Content Area */}
        <div className="flex-1 px-4 py-3 overflow-y-auto">
          {/* Weather & Exchange Rates Live Widget */}
          <WeatherExchangeWidget />

          {/* Main Segmented Switcher ("CONDOMÍNIO" vs "CLUBE DE VANTAGENS") */}
          <TabNavigation activeTab={activeTab} onChangeTab={setActiveTab} />

          {/* TAB 1: CONDOMÍNIO (Informativo, Calendário Interativo, Antes e Depois) */}
          {activeTab === 'condominio' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Módulo 2: Calendário Interativo Outubro 2026 */}
              <CondoCalendar events={events} />

              {/* Módulo 3: Central de Arquivos Antes e Depois */}
              <BeforeAfterSection items={beforeAfterItems} />

              {/* Módulo 5: Banner Comercial WhatsApp */}
              <CommercialBanner onOpenAdvertise={() => setIsAdvertiseOpen(true)} />

              {/* Módulo 6: Rodapé Institucional & Conselho */}
              <BoardSection board={MOCK_BOARD} />
            </div>
          )}

          {/* TAB 2: CLUBE DE VANTAGENS (Grid de Pastas com Folder Tab UI) */}
          {activeTab === 'clube_vantagens' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Top Banner inside Advantage Club */}
              <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-sm text-center">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                  Exclusivo para Moradores
                </span>
                <h3 className="font-black text-sm uppercase leading-tight">
                  Clube de Benefícios & Guia Comunitário
                </h3>
                <p className="text-[10.5px] text-emerald-100 mt-0.5">
                  Toque em uma pasta para acessar ofertas, brindes, sorteios e profissionais do condomínio.
                </p>
              </div>

              {/* Módulo 4: Grid das 6 Pastas Virtuais */}
              <ClubSection
                folders={ADVANTAGE_FOLDERS}
                partners={MOCK_PARTNERS}
                onOpenAdvertise={() => setIsAdvertiseOpen(true)}
              />

              {/* Módulo 5: Banner Comercial WhatsApp */}
              <CommercialBanner onOpenAdvertise={() => setIsAdvertiseOpen(true)} />

              {/* Módulo 6: Rodapé Institucional & Conselho */}
              <BoardSection board={MOCK_BOARD} />
            </div>
          )}
        </div>

        {/* Native Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onOpenAdvertise={() => setIsAdvertiseOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenThemeCustomizer={() => setIsThemeCustomizerOpen(true)}
        />
      </main>

      {/* Global Interactive Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <AdvertiseModal
        isOpen={isAdvertiseOpen}
        onClose={() => setIsAdvertiseOpen(false)}
      />

      <TenantSelectorModal
        isOpen={isTenantSelectorOpen}
        onClose={() => setIsTenantSelectorOpen(false)}
      />

      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onOpenAddEvent={() => setIsAddEventOpen(true)}
        onOpenAddBeforeAfter={() => setIsAddBeforeAfterOpen(true)}
      />

      <EventFormModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onAddEvent={handleAddEvent}
      />

      <BeforeAfterFormModal
        isOpen={isAddBeforeAfterOpen}
        onClose={() => setIsAddBeforeAfterOpen(false)}
        onAddBeforeAfter={handleAddBeforeAfter}
      />

      <ThemeCustomizerModal
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
      />
    </div>
  );
}
