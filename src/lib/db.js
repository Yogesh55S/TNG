import { Pool } from "pg";
import { services as defaultServices } from "@/data/services";

export const hasDb = () => Boolean(process.env.DATABASE_URL);

const SCHEMA = `
CREATE TABLE IF NOT EXISTS settings (key text PRIMARY KEY, value jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS images (id serial PRIMARY KEY, mime text NOT NULL, data bytea NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS services (id text PRIMARY KEY, sort int NOT NULL, title text NOT NULL, short text NOT NULL, body text NOT NULL, alt text NOT NULL, points jsonb NOT NULL, image_id int REFERENCES images(id) ON DELETE SET NULL);
CREATE TABLE IF NOT EXISTS quotes (id serial PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT now(), status text NOT NULL DEFAULT 'new', name text NOT NULL, phone text NOT NULL, email text NOT NULL, service text NOT NULL, details jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS quote_photos (id serial PRIMARY KEY, quote_id int NOT NULL REFERENCES quotes(id) ON DELETE CASCADE, mime text NOT NULL, data bytea NOT NULL);
CREATE TABLE IF NOT EXISTS reviews (id serial PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT now(), status text NOT NULL DEFAULT 'pending', stars int NOT NULL, name text NOT NULL, service text NOT NULL, title text NOT NULL, text text NOT NULL, loc text NOT NULL DEFAULT '', move_month text NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS videos (id serial PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT now(), name text NOT NULL, service text NOT NULL, quote text NOT NULL, url text NOT NULL);
CREATE TABLE IF NOT EXISTS rate_limits (key text PRIMARY KEY, count int NOT NULL, window_start timestamptz NOT NULL);
`;

const pool = () => {
  globalThis.__sunrizePool ||= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000, // Neon's free tier can take a few seconds to wake up.
  });
  return globalThis.__sunrizePool;
};

// Creates the tables and default services on first use, so setup only needs DATABASE_URL.
async function setup() {
  const client = await pool().connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(727001)"); // Parallel build workers wait their turn.
    await client.query(SCHEMA);
    for (const [i, s] of defaultServices.entries()) {
      await client.query(
        "INSERT INTO services (id, sort, title, short, body, alt, points) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING",
        [s.id, i, s.title, s.short, s.body, s.alt, JSON.stringify(s.points)]
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

export async function query(text, params) {
  globalThis.__sunrizeSetup ||= setup().catch((error) => {
    globalThis.__sunrizeSetup = null;
    throw error;
  });
  await globalThis.__sunrizeSetup;
  return pool().query(text, params);
}

// True while `key` has been used at most `max` times in the window. Never blocks if the database is down.
export async function allowRate(key, max, windowSeconds) {
  if (!hasDb()) return true;
  try {
    const expired = "rate_limits.window_start < now() - make_interval(secs => $2::double precision)";
    const { rows } = await query(
      `INSERT INTO rate_limits (key, count, window_start) VALUES ($1, 1, now())
       ON CONFLICT (key) DO UPDATE SET
         count = CASE WHEN ${expired} THEN 1 ELSE rate_limits.count + 1 END,
         window_start = CASE WHEN ${expired} THEN now() ELSE rate_limits.window_start END
       RETURNING count`,
      [key, windowSeconds]
    );
    return rows[0].count <= max;
  } catch {
    return true;
  }
}

export const clientIp = (headers) => (headers.get("x-forwarded-for") || "local").split(",")[0].trim();
