"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.default.Pool({
    user: 'postgres',
    password: '123@samuel.',
    database: 'stack',
    host: 'localhost',
    port: 5433
});
console.log('Here');
exports.default = pool;
