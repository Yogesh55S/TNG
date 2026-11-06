"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.png";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ site }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>Available 24 hours a day, 7 days a week</span>
          <span>
            <a href={site.phoneHref}>{site.phone}</a> &nbsp;|&nbsp; <a href={site.emailHref}>{site.email}</a>
          </span>
        </div>
      </div>
      <header>
        <div className="container">
          <nav>
            <Link href="/" className="logo" aria-label={`${site.name} home`}>
              <Image src={logo} alt={site.name} priority />
            </Link>
            <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
            <ul className={open ? "nav-links open" : "nav-links"}>
              {links.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={active ? "active" : undefined}
                      aria-current={active ? "page" : undefined}
                      onClick={close}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/quote" className="btn btn-primary" onClick={close}>
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
