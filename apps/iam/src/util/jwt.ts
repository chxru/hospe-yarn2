import * as jwt from "jsonwebtoken";

/**
 * Generate Json web token
 *
 * @param {string} id User ID
 * @param {role} role
 * @param {("refresh" | "access")} type
 */
const GenerateJWT = (
  id: string,
  role: string,
  type: "refresh" | "access",
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const token =
      type === "refresh"
        ? process.env.JWT_REFRESH_TOKEN
        : process.env.JWT_ACCESS_TOKEN;

    if (!token) {
      reject(
        new Error(`Token secret for ${type} is empty. Check env variables`),
      );
      return;
    }

    // refresh token 7days, access token 20mins
    const expiresIn = type === "refresh" ? "7d" : 60 * 20;

    jwt.sign({ id, role }, token, { expiresIn }, (err, t) => {
      if (t) {
        resolve(t);
      }

      // reject if no token is generated
      reject(err);
    });
  });
};

/**
 * Validate and Decode JWT
 */
const DecodeJWT = (
  token: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_REFRESH_TOKEN) {
      reject(
        new Error(
          "Token secret for refresh token is empty. Check env variables",
        ),
      );
      return;
    }

    // verify jwt
    jwt.verify(token, process.env.JWT_REFRESH_TOKEN, (err) => {
      if (err) {
        reject(err);
      }

      // decode jwt
      const decoded = jwt.decode(token);
      resolve(JSON.stringify(decoded));
    });
  });
};

const VerifyJWT = (token: string): void => {
  if (!process.env.JWT_ACCESS_TOKEN)  throw new Error("JWT_REFRESH_TOKEN is missing");

  try {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  } catch (error) {
    console.log("Error in verifyJwt ", error);
    throw error;
  }
};

export { GenerateJWT, DecodeJWT, VerifyJWT };
