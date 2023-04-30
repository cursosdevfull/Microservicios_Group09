import mongoose from "mongoose";

class UserModel {
  private readonly userSchema: mongoose.Schema;

  constructor() {
    this.userSchema = new mongoose.Schema({
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
    return mongoose.model("User", this.userSchema);
  }
}

export default new UserModel().model;
