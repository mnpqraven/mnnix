import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { blogs } from "./blog";
import { tags } from "./tag";

export const blogsAndTags = pgTable("blogTagMapping", {
  blogId: varchar({ length: 255 })
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  tagCode: varchar({ length: 255 })
    .notNull()
    .references(() => tags.code, {
      onDelete: "cascade",
    }),
});

export const blogsRelations = relations(blogs, ({ many }) => ({
  blogsAndTags: many(blogsAndTags, {
    relationName: "blogRelation",
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  blogs: many(blogsAndTags, {
    relationName: "tagRelation",
  }),
}));

export const blogsAndTagsRelations = relations(blogsAndTags, ({ one }) => ({
  blog: one(blogs, {
    fields: [blogsAndTags.blogId],
    references: [blogs.id],
    relationName: "blogRelation",
  }),
  tag: one(tags, {
    fields: [blogsAndTags.tagCode],
    references: [tags.code],
    relationName: "tagRelation",
  }),
}));
