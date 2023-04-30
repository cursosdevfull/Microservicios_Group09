import chalk from 'chalk';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import Parameters from './Parameters';

const levels: Record<string, chalk.Chalk> = {
  error: chalk.red.bold,
  warn: chalk.yellow.bold,
  info: chalk.green.bold,
  debug: chalk.blue.bold,
};

const logFormat = (environment: string) => {
  return winston.format.printf(({ level, message, timestamp }) => {
    const color = levels[level](level.toUpperCase());
    return `${chalk.gray(`[${timestamp}]`)} ${color}: ${chalk.cyan(
      `[${environment==="local" ? message: JSON.stringify(message)}]`
    )}`;
  });
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat(Parameters.ENVIRONMENT)
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export default logger;
