import '@babel/polyfill';
import express from 'express'; 
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import session from 'express-session';
import { env } from './config/env-config';
import routes from './routes/index';

const app = express();

app.use(cors());
// app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

routes(app);
app.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`);
});

export default app;