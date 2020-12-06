import * as express from "express";

import { getColumn } from "../controllers/column/getColumn";
import { listColumns } from "../controllers/column/listColumns";
import { createColumn } from "../controllers/column/createColumn";
import { updateColumn } from "../controllers/column/updateColumn";
import { deleteColumn } from "../controllers/column/deleteColumn";

const columnRouter = express.Router();

columnRouter.get("/", listColumns);
columnRouter.get("/:id", getColumn);
columnRouter.post("/", createColumn);
columnRouter.put("/:id", updateColumn);
columnRouter.delete("/:id", deleteColumn);

export default columnRouter;
