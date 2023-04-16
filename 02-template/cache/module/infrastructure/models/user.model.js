"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class UserModel {
    constructor() {
        this.userSchema = new mongoose_1.default.Schema({
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                email: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            age: {
                type: Number,
                required: false,
            },
            active: {
                type: Boolean,
                required: true,
            },
            createdAt: {
                type: Date,
                required: true,
            },
            updatedAt: {
                type: Date,
                required: false,
            },
            deletedAt: {
                type: Date,
                required: false,
            },
        });
    }
    get model() {
        return mongoose_1.default.model("User", this.userSchema);
    }
}
exports.default = new UserModel().model;
