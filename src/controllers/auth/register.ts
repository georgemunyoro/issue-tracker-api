import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/errorHandling";
import { createHash } from "crypto";

export interface UserRegistrationForm {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  const registrationForm: UserRegistrationForm = req.body;
  try {
    registrationForm.password = createHash("sha256")
      .update(registrationForm.password)
      .digest("base64");

    delete registrationForm.passwordConfirmation;

    const newUser = await prisma.user.create({
      data: registrationForm,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        data: {
          message: "Unable to create user",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return handleServerError(res, [error]);
  }
};
