import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site-config';

type SeoPage = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
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
      images: [{ url: image, width: 1200, height: 630, alt: page.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [{ url: image, alt: page.imageAlt }],
    },
  };
}
