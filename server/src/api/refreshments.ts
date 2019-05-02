import * as Router from 'koa-router';
import * as webPush from 'web-push';

import { ErrorCause, Order } from '@models';

import { subscriptions } from 'src/data/notifications';
import { stocks, types, validType, setInitialStocks } from 'src/data/refreshments';
import { NotFoundError, BadRequestError } from 'src/helpers/errors';
import logger from 'src/helpers/logger';

const router = new Router();

router.get('/types', async ctx => {
  ctx.body = types;
});

router.get('/quantity/:typeId', async ctx => {
  const id = +ctx.params.typeId;
  if (!validType(id)) {
    throw new NotFoundError(ErrorCause.UnknownId, `Unknown refreshment type id ${id}`);
  }

  ctx.body = { id, quantity: stocks.get(id) };
});

router.post('/order', async ctx => {
  const { refreshmentType, quantity } = ctx.request.body as Order;

  if (!validType(refreshmentType)) {
    throw new NotFoundError(ErrorCause.UnknownId, `Unknown refreshment type id ${refreshmentType}`);
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new BadRequestError(ErrorCause.InvalidQuantity, `Invalid quantity ${quantity}`);
  }

  const available = stocks.get(refreshmentType);
  if (available < quantity) {
    throw new BadRequestError(ErrorCause.NotEnoughStocks, 'We don\'t have enough stocks to satisfy your order');
  }

  stocks.set(refreshmentType, available - quantity);
  ctx.body = { refreshmentType, quantity };

  const notificationsSubscription = subscriptions.get(ctx.request.ip);
  if (notificationsSubscription) {
    logger.info('Found subscription for push notifications. Scheduling the notification.');
    setTimeout(() => webPush.sendNotification(notificationsSubscription, 'Your order is ready!'), 10000);
  }
});

router.get('/replenish', async ctx => {
  setInitialStocks();

  ctx.body = 'The stocks have been replenished';
});

export default router;
