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
    if (!containerRef.current) return { scale: 1, y: 0, opacity: 1 };

    const rect = containerRef.current.getBoundingClientRect();
    const animationStart = 0;
    const animationEnd = window.innerHeight * 0.5;
    const progress = Math.max(
      0,
      Math.min(1, (scrollY - animationStart) / (animationEnd - animationStart))
    );

    const targetScale = 2.4;
    const targetY = 170;

    const scale = 1 + (targetScale - 1) * progress;
    const y = targetY * progress;

    return { scale, y };
  };

  const { scale, y } = getAnimationValues();

  if (!heroVideoImage) {
    return <div className="w-[568px] h-[320px] bg-muted rounded-xl shadow-lg" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-[568px] h-[320px] origin-center"
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
      </div>
    </div>
  );
}
