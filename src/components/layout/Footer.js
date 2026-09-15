"use client";

import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1F38] text-slate-300 pt-16 pb-10 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="default" />
            <p className="text-sm text-slate-300 font-medium">
              More than destinations, we create new beginnings.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              TNG helps individuals navigate international work, study, and relocation pathways with verified guidance, compliance-first documentation, and personalized advisory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About TNG
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Pathways */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/opportunities?category=work" className="hover:text-white transition-colors">
                  Work Abroad Visas
                </Link>
              </li>
              <li>
                <Link href="/opportunities?category=study" className="hover:text-white transition-colors">
                  University & Study Permits
                </Link>
              </li>
              <li>
                <Link href="/opportunities?category=relocation" className="hover:text-white transition-colors">
                  Permanent Residency (PR)
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition-colors">
                  Germany Chancenkarte
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors">
                  Europe & Canada Pathways
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li>
                <a
                  href="https://maps.google.com/?q=D+264-265+Phase+8B+Industrial+Area+Sector+74+Sahibzada+Ajit+Singh+Nagar+Punjab+140307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-white transition-colors group"
                  title="Open in Google Maps"
                >
                  <MapPin className="w-4 h-4 text-tng-secondary shrink-0 mt-0.5 group-hover:text-tng-accent transition-colors" />
                  <span>D 264-265, Phase 8B, Industrial Area,<br />Sector 74, SAS Nagar, Punjab 140307</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-tng-secondary shrink-0" />
                <a href="tel:+919991906186" className="hover:text-white transition-colors">
                  +91 9991906186
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-tng-secondary shrink-0" />
                <a href="mailto:thenewgrowth159@gmail.com" className="hover:text-white transition-colors">
                  thenewgrowth159@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} TNG — The Next Growth. All rights reserved.</p>

          <div className="flex items-center gap-5 text-xs">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/services" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
