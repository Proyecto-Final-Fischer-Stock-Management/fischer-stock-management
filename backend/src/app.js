import express from "express";
import cors from "cors";
import router from "./index.js";
import errorMiddleware, {
  notFoundMiddleware,
} from "./middlewares/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(router);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
