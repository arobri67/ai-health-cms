import type { Model } from "mongoose";

import mongoose, { Schema } from "mongoose";

export interface IFaq extends Document {
  _id: string;
  order: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FaqSchema: Schema = new Schema(
  {
    order: {
      type: String,
      enum: ["item-1", "item-2", "item-3", "item-4", "item-5", "item-6"],
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true, collection: "Faq" },
);

const Faq: Model<IFaq>
  = mongoose.models.Faq || mongoose.model<IFaq>("Faq", FaqSchema);

export default Faq;
