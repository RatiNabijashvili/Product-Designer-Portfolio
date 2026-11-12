'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function NoxttonCaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline();
      timeline.fromTo(headingRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' });
      timeline.fromTo(contentRef.current, { opacity: 0, y: 64 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.25');
      ScrollTrigger.create({ trigger: sectionRef.current, start: 'top 72%', once: true, animation: timeline }).refresh();
    }, sectionRef);
    return () => context.revert();
  }, []);

  return <section ref={sectionRef} className="mt-12">
    <h2 ref={headingRef} className="mb-2 text-2xl font-bold uppercase leading-[1.5] text-[#030C0C] md:mb-3 md:text-[32px] md:leading-[1.2]">{title}</h2>
    <div ref={contentRef} className="space-y-4 text-base font-medium leading-[1.5] text-[#919191] md:text-xl">{children}</div>
  </section>;
}

function NumberedPoints({ items }: { items: string[] }) {
  return <ol className="grid auto-rows-fr gap-3 text-[#030C0C] md:auto-rows-auto">{items.map((item, index) => <li key={item} className="flex items-center gap-2 rounded-lg border border-[#DCDCDC] p-4 font-bold"><span>{index + 1}.</span><span>{item}</span></li>)}</ol>;
}

export function NoxttonIntroduction() {
  const overview = [['Role', 'Product Designer'], ['Timeline', 'Four weeks'], ['Market', 'Georgia'], ['Status', 'Unreleased'], ['Industry', 'Fintech'], ['Team', 'Product Manager']];
  return <NoxttonCaseSection title="Self-custody for newcomers">
    <p>Noxtton Wallet is a self-custodial mobile wallet concept for EVM networks. It was designed to help newcomers manage digital assets with clearer guidance around recovery, networks, fees and transaction status.</p>
    <p>Over one month, I designed the experience from the ground up, covering wallet creation, security setup, sending, receiving, activity, contextual education and an optional rewards experience.</p>
    <dl className="!mt-8 grid overflow-hidden rounded-lg border border-[#DCDCDC] sm:grid-cols-2 lg:grid-cols-3">{overview.map(([label, value], index) => <div key={label} className={[
      'flex flex-col items-center justify-center gap-1.5 p-8 text-center md:min-h-40',
      index < 5 && 'border-b', index >= 4 && 'sm:border-b-0', index % 2 === 0 && 'sm:border-r', index % 3 === 2 && 'lg:border-r-0', index % 3 !== 2 && 'lg:border-r', index < 3 && 'lg:border-b', index >= 3 && 'lg:border-b-0',
    ].filter(Boolean).join(' ')}><dt className="text-base font-medium leading-[1.2] md:text-xl">{label}</dt><dd className="text-xl font-bold leading-[1.4] text-[#030C0C] md:text-2xl">{value}</dd></div>)}</dl>
  </NoxttonCaseSection>;
}

export function NoxttonChallenge() {
  const questions = [
    'How can someone explore the wallet without first completing a lengthy setup?',
    'What must they understand before authorizing a transfer?',
    'How can the interface explain what happened after they acted?',
    'How might we make a first wallet experience approachable while keeping its responsibilities visible?',
  ];
  return <NoxttonCaseSection title="The challenge">
    <p>The product brief centered on the “Cautious Newcomer”: someone interested in using digital assets but unfamiliar with the responsibilities of self-custody.</p>
    <p>The challenge extended beyond learning a new interface. Users would need to understand unfamiliar concepts while making decisions involving assets they controlled directly.</p>
    <p>I organized the design around these questions:</p>
    <ul className="grid auto-rows-fr gap-3 md:auto-rows-auto">{questions.map(question => <li key={question} className="flex items-center gap-3 rounded-lg border border-[#DCDCDC] p-4 font-bold text-[#030C0C]"><Image src="/circle-questionmark.svg" alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 shrink-0" /><span>{question}</span></li>)}</ul>
  </NoxttonCaseSection>;
}

export function NoxttonRole() {
  return <NoxttonCaseSection title="My role">
    <p>I owned the product’s interaction design, visual design, information hierarchy and interface copy, working with the PM/PO on requirements and product direction.</p>
    <p>I reviewed the requirements and core wallet journeys, then examined where the experience would ask users to make unfamiliar or consequential decisions.</p>
    <p>The “Cautious Newcomer” was a working persona used to guide the design. The concerns described here were design assumptions; they should not be presented as findings from user interviews.</p>
    <NumberedPoints items={['Introduce the wallet before introducing every setup task', 'Concentrate guidance around consequential actions', 'Keep transaction status understandable after submission']} />
  </NoxttonCaseSection>;
}

export function NoxttonOutcome() {
  return <NoxttonCaseSection title="Overall outcome">
    <p>The project concluded in the design phase when the stakeholder shifted focus to other priorities.</p>
    <p>The work established a proposed product direction covering onboarding, security setup, transfers, transaction history, contextual guidance and rewards. It was not implemented or launched.</p>
    <p>There are no production results for activation, transaction completion, security or retention. The design’s intended benefits remain hypotheses.</p>
  </NoxttonCaseSection>;
}

export function NoxttonReflection() {
  return <NoxttonCaseSection title="Reflection">
    <p>The most important tension was between making the wallet accessible and ensuring users understood their responsibilities before receiving or sending assets.</p>
    <p>If the project resumed, my first priorities would be to:</p>
    <NumberedPoints items={[
      'Test whether newcomers understand backup, App Lock and recovery.',
      'Evaluate whether the transfer review exposes the details users need.',
      'Validate warning behavior and technical feasibility.',
      'Test comprehension of pending, confirmed and failed transactions.',
      'Reconsider incentives that reward transaction frequency.',
    ]} />
    <p>The project reinforced an important principle:</p>
    <div className="flex flex-col items-center gap-3 rounded-lg border border-[#DCDCDC] p-6 text-center font-bold text-[#030C0C] md:p-8"><Image src="/compass.svg" alt="" aria-hidden="true" width={24} height={24} /><p className="max-w-4xl">Clarity is part of a responsible wallet experience, but it cannot substitute for recovery readiness or technically reliable safeguards.</p></div>
  </NoxttonCaseSection>;
}
