"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parameters {
    static get PORT() {
        return +process.env.PORT || 3000;
    }
    static get MONGO_USERNAME() {
        return process.env.MONGO_USERNAME || "root";
    }
    static get MONGO_PASSWORD() {
        return process.env.MONGO_PASSWORD || "root";
    }
    static get MONGO_DATABASE() {
        return process.env.MONGO_DATABASE || "test";
    }
    static get MONGO_HOST() {
        return process.env.MONGO_HOST || "localhost";
    }
    static get MONGO_AUTH_SOURCE() {
        return process.env.MONGO_AUTH_SOURCE || "admin";
    }
    static get MONGO_PORT() {
        return process.env.MONGO_PORT || "27017";
    }
    static get ENVIRONMENT() {
        return process.env.NODE_ENV || "development";
    }
}
exports.default = Parameters;
