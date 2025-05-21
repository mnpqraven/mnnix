import { createEnv } from "@t3-oss/env-core";
import { type } from "arktype";

export const hostsEnv = (clientPrefix: "VITE_" | "NEXT_PUBLIC_") =>
  createEnv({
    server: {
      HOST_VPS_GRPC: type("string.url"),
      HOST_VPS_API: type("string.url"),
    },
    client: {},
    clientPrefix,
    runtimeEnv: process.env,
  });
