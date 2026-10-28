import "server-only";

import { neon } from "@neondatabase/serverless";

/** The stats database (Neon). Returns null when DATABASE_URL isn't set, e.g. locally. */
export function db() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}
