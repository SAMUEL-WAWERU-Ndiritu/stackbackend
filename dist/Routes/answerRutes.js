"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AnswersControllers_1 = require("../controllers/AnswersControllers");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const AnswersRouter = express_1.default.Router();
// Route for getting answers for a specific question
AnswersRouter.get('/answers', AnswersControllers_1.getAnswers);
// Route for adding an answer to a specific question
AnswersRouter.post('/answers/:id', [
    authMiddleware_1.authMiddleware,
    (0, express_validator_1.check)('text', 'Answer text is required').not().isEmpty()
], AnswersControllers_1.addAnswer);
// Route for deleting an answer
AnswersRouter.delete('/answers/:id', authMiddleware_1.authMiddleware, AnswersControllers_1.deleteAnswer);
AnswersRouter.get('/question/answers/:id', AnswersControllers_1.getAnswersByUser);
exports.default = AnswersRouter;
