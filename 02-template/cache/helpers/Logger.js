"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const Parameters_1 = __importDefault(require("./Parameters"));
const levels = {
    error: chalk_1.default.red.bold,
    warn: chalk_1.default.yellow.bold,
    info: chalk_1.default.green.bold,
    debug: chalk_1.default.blue.bold,
};
const logFormat = (environment) => {
    return winston_1.default.format.printf(({ level, message, timestamp }) => {
        const color = levels[level](level.toUpperCase());
        return `${chalk_1.default.gray(`[${timestamp}]`)} ${color}: ${chalk_1.default.cyan(`[${environment === "local" ? message : JSON.stringify(message)}]`)}`;
    });
};
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), logFormat(Parameters_1.default.ENVIRONMENT)),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: "logs/%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.default = logger;
