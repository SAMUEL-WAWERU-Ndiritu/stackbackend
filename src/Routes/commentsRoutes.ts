import express from 'express';
import { getComments, addComment, deleteComment } from '../controllers/commentsController';
import { authMiddleware } from '../middlewares/authMiddleware';
const CommentsRouter= express.Router();

// GET /questions/:id/comments - Get all comments for a question
CommentsRouter.get('/questions/:id/comments', getComments);

// POST /questions/:id/comments - Add a comment to a question
CommentsRouter.post('/questions/:id/comments',  authMiddleware ,addComment);

// DELETE /comments/:id - Delete a comment
CommentsRouter.delete('/comments/:id', authMiddleware ,deleteComment);

export default CommentsRouter;
