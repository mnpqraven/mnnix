import { databaseEnv as env } from "@repo/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "src/schema/*",
  out: "src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
    database: "mydatabase",
  },
  verbose: true,
} satisfies Config;
