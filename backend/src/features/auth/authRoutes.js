import { Router } from "express";
import { login } from "./authService.js";

const router = Router();

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);

    return res.status(200).send({ result });
  } catch (err) {
    if (err.message === "Required fields are incompleted") {
      return res.status(400).send({ message: "Complete the required fields" });
    } else if (err.message === "Invalid user or password") {
      return res.status(400).send({ message: "Invalid user or password" });
    }

    return res.status(503).send({
      message: err.message,
    });
  }
});

export default router;
