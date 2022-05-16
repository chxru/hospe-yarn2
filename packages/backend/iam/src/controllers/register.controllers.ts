import { Types } from "mongoose";
import { UserModel } from "../models/users";
import { HashPwd } from "../util/bcrypt";
import { GenerateJWT } from "../util/jwt";

export interface NewUserProps {
  email: string;
  password: string;
  fname: string;
  lname: string;
}

export interface NewUserResponse {
  _id: Types.ObjectId | string,
  name: {
    first: string,
    last: string,
  }
  email: string,
  access: string,
  refresh: string
}

/**
 * Create new account with user role
 */
export const RegisterNewUser = async (data: NewUserProps): Promise<NewUserResponse> => {
  const hashedPwd = await HashPwd(data.password);
  const user = new UserModel({
    name: {
      first: data.fname,
      last: data.lname,
    },
    email: data.email,
    password: hashedPwd,
    permission: {
      user: true,
    },
  });

  const saved = await user.save();

  const accessToken = await GenerateJWT(user._id.toString(), "user", "access");
  const refreshToken = await GenerateJWT(user._id.toString(), "user", "refresh");


  return {
    _id: saved._id.toString(),
    name: saved.name,
    email: saved.email,
    access: accessToken,
    refresh: refreshToken,
  };
};
