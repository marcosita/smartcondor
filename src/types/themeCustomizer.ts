export type FontFamilyOption = 
  | 'sans' // Default Modern Sans
  | 'inter'
  | 'poppins'
  | 'montserrat'
  | 'serif'
  | 'dyslexic';

export type BorderRadiusOption = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ShadowStyleOption = 'none' | 'subtle' | 'modern' | 'elevated';

export interface CustomThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  eventColor: string;
  actionColor: string;
  assemblyColor: string;
  backgroundColor: string;
  cardColor: string;
  fontFamily: FontFamilyOption;
  borderRadius: BorderRadiusOption;
  shadowStyle: ShadowStyleOption;
  baseFontSize: number; // 14 to 20
}

export interface ThemePreset {
  name: string;
  description: string;
  settings: CustomThemeSettings;
}
