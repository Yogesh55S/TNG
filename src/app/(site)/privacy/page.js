import PageHero from "@/components/common/PageHero";
import { getSite } from "@/lib/content";

export const metadata = {
  title: "Privacy Policy | Sunrize Tranzit Ltd",
  description: "Privacy Policy for Sunrize Tranzit Ltd.",
};

export default async function PrivacyPage() {
  const site = await getSite();
  return (
    <>
      <PageHero crumb="Privacy Policy" title="Privacy Policy">How we collect, use and protect your information.</PageHero>
      <section>
        <div className="container legal">
          <p>Sunrize Tranzit Ltd respects your privacy. This policy explains how we handle the information you provide through this website.</p>
          <h2>What we collect</h2>
          <p>Your name, contact details, collection and delivery addresses, move details, and any photos or notes you submit through our quote or review forms.</p>
          <h2>How we use it</h2>
          <p>Your details will only be used to respond to your enquiry and arrange your requested service. We do not sell your data.</p>
          <h2>Reviews</h2>
          <p>If you submit a review, your first name, rating and comments may be displayed on our website.</p>
          <h2>Retention</h2>
          <p>We keep your information only as long as needed to provide the service and meet legal obligations.</p>
          <h2>Your rights</h2>
          <p>
            Under UK GDPR you may request access to, correction of, or deletion of your data by contacting{" "}
            <a href={site.emailHref} className="text-link">{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
