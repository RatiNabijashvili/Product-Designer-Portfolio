
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function HeroVideo() {
  const heroVideoImage = PlaceHolderImages.find((p) => p.id === 'hero-video');
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialTop = useRef<number | null>(null);
  const initialLeft = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    if (containerRef.current && initialTop.current === null) {
      const rect = containerRef.current.getBoundingClientRect();
      initialTop.current = rect.top + window.scrollY;
      initialLeft.current = rect.left + window.scrollX;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const getAnimationValues = () => {
    if (typeof window === 'undefined' || !containerRef.current || initialTop.current === null || !isMounted) {
        return { scale: 1, y: 0, x: 0, opacity: 1, position: 'relative' as const, top: 0, left: 0, zIndex: 1 };
    }
    
    const worksSection = document.getElementById('works-section');
    if (!worksSection) return { scale: 1, y: 0, x: 0, opacity: 1, position: 'relative' as const, top: 0, left: 0, zIndex: 1 };

    const worksRect = worksSection.getBoundingClientRect();

    const animationStart = 0;
    const animationEnd = window.innerHeight * 0.5;
    const progress = Math.max(
      0,
      Math.min(1, (scrollY - animationStart) / (animationEnd - animationStart))
    );

    const screenWidth = window.innerWidth;
    // p-8 on main means 2rem (32px) padding on each side
    const contentPadding = 32;
    const currentWidth = 568; // The video's initial width
    const targetGridWidth = screenWidth - (2 * contentPadding); 
    const targetScale = targetGridWidth / currentWidth;
    
    const targetY = worksRect.top + window.scrollY;

    const scale = 1 + (targetScale - 1) * progress;
    const y = (targetY - initialTop.current) * progress;
    // We want it to be centered in the content area
    const targetX = contentPadding; 
    const x = (targetX - initialLeft.current) * progress;
    
    const opacity = 1 - progress * 0.5;

    const position = progress > 0 ? 'fixed' : 'relative';
    const top = progress > 0 ? initialTop.current : 0;
    const left = progress > 0 ? initialLeft.current : 0;
    const zIndex = progress > 0 ? 10 : 1;


    return { scale, y, x, opacity, position, top, left, zIndex };
  };

  const { scale, y, x, opacity, position, top, left, zIndex } = getAnimationValues();

  if (!heroVideoImage) {
    return <div className="w-[568px] h-[320px] bg-muted rounded-xl shadow-lg" />;
  }

  if (!isMounted) {
    // Render a static placeholder on the server and initial client render
    return (
      <div
        className="w-[568px] h-[320px] relative"
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
          <div className="absolute inset-0 bg-background/20" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '568px',
        height: '320px',
        position,
        top: `${top}px`,
        left: `${left}px`,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: 'top left',
        willChange: 'transform, position, top, left',
        zIndex,
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
