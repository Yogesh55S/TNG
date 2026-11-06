import { hasDb, query } from "@/lib/db";

// Customer quote photos. Middleware only lets signed-in admins reach this path.
export async function GET(_request, { params }) {
  if (!hasDb() || !/^\d{1,9}$/.test(params.id)) return new Response("Not found", { status: 404 });
  const { rows } = await query("SELECT mime, data FROM quote_photos WHERE id = $1", [params.id]);
  if (!rows[0]) return new Response("Not found", { status: 404 });
  return new Response(rows[0].data, {
    headers: {
      "Content-Type": rows[0].mime,
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
