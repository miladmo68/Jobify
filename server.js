import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import jobRouter from "./routes/jobRouter.js";
import { body, validationResult } from "express-validator";
import { validateTest } from "./middleware/validationMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// GET HELLO
app.get("/", (req, res) => {
  res.send("Hello World");
});
// CREATE HELLO MESSAGE
app.post(
  "/api/v1/test",
  [body("name").notEmpty().withMessage("name is required")],
  validateTest,
  (req, res) => {
    const { name } = req.body;
    res.json({ msg: `hello ${name}` });
  }
);

app.use("/api/v1/jobs", jobRouter);

// Error Middleware
app.use(errorHandlerMiddleware);

// Database Connection & Server Start   -----------------------------------
const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
