"use client";

import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";

export default function DestinationsSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-tng-secondary uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Worldwide Horizons</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight">
            Popular Destinations
          </h2>
          <p className="text-sm text-tng-muted mt-1.5 max-w-xl">
            Discover countries offering high career potential, world-class living standards, and welcoming visa frameworks.
          </p>
        </div>

        {/* 3 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1.5 block"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  {dest.region}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-tng-accent transition-colors">
                    {dest.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-tng-primary group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dest.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/15 text-slate-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore All — Bottom Center CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-tng-primary text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-tng-primary/90 active:scale-[0.98] transition-all group"
          >
            <span>Explore All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
