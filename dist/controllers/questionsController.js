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
exports.deletePost = exports.addPost = exports.getSinglePost = exports.getTagPosts = exports.getPosts = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const index_1 = __importDefault(require("../config/index"));
// export const getPosts = asyncHandler(async (req: Request, res: Response) => {
// try {
// const result = await pool.query('SELECT * FROM questions');
// return res.status(200).json(result.rows);
// } catch (err) {
// console.log(err);
// return res
// .status(500)
// .json(responseHandler(true, 500, 'Server Error', null));
// }
// });
exports.getPosts = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_1.default.query('SELECT * FROM gett_all_questions()');
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(true, 500, 'Server Error', null));
    }
}));
// export const getTagPosts = asyncHandler(async (req: Request, res: Response) => {
// const tagName = req.params.tagname;
// try {
//     const result = await pool.query('SELECT * FROM questions WHERE tags LIKE $1', [`%${tagName}%`]);
// return res.status(200).json(result.rows);
// } catch (err) {
// console.log(err);
// return res
// .status(500)
// .json(responseHandler(true, 500, 'Server Error', null));
// }
// });
exports.getTagPosts = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tagName = req.params.tagname;
    try {
        const result = yield index_1.default.query('SELECT * FROM usp_GetQuestionsByTagName($1)', [tagName]);
        return res.status(200).json(result.rows);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(true, 500, 'Server Error', null));
    }
}));
// export const getSinglePost = asyncHandler(async (req: Request, res: Response) => {
// try {
// const result = await pool.query('SELECT * FROM questions WHERE id = $1', [req.params.id]);
// if (result.rows.length === 0) {
// return res.status(404).json(responseHandler(false, 404, 'Post not found', null));
// }
// return res.status(200).json(result.rows[0]);
// } catch (err) {
// console.log(err);
// return res
// .status(500)
// .json(responseHandler(false, 500, 'Server Error', null));
// }
// });
exports.getSinglePost = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_1.default.query('SELECT * FROM usp_GetQuestionById($1)', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json((0, helpers_1.responseHandler)(false, 404, 'Post not found', null));
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// export const addPost = asyncHandler(async (req: Request, res: Response) => {
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
// return res
// .status(400)
// .json(responseHandler(false, 400, errors.array()[0].msg, null));
// }
// try {
// const { title, body, tagname } = req.body;
// const userId = req.user!.id;
// const result = await pool.query(
// 'INSERT INTO questions (title, body, tags, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
// [title, body, tagname, userId, new Date(), new Date()]
// );
// return res.status(201).json(result.rows[0]);
// } catch (err) {
// console.log(err);
// return res
// .status(500)
// .json(responseHandler(false, 500, 'Server Error', null));
// }
// });
exports.addPost = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json((0, helpers_1.responseHandler)(false, 400, errors.array()[0].msg, null));
    }
    try {
        const { title, body, tagname } = req.body;
        const userId = req.user.id;
        yield index_1.default.query('SELECT add_question($1, $2, $3, $4)', [title, body, tagname, userId]);
        return res.status(201).json((0, helpers_1.responseHandler)(true, 201, 'Post added successfully', null));
    }
    catch (err) {
        console.log(err);
        return res.status(500).json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// export const deletePost = asyncHandler(async (req: Request, res: Response) => {
// try {
// const result = await pool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [req.params.id]);
// if (result.rows.length === 0) {
// return res.status(404).json(responseHandler(false, 404, 'Post not found', null));
// }
// return res.status(200).json(responseHandler(false, 200, 'Post deleted successfully', null));
// } catch (err) {
// console.log(err);
// return res
// .status(500)
// .json(responseHandler(false, 500, 'Server Error', null));
// }
// });
exports.deletePost = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield index_1.default.query('SELECT * FROM usp_DeleteQuestionById($1)', [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json((0, helpers_1.responseHandler)(false, 404, 'Post not found', null));
        }
        return res.status(200).json((0, helpers_1.responseHandler)(false, 200, 'Post deleted successfully', null));
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
