import { sendFormEmail } from "@/lib/mailer";
import { allowRate, clientIp, hasDb, query } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const get = (key) => String(body[key] || "").trim();

    if (get("website")) return Response.json({ success: true });

    const stars = Number(body.stars);
    const month = /^\d{4}-\d{2}$/.test(get("when")) ? get("when") : "";
    if (![1, 2, 3, 4, 5].includes(stars) || !get("name") || !get("service") || !get("title") || get("text").length < 20) {
      return Response.json({ success: false, error: "Please complete all required fields." }, { status: 400 });
    }
    if (!(await allowRate(`review:${clientIp(request.headers)}`, 5, 3600))) {
      return Response.json({ success: false, error: "Too many reviews. Please try again later." }, { status: 429 });
    }

    // Stored as pending: nothing appears on the site until it is accepted in the admin panel.
    let saved = false;
    if (hasDb()) {
      try {
        await query(
          "INSERT INTO reviews (stars, name, service, title, text, loc, move_month) VALUES ($1,$2,$3,$4,$5,$6,$7)",
          [stars, get("name").slice(0, 80), get("service").slice(0, 80), get("title").slice(0, 80), get("text").slice(0, 3000), get("loc").slice(0, 80), month]
        );
        saved = true;
      } catch (error) {
        console.error("Review save error:", error);
      }
    }

    try {
      await sendFormEmail({
        subject: `New review to check: ${stars} stars from ${get("name")}`,
        rows: [
          ["Rating", `${stars} / 5`],
          ["Name", get("name")],
          ["Service", get("service")],
          ["Location", get("loc")],
          ["Date of move", month],
          ["Title", get("title")],
          ["Review", get("text")],
        ],
      });
    } catch (error) {
      console.error("Review email error:", error);
      if (!saved) throw error;
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Review API error:", error);
    return Response.json({ success: false, error: "Could not send your review." }, { status: 500 });
  }
}
