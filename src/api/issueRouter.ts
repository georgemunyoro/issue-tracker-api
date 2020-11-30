import * as express from "express";
import { createIssue } from "../controllers/issue/createIssue";
import { deleteIssue } from "../controllers/issue/deleteIssue";
import { updateIssue } from "../controllers/issue/updateIssue";

const commentRouter = express.Router();

commentRouter.post("/new", createIssue);
commentRouter.patch("/update/:issueId", updateIssue);
commentRouter.delete("/delete/:issueId", deleteIssue);

export default commentRouter;
