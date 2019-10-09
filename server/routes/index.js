import booksRoute from './books-route';
import commentRoute from './comment-route';
import authRoute from './auth-route';

const router = app => {
app.use('/api/books',booksRoute);
app.use('/api/comments',commentRoute);
app.use('/api/auth',authRoute);

};

export default router;