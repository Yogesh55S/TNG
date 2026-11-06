import Link from "next/link";
import { getServices } from "@/lib/content";

export default async function ServicesAdminPage() {
  const services = await getServices();
  return (
    <>
      <h1 className="adm-title">Services</h1>
      <p className="adm-sub">Edit the text, points and image for each service.</p>
      {services.map((s) => (
        <div className="adm-card adm-list-link" key={s.id}>
          <div>
            <b>{s.title}</b>
            <div><small>{s.short}</small></div>
          </div>
          <Link className="btn btn-ghost btn-sm" href={`/admin/services/${s.id}`}>Edit</Link>
        </div>
      ))}
    </>
  );
}
