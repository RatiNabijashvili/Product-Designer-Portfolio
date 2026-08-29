'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { FooterInfo } from '@/components/shared/footer';

export default function NotFound() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Tbilisi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col bg-background text-primary"
      style={{ backgroundImage: 'url(/Background-pattern.webp)', backgroundRepeat: 'repeat' }}
    >
      <header className="flex w-full items-center justify-between px-4 pt-8 sm:px-8">
        <Link
          href="/"
          aria-label="Rati Nabijashvili — Home"
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#030C0C]"
        >
          <Image
            src="/Logos/Logo.svg"
            alt="Rati Nabijashvili"
            width={153}
            height={35}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <Button className="h-12 w-32 rounded-full bg-accent text-base font-bold text-accent-foreground sm:h-14 sm:w-40 sm:text-xl" asChild>
          <a href="mailto:r.nabijashvili@gmail.com">Contact Me</a>
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16 text-center sm:px-8">
        <div className="flex flex-col items-center">
          <span className="flex h-10 items-center rounded-full border border-[#706F6F] px-6 text-base font-bold leading-[1.2] text-[#706F6F]">
            404
          </span>

          <h1 className="mt-6 font-headline text-[clamp(4rem,8.9vw,8rem)] uppercase leading-[1.1] text-[#030C0C]">
            Page Not Found
          </h1>

          <p className="mt-4 text-base font-medium leading-[1.5] text-[#919191] sm:text-2xl">
            The Page You’re Looking For Doesn’t Exist Or May Have Moved.
          </p>

          <Button className="mt-8 h-12 rounded-full bg-accent px-4 text-base font-bold text-accent-foreground sm:h-14 sm:text-xl" asChild>
            <Link href="/">Back To Home</Link>
          </Button>
        </div>
      </main>

      <div className="px-4 pb-8 sm:px-8">
        <FooterInfo currentTime={currentTime} />
      </div>
    </div>
  );
}
