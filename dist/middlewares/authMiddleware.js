"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res
            .status(401)
            .json((0, helpers_1.responseHandler)(false, 401, 'No token, authorization denied', null));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        console.log(err);
        return res
            .status(401)
            .json((0, helpers_1.responseHandler)(false, 401, 'Token is not valid', null));
    }
};
exports.authMiddleware = authMiddleware;
