"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_factory_1 = require("../../domain/user.factory");
class default_1 {
    constructor(application) {
        this.application = application;
        this.create = this.create.bind(this);
    }
    async create(req, res) {
        const user = user_factory_1.UserFactory.create("3fd66ebc-1b64-4a75-be52-4ea97982350e", "Jhon", Math.random() + "@email.com", "ElMundo3sAjeono2023", 50);
        const userCreated = await this.application.create(user);
        res.json(userCreated);
    }
}
exports.default = default_1;
