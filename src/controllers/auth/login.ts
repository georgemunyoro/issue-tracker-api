import * as express from "express";
import { prisma } from "../../db/client";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
} from "../../utils/requestHandlers";

export const loginUser = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleRequestError(res, [
        `Missing fields: ${email ? "" : "email, "}${password ? "" : "password"}`,
      ]);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return handleRequestError(res, ["unable to login"]);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return handleRequestError(res, ["unable to login"]);
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET!, { expiresIn: "24h" });
    return handleSuccessfulRequest(res, {
      token,
    });
  } catch (error) {
    return handleServerError(res, [error]);
  }
};
