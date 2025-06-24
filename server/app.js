import express from "express";
import { PORT, ENV } from "./config/env.js";
import connectDB from "./database/mongodb.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);

app.listen(PORT, async () => {
  await console.log(
    `Server is running on http://localhost:${PORT} in ${ENV} mode`
  );
  await connectDB();
});

export default app;
