import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Run inside the page's GSAP context so unmounting or switching views reverts
// every tween and trigger, including ones created for a responsive breakpoint.
export function animateProjectGallery(root: HTMLElement) {
  const media = gsap.matchMedia();
  let disposed = false;
  const initialize = () => {
    if (disposed) return;
    media.add({
      mobile: '(max-width: 767px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      desktop: '(min-width: 1024px)',
    }, (context) => {
      const mobile = context.conditions?.mobile;
      root.querySelectorAll<HTMLElement>('[data-gallery-row]').forEach((row) => {
        const items = row.querySelectorAll<HTMLElement>(':scope > [data-gallery-item]');
        if (!items.length) return;

        const columns = window.getComputedStyle(row).gridTemplateColumns.trim().split(/\s+/);
        const stacked = mobile || (items.length > 1 && columns.length === 1);
        if (stacked) {
          // Desktop columns become a tall stack on mobile. Reveal each surface
          // at its own position rather than revealing the entire column early.
          items.forEach((item) => {
            const surfaces = item.querySelectorAll<HTMLElement>('[data-gallery-visual]');
            (surfaces.length ? Array.from(surfaces) : [item]).forEach((surface) => {
              gsap.fromTo(surface, { opacity: 0, y: 64 }, {
                opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
                scrollTrigger: { trigger: surface, start: 'top 78%', once: true },
              });
            });
            // On stacked layouts the children own the reveals, so the desktop
            // group must stop hiding them once their initial states are set.
            if (surfaces.length) gsap.set(item, { opacity: 1 });
          });
          return;
        }

        const timeline = gsap.timeline({ paused: true });
        items.forEach((item, index) => {
          const direction = item.dataset.galleryItem;
          const x = direction === 'left' ? -80 : direction === 'right' ? 80 : 0;
          timeline.fromTo(item, { opacity: 0, x, y: x ? 0 : 64 }, {
            opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power2.out',
          }, row.hasAttribute('data-gallery-stagger') ? index * 0.4 : 0);
        });
        ScrollTrigger.create({ trigger: row, start: 'top 78%', once: true, animation: timeline }).refresh();
      });
    });
  };

  // A font swap can change the height of all preceding text. Measuring before
  // fonts settle can finish a once-only reveal before its final scroll position.
  if (document.fonts?.status === 'loading') {
    document.fonts.ready.then(initialize);
  } else {
    initialize();
  }

  return () => {
    disposed = true;
    media.revert();
  };
}
