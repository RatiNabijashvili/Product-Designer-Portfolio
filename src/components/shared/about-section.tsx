'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Trophy, Clapperboard } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FootballIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 5l3 4" />
    <path d="M12 5a4.2 4.2 0 0 0-3 4" />
    <path d="M5 12a4.2 4.2 0 0 0 4 3" />
    <path d="M19 12a4.2 4.2 0 0 1-4-3" />
    <path d="m12 19-3-4" />
    <path d="M12 19a4.2 4.2 0 0 1-3-4" />
  </svg>
);

const interests = [
  { icon: () => <img src="/ball.svg" alt="Football" className="h-5 w-5 min-[821px]:h-6 min-[821px]:w-6" />, text: 'Visca Barca' },
  { icon: () => <img src="/trophy.svg" alt="Trophy" className="h-5 w-5 min-[821px]:h-6 min-[821px]:w-6" />, text: 'Scuderia Ferrari' },
  { icon: () => <img src="/popcorn.svg" alt="Movie" className="h-5 w-5 min-[821px]:h-6 min-[821px]:w-6" />, text: 'Interstellar' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !headerRef.current) {
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

      const media = gsap.matchMedia();

      media.add('(min-width: 821px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        });

        if (titleRef.current) {
          tl.fromTo(
            titleRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' }
          );
        }

        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
            '-=0.4'
          );
        }

        if (textRef.current) {
          tl.fromTo(
            textRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
            '-=0.4'
          );
        }

        if (interestsRef.current) {
          tl.fromTo(
            interestsRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
            '-=0.4'
          );
        }
      });

      const animateStackedAbout = () => {
        const aboutItems = [
          titleRef.current,
          imageRef.current,
          textRef.current,
          interestsRef.current,
        ].filter(Boolean) as HTMLElement[];

        gsap.set(aboutItems, { opacity: 0, y: 64 });

        ScrollTrigger.batch(aboutItems, {
          start: 'top 85%',
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1.4,
              ease: 'power2.out',
              stagger: 0.2,
            }),
          once: true,
        });
      };

      media.add('(max-width: 820px)', animateStackedAbout);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="mt-[72px] min-[821px]:mt-40">
      <div className="px-4 min-[821px]:px-8">
        <header ref={headerRef} className="mb-12">
          <h2 className="text-base font-bold uppercase leading-none text-[#919191] min-[821px]:text-xl">
            03 / ABOUT
          </h2>
        </header>
      </div>
      <div className="relative px-4 min-[821px]:px-8">
        <h3 ref={titleRef} className="tablet-about-title font-body text-2xl font-bold uppercase leading-[1.5] text-primary min-[821px]:absolute min-[821px]:left-8 min-[821px]:top-0 min-[821px]:min-w-[593px] min-[821px]:text-[32px]">
          I’M RATI.
          <span className="hidden min-[821px]:inline"><br /></span>
          PRODUCT DESIGNER FROM GEORGIA.
          <span className="hidden min-[821px]:inline"><br /></span>
          CURRENTLY AT @NOXTTON.
        </h3>

        <div className="tablet-about-layout mt-6 flex w-full flex-col items-end justify-between gap-6 lg:mt-36 lg:flex-row lg:gap-16">
          <div ref={interestsRef} className="tablet-about-interests order-3 flex w-full flex-col gap-3 lg:order-none lg:w-auto lg:gap-4">
            {interests.map((interest, index) => (
              <div key={index} className="flex w-full items-center justify-start gap-2 lg:w-auto">
                <interest.icon />
                <span className="font-body text-sm font-bold capitalize leading-[1.2] text-[#919191] min-[821px]:text-base">
                  {interest.text}
                </span>
              </div>
            ))}
          </div>

          <div className="tablet-about-content order-2 flex w-full flex-col-reverse items-end gap-6 lg:order-none lg:w-auto lg:flex-row lg:gap-4">
            <div ref={textRef} className="tablet-about-text w-full space-y-2 text-base font-medium leading-[1.5] text-[#919191] lg:max-w-[320px] lg:space-y-4 lg:text-xl">
                <p>
                  With 4+ years of experience in the design industry, I’ve had
                  the opportunity to work with both corporate teams and
                  freelance clients, helping craft thoughtful, intentional
                  digital experiences.
                </p>
                <p>
                  I’m pushing boundaries and exploring the creative development
                  world, using AI to craft innovative, next-level experiences.
                </p>
            </div>
            
            <div ref={imageRef} className="tablet-about-image relative aspect-[3/4] h-auto w-full shrink-0 overflow-hidden rounded-lg lg:h-[640px] lg:w-[480px]">
              <Image
                src="/Personal_Image.webp"
                alt="Rati Nabijashvili"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
