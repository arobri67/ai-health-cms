import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { insertCategoriesModel, selectCategoriesModel } from "@/db/schemas";

const tags = ["categories"];

export const list = createRoute({
  path: "/categories",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCategoriesModel),
      "The list of categories",
    ),
  },
});

export const create = createRoute({
  path: "/category",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertCategoriesModel,
      "The category to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCategoriesModel,
      "The created of category ",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertCategoriesModel), "The validation errors"),
  },
});

export const createMany = createRoute({
  path: "/categories",
  method: "post",
  request: {
    body: jsonContentRequired(
      z.array(insertCategoriesModel),
      "Categories to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCategoriesModel),
      "The created categories ",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(z.array(insertCategoriesModel)), "The validation errors"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type CreateManyRoute = typeof createMany;
