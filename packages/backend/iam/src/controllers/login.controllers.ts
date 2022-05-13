import pg from "../pg";
import { ComparePwd } from "../util/bcrypt";

export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserLoginRes {
  user_id: string,
  fname: string,
  lname: string,
  email: string
}

/**
 * Authenticate users
 */
export const LoginUser = async ({ email, password }: UserLoginProps): Promise<UserLoginRes> => {
  try {
    const authQuery = await pg.query<{
      user_id: string;
      email: string;
      pwd: string;
    }>("SELECT user_id, pwd FROM users.auth WHERE email=$1", [email]);

    if (!authQuery.rowCount) {
      throw new Error("Cannot find email");
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_id,  pwd } = authQuery.rows[0];

    await ComparePwd(password, pwd);

    const dataQuery = await pg.query<{ fname: string, lname: string }>(
      "SELECT fname, lname FROM users.data WHERE user_id=$1",
      [authQuery.rows[0].user_id],
    );

    if (!dataQuery.rowCount) throw new Error("Cannot find user data");

    const { fname, lname } = dataQuery.rows[0];

    // TODO: Add JWT

    const res: UserLoginRes = {
      user_id,
      fname,
      lname,
      email,
    };

    return res;    
  } catch (error) {
    console.log(error);
    throw new Error("Login Failed");
  }
};
