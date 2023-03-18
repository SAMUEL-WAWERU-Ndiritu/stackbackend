import { Request, Response } from 'express';
import { responseHandler, asyncHandler } from '../helpers';
import pool from '../config';

// export const getTags = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const tags = await pool.query('SELECT * FROM tags');
//     return res.status(200).json(tags.rows);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
export const getTags = asyncHandler(async (req: Request, res: Response) => {
  try {
    const tags = await pool.query('SELECT * FROM gett_all_tags()');
    return res.status(200).json(tags.rows);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});

// export const getSingleTag = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const tag = await pool.query('SELECT * FROM tags WHERE tagname = $1', [req.params.tagname]);
//     if (tag.rows.length === 0) {
//       return res.status(404).json(responseHandler(false, 404, 'Tag not found', null));
//     }
//     return res.status(200).json(tag.rows[0]);
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json(responseHandler(false, 500, 'Server Error', null));
//   }
// });
export const getSingleTag = asyncHandler(async (req: Request, res: Response) => {
  try {
    const tag = await pool.query('SELECT * FROM get_tagg_by_id($1)', [req.params.tag_id]);
    if (tag.rows.length === 0) {
      return res.status(404).json(responseHandler(false, 404, 'Tag not found', null));
    }
    return res.status(200).json(tag.rows[0]);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(responseHandler(false, 500, 'Server Error', null));
  }
});
