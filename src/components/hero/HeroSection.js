"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight, Calendar } from "lucide-react";
import ConsultationModal from "@/components/forms/ConsultationModal";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  return (
    <>
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden min-h-[85vh] sm:min-h-[80vh] lg:min-h-[680px] flex items-center">
      {/* 
        Responsive Full-Bleed Background Mountain Image:
        - Extends from y=0 under the transparent navbar across all screen sizes
        - Completely fills the hero section at all breakpoints: 320px, 325px, 375px, 420px, 425px, 768px, 1024px, 1440px+
      */}
      <div className="absolute inset-0 w-full h-full -z-10 select-none overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Majestic Mountain Landscape Background"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[55%_35%] sm:object-[center_30%] md:object-[58%_32%] lg:object-[65%_35%] xl:object-center transition-all duration-700"
        />

        {/* 
          Multi-layer Atmospheric Scrim / Overlay:
          - Keeps high text contrast while letting the mountain image show seamlessly behind the navbar
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-[#F5F8FC]/95 sm:via-white/75 lg:bg-gradient-to-r lg:from-white/92 lg:via-white/75 lg:via-55% lg:to-white/5 xl:to-transparent pointer-events-none" />

        {/* Ambient Brand Color Glows */}
        <div className="absolute top-6 left-6 w-60 sm:w-96 h-60 sm:h-96 bg-[#2F80ED]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-60 sm:w-96 h-60 sm:h-96 bg-[#37C99A]/12 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        {/* Full-Width Content — Centered on Mobile, Left-aligned on Desktop */}
        <div className="max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6 lg:space-y-7 text-center lg:text-left z-10 flex flex-col items-center lg:items-start"
          >
            {/* Responsive Main Headline — Centered on Mobile */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[50px] xl:text-[56px] font-extrabold text-tng-text tracking-tight leading-[1.18] sm:leading-[1.1]">
              Explore Opportunities. <br />
              <span className="bg-gradient-to-r from-tng-primary via-tng-secondary to-tng-accent bg-clip-text text-transparent">
                Build Your Next Growth.
              </span>
            </h1>

            {/* Supporting Paragraph — Centered on Mobile */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover opportunities to work, study, travel and build your future abroad with guidance from the TNG team.
            </p>

            {/* Desktop CTAs — inline with content */}
            <div className="hidden sm:flex sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4 w-full max-w-sm sm:max-w-none mx-auto lg:mx-0">
              <Button
                href="/opportunities"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 ml-1" />}
                iconPosition="right"
                className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3.5 shadow-soft-lg border-none justify-center font-bold"
              >
                Explore Opportunities
              </Button>

              <Button
                onClick={() => setIsConsultModalOpen(true)}
                variant="secondary"
                size="lg"
                icon={<Calendar className="w-4 h-4 mr-1 text-tng-secondary" />}
                iconPosition="left"
                className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3.5 border border-white/80 shadow-soft-sm bg-white/90 hover:bg-white backdrop-blur-xs justify-center font-bold"
              >
                Talk to Our Team
              </Button>
            </div>

            {/* Desktop-Only Trust Statistics (Hidden on Mobile, Kept on Desktop) */}
            <div className="hidden lg:block pt-5 sm:pt-7">
              <div className="flex items-center gap-x-10">
                {[
                  { value: "10K+", label: "Happy Clients" },
                  { value: "30+", label: "Countries" },
                  { value: "95%", label: "Success Rate" },
                  { value: "5+", label: "Years of Trust" },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-x-10">
                    <div className="text-left">
                      <p className="text-3xl lg:text-4xl font-extrabold text-tng-primary leading-none tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                    {idx < 3 && (
                      <div className="w-px h-10 bg-slate-300/50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile-Only Buttons — Pinned to Absolute Bottom of Hero */}
      <div className="sm:hidden absolute bottom-6 left-0 right-0 px-4 z-10 flex flex-col gap-3 max-w-sm mx-auto">
        <Button
          href="/opportunities"
          variant="primary"
          size="lg"
          icon={<ArrowRight className="w-4 h-4 ml-1" />}
          iconPosition="right"
          className="w-full text-sm px-6 py-3.5 shadow-soft-lg border-none justify-center font-bold"
        >
          Explore Opportunities
        </Button>
        <Button
          onClick={() => setIsConsultModalOpen(true)}
          variant="secondary"
          size="lg"
          icon={<Calendar className="w-4 h-4 mr-1 text-tng-secondary" />}
          iconPosition="left"
          className="w-full text-sm px-6 py-3.5 border border-white/80 shadow-soft-sm bg-white/90 hover:bg-white backdrop-blur-xs justify-center font-bold"
        >
          Talk to Our Team
        </Button>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
    </section>

    {/* Mobile-Only Dedicated Trust Stats Section — Borderless & No Background */}
    <section className="block lg:hidden py-6 px-4 bg-transparent">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-center">
          {[
            { value: "10K+", label: "Happy Clients" },
            { value: "30+", label: "Countries" },
            { value: "95%", label: "Success Rate" },
            { value: "5+", label: "Years of Trust" },
          ].map((stat, idx) => (
            <div key={idx} className="p-1">
              <p className="text-3xl font-extrabold text-tng-primary leading-none tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-slate-600 mt-1.5 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
