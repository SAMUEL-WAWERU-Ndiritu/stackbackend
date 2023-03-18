import { Router } from 'express';
import { login, register, getAllUsers, getOneUser, updateUser, deleteUser, forgotPassword, resetPassword } from '../controllers/usersController';

const UserRouter= Router();

// Route to login a user
UserRouter.post('/login', login);

// Route to register a new user
UserRouter.post('/register', register);

// Route to get all users
UserRouter.get('/users', getAllUsers);

// Route to get a single user by ID
UserRouter.get('/users/:id', getOneUser);

// Route to update a user by ID
UserRouter.put('/users/:id', updateUser);

// Route to delete a user by ID
UserRouter.delete('/users/:id', deleteUser);
UserRouter.post('/forgot-password', forgotPassword);
UserRouter.post('/reset-password', resetPassword);
export default UserRouter;
