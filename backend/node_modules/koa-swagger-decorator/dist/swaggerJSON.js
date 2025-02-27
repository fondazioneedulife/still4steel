"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerJSON = void 0;
const swaggerTemplate_1 = __importDefault(require("./swaggerTemplate"));
const utils_1 = require("./utils");
/**
 * build swagger json from apiObjects
 */
const swaggerJSON = (options = {}, apiObjects) => {
    const { title, description, version, prefix = '', swaggerOptions = {} } = options;
    const swaggerJSON = (0, swaggerTemplate_1.default)(title, description, version, swaggerOptions);
    const paths = {};
    Object.keys(apiObjects).forEach((key) => {
        const value = apiObjects[key];
        if (!Object.keys(value).includes('request')) {
            return;
        }
        const { method } = value.request;
        let { path } = value.request;
        path = (0, utils_1.getPath)(prefix, value.prefix ? `${value.prefix}${path}` : path); // 根据前缀补全path
        const summary = value.summary || '';
        const description = value.description || summary;
        const responses = value.responses || {
            200: { description: 'success' }
        };
        const { query = [], header = [], path: pathParams = [], body = [], order, tags, formData = [], security, deprecated } = value;
        const parameters = [...pathParams, ...query, ...header, ...formData, ...body];
        // init path object first
        if (!paths[path]) {
            paths[path] = {};
        }
        // add content type [multipart/form-data] to support file upload
        const consumes = formData.length > 0 ? ['multipart/form-data'] : undefined;
        paths[path][method] = {
            consumes,
            summary,
            description,
            parameters,
            responses,
            tags,
            security,
            deprecated
        };
        if (!paths[path]._order) {
            paths[path]._order = order;
        }
    });
    swaggerJSON.paths = (0, utils_1.sortObject)(paths, (path, length) => path._order || length, (path) => {
        const { _order } = path, restOfPathData = __rest(path, ["_order"]);
        return restOfPathData;
    });
    return swaggerJSON;
};
exports.swaggerJSON = swaggerJSON;
exports.default = swaggerJSON;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlckpTT04uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvc3dhZ2dlckpTT04udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBcUM7QUFDckMsbUNBQThDO0FBRTlDOztHQUVHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsQ0FBQyxVQUFpQyxFQUFFLEVBQUUsVUFBZSxFQUFFLEVBQUU7SUFDM0UsTUFBTSxFQUNKLEtBQUssRUFDTCxXQUFXLEVBQ1gsT0FBTyxFQUNQLE1BQU0sR0FBRyxFQUFFLEVBQ1gsY0FBYyxHQUFHLEVBQUUsRUFDcEIsR0FBRyxPQUFPLENBQUM7SUFDWixNQUFNLFdBQVcsR0FBUSxJQUFBLHlCQUFJLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM0UsTUFBTSxLQUFLLEdBQXdDLEVBQUUsQ0FBQztJQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDM0MsT0FBTztTQUNSO1FBRUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxHQUFHLElBQUEsZUFBTyxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUNyRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQztRQUNqRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJO1lBQ25DLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUU7U0FDaEMsQ0FBQztRQUNGLE1BQU0sRUFDSixLQUFLLEdBQUcsRUFBRSxFQUNWLE1BQU0sR0FBRyxFQUFFLEVBQ1gsSUFBSSxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQ3JCLElBQUksR0FBRyxFQUFFLEVBQ1QsS0FBSyxFQUNMLElBQUksRUFDSixRQUFRLEdBQUcsRUFBRSxFQUNiLFFBQVEsRUFDUixVQUFVLEVBQ1gsR0FBRyxLQUFLLENBQUM7UUFFVixNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsS0FBSyxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFOUUseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNsQjtRQUVELGdFQUFnRTtRQUNoRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFM0UsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ3BCLFFBQVE7WUFDUixPQUFPO1lBQ1AsV0FBVztZQUNYLFVBQVU7WUFDVixTQUFTO1lBQ1QsSUFBSTtZQUNKLFFBQVE7WUFDUixVQUFVO1NBQ1gsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUEsa0JBQVUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RGLE1BQU0sRUFBRSxNQUFNLEtBQXVCLElBQUksRUFBdEIsY0FBYyxVQUFJLElBQUksRUFBbkMsVUFBNEIsQ0FBTyxDQUFDO1FBQzFDLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyxDQUFDO0FBR08sa0NBQVc7QUFEcEIsa0JBQWUsV0FBVyxDQUFDIn0=