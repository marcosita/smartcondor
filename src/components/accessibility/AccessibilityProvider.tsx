'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontSizeLevel = 'normal' | 'large' | 'xlarge' | 'xxlarge';
export type ContrastMode = 'normal' | 'high-contrast' | 'dark-contrast' | 'yellow-on-black';

interface AccessibilityContextType {
  fontSize: FontSizeLevel;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  
  contrast: ContrastMode;
  setContrast: (mode: ContrastMode) => void;
  toggleHighContrast: () => void;
  
  dyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  lineSpacing: boolean;
  toggleLineSpacing: () => void;

  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  
  resetAllSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 'normal',
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
  contrast: 'normal',
  setContrast: () => {},
  toggleHighContrast: () => {},
  dyslexicFont: false,
  toggleDyslexicFont: () => {},
  reducedMotion: false,
  toggleReducedMotion: () => {},
  lineSpacing: false,
  toggleLineSpacing: () => {},
  speakText: () => {},
  stopSpeaking: () => {},
  isSpeaking: false,
  resetAllSettings: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSizeLevel>('normal');
  const [contrast, setContrast] = useState<ContrastMode>('normal');
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply CSS classes to document root / body
  useEffect(() => {
    const root = document.documentElement;

    // Font size scaling
    root.classList.remove('font-size-large', 'font-size-xlarge', 'font-size-xxlarge');
    if (fontSize === 'large') root.classList.add('font-size-large');
    if (fontSize === 'xlarge') root.classList.add('font-size-xlarge');
    if (fontSize === 'xxlarge') root.classList.add('font-size-xxlarge');

    // Contrast classes
    root.classList.remove('high-contrast', 'dark-contrast', 'yellow-on-black');
    if (contrast === 'high-contrast') root.classList.add('high-contrast');
    if (contrast === 'dark-contrast') root.classList.add('dark-contrast');
    if (contrast === 'yellow-on-black') root.classList.add('yellow-on-black');

    // Dyslexic font
    if (dyslexicFont) {
      root.classList.add('dyslexic-font');
    } else {
      root.classList.remove('dyslexic-font');
    }

    // Line spacing
    if (lineSpacing) {
      root.classList.add('extra-line-spacing');
    } else {
      root.classList.remove('extra-line-spacing');
    }

    // Reduced motion
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [fontSize, contrast, dyslexicFont, lineSpacing, reducedMotion]);

  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else if (fontSize === 'xlarge') setFontSize('xxlarge');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'xxlarge') setFontSize('xlarge');
    else if (fontSize === 'xlarge') setFontSize('large');
    else if (fontSize === 'large') setFontSize('normal');
  };

  const resetFontSize = () => setFontSize('normal');

  const toggleHighContrast = () => {
    setContrast((prev) => (prev === 'normal' ? 'high-contrast' : 'normal'));
  };

  const toggleDyslexicFont = () => setDyslexicFont((prev) => !prev);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);
  const toggleLineSpacing = () => setLineSpacing((prev) => !prev);

  // Web Speech API for reading screen contents aloud
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Seu navegador não suporta a síntese de voz.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const resetAllSettings = () => {
    setFontSize('normal');
    setContrast('normal');
    setDyslexicFont(false);
    setReducedMotion(false);
    setLineSpacing(false);
    stopSpeaking();
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        contrast,
        setContrast,
        toggleHighContrast,
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
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
