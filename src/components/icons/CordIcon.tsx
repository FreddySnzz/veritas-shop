import type { SVGProps } from 'react';

export function CordSpool(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 3v3" />
      <rect x="8" y="6" width="8" height="12" rx="2" />
      <path d="M12 18v3" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
      <path d="M16 11c2 0 3 2 5 5" />
    </svg>
  );
};

export function CordKnot(props: SVGProps<SVGSVGElement>) {
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
      <path d="M2 12h6c0 2 2 3 4 3 2 0 3-2 3-5l0-0" />
      <path d="M22 12h-6c0-2-2-3-4-3-2 0-3 2-3 5l0 0" />
       <path d="M10.5 12h3" />
    </svg>
  );
};