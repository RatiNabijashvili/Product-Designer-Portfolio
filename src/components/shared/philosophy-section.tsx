'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useLayoutEffect(() => {
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
        [text1Ref.current, text2Ref.current],
        { opacity: 0 },
        { opacity: 1, stagger: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-8">
      <div className="text-[32px] leading-normal max-w-7xl font-body uppercase">
        <p ref={text1Ref} className="font-bold text-primary text-right">
          I design with purpose, creating clarity, simplicity and
        </p>
        <p ref={text2Ref} className="text-left">
          <span className="font-bold text-primary">experiences that</span>
          <span className="text-[#919191]">
            {' '}
            feel effortless. Every detail matters and every choice has meaning. My work reflects
            how I live: focused, intentional and always thinking several steps
            ahead.
          </span>
        </p>
      </div>
    </section>
  );
}
