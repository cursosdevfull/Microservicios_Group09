"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(properties) {
        Object.assign(this, properties);
        this.active = true;
        this.createdAt = new Date();
    }
    properties() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            age: this.age,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    delete() {
        this.active = false;
        this.deletedAt = new Date();
    }
    update(fields) {
        Object.assign(this, fields);
        this.updatedAt = new Date();
    }
}
exports.User = User;
