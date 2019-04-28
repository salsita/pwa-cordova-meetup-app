import * as path from 'path';

import config from '../config';

const baseDir = config.developmentMode ? path.resolve(__dirname, '../../../client/dist/client') : path.resolve('../../client/dist/client');

export const APP_PATH = baseDir;
