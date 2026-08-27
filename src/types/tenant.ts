export type EventType = 'evento' | 'acao' | 'obra' | 'assembleia';

export interface CalendarEvent {
  id: string;
  tenantId: string;
  title: string;
  type: EventType;
  date: string; // YYYY-MM-DD
  time?: string;
  location?: string;
  description: string;
  organizer?: string;
  status?: 'agendado' | 'em_andamento' | 'concluido';
  attachments?: { name: string; url: string }[];
}

export interface BeforeAfterItem {
  id: string;
  tenantId: string;
  title: string;
  category: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  completionDate: string;
  investmentValue: number;
  supplierName: string;
  durationDays: number;
  detailedReport?: string;
  benefitsList?: string[];
}

export type FolderCategory = 
  | 'ofertas'
  | 'brindes'
  | 'sorteios'
  | 'cashback'
  | 'indicador_morador'
  | 'servicos';

export interface AdvantageFolder {
  id: FolderCategory;
  title: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  icon: string;
  count: number;
}

export interface AdvantagePartner {
  id: string;
  tenantId: string;
  folderCategory: FolderCategory;
  name: string;
  businessName: string;
  description: string;
  discountBadge?: string;
  phone: string;
  whatsappMessage: string;
  address?: string;
  instagram?: string;
  website?: string;
  imageUrl: string;
  isResident: boolean;
  residentLot?: string;
  rating?: number;
  validUntil?: string;
  terms?: string;
}

export interface BannerAd {
  id: string;
  tenantId?: string; // null for global ads
  title: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText: string;
  targetWhatsapp: string;
  whatsappMessage: string;
  active: boolean;
  position: 'top' | 'middle' | 'bottom';
  impressions?: number;
  clicks?: number;
}

export interface BoardMember {
  id: string;
  name: string;
  role: 'sindico' | 'subsindico' | 'diretoria' | 'conselho_fiscal' | 'administracao';
  roleTitle: string;
  contact?: string;
  email?: string;
  avatarUrl?: string;
}

export interface TenantTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  eventColor: string;
  actionColor: string;
  assemblyColor: string;
  backgroundColor: string;
  cardColor: string;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  associationName: string;
  city: string;
  state: string;
  residentCount: number;
  unitCount: number;
  welcomeMessage: string;
  logoSvgType: 'damha1' | 'alphaville' | 'generic';
  theme: TenantTheme;
  emergencyContacts: {
    portaria: string;
    administracao: string;
    seguranca: string;
    whatsappComercial: string;
  };
  widgetSettings: {
    showWeather: boolean;
    showExchangeRates: boolean;
    weatherCity: string;
  };
}
