"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDestinationBySlug } from "@/data/destinations";
import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import Button from "@/components/ui/Button";
import ConsultationModal from "@/components/forms/ConsultationModal";
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react";

export default function DestinationDetailPage({ params }) {
  const { slug } = params;
  const destination = getDestinationBySlug(slug);
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  if (!destination) {
    notFound();
  }

  const { name, region, image, overview, highlights = [], popularPrograms = [] } = destination;

  // Find related opportunities matching this destination country
  const relatedOpportunities = opportunities.filter(
    (o) => o.country.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="w-full pb-24">
      {/* Top Banner / Breadcrumb */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-tng-primary hover:text-tng-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Destinations</span>
          </Link>
          <span className="text-xs text-tng-muted font-medium">{region}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main Content — Clean Flowing Design, No Boxed Cards */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-5">
              <span className="px-3.5 py-1.5 rounded-full bg-tng-primary text-white text-xs font-bold uppercase tracking-wider inline-block">
                {region}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-tng-text tracking-tight">
                Opportunities in {name}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {overview}
              </p>

              {/* Large Image */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-soft-sm">
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover object-center"
                />
              </div>

              {/* Highlights — Clean without boxes or borders */}
              {highlights.length > 0 && (
                <div className="pt-4 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-tng-text tracking-tight">
                    Why Choose {name}?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 py-1">
                        <CheckCircle2 className="w-4 h-4 text-tng-secondary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-700 leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Opportunities List for this Country */}
            <div className="space-y-6 pt-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-tng-text tracking-tight">
                Current Programs for {name}
              </h2>
              {relatedOpportunities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedOpportunities.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 shadow-soft text-center space-y-4">
                  <p className="text-sm text-tng-muted">
                    Custom immigration and work pipelines for {name} are curated through personalized advisory.
                  </p>
                  <Button onClick={() => setIsConsultOpen(true)} variant="primary">
                    Inquire for {name}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
              <h3 className="text-2xl font-bold text-tng-text">
                Targeting {name}?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect with our regional documentation desk to evaluate your points, visa categories, and processing milestones.
              </p>

              <Button
                onClick={() => setIsConsultOpen(true)}
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-soft-lg"
                icon={<ArrowRight className="w-4 h-4 ml-1" />}
                iconPosition="right"
              >
                Book {name} Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        defaultOpportunity={{ country: name, visaType: "Country Advisory" }}
      />
    </div>
  );
}
