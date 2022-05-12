import { Request, Router } from "express";
import { RegisterNewUser, NewUserProps } from "../controllers/register.controllers";

const router = Router();

// TODO: Fix lint issue
// eslint-disable-next-line @typescript-eslint/ban-types
router.post<NewUserProps>("/user", async (req: Request<{}, {}, NewUserProps>, res) => {
  try {
    const data: NewUserProps = {
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
    };
    await RegisterNewUser(data);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
