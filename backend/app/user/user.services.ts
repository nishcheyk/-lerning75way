// user.service.ts
import { IUser } from "./user.dto";
import { UserModel } from "./user.schema";
import bcrypt from "bcrypt";

export const getUserByEmail = async (email: string, selectPassword = false): Promise<IUser | null> => {
  return selectPassword
    ? UserModel.findOne({ email }).select("+password").exec()
    : UserModel.findOne({ email }).exec();
};

export const createUser = async (email: string, password: string): Promise<IUser> => {
  const existingUser = await UserModel.findOne({ email }).exec();
  if (existingUser) throw new Error("Email already exists");

  const user = new UserModel({ email, password });
  await user.save();
  return user;
};

export const validateUser = async (email: string, password: string): Promise<IUser | null> => {
  const user = await getUserByEmail(email, true);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) return null;

  return user;
};
