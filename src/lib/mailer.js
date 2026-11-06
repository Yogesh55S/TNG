import nodemailer from "nodemailer";
import { getSite } from "@/lib/content";

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));

// Sends a site form submission to the business inbox as a simple label/value table.
export async function sendFormEmail({ subject, rows, replyTo, attachments }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be set");
  }
  const site = await getSite();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  const body = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#5b6778;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 0;color:#1c2433;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  await transporter.sendMail({
    from: `"${site.name} Website" <${process.env.EMAIL_USER}>`,
    to: site.email,
    replyTo,
    subject,
    html: `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${body}</table>`,
    attachments,
  });
}
