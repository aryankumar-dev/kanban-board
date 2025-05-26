import express from "express";
import cookieParser from "cookie-parser";




const app = express();
app.use(express.json());
app.use(cookieParser());
//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.routes.js"
import productRouter from "./routes/project.routes.js"

app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/product", productRouter)

export default app;