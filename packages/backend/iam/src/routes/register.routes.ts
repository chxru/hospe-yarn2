import { API } from "@hospe/types";
import { Request, Router } from "express";
import { RegisterNewUser } from "../controllers/register.controllers";

const router = Router();

// TODO: Fix lint issue
// eslint-disable-next-line @typescript-eslint/ban-types
router.post<API.IAM.Register.Res>("/user", async (req: Request<{}, {}, API.IAM.Register.Req>, res) => {
  try {
    const data: API.IAM.Register.Req = {
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
    };
    
    const response = await RegisterNewUser(data);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
