'use client';

<<<<<<< HEAD
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function HeroVideo() {
  const heroVideoImage = PlaceHolderImages.find((p) => p.id === 'hero-video');

  if (!heroVideoImage) {
    return <div className="w-full h-full bg-muted rounded-xl shadow-lg" />;
  }

=======
import { cn } from '@/lib/utils';

export function HeroVideo() {
>>>>>>> 1ab173d (Initial commit)
  return (
    <div
      className={cn(
        'relative w-full h-full rounded-xl overflow-hidden shadow-lg'
      )}
    >
<<<<<<< HEAD
      <Image
        src={heroVideoImage.imageUrl}
        alt={heroVideoImage.description}
        fill
        className="w-full h-full object-cover"
        data-ai-hint={heroVideoImage.imageHint}
        priority
      />
      <div className="absolute inset-0 bg-background/20" />
=======
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Slideshow-Loop-[remix] - 720p 30fps.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
>>>>>>> 1ab173d (Initial commit)
    </div>
  );
}
