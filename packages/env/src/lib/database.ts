import { createEnv } from "@t3-oss/env-core";
import { type } from "arktype";

export const databaseEnv = createEnv({
  server: {
    DB_URL: type("string"),
    UPLOADTHING_TOKEN: type("string"),
  },
  client: {},
  clientPrefix: "",
  runtimeEnv: process.env,
});
