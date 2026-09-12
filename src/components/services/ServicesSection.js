"use client";

import { useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import {
  FileCheck,
  Briefcase,
  GraduationCap,
  Home,
  MessageSquare,
  Plane,
  ArrowRight,
} from "lucide-react";
import ConsultationModal from "@/components/forms/ConsultationModal";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const getIcon = (name) => {
    const iconClass = "w-5 h-5";
    switch (name) {
      case "FileCheck":     return <FileCheck className={iconClass} />;
      case "Briefcase":     return <Briefcase className={iconClass} />;
      case "GraduationCap": return <GraduationCap className={iconClass} />;
      case "Home":          return <Home className={iconClass} />;
      case "MessageSquare": return <MessageSquare className={iconClass} />;
      case "Plane":         return <Plane className={iconClass} />;
      default:              return <FileCheck className={iconClass} />;
    }
  };

  const handleClick = (service) => {
    setActiveService(service);
    setIsConsultModalOpen(true);
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight">
            Our Services
          </h2>
          <p className="text-sm sm:text-base text-tng-muted mt-1.5 font-normal">
            Complete Support for Your Global Journey
          </p>
        </div>

        {/* ── Mobile: Horizontal Snap Scroll ── */}
        <div className="flex lg:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleClick(service)}
              className={`snap-start flex-shrink-0 w-[220px] sm:w-[240px] rounded-2xl p-4 border cursor-pointer text-left transition-all active:scale-[0.97] ${service.bgClass}`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/70 shadow-sm flex items-center justify-center mb-3">
                {getIcon(service.iconName)}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-tng-text leading-snug mb-1">
                {service.title}
              </h3>

              {/* Short desc */}
              <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                {service.shortDescription}
              </p>

              {/* Action hint */}
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-tng-primary">
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>

        {/* ── Desktop: 5-Column Grid (unchanged) ── */}
        <div className="hidden lg:grid grid-cols-5 gap-5">
          {services.slice(0, 5).map((service) => (
            <div
              key={service.id}
              onClick={() => handleClick(service)}
              className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer border flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-soft-lg ${service.bgClass}`}
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft-sm flex items-center justify-center transition-transform group-hover:scale-110">
                  {getIcon(service.iconName)}
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-base font-bold text-tng-text group-hover:text-tng-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-tng-primary">
                <span>Learn More</span>
                <span className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-2xs group-hover:bg-tng-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services — Bottom Center */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-tng-primary text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-tng-primary/90 active:scale-[0.98] transition-all group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        defaultOpportunity={
          activeService
            ? { country: "Target Country", visaType: activeService.title }
            : null
        }
      />
    </section>
  );
}
