import React from 'react';
import { cn } from '@/lib/utils';

// Service icon components that render images
export const IconProductDesign: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/ProductDesign-pattern.webp" alt="Product Design" className={cn("h-[200px] w-[200px] object-contain", className)} />
);

export const IconDesignSystems: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/DesignSystems-Pattern.webp" alt="Design Systems" className={cn("h-[200px] w-[200px] object-contain", className)} />
);

export const IconResearch: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/ResearchPattern.webp" alt="Research" className={cn("h-[200px] w-[200px] object-contain", className)} />
);

export const IconCreativeDevelopment: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/Development-Pattern.webp" alt="Creative Development" className={cn("h-[200px] w-[200px] object-contain", className)} />
);
