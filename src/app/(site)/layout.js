import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSite } from "@/lib/content";

// Pages refresh at least this often, and immediately after an admin saves a change.
export const revalidate = 300;

export default async function SiteLayout({ children }) {
  return (
    <>
      <Header site={await getSite()} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
