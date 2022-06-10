import { API } from "@hospe/types";
import { Request, Router } from "express";
import { LoginUser } from "../controllers/login.controllers";

const router = Router();

// TODO: Fix lint issue
// eslint-disable-next-line @typescript-eslint/ban-types
router.post<API.IAM.Login.Res>("/user", async (req: Request<{}, {}, API.IAM.Login.Req>, res) => {
  try {
    const data: API.IAM.Login.Req = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await LoginUser(data);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
