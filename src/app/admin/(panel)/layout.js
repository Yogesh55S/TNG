import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { hasDb, query } from "@/lib/db";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  const connected = hasDb();
  let counts = { quotes: 0, reviews: 0 };
  if (connected) {
    const { rows } = await query(
      "SELECT (SELECT count(*) FROM quotes WHERE status = 'new')::int AS quotes, (SELECT count(*) FROM reviews WHERE status = 'pending')::int AS reviews"
    );
    counts = rows[0];
  }
  return (
    <div className="adm-shell">
      <div className="adm-side" role="navigation" aria-label="Admin">
        <div className="adm-brand">Sunrize Tranzit<small>Admin Panel</small></div>
        <AdminNav newQuotes={counts.quotes} pendingReviews={counts.reviews} />
        <div className="adm-side-end">
          <Link href="/" className="adm-link" target="_blank">View Website</Link>
          <form action={logout}><button className="adm-link">Log Out</button></form>
        </div>
      </div>
      <div className="adm-main">
        {connected ? (
          children
        ) : (
          <div className="adm-note bad" role="alert">
            Database not connected. Add DATABASE_URL (your Neon connection string) to the environment settings, then restart the site.
          </div>
        )}
      </div>
    </div>
  );
}
