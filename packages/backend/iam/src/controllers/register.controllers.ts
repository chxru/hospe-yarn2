import { API } from "@hospe/types";
import { UserModel } from "../models/users";
import { HashPwd } from "../util/bcrypt";
import { GenerateJWT } from "../util/jwt";

/**
 * Create new account with user role
 */
export const RegisterNewUser = async (data: API.IAM.Register.Req): Promise<API.IAM.Register.Res> => {
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
