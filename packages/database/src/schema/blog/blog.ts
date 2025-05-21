import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";
import { crudSchema } from "../../../src/utils";

export const blogs = pgTable("blogs", {
  id: varchar({ length: 255 }).primaryKey().$defaultFn(ulid),
  title: varchar({ length: 255 }).notNull(),
  fileName: varchar({ length: 255 }).notNull(),
  fileKey: varchar({ length: 255 }).notNull(),
  publish: boolean().default(false),
  mdUrl: varchar().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

// TODO: refinements
export const BlogSchemas = crudSchema(blogs);

export type Blog = typeof blogs.$inferSelect;
export type BlogInsert = typeof blogs.$inferInsert;
