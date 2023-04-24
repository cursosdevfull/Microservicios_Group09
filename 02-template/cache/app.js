"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Error_1 = require("./helpers/Error");
const Parameters_1 = __importDefault(require("./helpers/Parameters"));
const user_application_1 = require("./module/application/user.application");
const user_infrastructure_1 = require("./module/infrastructure/user.infrastructure");
const routes_1 = __importDefault(require("./module/interfaces/http/routes"));
const user_controller_1 = __importDefault(require("./module/interfaces/http/user.controller"));
class App {
    constructor(controller) {
        this.controller = controller;
        this.expressApp = (0, express_1.default)();
        this.mountMiddlewares();
        this.mountRoutes();
        this.mountErrorHandlers();
    }
    mountMiddlewares() {
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(express_1.default.urlencoded({ extended: true }));
    }
    mountRoutes() {
        this.expressApp.use("/api", new routes_1.default(this.controller).router);
    }
    mountErrorHandlers() {
        this.expressApp.use((req, res, next) => {
            const error = new Error_1.IError("Not found");
            error.status = 404;
            next(error);
        });
        this.expressApp.use((err, req, res, next) => {
            const objError = {
                name: err.name,
                message: err.message,
            };
            if (Parameters_1.default.ENVIRONMENT !== "production") {
                objError.stack = err.stack;
            }
            res.status(err.status || 500).json(objError);
        });
    }
    get app() {
        return this.expressApp;
    }
}
const userInfrastructure = new user_infrastructure_1.UserInfrastructure();
const userApplication = new user_application_1.UserApplication(userInfrastructure);
const userController = new user_controller_1.default(userApplication);
exports.default = new App(userController).app;
