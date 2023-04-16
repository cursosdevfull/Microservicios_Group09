"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server nodejs
// database
// message broker
const app_1 = __importDefault(require("./app"));
const database_bootstrap_1 = __importDefault(require("./bootstrap/database.bootstrap"));
const server_bootstrap_1 = __importDefault(require("./bootstrap/server.bootstrap"));
const Logger_1 = __importDefault(require("./helpers/Logger"));
const server = new server_bootstrap_1.default(app_1.default);
const database = new database_bootstrap_1.default();
(async () => {
    try {
        const promiseBootstraps = [server.initialize(), database.initialize()];
        await Promise.all(promiseBootstraps);
    }
    catch (error) {
        Logger_1.default.error(error);
        process.exit(1);
    }
})();
