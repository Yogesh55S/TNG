"use client";

import { useState, useMemo, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import { opportunities } from "@/data/opportunities";
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const ITEMS_PER_PAGE = 12;

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: "all", label: "All Opportunities" },
    { id: "work", label: "Work Abroad" },
    { id: "study", label: "Study Programs" },
    { id: "relocation", label: "PR & Relocation" },
    { id: "visit", label: "Travel & Visit" },
  ];

  const countries = useMemo(() => {
    const list = Array.from(new Set(opportunities.map((o) => o.country)));
    return ["all", ...list];
  }, []);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesCountry =
        selectedCountry === "all" || item.country === selectedCountry;

      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [searchTerm, selectedCategory, selectedCountry]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedCountry]);

  const totalPages = Math.ceil(filteredOpportunities.length / ITEMS_PER_PAGE);

  const paginatedOpportunities = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOpportunities.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredOpportunities, currentPage]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedCountry("all");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full pb-20">
      <PageHeader
        badge={null}
        title="Explore Global Opportunities"
        description="Discover verified work permits, study visas, and permanent residency options across Europe, North America, Oceania, and Asia."
        breadcrumbs={[{ label: "Opportunities" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filter Controls Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft mb-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by job role, country (e.g. Germany, Russia, Canada), or university..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-800 placeholder:text-slate-400"
              />
            </div>

            {/* Country Selector */}
            <div className="md:col-span-4 relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-tng-secondary/30 focus:border-tng-secondary text-sm text-slate-700 bg-white"
              >
                <option value="all">All Countries</option>
                {countries
                  .filter((c) => c !== "all")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-tng-primary text-white shadow-soft-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}

            {(searchTerm || selectedCategory !== "all" || selectedCountry !== "all") && (
              <button
                onClick={handleReset}
                className="ml-auto text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-rose-50 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600">
            Showing <strong className="text-tng-primary">{filteredOpportunities.length}</strong> available opportunities
            {totalPages > 1 && (
              <span className="text-slate-400 font-normal ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </p>
        </div>

        {/* Opportunities Grid */}
        {paginatedOpportunities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedOpportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>

            {/* Pagination Controls (Shown when total items > 12) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-tng-primary text-white shadow-soft-sm"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft-sm max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-tng-text">
              No matching opportunities found
            </h3>
            <p className="text-xs text-tng-muted mt-1.5 mb-6">
              Try adjusting your search terms or clearing current category filters.
            </p>
            <Button onClick={handleReset} variant="secondary" size="md">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
