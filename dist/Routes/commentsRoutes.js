"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = require("../controllers/commentsController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const CommentsRouter = express_1.default.Router();
// GET /questions/:id/comments - Get all comments for a question
CommentsRouter.get('/questions/:id/comments', commentsController_1.getComments);
// POST /questions/:id/comments - Add a comment to a question
CommentsRouter.post('/questions/:id/comments', authMiddleware_1.authMiddleware, commentsController_1.addComment);
// DELETE /comments/:id - Delete a comment
CommentsRouter.delete('/comments/:id', authMiddleware_1.authMiddleware, commentsController_1.deleteComment);
exports.default = CommentsRouter;
