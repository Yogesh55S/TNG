import Image from "next/image";
import Link from "next/link";
import WhyGrid from "@/components/common/WhyGrid";
import CtaBand from "@/components/common/CtaBand";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import { services as defaultServices } from "@/data/services";
import { getPages, getServices, getSite, getVideos, imageUrl } from "@/lib/content";

export async function generateMetadata() {
  const pages = await getPages();
  return { title: pages.homeSeoTitle, description: pages.homeSeoDescription };
}

const stats = [
  ["24/7", "Open every day"],
  ["Fully insured", "Your items protected"],
  ["Any size", "Single item to full move"],
  ["Free quotes", "No obligation"],
];

const steps = [
  ["Request a quote", "Tell us what's moving, from where and when. It takes about 2 minutes."],
  ["Get your price", "We review your details and send a competitive quote, with no obligation."],
  ["We collect", "Our team arrives at the agreed time and loads your items with care."],
  ["We deliver", "Your belongings are delivered to the new address and unloaded."],
];

export default async function HomePage() {
  const [site, pages, services, videos] = await Promise.all([getSite(), getPages(), getServices(), getVideos()]);
  const heroImage = pages.heroImageId ? imageUrl(pages.heroImageId) : defaultServices[0].image;
  return (
    <>
      <section className="hero" id="home">
        <div className="container">
          <div>
            <h1>{pages.heroTitle} <span>{pages.heroAccent}</span></h1>
            <p>{pages.heroIntro}</p>
            <div className="hero-btns">
              <Link href="/quote" className="btn btn-primary">Get a Free Quote</Link>
              <Link href="/services" className="btn btn-outline">Our Services</Link>
            </div>
            <p className="hero-meta">
              Open 24 hours, 7 days &nbsp;·&nbsp; Fully insured &nbsp;·&nbsp; Call <a href={site.phoneHref}>{site.phone}</a>
            </p>
          </div>
          <div className="hero-art">
            <Image
              src={heroImage}
              width={1400}
              height={930}
              alt="Our team loading a wrapped sofa into a removal van"
              sizes="(max-width: 960px) 100vw, 560px"
              priority
            />
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="container">
          {stats.map(([value, label]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="services">
        <div className="container">
          <div className="section-head">
            <h2>Our Services</h2>
            <p>{pages.servicesIntro}</p>
          </div>
          <div className="card-grid">
            {services.map((s) => (
              <Link className="mini" href={`/services#${s.id}`} key={s.id}>
                <div className="imgwrap">
                  <Image src={s.image} alt="" width={1400} height={930} sizes="(max-width: 760px) 100vw, (max-width: 1024px) 50vw, 280px" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="link">Learn more →</span>
              </Link>
            ))}
          </div>
          <div className="center">
            <Link href="/services" className="btn btn-ghost">View All Services</Link>
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container">
          <div className="section-head">
            <h2>How It Works</h2>
            <p>Four simple steps from first enquiry to final delivery.</p>
          </div>
          <div className="steps">
            {steps.map(([title, text]) => (
              <div key={title}>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <h2>Why Choose Sunrize Tranzit</h2>
            <p>{pages.aboutIntro}</p>
          </div>
          <WhyGrid />
        </div>
      </section>

      <CtaBand />

      {videos.length > 0 && (
        <section className="videos">
          <div className="container">
            <div className="section-head">
              <h2>Hear From Our Customers</h2>
              <p>Real customers sharing their experience of moving with us.</p>
            </div>
            <VideoTestimonials videos={videos} />
            <div className="center">
              <Link href="/reviews" className="btn btn-ghost">Read All Reviews</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
