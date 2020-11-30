import express from "express";
import { rootRouter } from "./api";

const api = express();
api.use(express.json());

api.use("/", rootRouter);

const PORT = process.env.PORT || 5000;

api.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
