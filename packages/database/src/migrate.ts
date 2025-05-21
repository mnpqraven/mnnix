import { databaseEnv as env } from "@repo/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const db = drizzle({
  connection: {
    connectionString: env.DB_URL,
  },
});

console.log("migrating db...");

try {
  void migrate(db, { migrationsFolder: "drizzle" });

  console.log("migration completed");
} catch (e) {
  console.error(e);
}
