'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function HeroVideo() {
  const heroVideoImage = PlaceHolderImages.find((p) => p.id === 'hero-video');

  if (!heroVideoImage) {
    return <div className="w-full h-full bg-muted rounded-xl shadow-lg" />;
  }

  return (
    <div
      className={cn(
        'relative w-full h-full rounded-xl overflow-hidden shadow-lg'
      )}
    >
      <Image
        src={heroVideoImage.imageUrl}
        alt={heroVideoImage.description}
        fill
        className="w-full h-full object-cover"
        data-ai-hint={heroVideoImage.imageHint}
        priority
      />
      <div className="absolute inset-0 bg-background/20" />
    </div>
  );
}
