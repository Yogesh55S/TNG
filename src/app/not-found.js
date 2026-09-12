import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-tng-primary/10 text-tng-primary flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 stroke-[1.8]" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-tng-secondary">
            404 Error
          </p>
          <h1 className="text-3xl font-extrabold text-tng-text tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            href="/"
            variant="primary"
            size="md"
            icon={<ArrowLeft className="w-4 h-4 mr-1" />}
            iconPosition="left"
            className="w-full sm:w-auto justify-center"
          >
            Back to Home
          </Button>

          <Button
            href="/opportunities"
            variant="secondary"
            size="md"
            className="w-full sm:w-auto justify-center border border-slate-200"
          >
            Explore Opportunities
          </Button>
        </div>
      </div>
    </div>
  );
}
