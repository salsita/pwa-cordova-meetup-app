import { koaMiddleware } from 'cls-rtracer';
import * as Koa from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

import apiRouter from './api';
import { errorHandler } from './helpers/middlewares';

const app = new Koa();
const router = new Router();

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

app.use(koaMiddleware());
app.use(BodyParser());
app.use(errorHandler());
app.use(router.routes());

export default app;
