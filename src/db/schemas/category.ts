import { z } from "zod";

const insertCategoriesModel = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  companies: z.array(z.string()),
});
const selectCategoriesModel = insertCategoriesModel.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export { insertCategoriesModel, selectCategoriesModel };
