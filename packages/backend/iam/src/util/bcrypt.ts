import * as bcrypt from "bcrypt";

/**
 * Generate hash of the user's password
 */
const HashPwd = (pwd: string): Promise<string> => {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(pwd, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

export { HashPwd };
