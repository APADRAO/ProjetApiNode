import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { authenticateJWT } from "./authMiddleware";

export const swaggerRouter = express.Router();

//const swaggerDocument = YAML.load("caminho-para-o-seu-arquivo-swagger.yaml");

swaggerRouter.use("/api-docs", authenticateJWT, swaggerUi.serve);
//swaggerRouter.get("/api-docs", authenticateJWT, swaggerUi.setup(swaggerDocument));
export { authenticateJWT };

