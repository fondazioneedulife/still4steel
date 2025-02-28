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
        url: "http://localhost:7002",
        description: "Server locale",
      },
    ],
  },
  apis: ["./routes/*.js"], // Specifica dove si trovano i file delle API
};

// Genera la documentazione
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Usa Swagger UI come middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(7002, () => {
  console.log("Server avviato su http://localhost:7002");
  console.log("Swagger UI disponibile su http://localhost:7002/api-docs");
});

export const swaggerSpec = swaggerJSDoc(swaggerOptions);