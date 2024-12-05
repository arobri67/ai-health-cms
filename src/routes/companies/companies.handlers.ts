import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import Category from "@/db/models/category";
import Company from "@/db/models/company";

import type { CreateRoute } from "./companies.routes";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  await db();
  const companyData = c.req.valid("json");
  const newCompany = new Company(companyData);
  const savedCompany = await newCompany.save();
  for (const category of companyData.category) {
    await Category.findOneAndUpdate(
      { name: category },
      { $addToSet: { companies: newCompany._id } },
      { upsert: true },
    );
  }
  return c.json(savedCompany);
};
