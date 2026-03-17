// src/components/ui/brand-logo.tsx
import Link from "next/link";

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-[6px] text-[22px] sm:text-[26px] font-heading font-black uppercase tracking-[-0.04em] text-black leading-none hover:opacity-90 transition-opacity">
      <span>10X</span>
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand shrink-0"
      >
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <path
          d="M4 12 h4 l2.5 -4.5 l3 9 l2.5 -4.5 h4"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>HEALTH</span>
    </Link>
  );
}
