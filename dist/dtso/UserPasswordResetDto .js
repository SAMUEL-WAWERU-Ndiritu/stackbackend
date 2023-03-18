"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserPasswordResetDto {
    static validate(data) {
        const schema = joi_1.default.object({
            password: joi_1.default.string().required().min(6),
            confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref('password')),
        });
        return schema.validate(data);
    }
}
exports.default = UserPasswordResetDto;
