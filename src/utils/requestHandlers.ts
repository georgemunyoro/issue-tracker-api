import * as express from "express";
import { getRequestAuthUser } from "./getRequestAuthUser";

export const handleServerError = (res: express.Response<any>, errors: any[]): express.Response => {
  errors.forEach((error) => console.error(error));
  return res.status(500).json({
    success: false,
    data: {
      errors,
    },
  });
};

export const handleRequestError = (res: express.Response<any>, errors: any[]): express.Response => {
  errors.forEach((error) => console.error(error));
  return res.status(400).json({
    success: false,
    data: {
      errors,
    },
  });
};

export const handleUnauthorizedUser = (res: express.Response<any>): express.Response => {
  return res.status(400).json({
    success: false,
    data: {
      errors: ["Unauthorized"],
    },
  });
};

export const handleSuccessfulRequest = (
  res: express.Response<any>,
  data: any,
  status = 200
): express.Response => {
  return res.status(200).json({
    success: true,
    data,
  });
};
