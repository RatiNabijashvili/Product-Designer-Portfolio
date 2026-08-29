'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFitTextWidth } from '@/hooks/use-fit-text-width';

gsap.registerPlugin(ScrollTrigger);

export function FooterInfo({ currentTime }: { currentTime: string }) {
  return (
    <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-xl font-bold leading-[1.2] text-[#919191]">Freelance Availability</p>
        <p className="text-xl font-bold leading-[1.2] text-[#030C0C]">Available</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-xl font-bold leading-[1.2] text-[#919191]">Georgia Based</p>
        <p className="text-xl font-bold leading-[1.2] text-[#030C0C]">Working Globally</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-xl font-bold leading-[1.2] text-[#919191]">Current Time</p>
        <p className="text-xl font-bold leading-[1.2] text-[#030C0C]">GMT+4 | {currentTime}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-xl font-bold leading-[1.2] text-[#919191]">Connect With Me</p>
        <a
          href="https://www.linkedin.com/in/ratinabijashvili/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1 text-xl font-bold leading-[1.2] text-[#030C0C]"
        >
          <div className="relative h-[1.44rem] overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Linkedin</span>
            <span className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">Linkedin</span>
          </div>
          <img src="/arrow-up-right.svg" alt="External link" className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

export function Footer({ showHomeLink = false }: { showHomeLink?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingTextRef = useRef<HTMLSpanElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useFitTextWidth(headingRef, headingTextRef, {
    variableName: '--footer-title-size',
  });

  useEffect(() => {
    const updateTime = () => {
      const time = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tbilisi',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBackToTop = () => {
    const scrollPosition = { y: window.scrollY };

    gsap.to(scrollPosition, {
      y: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: () => window.scrollTo(0, scrollPosition.y),
    });
  };

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add('(max-width: 768px)', () => {
        const footerItems = [
          headingRef.current,
          emailRef.current,
          infoContainerRef.current,
          dividerRef.current,
          copyrightRef.current,
          patternRef.current,
        ].filter((item): item is HTMLDivElement => item !== null);

        if (patternRef.current) gsap.set(patternRef.current, { x: 204 });

        gsap.fromTo(footerItems, { opacity: 0, y: 64 }, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%', once: true },
        });
      });

      media.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            once: true,
          },
        });

        if (headingRef.current) {
          tl.fromTo(headingRef.current, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' });
        }
        if (emailRef.current) {
          tl.fromTo(emailRef.current, { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, '-=0.4');
        }
        if (infoContainerRef.current) {
          tl.fromTo(infoContainerRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, '-=0.3');
        }
        if (dividerRef.current) {
          tl.fromTo(dividerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
        }
        if (copyrightRef.current) {
          tl.fromTo(copyrightRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
        }
        if (patternRef.current) {
          tl.fromTo(patternRef.current, { opacity: 0, x: 408 }, { opacity: 1, x: 204, duration: 1, ease: 'power2.out' }, '-=0.4');
        }
      });
    }, footerRef);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('r.nabijashvili@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer ref={footerRef} className="relative mt-[72px] flex min-h-screen flex-col justify-between overflow-hidden px-4 py-8 md:mt-40 md:p-8">
      {/* Single geometric shape from right side */}
      <div 
        ref={patternRef} 
        className="pointer-events-none absolute right-[20%] top-[16%] h-[240px] w-[240px] opacity-0 md:right-0 md:top-1/4 md:h-[408px] md:w-[408px]"
        style={{
          backgroundImage: 'url(/Footer-Pattern.webp)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      {/* Top section: Heading and Email */}
      <div className="relative z-10 flex flex-col items-start gap-6 sm:gap-16">
        {/* Main heading - full width like hero */}
        <div ref={headingRef} className="w-full">
          <h2 className="footer-display-title w-full whitespace-nowrap text-center font-headline leading-[0.82] tracking-normal uppercase text-primary">
            <span ref={headingTextRef} className="inline-block">Let's Work Together</span>
          </h2>
        </div>

        {/* Email with copy button */}
        <div ref={emailRef} className="relative">
          <button
            onClick={handleCopyEmail}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="group flex max-w-full items-center gap-2 rounded p-1"
            aria-label="Copy email"
          >
            <div className="relative h-[1.8rem] overflow-hidden sm:h-[2.4rem]">
              <span className="block text-2xl font-bold leading-[1.2] text-[#030C0C] transition-transform duration-300 group-hover:-translate-y-full sm:text-[clamp(1.25rem,5.8vw,1.875rem)]">
                r.nabijashvili@gmail.com
              </span>
              <span className="absolute left-0 top-full block text-2xl font-bold leading-[1.2] text-[#030C0C] transition-transform duration-300 group-hover:-translate-y-full sm:text-[clamp(1.25rem,5.8vw,1.875rem)]">
                r.nabijashvili@gmail.com
              </span>
            </div>
            <img src="/copy.svg" alt="Copy" className="h-6 w-6 sm:h-5 sm:w-5" />
          </button>
          
          {/* Tooltip - button style */}
          {showTooltip && !copied && (
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-full bg-[#181818] px-6 py-3 text-base font-bold leading-[120%] capitalize text-[#FCFAFA] shadow-lg">
              Click to copy!
            </div>
          )}
          {copied && (
            <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-full bg-green-600 px-6 py-3 text-base font-bold leading-[120%] capitalize text-white shadow-lg">
              Copied!
            </div>
          )}
        </div>
      </div>

      {/* Bottom container with 64px gap */}
      <div className="relative z-10 mt-[320px] md:mt-0">
        <div ref={infoContainerRef} className="mt-0 md:mt-16">
          <FooterInfo currentTime={currentTime} />
        </div>

        {/* Divider line */}
        <div ref={dividerRef} className="my-8 h-px w-full bg-[#DCDCDC] md:my-16"></div>

        {/* Copyright and Back to Top */}
        <div ref={copyrightRef} className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
        <p className="max-w-[28rem] text-center text-body font-bold leading-[1.2] text-[#030C0C] md:max-w-none md:text-left">
          Copyright © 2026 Rati Nabijashvili. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {showHomeLink && (
            <Link href="/" className="group flex items-center gap-1 text-body font-bold leading-[1.2] text-[#030C0C]">
              <div className="relative h-[1.2rem] overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Home</span>
                <span className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">Home</span>
              </div>
              <img src="/home-round-door.svg" alt="" aria-hidden="true" className="h-5 w-5" />
            </Link>
          )}
          <button
            onClick={handleBackToTop}
            className="group flex items-center gap-1 text-body font-bold leading-[1.2] text-[#030C0C]"
          >
            <div className="relative h-[1.2rem] overflow-hidden">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                Back To Top
              </span>
              <span className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
                Back To Top
              </span>
            </div>
            <img src="/arrow-up.svg" alt="Arrow up" className="h-5 w-5" />
          </button>
        </div>
      </div>
      </div>
    </footer>
  );
}
