import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { morganMiddleware } from "./middlewares/logger.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(morganMiddleware());

app.listen(PORT, () => {
  console.log(`server is listening on PORT=${PORT}`);
});

// routes
import heathCheckRouter from "./routes/healthcheck.routes.js";
import schoolsRouter from "./routes/schools.routes.js"


app.use("/api/v1", heathCheckRouter);
app.use("/api/v1",schoolsRouter);
app.use(errorMiddleware);
