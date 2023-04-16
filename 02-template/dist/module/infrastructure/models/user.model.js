"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const mongoose_1=__importDefault(require("mongoose"));class UserModel{constructor(){this.userSchema=new mongoose_1.default.Schema({id:{type:String,required:!0},name:{type:String,required:!0},email:{type:String,required:!0,email:!0,unique:!0},password:{type:String,required:!0},age:{type:Number,required:!1},active:{type:Boolean,required:!0},createdAt:{type:Date,required:!0},updatedAt:{type:Date,required:!1},deletedAt:{type:Date,required:!1}})}get model(){return mongoose_1.default.model("User",this.userSchema)}}exports.default=(new UserModel).model;