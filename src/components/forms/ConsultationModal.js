"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { CheckCircle2, Send, Calendar, User, Mail, Phone, Globe, ShieldCheck } from "lucide-react";

export default function ConsultationModal({ isOpen, onClose, defaultOpportunity = null }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: defaultOpportunity?.country || "Canada",
    service: defaultOpportunity?.visaType || "Work & Study Consultation",
    preferredDate: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={submitted ? "Request Confirmed!" : "Book a 1:1 Consultation"}
      subtitle={
        submitted
          ? "Our international advisors will connect with you shortly."
          : "Get personalized guidance on visas, eligibility, and program requirements."
      }
    >
      {submitted ? (
        <div className="text-center py-6 space-y-5">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-tng-text">
              Thank you, {formData.name || "Explorer"}!
            </h4>
            <p className="text-sm text-tng-muted max-w-md mx-auto leading-relaxed">
              Your consultation request for{" "}
              <strong className="text-tng-primary">{formData.country}</strong> has been submitted.
              A senior TNG advisor will review your preferences and get in touch via email and phone.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl text-left border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 text-tng-primary font-semibold">
              <ShieldCheck className="w-4 h-4 text-tng-accent" />
              <span>TNG Client Guarantee</span>
            </div>
            <p>Your details are kept 100% confidential. No spam, no obligation.</p>
          </div>

          <Button onClick={handleReset} variant="primary" className="w-full">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                required
                type="text"
                placeholder="e.g. Aman Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  required
                  type="email"
                  placeholder="aman@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Country
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800 bg-white"
                >
                  <option value="Russia">Russia</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Japan">Japan</option>
                  <option value="Other">Other / Not Sure Yet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Specific Questions / Current Qualifications
            </label>
            <textarea
              rows={3}
              placeholder="Tell us briefly about your educational degree, experience, or what you'd like to achieve..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full justify-center"
              icon={loading ? null : <Send className="w-4 h-4 ml-1" />}
              iconPosition="right"
            >
              {loading ? "Scheduling Session..." : "Request Free Consultation"}
            </Button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              By submitting, you agree to receive guidance communications from TNG. Zero spam guarantee.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}
