'use client';

import { cn } from '@/lib/utils';

export function HeroVideo() {
  return (
    <div
      className={cn(
        'relative w-full h-full rounded-xl overflow-hidden shadow-lg'
      )}
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Home-Video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
