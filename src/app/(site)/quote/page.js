import PageHero from "@/components/common/PageHero";
import QuoteForm from "@/components/quote/QuoteForm";
import { getSite } from "@/lib/content";

const intro =
  "Tell us about your move and we'll send you a competitive price. The more detail you share, the more accurate your quote will be.";

export const metadata = {
  title: "Get a Free Quote | Sunrize Tranzit Ltd",
  description: intro,
};

export default async function QuotePage() {
  const site = await getSite();
  return (
    <>
      <PageHero crumb="Get a Quote" title="Get a Free Quote">{intro}</PageHero>
      <QuoteForm site={site} />
    </>
  );
}
