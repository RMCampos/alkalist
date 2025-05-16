import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basePath = process.env.NODE_ENV === 'production' ? '/alkalist' : ''

export const metadata: Metadata = {
  metadataBase: new URL('https://rmcampos.github.io/alkalist'),
  title: "AlkaList",
  description: "Saiba o que comer e evitar na dieta alcalina.",
  themeColor: '#0a0a0a',
  icons: {
    icon: `${basePath}/alkalist/favicon-32x32.png`,
    apple: `${basePath}/alkalist/icon-192.png`,
  },
  manifest: `${basePath}/alkalist/manifest.json`,
  openGraph: {
    title: 'AlkaList - O que comer na Dieta Alcalina',
    description: 'Uma ferramenta simples e eficaz para saber quais alimentos são alcalinos ou ácidos.',
    url: 'https://rmcampos.github.io/alkalist',
    siteName: 'AlkaList',
    images: [
      {
        url: `${basePath}/alkalist/alka-og.png`,
        width: 1200,
        height: 630,
        alt: 'AlkaList - O que comer na Dieta Alcalina',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
