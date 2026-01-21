import React from 'react';

export const IconProductDesign: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="1">
      {[...Array(12)].map((_, i) => (
        <path
          key={i}
          d="M50 0 L50 100"
          stroke="currentColor"
          strokeWidth="0.5"
          transform={`rotate(${i * 15} 50 50)`}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <circle
          key={i}
          cx="50"
          cy="50"
          r={10 + i * 10}
          stroke="currentColor"
          strokeWidth="0.5"
        />
      ))}
    </g>
  </svg>
);

export const IconDesignSystems: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="1">
      <path
        d="M50 10 C 20 20, 20 80, 50 90"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M50 10 C 80 20, 80 80, 50 90"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 50 C 20 20, 80 20, 90 50"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 50 C 20 80, 80 80, 90 50"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M30 20 C 20 50, 20 50, 30 80"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(45 50 50)"
      />
      <path
        d="M70 20 C 80 50, 80 50, 70 80"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(45 50 50)"
      />
    </g>
  </svg>
);

export const IconResearch: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="1">
      {[...Array(20)].map((_, i) =>
        [...Array(20)].map((_, j) => (
          <circle
            key={`${i}-${j}`}
            cx={2.5 + i * 5}
            cy={2.5 + j * 5}
            r="0.5"
            fill="currentColor"
          />
        ))
      )}
    </g>
  </svg>
);

export const IconCreativeDevelopment: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="1">
      {[...Array(20)].map((_, i) => (
        <path
          key={i}
          d={`M 10 ${10 + i * 4} C 50 ${-10 + i * 4}, 50 ${
            110 - i * 4
          }, 90 ${10 + i * 4}`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </g>
  </svg>
);
