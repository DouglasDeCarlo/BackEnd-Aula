import {Router} from 'express';
import UserController from '../controller/UserController.js';

const userRouter = Router();

userRouter.post('/login', UserController.LoginUser);
userRouter.post('/register', UserController.RegisterUser);

export default userRouter;  