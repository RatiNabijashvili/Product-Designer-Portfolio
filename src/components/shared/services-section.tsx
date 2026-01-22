'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { services } from '@/lib/services-data';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // A guard to ensure all refs are mounted
    if (!sectionRef.current || !headerRef.current || !contentRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Animate the header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
            once: true,
          },
        }
      );

      // Animate the content block
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mt-40">
      <div className="px-8">
        <header ref={headerRef} className="mb-12">
          <h2 className="text-xl font-bold uppercase leading-none text-[#919191]">
            02 / SERVICES
          </h2>
        </header>
      </div>
      <div ref={contentRef} className="border-y border-[#DCDCDC]">
        {services.map((service, index) => {
          // even index (0, 2) => icon on right, odd index (1, 3) => icon on left
          const isIconOnLeft = index % 2 !== 0;
          const Icon = service.icon;

          const iconDiv = (
            <div className="col-span-1 flex h-[480px] items-center justify-center">
              <Icon className="h-[200px] w-[200px] text-[#DCDCDC]" />
            </div>
          );

          const emptyDiv = <div className="col-span-1 h-[480px]"></div>;

          const textDiv = (
            <div className="col-span-2 flex h-[480px] flex-col items-center justify-center space-y-2 border-x border-[#DCDCDC] px-6 text-center">
              <h3 className="font-body text-[32px] font-bold uppercase leading-[1.2] text-primary">
                {service.title}
              </h3>
              <p className="max-w-[720px] font-body text-xl font-medium capitalize leading-[1.5] text-[#919191]">
                {service.description}
              </p>
            </div>
          );

          return (
            <div
              key={service.id}
              className="border-b border-[#DCDCDC] last:border-b-0"
            >
              <div className="grid w-full grid-cols-4 items-center">
                {isIconOnLeft ? iconDiv : emptyDiv}
                {textDiv}
                {isIconOnLeft ? emptyDiv : iconDiv}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}