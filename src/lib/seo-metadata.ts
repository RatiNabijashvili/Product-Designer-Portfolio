import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site-config';

type SeoPage = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
};

export function createPageMetadata(page: SeoPage): Metadata {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(page.image);

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: siteConfig.name,
      type: 'website',
      locale: siteConfig.openGraphLocale,
      images: [{ url: image, width: page.imageWidth ?? 1200, height: page.imageHeight ?? 630, type: page.image.endsWith('.webp') ? 'image/webp' : 'image/png', alt: page.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [{ url: image, alt: page.imageAlt }],
    },
  };
}
