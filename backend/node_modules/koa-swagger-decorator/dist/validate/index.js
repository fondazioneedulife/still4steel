"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const check_1 = __importDefault(require("./check"));
class InputError extends Error {
    constructor(field) {
        super(`incorrect field: '${field}', please check again!`);
        this.field = field;
        this.status = 400;
    }
}
function default_1(rawInput, expect) {
    // make it pure
    const input = (0, ramda_1.clone)(rawInput);
    Object.keys(expect).forEach((key) => {
        if (expect[key] === undefined) {
            delete input[key]; // remove unexpected key/vals.
            return;
        }
        // if this key is required but not in input.
        if (!check_1.default.required(input[key], expect[key]).is) {
            throw new InputError(key);
        }
        // if this key has default value
        const defaultVal = check_1.default.default(input[key], expect[key]).val;
        // only set default value when it is not undefined
        // avoid side effect of undefined default value
        if (defaultVal !== undefined) {
            input[key] = defaultVal;
        }
        if (input[key] === undefined)
            return;
        const { is, val } = check_1.default.check(input[key], expect[key]);
        if (!is)
            throw new InputError(key);
        input[key] = val;
    });
    return input;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdmFsaWRhdGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxpQ0FBOEI7QUFDOUIsb0RBQThCO0FBRTlCLE1BQU0sVUFBVyxTQUFRLEtBQUs7SUFHNUIsWUFBWSxLQUFhO1FBQ3ZCLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQU9ELG1CQUF5QixRQUFlLEVBQUUsTUFBb0I7SUFDNUQsZUFBZTtJQUNmLE1BQU0sS0FBSyxHQUFHLElBQUEsYUFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1lBQ2pELE9BQU87U0FDUjtRQUVELDRDQUE0QztRQUM1QyxJQUFJLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pELE1BQU0sSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0I7UUFFRCxnQ0FBZ0M7UUFDaEMsTUFBTSxVQUFVLEdBQUcsZUFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWhFLGtEQUFrRDtRQUNsRCwrQ0FBK0M7UUFDL0MsSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzVCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDekI7UUFFRCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQUUsT0FBTztRQUVyQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLGVBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBakNELDRCQWlDQyJ9