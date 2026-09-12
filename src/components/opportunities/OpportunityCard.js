"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Briefcase, GraduationCap, Plane, Home, ShieldCheck } from "lucide-react";

export default function OpportunityCard({ opportunity, onQuickAction }) {
  const {
    slug,
    title,
    country,
    countryCode,
    category,
    badge,
    badgeColor,
    price,
    duration,
    visaType,
    intake,
    image,
    shortDescription,
  } = opportunity;

  const categoryIcons = {
    work: <Briefcase className="w-3.5 h-3.5 text-slate-400" />,
    study: <GraduationCap className="w-3.5 h-3.5 text-slate-400" />,
    visit: <Plane className="w-3.5 h-3.5 text-slate-400" />,
    relocation: <Home className="w-3.5 h-3.5 text-slate-400" />,
  };

  return (
    <Link
      href={`/opportunities/${slug}`}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1.5 flex flex-col h-full cursor-pointer block select-none"
    >
      {/* Card Image & Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={`${country} - ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Top-Left Blue Strip Badge */}
        {badge && (
          <div className="absolute top-0 left-0 z-20">
            <div className="bg-tng-primary text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-br-2xl shadow-md flex items-center">
              {badge}
            </div>
          </div>
        )}

        {/* Country Tag */}
        <div className="absolute bottom-3 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
            <span>{country}</span>
            {countryCode && (
              <span className="text-[10px] text-slate-300 font-mono">({countryCode})</span>
            )}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4 min-w-0">
        <div className="min-w-0">
          <h3 
            className="text-sm sm:text-base font-bold text-tng-text group-hover:text-tng-secondary transition-colors line-clamp-1 leading-snug"
            title={title}
          >
            {title}
          </h3>
          <p 
            className="text-xs text-tng-muted mt-1.5 line-clamp-2 leading-relaxed"
            title={shortDescription}
          >
            {shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] sm:text-[11px] text-slate-400 block font-medium uppercase tracking-wider">
              Starting Investment
            </span>
            <span className="text-sm sm:text-base font-extrabold text-tng-primary truncate block">
              {price}
            </span>
          </div>

          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-tng-primary flex items-center justify-center group-hover:bg-tng-primary group-hover:text-white transition-all duration-200 shrink-0"
            aria-label={`View details for ${title}`}
          >
            <ArrowUpRight className="w-4 h-4 sm:w-[18px] sm:h-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Footer Meta Row (Responsive Visa Type & Duration) */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-slate-500 min-w-0">
          <div 
            className="flex items-center gap-1.5 min-w-0 flex-1"
            title={visaType || category}
          >
            <span className="shrink-0">
              {categoryIcons[category] || <Briefcase className="w-3.5 h-3.5 text-slate-400" />}
            </span>
            <span className="capitalize truncate text-slate-600 font-medium text-[11px] sm:text-xs">
              {visaType || category}
            </span>
          </div>

          {duration && (
            <div 
              className="flex items-center gap-1 shrink-0 bg-slate-100/80 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] text-slate-600 font-semibold whitespace-nowrap"
              title={`Duration: ${duration}`}
            >
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{duration}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
