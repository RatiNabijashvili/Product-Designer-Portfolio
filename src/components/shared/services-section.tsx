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
  // We need refs to the individual service blocks to use as triggers
  const serviceBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // A guard to ensure all refs are mounted
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

      // NEW TEXT ANIMATION
      serviceBlockRefs.current.forEach((block, index) => {
        if (!block) return;

        // Find the text wrapper inside the block
        const textWrapper = block.querySelector('.service-text-wrapper');
        if (!textWrapper) return;

        // 1. Animate text moving down with scroll
        gsap.to(textWrapper, {
          y: 100, // Move down by 100px
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top bottom', // Start when block top enters viewport bottom
            end: 'bottom top', // End when block bottom leaves viewport top
            scrub: 0.5,
          },
        });

        // 2. Animate opacity for transitions
        if (index === 0) {
          // First item: Fade out at the bottom
          gsap.to(textWrapper, {
            opacity: 0,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: block,
              start: 'bottom 70%', // Start fade when bottom of block is at 70% of viewport height
              end: 'bottom 50%',
              scrub: true,
            },
          });
        } else {
          // Other items: Fade in at the top, then fade out at the bottom
          // Set initial opacity to 0
          gsap.set(textWrapper, { opacity: 0 });

          // Fade In
          gsap.to(textWrapper, {
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 70%', // Start fade in when top of block is at 70% of viewport height
              end: 'top 50%',
              scrub: true,
            },
          });

          // Fade Out (for all except the last item)
          if (index < services.length - 1) {
            gsap.to(textWrapper, {
              opacity: 0,
              ease: 'power1.in',
              scrollTrigger: {
                trigger: block,
                start: 'bottom 70%',
                end: 'bottom 50%',
                scrub: true,
              },
            });
          }
        }
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
              <Icon className="h-[200px] w-[200px] text-primary opacity-1" />
            </div>
          );

          const emptyDiv = <div className="col-span-1 h-[480px]"></div>;

          // The middle column now just acts as a container for the text wrapper
          const textContainer = (
            <div className="col-span-2 flex h-[480px] flex-col items-center justify-center border-x border-[#DCDCDC] px-6 text-center">
              {/* This is the div we will be animating */}
              <div className="service-text-wrapper space-y-2">
                <h3 className="font-body text-[32px] font-bold uppercase leading-[1.2] text-primary">
                  {service.title}
                </h3>
                <p className="max-w-[720px] font-body text-xl font-medium capitalize leading-[1.5] text-[#919191]">
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
