
import dotenv from "dotenv";
import app from "./app.js"
import connectDB from "./libs/db.js";


dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello Guys welcome");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongodb connection error", err);
    process.exit(1);
  });

