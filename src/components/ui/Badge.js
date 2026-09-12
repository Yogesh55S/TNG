"use client";

import { cn } from "@/lib/utils";

export default function Badge({
  children,
  color = "blue",
  size = "md",
  className = "",
  dot = false,
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200/80",
    amber: "bg-amber-50 text-amber-800 border-amber-200/80",
    coral: "bg-rose-50 text-rose-700 border-rose-200/80",
    teal: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    navy: "bg-tng-primary/10 text-tng-primary border-tng-primary/20",
    purple: "bg-purple-50 text-purple-700 border-purple-200/80",
    gray: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const dotColors = {
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    coral: "bg-rose-500",
    teal: "bg-emerald-500",
    navy: "bg-tng-primary",
    purple: "bg-purple-500",
    gray: "bg-slate-400",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 font-semibold",
    md: "text-xs px-3 py-1 font-semibold",
    lg: "text-sm px-3.5 py-1.5 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border shadow-2xs backdrop-blur-xs select-none",
        colors[color] || colors.blue,
        sizes[size] || sizes.md,
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", dotColors[color] || dotColors.blue)}
        />
      )}
      {children}
    </span>
  );
}
