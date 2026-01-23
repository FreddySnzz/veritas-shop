import type { SVGProps } from 'react';

export function CountBall(props: SVGProps<SVGSVGElement>) {
  return (
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
      <path d="M3 16C6 16 7 13.5 8.5 12" />
      <path d="M15.5 12C17 10.5 19 9 21 9" />
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CountBallA(props: SVGProps<SVGSVGElement>) {
  return (
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
      <path d="M0.5 8C2 10 5 12.5 3 10" />
      <path d="M22 11.5C19 10.5 30 10 90 40" />
      <circle cx="12" cy="12" r="8" />
      <path d="M9 16L12 8L15 16" />
      <path d="M10 13H14" />
    </svg>
  );
}