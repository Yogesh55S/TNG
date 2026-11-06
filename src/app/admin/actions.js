"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { checkCredentials, createSession, SESSION_COOKIE, SESSION_SECONDS, verifySession } from "@/lib/auth";
import { allowRate, clientIp, query } from "@/lib/db";
import { getPages } from "@/lib/content";
import { isEmail } from "@/lib/mailer";
import { parseVideo } from "@/lib/video";
import { defaultPages } from "@/data/site";
import { QUOTE_STATUSES, REVIEW_STATUSES } from "@/data/admin";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const text = (form, key, max = 500) => String(form.get(key) || "").trim().slice(0, max);
const intOf = (value) => (/^\d{1,9}$/.test(String(value)) ? Number(value) : null);
const refreshSite = () => revalidatePath("/", "layout");

async function requireAdmin() {
  if (!(await verifySession(cookies().get(SESSION_COOKIE)?.value))) redirect("/admin/login");
}

const saveSetting = (key, value) =>
  query("INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2", [key, JSON.stringify(value)]);

// ---- Session ----

export async function login(form) {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) redirect("/admin/login?error=setup");
  if (!(await allowRate(`login:${clientIp(headers())}`, 10, 900))) redirect("/admin/login?error=locked");
  if (!(await checkCredentials(form.get("email"), String(form.get("password") || "")))) redirect("/admin/login?error=invalid");
  cookies().set(SESSION_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  cookies().set(SESSION_COOKIE, "", { path: "/admin", maxAge: 0 });
  redirect("/admin/login");
}

// ---- Quotes ----

export async function setQuoteStatus(form) {
  await requireAdmin();
  const id = intOf(form.get("id"));
  const status = String(form.get("status"));
  if (id && QUOTE_STATUSES.some((s) => s.value === status)) {
    await query("UPDATE quotes SET status = $1 WHERE id = $2", [status, id]);
  }
  revalidatePath("/admin", "layout");
  redirect(`/admin/quotes/${id}?saved=1`);
}

export async function deleteQuote(form) {
  await requireAdmin();
  const id = intOf(form.get("id"));
  if (id) await query("DELETE FROM quotes WHERE id = $1", [id]);
  revalidatePath("/admin", "layout");
  redirect("/admin/quotes?saved=1");
}

// ---- Reviews ----

export async function setReviewStatus(form) {
  await requireAdmin();
  const id = intOf(form.get("id"));
  const status = String(form.get("status"));
  if (id && REVIEW_STATUSES.some((s) => s.value === status)) {
    await query("UPDATE reviews SET status = $1 WHERE id = $2", [status, id]);
  }
  refreshSite();
  const tab = REVIEW_STATUSES.some((s) => s.value === form.get("tab")) ? form.get("tab") : "pending";
  redirect(`/admin/reviews?status=${tab}&saved=1`);
}

export async function deleteReview(form) {
  await requireAdmin();
  const id = intOf(form.get("id"));
  if (id) await query("DELETE FROM reviews WHERE id = $1", [id]);
  refreshSite();
  const tab = REVIEW_STATUSES.some((s) => s.value === form.get("tab")) ? form.get("tab") : "pending";
  redirect(`/admin/reviews?status=${tab}&saved=1`);
}

// ---- Images ----

// Called from the image picker. Returns the new image id, or an error to show.
export async function uploadImage(form) {
  await requireAdmin();
  const file = form.get("image");
  if (!file || typeof file === "string" || !IMAGE_TYPES.includes(file.type)) return { error: "Please choose a JPG, PNG or WebP image." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "That image is too large. The limit is 5 MB." };
  const { rows } = await query("INSERT INTO images (mime, data) VALUES ($1, $2) RETURNING id", [
    file.type,
    Buffer.from(await file.arrayBuffer()),
  ]);
  return { id: rows[0].id };
}

const deleteImage = async (id) => {
  if (id) await query("DELETE FROM images WHERE id = $1", [id]);
};

// ---- Services ----

export async function saveService(form) {
  await requireAdmin();
  const id = text(form, "id", 40);
  const [title, short, body, alt] = [text(form, "title", 120), text(form, "short", 300), text(form, "body", 2000), text(form, "alt", 200)];
  const points = String(form.get("points") || "").split("\n").map((p) => p.trim().slice(0, 120)).filter(Boolean).slice(0, 12);
  const imageId = intOf(form.get("image_id"));
  if (!title || !short || !body) redirect(`/admin/services/${id}?error=1`);

  const { rows } = await query("SELECT image_id FROM services WHERE id = $1", [id]);
  if (!rows[0]) redirect("/admin/services");
  await query("UPDATE services SET title=$1, short=$2, body=$3, alt=$4, points=$5, image_id=$6 WHERE id=$7", [
    title, short, body, alt || title, JSON.stringify(points), imageId, id,
  ]);
  if (rows[0].image_id !== imageId) await deleteImage(rows[0].image_id);
  refreshSite();
  redirect(`/admin/services/${id}?saved=1`);
}

// ---- Videos ----

export async function saveVideo(form) {
  await requireAdmin();
  const id = intOf(form.get("id"));
  const [name, service, quote, url] = [text(form, "name", 80), text(form, "service", 80), text(form, "quote", 300), text(form, "url", 500)];
  if (!parseVideo(url)) redirect("/admin/videos?error=url");
  if (!name || !quote) redirect("/admin/videos?error=fields");
  if (id) {
    await query("UPDATE videos SET name=$1, service=$2, quote=$3, url=$4 WHERE id=$5", [name, service, quote, url, id]);
  } else {
    await query("INSERT INTO videos (name, service, quote, url) VALUES ($1,$2,$3,$4)", [name, service, quote, url]);
  }
  refreshSite();
  redirect("/admin/videos?saved=1");
}

export async function deleteVideo(form) {
  await requireAdmin();
  const id = intOf(form.get("id"));
  if (id) await query("DELETE FROM videos WHERE id = $1", [id]);
  refreshSite();
  redirect("/admin/videos?saved=1");
}

// ---- Contact details and page text ----

export async function saveContact(form) {
  await requireAdmin();
  const digits = (key) => String(form.get(key) || "").replace(/\D/g, "").slice(0, 15);
  const value = {
    phone: text(form, "phone", 40),
    phoneDigits: digits("phoneDigits"),
    whatsappDigits: digits("whatsappDigits"),
    email: text(form, "email", 120),
    location: text(form, "location", 200),
  };
  if (!value.phone || value.phoneDigits.length < 8 || value.whatsappDigits.length < 8 || !isEmail(value.email)) {
    redirect("/admin/contact?error=1");
  }
  await saveSetting("contact", value);
  refreshSite();
  redirect("/admin/contact?saved=1");
}

export async function savePages(form) {
  await requireAdmin();
  const previous = await getPages();
  const value = {};
  for (const key of Object.keys(defaultPages)) {
    if (key !== "heroImageId") value[key] = text(form, key, 600) || defaultPages[key];
  }
  value.heroImageId = intOf(form.get("heroImageId"));
  await saveSetting("pages", value);
  if (previous.heroImageId !== value.heroImageId) await deleteImage(previous.heroImageId);
  refreshSite();
  redirect("/admin/pages?saved=1");
}

