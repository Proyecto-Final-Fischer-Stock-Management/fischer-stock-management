import app from "./app.js";
import "dotenv/config";

const PORT = 4306 || process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
