"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getOpportunityBySlug, opportunities } from "@/data/opportunities";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ConsultationModal from "@/components/forms/ConsultationModal";
import {
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Plane,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

export default function OpportunityDetailPage({ params }) {
  const { slug } = params;
  const opportunity = getOpportunityBySlug(slug);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [openSteps, setOpenSteps] = useState([0]); // Step 1 open by default

  if (!opportunity) {
    notFound();
  }

  const {
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
    description,
    highlights = [],
    eligibility = [],
    included = [],
    process = [],
  } = opportunity;

  const toggleStep = (index) => {
    setOpenSteps((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full pb-24">
      {/* Top Banner / Breadcrumb */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-tng-primary hover:text-tng-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Opportunities</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-tng-muted font-medium">
            <span>{country}</span>
            <span>/</span>
            <span className="capitalize">{category}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main Content (Left 8 Cols) — Clean Flowing Design, No Boxed Cards */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header Area */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                {badge && (
                  <span className="px-3 py-1 rounded-full bg-tng-primary text-white text-xs font-bold uppercase tracking-wider">
                    {badge}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold">
                  {country} ({countryCode})
                </span>
                <span className="px-3 py-1 rounded-full bg-tng-primary/10 text-tng-primary text-xs font-bold capitalize">
                  {category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight leading-tight">
                {title}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {description}
              </p>

              {/* Large Feature Image */}
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-soft-sm">
                <Image
                  src={image}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover object-center"
                />
              </div>

              {/* Quick Facts Strip — Clean without background/border */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-center">
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">Visa Type</span>
                  <strong className="text-sm sm:text-base text-tng-primary font-bold">{visaType || "Standard"}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">Duration</span>
                  <strong className="text-sm sm:text-base text-tng-primary font-bold">{duration || "Flexible"}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">Intake</span>
                  <strong className="text-sm sm:text-base text-tng-primary font-bold">{intake || "Rolling"}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">Country</span>
                  <strong className="text-sm sm:text-base text-tng-primary font-bold">{country}</strong>
                </div>
              </div>
            </div>

            {/* Key Highlights — Clean, No White Card Box, No Border */}
            {highlights.length > 0 && (
              <div className="pt-4 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-tng-text tracking-tight">
                  Program Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
                  {highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 py-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-tng-secondary shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility Requirements — Clean, No White Card Box, No Border */}
            {eligibility.length > 0 && (
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-tng-text tracking-tight">
                    Eligibility Benchmarks
                  </h2>
                  <span className="text-xs text-tng-muted font-medium">Standard sovereign guidelines</span>
                </div>
                <div className="space-y-2.5 pt-1">
                  {eligibility.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 py-1.5"
                    >
                      <div className="w-5 h-5 rounded-full bg-tng-secondary/15 text-tng-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included — Clean, No White Card Box, No Border */}
            {included.length > 0 && (
              <div className="pt-4 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-tng-text tracking-tight">
                  What TNG Assistance Includes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1">
                  {included.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 py-1"
                    >
                      <FileCheck className="w-4 h-4 text-tng-secondary shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-Step Pathway — Clean Dropdown / Accordion */}
            {process.length > 0 && (
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-tng-text tracking-tight">
                    Step-by-Step Pathway
                  </h2>
                  <span className="text-xs text-tng-muted font-medium">Click phase to view details</span>
                </div>

                <div className="space-y-2 pt-1">
                  {process.map((step, idx) => {
                    const isOpen = openSteps.includes(idx);
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => toggleStep(idx)}
                          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-200/50 transition-colors text-left group"
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
                                isOpen
                                  ? "bg-tng-primary text-white"
                                  : "bg-slate-200/80 text-slate-700 group-hover:bg-slate-300/80"
                              }`}
                            >
                              {step.step}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-tng-text group-hover:text-tng-primary transition-colors">
                              {step.title}
                            </h4>
                          </div>

                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 group-hover:text-tng-primary transition-colors">
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isOpen ? "rotate-180 text-tng-primary" : ""
                              }`}
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="pl-14 pr-4 pb-3 pt-1 text-sm text-slate-600 leading-relaxed">
                            <p>{step.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Statutory Disclaimer */}
            <div className="p-5 rounded-2xl bg-amber-50/70 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-1">Important Advisory:</strong>
                All pricing, durations, and criteria presented are indicative guidelines. TNG does not guarantee visa approval; final decisions rest exclusively with the sovereign immigration authorities of {country}.
              </div>
            </div>
          </div>

          {/* Sticky Action Sidebar (Right 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Starting Investment
                </span>
                <div className="text-3xl font-extrabold text-tng-primary">
                  {price}
                </div>
                <p className="text-xs text-tng-muted mt-1">
                  Includes consultation, document vetting & filing guidance
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100/60 space-y-3">
                <Button
                  onClick={() => setIsConsultOpen(true)}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-soft-lg"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                  iconPosition="right"
                >
                  Check My Eligibility
                </Button>

                <Button
                  onClick={() => setIsConsultOpen(true)}
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center"
                >
                  Book Consultation
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-100/60 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-tng-accent" />
                  <span>100% Confidential Profile Evaluation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-tng-secondary" />
                  <span>Response within 24 business hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-tng-primary" />
                  <span>Verified sovereign checklists</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        defaultOpportunity={opportunity}
      />
    </div>
  );
}
