export type Project = {
  id: string;
  tags: string[];
  name: string;
  description: string;
  imageId: string;
  actionLabel?: string;
  inDevelopment?: boolean;
};

export const projects: Project[] = [
  {
    id: 'hapttic',
    tags: ['SaaS', 'B2B', 'B2C', 'Marketing Page'],
    name: 'HAPTTIC',
    description:
      'Hapttic is a real-time brand intelligence platform that helps teams track mentions across every online channel, analyze sentiment instantly and take action with confidence.',
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
    tags: ['Real Estate', 'Design System'],
    name: 'White Square Design System',
    description:
      'A documented design system for White Square’s real estate website, connecting shared visual foundations, configurable components and responsive behavior across distinct residential projects.',
    imageId: 'project-white-square',
  },
  {
    id: 'ux-challenges',
    tags: ['UX Improvements', 'Mobile & Web'],
    name: 'Selected UX Challenges',
    description: 'Exploring how I identify usability problems, work within constraints and evaluate trade-offs. Each example reveals the reasoning behind practical solutions that make interactions clearer.',
    imageId: 'project-ux-challenges',
    actionLabel: 'View Challenges',
  },
];
