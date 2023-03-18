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
exports.deleteAnswer = exports.getAnswersByUser = exports.addAnswer = exports.getAnswers = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const config_1 = __importDefault(require("../config"));
const createAnswer = (answer) => ({
    body: answer.body,
    user_id: answer.user_id,
    question_id: answer.question_id,
});
// export const getAnswers = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT * FROM answers WHERE question_id = $1', [req.params.id]);
//     client.release();
//     return res.status(200).json(result.rows);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
exports.getAnswers = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield config_1.default.connect();
        const result = yield client.query('SELECT * FROM usp_GetAllAnswers()');
        client.release();
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
exports.addAnswer = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json((0, helpers_1.responseHandler)(false, 400, errors.array()[0].msg, null));
    }
    const questionId = parseInt(req.params.id);
    const answer = createAnswer({
        body: req.body.text,
        user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        question_id: questionId,
    });
    try {
        const client = yield config_1.default.connect();
        const result = yield client.query('INSERT INTO answers (body, user_id, question_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *', [answer.body, answer.user_id, answer.question_id]);
        client.release();
        return res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
exports.getAnswersByUser = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const client = yield config_1.default.connect();
        const { rows } = yield client.query('SELECT * FROM get_answers_by_user($1)', [userId]);
        res.status(200).json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// export const deleteAnswer = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('DELETE FROM answers WHERE id = $1 RETURNING *', [req.params.id]);
//     client.release();
//     return res.status(200).json(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
exports.deleteAnswer = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield config_1.default.connect();
        const result = yield client.query('SELECT usp_DeleteAnswerById($1)', [req.params.id]);
        client.release();
        return res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
