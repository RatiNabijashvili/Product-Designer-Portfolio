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
      'Hapttic Is A Real-Time Brand Intelligence Platform That Helps Teams Track Mentions Across Every Online Channel, Analyze Sentiment Instantly, And Take Action With Confidence.',
    imageId: 'project-hapttic',
  },
  {
    id: 'splice',
    tags: ['Social Network', 'Mobile App'],
    name: 'SPLICE',
    description:
      'Splice Is A Mobile App That Lets Users Discover, Join, And Host Parties While Staying Updated On Where Friends Are. It Connects Party-Goers And Hosts In Real-Time For A Social Experience.',
    imageId: 'project-splice',
  },
  {
    id: 'aversi',
    tags: ['Ecommerce', 'Website', 'Mobile App'],
    name: 'AVERSI',
    description:
      'Aversi Pharma Is A Nationwide Healthcare And Pharmacy Platform That Helps Users Access Medications, Manage Accounts And Engage With Pharmacy Services Through A Unified Digital Experience.',
    imageId: 'project-aversi',
    inDevelopment: true,
  },
];
