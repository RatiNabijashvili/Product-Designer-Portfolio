'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // A guard to ensure the refs are mounted before running the animation
    if (!sectionRef.current || !textContainerRef.current || !line1Ref.current || !line2Ref.current || !line3Ref.current || !line4Ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%', // Adjust scroll duration for a smoother effect
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        textContainerRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power1.inOut' }
      )
      .fromTo(
        line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', ease: 'none' }
      ).fromTo(
        line2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', ease: 'none' }
      ).fromTo(
        line3Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', ease: 'none' }
      ).fromTo(
        line4Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', ease: 'none' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = 'I design with purpose, creating clarity, simplicity and';
  const line2 = 'experiences that feel effortless. Every detail matters and every';
  const line3 = ' choice has meaning. My work reflects how I live: focused,';
  const line4 = 'intentional and always thinking several steps ahead.';

  return (
    <section ref={sectionRef} className="flex min-h-screen items-center justify-center px-4 py-8 md:px-8">
      <div ref={textContainerRef} className="w-full max-w-7xl space-y-1 text-center text-2xl font-bold uppercase leading-normal md:text-[32px]">
        
        {/* Line 1 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="text-center text-[#919191] md:text-right">{line1}</p>
          {/* Animated layer (primary) */}
          <div ref={line1Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="text-center text-primary md:text-right">{line1}</p>
          </div>
        </div>

        {/* Line 2 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="text-center text-[#919191] md:text-left">{line2}</p>
          {/* Animated layer (primary) */}
          <div ref={line2Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="text-center text-primary md:text-left">{line2}</p>
          </div>
        </div>

        {/* Line 3 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="text-center text-[#919191] md:text-left">{line3}</p>
          {/* Animated layer (primary) */}
          <div ref={line3Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="text-center text-primary md:text-left">{line3}</p>
          </div>
        </div>

        {/* Line 4 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="text-center text-[#919191] md:text-left">{line4}</p>
          {/* Animated layer (primary) */}
          <div ref={line4Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="text-center text-primary md:text-left">{line4}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
