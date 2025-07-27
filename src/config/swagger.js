import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const swaggerDocument = YAML.load(path.resolve("./apiSwagger.yaml"));

export default {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocument),
};
