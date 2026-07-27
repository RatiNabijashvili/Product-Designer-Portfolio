'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/shared/footer';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const tags = ['SaaS', 'B2B', 'B2C', 'Marketing Page'];

const overview = [
  ['Industry', 'MarTech'],
  ['Role', 'Product Designer'],
  ['Product Duration', '1 Month'],
  ['Key Markets', 'Georgia'],
  ['Growth Stage', 'Startup'],
  ['Company Size', '10+'],
];

const challengePoints = [
  'Important insights were spread across separate views',
  'Campaigns were difficult to compare',
  'Changes in message volume were hard to recognize',
  "The marketing website did not clearly explain the product's value",
];

const analysisPoints = [
  ['Centralize important information:', 'Bring key campaign data, mentions, sentiment, and activity into a clearer overview.'],
  ['Support faster comparison:', 'Allow teams to compare campaigns using consistent metrics in one place.'],
  ['Make trends easier to recognize:', 'Use clearer visualizations to reveal peaks, drops, and changes in conversation volume.'],
];

const solutionPoints = [
  ['Centralized Dashboard:', 'The redesigned dashboard organizes key brand intelligence data into a clear hierarchy, helping teams understand performance without moving between multiple views.'],
  ['Campaign Comparison:', 'A side-by-side comparison view allows teams to evaluate multiple campaigns and identify differences in performance more efficiently.'],
  ['Unified Inbox:', 'Messages and brand mentions are brought into one structured inbox, making important conversations easier to review and manage.'],
  ['Message Volume Trends:', 'Time-based visualizations help teams identify unusual activity, campaign peaks, and changes in brand conversation over time.'],
  ['Marketing Website:', 'The marketing website was redesigned with a clearer content structure and stronger visual identity to better communicate Hapttic’s capabilities and value.'],
];

const outcomes = [
  "The redesign transformed Hapttic's fragmented experience into a clearer and more structured brand intelligence platform.",
  'Campaign data, messages, sentiment, and trends were organized into focused workflows, helping teams understand brand activity without constantly moving between separate views. The new comparison tools made campaign performance easier to evaluate, while message-volume visualizations provided clearer context around peaks, drops, and changes over time.',
  "The redesigned marketing website also strengthened Hapttic's positioning by communicating the product's capabilities through a clearer content hierarchy and a more consistent visual identity.",
  'Overall, the project created a more cohesive experience across the website and dashboard, making Hapttic easier to understand, navigate, and use for brand monitoring and campaign analysis.',
];

const swatches = [
  ['#8080FF', '#8080FF'],
  ['#9AE6E7', '#9AE6E7'],
  ['#FF6833', '#FF6833'],
  ['#FBE74D', '#FBE74D'],
  ['#8383A5', '#8383A5'],
];

