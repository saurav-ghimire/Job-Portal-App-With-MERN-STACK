import express from 'express';
import { login, logout, register, updateProfile } from '../controller/user.controller.js';
import isAuthenticated from '../midllewares/isAuthenticated.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.post('/profile/update', isAuthenticated, updateProfile)

export default userRouter;