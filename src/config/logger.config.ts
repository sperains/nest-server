import { WinstonModuleOptions } from 'nest-winston';
import { format, LoggerOptions, transports } from 'winston';

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.align(),
  format.printf((i) => `${i.level}: ${[i.timestamp]} ${i.message}`),
);

const loggerTransports: LoggerOptions['transports'] = [
  new transports.File({ filename: 'logs/combined.log' }),

  new transports.DailyRotateFile({
    filename: 'logs/%DATE%.error',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    level: 'error',
  }),
];

if (process.env.NODE_ENV !== 'production') {
  loggerTransports.push(new transports.Console());
}

const loggerConfig: WinstonModuleOptions = {
  level: 'info',
  format: customFormat,
  transports: loggerTransports,
};

export default loggerConfig;
