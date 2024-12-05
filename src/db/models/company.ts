import type { Document, Model } from "mongoose";

import mongoose, { Schema } from "mongoose";
import { z } from "zod";

export interface ICompany extends Document {
  _id: string;
  featured: boolean;
  name: string;
  slug: string;
  category: string[];
  image: {
    name: string;
    key: string;
  };
  companyDescription: {
    briefDescription: string;
    longerDescription: string;
    overview: {
      foundingYear: number;
      headquarters: string;
    };
    keyOfferings: string[];
  };
  contactInformation: {
    websiteLink: string;
    socialMediaLinks: {
      linkedin?: string;
      twitter?: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema for the Listing model
const CompanySchema: Schema = new Schema(
  {
    featured: { type: Boolean, required: true, default: false },
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: [String],
      required: true,
      enum: [
        "Administration & Operations",
        "Research & Development",
        "Clinical Applications",
      ],
    },
    image: { type: Object, required: true },
    companyDescription: { type: Object, required: true },
    contactInformation: { type: Object, required: true },
  },
  { timestamps: true, collection: "Company" },
);

// Create and export the Company model
const Company: Model<ICompany>
  = mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);
export default Company;

// Insert company model for validation
export const insertCompaniesModel = z.object({
  featured: z.boolean().default(false),
  name: z.string(),
  slug: z.string(),
  category: z.array(z.string()),
  image: z.object({
    name: z.string(),
    key: z.string(),
  }),
  companyDescription: z.object({
    briefDescription: z.string(),
    longerDescription: z.string(),
    overview: z.object({
      foundingYear: z.number(),
      headquarters: z.string(),
    }),
    keyOfferings: z.array(z.string()),
  }),
  contactInformation: z.object({
    websiteLink: z.string(),
    socialMediaLinks: z.object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    }),
  }),
});

// Select company model for validation
export const selectCompaniesModel = insertCompaniesModel.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
