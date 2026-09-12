"use client";

import { CheckCircle2, Search, FileText, Compass, ArrowRight } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Understand",
      description: "We review your academic background, career accomplishments, and aspirations to pinpoint achievable pathways.",
      icon: <Compass className="w-5 h-5" />,
    },
    {
      number: "02",
      title: "Explore",
      description: "We present verified opportunities, compare living costs, timelines, and sovereign visa criteria.",
      icon: <Search className="w-5 h-5" />,
    },
    {
      number: "03",
      title: "Prepare",
      description: "From certified translations to financial dossiers and statement structuring, we eliminate compliance pitfalls.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      number: "04",
      title: "Move Forward",
      description: "With appointment management, consular briefings, and pre-departure support, you step into your new chapter.",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-tng-secondary uppercase tracking-wider block mb-2">
            Structured & Honest Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight">
            How TNG Helps You Move Forward
          </h2>
          <p className="text-sm sm:text-base text-tng-muted mt-2 font-normal">
            A clear, 4-phase framework designed to replace uncertainty with clarity and confidence.
          </p>
        </div>

        {/* 4 Steps Grid with connecting dashed line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-[#F8FAFC] rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft-sm hover:shadow-soft transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-slate-300 group-hover:text-tng-primary transition-colors font-heading">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center shadow-2xs group-hover:bg-tng-primary group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-tng-text group-hover:text-tng-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-tng-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-tng-secondary">
                <span>Phase {idx + 1} Guidance</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
