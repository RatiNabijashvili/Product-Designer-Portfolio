<<<<<<< HEAD
import { ArrowDown } from 'lucide-react';
=======
'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
>>>>>>> 1ab173d (Initial commit)
import { Button } from '@/components/ui/button';
import { HeroVideo } from '@/components/shared/hero-video';
import { PhilosophySection } from '@/components/shared/philosophy-section';
import { WorkSection } from '@/components/shared/work-section';
import { ServicesSection } from '@/components/shared/services-section';
import { LogoCarousel } from '@/components/shared/logo-carousel';
import { AboutSection } from '@/components/shared/about-section';
<<<<<<< HEAD

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-primary antialiased">
      <main>
        <div className="relative flex h-screen flex-col">
          <header className="flex w-full items-center justify-between p-8">
=======
import { Footer } from '@/components/shared/footer';

export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const quietlyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const scrollMeRef = useRef<HTMLDivElement>(null);

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
        backgroundImage: 'url(/Background-pattern.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <main>
        <div className="relative flex h-screen flex-col">
          <header ref={headerRef} className="flex w-full items-center justify-between p-8">
>>>>>>> 1ab173d (Initial commit)
            <div className="font-bold tracking-wider text-2xl">LOGO</div>
            <Button
              variant="default"
              className="h-14 w-40 rounded-full bg-accent font-bold text-xl leading-tight text-accent-foreground hover:bg-accent/90"
              asChild
            >
<<<<<<< HEAD
              <a href="#contact">Contact Me</a>
=======
              <a href="mailto:r.nabijashvili@gmail.com">Contact Me</a>
>>>>>>> 1ab173d (Initial commit)
            </Button>
          </header>

          {/* This container holds the main hero content and centers it vertically. */}
          <div className="flex flex-grow flex-col justify-center px-8 pt-16">
            <div className="flex w-full items-start justify-between">
<<<<<<< HEAD
              <div className="flex flex-col items-end gap-2 text-[#030C0C]">
                <span className="font-body text-base font-bold leading-tight">
                  Scroll Me
                </span>
                <ArrowDown className="h-6 w-6" />
              </div>

              <div className="h-[320px] w-[568px]">
=======
              <div ref={scrollMeRef} className="flex flex-col items-end gap-2 text-[#030C0C]">
                <span className="font-body text-base font-bold leading-tight">
                  Scroll Me
                </span>
                <img src="/arrow-down-right.svg" alt="Scroll down" className="h-6 w-6" />
              </div>

              <div ref={videoRef} className="h-[320px] w-[568px]">
>>>>>>> 1ab173d (Initial commit)
                <HeroVideo />
              </div>
            </div>

            <div className="relative mt-12 flex w-full flex-col gap-4">
<<<<<<< HEAD
              <div className="relative w-full font-bold text-xl uppercase leading-none">
=======
              <div ref={quietlyRef} className="relative w-full font-bold text-xl uppercase leading-none">
>>>>>>> 1ab173d (Initial commit)
                <span className="absolute left-0">A</span>
                <span className="block text-center">Quietly</span>
                <span className="absolute right-0 top-0">Confident</span>
              </div>
<<<<<<< HEAD
              <div className="mt-4 w-full @container">
=======
              <div ref={headlineRef} className="mt-4 w-full @container">
>>>>>>> 1ab173d (Initial commit)
                <h1 className="flex w-full justify-center gap-x-[5.5cqw] text-center font-headline text-[max(4rem,min(13.6cqw,20rem))] leading-[0.8] uppercase text-primary">
                  <span>Product</span>
                  <span>Designer</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <PhilosophySection />
        <WorkSection />
        <section className="mt-40">
          <LogoCarousel />
        </section>
        <ServicesSection />
        <AboutSection />
<<<<<<< HEAD
=======
        <Footer />
>>>>>>> 1ab173d (Initial commit)
      </main>
    </div>
  );
}
