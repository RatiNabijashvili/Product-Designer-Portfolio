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
  const serviceBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !headerRef.current ||
      !contentRef.current ||
      serviceBlockRefs.current.some((ref) => !ref)
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      // KEEP: Animate the header
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

      // KEEP: Animate the entire content block wrapper
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

      // Animate text for each service block
      serviceBlockRefs.current.forEach((block) => {
        if (!block) return;
        const textWrapper = block.querySelector('.service-text-wrapper');
        if (!textWrapper) return;

        // Timeline for movement (y position)
        const moveTl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'bottom 50%',
            scrub: 1.5,
          },
        });

        moveTl
          .fromTo(textWrapper, { y: -240 }, { y: 0, ease: 'power1.in' })
          .to(textWrapper, {
            y: 240,
            ease: 'power1.out',
          });

        // Timeline for fading (opacity)
        const fadeTl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'bottom 50%',
            scrub: 1,
          },
        });

        fadeTl
          .fromTo(textWrapper, { opacity: 0 }, { opacity: 1, ease: 'power1.in' })
          .to(textWrapper, {
            opacity: 0,
            ease: 'power1.out',
          });
      });
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
          const isIconOnLeft = index % 2 !== 0;
          const Icon = service.icon;

          const iconDiv = (
            <div className="col-span-1 flex h-[480px] items-center justify-center">
              <Icon className="h-[200px] w-[200px] text-primary" />
            </div>
          );

          const emptyDiv = <div className="col-span-1 h-[480px]"></div>;

          const textContainer = (
            <div className="relative col-span-2 h-[480px] overflow-hidden border-x border-[#DCDCDC]">
              <div className="service-text-wrapper absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-6 text-center">
                <h3 className="font-body text-[32px] font-bold uppercase leading-[1.2] text-primary">
                  {service.title}
                </h3>
                <p className="mx-auto max-w-[720px] font-body text-xl font-medium capitalize leading-[1.5] text-[#919191]">
                  {service.description}
                </p>
              </div>
            </div>
          );

          return (
            <div
              key={service.id}
              ref={(el) => (serviceBlockRefs.current[index] = el)}
              className="border-b border-[#DCDCDC] last:border-b-0"
            >
              <div className="grid w-full grid-cols-4 items-center">
                {isIconOnLeft ? iconDiv : emptyDiv}
                {textContainer}
                {isIconOnLeft ? emptyDiv : iconDiv}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
