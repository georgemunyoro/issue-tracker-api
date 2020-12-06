import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
} from "../../utils/requestHandlers";
import * as bcrypt from "bcrypt";

export interface UserRegistrationForm {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    const registrationForm: UserRegistrationForm = req.body;

    if (registrationForm.password != registrationForm.passwordConfirmation) {
      return handleRequestError(res, ["unable to create user"]);
    }

    registrationForm.password = await bcrypt.hash(registrationForm.password, 10);

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
