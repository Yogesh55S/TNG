"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
      const res = await fetch("/api/contact", {
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

  return (
    <div className="w-full pb-24">
      {/* Header without badge */}
      <PageHeader
        badge={null}
        title="Contact Our Advisory Team"
        description="Have a question or want to visit our offices? Reach out directly to our dedicated counseling coordinators."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Contact Details & Hours (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-tng-text tracking-tight">
                Office Information
              </h3>

              <div className="space-y-5 text-sm text-slate-700">
                {/* Address with Google Maps */}
                <a
                  href="https://maps.google.com/?q=D+264-265+Phase+8B+Industrial+Area+Sector+74+Sahibzada+Ajit+Singh+Nagar+Punjab+140307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group"
                  title="Open in Google Maps"
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-tng-primary group-hover:text-white transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-tng-primary font-bold flex items-center gap-1">
                      <span>Headquarters &amp; Advisory Suite</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </strong>
                    <span className="text-slate-600 block mt-0.5">
                      D 264-265, Phase 8B, Industrial Area, Sector 74,<br />
                      Sahibzada Ajit Singh Nagar, Punjab 140307
                    </span>
                    <span className="text-xs text-tng-secondary font-semibold mt-1 inline-block">
                      Click to view on Google Maps →
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-tng-primary block font-bold">Direct Helpline</strong>
                    <a
                      href="tel:+919991906186"
                      className="text-slate-600 hover:text-tng-primary transition-colors block mt-0.5"
                    >
                      +91 9991906186
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-tng-primary block font-bold">Email Inquiries</strong>
                    <a
                      href="mailto:thenewgrowth159@gmail.com"
                      className="text-slate-600 hover:text-tng-primary transition-colors block mt-0.5"
                    >
                      thenewgrowth159@gmail.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-tng-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-tng-primary block font-bold">Visiting Hours</strong>
                    <span className="text-slate-600 block mt-0.5">
                      Monday – Saturday: 9:30 AM – 6:30 PM (Closed Sundays)
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Maps Location Interactive Card */}
              <a
                href="https://maps.google.com/?q=D+264-265+Phase+8B+Industrial+Area+Sector+74+Sahibzada+Ajit+Singh+Nagar+Punjab+140307"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[16/9] w-full rounded-3xl bg-slate-100 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-soft-sm group block transition-transform duration-300 hover:scale-[1.01]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft text-tng-primary flex items-center justify-center mb-2 group-hover:bg-tng-primary group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-tng-text">
                  Phase 8B, Sector 74, Mohali, Punjab
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  D 264-265, Industrial Area
                </span>
                <span className="text-xs text-tng-secondary font-semibold mt-1">
                  Open Interactive Google Maps ↗
                </span>
              </a>
            </div>
          </div>

          {/* Contact Message Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-soft">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-tng-primary">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-tng-text">
                    Message Dispatched
                  </h3>
                  <p className="text-sm text-tng-muted max-w-md mx-auto">
                    Thanks, {formData.name}! Your message has been received. A counseling specialist
                    will respond within 24 business hours at {formData.email}.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    variant="primary"
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-2xl font-bold text-tng-text mb-4">
                    Send Us an Inquiry
                  </h3>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Work Visa in Germany / Study Permit"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can our team assist your upcoming international progression?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    className="w-full justify-center shadow-soft-lg"
                    icon={loading ? null : <Send className="w-4 h-4 ml-1" />}
                    iconPosition="right"
                  >
                    {loading ? "Sending..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
