import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { Category, Company } from "@/db/models";

import type { CreateManyRoute, CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from "./companies.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  await db();
  const companies = await Company.find({});

  return c.json(companies);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  await db();
  const { id } = c.req.valid("param");
  const company = await Company.findById(id);

  if (!company) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(company, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  await db();
  const companyData = c.req.valid("json");
  const newCompany = new Company(companyData);
  const savedCompany = await newCompany.save();
  for (const category of companyData.category) {
    await Category.findOneAndUpdate(
      { name: category },
      // $addToSet is a MongoDB operator
      { $addToSet: { companies: newCompany._id } },
      { upsert: true },
    );
  }

  return c.json(savedCompany, HttpStatusCodes.OK);
};

export const createMany: AppRouteHandler<CreateManyRoute> = async (c) => {
  await db();
  const companyData = c.req.valid("json");
  const newCompanies = await Company.insertMany(companyData);
  for (const company of newCompanies) {
    for (const category of company.category) {
      await Category.findOneAndUpdate({ name: category }, { $addToSet: { companies: company._id } }, { upsert: true });
    }
  }
  return c.json(newCompanies, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  await db();
  const { id } = c.req.valid("param");
  const companyData = c.req.valid("json");
  const updatedCompany = await Company.findByIdAndUpdate(id, companyData, { new: true });

  if (!updatedCompany) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(updatedCompany, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  await db();
  const { id } = c.req.valid("param");
  const deletedCompany = await Company.findByIdAndDelete(id);
  if (deletedCompany) {
    for (const category of deletedCompany.category) {
      await Category.findOneAndUpdate(
        { name: category },
        // $pull is a MongoDB operator
        { $pull: { companies: deletedCompany._id } },
      );
    }
  }
  if (!deletedCompany) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
