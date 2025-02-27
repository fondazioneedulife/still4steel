const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-koa');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Memo API',
            version: '1.0.0',
            description: 'Documentazione API con Swagger e Koa',
        },
    },
    apis: ['./server.js'], // Percorso ai file con le API documentate
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app, router) {
    app.use(swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
