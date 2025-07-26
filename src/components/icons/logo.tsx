import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
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
      className="h-6 w-6"
      {...props}
    >
      <path d="M15 13l-3-3a1 1 0 00-1.41 1.41L12.17 16H4a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"></path>
      <path d="M22 17a2 2 0 01-2 2h-1"></path>
      <path d="M20 12v-2h-3"></path>
      <path d="M3 13a1 1 0 00-1 1v2a1 1 0 001 1h1"></path>
      <path d="m19 15-3 3 3 3"></path>
    </svg>
  );
}
