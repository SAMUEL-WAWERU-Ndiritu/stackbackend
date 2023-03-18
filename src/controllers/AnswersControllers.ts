import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler, asyncHandler } from '../helpers';
import { Pool } from 'pg';
import pool from '../config';
import { QueryResult } from 'pg';
interface Answer {
    id?: number;
    body: string;
    user_id: number;
    question_id: number;
    created_at?: Date;
    updated_at?: Date;
  }
  
  const createAnswer = (answer: Pick<Answer, 'body' | 'user_id' | 'question_id'>): Answer => ({
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
export const getAnswers = asyncHandler(async (req: Request, res: Response) => {
  try {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM usp_GetAllAnswers()');
  client.release();
  return res.status(200).json(result.rows);
  } catch (err) {
  console.log(err);
  return res
  .status(500)
  .json(responseHandler(false, 500, 'Server Error', null));
  }
  });



export const addAnswer = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
  
    const questionId = parseInt(req.params.id);

    const answer = createAnswer({
      body: req.body.text,
      user_id: req.user?.id!,
      question_id: questionId,
    });
    try {
      const client = await pool.connect();
      const result = await client.query<Answer>('INSERT INTO answers (body, user_id, question_id, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *', [answer.body, answer.user_id, answer.question_id]);
      client.release();
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      return res.status(500).json(responseHandler(false, 500, 'Server Error', null));
    }
  });
  
  export const getAnswersByUser  = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const client = await pool.connect();
    const { rows }: QueryResult = await client.query('SELECT * FROM get_answers_by_user($1)', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})



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
export const deleteAnswer = asyncHandler(async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT usp_DeleteAnswerById($1)', [req.params.id]);
    client.release();
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
