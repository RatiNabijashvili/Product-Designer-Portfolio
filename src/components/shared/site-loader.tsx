'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { WanderingEyes } from './wandering-eyes';
import { beginSiteReveal, finishSiteLoader, SITE_LOADER_COMPLETE_MS, SITE_LOADER_FADE_MS, SITE_LOADER_MAX_MS, SITE_LOADER_MIN_MS, SITE_READY_EVENT } from '@/lib/site-loader';

export function SiteLoader() {
  const [phase, setPhase] = useState<'loading' | 'completing' | 'leaving' | 'done'>('loading');
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.siteLoader !== 'loading') {
      setPhase('done');
      return;
    }

    const content = document.getElementById('site-content');
    const wasInert = content?.inert || false;
    if (content) {
      content.inert = true;
      content.setAttribute('aria-busy', 'true');
    }
    let disposed = false;
    let leaving = false;
    let minimumPassed = false;
    let fontsReady = !document.fonts || document.fonts.status === 'loaded';
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let completionTimer: ReturnType<typeof setTimeout> | undefined;
    let counterFrame: number | undefined;
    const counterStarted = performance.now();
    const counterDuration = Math.max(1, SITE_LOADER_MIN_MS - counterStarted);
    const updateCounter = () => {
      if (disposed || leaving || root.dataset.siteLoader === 'ready') return;
      const progress = Math.min((performance.now() - counterStarted) / counterDuration, 1);
      const easedProgress = progress * progress * (3 - 2 * progress);
      if (counterRef.current) counterRef.current.textContent = String(Math.floor(easedProgress * 99));
      counterFrame = requestAnimationFrame(updateCounter);
    };
    counterFrame = requestAnimationFrame(updateCounter);

    const restoreContent = () => {
      if (content) {
        content.inert = wasInert;
        content.removeAttribute('aria-busy');
      }
    };
    const onReady = () => {
      if (disposed) return;
      restoreContent();
      setPhase('done');
    };
    window.addEventListener(SITE_READY_EVENT, onReady, { once: true });

    const leave = () => {
      if (disposed || leaving || root.dataset.siteLoader === 'ready') return;
      leaving = true;
      if (counterFrame !== undefined) cancelAnimationFrame(counterFrame);
      if (counterRef.current) counterRef.current.textContent = '100';
      setPhase('completing');
      completionTimer = setTimeout(() => {
        if (disposed || root.dataset.siteLoader === 'ready') return;
        beginSiteReveal();
        setPhase('leaving');
        fadeTimer = setTimeout(() => {
          if (!disposed) finishSiteLoader();
        }, SITE_LOADER_FADE_MS);
      }, SITE_LOADER_COMPLETE_MS);
    };
    const maybeLeave = () => { if (minimumPassed && fontsReady) leave(); };
    const minimumTimer = setTimeout(() => {
      minimumPassed = true;
      maybeLeave();
    }, Math.max(0, SITE_LOADER_MIN_MS - performance.now()));
    const maximumTimer = setTimeout(leave, Math.max(0, SITE_LOADER_MAX_MS - SITE_LOADER_COMPLETE_MS - SITE_LOADER_FADE_MS - performance.now()));
    const onFontsReady = () => {
      if (disposed) return;
      fontsReady = true;
      maybeLeave();
    };
    document.fonts?.ready.then(onFontsReady, onFontsReady);

    return () => {
      disposed = true;
      clearTimeout(minimumTimer);
      clearTimeout(maximumTimer);
      if (fadeTimer !== undefined) clearTimeout(fadeTimer);
      if (completionTimer !== undefined) clearTimeout(completionTimer);
      if (counterFrame !== undefined) cancelAnimationFrame(counterFrame);
      window.removeEventListener(SITE_READY_EVENT, onReady);
      restoreContent();
    };
  }, []);

  if (phase === 'done') return null;
  return <div className="site-loader" data-state={phase} role="status" aria-label="Loading portfolio" style={{ '--loader-fade': `${SITE_LOADER_FADE_MS}ms` } as CSSProperties}>
    <div className="site-loader__identity" aria-hidden="true">
      <WanderingEyes style={{ width: 174, height: 78, '--duration': '2400ms' } as CSSProperties} />
      <div className="site-loader__counter-window">
        <span ref={counterRef} className="site-loader__counter">0</span>
      </div>
    </div>
  </div>;
}
