'use client';

import React from 'react';
import {
  useAccessibility,
  FontSizeLevel,
  ContrastMode,
} from './AccessibilityProvider';
import {
  X,
  Type,
  SunMoon,
  Volume2,
  VolumeX,
  Eye,
  RotateCcw,
  Sparkles,
  AlignJustify,
  Sliders,
  Check,
} from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    contrast,
    setContrast,
    dyslexicFont,
    toggleDyslexicFont,
    reducedMotion,
    toggleReducedMotion,
    lineSpacing,
    toggleLineSpacing,
    speakText,
    stopSpeaking,
    isSpeaking,
    resetAllSettings,
  } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                Recursos de Acessibilidade
              </h3>
              <p className="text-xs text-slate-500">
                Personalize sua experiência visual e de leitura
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

        {/* Option 1: Tamanho do Texto (Font Size) */}
        <div className="mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-blue-600" />
              Tamanho do Texto
            </span>
            <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase">
              {fontSize === 'normal' && '100% (Padrão)'}
              {fontSize === 'large' && '115% (Médio)'}
              {fontSize === 'xlarge' && '130% (Grande)'}
              {fontSize === 'xxlarge' && '150% (Extra)'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === 'normal'}
              className="py-2 px-3 bg-white hover:bg-slate-100 disabled:opacity-40 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-1"
            >
              <span>A-</span>
              <span className="text-[10px] text-slate-400">Diminuir</span>
            </button>
            <button
              onClick={resetFontSize}
              className="py-2 px-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-1"
            >
              <span>Padrão</span>
            </button>
            <button
              onClick={increaseFontSize}
              disabled={fontSize === 'xxlarge'}
              className="py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <span>A+</span>
              <span className="text-[10px] text-blue-100">Aumentar</span>
            </button>
          </div>
        </div>

        {/* Option 2: Modos de Contraste */}
        <div className="mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <SunMoon className="w-4 h-4 text-amber-600" />
              Esquema de Contraste
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setContrast('normal')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                contrast === 'normal'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <span>Contraste Padrão</span>
              {contrast === 'normal' && <Check className="w-4 h-4 text-blue-600" />}
            </button>

            <button
              onClick={() => setContrast('high-contrast')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                contrast === 'high-contrast'
                  ? 'border-black bg-black text-white shadow-xs'
                  : 'border-slate-800 bg-slate-900 text-white'
              }`}
            >
              <span>Alto Contraste Escuro</span>
              {contrast === 'high-contrast' && <Check className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => setContrast('yellow-on-black')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                contrast === 'yellow-on-black'
                  ? 'border-yellow-400 bg-black text-yellow-300 shadow-xs'
                  : 'border-slate-700 bg-black text-yellow-400'
              }`}
            >
              <span>Amarelo no Preto</span>
              {contrast === 'yellow-on-black' && <Check className="w-4 h-4 text-yellow-300" />}
            </button>

            <button
              onClick={() => setContrast('dark-contrast')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                contrast === 'dark-contrast'
                  ? 'border-indigo-600 bg-indigo-900 text-white shadow-xs'
                  : 'border-slate-300 bg-slate-800 text-white'
              }`}
            >
              <span>Modo Noturno Reforçado</span>
              {contrast === 'dark-contrast' && <Check className="w-4 h-4 text-indigo-300" />}
            </button>
          </div>
        </div>

        {/* Option 3: Tipografia & Espaçamento */}
        <div className="mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Tipografia de Alta Legibilidade (Dislexia)
            </span>
            <button
              onClick={toggleDyslexicFont}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dyslexicFont ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dyslexicFont ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <AlignJustify className="w-4 h-4 text-emerald-600" />
              Aumentar Espaçamento entre Linhas
            </span>
            <button
              onClick={toggleLineSpacing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                lineSpacing ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  lineSpacing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-orange-600" />
              Reduzir Animações e Movimentos
            </span>
            <button
              onClick={toggleReducedMotion}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                reducedMotion ? 'bg-orange-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Option 4: Leitor de Voz em Português */}
        <div className="mb-4 p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-blue-600" />
              Leitura em Voz Alta
            </span>
          </div>
          <p className="text-[11px] text-blue-800/80 mb-2">
            Ouça o resumo do informativo e benefícios do condomínio.
          </p>

          <div className="flex gap-2">
            {!isSpeaking ? (
              <button
                onClick={() =>
                  speakText(
                    'Bem-vindo ao informativo oficial do Residencial Damha 1 Araraquara. Aqui você encontra o calendário com eventos, ações de manutenção e obras, o histórico de antes e depois e o clube de vantagens com ofertas e descontos exclusivos.'
                  )
                }
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ouvir Informativo</span>
              </button>
            ) : (
              <button
                onClick={stopSpeaking}
                className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <VolumeX className="w-4 h-4" />
                <span>Parar Leitura de Voz</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={resetAllSettings}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrões</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
          >
            Concluir & Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
