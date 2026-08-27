import { Tenant } from '@/types/tenant';

export const BASE_DOMAIN = 'smartcondor.isol.com.br';

export const TENANTS: Record<string, Tenant> = {
  'damha1': {
    id: 'damha-1-araraquara',
    slug: 'damha1',
    name: 'Residencial Damha 1',
    associationName: 'Associação de Moradores',
    city: 'Araraquara',
    state: 'SP',
    residentCount: 1500,
    unitCount: 460,
    welcomeMessage: 'Bem-vindo ao canal oficial de comunicação, transparência e benefícios exclusivos para os moradores do Residencial Damha 1.',
    logoSvgType: 'damha1',
    theme: {
      primaryColor: '#0084D1',    // Azul Ciano Oficial
      secondaryColor: '#00B050',  // Verde Esmeralda
      accentColor: '#FBB03B',     // Dourado / Amarelo Damha
      eventColor: '#0084D1',      // 🔵 Eventos
      actionColor: '#00B050',     // 🟢 Ações / Obras
      assemblyColor: '#FBB03B',   // 🟡 Assembleias / Avisos
      backgroundColor: '#F8FAFC',
      cardColor: '#FFFFFF',
    },
    emergencyContacts: {
      portaria: '(16) 3333-1001',
      administracao: '(16) 3333-1002',
      seguranca: '(16) 99777-1003',
      whatsappComercial: '5516999991444',
    },
    widgetSettings: {
      showWeather: true,
      showExchangeRates: true,
      weatherCity: 'Araraquara, SP',
    },
  },
  'alphaville': {
    id: 'alphaville-demo',
    slug: 'alphaville',
    name: 'Alphaville Araçatuba',
    associationName: 'Associação Residencial',
    city: 'Araçatuba',
    state: 'SP',
    residentCount: 1200,
    unitCount: 380,
    welcomeMessage: 'Informativo digital e clube de vantagens para associados Alphaville.',
    logoSvgType: 'alphaville',
    theme: {
      primaryColor: '#1E3A8A',
      secondaryColor: '#047857',
      accentColor: '#D97706',
      eventColor: '#2563EB',
      actionColor: '#059669',
      assemblyColor: '#D97706',
      backgroundColor: '#F8FAFC',
      cardColor: '#FFFFFF',
    },
    emergencyContacts: {
      portaria: '(18) 3600-1001',
      administracao: '(18) 3600-1002',
      seguranca: '(18) 99888-1003',
      whatsappComercial: '5518999991444',
    },
    widgetSettings: {
      showWeather: true,
      showExchangeRates: true,
      weatherCity: 'Araçatuba, SP',
    },
  }
};

export const DEFAULT_TENANT = TENANTS['damha1'];
