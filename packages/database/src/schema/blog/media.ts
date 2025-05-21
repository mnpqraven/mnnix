import { pgTable, varchar } from "drizzle-orm/pg-core";
import { blogs } from "./blog";

export const medias = pgTable("medias", {
  tempBlogId: varchar({ length: 255 }).primaryKey(),
  fileName: varchar({ length: 255 }).notNull(),
  mediaUrl: varchar({ length: 255 }).notNull(),
  blogId: varchar({ length: 255 }).references(() => blogs.id, {
    onDelete: "cascade",
  }),
});
