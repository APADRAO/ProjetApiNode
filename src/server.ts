import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import jwt from "jsonwebtoken";
import * as path from 'path';

const port = 3333;
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
  component:{
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security:[
    {
      bearerAuth:[]
    }
  ]
},
  apis: [path.join(__dirname, './**/*.ts')], // Caminho para seus arquivos com as anotações JSDoc
  
};

const specs = swaggerJsdoc(options);
 //swagger page
 app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs)); 

 //doc JsonFormat
    /*app.get('docs.json', (req:Request, res:Response)=>{
        res.setHeader('Content-Type', 'aplication/json');
        res.send(specs);
    });*/

AppDataSource.initialize().then(async () => [
  console.log("DataBase : OK"),
  app.listen(port, () => {
    
    console.log(`API inicializada em: http://localhost:${port}/swagger`);
  })
]);
