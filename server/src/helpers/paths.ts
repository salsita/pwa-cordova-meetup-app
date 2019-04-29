import * as path from 'path';

import config from '../config';

const baseDir = config.developmentMode ? path.resolve(__dirname, '../../../client/dist') : path.resolve('./client/dist');

export const APP_PATH = baseDir;
