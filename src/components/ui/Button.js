"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  onClick,
  disabled = false,
  icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary:
      "bg-tng-primary text-white hover:bg-tng-primary-dark shadow-soft hover:shadow-soft-lg",
    secondary:
      "bg-white text-tng-primary border border-tng-border hover:bg-slate-50/80 hover:border-tng-secondary/40 shadow-soft-sm hover:shadow-soft",
    accent:
      "bg-tng-accent text-white hover:bg-tng-accent-dark shadow-soft hover:shadow-soft-lg",
    blue:
      "bg-tng-secondary text-white hover:bg-tng-secondary-hover shadow-soft hover:shadow-soft-lg",
    ghost:
      "bg-transparent text-tng-primary hover:bg-slate-100/70",
    outline:
      "bg-transparent border border-tng-primary text-tng-primary hover:bg-tng-primary hover:text-white",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-3.5 gap-2.5",
  };

  const combinedClasses = cn(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
