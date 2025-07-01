import express from 'express'
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',adminLogin);

export default userRouter;

//express.Router() is used to create modular, mountable route handlers in an Express application.
// It helps organize your routes by grouping them logically and keeping your codebase clean and manageable.