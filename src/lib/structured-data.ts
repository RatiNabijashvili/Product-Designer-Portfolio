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
  description: 'End-to-end product designer creating clear web and mobile products through UX/UI, design systems and AI-assisted prototyping.',
  homeLocation: {
    '@type': 'Place',
    name: siteConfig.location,
  },
  sameAs: [...siteConfig.socialProfiles],
  knowsAbout: [
    'Product Design',
    'End-to-End Product Design',
    'UX Design',
    'UI Design',
    'Web Applications',
    'Mobile Applications',
    'Design Systems',
    'User Research',
    'Prototyping',
    'AI-Assisted Development',
  ],
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  name: siteConfig.name,
  url: siteConfig.url,
  description: 'End-to-end product designer in Tbilisi, Georgia creating clear web and mobile products through UX/UI, design systems and AI-assisted prototyping.',
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
