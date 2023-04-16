"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedDto = void 0;
const class_transformer_1 = require("class-transformer");
const user_create_response_1 = require("../../application/responses/user-create.response");
class UserCreatedDto {
    static fromDomainToResponse(user) {
        return (0, class_transformer_1.plainToInstance)(user_create_response_1.UserCreatedResponse, user.properties());
    }
}
exports.UserCreatedDto = UserCreatedDto;
