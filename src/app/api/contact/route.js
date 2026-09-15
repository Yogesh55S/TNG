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

// ── POST /api/contact ───────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Name, email, and message are required." },
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
      subject: `📩 New Contact Form Submission — ${subject || "No Subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%); padding: 28px 32px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">📩 New Contact Form Submission</h2>
            <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 14px;">Received on ${timestamp}</p>
          </div>
          <div style="padding: 28px 32px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b; width: 120px;">Full Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${phone || "Not provided"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b;">Subject</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${subject || "—"}</td></tr>
              <tr><td style="padding: 10px 0; font-size: 13px; color: #64748b; vertical-align: top; padding-top: 14px;">Message</td><td style="padding: 10px 0; font-size: 14px; color: #1e293b; padding-top: 14px; white-space: pre-wrap;">${message}</td></tr>
            </table>
          </div>
          <div style="background: #f8fafc; padding: 16px 32px; text-align: center;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">This notification was sent automatically by the TNG website contact form.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // ── 2. Append to Google Sheets ────────────────────────
    try {
      const sheets = await getSheetClient();
      const sheetName = process.env.CONTACT_SHEET_NAME || "Sheet1";

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.CONTACT_GOOGLE_SHEET_ID,
        range: `${sheetName}!A:F`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[timestamp, name, email, phone || "", subject || "", message]],
        },
      });
    } catch (sheetErr) {
      // Log sheet error but don't fail the whole request
      console.error("Google Sheets error:", sheetErr.message);
    }

    return Response.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
