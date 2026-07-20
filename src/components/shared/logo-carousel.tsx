'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { src: '/Carousel-Logo-1.svg', alt: 'Hapttic logo', width: 95 },
  { src: '/Carousel-Logo-2.svg', alt: 'Aversi logo', width: 162 },
  { src: '/Carousel-Logo-3.svg', alt: 'Partner logo', width: 110 },
  { src: '/Carousel-Logo-4.svg', alt: 'Making Science Sweeft logo', width: 160 },
  { src: '/Carousel-Logo-5.svg', alt: 'Partner logo', width: 150 },
];

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12 sm:gap-24 sm:pr-24" aria-hidden={hidden}>
      {logos.map((logo) => (
        <div
          key={logo.src}
          className="flex h-5 shrink-0 items-center justify-center sm:h-6"
          style={{ width: `${logo.width}px` }}
        >
          <img src={logo.src} alt={hidden ? '' : logo.alt} className="h-full w-auto object-contain" />
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
