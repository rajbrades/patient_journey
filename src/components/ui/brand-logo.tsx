// src/components/ui/brand-logo.tsx
import Link from "next/link";
import Image from "next/image";

export function BrandLogo() {
  return (
    <Link href="/" className="block hover:opacity-90 transition-opacity">
      <Image
        src="/10x-health-system-logo.png"
        alt="10X Health System"
        width={180}
        height={40}
        priority
        className="h-8 w-auto object-contain"
      />
    </Link>
  );
}
