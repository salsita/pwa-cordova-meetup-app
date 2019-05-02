import * as Router from 'koa-router';

import notifications from './notifications';
import refreshments from './refreshments';

const router = new Router();

router.use('/notifications', notifications.routes(), notifications.allowedMethods());
router.use('/refreshments', refreshments.routes(), refreshments.allowedMethods());

export default router;
