import express from 'express';
import { check } from 'express-validator';
import { getPosts, getTagPosts, getSinglePost, addPost, deletePost } from '../controllers/questionsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const  postRoutes= express.Router();

// GET all posts
postRoutes.get('/posts', getPosts);

// GET posts by tag name
postRoutes.get('/posts/tags/:tagname', getTagPosts);

// GET single post
postRoutes.get('/posts/:id', getSinglePost);

// POST add new post
postRoutes.post('/posts', [
  check('title', 'Title is required').not().isEmpty(),
  check('body', 'Body is required').not().isEmpty(),
  check('tagname', 'Tagname is required').not().isEmpty(),
  authMiddleware
], addPost);

// DELETE a post
postRoutes.delete('/posts/:id', authMiddleware, deletePost);

export default  postRoutes;
