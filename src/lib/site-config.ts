const fallbackSiteUrl = 'https://ratinabijashvili.com';

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, '');
}

export const siteConfig = {
  name: 'Rati Nabijashvili',
  role: 'Product Designer',
  location: 'Tbilisi, Georgia',
  language: 'English',
  locale: 'en',
  openGraphLocale: 'en_US',
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl),
  email: 'r.nabijashvili@gmail.com',
  socialProfiles: ['https://www.linkedin.com/in/ratinabijashvili/'],
} as const;

export const seoPages = {
  uxChallenges: {
    path: '/projects/ux-challenges',
    title: 'Selected UX Challenges | Rati Nabijashvili',
    description: 'Exploring how I identify usability problems, work within constraints and evaluate trade-offs. Each example reveals the reasoning behind practical solutions that make interactions clearer.',
    image: '/Projects/UX-Challenges/Second Image.webp',
    imageAlt: 'Selected mobile and web UX challenges',
    imageWidth: 2400,
    imageHeight: 1350,
  },
  home: {
    path: '/',
    title: 'Rati Nabijashvili | End-to-End Product Designer',
    description: 'End-to-end product designer in Tbilisi, Georgia creating clear web and mobile products through UX/UI, design systems and AI-assisted prototyping.',
    image: '/Seo/og-home.png',
    imageAlt: 'Rati Nabijashvili product design portfolio',
  },
  hapttic: {
    path: '/projects/hapttic',
    title: 'Hapttic SaaS UX Case Study | Rati Nabijashvili',
    description: 'Product design case study for Hapttic, a real-time brand intelligence platform. See the dashboard, campaign comparison, inbox and website redesign.',
    image: '/Seo/og-happtic.png',
    imageAlt: 'Hapttic brand intelligence platform case study',
  },
  noxttonWallet: {
    path: '/projects/noxtton-wallet',
    title: 'Noxtton Wallet UX Case Study | Rati Nabijashvili',
    description: 'Product design case study for a self-custodial EVM wallet. See how onboarding, Guardian Mode and transaction flows make crypto safer for newcomers.',
    image: '/Seo/og-noxtton-wallet.png',
    imageAlt: 'Noxtton Wallet mobile product design case study',
  },
  whiteSquare: {
    path: '/projects/white-square',
    title: 'White Square Design System | Rati Nabijashvili',
    description: 'A documented Figma design system for White Square’s real estate website, covering visual foundations, configurable components, responsive behavior and developer guidance.',
    image: '/Seo/og-white-square.png',
    imageAlt: 'White Square real estate design system case study',
  },
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}
