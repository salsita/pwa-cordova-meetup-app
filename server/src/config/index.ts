import * as dotenv from 'dotenv';

dotenv.config();

export default {
  developmentMode: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3001,
  vapidSubject: process.env.VAPID_SUBJECT || 'mailto:lukas@salsitasoft.com',
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY,
};
