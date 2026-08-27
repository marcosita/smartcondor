'use client';

import React, { useState } from 'react';
import { useAccessibility } from './AccessibilityProvider';
import { AccessibilityModal } from './AccessibilityModal';
import { Eye, Type, SunMoon, Volume2, VolumeX, Accessibility } from 'lucide-react';

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    contrast,
    toggleHighContrast,
    isSpeaking,
    speakText,
    stopSpeaking,
  } = useAccessibility();

  return (
    <>
      {/* Floating Accessibility Pill / Quick Access */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center border-2 border-white transition-all transform hover:scale-105 active:scale-95 group focus:ring-4 focus:ring-blue-300 focus:outline-hidden"
          aria-label="Abrir Menu de Acessibilidade"
          title="Opções de Acessibilidade (Fonte, Contraste, Leitor de Tela)"
        >
          <Accessibility className="w-6 h-6 animate-pulse" />
          <span className="sr-only">Acessibilidade</span>
        </button>
      </div>

      {/* Full Modal */}
      <AccessibilityModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
