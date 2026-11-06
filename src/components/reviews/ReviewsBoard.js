"use client";

import { Fragment, useMemo, useState } from "react";

const FILTERS = [
  ["all", "All"],
  ["5", "5 ★"],
  ["4", "4 ★"],
  ["3", "3 ★"],
  ["low", "1–2 ★"],
];

const starText = (n) => "★".repeat(n) + "☆".repeat(5 - n);

// Dates are stored as YYYY-MM-DD (UTC midnight); format in UTC so the month never shifts.
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

function ReviewCard({ review: r }) {
  return (
    <article className="rcard">
      <div className="rhead">
        <span className="av">{r.name[0].toUpperCase()}</span>
        <div className="meta">
          <b>{r.name}</b>
          <small>
            {r.loc}
            {r.loc ? " · " : ""}
            {formatDate(r.date)}
          </small>
        </div>
        <span className="stars" aria-label={`${r.stars} out of 5 stars`}>{starText(r.stars)}</span>
      </div>
      <h4>{r.title}</h4>
      <p>{r.text}</p>
      <div className="rfoot">
        <span className="tag">{r.service}</span>
        <span className="tag ok">Customer review</span>
      </div>
    </article>
  );
}

export default function ReviewsBoard({ reviews, reviewServices, site }) {
  const [filter, setFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("");
  const [sort, setSort] = useState("new");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed

  const total = reviews.length;
  const average = total ? reviews.reduce((sum, r) => sum + r.stars, 0) / total : 0;

  const visible = useMemo(() => {
    const list = reviews
      .filter((r) => filter === "all" || (filter === "low" ? r.stars <= 2 : r.stars === Number(filter)))
      .filter((r) => !serviceFilter || r.service === serviceFilter);
    return list.sort((a, b) =>
      sort === "high" ? b.stars - a.stars : sort === "low" ? a.stars - b.stars : b.date.localeCompare(a.date)
    );
  }, [reviews, filter, serviceFilter, sort]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section className="quote">
      <div className="container">
        {total > 0 ? (
          <>
            <div className="rv-top">
              <div className="score">
                <strong>{average.toFixed(1)}</strong>
                <div className="stars">{starText(Math.round(average))}</div>
                <small>{`${total} review${total === 1 ? "" : "s"}`}</small>
              </div>
              <div className="bars">
                {[5, 4, 3, 2, 1].map((s) => {
                  const count = reviews.filter((r) => r.stars === s).length;
                  return (
                    <button className="bar" key={s} onClick={() => setFilter(s > 2 ? String(s) : "low")}>
                      <span>{s} star</span>
                      <i><b style={{ width: `${(count / total) * 100}%` }} /></i>
                      <span>{count}</span>
                    </button>
                  );
                })}
              </div>
              <a href="#write" className="btn btn-primary">Write a Review</a>
            </div>

            <div className="rv-tools">
              <div className="pills">
                {FILTERS.map(([value, label]) => (
                  <button className={filter === value ? "pill on" : "pill"} key={value} onClick={() => setFilter(value)}>
                    {label}
                  </button>
                ))}
              </div>
              <div className="rv-selects">
                <select aria-label="Filter by service" value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
                  <option value="">All services</option>
                  {reviewServices.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <select aria-label="Sort reviews" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="new">Newest first</option>
                  <option value="high">Highest rated</option>
                  <option value="low">Lowest rated</option>
                </select>
              </div>
            </div>

            <div className="rv-grid">
              {visible.length ? (
                visible.map((r) => <ReviewCard review={r} key={r.id} />)
              ) : (
                <div className="empty">No reviews match these filters. Try a different rating or service.</div>
              )}
            </div>
          </>
        ) : (
          <div className="empty rv-empty">
            <h3>No reviews yet</h3>
            <p>Used our service? Be the first to share your experience.</p>
            <a href="#write" className="btn btn-primary">Write a Review</a>
          </div>
        )}

        <div className="write" id="write">
          <div className="write-intro">
            <h2>Used Our Service? Share Your Experience</h2>
            <p>Your feedback helps us improve and helps other customers choose with confidence.</p>
            <ul>
              <li>Takes less than 2 minutes</li>
              <li>Only your first name is shown</li>
              <li>We check every review before publishing</li>
            </ul>
          </div>
          <form className="review-form" onSubmit={handleSubmit}>
            <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="row one">
              <div>
                <span className="field-label" id="rating-label">Your overall rating <span className="req">*</span></span>
                <div className="rating" role="radiogroup" aria-labelledby="rating-label">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <Fragment key={n}>
                      <input type="radio" id={`r${n}`} name="stars" value={n} required={n === 5} aria-label={`${n} stars`} />
                      <label htmlFor={`r${n}`} aria-hidden="true">★</label>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div>
                <label htmlFor="rv-name">Your name <span className="req">*</span></label>
                <input id="rv-name" name="name" required autoComplete="given-name" />
              </div>
              <div>
                <label htmlFor="rv-service">Service used <span className="req">*</span></label>
                <select id="rv-service" name="service" required>
                  {reviewServices.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div>
                <label htmlFor="rv-loc">Location (town/city)</label>
                <input id="rv-loc" name="loc" placeholder="e.g. Birmingham" />
              </div>
              <div>
                <label htmlFor="rv-when">Date of move</label>
                <input id="rv-when" type="month" name="when" />
              </div>
            </div>
            <div className="row one">
              <div>
                <label htmlFor="rv-title">Review title <span className="req">*</span></label>
                <input id="rv-title" name="title" required maxLength={80} placeholder="Sum up your experience" />
              </div>
            </div>
            <div className="row one">
              <div>
                <label htmlFor="rv-text">Your review <span className="req">*</span></label>
                <textarea id="rv-text" name="text" required minLength={20} placeholder="What went well? How was the team?" />
              </div>
            </div>
            <label className="consent">
              <input type="checkbox" required />{" "}
              <span>I confirm this review is based on my own experience and agree to it being published.</span>
            </label>
            <button className="btn btn-primary" style={{ width: "100%" }} disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Submit My Review"}
            </button>
            {status === "sent" && (
              <div className="success" role="status" style={{ display: "block" }}>
                Thank you! We&apos;ve received your review and will publish it once it&apos;s been checked.
              </div>
            )}
            {status === "failed" && (
              <div className="err-box" role="alert">
                We couldn&apos;t send your review. Please try again, or email us at <a href={site.emailHref}>{site.email}</a>.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
