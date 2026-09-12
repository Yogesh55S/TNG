"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { faqs } from "@/data/faqs";
import { ChevronDown, Search } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const categories = ["all", "General", "Eligibility", "Process", "Consultation", "Office"];

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "all" || f.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full pb-20">
      <PageHeader
        badge="KNOWLEDGE DESK"
        title="Frequently Asked Questions"
        description="Find clear answers to common inquiries about visas, documentation, eligibility rules, and consultation appointments."
        breadcrumbs={[{ label: "FAQs" }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Search & Categories */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, e.g. eligibility, visa guarantee, documents..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCat === c
                    ? "bg-tng-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c === "all" ? "All Questions" : c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
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
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-tng-text">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isOpen
                        ? "bg-tng-primary text-white rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-tng-muted leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
