import * as express from "express";
import { createProject } from "../controllers/project/createProject";
import { listProjects } from "../controllers/project/listProjects";
import { getProject } from "../controllers/project/getProject";
import { deleteProject } from "../controllers/project/deleteProject";
import { updateProject } from "../controllers/project/updateProject";

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/", listProjects);
projectRouter.get("/:id", getProject);
projectRouter.delete("/:id", deleteProject);
projectRouter.put("/:id", updateProject);

export default projectRouter;
