"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfrastructure = void 0;
const user_created_dto_1 = require("./dtos/user-created.dto");
const user_model_1 = __importDefault(require("./models/user.model"));
class UserInfrastructure {
    async create(user) {
        try {
            const userCreated = user.properties();
            await user_model_1.default.create(user.properties());
            return user_created_dto_1.UserCreatedDto.fromDomainToResponse(user);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.UserInfrastructure = UserInfrastructure;
