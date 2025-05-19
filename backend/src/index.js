
import dotenv from "dotenv";
import app from "./app.js"

dotenv.config();
const PORT = process.env.PORT || 3001;



app.get("/", (req, res) => {
  res.send("Hello Guys welcome");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
