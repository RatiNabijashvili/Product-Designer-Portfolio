'use client';

<<<<<<< HEAD
import Image from 'next/image';
import { Trophy, Clapperboard } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

=======
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Trophy, Clapperboard } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(ScrollTrigger);

>>>>>>> 1ab173d (Initial commit)
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
<<<<<<< HEAD
  { icon: FootballIcon, text: 'Visca Barca' },
  { icon: Trophy, text: 'Scuderia Ferrari' },
  { icon: Clapperboard, text: 'Interstellar' },
=======
  { icon: () => <img src="/ball.svg" alt="Football" className="h-6 w-6" />, text: 'Visca Barca' },
  { icon: () => <img src="/trophy.svg" alt="Trophy" className="h-6 w-6" />, text: 'Scuderia Ferrari' },
  { icon: () => <img src="/popcorn.svg" alt="Movie" className="h-6 w-6" />, text: 'Interstellar' },
>>>>>>> 1ab173d (Initial commit)
];

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === 'about-portrait');
<<<<<<< HEAD

  return (
    <section id="about" className="mt-40">
      <div className="px-8">
        <header className="mb-12">
=======
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

      // Create a timeline for sequential animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
      });

      // 1. Title slides from left
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' }
        );
      }

      // 2. Image slides from right
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.4' // Start 0.4s before previous animation ends
        );
      }

      // 3. Text slides from right (middle of image animation)
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.4' // Start 0.4s before previous animation ends
        );
      }

      // 4. Interests slide from left
      if (interestsRef.current) {
        tl.fromTo(
          interestsRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.75, ease: 'power2.out' },
          '-=0.4' // Start 0.4s before previous animation ends
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="mt-40">
      <div className="px-8">
        <header ref={headerRef} className="mb-12">
>>>>>>> 1ab173d (Initial commit)
          <h2 className="text-xl font-bold uppercase leading-none text-[#919191]">
            03 / ABOUT
          </h2>
        </header>
      </div>
      <div className="relative px-8">
<<<<<<< HEAD
        <h3 className="absolute top-0 left-8 font-body text-[32px] font-bold uppercase leading-[1.5] text-primary min-w-[593px]">
=======
        <h3 ref={titleRef} className="absolute top-0 left-8 font-body text-[32px] font-bold uppercase leading-[1.5] text-primary min-w-[593px]">
>>>>>>> 1ab173d (Initial commit)
          I’M RATI.
          <br />
          PRODUCT DESIGNER FROM GEORGIA.
          <br />
          CURRENTLY AT @NOXTTON.
        </h3>

        <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-16 mt-36">
<<<<<<< HEAD
          <div className="flex flex-col gap-4">
            {interests.map((interest, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <interest.icon className="h-6 w-6 text-[#919191]" />
=======
          <div ref={interestsRef} className="flex flex-col gap-4">
            {interests.map((interest, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <interest.icon />
>>>>>>> 1ab173d (Initial commit)
                <span className="font-body text-base font-bold capitalize leading-[1.2] text-[#919191]">
                  {interest.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-end gap-4">
<<<<<<< HEAD
            <div className="max-w-[320px] space-y-4 text-xl font-medium leading-[1.5] text-[#919191]">
=======
            <div ref={textRef} className="max-w-[320px] space-y-4 text-xl font-medium leading-[1.5] text-[#919191]">
>>>>>>> 1ab173d (Initial commit)
                <p>
                  With 3+ years of experience in the design industry, I’ve had
                  the opportunity to work with both corporate teams and
                  freelance clients, helping craft thoughtful, intentional
                  digital experiences.
                </p>
                <p>
                  I’m pushing boundaries and exploring the creative development
                  world, using AI to craft innovative, next-level experiences.
                </p>
            </div>
            
            {aboutImage && (
<<<<<<< HEAD
              <div className="relative w-full lg:w-[480px] h-auto aspect-[3/4] lg:h-[640px] shrink-0 overflow-hidden rounded-lg">
=======
              <div ref={imageRef} className="relative w-full lg:w-[480px] h-auto aspect-[3/4] lg:h-[640px] shrink-0 overflow-hidden rounded-lg">
>>>>>>> 1ab173d (Initial commit)
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
