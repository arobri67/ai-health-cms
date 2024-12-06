import { createRouter } from "@/lib/create-app";

import * as handlers from "./faq.handlers";
import * as routes from "./faq.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
