import { createEnv } from "@t3-oss/env-core";
import { databaseEnv } from "./database";
import { hostsEnv } from "./hosts";

export const env = (clientPrefix: "VITE_" | "NEXT_PUBLIC_") =>
  createEnv({
    server: {},
    client: {},
    clientPrefix,
    // NOTE: vite uses import.meta.env
    // but we're still using process.env because we loaded the envs with dotenv
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
    extends: [hostsEnv(clientPrefix)],
  });

export { hostsEnv, databaseEnv };
