"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../../../helpers/Error");
const user_factory_1 = require("../../domain/user.factory");
class default_1 {
    constructor(application) {
        this.application = application;
        this.create = this.create.bind(this);
    }
    async create(req, res, next) {
        const user = user_factory_1.UserFactory.create(req.body.id, req.body.name, req.body.email, req.body.password, +req.body.age);
        const userCreated = await this.application.create(user);
        if (userCreated.isErr()) {
            const error = new Error_1.IError();
            error.message = userCreated.error.message;
            error.status = userCreated.error.status;
            error.stack = userCreated.error.stack;
            return next(error);
        }
        res.json(userCreated.value);
    }
}
exports.default = default_1;
