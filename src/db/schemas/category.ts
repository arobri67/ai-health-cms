import { z } from "zod";

const insertCategoryModel = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  companies: z.array(z.string()),
});
const selectCategoryModel = insertCategoryModel.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export { insertCategoryModel, selectCategoryModel };
