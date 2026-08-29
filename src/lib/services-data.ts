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
      'From concepts to polished interfaces, I create clear user flows and digital experiences that solve user and business problems.',
    icon: IconProductDesign,
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    description:
      'I build reusable components, patterns and documentation that keep products consistent and help teams work more efficiently.',
    icon: IconDesignSystems,
  },
  {
    id: 'research',
    title: 'Research',
    description:
      'I use interviews, usability testing and competitive analysis to uncover needs, test assumptions and guide design decisions.',
    icon: IconResearch,
  },
  {
    id: 'creative-development',
    title: 'Creative Development',
    description:
      'I use AI-assisted development and prototyping to create functional experiences that can be tested, refined and brought closer to launch.',
    icon: IconCreativeDevelopment,
  },
];
