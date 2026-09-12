"use client";

import { useState } from "react";
import { Plane, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroVisual() {
  const pathways = [
    { name: "Travel", desc: "Tourist & Cultural Exchange Visas", count: "30+ Countries" },
    { name: "Work", desc: "Skilled Worker & Tech Visas", count: "1,200+ Openings", active: true },
    { name: "Study", desc: "University & Vocational Programs", count: "80+ Universities" },
    { name: "Settle", desc: "Permanent Residency & PR Pathways", count: "Express Entry" },
    { name: "Grow", desc: "Business, Investor & Founder Visas", count: "Fast-Track", accent: true },
  ];

  const [activeTab, setActiveTab] = useState(1); // Default to "Work"

  const highlights = [
    {
      country: "Canada",
      flag: "🇨🇦",
      route: "Express Entry & PNP",
      time: "6-8 Mo",
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      route: "Chancenkarte Card",
      time: "2-4 Mo",
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      route: "Skilled Worker",
      time: "3-5 Mo",
    },
    {
      country: "Australia",
      flag: "🇦🇺",
      route: "Subclass 189 / 190",
      time: "6-9 Mo",
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center lg:items-end select-none">
      {/* Top Floating Handwritten Flourish with Soaring Airplane */}
      <div className="w-full flex items-center justify-between sm:justify-end gap-3 mb-3 sm:mb-4 px-1">
        <div className="text-left sm:text-right">
          <span className="block font-handwriting text-xl sm:text-2xl lg:text-3xl text-tng-primary font-bold leading-none drop-shadow-xs">
            New Opportunities
          </span>
          <span className="block font-handwriting text-xl sm:text-2xl lg:text-3xl text-[#37C99A] font-bold leading-none mt-0.5 drop-shadow-xs">
            New Growth
          </span>
        </div>
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-tng-secondary shadow-soft-sm border border-white/80 transform rotate-12 shrink-0">
          <Plane className="w-5 h-5 sm:w-6 sm:h-6 fill-tng-secondary" />
        </div>
      </div>

      {/* 
        Translucent Frosted Glass Card:
        Completely responsive for 320px, 325px, 375px, 420px, 425px, 768px, 1024px, 1440px.
        The frosted backdrop allows the majestic mountain background to shine through.
      */}
      <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-white/80 shadow-soft-xl p-4 sm:p-6 lg:p-7 transition-all">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#37C99A] animate-pulse" />
            <h3 className="text-xs sm:text-sm font-extrabold text-tng-text">
              Select Your Global Pathway
            </h3>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-tng-secondary border border-blue-100/80">
            2026 Openings
          </span>
        </div>

        {/* Interactive Pathway Chips (Gracefully wraps on 320px - 425px) */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {pathways.map((item, idx) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === idx
                  ? "bg-tng-primary text-white shadow-soft-sm scale-[1.02]"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:text-tng-primary border border-slate-200/60"
              }`}
            >
              {activeTab === idx && <Sparkles className="w-3 h-3 text-tng-accent shrink-0" />}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Active Pathway Details Pill */}
        <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3 sm:p-3.5 border border-white/80 shadow-2xs mb-3.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-extrabold text-tng-primary uppercase tracking-wider">
              {pathways[activeTab].name} Pathway
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {pathways[activeTab].count}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {pathways[activeTab].desc}
          </p>
        </div>

        {/* Popular Destination Fast-Tracks List */}
        <div className="space-y-1.5">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Featured Fast-Track Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {highlights.map((item) => (
              <Link
                key={item.country}
                href="/opportunities"
                className="group flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white/70 hover:bg-white transition-all border border-slate-100 hover:border-blue-200 shadow-2xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base sm:text-lg leading-none shrink-0">{item.flag}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate group-hover:text-tng-primary transition-colors">
                      {item.country}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {item.route}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 shrink-0 ml-1.5 bg-slate-100/80 px-1.5 py-0.5 rounded">
                  {item.time}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Trust Guarantee & Link */}
        <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] sm:text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-700">Verified Pathways</span>
          </div>
          <Link
            href="/opportunities"
            className="font-bold text-tng-secondary hover:text-tng-primary flex items-center gap-0.5 transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

