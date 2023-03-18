"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const votesControler_1 = require("../controllers/votesControler");
const votesrouter = express_1.default.Router();
// Upvote or downvote an answer
votesrouter.post('/answers/:answerId/vote', votesControler_1.voteOnAnswer);
exports.default = votesrouter;
