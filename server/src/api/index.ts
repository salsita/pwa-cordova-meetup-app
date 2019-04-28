import * as Router from 'koa-router';

import refreshments from './refreshments';

const router = new Router();

router.use('/refreshments', refreshments.routes(), refreshments.allowedMethods());

export default router;
