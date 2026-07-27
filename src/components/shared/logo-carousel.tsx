'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { src: '/Carousel-Logos/Carousel-Logo-1.svg', alt: 'Client logo 1', width: 175, height: 24 },
  { src: '/Carousel-Logos/Carousel-Logo-2.svg', alt: 'Client logo 2', width: 94, height: 24 },
  { src: '/Carousel-Logos/Carousel-Logo-3.svg', alt: 'Client logo 3', width: 111, height: 24 },
  { src: '/Carousel-Logos/Carousel-Logo-4.svg', alt: 'Client logo 4', width: 106, height: 24 },
  { src: '/Carousel-Logos/Carousel-Logo-5.svg', alt: 'Client logo 5', width: 103, height: 24 },
  { src: '/Carousel-Logos/Carousel-Logo-6.svg', alt: 'Client logo 6', width: 152, height: 24 },
  { src: '/Carousel-Logos/Carousel-Logo-7.svg', alt: 'Client logo 7', width: 135, height: 16 },
  { src: '/Carousel-Logos/Carousel-Logo-8.svg', alt: 'Client logo 8', width: 84, height: 24 },
  { src: '/Carousel-Logos/Carousel-Logo-9.svg', alt: 'Client logo 9', width: 24, height: 24 },
];

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12 sm:gap-[120px] sm:pr-[120px]" aria-hidden={hidden}>
      {logos.map((logo) => (
        <div
          key={logo.src}
          className="flex h-6 shrink-0 items-center justify-center"
          style={{ width: `${logo.width}px` }}
        >
          <img
            src={logo.src}
            alt={hidden ? '' : logo.alt}
            className="w-auto object-contain"
            style={{ height: `${logo.height}px` }}
          />
        </div>
      ))}
    </div>
  );
}

export function LogoCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#E4E4E4] py-10" aria-label="Selected client logos">
      <div className="logo-marquee-mask relative w-full overflow-hidden">
        <div className="logo-marquee-track flex w-max items-center">
          <LogoSet />
          <LogoSet hidden />
          <LogoSet hidden />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
