import type { Type } from "arktype";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-arktype";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const tags = pgTable("blog_tag", {
  id: varchar({ length: 255 }).primaryKey().$defaultFn(ulid),
  code: varchar({ length: 255 }).unique().notNull(),
  label: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

const lenReq = (t: Type<string>) =>
  t.pipe(t, t.atLeastLength(4).atMostLength(256));
const refinements = {
  code: lenReq,
  label: lenReq,
};
export const BlogTagSchemas = {
  // TODO: snippets
  create: createInsertSchema(tags, refinements),
  update: createUpdateSchema(tags, refinements),
  select: createSelectSchema(tags),
};

export type BlogTag = typeof tags.$inferSelect;
