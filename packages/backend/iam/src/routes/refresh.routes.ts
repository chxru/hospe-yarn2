import { API } from "@hospe/types";
import { Request, Router } from "express";
import { HandleRefreshTokens } from "../controllers/refresh.controllers";

const router = Router();

// TODO: Fix lint issue
// eslint-disable-next-line @typescript-eslint/ban-types
router.post<API.IAM.Refresh.Res>("/user", async (req: Request<{}, {}, API.IAM.Refresh.Req>, res) => {
  try {
    const result = await HandleRefreshTokens(req.body.refreshToken);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
