import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseHandler, asyncHandler } from '../helpers';
import pool  from '../config/index';

interface Post {
title: string;
body: string;
tags: string;
userId: number;
}

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


export const getPosts = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT * FROM gett_all_questions()');
      return res.status(200).json(result.rows);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(responseHandler(true, 500, 'Server Error', null));
    }
  });
  

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
export const getTagPosts = asyncHandler(async (req: Request, res: Response) => {
    const tagName = req.params.tagname;
  
    try {
      const result = await pool.query(
        'SELECT * FROM usp_GetQuestionsByTagName($1)',
        [tagName]
      );
      return res.status(200).json(result.rows);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(responseHandler(true, 500, 'Server Error', null));
    }
  });
  

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
export const getSinglePost = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT * FROM usp_GetQuestionById($1)', [req.params.id]);
      if (result.rows.length === 0) {
        return res.status(404).json(responseHandler(false, 404, 'Post not found', null));
      }
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.log(err);
      return res.status(500).json(responseHandler(false, 500, 'Server Error', null));
    }
  });

  

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
export const addPost = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try {
      const { title, body, tagname } = req.body;
      const userId = req.user!.id;
      await pool.query('SELECT add_question($1, $2, $3, $4)', [title, body, tagname, userId]);
      return res.status(201).json(responseHandler(true, 201, 'Post added successfully', null));
    } catch (err) {
      console.log(err);
      return res.status(500).json(responseHandler(false, 500, 'Server Error', null));
    }
  });

  


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

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    try {
      const result = await pool.query('SELECT * FROM usp_DeleteQuestionById($1)', [req.params.id]);
      if (result.rowCount === 0) {
        return res.status(404).json(responseHandler(false, 404, 'Post not found', null));
      }
      return res.status(200).json(responseHandler(false, 200, 'Post deleted successfully', null));
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(responseHandler(false, 500, 'Server Error', null));
    }
  });
  