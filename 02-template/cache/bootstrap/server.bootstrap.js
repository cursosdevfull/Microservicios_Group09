"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const Logger_1 = __importDefault(require("../helpers/Logger"));
const Parameters_1 = __importDefault(require("../helpers/Parameters"));
const bootstrap_1 = require("./bootstrap");
class ServerBootstrap extends bootstrap_1.Bootstrap {
    constructor(app) {
        super();
        this.app = app;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            const port = Parameters_1.default.PORT;
            const server = http_1.default.createServer(this.app);
            server
                .listen(port)
                .on("listening", () => {
                resolve(true);
                Logger_1.default.info(`Server is running on port ${port}`);
            })
                .on("error", (err) => {
                reject(err);
                Logger_1.default.info(`Server is not running on port ${port}`);
            });
        });
    }
}
exports.default = ServerBootstrap;
