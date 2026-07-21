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
      'From initial concept to final polish. I craft intuitive user flows and high-fidelity interfaces that solve real problems and drive engagement.',
    icon: IconProductDesign,
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    description:
      'Scalability meets consistency. I build modular component libraries and documentation that help teams ship faster and maintain quality.',
    icon: IconDesignSystems,
  },
  {
    id: 'research',
    title: 'Research',
    description:
      'Decisions based on data, not guesses. I conduct user interviews, usability testing, and competitive analysis to validate product direction.',
    icon: IconResearch,
  },
  {
    id: 'creative-development',
    title: 'Creative Development',
    description:
      'Bridging the gap between design and dev. I use AI tools and rapid prototyping to turn static visuals into functional, shippable code.',
    icon: IconCreativeDevelopment,
  },
];
