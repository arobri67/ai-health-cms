import { createRouter } from "@/lib/create-app";

import * as handlers from "./companies.handlers";
import * as routes from "./companies.routes";

const router = createRouter()
  .openapi(routes.create, handlers.create);

export default router;
