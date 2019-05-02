import { NO_CONTENT } from 'http-status-codes';
import * as Router from 'koa-router';
import * as webPush from 'web-push';

import config from 'src/config';
import { subscriptions } from 'src/data/notifications';

const router = new Router();

webPush.setVapidDetails(
  config.vapidSubject,
  config.vapidPublicKey,
  config.vapidPrivateKey,
);

router.post('/subscriptions', async ctx => {
  if (ctx.request.body.subscription) {
    subscriptions.set(ctx.request.ip, ctx.request.body.subscription);
  } else {
    subscriptions.delete(ctx.request.ip);
  }
  ctx.status = NO_CONTENT;
});

router.get('/subscriptions/clear', async ctx => {
  subscriptions.clear();

  ctx.body = 'All subscriptions have been cleared';
});

export default router;
