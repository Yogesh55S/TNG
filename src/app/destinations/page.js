"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { destinations } from "@/data/destinations";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

export default function DestinationsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);

  const paginatedDestinations = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return destinations.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full pb-24">
      {/* Header without badge */}
      <PageHeader
        badge={null}
        title="Explore Global Destinations"
        description="Discover top destinations across Europe, North America, the Middle East, and Asia offering favorable immigration and career paths."
        breadcrumbs={[{ label: "Destinations" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedDestinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer block select-none"
            >
              <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Top-Left Blue Strip */}
                <div className="absolute top-0 left-0 z-20">
                  <div className="bg-tng-primary text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-br-2xl shadow-md">
                    {dest.region}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-extrabold">{dest.name}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-tng-muted leading-relaxed">
                  {dest.overview}
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {dest.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-tng-primary pt-2">
                    <span>View Opportunities in {dest.name}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-tng-primary flex items-center justify-center group-hover:bg-tng-primary group-hover:text-white transition-all duration-200">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination (if > 12 items) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-200/60">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1.5 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? "bg-tng-primary text-white shadow-soft-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
