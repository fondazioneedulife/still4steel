import { RouterContext, RouterOptions } from '@koa/router';
import Router from '@koa/router';
export interface Context extends RouterContext {
    validatedQuery: any;
    validatedBody: any;
    validatedParams: any;
}
export interface SwaggerDisplayConfiguration {
    deepLinking?: boolean;
    displayOperationId?: boolean;
    defaultModelsExpandDepth?: number;
    defaultModelExpandDepth?: number;
    defaultModelRendering?: 'example' | 'model';
    displayRequestDuration?: boolean;
    docExpansion?: 'list' | 'full' | 'none';
    filter?: boolean | string;
    maxDisplayedTags?: number;
    showExtensions?: boolean;
    showCommonExtensions?: boolean;
}
export interface SwaggerConfiguration {
    display?: SwaggerDisplayConfiguration;
}
export interface SwaggerOptions {
    title?: string;
    description?: string;
    version?: string;
    swaggerJsonEndpoint?: string;
    swaggerHtmlEndpoint?: string;
    prefix?: string;
    swaggerOptions?: any;
    swaggerConfiguration?: SwaggerConfiguration;
    [name: string]: any;
}
export interface DumpOptions {
    dir: string;
    filename: string;
}
export interface MapOptions {
    doValidation?: boolean;
    recursive?: boolean;
    [name: string]: any;
    ignore?: string[];
}
declare const wrapper: (router: SwaggerRouter) => void;
declare class SwaggerRouter<StateT = any, CustomT = {}> extends Router<StateT, CustomT> {
    swaggerKeys: Set<String>;
    opts: RouterOptions;
    swaggerOpts: SwaggerOptions;
    constructor(opts?: RouterOptions, swaggerOpts?: SwaggerOptions);
    _addKey(str: String): void;
    swagger(options?: SwaggerOptions): void;
    dumpSwaggerJson(dumpOptions: DumpOptions, options?: SwaggerOptions): void;
    map(SwaggerClass: any, options: MapOptions): void;
    mapDir(dir: string, options?: MapOptions): void;
    buildMiddleware(SwaggerClass: any, options: MapOptions): {
        path: string;
        method: string;
        middlewares: any[];
        name: string;
    }[] | {
        path: string;
        method: string;
        middleware: any;
        name: string;
    }[];
}
export { wrapper, SwaggerRouter };
