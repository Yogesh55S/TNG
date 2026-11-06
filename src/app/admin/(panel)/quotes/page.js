import Link from "next/link";
import Notice from "@/components/admin/Notice";
import { query } from "@/lib/db";
import { formatDateTime, QUOTE_STATUSES } from "@/data/admin";

const labelOf = (status) => QUOTE_STATUSES.find((s) => s.value === status)?.label || status;

export default async function QuotesPage({ searchParams }) {
  const status = QUOTE_STATUSES.some((s) => s.value === searchParams.status) ? searchParams.status : "";
  const { rows } = await query(
    `SELECT id, created_at, status, name, phone, service FROM quotes ${status ? "WHERE status = $1" : ""} ORDER BY created_at DESC LIMIT 200`,
    status ? [status] : []
  );
  return (
    <>
      <h1 className="adm-title">Quote Requests</h1>
      <p className="adm-sub">Requests sent from the website quote form.</p>
      <Notice saved={searchParams.saved} />
      <div className="adm-tabs">
        <Link className={status ? "pill" : "pill on"} href="/admin/quotes" style={{ lineHeight: "40px" }}>All</Link>
        {QUOTE_STATUSES.map((s) => (
          <Link className={status === s.value ? "pill on" : "pill"} href={`/admin/quotes?status=${s.value}`} key={s.value} style={{ lineHeight: "40px" }}>
            {s.label}
          </Link>
        ))}
      </div>
      <div className="adm-table-wrap">
        {rows.length ? (
          <table className="adm-table">
            <thead>
              <tr><th>Customer</th><th>Service</th><th>Phone</th><th>Received</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rows.map((q) => (
                <tr key={q.id}>
                  <td><Link className="name" href={`/admin/quotes/${q.id}`}>{q.name}</Link></td>
                  <td>{q.service}</td>
                  <td><a href={`tel:${q.phone}`}>{q.phone}</a></td>
                  <td>{formatDateTime(q.created_at)}</td>
                  <td><span className={`adm-badge ${q.status}`}>{labelOf(q.status)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="adm-empty">No quote requests here yet.</div>
        )}
      </div>
    </>
  );
}
