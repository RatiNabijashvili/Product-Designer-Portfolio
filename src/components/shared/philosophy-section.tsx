'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const animatedTextContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // A guard to ensure the refs are mounted before running the animation
    if (!sectionRef.current || !animatedTextContainerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        animatedTextContainerRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text1 = 'I design with purpose, creating clarity, simplicity and';
  const text2Bold = 'experiences that';
  const text2Rest =
    ' feel effortless. Every detail matters and every choice has meaning. My work reflects how I live: focused, intentional and always thinking several steps ahead.';

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-8">
      <div className="text-[32px] leading-normal max-w-7xl font-body uppercase relative">
        {/* Base layer (gray text) */}
        <div className="text-[#919191]">
          <p className="font-bold text-right">{text1}</p>
          <p className="text-left">
            <span className="font-bold">{text2Bold}</span>
            <span>{text2Rest}</span>
          </p>
        </div>

        {/* Animated layer (primary color text) */}
        <div
          ref={animatedTextContainerRef}
          className="absolute top-0 left-0 w-full h-full"
        >
          <p className="font-bold text-primary text-right">{text1}</p>
          <p className="text-left">
            <span className="font-bold text-primary">{text2Bold}</span>
            <span className="text-primary">{text2Rest}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
