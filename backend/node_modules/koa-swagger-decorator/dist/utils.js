"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObject = exports.swaggerKeys = exports.allowedMethods = exports.reservedMethodNames = exports.loadSwaggerClasses = exports.loadClass = exports.getFilepaths = exports.getPath = exports.convertPath = void 0;
const path_1 = __importDefault(require("path"));
const globby_1 = __importDefault(require("globby"));
const is_type_of_1 = __importDefault(require("is-type-of"));
// eg. /api/{id} -> /api/:id
const convertPath = (path) => {
    const re = new RegExp('{(.*?)}', 'g');
    return path.replace(re, ':$1');
};
exports.convertPath = convertPath;
const getPath = (prefix, path) => `${prefix}${path}`.replace('//', '/');
exports.getPath = getPath;
const reservedMethodNames = [
    'middlewares',
    'name',
    'constructor',
    'length',
    'prototype',
    'parameters',
    'prefix',
];
exports.reservedMethodNames = reservedMethodNames;
var allowedMethods;
(function (allowedMethods) {
    allowedMethods["GET"] = "get";
    allowedMethods["POST"] = "post";
    allowedMethods["PUT"] = "put";
    allowedMethods["PATCH"] = "patch";
    allowedMethods["DELETE"] = "delete";
})(allowedMethods || (allowedMethods = {}));
exports.allowedMethods = allowedMethods;
const getFilepaths = (dir, recursive = true, ignore = []) => {
    const ignoreDirs = ignore.map((path => `!${path}`));
    const paths = recursive
        ? globby_1.default.sync(['**/*.js', '**/*.ts', ...ignoreDirs], { cwd: dir })
        : globby_1.default.sync(['*.js', '*.ts', ...ignoreDirs], { cwd: dir });
    return paths.map(path => path_1.default.join(dir, path));
};
exports.getFilepaths = getFilepaths;
const loadModule = (filepath) => {
    const obj = require(filepath);
    if (!obj)
        return obj;
    // it's es module
    if (obj.__esModule)
        return 'default' in obj ? obj.default : obj;
    return obj;
};
const loadClass = (filepath) => {
    const cls = loadModule(filepath);
    if (is_type_of_1.default.class(cls))
        return cls;
    return false;
};
exports.loadClass = loadClass;
const loadSwaggerClasses = (dir = '', options = {}) => {
    dir = path_1.default.resolve(dir);
    const { recursive = true } = options;
    return getFilepaths(dir, recursive, options.ignore)
        .map(filepath => loadClass(filepath))
        .filter(cls => cls);
};
exports.loadSwaggerClasses = loadSwaggerClasses;
const swaggerKeys = (className, methods) => methods.map(m => `${className}- ${m}`);
exports.swaggerKeys = swaggerKeys;
/**
 * Sorts an object (dictionary) by value returned by the valSelector function.
 * Note that order is only guaranteed for string keys.
 */
const sortObject = (obj, comparisonSelector, callbackFn) => {
    const unsortedKeys = Object.keys(obj);
    const sortedKeys = unsortedKeys.sort((a, b) => (comparisonSelector(obj[a], unsortedKeys.length) > comparisonSelector(obj[b], unsortedKeys.length) ? 1 :
        comparisonSelector(obj[a], unsortedKeys.length) < comparisonSelector(obj[b], unsortedKeys.length) ? -1 : 0));
    return sortedKeys.reduce((sorted, k) => {
        let value = obj[k];
        if (callbackFn && is_type_of_1.default.function(callbackFn)) {
            value = callbackFn(value);
        }
        sorted[k] = value;
        return sorted;
    }, {});
};
exports.sortObject = sortObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXlCO0FBQ3pCLG9EQUE0QjtBQUM1Qiw0REFBNEI7QUFJNUIsNEJBQTRCO0FBQzVCLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDbkMsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBaUZBLGtDQUFXO0FBL0ViLE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxFQUFFLENBQy9DLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUErRXRDLDBCQUFPO0FBN0VULE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsYUFBYTtJQUNiLE1BQU07SUFDTixhQUFhO0lBQ2IsUUFBUTtJQUNSLFdBQVc7SUFDWCxZQUFZO0lBQ1osUUFBUTtDQUNULENBQUM7QUF5RUEsa0RBQW1CO0FBdkVyQixJQUFLLGNBTUo7QUFORCxXQUFLLGNBQWM7SUFDakIsNkJBQVcsQ0FBQTtJQUNYLCtCQUFhLENBQUE7SUFDYiw2QkFBVyxDQUFBO0lBQ1gsaUNBQWUsQ0FBQTtJQUNmLG1DQUFpQixDQUFBO0FBQ25CLENBQUMsRUFOSSxjQUFjLEtBQWQsY0FBYyxRQU1sQjtBQWtFQyx3Q0FBYztBQWhFaEIsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFXLEVBQUUsWUFBcUIsSUFBSSxFQUFFLFNBQW1CLEVBQUUsRUFBRSxFQUFFO0lBQ3JGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElB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