import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-arktype";
import type { PgTable } from "drizzle-orm/pg-core";

export function crudSchema<T extends PgTable>(table: T) {
  return {
    create: createInsertSchema(table),
    update: createUpdateSchema(table),
    select: createSelectSchema(table),
  };
}
