"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { testimonials } from "@/data/testimonials";
import { Star, ArrowRight } from "lucide-react";

// Duplicate for seamless infinite loop
const loopItems = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // ── Mouse drag ──
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.animationPlayState = "paused";
    trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = "grab";
    // Resume animation after short delay
    setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.animationPlayState = "running";
      }
    }, 1200);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F5F8FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight">
            Success Stories &amp; Trust
          </h2>
          <p className="text-sm text-tng-muted mt-1.5 max-w-xl">
            Discover how ambitious candidates turned international opportunities into reality through dedicated guidance.
          </p>
        </div>
      </div>

      {/* ── Infinite Marquee Track (full-bleed) ── */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Soft fade edges */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#F5F8FC] to-transparent" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#F5F8FC] to-transparent" />

        {/* Draggable + auto-scroll inner */}
        <div
          ref={trackRef}
          className="animate-marquee cursor-grab"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={(e) => {
            startX.current = e.touches[0].pageX;
            scrollLeft.current = trackRef.current.scrollLeft;
            trackRef.current.style.animationPlayState = "paused";
          }}
          onTouchMove={(e) => {
            const x = e.touches[0].pageX;
            const walk = (x - startX.current) * 1.2;
            trackRef.current.scrollLeft = scrollLeft.current - walk;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              if (trackRef.current) {
                trackRef.current.style.animationPlayState = "running";
              }
            }, 1200);
          }}
          style={{ display: "flex", gap: "20px", paddingBottom: "8px" }}
        >
          {loopItems.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="flex-shrink-0 w-[272px] sm:w-[310px] bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Stars + Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {t.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-[13px] text-slate-700 italic leading-relaxed line-clamp-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Row */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-tng-text">{t.name}</h4>
                  <p className="text-[11px] text-tng-muted">{t.destination} · {t.opportunity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Stories — Bottom Center */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/success-stories"
          className="inline-flex items-center gap-2 bg-tng-primary text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-tng-primary/90 active:scale-[0.98] transition-all group"
        >
          <span>View All Stories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
