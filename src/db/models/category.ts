import type { Document, Model } from "mongoose";

import mongoose, { Schema } from "mongoose";
import { z } from "zod";

import type { ICompany } from "./company";

export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  description: string;
  companies: mongoose.Types.ObjectId[] | ICompany[];
  updatedAt: Date;
  createdAt: Date;
}

export interface ICategoryPopulated extends Omit<ICategory, "companies"> {
  companies: ICompany[];
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
  },
  { timestamps: true, collection: "Category" },
);

const Category: Model<ICategory>
  = mongoose.models.Category
  || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;

export const insertCategoryModel = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  companies: z.array(z.string()),
});
export const selectCategoryModel = insertCategoryModel.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
