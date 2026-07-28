export type Project = {
  id: string;
  tags: string[];
  name: string;
  description: string;
  imageId: string;
  inDevelopment?: boolean;
};

export const projects: Project[] = [
  {
    id: 'hapttic',
    tags: ['SaaS', 'B2B', 'B2C', 'Marketing Page'],
    name: 'HAPTTIC',
    description:
      'Hapttic is a real-time brand intelligence platform that helps teams track mentions across every online channel, analyze sentiment instantly, and take action with confidence.',
    imageId: 'project-hapttic',
  },
  {
    id: 'noxtton-wallet',
    tags: ['Fintech', 'B2C', 'Mobile App'],
    name: 'NOXTTON WALLET',
    description:
      'Noxtton Wallet is a self-custodial mobile wallet for EVM networks, designed to make managing and transferring digital assets feel safer and more understandable for newcomers.',
    imageId: 'project-noxtton-wallet',
  },
  {
    id: 'white-square',
    tags: ['Real Estate', 'B2C', 'Marketing Page'],
    name: 'WHITE SQUARE',
    description:
      'White Square is a Georgian real estate development company presenting residential projects, available apartments, company information and direct sales opportunities through its website.',
    imageId: 'project-white-square',
  },
  {
    id: 'aversi',
    tags: ['Ecommerce', 'Website', 'Mobile App'],
    name: 'AVERSI',
    description:
      'Aversi Pharma is a nationwide healthcare and pharmacy platform that helps users access medications, manage accounts, and engage with pharmacy services through a unified digital experience.',
    imageId: 'project-aversi',
    inDevelopment: true,
  },
];
