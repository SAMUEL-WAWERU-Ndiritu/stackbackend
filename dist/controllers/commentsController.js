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
exports.deleteComment = exports.addComment = exports.getComments = void 0;
const helpers_1 = require("../helpers");
const index_1 = __importDefault(require("../config/index"));
// export const getComments = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const comments = await pool.query<Comment[]>('SELECT * FROM question_comments WHERE question_id = $1', [req.params.id]);
//     return res.status(200).json(comments.rows);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
exports.getComments = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield index_1.default.query('SELECT * FROM usp_GetAllComments()');
        return res.status(200).json(comments.rows);
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// export const addComment = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const { body } = req.body;
//     const user_id = req.user?.id;
//     const question_id = req.params.id;
//     const created_at = new Date();
//     const updated_at = new Date();
//     const newComment = await pool.query<Comment>(
//       'INSERT INTO question_comments (body, user_id, question_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [body, user_id, question_id, created_at, updated_at]
//     );
//     return res.status(201).json(newComment.rows[0]);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
// export const addComment = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const { body } = req.body;
//     const user_id = req.user?.id;
//     const question_id = req.params.id;
//     const created_at = new Date();
//     const updated_at = new Date();
//     const id = substring(md5(random()::text || clock_timestamp()::text), 1, 36); // generate random id
//     const newComment = await pool.query<Comment>(
//       'INSERT INTO question_comments (id, body, user_id, question_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//       [id, body, user_id, question_id, created_at, updated_at]
//     );
//     return res.status(201).json(newComment.rows[0]);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
// export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const comment = await pool.query<Comment[]>('SELECT * FROM question_comments WHERE id = $1', [req.params.id]);
//     if (comment.rows.length === 0) {
//       return res.status(404).json(responseHandler(false, 404, 'Comment not found', null));
//     }
//     await pool.query('DELETE FROM question_comments WHERE id = $1', [req.params.id]);
//     return res.status(204).send();
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
// Add a new comment
exports.addComment = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { body } = req.body;
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const question_id = req.params.id;
        yield index_1.default.query('SELECT add_question_comment($1, $2, $3)', [body, user_id, question_id]);
        return res.status(201).json({ message: 'Comment added successfully' });
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
// Delete a comment by ID
exports.deleteComment = (0, helpers_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment_id = req.params.id;
        yield index_1.default.query('SELECT usp_DeleteQuestionCommentById($1)', [comment_id]);
        return res.status(200).json({ message: 'Comment deleted successfully' });
    }
    catch (err) {
        console.log(err);
        return res
            .status(500)
            .json((0, helpers_1.responseHandler)(false, 500, 'Server Error', null));
    }
}));
