import { Router } from "express";
import { login } from "./authService.js";

const router = Router();

// Login a user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);

    return res.status(200).send({ result });
  } catch (err) {
    return next(err);
  }
});

export default router;
