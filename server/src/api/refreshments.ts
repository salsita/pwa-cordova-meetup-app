import { NO_CONTENT } from 'http-status-codes';
import * as Router from 'koa-router';

import { ErrorCause, Order } from '@models';

import { stocks, types, validType, setInitialStocks } from 'src/data/refreshments';
import { NotFoundError, BadRequestError } from 'src/helpers/errors';

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

  const available = stocks.get(refreshmentType);
  if (available < quantity) {
    throw new BadRequestError(ErrorCause.NotEnoughStocks, 'We don\'t have enough stocks to satisfy your order');
  }

  stocks.set(refreshmentType, available - quantity);
  ctx.status = NO_CONTENT;
});

router.get('/replenish', async ctx => {
  setInitialStocks();

  ctx.body = 'The stocks have been replenished';
});

export default router;
