import PageHero from "@/components/common/PageHero";
import WhyGrid from "@/components/common/WhyGrid";
import CtaBand from "@/components/common/CtaBand";
import { getPages } from "@/lib/content";

export async function generateMetadata() {
  const pages = await getPages();
  return { title: pages.aboutSeoTitle, description: pages.aboutIntro };
}

export default async function AboutPage() {
  const pages = await getPages();
  return (
    <>
      <PageHero crumb="About Us" title={pages.aboutTitle}>{pages.aboutIntro}</PageHero>
      <section id="why">
        <div className="container">
          <WhyGrid />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
