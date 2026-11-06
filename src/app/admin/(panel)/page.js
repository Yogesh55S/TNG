import Link from "next/link";
import { query } from "@/lib/db";
import { formatDateTime } from "@/data/admin";

export default async function DashboardPage() {
  const [{ rows: c }, { rows: recent }] = await Promise.all([
    query(`SELECT
      (SELECT count(*) FROM quotes WHERE status = 'new')::int AS new_quotes,
      (SELECT count(*) FROM quotes)::int AS all_quotes,
      (SELECT count(*) FROM reviews WHERE status = 'pending')::int AS pending_reviews,
      (SELECT count(*) FROM reviews WHERE status = 'approved')::int AS accepted_reviews`),
    query("SELECT id, name, service, created_at FROM quotes WHERE status = 'new' ORDER BY created_at DESC LIMIT 5"),
  ]);
  const stats = [
    [c[0].new_quotes, "New quote requests", "/admin/quotes?status=new"],
    [c[0].all_quotes, "All quote requests", "/admin/quotes"],
    [c[0].pending_reviews, "Reviews waiting", "/admin/reviews?status=pending"],
    [c[0].accepted_reviews, "Reviews on the website", "/admin/reviews?status=approved"],
  ];
  return (
    <>
      <h1 className="adm-title">Dashboard</h1>
      <p className="adm-sub">What needs your attention today.</p>
      <div className="adm-stats">
        {stats.map(([value, label, href]) => (
          <Link className="adm-stat" href={href} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </Link>
        ))}
      </div>
      <div className="adm-card">
        <h2>Latest new quote requests</h2>
        {recent.length ? (
          recent.map((q) => (
            <p key={q.id} className="adm-list-link">
              <Link href={`/admin/quotes/${q.id}`} style={{ fontWeight: 700, textDecoration: "underline" }}>
                {q.name} · {q.service}
              </Link>
              <small>{formatDateTime(q.created_at)}</small>
            </p>
          ))
        ) : (
          <p className="adm-sub" style={{ margin: 0 }}>No new requests right now.</p>
        )}
      </div>
    </>
  );
}
