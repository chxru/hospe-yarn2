import { UserModel } from "../models/users";
import { DecodeJWT, GenerateJWT } from "../util/jwt";
import { UserLoginRes } from "./login.controllers";

export interface IRefreshTokenReq {
  refreshToken: string
}

interface JWTContent {
  id: string,
  role: string
}

export const HandleRefreshTokens = async (refreshToken: string) => {
  try {
    const payload = await DecodeJWT(refreshToken);
    if (!payload) throw new Error("Payload content is empty");

    const { id, role } = JSON.parse(payload) as JWTContent;

    const accessToken = await GenerateJWT(id, role, "access");

    // TODO: Project only required fields
    const user = await UserModel.findById(id);

    if (!user) throw new Error(`Cannot find user for ${id}`);


    const res: UserLoginRes = {
      _id: id,
      name: user.name,
      email: user.email,
      access: accessToken,
      refresh: refreshToken,
    };

    return res;
  } catch (error) {
    console.log("Error occurred in refreshing tokens");
    console.log(error);
    throw new Error("Refresh failed");
  }

};
