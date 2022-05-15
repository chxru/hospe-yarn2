import { Types } from "mongoose";
import { UserModel } from "../models/users";
import { ComparePwd } from "../util/bcrypt";

export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserLoginRes {
  _id: Types.ObjectId,
  name: {
    first: string,
    last: string,
  }
  email: string
}

/**
 * Authenticate users
 */
export const LoginUser = async ({ email, password }: UserLoginProps): Promise<UserLoginRes> => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user?.password) throw new Error("Cannot find user pwd hash");
   
    await ComparePwd(password, user.password);

    // TODO: Add JWT

    const res: UserLoginRes = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return res;    
  } catch (error) {
    console.log(error);
    throw new Error("Login Failed");
  }
};
