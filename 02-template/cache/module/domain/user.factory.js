"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const uuid_1 = require("uuid");
const utils_service_1 = require("./services/utils.service");
const user_1 = require("./user");
class UserFactory {
    static create(id, name, email, password, age) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error("ID is not valid");
        }
        if (age < 18) {
            throw new Error("User must be over 18 years old");
        }
        if (!utils_service_1.UtilsService.validatePassword(password)) {
            throw new Error("Password invalid");
        }
        if (name.length < 3) {
            throw new Error("Name must be at least 3 characters long");
        }
        if (!utils_service_1.UtilsService.validateEmail(email)) {
            throw new Error("Email invalid");
        }
        const userProperties = {
            id,
            name,
            email,
            password,
            age,
        };
        return new user_1.User(userProperties);
    }
}
exports.UserFactory = UserFactory;
