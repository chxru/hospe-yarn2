import { Router } from "express";
import { RegisterNewUser } from "../controllers/register.controllers";

const router = Router();

router.post("/user", async (req, res) => {
  try {
    await RegisterNewUser(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
