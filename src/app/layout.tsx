import type {Metadata} from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { createPageMetadata } from '@/lib/seo-metadata';
import { seoPages, siteConfig } from '@/lib/site-config';

const satoshi = localFont({
  src: [
    { path: './fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
});

const anton = localFont({
  src: './fonts/anton-400.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-anton',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata(seoPages.home),
  icons: {
    icon: [
      { url: '/Logos/Favicon_Black.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/Logos/Favicon_White.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logos/Favicon_Black.svg" media="(prefers-color-scheme: light)" type="image/svg+xml" />
        <link rel="icon" href="/Logos/Favicon_White.svg" media="(prefers-color-scheme: dark)" type="image/svg+xml" />
      </head>
      <body className={`${satoshi.variable} ${anton.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
