'use client';

import Image from 'next/image';
import { Trophy, Clapperboard } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
  { icon: FootballIcon, text: 'Visca Barca' },
  { icon: Trophy, text: 'Scuderia Ferrari' },
  { icon: Clapperboard, text: 'Interstellar' },
];

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((p) => p.id === 'about-portrait');

  return (
    <section id="about" className="mt-40">
      <div className="px-8">
        <header className="mb-12">
          <h2 className="text-xl font-bold uppercase leading-none text-[#919191]">
            03 / ABOUT
          </h2>
        </header>
      </div>
      <div className="px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <div className="flex flex-col justify-between gap-32">
            <h3 className="font-body text-[32px] font-bold uppercase leading-[1.5] text-primary">
              I’M RATI.
              <br />
              PRODUCT DESIGNER FROM GEORGIA.
              <br />
              CURRENTLY AT @NOXTTON.
            </h3>

            <div className="flex flex-col gap-4">
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <interest.icon className="h-6 w-6 text-[#919191]" />
                  <span className="font-body text-base font-bold capitalize leading-[1.2] text-[#919191]">
                    {interest.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-row items-end gap-4">
            <div className="space-y-4 text-xl font-medium leading-[1.5] text-[#919191]">
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
              <div className="relative h-[640px] w-[480px] shrink-0 overflow-hidden rounded-lg">
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
