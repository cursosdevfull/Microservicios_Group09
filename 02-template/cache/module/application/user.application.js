"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApplication = void 0;
class UserApplication {
    constructor(repository) {
        this.repository = repository;
    }
    async create(user) {
        return await this.repository.create(user);
    }
}
exports.UserApplication = UserApplication;
