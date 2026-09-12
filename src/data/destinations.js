export const destinations = [
  {
    slug: "russia",
    name: "Russia",
    code: "RU",
    region: "Eurasia",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1200&auto=format&fit=crop",
    categories: ["Work", "Study", "Travel"],
    overview: "Fast-growing demand for engineering, trade, logistics, and healthcare professionals with accessible visa options.",
    highlights: ["Simplified work invitations", "Affordable living & tuition costs", "Direct flight connectivity"],
    popularPrograms: ["Logistics Specialists", "Civil Construction", "Medical Degrees", "Bilingual Translators"]
  },
  {
    slug: "canada",
    name: "Canada",
    code: "CA",
    region: "North America",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1200&auto=format&fit=crop",
    categories: ["Study", "Relocation", "Work"],
    overview: "World-class education, multicultural society, and structured pathways from graduation to permanent residency.",
    highlights: ["Post-Graduation Work Permits (PGWP)", "Universal healthcare", "Express Entry & PNP streams"],
    popularPrograms: ["Diploma & Master's Programs", "Tech & Software Engineering", "Healthcare Support"]
  },
  {
    slug: "germany",
    name: "Germany",
    code: "DE",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    categories: ["Work", "Study", "Relocation"],
    overview: "Europe's leading industrial economy offering tuition-free public universities and the new Chancenkarte jobseeker card.",
    highlights: ["Opportunity Card points system", "High minimum wage & social benefits", "EU Blue Card pathway"],
    popularPrograms: ["Chancenkarte Jobseeker", "Automotive & Mechanical Engineering", "IT Specialists"]
  },
  {
    slug: "australia",
    name: "Australia",
    code: "AU",
    region: "Oceania",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
    categories: ["Relocation", "Work", "Study"],
    overview: "Exceptional quality of life, robust wage rates, and targeted permanent migration programs for skilled professionals.",
    highlights: ["General Skilled Migration (189/190/491)", "High minimum wage standards", "Sunny climate & outdoors"],
    popularPrograms: ["IT & Cloud Architects", "Registered Nurses", "Skilled Trades", "University Degrees"]
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    code: "AE",
    region: "Middle East",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    categories: ["Work", "Relocation", "Travel"],
    overview: "Global commercial epicenter with 0% personal income tax and long-term 10-year Golden Visas for top talent.",
    highlights: ["Zero tax on personal income", "10-year Golden Visa security", "Global flight hub"],
    popularPrograms: ["Executive Management", "Finance & Banking", "Tech Founders", "Hospitality"]
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    code: "GB",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    categories: ["Study", "Work", "Travel"],
    overview: "World-renowned academic institutions, vibrant global culture, and the 2-year Graduate Route work authorization.",
    highlights: ["1-year Master's degree options", "2-year Graduate Route visa", "Historic university cities"],
    popularPrograms: ["Business Analytics & MBA", "FinTech & Data Science", "Healthcare NHS Roles"]
  },
  {
    slug: "japan",
    name: "Japan",
    code: "JP",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
    categories: ["Work", "Study", "Travel"],
    overview: "Safe, technologically advanced society opening doors to skilled international workers via the SSW initiative.",
    highlights: ["Specified Skilled Worker system", "Very high safety & modern infrastructure", "Rich cultural heritage"],
    popularPrograms: ["Specified Skilled Worker (SSW)", "Engineering & IT", "Language & Cultural Exchange"]
  }
];

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug);
}
