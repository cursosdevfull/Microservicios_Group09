"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfrastructure = void 0;
const neverthrow_1 = require("neverthrow");
const Error_1 = require("../../helpers/Error");
const user_created_dto_1 = require("./dtos/user-created.dto");
const user_model_1 = __importDefault(require("./models/user.model"));
class UserInfrastructure {
    async create(user) {
        try {
            await user_model_1.default.create(user.properties());
            return (0, neverthrow_1.ok)(user_created_dto_1.UserCreatedDto.fromDomainToResponse(user));
        }
        catch (error) {
            const objErr = new Error_1.IError("Error creating user");
            return (0, neverthrow_1.err)(objErr);
        }
    }
}
exports.UserInfrastructure = UserInfrastructure;
