import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { insertCategoryModel, selectCategoryModel } from "@/db/schemas";

const tags = ["categories"];

export const create = createRoute({
  path: "/categories",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertCategoryModel,
      "The category to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCategoryModel,
      "The created of category ",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(z.object({}), "The validation errors"),
  },
});

export type CreateRoute = typeof create;
