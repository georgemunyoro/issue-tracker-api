import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
} from "../../utils/requestHandlers";
import { createHash } from "crypto";

export interface UserRegistrationForm {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export const registerUser = async (req: express.Request, res: express.Response) => {
  const registrationForm: UserRegistrationForm = req.body;

  try {
    registrationForm.password = createHash("sha256")
      .update(registrationForm.password)
      .digest("base64");

    delete registrationForm.passwordConfirmation;

    const newUser = await prisma.user.create({
      data: registrationForm,
    });

    if (!newUser) return handleRequestError(res, ["unable to create user"]);

    return handleSuccessfulRequest(res, {
      user: newUser,
    });
  } catch (error) {
    return handleServerError(res, [error]);
  }
};
