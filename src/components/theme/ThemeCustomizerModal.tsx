'use client';

import React, { useState } from 'react';
import { useTenant, THEME_PRESETS } from '../common/ThemeProvider';
import { FontFamilyOption, BorderRadiusOption, ShadowStyleOption } from '@/types/themeCustomizer';
import {
  Palette,
  Type,
  Maximize2,
  X,
  RotateCcw,
  Sparkles,
  Sliders,
  Check,
  Download,
  Copy,
  Layers,
} from 'lucide-react';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    tenant,
    themeSettings,
    updateThemeSettings,
    resetToTenantDefault,
    applyPreset,
  } = useTenant();

  const [activeTab, setActiveTab] = useState<'presets' | 'cores' | 'fontes' | 'geometria'>('presets');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCSS = () => {
    const cssVars = `/* Tema SmartCondo: ${tenant.name} */
:root {
  --tenant-primary: ${themeSettings.primaryColor};
  --tenant-secondary: ${themeSettings.secondaryColor};
  --tenant-accent: ${themeSettings.accentColor};
  --tenant-event: ${themeSettings.eventColor};
  --tenant-action: ${themeSettings.actionColor};
  --tenant-assembly: ${themeSettings.assemblyColor};
  --tenant-bg: ${themeSettings.backgroundColor};
  --tenant-card: ${themeSettings.cardColor};
  --tenant-radius: ${themeSettings.borderRadius};
  --tenant-base-font-size: ${themeSettings.baseFontSize}px;
}`;
    navigator.clipboard.writeText(cssVars);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Studio de Personalização & Branding
              </h3>
              <p className="text-xs text-slate-500">
                Ajuste em tempo real cores, fontes, tamanhos e geometrias
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-4 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'presets'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Temas Prontos
          </button>
          <button
            onClick={() => setActiveTab('cores')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'cores'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Cores & Paleta
          </button>
          <button
            onClick={() => setActiveTab('fontes')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'fontes'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Tipografia
          </button>
          <button
            onClick={() => setActiveTab('geometria')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              activeTab === 'geometria'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            Bordas & Estilo
          </button>
        </div>

        {/* Tab 1: Presets */}
        {activeTab === 'presets' && (
          <div className="space-y-3 mb-4">
            <p className="text-xs text-slate-500 font-medium">
              Selecione uma combinação profissional ou personalize cada detalhe nas abas ao lado:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => applyPreset('damha1_default')}
                className="p-3 text-left rounded-2xl border-2 border-sky-400 bg-sky-50/50 hover:bg-sky-50 transition-all flex flex-col gap-2 relative"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-sky-900">Oficial Damha 1</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#0084D1]" />
                    <span className="w-3 h-3 rounded-full bg-[#00B050]" />
                    <span className="w-3 h-3 rounded-full bg-[#FBB03B]" />
                  </div>
                </div>
                <span className="text-[10px] text-sky-700">Ciano, Verde Esmeralda & Dourado</span>
              </button>

              <button
                onClick={() => applyPreset('royal_luxury')}
                className="p-3 text-left rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-slate-900">Royal Luxury</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#1E3A8A]" />
                    <span className="w-3 h-3 rounded-full bg-[#047857]" />
                    <span className="w-3 h-3 rounded-full bg-[#D97706]" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">Azul Real & Ouro Clássico</span>
              </button>

              <button
                onClick={() => applyPreset('emerald_eco')}
                className="p-3 text-left rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-slate-900">Emerald Eco</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#059669]" />
                    <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
                    <span className="w-3 h-3 rounded-full bg-[#EAB308]" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">Verde Sustentável & Solar</span>
              </button>

              <button
                onClick={() => applyPreset('dark_sleek')}
                className="p-3 text-left rounded-2xl border border-slate-800 bg-slate-900 text-white hover:bg-black transition-all flex flex-col gap-2"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs text-sky-400">Dark Sleek</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#38BDF8]" />
                    <span className="w-3 h-3 rounded-full bg-[#34D399]" />
                    <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">Modo Escuro com Acentos Neon</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Cores Individuais */}
        {activeTab === 'cores' && (
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Primary Color */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Cor Primária (Branding)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => updateThemeSettings({ primaryColor: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => updateThemeSettings({ primaryColor: e.target.value })}
                    className="text-xs font-mono font-bold uppercase w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Cor Secundária (Ações/Obras)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => updateThemeSettings({ secondaryColor: e.target.value, actionColor: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => updateThemeSettings({ secondaryColor: e.target.value, actionColor: e.target.value })}
                    className="text-xs font-mono font-bold uppercase w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Cor de Destaque (Assembleias)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeSettings.accentColor}
                    onChange={(e) => updateThemeSettings({ accentColor: e.target.value, assemblyColor: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={themeSettings.accentColor}
                    onChange={(e) => updateThemeSettings({ accentColor: e.target.value, assemblyColor: e.target.value })}
                    className="text-xs font-mono font-bold uppercase w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Event Color */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Cor do Calendário (Eventos)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeSettings.eventColor}
                    onChange={(e) => updateThemeSettings({ eventColor: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={themeSettings.eventColor}
                    onChange={(e) => updateThemeSettings({ eventColor: e.target.value })}
                    className="text-xs font-mono font-bold uppercase w-20 px-2 py-1 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tipografia & Tamanho */}
        {activeTab === 'fontes' && (
          <div className="space-y-3 mb-4">
            {/* Font Family Selection */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Família Tipográfica
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'sans', name: 'Geist Sans (Padrão)' },
                  { id: 'inter', name: 'Inter UI' },
                  { id: 'poppins', name: 'Poppins Rounded' },
                  { id: 'montserrat', name: 'Montserrat Elegance' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateThemeSettings({ fontFamily: f.id as FontFamilyOption })}
                    className={`p-2.5 rounded-xl border font-bold text-left transition-all flex items-center justify-between ${
                      themeSettings.fontFamily === f.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <span>{f.name}</span>
                    {themeSettings.fontFamily === f.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Base Font Size Slider */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Tamanho Base da Fonte</span>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
                  {themeSettings.baseFontSize}px
                </span>
              </div>
              <input
                type="range"
                min="13"
                max="20"
                step="1"
                value={themeSettings.baseFontSize}
                onChange={(e) => updateThemeSettings({ baseFontSize: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Compacto (13px)</span>
                <span>Padrão (16px)</span>
                <span>Ampliado (20px)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Geometria & Bordas */}
        {activeTab === 'geometria' && (
          <div className="space-y-3 mb-4">
            {/* Border Radius */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Arredondamento das Bordas (Border Radius)
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'sm', name: 'Reto (4px)' },
                  { id: 'md', name: 'Sutil (8px)' },
                  { id: 'lg', name: 'Moderno (16px)' },
                  { id: 'xl', name: 'Pílula (24px)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => updateThemeSettings({ borderRadius: r.id as BorderRadiusOption })}
                    className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                      themeSettings.borderRadius === r.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Shadow Style */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Estilo de Sombras (Elevação)
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'none', name: 'Flat (Sem Sombra)' },
                  { id: 'modern', name: 'Suave & Clean' },
                  { id: 'elevated', name: 'Alto Destaque' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateThemeSettings({ shadowStyle: s.id as ShadowStyleOption })}
                    className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                      themeSettings.shadowStyle === s.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={resetToTenantDefault}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Oficial Damha 1</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCSS}
              className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              title="Copiar variáveis CSS para o código"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar CSS'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
            >
              Aplicar ao Vivo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
