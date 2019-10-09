import {Router} from 'express'
import controller from '../controllers/BookController';
import User from '../middlewares/UserMiddleware';


const bookRouter = Router();

bookRouter.post('/', User.validUser, controller.create);
bookRouter.get('/', controller.getBooks);
bookRouter.put('/:id', User.validUser, controller.updateBook);
bookRouter.get('/:id', controller.getBook);
bookRouter.delete('/:id',  User.validUser,controller.deleteBook);


export default bookRouter;