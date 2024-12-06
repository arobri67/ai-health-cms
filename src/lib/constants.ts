import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { z } from "zod";

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND,
);

export const MongoIdParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-f]{24}$/i, "Invalid MongoDB ObjectId"),
});
