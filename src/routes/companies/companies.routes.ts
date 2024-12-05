import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { insertCompaniesModel, selectCompaniesModel } from "../../db/models/company";

const tags = ["companies"];

export const create = createRoute({
  path: "/companies",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertCompaniesModel,
      "The company to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCompaniesModel,
      "The created of company ",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(z.object({}), "The validation errors"),
  },
});

export type CreateRoute = typeof create;
