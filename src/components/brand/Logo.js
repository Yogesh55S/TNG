"use client";

import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "", variant = "dark", size = "default" }) {
  const isLight = variant === "light";

  const dimensions = {
    small: { width: 96, height: 32 },
    default: { width: 135, height: 45 },
    large: { width: 174, height: 58 },
  }[size] || { width: 135, height: 45 };

  return (
    <Link
      href="/"
      className={`inline-flex items-center group transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="TNG - The Next Growth Home"
    >
      <Image
        src="/images/tng_logo.png"
        alt="TNG — The Next Growth"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="w-auto select-none object-contain"
        style={{ height: `${dimensions.height}px` }}
      />
    </Link>
  );
}

export function BrandIcon({ size = 48, className = "" }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-2xl bg-white flex items-center justify-center p-2 shadow-soft-sm border border-slate-100 ${className}`}
    >
      <Image
        src="/images/tng_logo.png"
        alt="TNG Icon"
        width={size * 2}
        height={size}
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
