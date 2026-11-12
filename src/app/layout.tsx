import type {Metadata} from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { createPageMetadata } from '@/lib/seo-metadata';
import { seoPages, siteConfig } from '@/lib/site-config';
import { SiteLoader } from '@/components/shared/site-loader';
import { siteLoaderBootstrap } from '@/lib/site-loader';

const satoshi = localFont({
  src: [
    { path: './fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'block',
  preload: true,
});

const anton = localFont({
  src: './fonts/anton-400.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-anton',
  display: 'block',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata(seoPages.home),
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: siteLoaderBootstrap }} />
        <link rel="preload" href="/Background-pattern.webp" as="image" />
      </head>
      <body className={`${satoshi.variable} ${anton.variable} font-body antialiased`}>
        <noscript><style>{'[data-section-reveal], [data-work-reveal], [data-gallery-item], [data-project-text-reveal], .project-animations [data-challenge-copy] > *, .project-animations [data-challenge-title], .project-animations [data-challenge-result], .project-animations [data-challenge-visual], .project-animations [data-comparison-step] > * { opacity: 1 !important; }'}</style></noscript>
        <SiteLoader />
        <div id="site-content">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
