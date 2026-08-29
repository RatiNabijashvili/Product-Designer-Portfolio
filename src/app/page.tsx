'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { HeroVideo } from '@/components/shared/hero-video';
import { PhilosophySection } from '@/components/shared/philosophy-section';
import { WorkSection } from '@/components/shared/work-section';
import { ServicesSection } from '@/components/shared/services-section';
import { LogoCarousel } from '@/components/shared/logo-carousel';
import { AboutSection } from '@/components/shared/about-section';
import { Footer } from '@/components/shared/footer';
import { useFitTextWidth } from '@/hooks/use-fit-text-width';

export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const quietlyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineTextRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const scrollMeRef = useRef<HTMLDivElement>(null);

  useFitTextWidth(headlineRef, headlineTextRef, {
    variableName: '--hero-title-size',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Navigation slides from top
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: -80 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }
        );
      }

      // 2. "A Quietly Confident" slides from bottom
      if (quietlyRef.current) {
        tl.fromTo(
          quietlyRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // 3. "Product Designer" slides from bottom (middle of quietly animation)
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // 4. Hero video slides from right
      if (videoRef.current) {
        tl.fromTo(
          videoRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 5. "Scroll Me" slides from left
      if (scrollMeRef.current) {
        tl.fromTo(
          scrollMeRef.current,
          { opacity: 0, x: -80 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);
  return (
    <div 
      className="bg-background min-h-screen overflow-x-hidden text-primary antialiased"
      style={{
        backgroundImage: 'url(/Background-pattern.webp)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <main>
        <div className="relative flex min-h-screen flex-col">
          <header ref={headerRef} className="flex w-full items-center justify-between px-4 pb-0 pt-8 sm:p-8">
            <Link
              href="/"
              aria-label="Rati Nabijashvili — Home"
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#030C0C]"
            >
              <Image
                src="/Logos/Logo.svg"
                alt="Rati Nabijashvili"
                width={153}
                height={35}
                className="h-8 w-auto"
                priority
                fetchPriority="high"
              />
            </Link>
            <Button
              variant="default"
              className="h-12 w-32 rounded-full bg-accent text-base font-bold leading-tight text-accent-foreground sm:h-14 sm:w-40 sm:text-xl"
              asChild
            >
              <a href="mailto:r.nabijashvili@gmail.com">Contact Me</a>
            </Button>
          </header>

          {/* This container holds the main hero content and centers it vertically. */}
          <div className="tablet-hero-shell flex flex-1 flex-col justify-between px-4 pb-8 pt-10 sm:px-8 sm:pb-0 sm:pt-16 md:justify-center">
            <div className="tablet-hero-media-region flex min-h-0 flex-1 items-center justify-center md:block md:flex-none">
              <div className="tablet-hero-media-row flex w-full flex-col-reverse items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div ref={scrollMeRef} className="flex flex-col items-end gap-2 text-[#030C0C]">
                  <span className="font-body text-base font-bold leading-tight">
                    Scroll Me
                  </span>
                  <img src="/arrow-down-right.svg" alt="Scroll down" className="h-6 w-6" />
                </div>

                <div ref={videoRef} className="aspect-video w-full max-w-[568px] overflow-hidden rounded-md md:h-[320px] md:w-[568px]">
                  <HeroVideo />
                </div>
              </div>
            </div>

            <div className="tablet-hero-title-group relative flex w-full flex-col gap-4 sm:mt-12 sm:gap-6">
              <div ref={quietlyRef} className="relative w-full px-2 text-center text-xl font-bold uppercase leading-none md:text-left">
                <span className="md:absolute md:left-2">A</span>
                <span className="mx-1 md:mx-0 md:block md:text-center">Quietly</span>
                <span className="md:absolute md:right-2 md:top-0">Confident</span>
              </div>
              <div ref={headlineRef} className="w-full">
                <h1 className="hero-display-title w-full whitespace-nowrap text-center font-headline leading-[0.82] tracking-normal uppercase text-primary">
                  <span ref={headlineTextRef} className="inline-block">Product Designer</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <PhilosophySection />
        <WorkSection />
        <section className="mt-[72px] md:mt-40">
          <LogoCarousel />
        </section>
        <ServicesSection />
        <AboutSection />
        <Footer />
      </main>
    </div>
  );
}
