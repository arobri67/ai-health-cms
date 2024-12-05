import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenApi } from "./types";

import packageJSON from "../../package.json";

export default function configureOpenAPI(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "AI HEALTH CMS API",
    },
  });

  // adding this makes the api reference
  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    }),
  );
}
