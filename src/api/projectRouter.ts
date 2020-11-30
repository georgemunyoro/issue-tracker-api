import * as express from "express";
import { createProject } from "../controllers/project/createProject";

const projectRouter = express.Router();

projectRouter.post("/", createProject);A

export default projectRouter;
