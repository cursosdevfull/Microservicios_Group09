"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class default_1 {
    constructor(controller) {
        this.controller = controller;
        this.expressRouter = (0, express_1.Router)();
        this.mountRoutes();
    }
    mountRoutes() {
        this.expressRouter.get("/", this.controller.create);
    }
    get router() {
        return this.expressRouter;
    }
}
exports.default = default_1;
