import { Types } from "mongoose";
import { UserModel } from "../models/users";
import { ComparePwd } from "../util/bcrypt";
import { GenerateJWT } from "../util/jwt";

export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserLoginRes {
  _id: Types.ObjectId | string,
  name: {
    first: string,
    last: string,
  }
  email: string,
  access: string,
  refresh: string,
}

/**
 * Authenticate users
 */
export const LoginUser = async ({ email, password }: UserLoginProps): Promise<UserLoginRes> => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("Cannot find user");

    if (!user.permission.user) throw new Error("Do not have user permission");
   
    await ComparePwd(password, user.password);

    const accessToken = await GenerateJWT(user._id.toString(), "user", "access");
    const refreshToken = await GenerateJWT(user._id.toString(), "user", "refresh");

    const res: UserLoginRes = {
      _id: user._id,
      name: user.name,
      email: user.email,
      access: accessToken,
      refresh: refreshToken,
    };

    return res;    
  } catch (error) {
    console.log(error);
    throw new Error("Login Failed");
  }
};
