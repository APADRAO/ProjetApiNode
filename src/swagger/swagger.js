
const path =require('path');
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = [path.join(__dirname, './**/*.ts')];

swaggerAutogen(outputFile, endpointsFiles);