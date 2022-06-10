import { API } from "@hospe/types";
import { UserModel } from "../models/users";
import { ComparePwd } from "../util/bcrypt";
import { GenerateJWT } from "../util/jwt";

/**
 * Authenticate users
 */
export const LoginUser = async ({ email, password }: API.IAM.Login.Req): Promise<API.IAM.Login.Res> => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("Cannot find user");

    if (!user.permission.user) throw new Error("Do not have user permission");
   
    await ComparePwd(password, user.password);

    const accessToken = await GenerateJWT(user._id.toString(), "user", "access");
    const refreshToken = await GenerateJWT(user._id.toString(), "user", "refresh");

    const res: API.IAM.Login.Res = {
      _id: user._id.toString(),
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
