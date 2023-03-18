"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteOnAnswer = void 0;
const helpers_1 = require("../helpers");
const config_1 = __importDefault(require("../config"));
exports.voteOnAnswer = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, answerId, voteType } = req.body;
    if (!['upvote', 'downvote'].includes(voteType)) {
        return res.status(400).json({ message: 'Invalid vote type. Must be "upvote" or "downvote".' });
    }
    try {
        yield config_1.default.query('SELECT usp_VoteOnAnswer($1, $2, $3)', [userId, answerId, voteType]);
        res.status(200).json({ message: 'Vote successful.' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}));
