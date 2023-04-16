"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = __importDefault(require("src/helpers/Logger"));
const Parameters_1 = __importDefault(require("../helpers/Parameters"));
const bootstrap_1 = require("./bootstrap");
class DatabaseBootstrap extends bootstrap_1.Bootstrap {
    initialize() {
        return new Promise((resolve, reject) => {
            const { username, password, database, host, port, authSource } = this.dbConfig();
            const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;
            const options = { maxPoolSize: 10 };
            mongoose_1.default
                .connect(url, options)
                .then(() => {
                resolve(true);
                Logger_1.default.info("Database is connected");
            })
                .catch((err) => {
                reject(err);
                Logger_1.default.info("Database is not connected");
            });
        });
    }
    dbConfig() {
        return {
            username: Parameters_1.default.MONGO_USERNAME,
            password: Parameters_1.default.MONGO_PASSWORD,
            database: Parameters_1.default.MONGO_DATABASE,
            host: Parameters_1.default.MONGO_HOST,
            port: Parameters_1.default.MONGO_PORT,
            authSource: Parameters_1.default.MONGO_AUTH_SOURCE,
        };
    }
}
exports.default = DatabaseBootstrap;
