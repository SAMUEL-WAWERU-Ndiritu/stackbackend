import express, { Router } from 'express';
import { voteOnAnswer } from '../controllers/votesControler';

const votesrouter: Router = express.Router();

// Upvote or downvote an answer
votesrouter.post('/answers/:answerId/vote', voteOnAnswer);

export default votesrouter;
