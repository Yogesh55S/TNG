import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import CtaBand from "@/components/common/CtaBand";
import { getPages, getServices } from "@/lib/content";

export const metadata = {
  title: "Our Services | Sunrize Tranzit Ltd",
  description:
    "House, flat and office removals plus courier and delivery services. Fully insured, available 24/7, with free no-obligation quotes.",
};

export default async function ServicesPage() {
  const [pages, services] = await Promise.all([getPages(), getServices()]);
  return (
    <>
      <PageHero crumb="Services" title="Our Services">{pages.servicesIntro}</PageHero>
      <section className="services" id="services">
        <div className="container">
          <div className="service-grid">
            {services.map((s) => (
              <div className="service-card" id={s.id} key={s.id}>
                <div className="svc-media">
                  <Image src={s.image} alt={s.alt} width={1400} height={930} sizes="(max-width: 960px) 100vw, 480px" />
                </div>
                <div className="svc-body">
                  <div className="service-top">
                    <h3>{s.title}</h3>
                  </div>
                  <p className="short">{s.short}</p>
                  <p>{s.body}</p>
                  <ul className="points">
                    {s.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="svc-actions">
                    <Link href={s.quoteHref} className="btn btn-primary">Get a Free Quote</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
