const fallbackSiteUrl = 'https://product-designer-portfolio.r-nabijashvili.workers.dev';

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
    title: 'White Square Website UX Case Study | Rati Nabijashvili',
    description: 'Product design case study for White Square, a real estate developer. See the website redesign, clearer project discovery, storytelling and design system.',
    image: '/Seo/og-white-square.png',
    imageAlt: 'White Square real estate website case study',
  },
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}