const noxtton = {
  tags: ['Fintech', 'B2C', 'Mobile App'],
  overview: [
    ['Industry', 'Fintech'],
    ['Role', 'Product Designer'],
    ['Product Duration', '1 Month'],
    ['Key Markets', 'Georgia'],
    ['Growth Stage', 'Startup'],
    ['Company Size', '60+'],
  ],
  challengePoints: [
    'Fear of making an irreversible mistake',
    'Confusion around networks and transaction fees',
    'Low confidence when handling recovery phrases',
    'Difficulty understanding whether a transaction was successful',
    'Too much technical language during important actions',
  ],
  analysisPoints: [
    ['Make the wallet immediately usable:', 'Allow users to access essential actions without forcing them through a long educational or security setup.'],
    ['Reduce uncertainty during transactions:', 'Clearly communicate the recipient, network, amount, fee, transaction status, and irreversible consequences before funds are sent.'],
    ['Introduce security progressively:', 'Encourage App Lock, recovery-phrase backup, and safety education at relevant moments without blocking the user’s first experience.'],
  ],
  solutionPoints: [
    ['Progressive Onboarding:', 'A new wallet is created automatically when the app opens, allowing users to reach the home screen and access Receive, Send, and Activity within seconds. Recovery-phrase backup and App Lock are introduced through non-blocking reminders after the wallet becomes usable.'],
    ['Guardian Mode:', 'Guardian Mode adds safety checks throughout the sending process. The flow includes address validation, network-mismatch warnings, unknown-token warnings, clear fee information, and an additional confirmation step before a transaction is completed.'],
    ['Clear Sending and Receiving:', 'The Receive experience gives users quick access to their wallet address and QR code, with clear copy and share actions. The Send experience divides the transaction into logical steps and provides feedback when information is valid or incomplete.'],
    ['Understandable Activity:', 'The Activity section brings incoming and outgoing transactions into one structured history. Each transaction clearly communicates its direction, asset, amount, status, time, and counterparty.'],
    ['Guided Education:', 'Optional coach marks explain the wallet’s key functions directly inside the interface, while simple language introduces one concept at a time.'],
    ['Pro-of-Trust Rewards:', 'An opt-in rewards experience encourages continued engagement through normal wallet activity. Users earn tickets and points by completing actions such as sending or receiving funds.'],
  ],
  outcomes: [
    'The final design created a more approachable self-custodial wallet experience focused on clarity, safety, and confidence.',
    'Complex concepts such as networks, transaction fees, recovery phrases, and irreversible transfers were translated into understandable steps, visible confirmations, and contextual guidance.',
    'Progressive onboarding allowed users to begin using the wallet quickly, while Guardian Mode introduced additional protection during high-risk actions. Clear transaction history and guided education made it easier for newcomers to understand what was happening throughout the experience.',
    'Overall, the project established a cohesive, demo-ready product direction that balances the freedom of self-custody with the guidance first-time users need to manage and transfer digital assets confidently.',
  ],
  swatches: [
    ['#473BF0', '#473BF0'],
    ['#984FF2', '#984FF2'],
    ['#101010', '#101010'],
    ['#181818', '#181818'],
    ['#F7F7FF', '#F7F7FF'],
  ],
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold uppercase leading-[1.2] text-[#030C0C] md:text-[32px]">{children}</h2>;
}

function useSectionReveal(enabled = true) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!enabled || !sectionRef.current || !headingRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } });
      timeline.fromTo(headingRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' });
      timeline.fromTo(contentRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.25');
    }, sectionRef);
    return () => ctx.revert();
  }, [enabled]);

  return { sectionRef, headingRef, contentRef };
}

