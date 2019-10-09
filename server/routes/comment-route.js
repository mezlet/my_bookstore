import {Router} from 'express'
import controller from '../controllers/CommentController';

const commentRouter = Router();

commentRouter.post('/:id', controller.createComment);
commentRouter.get('/:id', controller.getComments);

export default commentRouter;