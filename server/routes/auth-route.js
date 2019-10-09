import {Router} from 'express'
import controller from '../controllers/UserController';

const authRouter = Router();

authRouter.post('/register', controller.register);
authRouter.post('/login', controller.login);


export default authRouter;