import Image from "next/image";
import Link from "next/link";
import logoFooter from "@/assets/images/logo-footer.png";
import { getSite } from "@/lib/content";
import CurrentYear from "./CurrentYear";

export default async function Footer() {
  const site = await getSite();
  return (
    <>
      <footer id="contact">
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ marginBottom: 14 }}>
                <Image src={logoFooter} alt={site.name} />
              </div>
              <p style={{ fontSize: ".93rem" }}>
                Fully insured removals and courier services at competitive rates, available 24 hours a day, 7 days a week.
              </p>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                <li><Link href="/services#house">House Removals</Link></li>
                <li><Link href="/services#flat">Flat &amp; Apartment Removals</Link></li>
                <li><Link href="/services#office">Office &amp; Business Removals</Link></li>
                <li><Link href="/services#courier">Courier &amp; Delivery</Link></li>
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/quote">Get a Quote</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href={site.phoneHref}>{site.phone}</a></li>
                <li><a href={site.emailHref}>{site.email}</a></li>
                <li>Open 24/7</li>
                <li>{site.location}</li>
              </ul>
            </div>
          </div>
          <div className="copy">
            © <CurrentYear /> {site.name}. All rights reserved.
          </div>
        </div>
      </footer>
      <a className="float-call" href={site.whatsappHref} aria-label="WhatsApp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.6-.1 1.1z" />
        </svg>
      </a>
      <div className="mobile-cta">
        <a href={site.phoneHref} className="btn btn-ghost">Call</a>
        <a href={site.whatsappHref} className="btn btn-ghost">WhatsApp</a>
        <Link href="/quote" className="btn btn-primary">Free Quote</Link>
      </div>
    </>
  );
}
