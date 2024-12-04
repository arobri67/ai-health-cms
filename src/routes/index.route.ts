import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";

const router = createRouter().openapi(
  createRoute({
    tags: ["index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema("AI Health CMS"), "AI Health CMS"),
    },
  }),
  (c) => {
    return c.json({ message: "AI Health CMS index" }, HttpStatusCodes.OK);
  },
);

export default router;
