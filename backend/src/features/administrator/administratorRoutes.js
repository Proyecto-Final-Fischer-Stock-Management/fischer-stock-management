import { Router } from "express";
import multer from "multer";
import * as service from "./administratorService.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
      return callback(new Error("Invalid image format"));
    }
    callback(null, true);
  },
});

router.get("/dashboard/stats", (req, res) => {});
router.get("/dashboard/visits", (req, res) => {});

router.get("/accounts/user/:id", async (req, res, next) => {
  try {
    const user = await service.UGettingOneProcess(req.params.id);
    return res.status(200).send({ user });
  } catch (error) { next(error); }
});

router.get("/accounts/users/:id", async (req, res, next) => {
  try {
    const users = await service.UGettingAllProcess(req.params.id);
    return res.status(200).send({ users });
  } catch (error) { next(error); }
});

router.post("/accounts/user", async (req, res, next) => {
  try {
    const { completeName, email, role, password } = req.body;
    const result = await service.UCreationProcess(completeName, email, role, password);
    return res.status(201).send({ result });
  } catch (error) { next(error); }
});

router.put("/accounts/user", async (req, res, next) => {
  try {
    const { id, completeName, email, role, password } = req.body;
    const result = await service.UModificationProcess(id, completeName, email, role, password);
    return res.status(200).send({ result });
  } catch (error) { next(error); }
});

router.delete("/accounts/user", async (req, res, next) => {
  try {
    if (Number(req.body.id) === Number(req.user.id)) {
      return res.status(400).send({ message: "No podés eliminar tu propia cuenta." });
    }
    const result = await service.UDeletionProcess(req.body.id);
    return res.status(200).send({ result });
  } catch (error) { next(error); }
});

router.get("/stock/products", async (req, res, next) => {
  try {
    const info = await service.PGettingAllProcess();
    return res.status(200).send({ info });
  } catch (error) { next(error); }
});

router.get("/stock/product/:fischerCode", async (req, res, next) => {
  try {
    const info = await service.PGettingOneProcess(req.params.fischerCode);
    // La imagen se pide por separado para no enviar sus bytes como JSON.
    const { product_picture, ...product } = info;
    return res.status(200).send({ info: product });
  } catch (error) { next(error); }
});

router.get("/stock/product/:fischerCode/image", async (req, res, next) => {
  try {
    const product = await service.PGettingOneProcess(req.params.fischerCode);
    if (!product.product_picture) return res.status(404).send({ message: "No se encontró la imagen." });
    res.set("Content-Type", product.product_picture_type);
    return res.status(200).send(Buffer.from(product.product_picture));
  } catch (error) { next(error); }
});

function readProduct(req) {
  const { fischerCode, easySap, sodimacSku, carrefourEan, anonimaCodInt, hipertehuelcheCode, name } = req.body;
  return {
    fischerCode, easySap, sodimacSku, carrefourEan, anonimaCodInt, hipertehuelcheCode, name,
    productPicture: req.file?.buffer,
    productPictureType: req.file?.mimetype,
  };
}

router.post("/stock/product", upload.single("productPicture"), async (req, res, next) => {
  try {
    const result = await service.PCreationProcess(readProduct(req));
    return res.status(201).send({ result });
  } catch (error) { next(error); }
});

router.put("/stock/product", upload.single("productPicture"), async (req, res, next) => {
  try {
    const result = await service.PModificationProcess(readProduct(req));
    return res.status(200).send({ result });
  } catch (error) { next(error); }
});

router.delete("/stock/product", async (req, res, next) => {
  try {
    const result = await service.PDeletionProcess(req.body.fischerCode);
    return res.status(202).send({ result });
  } catch (error) { next(error); }
});

export default router;