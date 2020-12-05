import * as express from "express";

import { commentOnIssue } from "../controllers/comment/comment";

const commentRouter = express.Router();

commentRouter.post("/:issueId", commentOnIssue);

export default commentRouter;

