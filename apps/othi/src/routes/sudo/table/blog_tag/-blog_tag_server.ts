import { db } from "@repo/database";
import { BlogTagSchemas, tags } from "@repo/database/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const blogTagById = createServerFn({ method: "GET" })
  .validator(BlogTagSchemas.select.pick("code"))
  .handler(async ({ data }) => {
    return db.query.tags.findFirst({
      where: ({ code }, op) => op.eq(code, data.code),
    });
  });

export const blogTagList = createServerFn({ method: "GET" }).handler(
  async () => {
    // TODO: params
    return db.query.tags.findMany();
  },
);

export const blogTagCreate = createServerFn({ method: "POST" })
  .validator(BlogTagSchemas.create)
  .handler(async ({ data }) => {
    try {
      await db.insert(tags).values(data);
    } catch (e) {
      // TODO: libsql handling

      console.log("from server");
      // if (e instanceof LibsqlError) {
      //   // TODO: own handler
      //   // SQLITE_CONSTRAINT
      //   console.log("inner", e);
      //   console.log("inner", e.code);
      //   console.log("inner", e.cause);
      // }
      throw e;
    }
  });

export const blogTagDelete = createServerFn({ method: "POST" })
  .validator(BlogTagSchemas.select.pick("id"))
  .handler(async ({ data }) => {
    await db.delete(tags).where(eq(tags.id, data.id));
  });

export const blogTagUpdate = createServerFn({ method: "POST" })
  // FIXME: id being optional is still valid here
  // should have required id
  .validator(BlogTagSchemas.update)
  .handler(async ({ data }) => {
    await db
      .update(tags)
      .set(data)
      .where(eq(tags.id, data.id ?? ""));
  });

export const blogTagCRUD = {
  list: blogTagList,
  create: blogTagCreate,
  update: blogTagUpdate,
  delete: blogTagDelete,
};
