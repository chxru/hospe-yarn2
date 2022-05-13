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

/**
 * Compare plain text password with hash
 * 
 * @param plain Plain text password
 * @param hash Encrypted password
 */
const ComparePwd = async (plain: string, hash: string) : Promise<void> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hash).then(result => {
      if (!result) reject(new Error("wrong password"));
      resolve();
    }).catch(err => reject(err));
  });
};

export { ComparePwd, HashPwd };
