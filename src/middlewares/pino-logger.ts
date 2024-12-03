import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import env from "@/env";

export function pinoLog() {
  return pinoLogger({
    pino: pino(
      {
        // define log level
        level: env.LOG_LEVEL || "info",
      },
      env.NODE_ENV === "production" ? undefined : pretty(),
    ),
    // make request with unique Ids
    http: { reqId: () => crypto.randomUUID() },
  });
}
