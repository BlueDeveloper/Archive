import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db";

export function db() {
  const { env } = getRequestContext();
  return getDb(env.DB);
}