function ProjectOverview({ items = overview }: { items?: string[][] }) {
  const { sectionRef, headingRef, contentRef } = useSectionReveal();
  return (
    <section ref={sectionRef} className="mt-12">
      <div ref={headingRef}><SectionTitle>Project Overview</SectionTitle></div>
      <div ref={contentRef}>
        <dl className="mt-4 grid overflow-hidden rounded-lg border border-[#DCDCDC] sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([label, value], index) => (
            <div key={label} className={cn('flex min-h-32 flex-col justify-end gap-1.5 p-4 md:min-h-40', index < 5 && 'border-b', index >= 4 && 'sm:border-b-0', index % 2 === 0 && 'sm:border-r', index % 3 === 2 && 'lg:border-r-0', index % 3 !== 2 && 'lg:border-r', index < 3 && 'lg:border-b', index >= 3 && 'lg:border-b-0')}>
              <dt className="text-base font-medium leading-[1.2] text-[#919191] md:text-xl">{label}</dt>
              <dd className="text-xl font-bold leading-[1.2] text-[#030C0C] md:text-2xl">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function TextSection({
  title,
  intro,
  points,
  reveal = false,
}: {
  title: string;
  intro?: string;
  points?: Array<string | string[]>;
  reveal?: boolean;
}) {
  const { sectionRef, headingRef, contentRef } = useSectionReveal(reveal);
  return (
    <section ref={sectionRef} className="mt-12 flex flex-col gap-4">
      <div ref={headingRef}><SectionTitle>{title}</SectionTitle></div>
      <div ref={contentRef} className="flex flex-col gap-2">
        {intro && <p className="text-base font-medium leading-[1.5] text-[#919191] md:text-xl">{intro}</p>}
        {points && (
          <ul className="list-disc space-y-1 pl-6 text-base leading-[1.6] md:text-xl">
            {points.map((point, index) => (
              <li key={index} className="pl-1 text-[#474747]">
                {Array.isArray(point) ? (
                  <><strong>{point[0]}</strong>{' '}<span className="font-medium text-[#919191]">{point[1]}</span></>
                ) : <strong>{point}</strong>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function OutcomeSection({ items = outcomes }: { items?: string[] }) {
  const { sectionRef, headingRef, contentRef } = useSectionReveal();
  return (
    <section ref={sectionRef} className="mt-12 flex flex-col gap-4">
      <div ref={headingRef}><SectionTitle>Outcome</SectionTitle></div>
      <div ref={contentRef} className="flex flex-col gap-2">
        {items.map((paragraph) => (
          <p key={paragraph} className="text-base font-medium leading-[1.5] text-[#919191] md:text-xl">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function ReferenceVisual({
  className,
  src,
  label,
}: {
  className?: string;
  src: string;
  label: string;
}) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-lg bg-[#E4E4E4]', className)}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1376px"
        className="object-cover"
      />
    </div>
  );
}

function ProjectVideo() {
  return (
    <div className="mt-12 aspect-[1440/811] w-full overflow-hidden bg-[#E4E4E4]">
      <video autoPlay muted playsInline loop preload="auto" className="block h-full w-full object-cover">
        <source src="/Slideshow-Loop-[remix] - 720p 30fps.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export function HaptticProjectPage({ project = 'hapttic' }: { project?: 'hapttic' | 'noxtton' }) {
  const isNoxtton = project === 'noxtton';
  const projectTags = isNoxtton ? noxtton.tags : tags;
  const projectOverview = isNoxtton ? noxtton.overview : overview;
  const projectChallengePoints = isNoxtton ? noxtton.challengePoints : challengePoints;
  const projectAnalysisPoints = isNoxtton ? noxtton.analysisPoints : analysisPoints;
  const projectSolutionPoints = isNoxtton ? noxtton.solutionPoints : solutionPoints;
  const projectOutcomes = isNoxtton ? noxtton.outcomes : outcomes;
  const projectSwatches = isNoxtton ? noxtton.swatches : swatches;
  const assetBase = isNoxtton ? '/Projects/Noxtton-Wallet' : '/Projects/Happtic';
  const projectName = isNoxtton ? 'Noxtton Wallet' : 'Hapttic';
  const headerRef = useRef<HTMLElement>(null);
  const projectHeadingRef = useRef<HTMLDivElement>(null);
  const projectDescriptionRef = useRef<HTMLParagraphElement>(null);
  const projectVideoRef = useRef<HTMLDivElement>(null);
  const firstGalleryRef = useRef<HTMLElement>(null);
  const galleryFirstImageRef = useRef<HTMLDivElement>(null);
  const gallerySecondLeftRef = useRef<HTMLDivElement>(null);
  const gallerySecondRightRef = useRef<HTMLDivElement>(null);
  const galleryThirdLeftRef = useRef<HTMLDivElement>(null);
  const galleryThirdRightRef = useRef<HTMLDivElement>(null);
  const secondGalleryRef = useRef<HTMLElement>(null);
  const solutionGalleryTopLeftRef = useRef<HTMLDivElement>(null);
  const solutionGalleryTopRightRef = useRef<HTMLDivElement>(null);
  const solutionGalleryBottomFirstRef = useRef<HTMLDivElement>(null);
  const solutionGalleryBottomSecondRef = useRef<HTMLDivElement>(null);
  const solutionGalleryBottomThirdRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headerRef.current || !projectHeadingRef.current || !projectDescriptionRef.current || !projectVideoRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.2 });

      timeline.fromTo(
        headerRef.current,
        { opacity: 0, y: -80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        }
      );

      timeline.fromTo(
        projectHeadingRef.current,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.35'
      );

      timeline.fromTo(
        projectDescriptionRef.current,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );

      timeline.fromTo(
        projectVideoRef.current,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!secondGalleryRef.current) return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const ctx = gsap.context(() => {
      const topRow = gsap.timeline({ scrollTrigger: { trigger: solutionGalleryTopLeftRef.current, start: 'top 78%', once: true } });
      topRow.fromTo(solutionGalleryTopLeftRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
      topRow.fromTo(solutionGalleryTopRightRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '<');

      const bottomRow = gsap.timeline({ scrollTrigger: { trigger: solutionGalleryBottomFirstRef.current, start: 'top 78%', once: true } });
      [solutionGalleryBottomFirstRef.current, solutionGalleryBottomSecondRef.current, solutionGalleryBottomThirdRef.current].forEach((image, index) => {
        bottomRow.fromTo(image, { opacity: 0, x: isMobile ? 0 : -80, y: isMobile ? 64 : 0 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power2.out' }, index === 0 ? 0 : '-=0.4');
      });
    }, secondGalleryRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!firstGalleryRef.current) return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(galleryFirstImageRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: galleryFirstImageRef.current, start: 'top 78%', once: true } });
      const secondRow = gsap.timeline({ scrollTrigger: { trigger: gallerySecondLeftRef.current, start: 'top 78%', once: true } });
      secondRow.fromTo(gallerySecondLeftRef.current, { opacity: 0, x: isMobile ? 0 : -80, y: isMobile ? 64 : 0 }, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power2.out' });
      secondRow.fromTo(gallerySecondRightRef.current, { opacity: 0, x: isMobile ? 0 : 80, y: isMobile ? 64 : 0 }, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power2.out' }, '<');
      const thirdRow = gsap.timeline({ scrollTrigger: { trigger: galleryThirdLeftRef.current, start: 'top 78%', once: true } });
      thirdRow.fromTo(galleryThirdLeftRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
      thirdRow.fromTo(galleryThirdRightRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '<');
    }, firstGalleryRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-primary" style={{ backgroundImage: 'url(/Background-pattern.png)', backgroundRepeat: 'repeat' }}>
      <header ref={headerRef} className="flex w-full items-center justify-between px-4 pt-8 sm:px-8">
        <Link href="/" className="rounded-sm text-2xl font-bold tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#030C0C]">RATI</Link>
        <Button className="h-12 w-32 rounded-full bg-accent text-base font-bold text-accent-foreground sm:h-14 sm:w-40 sm:text-xl" asChild>
          <a href="mailto:r.nabijashvili@gmail.com">Contact Me</a>
        </Button>
      </header>

      <main>
        <div className="px-4 sm:px-8">
          <section className="mt-16 flex flex-col gap-4">
            <div ref={projectHeadingRef} className="flex flex-col items-start justify-between gap-4 md:flex-row">
              <h1 className="text-2xl font-bold uppercase leading-[1.2] md:text-[32px]">{projectName}</h1>
              <div className="flex flex-wrap gap-3 md:justify-end">
                {projectTags.map((tag) => <span key={tag} className="flex h-10 items-center rounded-full border border-[#706F6F] px-3 text-sm font-bold text-[#706F6F]">{tag}</span>)}
              </div>
            </div>
            <p ref={projectDescriptionRef} className="w-full text-base font-medium leading-[1.5] text-[#919191] md:w-[560px] md:text-xl">
              {isNoxtton
                ? 'Noxtton Wallet is a self-custodial mobile wallet for EVM networks, designed to make managing and transferring digital assets feel safer and more understandable for newcomers.'
                : 'Hapttic is a real-time brand intelligence platform that helps teams track online mentions, analyze sentiment, monitor campaigns, and respond to important conversations.'}
            </p>
          </section>
        </div>

        <div ref={projectVideoRef}>
          <ProjectVideo />
        </div>

        <div className="px-4 sm:px-8">
          <ProjectOverview items={projectOverview} />
          <TextSection reveal title="The Challenge" intro={isNoxtton ? 'Most self-custodial wallets assume that users already understand networks, recovery phrases, transaction fees, and wallet addresses. For newcomers, this creates several challenges:' : 'The existing experience made it difficult for teams to quickly understand brand performance. The main issues were:'} points={projectChallengePoints} />
          <TextSection reveal title="Product Analysis" intro={isNoxtton ? 'I reviewed the product requirements, core wallet journeys, security risks, and the needs of the “Cautious Newcomer” persona. The analysis highlighted three main design opportunities:' : 'I reviewed the existing dashboard, product requirements, information architecture, and core brand-monitoring workflows. The analysis highlighted three main opportunities:'} points={projectAnalysisPoints} />

          <section ref={firstGalleryRef} className="mt-12 flex flex-col gap-4" aria-label={`${projectName} brand gallery`}>
            <div ref={galleryFirstImageRef}>
              <ReferenceVisual src={`${assetBase}/First Image.png`} label={`${projectName} product overview`} className="aspect-[1376/640] w-full" />
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
              <div ref={gallerySecondLeftRef} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-[304fr_480fr]">
                  <div className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-[#E4E4E4] p-6"><img src={`${assetBase}/First Logo.svg`} alt={`${projectName} symbol`} className="h-8 w-auto max-w-[80%] object-contain" /></div>
                  <div className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-[#222] p-6"><img src={`${assetBase}/Second Logo.svg`} alt={`${projectName} logo`} className="h-8 w-auto max-w-[80%] object-contain" /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-4">
                    <ReferenceVisual src={`${assetBase}/Second image.png`} label={`${projectName} icon system`} className="aspect-[392/294]" />
                    <ReferenceVisual src={`${assetBase}/Third Image.png`} label={`${projectName} mobile interface`} className="aspect-[392/294]" />
                  </div>
                  <div className="grid grid-rows-5 gap-2">
                    {projectSwatches.map(([code, color]) => <div key={code} className={cn('flex h-20 items-center justify-center overflow-hidden rounded-lg p-2 font-body text-xl font-bold uppercase leading-[1.2] sm:h-auto sm:min-h-14 sm:text-2xl', isNoxtton && code !== '#F7F7FF' ? 'text-white' : 'text-[#030C0C]')} style={{ backgroundColor: color }}>{code}</div>)}
                  </div>
                </div>
              </div>
              <div ref={gallerySecondRightRef} className="h-full">
                <ReferenceVisual src={`${assetBase}/Fourth Image.png`} label={`${projectName} mobile use cases`} className="aspect-[560/740] h-full lg:aspect-auto" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div ref={galleryThirdLeftRef}>
                <ReferenceVisual src={`${assetBase}/Fifth Image.png`} label={`${projectName} mobile interface`} className="aspect-[680/510]" />
              </div>
              <div ref={galleryThirdRightRef}>
                <ReferenceVisual src={`${assetBase}/Sixth Image.png`} label={`${projectName} transaction flow`} className="aspect-[680/510]" />
              </div>
            </div>
          </section>

          <TextSection reveal title="The Solution" points={projectSolutionPoints} />

          <section ref={secondGalleryRef} className="mt-12 flex flex-col gap-4" aria-label={`${projectName} solution gallery`}>
            <div className="grid gap-4 md:grid-cols-2">
              <div ref={solutionGalleryTopLeftRef}>
                <ReferenceVisual src={`${assetBase}/Seventh Image.png`} label={`${projectName} receive screen`} className="aspect-[680/510]" />
              </div>
              <div ref={solutionGalleryTopRightRef}>
                <ReferenceVisual src={`${assetBase}/Eigth Image.png`} label={`${projectName} activity screen`} className="aspect-[680/510]" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div ref={solutionGalleryBottomFirstRef}>
                <ReferenceVisual src={`${assetBase}/Ninth Image.png`} label={`${projectName} wallet actions`} className="aspect-[448/336]" />
              </div>
              <div ref={solutionGalleryBottomSecondRef}>
                <ReferenceVisual src={`${assetBase}/Tenth Image.png`} label={`${projectName} security settings`} className="aspect-[448/336]" />
              </div>
              <div ref={solutionGalleryBottomThirdRef} className="sm:col-span-2 lg:col-span-1">
                <ReferenceVisual src={`${assetBase}/Eleventh Image.png`} label={`${projectName} token balance`} className="aspect-[448/336]" />
              </div>
            </div>
          </section>

          <OutcomeSection items={projectOutcomes} />
        </div>
      </main>

      <div className="[&>footer]:!mt-16"><Footer /></div>
    </div>
  );
}
