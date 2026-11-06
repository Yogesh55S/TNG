import { hasDb, query } from "@/lib/db";

// Public images uploaded in the admin panel. A replaced image gets a new id, so caching forever is safe.
export async function GET(_request, { params }) {
  if (!hasDb() || !/^\d{1,9}$/.test(params.id)) return new Response("Not found", { status: 404 });
  const { rows } = await query("SELECT mime, data FROM images WHERE id = $1", [params.id]);
  if (!rows[0]) return new Response("Not found", { status: 404 });
  return new Response(rows[0].data, {
    headers: {
      "Content-Type": rows[0].mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
