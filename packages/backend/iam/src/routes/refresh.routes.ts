import { Request, Router } from "express";
import { UserLoginRes } from "../controllers/login.controllers";
import { HandleRefreshTokens, IRefreshTokenReq } from "../controllers/refresh.controllers";

const router = Router();

// TODO: Fix lint issue
// eslint-disable-next-line @typescript-eslint/ban-types
router.post<UserLoginRes>("/user", async (req: Request<{}, {}, IRefreshTokenReq>, res) => {
  try {
    const result = await HandleRefreshTokens(req.body.refreshToken);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
