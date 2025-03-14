import swaggerJSDoc from "swagger-jsdoc";
import express from "express";
import swaggerUi from "swagger-ui-express";


const app = express();

// Configurazione di Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Memo API",
      version: "1.0.0",
      description: "Documentazione delle API con Swagger e Express",
    },
    servers: [
      {
        url: "http://127.0.0.1:3000",
        description: "Server locale",
      },
    ], 
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);