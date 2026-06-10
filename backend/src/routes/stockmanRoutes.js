import { Router } from "express";

const router = Router();

router.get("/check-in/franchises", (req, res) => {});
router.get("/check-in/branches", (req, res) => {});
router.get("/check-in/sectors", (req, res) => {});
router.post("/check-in", (req, res) => {});

router.get("/home/last-check-in", (req, res) => {});

router.get("/catalog/products", (req, res) => {});
router.post("/order/product", (req, res) => {});

router.get("/order/product", (req, res) => {});
// router.put("/order/product", (req, res) => {});
router.delete("/order/product", (req, res) => {});
router.post("/order", (req, res) => {});

export default router;
