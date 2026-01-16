'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // A guard to ensure the refs are mounted before running the animation
    if (!sectionRef.current || !line1Ref.current || !line2Ref.current || !line3Ref.current || !line4Ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Adjust scroll duration for a smoother effect
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
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
  const line2Bold = 'experiences that';
  const line2Rest = ' feel effortless. Every detail matters and';
  const line3 = 'every choice has meaning. My work reflects how I live: focused,';
  const line4 = 'intentional and always thinking several steps ahead.';

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-8">
      <div className="text-[32px] leading-normal max-w-7xl font-body uppercase w-full space-y-1">
        
        {/* Line 1 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="font-bold text-right text-[#919191]">{line1}</p>
          {/* Animated layer (primary) */}
          <div ref={line1Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="font-bold text-right text-primary">{line1}</p>
          </div>
        </div>

        {/* Line 2 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="text-left text-[#919191]">
            <span className="font-bold">{line2Bold}</span>
            <span>{line2Rest}</span>
          </p>
          {/* Animated layer (primary) */}
          <div ref={line2Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="text-left text-primary">
              <span className="font-bold">{line2Bold}</span>
              <span>{line2Rest}</span>
            </p>
          </div>
        </div>

        {/* Line 3 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="text-left text-[#919191]">{line3}</p>
          {/* Animated layer (primary) */}
          <div ref={line3Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="text-left text-primary">{line3}</p>
          </div>
        </div>

        {/* Line 4 */}
        <div className="relative">
          {/* Base layer (gray) */}
          <p className="text-left text-[#919191]">{line4}</p>
          {/* Animated layer (primary) */}
          <div ref={line4Ref} className="absolute top-0 left-0 w-full h-full">
            <p className="text-left text-primary">{line4}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
