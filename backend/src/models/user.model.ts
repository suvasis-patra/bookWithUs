import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface UserDetailSchema extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateRefreshToken(): string;
  generateAccessToken(): string;
}
const userSchema = new mongoose.Schema<UserDetailSchema>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.pre<UserDetailSchema>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIERY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIERY,
  });
};

export const User = mongoose.model<UserDetailSchema>("User", userSchema);
