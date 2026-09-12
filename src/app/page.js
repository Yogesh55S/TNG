import HeroSection from "@/components/hero/HeroSection";
import FeaturedOpportunitiesSection from "@/components/opportunities/FeaturedOpportunitiesSection";
import ServicesSection from "@/components/services/ServicesSection";
import DestinationsSection from "@/components/destinations/DestinationsSection";
import ProcessSection from "@/components/trust/ProcessSection";
import TestimonialsSection from "@/components/trust/TestimonialsSection";
import FaqSection from "@/components/faq/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <div id="section-home">
        <HeroSection />
      </div>

      {/* 2. Featured Opportunities Section */}
      <div id="section-opportunities">
        <FeaturedOpportunitiesSection />
      </div>

      {/* 3. Our Services Section */}
      <div id="section-services">
        <ServicesSection />
      </div>

      {/* 4. Popular Destinations Showcase */}
      <div id="section-destinations">
        <DestinationsSection />
      </div>

      {/* 5. How TNG Helps 4-Step Process */}
      <div id="section-about">
        <ProcessSection />
      </div>

      {/* 6. Success Stories & Testimonials */}
      <TestimonialsSection />

      {/* 7. Interactive FAQs */}
      <FaqSection />

      {/* 8. Let's Plan Your Next Step Banner */}
      <div id="section-contact">
        <CtaBanner />
      </div>
    </div>
  );
}

