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
      description: "Documentazione delle API con Swagger e express",
    },
    servers: [
      {
        url: "http://localhost:7001/api",
        description: "Server locale",
      },
    ],
  },
  apis: ["./routes/*.js"], // Specifica dove si trovano i file delle API
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);