import Link from "next/link";
import ConfirmButton from "@/components/admin/ConfirmButton";
import Notice from "@/components/admin/Notice";
import { query } from "@/lib/db";
import { formatDateTime, REVIEW_STATUSES } from "@/data/admin";
import { deleteReview, setReviewStatus } from "../../actions";

export default async function ReviewsAdminPage({ searchParams }) {
  const status = REVIEW_STATUSES.some((s) => s.value === searchParams.status) ? searchParams.status : "pending";
  const { rows } = await query("SELECT * FROM reviews WHERE status = $1 ORDER BY created_at DESC LIMIT 200", [status]);

  const StatusButton = ({ id, to, className, children }) => (
    <form action={setReviewStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={to} />
      <input type="hidden" name="tab" value={status} />
      <button className={className}>{children}</button>
    </form>
  );

  return (
    <>
      <h1 className="adm-title">Reviews</h1>
      <p className="adm-sub">Only accepted reviews appear on the website.</p>
      <Notice saved={searchParams.saved} />
      <div className="adm-tabs">
        {REVIEW_STATUSES.map((s) => (
          <Link className={status === s.value ? "pill on" : "pill"} href={`/admin/reviews?status=${s.value}`} key={s.value} style={{ lineHeight: "40px" }}>
            {s.label}
          </Link>
        ))}
      </div>
      {rows.length === 0 && <div className="adm-card adm-empty">No reviews here.</div>}
      {rows.map((r) => (
        <article className="adm-card" key={r.id}>
          <div className="adm-review-head">
            <div>
              <b>{r.name}</b>
              <div><small>{[r.service, r.loc, r.move_month].filter(Boolean).join(" · ")}</small></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="stars" aria-label={`${r.stars} out of 5 stars`}>{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
              <small>{formatDateTime(r.created_at)}</small>
            </div>
          </div>
          <h2 style={{ marginBottom: 4 }}>{r.title}</h2>
          <p style={{ marginBottom: 14, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{r.text}</p>
          <div className="adm-actions">
            {r.status !== "approved" && <StatusButton id={r.id} to="approved" className="btn btn-ok btn-sm">Accept</StatusButton>}
            {r.status !== "rejected" && <StatusButton id={r.id} to="rejected" className="btn btn-bad btn-sm">Reject</StatusButton>}
            <form action={deleteReview}>
              <input type="hidden" name="id" value={r.id} />
              <input type="hidden" name="tab" value={status} />
              <ConfirmButton message="Delete this review permanently?" className="btn btn-ghost btn-sm">Delete</ConfirmButton>
            </form>
          </div>
        </article>
      ))}
    </>
  );
}
