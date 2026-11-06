import Link from "next/link";
import { notFound } from "next/navigation";
import ImagePicker from "@/components/admin/ImagePicker";
import Notice from "@/components/admin/Notice";
import { query } from "@/lib/db";
import { saveService } from "../../../actions";

export default async function ServiceEditPage({ params, searchParams }) {
  const { rows } = await query("SELECT * FROM services WHERE id = $1", [params.id]);
  const service = rows[0];
  if (!service) notFound();

  return (
    <>
      <p style={{ marginBottom: 8 }}><Link href="/admin/services" style={{ textDecoration: "underline" }}>← All services</Link></p>
      <h1 className="adm-title">{service.title}</h1>
      <p className="adm-sub">Changes appear on the website when you save.</p>
      <Notice saved={searchParams.saved} error={searchParams.error && "Please fill in the title, summary and description."} />
      <form className="adm-card" action={saveService}>
        <input type="hidden" name="id" value={service.id} />
        <div className="row one"><div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" defaultValue={service.title} required maxLength={120} />
        </div></div>
        <div className="row one"><div>
          <label htmlFor="short">Short summary (shown on the home page)</label>
          <input id="short" name="short" defaultValue={service.short} required maxLength={300} />
        </div></div>
        <div className="row one"><div>
          <label htmlFor="body">Description</label>
          <textarea id="body" name="body" defaultValue={service.body} required maxLength={2000} />
        </div></div>
        <div className="row one"><div>
          <label htmlFor="points">Key points (one per line)</label>
          <textarea id="points" name="points" defaultValue={service.points.join("\n")} rows={7} style={{ minHeight: 170 }} />
        </div></div>
        <div className="row one"><div>
          <span className="field-label">Image</span>
          <ImagePicker name="image_id" imageId={service.image_id} />
        </div></div>
        <div className="row one"><div>
          <label htmlFor="alt">Image description (for screen readers and Google)</label>
          <input id="alt" name="alt" defaultValue={service.alt} maxLength={200} />
        </div></div>
        <button className="btn btn-primary">Save Service</button>
      </form>
    </>
  );
}
