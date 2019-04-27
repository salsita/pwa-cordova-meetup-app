import app from './app';

import config from './config';
import logger from './helpers/logger';

app.listen(config.port);

logger.info(`Listening on ${config.port} in ${config.developmentMode ? 'development' : 'production'} mode`);
