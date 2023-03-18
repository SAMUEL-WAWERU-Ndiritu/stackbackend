import { Request, Response } from 'express';
import { responseHandler, asyncHandler } from '../helpers';
import  {Comment}  from '../models';
import pool from '../config/index';

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
export const getComments = asyncHandler(async (req: Request, res: Response) => {
  try {
    const comments = await pool.query<Comment[]>('SELECT * FROM usp_GetAllComments()');
    return res.status(200).json(comments.rows);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

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
export const addComment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { body } = req.body;
    const user_id = req.user?.id;
    const question_id = req.params.id;

    await pool.query(
      'SELECT add_question_comment($1, $2, $3)',
      [body, user_id, question_id]
    );

    return res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

// Delete a comment by ID
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const comment_id = req.params.id;

    await pool.query(
      'SELECT usp_DeleteQuestionCommentById($1)',
      [comment_id]
    );

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
