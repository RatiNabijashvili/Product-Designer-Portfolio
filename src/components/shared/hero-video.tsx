
'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroVideo() {
  const heroVideoImage = PlaceHolderImages.find((p) => p.id === 'hero-video');
  const videoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    
    const target = document.getElementById('work-item-1');
    if (!target) return;

    // Use a timeout to ensure all elements are rendered and have their final dimensions
    const timer = setTimeout(() => {
      if (!videoEl || !target) return;
      const targetRect = target.getBoundingClientRect();
      const videoRect = videoEl.getBoundingClientRect();
      
      const scale = targetRect.width / videoRect.width;
      const y = targetRect.top - videoRect.top;
      const x = targetRect.left - videoRect.left;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-scene',
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: '#hero-pin-container',
          invalidateOnRefresh: true,
        },
      });

      tl.to(videoEl, {
        scale: scale,
        y: y,
        x: x,
        ease: 'power1.inOut',
      });
    }, 100); 

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (!heroVideoImage) {
    return <div className="w-[568px] h-[320px] bg-muted rounded-xl shadow-lg" />;
  }

  return (
    <div
      ref={videoRef}
      className={cn('w-[568px] h-[320px] will-change-transform z-10')} 
      style={{ transformOrigin: 'top left' }} 
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
