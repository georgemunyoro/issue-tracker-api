import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import { rootRouter } from "./api";

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());

app.use("/", rootRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
