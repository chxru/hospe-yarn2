import pg from "../pg";
import { HashPwd } from "../util/bcrypt";

export interface NewUserProps {
  email: string;
  password: string;
  fname: string;
  lname: string;
}

/**
 * Create new account with user role
 */
export const RegisterNewUser = async (data: NewUserProps) => {
  const trx = await pg.connect();
  const hashedPwd = await HashPwd(data.password);

  try {
    await trx.query("BEGIN");

    const q1 = await trx.query<{ user_id: string }>(
      "INSERT INTO users.data (email, fname, lname) VALUES ($1, $2, $3) RETURNING user_id",
      [data.email, data.fname, data.lname],
    );

    if (!q1.rowCount) throw new Error("q1 returned 0 rows");

    await trx.query(
      "INSERT INTO users.auth (email, pwd, user_id) VALUES ($1, $2, $3)",
      [data.email, hashedPwd, q1.rows[0].user_id],
    );

    await trx.query("COMMIT");
  } catch (error) {
    console.log("Error occurred while add user transaction");
    console.error(error);
    throw new Error("transaction-error");
  }
};
