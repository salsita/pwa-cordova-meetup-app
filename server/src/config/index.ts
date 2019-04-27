import * as dotenv from 'dotenv';

dotenv.config();

export default {
  developmentMode: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3001,
};
