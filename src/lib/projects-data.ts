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
    id: 'splice',
    tags: ['Social Network', 'Mobile App'],
    name: 'SPLICE',
    description:
      'Splice is a mobile app that lets users discover, join, and host parties while staying updated on where friends are. It connects party-goers and hosts in real time for a social experience.',
    imageId: 'project-splice',
  },
  {
    id: 'white-square',
    tags: ['Ecommerce', 'Website', 'Mobile App'],
    name: 'White Square',
    description:
      'Aversi Pharma is a nationwide healthcare and pharmacy platform that helps users access medications, manage accounts, and engage with pharmacy services through a unified digital experience.',
    imageId: 'project-aversi',
    inDevelopment: true,
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
