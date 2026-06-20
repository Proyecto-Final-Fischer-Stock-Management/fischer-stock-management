import { Router } from "express";
import { CreationProcess, DeletionProcess } from "./administratorService.js";

const router = Router();

// Create a user
router.post("/accounts/user", async (req, res) => {
  try {
    const { completeName, email, role, password } = req.body;

    const result = await CreationProcess(completeName, email, role, password);

    return res.status(201).send({ result });
  } catch (err) {
    if (err.message === "Required fields incompleted") {
      return res.status(400).send({ message: "Complete the required fields" });
    } else if (err.message === "Prisma has failed, unable to create user") {
      return res
        .status(500)
        .send({ message: "Server error, contact developement team" });
    }
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Delete a user
router.delete("/accounts/user", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await DeletionProcess(id);

    return res.status(200).send({ result });
  } catch (err) {
    return res.status(503).send({
      message: err.message,
    });
  }
});

export default router;
