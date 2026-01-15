
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function HeroVideo() {
  const heroVideoImage = PlaceHolderImages.find((p) => p.id === 'hero-video');
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getAnimationValues = () => {
    if (typeof window === 'undefined' || !isMounted || !videoRef.current) {
      return { scale: 1, y: 0, opacity: 1 };
    }

    const heroScene = document.getElementById('hero-scene');
    if (!heroScene) return { scale: 1, y: 0, opacity: 1 };

    const sceneRect = heroScene.getBoundingClientRect();
    
    // Start animation when the scene top is at the viewport top
    const animationStart = heroScene.offsetTop;
    // End after scrolling 100vh
    const animationEnd = animationStart + window.innerHeight;

    let progress = (scrollY - animationStart) / (animationEnd - animationStart);
    progress = Math.max(0, Math.min(1, progress));

    // Calculate scale
    const mainElement = document.querySelector('main');
    if (!mainElement) return { scale: 1, y: 0, opacity: 1 };
    
    const contentWidth = mainElement.clientWidth;
    const initialWidth = videoRef.current.offsetWidth;
    const targetScale = contentWidth / initialWidth;
    const scale = 1 + (targetScale - 1) * progress;
    
    // Calculate Y translation
    // We want it to end up looking like it's at the top of the next section
    const targetY = window.innerHeight - (videoRef.current.offsetHeight * scale);
    const y = targetY * progress;

    const opacity = 1 - progress * 0.5;

    return { scale, y, opacity };
  };

  const { scale, y, opacity } = getAnimationValues();

  if (!heroVideoImage) {
    return <div className="w-[568px] h-[320px] bg-muted rounded-xl shadow-lg" />;
  }
  
  // Static placeholder for SSR and initial render
  if (!isMounted) {
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
      ref={videoRef}
      style={{
        width: '568px',
        height: '320px',
        transform: `translateY(${y}px) scale(${scale})`,
        transformOrigin: 'top right',
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
        <div className="absolute inset-0 bg-background/20" style={{ opacity }} />
      </div>
    </div>
  );
}
