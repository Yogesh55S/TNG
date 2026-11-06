import { revalidatePath } from "next/cache";
import { isEmail, sendFormEmail } from "@/lib/mailer";
import { allowRate, clientIp, hasDb, query } from "@/lib/db";

const REQUIRED = ["name", "phone", "email", "service", "col_address", "col_postcode", "del_address", "del_postcode", "date"];
const MAX_PHOTOS = 10;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request) {
  try {
    const form = await request.formData();
    const get = (key) => String(form.get(key) || "").trim();

    // Hidden field that only bots fill in: accept silently, keep nothing.
    if (get("website")) return Response.json({ success: true });

    if (REQUIRED.some((key) => !get(key)) || !isEmail(get("email"))) {
      return Response.json({ success: false, error: "Please complete all required fields." }, { status: 400 });
    }
    if (!(await allowRate(`quote:${clientIp(request.headers)}`, 10, 3600))) {
      return Response.json({ success: false, error: "Too many requests. Please call us instead." }, { status: 429 });
    }

    const photos = await Promise.all(
      form
        .getAll("photos")
        .filter((f) => typeof f !== "string" && PHOTO_TYPES.includes(f.type) && f.size <= MAX_PHOTO_BYTES)
        .slice(0, MAX_PHOTOS)
        .map(async (file) => ({ mime: file.type, data: Buffer.from(await file.arrayBuffer()) }))
    );

    const rows = [
      ["Name", get("name")],
      ["Phone", get("phone")],
      ["Email", get("email")],
      ["Contact by", get("contact_method")],
      ["Service", get("service")],
      ["Collection", `${get("col_address")}, ${get("col_postcode")}`],
      ["Collection details", [get("col_type"), `Floor: ${get("col_floor")}`, `Lift: ${get("col_lift")}`, get("col_parking"), get("col_access")].filter(Boolean).join(" | ")],
      ["Delivery", `${get("del_address")}, ${get("del_postcode")}`],
      ["Delivery details", [get("del_type"), `Floor: ${get("del_floor")}`, `Lift: ${get("del_lift")}`, get("del_parking"), get("del_access")].filter(Boolean).join(" | ")],
      ["Moving date", get("date")],
      ["Time", get("time")],
      ["Flexible", get("flexible")],
      ["Alternative date", get("alt_date")],
      ["Items", get("items")],
      ["Boxes/bags", get("boxes")],
      ["Special items", form.getAll("special").join(", ")],
      ["Special handling", get("special_notes")],
      ["Extras", form.getAll("extras").join(", ")],
      ["Other requirements", get("extras_other")],
      ["Additional info", get("info")],
    ];

    // The request counts as received if it reached the database or the inbox.
    let saved = false;
    if (hasDb()) {
      try {
        const { rows: inserted } = await query(
          "INSERT INTO quotes (name, phone, email, service, details) VALUES ($1,$2,$3,$4,$5) RETURNING id",
          [get("name"), get("phone"), get("email"), get("service"), JSON.stringify(rows)]
        );
        for (const photo of photos) {
          await query("INSERT INTO quote_photos (quote_id, mime, data) VALUES ($1,$2,$3)", [inserted[0].id, photo.mime, photo.data]);
        }
        saved = true;
        revalidatePath("/admin", "layout");
      } catch (error) {
        console.error("Quote save error:", error);
      }
    }

    try {
      await sendFormEmail({
        subject: `New quote request: ${get("name")} (${get("service")})`,
        replyTo: get("email"),
        rows,
        attachments: photos.map((p, i) => ({ filename: `photo-${i + 1}.jpg`, content: p.data, contentType: p.mime })),
      });
    } catch (error) {
      console.error("Quote email error:", error);
      if (!saved) throw error;
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return Response.json({ success: false, error: "Could not send your request." }, { status: 500 });
  }
}
