"use client";

import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { testimonials } from "@/data/testimonials";
import Button from "@/components/ui/Button";
import { Star, Quote, ShieldCheck } from "lucide-react";

export default function SuccessStoriesPage() {
  return (
    <div className="w-full pb-20">
      <PageHeader
        badge="VERIFIED TESTIMONIALS"
        title="Client Journeys & Growth"
        description="Hear directly from professionals, students, and travelers who trusted TNG with their international progression."
        breadcrumbs={[{ label: "Success Stories" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.badge}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-tng-text">{t.name}</h4>
                  <p className="text-xs text-tng-muted font-medium">
                    {t.destination} • {t.opportunity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#EBF2FA]/70 rounded-3xl p-8 sm:p-10 border border-slate-200 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-tng-text">
            Ready to Start Your Success Story?
          </h3>
          <p className="text-xs sm:text-sm text-tng-muted">
            Book a personalized session with an experienced counselor today.
          </p>
          <Button href="/consultation" variant="primary" size="lg">
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
