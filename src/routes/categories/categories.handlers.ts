import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { Category } from "@/db/models";

import type { CreateManyRoute, CreateRoute, ListRoute } from "./categories.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  await db();
  const categories = await Category.find({});

  return c.json(categories);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  await db();
  const cateogryData = c.req.valid("json");
  const newCategory = new Category(cateogryData);
  const savedCategory = await newCategory.save();
  return c.json(savedCategory);
};

export const createMany: AppRouteHandler<CreateManyRoute> = async (c) => {
  await db();
  const categoryData = c.req.valid("json");
  const newCategories = await Category.insertMany(categoryData);
  return c.json(newCategories, HttpStatusCodes.OK);
};
