import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { Category } from "@/db/models";

import type { CreateRoute } from "./categories.routes";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  await db();
  const cateogryData = c.req.valid("json");
  const newCategory = new Category(cateogryData);
  const savedCategory = await newCategory.save();
  return c.json(savedCategory);
};
