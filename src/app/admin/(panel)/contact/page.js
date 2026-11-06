import Notice from "@/components/admin/Notice";
import { getSite } from "@/lib/content";
import { saveContact } from "../../actions";

export default async function ContactAdminPage({ searchParams }) {
  const site = await getSite();
  return (
    <>
      <h1 className="adm-title">Contact Details</h1>
      <p className="adm-sub">Shown across the website. Form notifications are also sent to this email.</p>
      <Notice saved={searchParams.saved} error={searchParams.error && "Please check the phone numbers and email address."} />
      <form className="adm-card" action={saveContact}>
        <div className="row">
          <div>
            <label htmlFor="phone">Phone (as shown on the website)</label>
            <input id="phone" name="phone" defaultValue={site.phone} required maxLength={40} />
          </div>
          <div>
            <label htmlFor="phoneDigits">Phone for calls (with country code)</label>
            <input id="phoneDigits" name="phoneDigits" defaultValue={site.phoneDigits} required inputMode="numeric" placeholder="e.g. 447000000000" />
          </div>
        </div>
        <div className="row">
          <div>
            <label htmlFor="whatsappDigits">WhatsApp number (with country code)</label>
            <input id="whatsappDigits" name="whatsappDigits" defaultValue={site.whatsappDigits} required inputMode="numeric" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" defaultValue={site.email} required />
          </div>
        </div>
        <div className="row one"><div>
          <label htmlFor="location">Address or location</label>
          <input id="location" name="location" defaultValue={site.location} maxLength={200} />
        </div></div>
        <button className="btn btn-primary">Save Contact Details</button>
      </form>
    </>
  );
}
