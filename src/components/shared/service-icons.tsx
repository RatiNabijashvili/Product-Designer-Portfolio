import React from 'react';
import { cn } from '@/lib/utils';

// Service icon components that render images
export const IconProductDesign: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/ProductDesign-pattern.png" alt="Product Design" className={cn("h-[200px] w-[200px] object-contain", className)} />
);

export const IconDesignSystems: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/DesignSystems-Pattern.png" alt="Design Systems" className={cn("h-[200px] w-[200px] object-contain", className)} />
);

export const IconResearch: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/ResearchPattern.png" alt="Research" className={cn("h-[200px] w-[200px] object-contain", className)} />
);

export const IconCreativeDevelopment: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <img src="/Development-Pattern.png" alt="Creative Development" className={cn("h-[200px] w-[200px] object-contain", className)} />
);
