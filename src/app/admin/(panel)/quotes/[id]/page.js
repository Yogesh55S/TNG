import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmButton from "@/components/admin/ConfirmButton";
import Notice from "@/components/admin/Notice";
import { query } from "@/lib/db";
import { formatDateTime, QUOTE_STATUSES } from "@/data/admin";
import { deleteQuote, setQuoteStatus } from "../../../actions";

export default async function QuoteDetailPage({ params, searchParams }) {
  if (!/^\d{1,9}$/.test(params.id)) notFound();
  const [{ rows }, { rows: photos }] = await Promise.all([
    query("SELECT * FROM quotes WHERE id = $1", [params.id]),
    query("SELECT id FROM quote_photos WHERE quote_id = $1 ORDER BY id", [params.id]),
  ]);
  const quote = rows[0];
  if (!quote) notFound();

  return (
    <>
      <p style={{ marginBottom: 8 }}><Link href="/admin/quotes" style={{ textDecoration: "underline" }}>← All quote requests</Link></p>
      <h1 className="adm-title">{quote.name}</h1>
      <p className="adm-sub">{quote.service} · Received {formatDateTime(quote.created_at)}</p>
      <Notice saved={searchParams.saved} />

      <div className="adm-card">
        <div className="adm-actions" style={{ justifyContent: "space-between" }}>
          <form action={setQuoteStatus} className="adm-inline">
            <input type="hidden" name="id" value={quote.id} />
            <label htmlFor="status" style={{ margin: 0 }}>Status</label>
            <select id="status" name="status" defaultValue={quote.status}>
              {QUOTE_STATUSES.map((s) => (
                <option value={s.value} key={s.value}>{s.label}</option>
              ))}
            </select>
            <button className="btn btn-primary btn-sm">Save Status</button>
          </form>
          <div className="adm-actions">
            <a className="btn btn-ghost btn-sm" href={`tel:${quote.phone}`}>Call</a>
            <a className="btn btn-ghost btn-sm" href={`mailto:${quote.email}`}>Email</a>
          </div>
        </div>
      </div>

      <div className="adm-card">
        <h2>Request details</h2>
        <dl className="adm-detail">
          {quote.details.filter(([, value]) => value).map(([label, value]) => (
            <div key={label} style={{ display: "contents" }}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {photos.length > 0 && (
        <div className="adm-card">
          <h2>Photos ({photos.length})</h2>
          <div className="adm-photos">
            {photos.map((p) => (
              <a href={`/admin/photos/${p.id}`} target="_blank" rel="noreferrer" key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element -- private admin-only image route */}
                <img src={`/admin/photos/${p.id}`} alt="Customer item" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      )}

      <form action={deleteQuote}>
        <input type="hidden" name="id" value={quote.id} />
        <ConfirmButton message="Delete this request and its photos? This can't be undone.">Delete Request</ConfirmButton>
      </form>
    </>
  );
}
