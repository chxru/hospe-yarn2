import { API } from "@hospe/types";
import { UserModel } from "../models/users";
import { DecodeJWT, GenerateJWT } from "../util/jwt";

export const HandleRefreshTokens = async (refreshToken: string): Promise<API.IAM.Refresh.Res> => {
  try {
    const payload = await DecodeJWT(refreshToken);
    if (!payload) throw new Error("Payload content is empty");

    const { id, role } = JSON.parse(payload) as API.IAM.JWT;

    const accessToken = await GenerateJWT(id, role, "access");

    // TODO: Project only required fields
    const user = await UserModel.findById(id);

    if (!user) throw new Error(`Cannot find user for ${id}`);


    const res: API.IAM.Refresh.Res = {
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
