'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function UxChallengesAnimations({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const entrance = gsap.timeline({ delay: 0.2 });
      entrance.fromTo(root.querySelector('header'), { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' });
      entrance.fromTo(root.querySelector('[data-project-heading]'), { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.35');
      entrance.fromTo(root.querySelector('[data-project-hero]'), { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');

      root.querySelectorAll('[data-challenge-title], [data-challenge-result]').forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 72%', once: true } });
      });

      root.querySelectorAll('[data-challenge-copy]').forEach((element) => {
        const [heading, ...content] = Array.from(element.children);
        const timeline = gsap.timeline();
        timeline.fromTo(heading, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' });
        timeline.fromTo(content, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.25');
        // Register only after the timeline has content. Refreshing an unfinished
        // timeline can remove once-only triggers while GSAP is traversing them.
        ScrollTrigger.create({ trigger: element, start: 'top 72%', once: true, animation: timeline }).refresh();
      });

      root.querySelectorAll('[data-challenge-visual]').forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 78%', once: true } });
      });

      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      root.querySelectorAll('[data-comparison-step]').forEach((element, index) => {
        const [visual, copy] = Array.from(element.children);
        const timeline = gsap.timeline();
        const direction = index === 1 ? 80 : -80;
        timeline.fromTo(visual, { opacity: 0, x: isMobile ? 0 : direction, y: isMobile ? 64 : 0 }, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power2.out' });
        timeline.fromTo(copy, { opacity: 0, x: isMobile ? 0 : -direction, y: isMobile ? 64 : 0 }, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power2.out' }, '<');
        ScrollTrigger.create({ trigger: element, start: 'top 78%', once: true, animation: timeline }).refresh();
      });
    }, root);

    return () => context.revert();
  }, []);

  return <div ref={rootRef} className="min-h-screen overflow-x-hidden bg-background text-primary" style={{ backgroundImage: 'url(/Background-pattern.webp)', backgroundRepeat: 'repeat' }}>{children}</div>;
}
