'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function HeroVideo() {
  const heroVideoImage = PlaceHolderImages.find((p) => p.id === 'hero-video');
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAnimationValues = () => {
    if (typeof window === 'undefined' || !containerRef.current) return { scale: 1, y: 0, opacity: 1 };
    
    const worksSection = document.getElementById('works-section');
    if (!worksSection) return { scale: 1, y: 0, opacity: 1 };

    const rect = containerRef.current.getBoundingClientRect();
    const worksRect = worksSection.getBoundingClientRect();

    const animationStart = 0;
    // Animate over a scroll distance equal to 50% of the viewport height
    const animationEnd = window.innerHeight * 0.5;
    const progress = Math.max(
      0,
      Math.min(1, (scrollY - animationStart) / (animationEnd - animationStart))
    );

    // Calculate target scale to fill the width of the grid.
    const screenWidth = window.innerWidth;
    const currentWidth = rect.width;
    // p-8 on main means 2rem (32px) padding on each side
    const targetGridWidth = screenWidth - (2 * 32); 
    const targetScale = targetGridWidth / currentWidth;
    
    // Target Y to move it to the top of the "works-section"
    // It's the top of works-section relative to viewport, plus scrollY to get absolute doc position
    // minus the video's current top position in the document.
    const targetY = worksRect.top + window.scrollY - rect.top;

    const scale = 1 + (targetScale - 1) * progress;
    const y = targetY * progress;
    const opacity = 1 - progress * 0.5; // Slightly fade the overlay as it expands

    return { scale, y, opacity };
  };

  const { scale, y, opacity } = getAnimationValues();

  if (!heroVideoImage) {
    return <div className="w-[568px] h-[320px] bg-muted rounded-xl shadow-lg" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-[568px] h-[320px] origin-top"
      style={{
        transform: `translateY(${y}px) scale(${scale})`,
        willChange: 'transform',
      }}
    >
      <div
        className={cn(
          'relative w-full h-full rounded-xl overflow-hidden shadow-lg'
        )}
      >
        <Image
          src={heroVideoImage.imageUrl}
          alt={heroVideoImage.description}
          width={568}
          height={320}
          className="w-full h-full object-cover"
          data-ai-hint={heroVideoImage.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-background/20" style={{opacity}}/>
      </div>
    </div>
  );
}
