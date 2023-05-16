import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger.json'

const port = 3333;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson)); 
app.use(routers);
AppDataSource.initialize().then(async () => [
  console.log("DataBase : OK"),
  app.listen(port, () => {
  console.log(`API inicializada em: http://localhost:${port}/swagger`);
  })
]);
