'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';



type CaseView = 'overview' | 'full-case';

export function ProjectCaseTabs({ id, label, children }: { id: string; label: string; children: (view: CaseView) => React.ReactNode }) {
  const [view, setView] = useState<CaseView>('overview');
  const [displayedView, setDisplayedView] = useState(view);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const slideRef = useRef<Animation | null>(null);

  useEffect(() => () => slideRef.current?.cancel(), []);

  useLayoutEffect(() => {
    if (!tabsRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, delay: 0.2, duration: 0.75, ease: 'power2.out' },
      );
    }, tabsRef);
    return () => context.revert();
  }, []);

  const selectView = (next: typeof view) => {
    if (next === view || !indicatorRef.current) return;
    const pill = indicatorRef.current;
    // Read the visible position first so a reversed click continues smoothly.
    const from = getComputedStyle(pill).transform;
    slideRef.current?.cancel();
    const to = next === 'full-case' ? 'translateX(100%)' : 'translateX(0%)';
    pill.style.transform = to;
    const finish = () => {
      // New scroll triggers must measure at the top, rather than completing
      // immediately at the previous view's scroll position during mount.
      window.scrollTo({ top: 0, behavior: 'instant' });
      setDisplayedView(next);
      slideRef.current = null;
    };
    setView(next);
    const slide = pill.animate(
      [{ transform: from }, { transform: to }],
      { duration: 350, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    );
    slideRef.current = slide;
    slide.onfinish = finish;
  };

  return <>
    <div id={`${id}-panel`} tabIndex={0} role="tabpanel" aria-labelledby={`${id}-${displayedView}-tab`}>
      <div key={displayedView}>{children(displayedView)}</div>
    </div>
    <div className="fixed bottom-4 left-1/2 z-[10000] -translate-x-1/2">
      <div ref={tabsRef} role="tablist" aria-label={`${label} case study view`} className="relative grid h-12 w-[216px] grid-cols-2 rounded-full bg-[#E5E5E5] p-0.5 font-body shadow-[0_0_12px_0_rgba(0,0,0,0.08)]">
        <span ref={indicatorRef} aria-hidden="true" className="pointer-events-none absolute bottom-0.5 left-0.5 top-0.5 rounded-full bg-[#030C0C] will-change-transform" style={{ width: 'calc((100% - 4px) / 2)' }} />
        {(['overview', 'full-case'] as const).map((tab, index) => <button
          key={tab}
          id={`${id}-${tab}-tab`}
          type="button"
          role="tab"
          aria-selected={view === tab}
          aria-controls={`${id}-panel`}
          tabIndex={view === tab ? 0 : -1}
          onClick={() => selectView(tab)}
          onKeyDown={(event) => {
            let nextIndex: number;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') nextIndex = 1 - index;
            else if (event.key === 'Home') nextIndex = 0;
            else if (event.key === 'End') nextIndex = 1;
            else return;
            event.preventDefault();
            selectView(nextIndex === 0 ? 'overview' : 'full-case');
            tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus();
          }}
          className={`relative z-10 whitespace-nowrap rounded-full px-4 text-base leading-[1.2] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#030C0C] focus-visible:ring-offset-2 motion-reduce:transition-none ${view === tab ? 'font-bold text-[#FCFAFA]' : 'font-medium text-[#030C0C] hover:bg-[#D2D2D2]'}`}
        >{tab === 'overview' ? 'Overview' : 'Full Case'}</button>)}
      </div>
    </div>
  </>;
}
