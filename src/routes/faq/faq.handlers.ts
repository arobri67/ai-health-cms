import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { Faq } from "@/db/models";

import type { CreateRoute, ListRoute, PatchRoute, RemoveRoute } from "./faq.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  await db();
  const faq = await Faq.find({});

  return c.json(faq);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  await db();
  const faqData = c.req.valid("json");
  const newFaq = new Faq(faqData);
  const savedFaq = await newFaq.save();

  return c.json(savedFaq, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  await db();
  const { id } = c.req.valid("param");
  const faqData = c.req.valid("json");
  const updatedFaq = await Faq.findByIdAndUpdate(id, faqData, { new: true });

  if (!updatedFaq) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(updatedFaq, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  await db();
  const { id } = c.req.valid("param");
  const deletedFaq = await Faq.findByIdAndDelete(id);

  if (!deletedFaq) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
