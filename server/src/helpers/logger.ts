import { id } from 'cls-rtracer';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const rTracerFormat = printf(info => {
  const rid = id();
  return rid
    ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
    : `${info.timestamp}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    rTracerFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
