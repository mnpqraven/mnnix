import { env as envCaller } from "@repo/env-agnostic";

export const env = envCaller("VITE_");
