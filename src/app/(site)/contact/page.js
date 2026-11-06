import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import { getSite } from "@/lib/content";

export const metadata = {
  title: "Contact Us | Sunrize Tranzit Ltd",
  description: "Contact Sunrize Tranzit Ltd 24/7 by phone, WhatsApp or email.",
};

export default async function ContactPage() {
  const site = await getSite();
  return (
    <>
      <PageHero crumb="Contact" title="Contact Us">
        We&apos;re available 24 hours a day, 7 days a week. Call, message or email us, whichever suits you.
      </PageHero>
      <section>
        <div className="container">
          <div className="contact-grid">
            <div className="side-card">
              <h4>Call Us 24/7</h4>
              <p>Speak to our team any time, day or night.</p>
              <p className="contact-value"><a href={site.phoneHref}>{site.phone}</a></p>
            </div>
            <div className="side-card">
              <h4>Text / WhatsApp</h4>
              <p>Send us a message and photos of your items.</p>
              <p style={{ marginTop: 12 }}>
                <a className="btn btn-ghost" href={site.whatsappHref}>Message on WhatsApp</a>
              </p>
            </div>
            <div className="side-card">
              <h4>Email</h4>
              <p>We aim to reply promptly.</p>
              <p className="contact-value contact-email"><a href={site.emailHref}>{site.email}</a></p>
            </div>
          </div>
          <div className="center">
            <p style={{ color: "var(--muted)", marginBottom: 14 }}>
              Planning a move? Our quote form gives us what we need to price it accurately.
            </p>
            <Link href="/quote" className="btn btn-primary">Get a Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
