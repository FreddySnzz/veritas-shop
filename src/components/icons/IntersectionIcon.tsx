import type { SVGProps } from 'react';

export function Intersection(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="5" />
      <circle cx="7.5" cy="7.5" r="1.5" />
      <circle cx="16.5" cy="7.5" r="1.5" />
      <circle cx="12" cy="18.5" r="1.5" />
    </svg>
  );
}