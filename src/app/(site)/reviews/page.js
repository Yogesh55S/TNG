import PageHero from "@/components/common/PageHero";
import ReviewsBoard from "@/components/reviews/ReviewsBoard";
import { reviewsIntro } from "@/data/site";
import { getApprovedReviews, getServices, getSite } from "@/lib/content";

export const metadata = {
  title: "Customer Reviews | Sunrize Tranzit Ltd",
  description: "Read customer reviews of Sunrize Tranzit Ltd or share your own experience of moving with us.",
};

export default async function ReviewsPage() {
  const [reviews, services, site] = await Promise.all([getApprovedReviews(), getServices(), getSite()]);
  return (
    <>
      <PageHero crumb="Reviews" title="Customer Reviews">{reviewsIntro}</PageHero>
      <ReviewsBoard reviews={reviews} reviewServices={services.map((s) => s.title)} site={site} />
    </>
  );
}
