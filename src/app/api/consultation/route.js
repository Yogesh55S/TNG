import nodemailer from "nodemailer";
import { google } from "googleapis";

// ── Nodemailer transporter ──────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ── Google Sheets client ────────────────────────────────────
async function getSheetClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// ── POST /api/consultation ──────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, service, preferredDate, message } = body;

    // Basic validation
    if (!name || !email || !phone) {
      return Response.json(
        { success: false, error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // ── 1. Send Email Notification ────────────────────────
    const transporter = createTransporter();

    const mailOptions = {
      from: `"TNG Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📅 New Consultation Booking — ${name} (${country || "Country N/A"})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%); padding: 28px 32px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">📅 New Consultation Booking</h2>
            <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 14px;">Received on ${timestamp}</p>
          </div>
          <div style="padding: 28px 32px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b; width: 140px;">Full Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Target Country</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${country || "—"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Service Type</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${service || "—"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Preferred Date</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${preferredDate || "Not specified"}</td></tr>
              <tr><td style="padding: 10px 0; font-size: 13px; color: #64748b; vertical-align: top; padding-top: 14px;">Message</td><td style="padding: 10px 0; font-size: 14px; color: #1e293b; padding-top: 14px; white-space: pre-wrap;">${message || "—"}</td></tr>
            </table>
          </div>
          <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">This notification was sent automatically by the TNG website consultation form.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // ── 2. Append to Google Sheets ────────────────────────
    try {
      const sheets = await getSheetClient();
      const sheetName = process.env.CONSULTATION_SHEET_NAME || "Sheet1";

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.CONSULTATION_GOOGLE_SHEET_ID,
        range: `${sheetName}!A:H`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              timestamp,
              name,
              email,
              phone,
              country || "",
              service || "",
              preferredDate || "",
              message || "",
            ],
          ],
        },
      });
    } catch (sheetErr) {
      // Log sheet error but don't fail the whole request
      console.error("Google Sheets error:", sheetErr.message);
    }

    return Response.json({ success: true, message: "Consultation request submitted!" });
  } catch (error) {
    console.error("Consultation API error:", error);
    return Response.json(
      { success: false, error: "Failed to submit request. Please try again." },
      { status: 500 }
    );
  }
}
