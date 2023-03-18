import express from 'express';
import { getAnswers, addAnswer, deleteAnswer,getAnswersByUser} from '../controllers/AnswersControllers';
import { check } from 'express-validator';
import { authMiddleware } from '../middlewares/authMiddleware';

const AnswersRouter = express.Router();

// Route for getting answers for a specific question
AnswersRouter.get('/answers', getAnswers);

// Route for adding an answer to a specific question
AnswersRouter.post('/answers/:id', [
    authMiddleware,
  check('text', 'Answer text is required').not().isEmpty()
], addAnswer);

// Route for deleting an answer
AnswersRouter.delete('/answers/:id', authMiddleware, deleteAnswer);


AnswersRouter.get('/question/answers/:id', getAnswersByUser);
export default AnswersRouter;
