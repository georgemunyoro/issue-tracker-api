import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

import authRouter from "./authRouter";
import commentRouter from "./commentRouter";
import issueRouter from "./issueRouter";
import projectRouter from "./projectRouter";
import columnRouter from "./columnRouter";
import boardRouter from "./boardRouter";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/issues", issueRouter);
rootRouter.use("/comments", commentRouter);
rootRouter.use("/projects", projectRouter);
rootRouter.use("/columns", columnRouter);
rootRouter.use("/boards", boardRouter);

rootRouter.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    data: {
      message: "ok",
    },
  });
});
