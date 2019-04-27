import { koaMiddleware } from 'cls-rtracer';
import * as Koa from 'koa';

const app = new Koa();

app.use(koaMiddleware());

app.use(async ctx => {
  ctx.body = 'Hello from Meet Up App :)';
});

export default app;
