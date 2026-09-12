import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHeader({
  badge = "TNG GLOBAL",
  title,
  description,
  breadcrumbs = [],
}) {
  return (
    <div className="bg-gradient-to-b from-[#EBF2FA]/70 via-[#F5F8FC] to-[#F5F8FC] pt-12 pb-10 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-tng-muted mb-4">
            <Link href="/" className="hover:text-tng-primary transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-slate-400" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-tng-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-tng-primary font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Eyebrow Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200 shadow-2xs text-xs font-bold text-tng-secondary uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-tng-secondary" />
            {badge}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-tng-text tracking-tight">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="mt-3 text-base sm:text-lg text-tng-muted max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
