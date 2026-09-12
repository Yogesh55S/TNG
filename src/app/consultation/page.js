"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import { CheckCircle2, ShieldCheck, Calendar, Clock, Globe, User, Mail, Phone, Send } from "lucide-react";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Canada",
    service: "Work Abroad",
    preferredDate: "",
    preferredTime: "Morning (10 AM - 1 PM)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full pb-20">
      <PageHeader
        badge="1-ON-1 ADVISORY"
        title="Schedule Your Strategy Consultation"
        description="Speak with an experienced immigration and education advisor to map out your best international opportunities."
        breadcrumbs={[{ label: "Consultation" }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-soft">
          {submitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-tng-text">
                  Session Scheduled!
                </h2>
                <p className="text-sm sm:text-base text-tng-muted max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-tng-primary">{formData.name}</strong>. Your consultation request for <strong>{formData.country}</strong> ({formData.service}) has been confirmed in this demo.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl max-w-md mx-auto text-left border border-slate-200/80 space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-bold text-tng-primary">
                  <ShieldCheck className="w-4 h-4 text-tng-accent" />
                  <span>Next Steps Checklist</span>
                </div>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                  <li>Our coordinator will send meeting calendar links to {formData.email}.</li>
                  <li>Prepare your passport validity dates and degree transcripts.</li>
                  <li>Free 30-minute session with zero upfront consultation fee.</li>
                </ul>
              </div>

              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    country: "Canada",
                    service: "Work Abroad",
                    preferredDate: "",
                    preferredTime: "Morning (10 AM - 1 PM)",
                    message: "",
                  });
                }}
                variant="primary"
                size="lg"
              >
                Book Another Appointment
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-tng-text">
                  Candidate & Profile Information
                </h3>
                <p className="text-xs text-tng-muted mt-0.5">
                  All fields marked with an asterisk (*) are required.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Aman Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      required
                      type="email"
                      placeholder="aman@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Destination
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm bg-white"
                    >
                      <option value="Russia">Russia</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                      <option value="UAE">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Japan">Japan</option>
                      <option value="Other">Other / Open to Suggestions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm bg-white"
                  >
                    <option value="Work Abroad">Work Abroad & Employment</option>
                    <option value="Study Programs">University & Study Admissions</option>
                    <option value="PR & Relocation">Permanent Residency & Relocation</option>
                    <option value="Tourist Visa">Tourist & Business Visit</option>
                    <option value="General Consultation">Profile Evaluation & Roadmapping</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm bg-white"
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (2 PM - 5 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                      <option value="Evening (5 PM - 7 PM)">Evening (5:00 PM – 7:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Educational Background & Key Goals
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details such as your current highest qualification, years of work experience, or specific university programs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full justify-center shadow-soft-lg text-base py-4"
                  icon={loading ? null : <Send className="w-4 h-4 ml-1" />}
                  iconPosition="right"
                >
                  {loading ? "Confirming Booking..." : "Book 1:1 Consultation Session"}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  Complimentary 30-minute introductory strategy session with a certified specialist.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
