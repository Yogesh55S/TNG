"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Globe, ArrowRight, Sparkles } from "lucide-react";
import ConsultationModal from "@/components/forms/ConsultationModal";

export default function CtaBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 sm:py-16 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#E5EFFB] via-[#EBF3FC] to-[#DDEAF9] p-6 sm:p-10 lg:p-12 border border-[#CDE0F5] shadow-soft overflow-hidden">
          {/* Subtle glowing elements */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left side: Globe & Text */}
            <div className="flex items-center gap-4 sm:gap-6 text-center lg:text-left flex-col sm:flex-row">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center text-tng-secondary shrink-0 border border-white">
                <Globe className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-tng-primary tracking-tight">
                  Let’s Plan Your Next Step
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
                  Book a consultation and get personalized guidance from our team.
                </p>
              </div>
            </div>

            {/* Right side: Button + Signature flourish */}
            <div className="flex items-center gap-6 sm:gap-8 flex-col sm:flex-row">
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 ml-1" />}
                iconPosition="right"
                className="shadow-soft-lg px-8 py-3.5 text-sm sm:text-base shrink-0"
              >
                Book a Consultation
              </Button>

              {/* Handwritten signature flourish from concept image */}
              <div className="hidden sm:block select-none transform rotate-[-3deg] text-center sm:text-left">
                <span className="block font-handwriting text-2xl lg:text-3xl text-tng-primary font-bold leading-none">
                  Your
                </span>
                <span className="block font-handwriting text-2xl lg:text-3xl text-tng-secondary font-bold leading-none">
                  Next Growth
                </span>
                <span className="block font-handwriting text-xl lg:text-2xl text-tng-accent font-bold leading-none">
                  Starts Here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
