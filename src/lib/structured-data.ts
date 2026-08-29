import { absoluteUrl, siteConfig } from '@/lib/site-config';

const personId = absoluteUrl('/#person');

export const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl('/Personal_Image.webp'),
  jobTitle: siteConfig.role,
  homeLocation: {
    '@type': 'Place',
    name: siteConfig.location,
  },
  sameAs: [...siteConfig.socialProfiles],
  knowsAbout: [
    'Product design',
    'UX design',
    'UI design',
    'SaaS',
    'B2B platforms',
    'Dashboard design',
    'Fintech',
    'Mobile applications',
    'Design systems',
    'User research',
  ],
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.locale,
  author: { '@id': personId },
  publisher: { '@id': personId },
};

export function createCreativeWorkStructuredData({
  name,
  description,
  path,
  image,
  keywords,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  keywords: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    creator: { '@id': personId },
    inLanguage: siteConfig.locale,
    keywords,
  };
}
