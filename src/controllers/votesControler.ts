import { Request, Response } from 'express';
import { asyncHandler } from '../helpers';
import pool from '../config';

export const voteOnAnswer = asyncHandler(async (req: Request, res: Response) => {
  const { userId, answerId, voteType } = req.body;
  
  if (!['upvote', 'downvote'].includes(voteType)) {
    return res.status(400).json({ message: 'Invalid vote type. Must be "upvote" or "downvote".' });
  }
  
  try {
    await pool.query('SELECT usp_VoteOnAnswer($1, $2, $3)', [userId, answerId, voteType]);
    res.status(200).json({ message: 'Vote successful.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
