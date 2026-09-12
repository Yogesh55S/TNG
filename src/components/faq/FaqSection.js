"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/data/faqs";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-tng-secondary uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-tng-muted mt-2 max-w-xl mx-auto">
            Everything you need to know about our opportunities, advisory process, and consulting services.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#F8FAFC] border-tng-secondary/40 shadow-soft-sm"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-tng-secondary/20 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-tng-text">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? "bg-tng-primary text-white rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-tng-muted leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-tng-muted">
          Still have questions?{" "}
          <Link href="/contact" className="font-bold text-tng-secondary hover:underline">
            Reach out to our advisory desk
          </Link>
          {" "}or explore all{" "}
          <Link href="/faqs" className="font-bold text-tng-primary hover:underline">
            detailed FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
