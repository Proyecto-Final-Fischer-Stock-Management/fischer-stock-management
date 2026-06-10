import express from "express";

const app = express();
const PORT = process.env.PORT || 4306;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
