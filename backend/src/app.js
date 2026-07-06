import express from "express";
import router from "./index.js";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.json("Hellou");
});

export default app;
