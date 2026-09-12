"use client";

import Link from "next/link";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { getFeaturedOpportunities } from "@/data/opportunities";

export default function FeaturedOpportunitiesSection() {
  const featured = getFeaturedOpportunities().slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-tng-secondary uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handpicked Programs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight">
            Featured Opportunities
          </h2>
          <p className="text-sm text-tng-muted mt-1.5 max-w-xl">
            Explore premier pathways to work, study, and settle abroad with verified institutional and employer support.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>

        {/* View All — Bottom Center CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 bg-tng-primary text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-tng-primary/90 active:scale-[0.98] transition-all group"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
