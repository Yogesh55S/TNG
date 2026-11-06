import Link from "next/link";
import { getSite } from "@/lib/content";

export default async function CtaBand() {
  const site = await getSite();
  return (
    <div className="cta-band">
      <div className="container">
        <h3>Ready to move? Get your free, no-obligation quote today.</h3>
        <div className="cta-actions">
          <Link href="/quote" className="btn">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-call">Call {site.phone}</a>
        </div>
      </div>
    </div>
  );
}
