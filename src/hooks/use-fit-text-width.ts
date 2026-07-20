'use client';

import { RefObject, useLayoutEffect } from 'react';

type FitTextOptions = {
  variableName: string;
};

export function useFitTextWidth(
  containerRef: RefObject<HTMLElement | null>,
  textRef: RefObject<HTMLElement | null>,
  { variableName }: FitTextOptions
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fitText = () => {
      container.style.removeProperty(variableName);

      const availableWidth = container.clientWidth;
      const renderedWidth = text.getBoundingClientRect().width;
      const renderedSize = Number.parseFloat(window.getComputedStyle(text).fontSize);

      if (!availableWidth || !renderedWidth || !renderedSize) return;

      const nextSize = (availableWidth / renderedWidth) * renderedSize;
      container.style.setProperty(variableName, `${nextSize}px`);
    };

    fitText();

    const resizeObserver = new ResizeObserver(fitText);
    resizeObserver.observe(container);

    document.fonts?.ready.then(fitText);
    window.addEventListener('resize', fitText);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', fitText);
    };
  }, [containerRef, textRef, variableName]);
}
