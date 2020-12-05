import * as express from "express";
import { prisma } from "../../db/client";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
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

    const correctPassword =
      user.password ==
      createHash("sha256")
        .update(password)
        .digest("base64");
    if (!correctPassword) {
      handleRequestError(res, ["incorrect credentials"]);
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET!, { expiresIn: "24h" });
    return handleSuccessfulRequest(res, {
      token,
    });
  } catch (error) {
    return handleServerError(res, [error]);
  }
};
