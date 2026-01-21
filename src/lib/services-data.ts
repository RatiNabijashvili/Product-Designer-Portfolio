import React from 'react';
import {
  IconProductDesign,
  IconDesignSystems,
  IconResearch,
  IconCreativeDevelopment,
} from '@/components/shared/service-icons';

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const services: Service[] = [
  {
    id: 'product-design',
    title: 'Product Design',
    description:
      'From Initial Concept To Final Polish. I Craft Intuitive User Flows And High-Fidelity Interfaces That Solve Real Problems And Drive Engagement.',
    icon: IconProductDesign,
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    description:
      'Scalability Meets Consistency. I Build Modular Component Libraries And Documentation That Help Teams Ship Faster And Maintain Quality.',
    icon: IconDesignSystems,
  },
  {
    id: 'research',
    title: 'Research',
    description:
      'Decisions Based On Data, Not Guesses. I Conduct User Interviews, Usability Testing, And Competitive Analysis To Validate Product Direction.',
    icon: IconResearch,
  },
  {
    id: 'creative-development',
    title: 'Creative Development',
    description:
      'Bridging The Gap Between Design And Dev. I Use AI Tools And Rapid Prototyping To Turn Static Visuals Into Functional, Shippable Code.',
    icon: IconCreativeDevelopment,
  },
];
