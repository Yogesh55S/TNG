"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import { ArrowRight, Menu, X } from "lucide-react";
import ConsultationModal from "@/components/forms/ConsultationModal";
import useScrollSpy from "@/hooks/useScrollSpy";

// Maps section IDs on the homepage to their corresponding nav href
const SECTION_TO_NAV = {
  "section-home": "/",
  "section-opportunities": "/opportunities",
  "section-services": "/services",
  "section-destinations": "/destinations",
  "section-about": "/about",
  "section-contact": "/contact",
};

const SECTION_IDS = Object.keys(SECTION_TO_NAV);

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const isHomePage = pathname === "/";

  // Scroll spy — only active on the homepage
  const activeSection = useScrollSpy(isHomePage ? SECTION_IDS : []);

  // Determine the active nav href based on scroll spy (homepage) or pathname (other pages)
  const activeNavHref = useMemo(() => {
    if (isHomePage && activeSection) {
      return SECTION_TO_NAV[activeSection] || "/";
    }
    return null; // fall back to pathname matching
  }, [isHomePage, activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open (prevents scroll glitch)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Services", href: "/services" },
    { label: "Destinations", href: "/destinations" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Fully transparent on homepage hero, solid on scroll or other pages
  const isTransparent = isHomePage && !scrolled;

  // Determine if a nav link is active
  const isLinkActive = (href) => {
    // On homepage with scroll spy active
    if (isHomePage && activeNavHref !== null) {
      return href === activeNavHref;
    }
    // On other pages, use pathname matching
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`w-full transition-all duration-300 ease-out z-40 ${
          isHomePage ? "fixed top-0 left-0 right-0" : "sticky top-0"
        } ${
          isTransparent
            ? "bg-transparent py-4 sm:py-5 border-b border-transparent"
            : "bg-white/95 backdrop-blur-lg shadow-[0_2px_10px_rgba(18,59,112,0.08)] py-3 border-b border-slate-200/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <Logo size="default" />
            </div>

            {/* Desktop Navigation Pills */}
            <nav
              className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                isTransparent
                  ? "bg-white/50 backdrop-blur-md border border-white/40 shadow-none"
                  : "bg-slate-50/80 backdrop-blur-md border border-slate-200/50 shadow-soft-xs"
              }`}
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white bg-tng-primary shadow-soft-sm"
                        : isTransparent
                        ? "text-slate-700 hover:text-tng-primary hover:bg-white/60"
                        : "text-slate-600 hover:text-tng-primary hover:bg-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <Button
                  onClick={() => setIsConsultationOpen(true)}
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4 ml-1" />}
                  iconPosition="right"
                  className="shadow-soft hover:shadow-soft-lg border-none"
                >
                  Book a Consultation
                </Button>
              </div>

              {/* Mobile Menu Button - Borderless & No Box */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-tng-primary hover:bg-black/5 active:scale-95 transition-all focus:outline-none border-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.2]" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Right-to-Left Slide-over Drawer — OUTSIDE header to fix z-index on non-hero pages */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer (Right to Left) */}
          <div className="fixed inset-y-0 right-0 w-[290px] sm:w-[320px] max-w-[85vw] h-full bg-white text-tng-text z-[9999] flex flex-col justify-between p-6 shadow-[-8px_0_32px_rgba(18,59,112,0.15)] border-l border-slate-100 animate-in slide-in-from-right duration-300 ease-out">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <Logo size="small" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-tng-primary hover:bg-slate-100 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6 stroke-[2]" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1.5 pt-6">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center ${
                        isActive
                          ? "bg-tng-primary/10 text-tng-primary"
                          : "text-slate-600 hover:text-tng-primary hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-5 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConsultationOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-tng-primary text-white text-sm font-bold px-5 py-3.5 rounded-xl shadow-md hover:bg-tng-primary/90 active:scale-[0.98] transition-all"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/opportunities"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center text-sm font-semibold text-tng-primary hover:text-tng-secondary py-3 rounded-xl hover:bg-slate-50 transition-all"
              >
                Explore All Opportunities →
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
}
