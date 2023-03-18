"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const UserRouter = (0, express_1.Router)();
// Route to login a user
UserRouter.post('/login', usersController_1.login);
// Route to register a new user
UserRouter.post('/register', usersController_1.register);
// Route to get all users
UserRouter.get('/users', usersController_1.getAllUsers);
// Route to get a single user by ID
UserRouter.get('/users/:id', usersController_1.getOneUser);
// Route to update a user by ID
UserRouter.put('/users/:id', usersController_1.updateUser);
// Route to delete a user by ID
UserRouter.delete('/users/:id', usersController_1.deleteUser);
UserRouter.post('/forgot-password', usersController_1.forgotPassword);
UserRouter.post('/reset-password', usersController_1.resetPassword);
exports.default = UserRouter;
