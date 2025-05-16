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

export const metadata: Metadata = {
  title: "AlkaList",
  description: "Saiba o que comer e evitar na dieta alcalina.",
  themeColor: '#0a0a0a',
  icons: {
    icon: '/alkalist/favicon-32x32.png',
    apple: '/alkalist/icon-192.png',
  },
  manifest: '/alkalist/manifest.json',
  openGraph: {
    title: 'AlkList - O que comer na Dieta Alcalina',
    description: 'Uma ferramenta simples e eficaz para saber quais alimentos são alcalinos ou ácidos.',
    url: 'https://rmcampos.github.io/alkalist',
    siteName: 'AlkList',
    images: [
      {
        url: '/alkalist/alka-og.png',
        width: 1200,
        height: 630,
        alt: 'AlkList - O que comer na Dieta Alcalina',
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
