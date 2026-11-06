// Admin session helpers. Uses Web Crypto only, so this also runs in middleware.
export const SESSION_COOKIE = "sunrize_admin";
export const SESSION_SECONDS = 7 * 24 * 60 * 60;

const encoder = new TextEncoder();
const toHex = (buffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
const sha256 = (text) => crypto.subtle.digest("SHA-256", encoder.encode(text));

// The signing key comes from the credentials, so changing the password signs everyone out.
async function signingKey() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return null;
  const raw = await sha256(`sunrize-admin-session:${ADMIN_EMAIL}:${ADMIN_PASSWORD}`);
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createSession() {
  const key = await signingKey();
  if (!key) return null;
  const expires = String(Date.now() + SESSION_SECONDS * 1000);
  return `${expires}.${toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(expires)))}`;
}

export async function verifySession(token) {
  const key = await signingKey();
  const [expires, signature] = String(token || "").split(".");
  if (!key || !expires || !/^[0-9a-f]{64}$/.test(signature || "") || Number(expires) < Date.now()) return false;
  const bytes = Uint8Array.from(signature.match(/../g), (h) => parseInt(h, 16));
  return crypto.subtle.verify("HMAC", key, bytes, encoder.encode(expires));
}

// Compares hashes so the check takes the same time wherever the inputs differ.
export async function checkCredentials(email, password) {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  const given = toHex(await sha256(`${String(email).trim().toLowerCase()}\n${password}`));
  const expected = toHex(await sha256(`${ADMIN_EMAIL.trim().toLowerCase()}\n${ADMIN_PASSWORD}`));
  let difference = 0;
  for (let i = 0; i < expected.length; i++) difference |= given.charCodeAt(i) ^ expected.charCodeAt(i);
  return difference === 0;
}
