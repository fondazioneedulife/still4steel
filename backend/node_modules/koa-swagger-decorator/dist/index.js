"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerRouter = exports.wrapper = void 0;
__exportStar(require("./decorators"), exports);
const decorators_1 = __importDefault(require("./decorators"));
const wrapper_1 = require("./wrapper");
Object.defineProperty(exports, "wrapper", { enumerable: true, get: function () { return wrapper_1.wrapper; } });
Object.defineProperty(exports, "SwaggerRouter", { enumerable: true, get: function () { return wrapper_1.SwaggerRouter; } });
__exportStar(require("./swaggerPropertyHelper"), exports);
exports.default = decorators_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE2QjtBQUM3Qiw4REFBK0I7QUFDL0IsdUNBQTREO0FBSTFELHdGQUpPLGlCQUFPLE9BSVA7QUFDUCw4RkFMZ0IsdUJBQWEsT0FLaEI7QUFKZiwwREFBd0M7QUFTeEMsa0JBQWUsb0JBQUcsQ0FBQyJ9