import { whenSiteReveal } from './site-loader';

// Route scroll restoration and font loading can both change a section's measured
// position. Wait until they settle before creating once-only scroll triggers.
export function whenProjectLayoutReady(setup: () => void | (() => void)) {
  let disposed = false;
  let frame: number | undefined;
  let cleanup: void | (() => void);

  const schedule = () => {
    if (disposed) return;
    frame = window.requestAnimationFrame(() => {
      if (disposed) return;
      frame = window.requestAnimationFrame(() => {
        if (!disposed) cleanup = setup();
      });
    });
  };

  const stopWaitingForLoader = whenSiteReveal(() => {
    if (document.fonts?.status === 'loading') {
      document.fonts.ready.then(schedule, schedule);
    } else {
      schedule();
    }
  });

  return () => {
    if (disposed) return;
    disposed = true;
    stopWaitingForLoader();
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    cleanup?.();
  };
}
