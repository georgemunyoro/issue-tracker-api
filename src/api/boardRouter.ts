import * as express from "express";

import { deleteBoard } from "../controllers/board/deleteBoard";
import { listBoard } from "../controllers/board/listBoards";
import { updateBoard } from "../controllers/board/updateBoard";
import { getBoard } from "../controllers/board/getBoard";
import { createBoard } from "../controllers/board/createBoard";

const boardRouter = express.Router();

boardRouter.post("/", createBoard);
boardRouter.get("/:id", getBoard);
boardRouter.get("/", listBoard);
boardRouter.put("/:id", updateBoard);
boardRouter.delete("/:id", deleteBoard);

export default boardRouter;
