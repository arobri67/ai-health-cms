import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import categories from "@/routes/categories/categories.index";
import companies from "@/routes/companies/companies.index";
import faq from "@/routes/faq/faq.index";
import index from "@/routes/index.route";

const app = createApp();

const routes = [index, companies, categories, faq];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
