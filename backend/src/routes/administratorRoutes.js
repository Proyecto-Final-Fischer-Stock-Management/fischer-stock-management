import { Router } from "express";

const router = Router();

router.get("/dashboard/stats", (req, res) => {});
router.get("/dashboard/visits", (req, res) => {});

router.get("/stock/product", (req, res) => {});
router.post("/stock/product", (req, res) => {});
// router.put("/stock/product", (req, res) => {});
router.delete("/stock/product", (req, res) => {});

router.get("/accounts/user", (req, res) => {});
router.post("/accounts/user", (req, res) => {});
// router.put("/accounts/user", (req, res) => {});
router.delete("/accounts/user", (req, res) => {});

// router.get("/notifications/emails", (req, res) => {});
// router.get("/notifications/emails/:emailId", (req, res) => {});
// router.delete("/notifications/emails/:emailId", (req, res) => {});

export default router;
