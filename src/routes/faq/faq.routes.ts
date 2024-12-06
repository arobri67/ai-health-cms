import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { insertFaqModel, patchFaqModel, selectFaqModel } from "@/db/schemas/faq";
import { MongoIdParamsSchema, notFoundSchema } from "@/lib/constants";

const tags = ["faq"];

export const list = createRoute({
  path: "/faq",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectFaqModel),
      "The list of faq",
    ),
  },
});

export const create = createRoute({
  path: "/faq",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertFaqModel,
      "The faq to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectFaqModel,
      "The created of faq ",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertFaqModel), "The validation errors"),
  },
});

export const patch = createRoute({
  path: "/faq/{id}",
  method: "patch",
  request: {
    params: MongoIdParamsSchema,
    body: jsonContentRequired(
      patchFaqModel,
      "The faq updates",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectFaqModel,
      "The updated faq ",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Faq not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(patchFaqModel),
        createErrorSchema(MongoIdParamsSchema),
      ],
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/faq/{id}",
  method: "delete",
  request: {
    params: MongoIdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "The faq was deleted successfully",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Faq not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(MongoIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
