import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import jwt from "jsonwebtoken";
import * as swaggerFile from './swagger.json';
import * as path from 'path';
import { authRouter } from "./authRouter";
import { authenticateJWT } from "./authMiddleware";


const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    }, 
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: [path.join(__dirname, './**/*.ts')], // Caminho para seus arquivos com as anotações JSDoc
};

const specs = swaggerJsdoc(options);
// Adicione o middleware do Swagger UI com as configurações



// Configurar a rota para a documentação do Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs)); // Aplicar o middleware de autenticação antes de exibir a documentação


AppDataSource.initialize().then(async () => [
  console.log("DataBase : OK"),
  app.listen(3333, () => {
    console.log("API inicializada em porta 3333");
  })
]);
