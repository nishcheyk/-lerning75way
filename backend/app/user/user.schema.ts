// user.schema.ts
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.dto";

const Schema = mongoose.Schema;

const SALT_ROUNDS = 12;

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // exclude password by default
  },
  { timestamps: true }
);

// Pre-save hook to hash password if modified or new
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
  }
  next();
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
