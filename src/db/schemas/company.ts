import { z } from "zod";

// Insert company model for validation
const insertCompaniesModel = z.object({
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
const selectCompaniesModel = insertCompaniesModel.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Patch company model for validation
const patchCompaniesModel = insertCompaniesModel.omit({ category: true }).partial();

export { insertCompaniesModel, patchCompaniesModel, selectCompaniesModel };
