import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/common/PageHero";
import { getSite } from "@/lib/content";

export const metadata = { title: "Page Not Found | Sunrize Tranzit Ltd" };

export default async function NotFound() {
  return (
    <>
      <Header site={await getSite()} />
      <main>
        <PageHero crumb="Page not found" title="Page Not Found">
          The page you are looking for does not exist or has moved.
        </PageHero>
        <section>
          <div className="container center">
            <Link href="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
