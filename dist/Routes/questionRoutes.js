"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const questionsController_1 = require("../controllers/questionsController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const postRoutes = express_1.default.Router();
// GET all posts
postRoutes.get('/posts', questionsController_1.getPosts);
// GET posts by tag name
postRoutes.get('/posts/tags/:tagname', questionsController_1.getTagPosts);
// GET single post
postRoutes.get('/posts/:id', questionsController_1.getSinglePost);
// POST add new post
postRoutes.post('/posts', [
    (0, express_validator_1.check)('title', 'Title is required').not().isEmpty(),
    (0, express_validator_1.check)('body', 'Body is required').not().isEmpty(),
    (0, express_validator_1.check)('tagname', 'Tagname is required').not().isEmpty(),
    authMiddleware_1.authMiddleware
], questionsController_1.addPost);
// DELETE a post
postRoutes.delete('/posts/:id', authMiddleware_1.authMiddleware, questionsController_1.deletePost);
exports.default = postRoutes;
