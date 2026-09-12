"use client";

import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ShieldCheck, Target, Users, Building, Globe, Award, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full pb-24">
      {/* Header without badge */}
      <PageHeader
        badge={null}
        title="Our Story & Ethical Mission"
        description="TNG (The Next Growth) was founded to bring transparency, clarity, and human empathy to the global opportunity journey."
        breadcrumbs={[{ label: "About" }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Core Mission — Clean, No White Card Box, No Border */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-tng-secondary uppercase tracking-wider">
            <Target className="w-4 h-4 text-tng-primary" />
            <span>Why We Exist</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-tng-text tracking-tight">
            “More Than Destinations, We Create New Beginnings.”
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            International immigration and travel can be fraught with misinformation, predatory promises, and bureaucratic hurdles. TNG was established with a singular principle: to empower individuals with verified facts, realistic eligibility assessments, and disciplined documentation so they can build their next chapter abroad with confidence.
          </p>
        </div>

        {/* 3 Pillars — Uniform Brand Color Icons, No White Card Box Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-tng-primary" />
            </div>
            <h3 className="text-lg font-bold text-tng-text">Zero False Guarantees</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We never promise visa approvals or invent false success rates. We hold ourselves to uncompromising ethical disclosure.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-tng-primary" />
            </div>
            <h3 className="text-lg font-bold text-tng-text">Rigorous Vetting</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every college partner, employer sponsor, and visa pathway is cross-checked against statutory migration gazettes.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center">
              <Users className="w-6 h-6 text-tng-primary" />
            </div>
            <h3 className="text-lg font-bold text-tng-text">Dedicated Counselors</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              You are assigned a real specialist who handles your file with utmost care from initial consultation to boarding.
            </p>
          </div>
        </div>

        {/* Physical Office Presence & Transparency — Clean, No Box Border */}
        <div className="pt-6 space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold text-tng-secondary uppercase tracking-wider">
            <Building className="w-4 h-4 text-tng-primary" />
            <span>In-Person Consultation Centers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-tng-text tracking-tight">
            Meet Us Face-to-Face
          </h2>
          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            We believe trust is forged through real, face-to-face dialogue. We invite prospective students, professionals, and families to visit our advisory suites for in-person document evaluations.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Button href="/contact" variant="primary" size="md">
              Visit Our Office
            </Button>
            <Button href="/consultation" variant="secondary" size="md">
              Schedule Video Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
