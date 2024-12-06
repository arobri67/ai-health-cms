import { z } from "zod";

// Insert faq model for validation
const insertFaqModel = z.object({
  order: z.string(),
  question: z.string(),
  answer: z.string(),
});

// Select faq model for validation
const selectFaqModel = insertFaqModel.extend({
  _id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Patch faq model for validation
const patchFaqModel = insertFaqModel.partial();

export { insertFaqModel, patchFaqModel, selectFaqModel };
