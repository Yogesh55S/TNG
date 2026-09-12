"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { services } from "@/data/services";
import Button from "@/components/ui/Button";
import ConsultationModal from "@/components/forms/ConsultationModal";
import {
  FileCheck,
  Briefcase,
  GraduationCap,
  Home,
  MessageSquare,
  Plane,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIcon = (name) => {
    switch (name) {
      case "FileCheck":
        return <FileCheck className="w-7 h-7" />;
      case "Briefcase":
        return <Briefcase className="w-7 h-7" />;
      case "GraduationCap":
        return <GraduationCap className="w-7 h-7" />;
      case "Home":
        return <Home className="w-7 h-7" />;
      case "MessageSquare":
        return <MessageSquare className="w-7 h-7" />;
      case "Plane":
        return <Plane className="w-7 h-7" />;
      default:
        return <FileCheck className="w-7 h-7" />;
    }
  };

  return (
    <div className="w-full pb-20">
      <PageHeader
        badge="COMPREHENSIVE ADVISORY"
        title="Support for Your Global Journey"
        description="From visa documentation to university admissions and post-arrival settlement, TNG guides you at every pivotal step."
        breadcrumbs={[{ label: "Services" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${srv.bgClass} shadow-soft-sm`}>
                    {getIcon(srv.iconName)}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {srv.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-tng-text">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-semibold text-tng-secondary mt-1">
                    {srv.shortDescription}
                  </p>
                  <p className="text-xs sm:text-sm text-tng-muted mt-3 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Key Offerings:
                  </span>
                  {srv.offerings.map((off, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tng-accent shrink-0 mt-0.5" />
                      <span>{off}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Button
                  onClick={() => {
                    setSelectedService(srv);
                    setIsModalOpen(true);
                  }}
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                  iconPosition="right"
                >
                  Book Service Consultation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultOpportunity={selectedService ? { country: "Worldwide", visaType: selectedService.title } : null}
      />
    </div>
  );
}
