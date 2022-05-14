import pg from "../pg";
import { HashPwd } from "../util/bcrypt";

export interface NewUserProps {
  email: string;
  password: string;
  fname: string;
  lname: string;
}

export interface NewUserResponse {
  userId: string,
  fname: string,
  lname: string,
  email: string
}

/**
 * Create new account with user role
 */
export const RegisterNewUser = async (data: NewUserProps): Promise<NewUserResponse> => {
  const trx = await pg.connect();
  const hashedPwd = await HashPwd(data.password);

  try {
    await trx.query("BEGIN");

    const q1 = await trx.query<{ userid: string }>(
      "INSERT INTO users.data (email, fname, lname) VALUES ($1, $2, $3) RETURNING userId",
      [data.email, data.fname, data.lname],
    );

    console.log(q1.rows[0]);

    if (!q1.rowCount) throw new Error("q1 returned 0 rows");

    await trx.query(
      "INSERT INTO users.auth (email, pwd, userId) VALUES ($1, $2, $3)",
      [data.email, hashedPwd, q1.rows[0].userid],
    );

    await trx.query("COMMIT");

    return {
      userId:  q1.rows[0].userid,
      fname: data.fname,
      lname: data.lname,
      email: data.email,
    };
  } catch (error) {
    console.log("Error occurred while add user transaction");
    console.error(error);
    throw new Error("transaction-error");
  }
};
