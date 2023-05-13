import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerFile from './swagger.json';
import * as path from 'path';

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
    },
    apis: [path.join(__dirname, './**/*.ts')], // Caminho para seus arquivos com as anotações JSDoc
  };

  const specs = swaggerJsdoc(options);
// Configurar a rota para a documentação do Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
AppDataSource.initialize().then(async ()=>[
    console.log("DataBase : OK"),
    app.listen(3333,()=>{
        console.log("API inicializada em porta 3333");
    })
])