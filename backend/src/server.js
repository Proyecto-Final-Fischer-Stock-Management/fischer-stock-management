import express from "express";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 4306;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
