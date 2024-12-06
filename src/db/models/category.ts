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

export { Category };
