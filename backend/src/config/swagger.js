import swaggerJsdoc from 'swagger-jsdoc';
import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Memo API',
            version: '1.0.0',
            description: 'Documentazione API con Swagger e Koa',
        },
    },
    apis: ['../routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    const router = new Router();
    
    router.get('/swagger.json', async (ctx) => {
        ctx.body = swaggerSpec;
    });

    app.use(router.routes()).use(router.allowedMethods());
    
    app.use(koaSwagger({
        routePrefix: '/docs',
        swaggerOptions: {
            url: '/swagger.json',
        },
    }));
}

export default setupSwagger;