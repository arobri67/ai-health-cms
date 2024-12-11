import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { insertCompaniesModel, patchCompaniesModel, selectCompaniesModel } from "@/db/schemas";
import { MongoIdParamsSchema, notFoundSchema } from "@/lib/constants";

const tags = ["companies"];

export const list = createRoute({
  path: "/companies",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCompaniesModel),
      "The list of companies",
    ),
  },
});

export const getOne = createRoute({
  path: "/company/{id}",
  method: "get",
  request: {
    params: MongoIdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCompaniesModel,
      "The selected company",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Company not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(MongoIdParamsSchema), "Invalid id error"),
  },
});

export const create = createRoute({
  path: "/company",
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
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertCompaniesModel), "The validation errors"),
  },
});

export const createMany = createRoute({
  path: "/companies",
  method: "post",
  request: {
    body: jsonContentRequired(
      z.array(insertCompaniesModel),
      "Companies to create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectCompaniesModel),
      "The created  companies ",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(z.array(insertCompaniesModel)), "The validation errors"),
  },
});

export const patch = createRoute({
  path: "/company/{id}",
  method: "patch",
  request: {
    params: MongoIdParamsSchema,
    body: jsonContentRequired(
      patchCompaniesModel,
      "The company updates",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectCompaniesModel,
      "The updated company ",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Company not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [
        createErrorSchema(patchCompaniesModel),
        createErrorSchema(MongoIdParamsSchema),
      ],
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/company/{id}",
  method: "delete",
  request: {
    params: MongoIdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "The company was deleted successfully",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Company not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(MongoIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type CreateRoute = typeof create;
export type CreateManyRoute = typeof createMany;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
