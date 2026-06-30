import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 4306;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
