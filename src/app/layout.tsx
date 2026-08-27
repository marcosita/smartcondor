import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TenantProvider } from '@/components/common/ThemeProvider';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { AccessibilityToolbar } from '@/components/accessibility/AccessibilityToolbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#0084D1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'SmartCondo — Residencial Damha 1 Araraquara | Informativo & Clube de Vantagens',
  description: 'Canal oficial de transparência, prestação de contas com fotos antes e depois, calendário de obras e clube de vantagens com benefícios exclusivos.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Damha 1 SmartCondo',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white">
        <TenantProvider>
          <AccessibilityProvider>
            {children}
            <AccessibilityToolbar />
          </AccessibilityProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
