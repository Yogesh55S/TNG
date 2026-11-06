import { cache } from "react";
import { hasDb, query } from "@/lib/db";
import { defaultContact, defaultPages } from "@/data/site";
import { services as defaultServices } from "@/data/services";

// Without DATABASE_URL the site shows the defaults. With it, database errors are not hidden:
// Next.js then keeps serving the last good page instead of replacing it with defaults.

const getSetting = async (key, defaults) => {
  if (!hasDb()) return defaults;
  const { rows } = await query("SELECT value FROM settings WHERE key = $1", [key]);
  return { ...defaults, ...rows[0]?.value };
};

export const imageUrl = (id) => `/api/images/${id}`;

export const getSite = cache(async () => {
  const c = await getSetting("contact", defaultContact);
  return {
    ...c,
    name: "Sunrize Tranzit Ltd",
    phoneHref: `tel:+${c.phoneDigits}`,
    whatsappHref: `https://wa.me/${c.whatsappDigits}`,
    emailHref: `mailto:${c.email}`,
  };
});

export const getPages = cache(() => getSetting("pages", defaultPages));

export const getServices = cache(async () => {
  if (!hasDb()) return defaultServices;
  const { rows } = await query("SELECT * FROM services ORDER BY sort");
  return rows.map((row) => {
    const base = defaultServices.find((s) => s.id === row.id);
    return { ...base, ...row, image: row.image_id ? imageUrl(row.image_id) : base.image };
  });
});

export const getVideos = cache(async () => {
  if (!hasDb()) return [];
  const { rows } = await query("SELECT id, name, service, quote, url FROM videos ORDER BY created_at DESC");
  return rows;
});

export const getApprovedReviews = cache(async () => {
  if (!hasDb()) return [];
  const { rows } = await query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
  return rows.map((r) => ({
    id: r.id,
    name: r.name.split(/\s+/)[0], // The review form promises only the first name is shown.
    service: r.service,
    stars: r.stars,
    title: r.title,
    text: r.text,
    loc: r.loc,
    date: r.move_month ? `${r.move_month}-01` : r.created_at.toISOString().slice(0, 10),
  }));
});
