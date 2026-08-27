'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Tenant } from '@/types/tenant';
import { DEFAULT_TENANT, TENANTS } from '@/config/tenants';
import { CustomThemeSettings, FontFamilyOption, BorderRadiusOption, ShadowStyleOption } from '@/types/themeCustomizer';

interface TenantContextType {
  tenant: Tenant;
  setTenantSlug: (slug: string) => void;
  availableTenants: Tenant[];
  themeSettings: CustomThemeSettings;
  updateThemeSettings: (newSettings: Partial<CustomThemeSettings>) => void;
  resetToTenantDefault: () => void;
  applyPreset: (presetName: string) => void;
}

export const THEME_PRESETS: Record<string, CustomThemeSettings> = {
  'damha1_default': {
    primaryColor: '#0084D1',    // Ciano Oficial Damha
    secondaryColor: '#00B050',  // Verde Esmeralda
    accentColor: '#FBB03B',     // Dourado
    eventColor: '#0084D1',      // 🔵 Eventos
    actionColor: '#00B050',     // 🟢 Ações/Obras
    assemblyColor: '#FBB03B',   // 🟡 Assembleias/Avisos
    backgroundColor: '#F8FAFC',
    cardColor: '#FFFFFF',
    fontFamily: 'sans',
    borderRadius: 'lg',
    shadowStyle: 'modern',
    baseFontSize: 16,
  },
  'royal_luxury': {
    primaryColor: '#1E3A8A',    // Azul Real
    secondaryColor: '#047857',  // Verde Floresta
    accentColor: '#D97706',     // Ouro Nobre
    eventColor: '#2563EB',
    actionColor: '#059669',
    assemblyColor: '#D97706',
    backgroundColor: '#F1F5F9',
    cardColor: '#FFFFFF',
    fontFamily: 'montserrat',
    borderRadius: 'xl',
    shadowStyle: 'elevated',
    baseFontSize: 16,
  },
  'emerald_eco': {
    primaryColor: '#059669',    // Verde Sustentável
    secondaryColor: '#0284C7',  // Azul Água
    accentColor: '#EAB308',     // Solar
    eventColor: '#0284C7',
    actionColor: '#059669',
    assemblyColor: '#EAB308',
    backgroundColor: '#F0FDF4',
    cardColor: '#FFFFFF',
    fontFamily: 'poppins',
    borderRadius: 'full',
    shadowStyle: 'modern',
    baseFontSize: 16,
  },
  'dark_sleek': {
    primaryColor: '#38BDF8',    // Ciano Neon
    secondaryColor: '#34D399',  // Verde Neon
    accentColor: '#FBBF24',     // Âmbar
    eventColor: '#38BDF8',
    actionColor: '#34D399',
    assemblyColor: '#FBBF24',
    backgroundColor: '#0F172A',
    cardColor: '#1E293B',
    fontFamily: 'sans',
    borderRadius: 'xl',
    shadowStyle: 'elevated',
    baseFontSize: 16,
  }
};

const TenantContext = createContext<TenantContextType>({
  tenant: DEFAULT_TENANT,
  setTenantSlug: () => {},
  availableTenants: Object.values(TENANTS),
  themeSettings: THEME_PRESETS['damha1_default'],
  updateThemeSettings: () => {},
  resetToTenantDefault: () => {},
  applyPreset: () => {},
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant>(DEFAULT_TENANT);
  const [themeSettings, setThemeSettings] = useState<CustomThemeSettings>(THEME_PRESETS['damha1_default']);

  const setTenantSlug = (slug: string) => {
    if (TENANTS[slug]) {
      const selectedTenant = TENANTS[slug];
      setTenant(selectedTenant);
      setThemeSettings({
        primaryColor: selectedTenant.theme.primaryColor,
        secondaryColor: selectedTenant.theme.secondaryColor,
        accentColor: selectedTenant.theme.accentColor,
        eventColor: selectedTenant.theme.eventColor,
        actionColor: selectedTenant.theme.actionColor,
        assemblyColor: selectedTenant.theme.assemblyColor,
        backgroundColor: selectedTenant.theme.backgroundColor,
        cardColor: selectedTenant.theme.cardColor,
        fontFamily: 'sans',
        borderRadius: 'lg',
        shadowStyle: 'modern',
        baseFontSize: 16,
      });
    }
  };

  const updateThemeSettings = (newSettings: Partial<CustomThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToTenantDefault = () => {
    setThemeSettings({
      primaryColor: tenant.theme.primaryColor,
      secondaryColor: tenant.theme.secondaryColor,
      accentColor: tenant.theme.accentColor,
      eventColor: tenant.theme.eventColor,
      actionColor: tenant.theme.actionColor,
      assemblyColor: tenant.theme.assemblyColor,
      backgroundColor: tenant.theme.backgroundColor,
      cardColor: tenant.theme.cardColor,
      fontFamily: 'sans',
      borderRadius: 'lg',
      shadowStyle: 'modern',
      baseFontSize: 16,
    });
  };

  const applyPreset = (presetName: string) => {
    if (THEME_PRESETS[presetName]) {
      setThemeSettings(THEME_PRESETS[presetName]);
    }
  };

  useEffect(() => {
    // Inject dynamic CSS variables into document root
    const root = document.documentElement;
    root.style.setProperty('--tenant-primary', themeSettings.primaryColor);
    root.style.setProperty('--tenant-secondary', themeSettings.secondaryColor);
    root.style.setProperty('--tenant-accent', themeSettings.accentColor);
    root.style.setProperty('--tenant-event', themeSettings.eventColor);
    root.style.setProperty('--tenant-action', themeSettings.actionColor);
    root.style.setProperty('--tenant-assembly', themeSettings.assemblyColor);
    root.style.setProperty('--tenant-bg', themeSettings.backgroundColor);
    root.style.setProperty('--tenant-card', themeSettings.cardColor);
    root.style.setProperty('--tenant-base-font-size', `${themeSettings.baseFontSize}px`);

    // Border radius mapping
    const radiusMap: Record<BorderRadiusOption, string> = {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '1.5rem',
      full: '2rem',
    };
    root.style.setProperty('--tenant-radius', radiusMap[themeSettings.borderRadius] || '1rem');
  }, [themeSettings]);

  return (
    <TenantContext.Provider
      value={{
        tenant,
        setTenantSlug,
        availableTenants: Object.values(TENANTS),
        themeSettings,
        updateThemeSettings,
        resetToTenantDefault,
        applyPreset,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};
