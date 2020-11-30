import * as express from "express";

import { loggedInUser } from "../controllers/auth/loggedInUser";
import { loginUser } from "../controllers/auth/login";
import { registerUser } from "../controllers/auth/register";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get('/', loggedInUser);

export default authRouter;
