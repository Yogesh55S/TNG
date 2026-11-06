"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav({ newQuotes, pendingReviews }) {
  const pathname = usePathname();
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/quotes", label: "Quotes", count: newQuotes },
    { href: "/admin/reviews", label: "Reviews", count: pendingReviews },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/videos", label: "Videos" },
    { href: "/admin/pages", label: "Page Text & Images" },
    { href: "/admin/contact", label: "Contact Details" },
  ];
  return links.map(({ href, label, count }) => {
    const on = href === "/admin" ? pathname === href : pathname.startsWith(href);
    return (
      <Link key={href} href={href} className={on ? "adm-link on" : "adm-link"} aria-current={on ? "page" : undefined}>
        {label}
        {count > 0 && <span className="adm-count">{count}</span>}
      </Link>
    );
  });
}
