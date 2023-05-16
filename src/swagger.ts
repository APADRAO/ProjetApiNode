import  swaggerUi  from 'swagger-ui-express';
import * as path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import {Express, Request, Response} from 'express';



const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for your API',
      },  
    component:{
      securitySchemas: {
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

  function swaggerDocs(app: Express){
    //swagger page
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs)); 

    //doc JsonFormat
    /*app.get('docs.json', (req:Request, res:Response)=>{
        res.setHeader('Content-Type', 'aplication/json');
        res.send(specs);
    });*/
    
  }

  export default swaggerDocs;