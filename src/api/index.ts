import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

import authRouter from "./authRouter";
import commentRouter from "./commentRouter";
import issueRouter from "./issueRouter";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/issue", issueRouter);
rootRouter.use("/comment", commentRouter);

rootRouter.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    data: {
      message: "ok",
    },
  });
});
