import * as express from "express";
import { prisma } from "../../db/client";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { handleServerError } from "../../utils/errorHandling";

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(422).json({
        success: false,
        data: {
          errors: ["User with given email does not exist"],
        },
      });
    }

    const correctPassword =
      user.password == createHash("sha256").update(password).digest("base64");
    if (correctPassword) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET!, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        success: true,
        data: {
          token,
        },
      });
    }
  } catch (error) {
    return handleServerError(res, [error]);
  }
};
