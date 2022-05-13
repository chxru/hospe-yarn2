import { Request, Router } from "express";
import { LoginUser, UserLoginProps, UserLoginRes } from "../controllers/login.controllers";

const router = Router();

// TODO: Fix lint issue
// eslint-disable-next-line @typescript-eslint/ban-types
router.post<UserLoginRes>("/user", async (req: Request<{}, {}, UserLoginProps>, res) => {
  try {
    const data: UserLoginProps = {
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
